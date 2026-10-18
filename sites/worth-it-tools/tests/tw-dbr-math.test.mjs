// P2 batch 10 (2026-10-18): the arithmetic behind the zh 負債比 DBR 與房貸收支比 page. Every number printed in
// src/content/growth-tools/zh/dti-calculator.md is recomputed here with the same module the page script imports
// (src/lib/twDbrMath.mjs) and looked up in the markdown, and cross-checked with plain division.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DBR_LIMIT_MULTIPLE, calculateTwDebtRatios, dbrLight } from '../src/lib/twDbrMath.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/dti-calculator.md', import.meta.url), 'utf8');
const f = (n) => Math.round(n).toLocaleString('en-US');
const pct1 = (r) => `${(r * 100).toFixed(1)}%`;

test('the built-in reference lines are exactly the published ones', () => {
  assert.equal(DBR_LIMIT_MULTIPLE, 22); // 金管會金融智慧網
});

test('金融健檢 lights: boundaries follow the wording 超過 / 小於', () => {
  assert.equal(dbrLight(22.0000001), 'red');
  assert.equal(dbrLight(22), 'yellow'); // 超過 22 才是紅燈
  assert.equal(dbrLight(1), 'yellow'); // 小於 1 才是綠燈
  assert.equal(dbrLight(0.99), 'green');
  assert.equal(dbrLight(0), 'green');
  const at = (income, mortgage) => calculateTwDebtRatios({ monthlyIncome: income, mortgagePayment: mortgage }).mortgageLight;
  assert.equal(at(90000, 30000), 'yellow'); // exactly 1/3
  assert.equal(at(90000, 30001), 'red');
  assert.equal(at(100000, 20000), 'yellow'); // exactly 1/5
  assert.equal(at(100000, 19999), 'green');
});

test('金管會 official example: 月薪 4 萬, 22 倍 88 萬, 卡債加信貸約 50 萬, 剩餘 38 萬', () => {
  const r = calculateTwDebtRatios({ monthlyIncome: 40000, cardBalance: 200000, creditLoanBalance: 300000 });
  assert.equal(r.dbrCeiling, 880000);
  assert.equal(r.unsecuredTotal, 500000);
  assert.equal(r.dbrRoom, 380000);
  assert.equal(r.dbr, 12.5);
  assert.equal(r.dbrLight, 'yellow');
  assert.equal(40000 * 22, 880000);
  assert.equal(880000 - 500000, 380000);
  for (const text of ['22 倍為 88 萬元', '剩餘可負債空間 38 萬元', '| 無擔保總餘額 | 200,000 + 300,000 | 500,000 元 |', '| 22 倍額度 | 22 × 40,000 | 880,000 元 |', '| 剩餘空間 | 880,000 − 500,000 | 380,000 元 |', '| DBR | 500,000 ÷ 40,000 | 12.5 倍，黃燈（1 到 22 之間） |']) {
    assert.ok(md.includes(text), text);
  }
});

test('金管會 小王: 月薪 3 萬, 卡債 20 萬, 上限 66 萬 -> DBR below the line', () => {
  const r = calculateTwDebtRatios({ monthlyIncome: 30000, cardBalance: 200000 });
  assert.equal(r.dbrCeiling, 660000);
  assert.ok(r.unsecuredTotal < r.dbrCeiling);
  assert.equal(r.dbrLight, 'yellow');
});

test('算例二 (the calculator defaults): 8 萬 / 信貸 40 萬 / 卡 8 萬 / 房貸 26,000 / 信貸月付 12,000', () => {
  const r = calculateTwDebtRatios({ monthlyIncome: 80000, cardBalance: 80000, cashCardBalance: 0, creditLoanBalance: 400000, mortgagePayment: 26000, otherMonthlyPayments: 12000 });
  assert.equal(r.unsecuredTotal, 480000);
  assert.equal(r.dbr, 6);
  assert.equal(480000 / 80000, 6);
  assert.equal(r.dbrLight, 'yellow');
  assert.equal(r.dbrCeiling, 1760000);
  assert.equal(r.dbrRoom, 1280000);
  assert.equal(pct1(r.mortgageRatio), '32.5%');
  assert.equal(r.mortgageLight, 'yellow');
  assert.ok(r.mortgageRatio < 1 / 3 && r.mortgageRatio > 1 / 5);
  assert.equal(Math.round(r.toThird), 667); // 26,666.67 - 26,000
  assert.equal(f(80000 / 3), '26,667');
  assert.equal(r.toFifth, -10000); // 16,000 - 26,000
  assert.equal(r.totalPayments, 38000);
  assert.equal(pct1(r.totalPaymentRatio), '47.5%');
  assert.equal(r.bankGapPoints, null); // no bank ceiling is ever supplied by the page
  for (const text of ['| 無擔保總餘額 | 80,000 + 0 + 400,000 | 480,000 元 |', '| DBR | 480,000 ÷ 80,000 | 6 倍，黃燈 |', '22 × 80,000 = 1,760,000；1,760,000 − 480,000 | 1,280,000 元 |', '| 房貸月付占收入 | 26,000 ÷ 80,000 | 32.5%，黃燈（略低於 1/3 的 33.3%） |', '| 距 1/3 線（26,667 元） | 80,000 ÷ 3 − 26,000 | 月付還有約 667 元的空間 |', '| 距 1/5 線（16,000 元） | 80,000 ÷ 5 − 26,000 | 月付已高出 1/5 線 10,000 元 |', '| 含信貸月付後占收入（參考） | (26,000 + 12,000) ÷ 80,000 | 47.5%，沒有官方燈號 |']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例三: DBR 24 倍 is red and 100,000 over the 22x line', () => {
  const r = calculateTwDebtRatios({ monthlyIncome: 50000, cardBalance: 300000, cashCardBalance: 200000, creditLoanBalance: 700000 });
  assert.equal(r.unsecuredTotal, 1200000);
  assert.equal(r.dbr, 24);
  assert.equal(r.dbrLight, 'red');
  assert.equal(r.dbrCeiling, 1100000);
  assert.equal(r.dbrRoom, -100000);
  assert.equal(f(1200000 / 22), '54,545'); // exact 54,545.45; the page rounds UP to the first whole yuan that is enough
  assert.equal(Math.ceil(1200000 / 22), 54546);
  assert.ok(54546 * 22 >= 1200000 && 54545 * 22 < 1200000);
  for (const text of ['| 無擔保總餘額 | 300,000 + 200,000 + 700,000 | 1,200,000 元 |', '| DBR | 1,200,000 ÷ 50,000 | 24 倍，紅燈 |', '| 22 倍額度 | 22 × 50,000 | 1,100,000 元 |', '| 超出 | 1,200,000 − 1,100,000 | 超出 100,000 元 |', '1,200,000 ÷ 22 約 54,546 元以上']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例四: 12 萬收入, 房貸 22,000 -> 18.3% green, 2,000 under 1/5, 18,000 under 1/3', () => {
  const r = calculateTwDebtRatios({ monthlyIncome: 120000, mortgagePayment: 22000 });
  assert.equal(pct1(r.mortgageRatio), '18.3%');
  assert.equal(r.mortgageLight, 'green');
  assert.equal(r.toFifth, 2000);
  assert.equal(r.toThird, 18000);
  assert.equal(120000 / 5, 24000);
  assert.equal(120000 / 3, 40000);
  for (const text of ['22,000 ÷ 120,000 = 18.3%', '距離 1/5 線（24,000 元）還有 2,000 元的空間', '距離 1/3 線（40,000 元）還有 18,000 元']) {
    assert.ok(md.includes(text), text);
  }
});

test('a bank ceiling typed in by the reader is only used for the gap', () => {
  const r = calculateTwDebtRatios({ monthlyIncome: 80000, mortgagePayment: 26000, otherMonthlyPayments: 12000, bankLimitPercent: 50 });
  assert.ok(Math.abs(r.bankGapPoints - 2.5) < 1e-9); // 50% - 47.5%
});

test('bad input is rejected instead of guessed', () => {
  assert.throws(() => calculateTwDebtRatios({ monthlyIncome: 0 }), RangeError);
  assert.throws(() => calculateTwDebtRatios({ monthlyIncome: -1 }), RangeError);
  assert.throws(() => calculateTwDebtRatios({ monthlyIncome: 80000, cardBalance: -5 }), RangeError);
  assert.throws(() => calculateTwDebtRatios({ monthlyIncome: 80000, mortgagePayment: 'abc' }), RangeError);
});

test('the page makes no claim it cannot source', () => {
  for (const bad of ['FAQPage', 'HowTo', '保證核貸', '一定核貸', '36%', '28%', 'PMI']) assert.ok(!md.includes(bad), bad);
});
