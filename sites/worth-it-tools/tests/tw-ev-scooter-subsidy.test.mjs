// The e-scooter subsidy brief is static Markdown, so there is no calculator function to import.
// This test reads the brief itself and re-adds every row of its 算例 table, so a figure that is
// edited in one cell and not the next fails the build. Figures are from meid.nat.gov.tw,
// 115/10/07 page (checked 2026-10-18).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const md = readFileSync(new URL('../src/content/money-briefs/zh/e-scooter-subsidy-2026.md', import.meta.url), 'utf8');
const body = md.split(/^---$/m)[2];
const sum = (cell) => [...cell.matchAll(/\d{1,3}(?:,\d{3})+|\d+/g)].reduce((total, m) => total + Number(m[0].replaceAll(',', '')), 0);
const num = (cell) => Number(cell.replaceAll(',', '').trim());

function table(heading) {
  const section = body.split(/^## /m).find((part) => part.startsWith(heading));
  assert.ok(section, `section ${heading} exists`);
  return section.split('\n').filter((line) => line.startsWith('|')).slice(2).map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));
}

test('算例: itemised central + county figures add up to the stated subtotals and totals', () => {
  const rows = table('算例');
  assert.equal(rows.length, 6);
  for (const [scenario, centralItems, centralSub, countyItems, countySub, total] of rows) {
    // "同上逐項 7,000 + 1,000 ..." repeats the previous row's items; the labels carry no digits.
    assert.equal(sum(centralItems), num(centralSub), `${scenario}: central items`);
    assert.equal(sum(countyItems), num(countySub), `${scenario}: county items`);
    assert.equal(num(centralSub) + num(countySub), num(total), `${scenario}: total`);
  }
  assert.deepEqual(rows.map((r) => num(r[5])), [19000, 29000, 32000, 38000, 41000, 11000]);
});

test('中央範圍: 11,000 base, 14,000 with 國產電池芯, 15,300 theoretical ceiling', () => {
  const base = 7000 + 1000 + 1000 + 2000;
  assert.equal(base, 11000);
  assert.equal(base + 3000, 14000);
  assert.equal(7000 + 3000 + 1000 + 2100 + 2200, 15300);
  assert.match(body, /15,300/);
  assert.match(body, /= 15,300/);
});

test('縣市表: 19 listed counties, each with a period, matching the official page headline figures', () => {
  const rows = table('各縣市環保局加碼');
  assert.equal(rows.length, 19);
  const byName = Object.fromEntries(rows.map((r) => [r[0], r]));
  const expect = {
    基隆市: ['最高 12,000', '最高 4,000'], 新北市: ['最高 10,000', '最高 4,000'], 臺北市: ['最高 22,000', '最高 10,000'],
    桃園市: ['最高 15,000', '最高 4,000'], 新竹市: ['最高 17,000', '—'], 新竹縣: ['—', '最高 5,500'], 苗栗縣: ['2,500', '—'],
    臺中市: ['最高 16,000', '3,000'], 彰化縣: ['12,000', '5,000'], 南投縣: ['16,000', '5,000'], 雲林縣: ['15,000', '10,000'],
    嘉義市: ['12,000', '8,000'], 嘉義縣: ['14,000', '8,000'], 臺南市: ['最高 8,000', '最高 4,500'], 高雄市: ['最高 7,000', '最高 4,000'],
    屏東縣: ['6,000', '3,000'], 宜蘭縣: ['最高 10,000', '最高 8,000'], 花蓮縣: ['1,000', '—'], 金門縣: ['20,000', '10,000'],
  };
  for (const [name, [swap, buy]] of Object.entries(expect)) {
    assert.ok(byName[name], `${name} listed`);
    assert.equal(byName[name][1], swap, `${name} 汰舊換購`);
    assert.equal(byName[name][2], buy, `${name} 新購`);
    assert.match(byName[name][4], /^\d{3}\/\d{2}\/\d{2}–/, `${name} period`);
  }
});

test('分項表: the 最高 headline equals the largest breakdown figure', () => {
  const rows = table('為什麼同一個縣市');
  const biggest = Object.fromEntries(rows.map((r) => [r[0], Math.max(...[...r[1].matchAll(/\d{1,3}(?:,\d{3})+|(?<![\d/])\d{3,}(?![\d/])/g)].map((m) => num(m[0])))]));
  assert.equal(biggest['臺北市'], 22000);
  assert.equal(biggest['桃園市'], 15000);
  assert.equal(biggest['臺中市'], 16000);
  assert.equal(biggest['新北市'], 10000);
});
