// P2 batch 6 (2026-10-17): the zh growth calculators print New Taiwan dollars as NT$, not a bare "$".
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { formatGrowthMoney } from '../src/lib/growthMoney.mjs';

test('zh output is NT$ with no decimals, the sign stays in front, and no bare dollar sign is left', () => {
  assert.equal(formatGrowthMoney('zh', 10000), 'NT$10,000');
  assert.equal(formatGrowthMoney('zh', 4082769.4), 'NT$4,082,769');
  assert.equal(formatGrowthMoney('zh', -1234), '-NT$1,234');
  assert.equal(formatGrowthMoney('zh', 0), 'NT$0');
  for (const v of [1, 999.5, 12345678, -0.4]) assert.ok(/NT\$/.test(formatGrowthMoney('zh', v)), String(v));
  assert.ok(!/(^|[^T])\$/.test(formatGrowthMoney('zh', 123456)));
});

test('the other locales are unchanged (en stays USD with cents; es/fr/de stay EUR)', () => {
  assert.equal(formatGrowthMoney('en', 10000), '$10,000.00');
  assert.ok(formatGrowthMoney('de', 1234.5).includes('€'));
  assert.ok(formatGrowthMoney('es', 1234.5).includes('€'));
  assert.ok(formatGrowthMoney('fr', 1234.5).includes('€'));
});

test('GrowthCalculator.astro formats every amount through formatGrowthMoney', () => {
  const source = readFileSync(new URL('../src/components/GrowthCalculator.astro', import.meta.url), 'utf8');
  assert.ok(source.includes("import { GROWTH_NUMBER_LOCALE, formatGrowthMoney } from '../lib/growthMoney.mjs';"));
  assert.ok(source.includes('const money = (value: number) => formatGrowthMoney(config.locale, value);'));
  assert.ok(!source.includes("style: 'currency'"), 'no second, unpatched currency formatter');
});
