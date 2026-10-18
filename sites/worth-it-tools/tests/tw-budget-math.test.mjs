// P2 batch 11 (2026-10-18): the arithmetic behind the zh 不固定收入月預算 page. It is plain arithmetic with no rate or bracket built in;
// every number printed in src/content/growth-tools/zh/budget-builder.md is recomputed here with the module the page script imports
// (src/lib/twBudgetMath.mjs) and looked up in the markdown.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { MAX_BILLS, MAX_INCOME_MONTHS, calculateIrregularBudget, incomeBaseline, monthlyEquivalent, parseIncomes } from '../src/lib/twBudgetMath.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/budget-builder.md', import.meta.url), 'utf8');
const f2 = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

const incomes = parseIncomes('85000, 140000, 30000, 110000, 95000, 70000');
const bills = [
  { name: '所得稅', amount: 36000, timesPerYear: 1 },
  { name: '保險', amount: 18000, timesPerYear: 2 },
  { name: '房屋稅', amount: 12000, timesPerYear: 1 },
];
const base = { incomes, fixedMonthly: 40000, bills, withholdingMonthly: 0, reserveMonths: 6, reserveBalance: 0 };

test('parseIncomes accepts commas, 、, spaces and new lines and rejects the rest', () => {
  assert.deepEqual(parseIncomes('1000 2000，3000、4000\n5000'), [1000, 2000, 3000, 4000, 5000]);
  assert.deepEqual(parseIncomes('85,000, 140,000, 1,250,000'), [85000, 140000, 1250000]); // thousands separators
  assert.deepEqual(parseIncomes('85000,140000'), [85000, 140000]); // no space, but six digits: two amounts
  assert.deepEqual(parseIncomes('85000, 140000, 30000'), [85000, 140000, 30000]);
  assert.throws(() => parseIncomes(''), RangeError);
  assert.throws(() => parseIncomes('abc'), RangeError);
  assert.throws(() => parseIncomes('1000, -5'), RangeError);
  assert.throws(() => parseIncomes(Array(MAX_INCOME_MONTHS + 1).fill('1').join(',')), RangeError);
  assert.equal(parseIncomes(Array(MAX_INCOME_MONTHS).fill('1').join(',')).length, MAX_INCOME_MONTHS);
});

test('每月等值 = 單次金額 x 每年次數 / 12: the page examples', () => {
  assert.equal(monthlyEquivalent(36000, 1), 3000); // 年繳所得稅 3.6 萬
  assert.equal(monthlyEquivalent(18000, 2), 3000); // 半年繳保費 1.8 萬
  assert.equal(monthlyEquivalent(12000, 1), 1000);
  assert.equal(monthlyEquivalent(6000, 4), 2000); // 季繳
  assert.throws(() => monthlyEquivalent(1000, 0), RangeError);
  assert.throws(() => monthlyEquivalent(1000, 13), RangeError);
  assert.ok(md.includes('例如年繳所得稅3.6萬元，每月應提列3千元；半年繳保費1.8萬元，每月應提列3千元'));
});

test('baselines: average, lowest three, worst', () => {
  near(incomeBaseline(incomes, 'average'), 88333.33333333333);
  near(incomeBaseline(incomes, 'lowest3'), 61666.666666666664);
  assert.equal(incomeBaseline(incomes, 'worst'), 30000);
  assert.equal(incomeBaseline([100, 200], 'lowest3'), 150); // fewer than three months: all of them
  assert.equal(30000 + 70000 + 85000, 185000);
  assert.equal(85000 + 140000 + 30000 + 110000 + 95000 + 70000, 530000);
  assert.throws(() => incomeBaseline(incomes, 'median'), RangeError);
});

test('算例一 (the calculator defaults)', () => {
  const r = calculateIrregularBudget({ ...base, mode: 'average' });
  assert.equal(r.billsMonthly, 7000);
  assert.deepEqual(r.billRows.map((b) => b.monthly), [3000, 3000, 1000]);
  assert.equal(r.required, 47000);
  assert.equal(f2(r.average), '88,333.33');
  assert.equal(f2(r.lowest3), '61,666.67');
  assert.equal(r.worst, 30000);
  assert.equal(r.best, 140000);
  assert.equal(r.worstGap, -17000);
  assert.equal(r.leanMonths, 1);
  assert.equal(r.reserveTarget, 282000);
  assert.equal(r.reserveGap, 282000);
  assert.equal(f2(r.surplus), '41,333.33');
  assert.equal(r.monthsToReserve, 7);
  near(282000 / 41333.333333333336, 6.8225806, 1e-6);
  const low = calculateIrregularBudget({ ...base, mode: 'lowest3' });
  assert.equal(f2(low.surplus), '14,666.67');
  assert.equal(low.monthsToReserve, 20);
  near(282000 / 14666.666666666664, 19.2272727, 1e-6);
  const worst = calculateIrregularBudget({ ...base, mode: 'worst' });
  assert.equal(worst.surplus, -17000);
  assert.equal(worst.monthsToReserve, null);
  for (const text of [
    '| 所得稅每月提列 | 36,000 × 1 ÷ 12 | 3,000 元 |', '| 保險每月提列 | 18,000 × 2 ÷ 12 | 3,000 元 |', '| 房屋稅每月提列 | 12,000 × 1 ÷ 12 | 1,000 元 |',
    '| 帳單每月提列合計 | 3,000 + 3,000 + 1,000 | 7,000 元 |', '| 每月必要支出 | 40,000 + 7,000 + 0 | 47,000 元 |',
    '| 六個月收入合計與平均 | (85,000 + 140,000 + 30,000 + 110,000 + 95,000 + 70,000) ÷ 6 | 530,000 元 ÷ 6 = 88,333.33 元 |',
    '| 最低三個月平均 | (30,000 + 70,000 + 85,000) ÷ 3 | 61,666.67 元 |', '| 最差月份 | 30,000 | 30,000 元 |', '| 最差月份的缺口 | 30,000 − 47,000 | 差 17,000 元 |',
    '| 低於必要支出的月數 | 只有 30,000 這個月 < 47,000 | 1 個月 |', '| 緊急預備金目標（6 個月） | 47,000 × 6 | 282,000 元 |',
    '| 平均 | 88,333.33 元 | 41,333.33 元 | 7 個月（282,000 ÷ 41,333.33 = 6.8，進位） |',
    '| 最低三個月平均 | 61,666.67 元 | 14,666.67 元 | 20 個月（282,000 ÷ 14,666.67 = 19.2，進位） |',
    '| 最差月份 | 30,000 元 | −17,000 元 | 存不起來 |',
  ]) assert.ok(md.includes(text), text);
});

test('算例二: 補充保費與其他扣繳款 2,000, 預備金餘額 100,000', () => {
  const r = calculateIrregularBudget({ ...base, mode: 'average', withholdingMonthly: 2000, reserveBalance: 100000 });
  assert.equal(r.required, 49000);
  assert.equal(f2(r.surplus), '39,333.33');
  assert.equal(r.reserveTarget, 294000);
  assert.equal(r.reserveGap, 194000);
  assert.equal(r.monthsToReserve, 5);
  near(194000 / 39333.333333333336, 4.9322034, 1e-6);
  for (const text of [
    '| 每月必要支出 | 40,000 + 7,000 + 2,000 | 49,000 元 |', '| 平均基準下每月可分配 | 88,333.33 − 49,000 | 39,333.33 元 |', '| 緊急預備金目標（6 個月） | 49,000 × 6 | 294,000 元 |',
    '| 還差多少 | 294,000 − 100,000 | 194,000 元 |', '| 存滿要幾個月 | 194,000 ÷ 39,333.33 = 4.9，進位 | 5 個月 |',
  ]) assert.ok(md.includes(text), text);
  // a reserve already above target needs no months
  const done = calculateIrregularBudget({ ...base, reserveBalance: 400000 });
  assert.equal(done.reserveGap, 0);
  assert.equal(done.monthsToReserve, 0);
});

test('Excel formulas on the page match the module', () => {
  const sorted = [...incomes].sort((a, b) => a - b);
  near(sorted.slice(0, 3).reduce((s, v) => s + v, 0) / 3, incomeBaseline(incomes, 'lowest3')); // =AVERAGE(SMALL(B2:B7,{1,2,3}))
  assert.equal(Math.min(...incomes), incomeBaseline(incomes, 'worst')); // =MIN(B2:B7)
  for (const text of ['`=AVERAGE(B2:B7)`', '`=MIN(B2:B7)`', '`=AVERAGE(SMALL(B2:B7,{1,2,3}))`', '`=金額*一年繳幾次/12`']) assert.ok(md.includes(text), text);
});

test('the page keeps the tax and 補充保費 text at its verified wording and builds in no rate', () => {
  for (const text of ['610,001至1,380,000為12%', '單次給付達新臺幣2萬元要由給付者扣取', '本頁不內建', '6 是本站的建議']) assert.ok(md.includes(text) || md.includes('本站的建議'), text);
  assert.ok(!/FAQPage|HowTo/.test(md));
  assert.ok(md.includes('2.11%')); // quoted only as the figure the 健保署 page showed, with the 403 disclaimer
  assert.ok(md.includes('回應403'));
});

test('bad input is rejected, not guessed', () => {
  assert.throws(() => calculateIrregularBudget({ ...base, incomes: [] }), RangeError);
  assert.throws(() => calculateIrregularBudget({ ...base, incomes: [100, -1] }), RangeError);
  assert.throws(() => calculateIrregularBudget({ ...base, fixedMonthly: -1 }), RangeError);
  assert.throws(() => calculateIrregularBudget({ ...base, reserveMonths: 40 }), RangeError);
  assert.throws(() => calculateIrregularBudget({ ...base, bills: Array(MAX_BILLS + 1).fill({ name: 'x', amount: 1, timesPerYear: 1 }) }), RangeError);
  assert.throws(() => calculateIrregularBudget({ ...base, mode: 'median' }), RangeError);
});
