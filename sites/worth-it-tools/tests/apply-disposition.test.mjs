import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { planDisposition, validateRows, writeDispositionPlan } from '../scripts/apply-disposition.mjs';

const SOURCE = 'https://worthcalc.win/en/annual-vs-monthly-billing/';
const TARGET = 'https://worthcalc.win/en/guides/annual-bills-monthly-equivalent/';

test('validates keep, deindex, and merge_into rows', () => {
  const rows = validateRows([
    { url: SOURCE, action: 'keep', reason: '保留既有頁面' },
    { url: 'https://worthcalc.win/zh/annual-vs-monthly-billing/', action: 'deindex', reason: '需人工確認的重疊意圖' },
    { url: 'https://worthcalc.win/es/annual-vs-monthly-billing/', action: `merge_into:${TARGET}`, reason: '合併到同意圖英文指南' },
  ]);
  assert.deepEqual(rows[0], { url: SOURCE, action: 'keep', reason: '保留既有頁面' });
  assert.equal(rows[1].action, 'deindex');
  assert.equal(rows[2].target, TARGET);
  assert.throws(() => validateRows([{ url: SOURCE, action: 'bad', reason: 'x' }]), /action 無效/);
});

test('plans changes without mutating registry objects', () => {
  const deindexed = { decision: { reviewDate: '2026-09-14' }, urls: ['https://worthcalc.win/de/about/'] };
  const redirects = { version: 1, rules: [] };
  const plan = planDisposition([
    { url: SOURCE, action: 'keep', reason: '保留' },
    { url: 'https://worthcalc.win/zh/annual-vs-monthly-billing/', action: 'deindex', reason: '待人工審核' },
    { url: 'https://worthcalc.win/es/annual-vs-monthly-billing/', action: `merge_into:${TARGET}`, reason: '同意圖' },
  ], { deindexed, redirects, updatedAt: '2026-09-14' });
  assert.deepEqual(plan.counts, { input: 3, keep: 1, deindex: 1, deindexAdded: 1, merge: 1, mergeAdded: 1, unchanged: 1 });
  assert.equal(deindexed.urls.length, 1);
  assert.equal(redirects.rules.length, 0);
  assert.equal(plan.deindexed.urls.length, 2);
  assert.equal(plan.redirects.rules[0].target, TARGET);
});

test('writes both registries only when explicitly requested by caller', () => {
  const directory = mkdtempSync(join(tmpdir(), 'worthcalc-disposition-'));
  const deindexedPath = join(directory, 'deindexed-urls.json');
  const redirectsPath = join(directory, 'seo-redirects.json');
  const plan = planDisposition([{ url: 'https://worthcalc.win/zh/about/', action: 'deindex', reason: '測試' }], {
    deindexed: { urls: [] }, redirects: { version: 1, rules: [] }, updatedAt: '2026-09-14',
  });
  writeDispositionPlan(plan, { deindexedPath, redirectsPath });
  assert.equal(JSON.parse(readFileSync(deindexedPath, 'utf8')).urls.length, 1);
  assert.equal(JSON.parse(readFileSync(redirectsPath, 'utf8')).rules.length, 0);
});
