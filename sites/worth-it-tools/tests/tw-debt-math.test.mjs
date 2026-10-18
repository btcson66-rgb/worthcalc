// P2 batch 11 (2026-10-18): the arithmetic behind the zh 雪球法 vs 雪崩法 page. Every number printed in
// src/content/growth-tools/zh/debt-strategy.md is recomputed here with the same module the page script imports
// (src/lib/twDebtMath.mjs), looked up in the markdown, and cross-checked with plain arithmetic and an NPER closed form.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  CARD_RATE_CAP_PCT,
  MAX_MONTHS,
  cardMinimumFloor,
  compareStrategies,
  formatMonths,
  inputWarnings,
  normalizeDebts,
  payoffOrder,
  simulatePayoff,
} from '../src/lib/twDebtMath.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/debt-strategy.md', import.meta.url), 'utf8');
const article = readFileSync(new URL('../src/content/growth-articles/zh/snowball-vs-avalanche.md', import.meta.url), 'utf8');
const f = (n) => Math.round(n).toLocaleString('en-US');
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

const ex1 = [
  { name: '信用卡', kind: 'card', balance: 120000, ratePct: 15, minPayment: 8000 },
  { name: '小額分期', kind: 'loan', balance: 40000, ratePct: 6, minPayment: 2000 },
  { name: '信用貸款', kind: 'loan', balance: 300000, ratePct: 9, minPayment: 7000 },
];
const ex2 = [
  { name: '信用卡', kind: 'card', balance: 30000, ratePct: 15, minPayment: 2000 },
  { name: '信用貸款', kind: 'loan', balance: 80000, ratePct: 12, minPayment: 3000 },
  { name: '車貸', kind: 'loan', balance: 200000, ratePct: 6, minPayment: 5000 },
];
const ex3 = [{ name: '信用卡', kind: 'card', balance: 100000, ratePct: 15, minPayment: 1000 }];

test('the built-in lines are exactly the published ones', () => {
  assert.equal(CARD_RATE_CAP_PCT, 15); // 銀行法 第 47-1 條 第 2 項
  assert.equal(MAX_MONTHS, 1200);
});

test('payoff order: snowball = smallest balance first, avalanche = highest rate first, with the stated tie rules', () => {
  assert.deepEqual(payoffOrder(ex1, 'snowball'), [1, 0, 2]);
  assert.deepEqual(payoffOrder(ex1, 'avalanche'), [0, 2, 1]);
  assert.deepEqual(payoffOrder(ex2, 'snowball'), [0, 1, 2]);
  assert.deepEqual(payoffOrder(ex2, 'avalanche'), [0, 1, 2]);
  const tie = [
    { balance: 1000, ratePct: 5, minPayment: 100 },
    { balance: 1000, ratePct: 9, minPayment: 100 },
    { balance: 500, ratePct: 9, minPayment: 100 },
  ];
  assert.deepEqual(payoffOrder(tie, 'snowball'), [2, 1, 0]); // equal balance -> higher rate first
  assert.deepEqual(payoffOrder(tie, 'avalanche'), [2, 1, 0]); // equal rate -> smaller balance first
  assert.throws(() => payoffOrder(ex1, 'custom'), RangeError);
});

test('算例一 month 1: interest, minimums, extra and the balances at the end of month 1', () => {
  assert.equal((120000 * 15) / 100 / 12, 1500);
  assert.equal((40000 * 6) / 100 / 12, 200);
  assert.equal((300000 * 9) / 100 / 12, 2250);
  assert.equal(8000 + 2000 + 7000 + 5000, 22000);
  const av = simulatePayoff(ex1, 5000, 'avalanche');
  const sn = simulatePayoff(ex1, 5000, 'snowball');
  assert.equal(av.budget, 22000);
  assert.deepEqual(av.history[0], [108500, 38200, 295250]);
  assert.equal(120000 + 1500 - 8000 - 5000, 108500);
  assert.equal(40000 + 200 - 2000, 38200);
  assert.equal(300000 + 2250 - 7000, 295250);
  assert.deepEqual(sn.history[0], [113500, 33200, 295250]);
  assert.equal(40000 + 200 - 2000 - 5000, 33200);
  for (const text of [
    '| 信用卡 | 120,000 × 15% ÷ 12 = 1,500 | 8,000 | 信用卡 | — |',
    '| 小額分期 | 40,000 × 6% ÷ 12 = 200 | 2,000 | — | 小額分期 |',
    '| 信用貸款 | 300,000 × 9% ÷ 12 = 2,250 | 7,000 | — | — |',
    '雪崩法是信用卡 120,000 + 1,500 − 8,000 − 5,000 = 108,500 元、小額分期 38,200 元、信用貸款 295,250 元',
    '雪球法是信用卡 113,500 元、小額分期 40,000 + 200 − 2,000 − 5,000 = 33,200 元、信用貸款 295,250 元',
    '所以每月預算是 8,000 + 2,000 + 7,000 + 5,000 = 22,000 元',
  ]) {
    assert.ok(md.includes(text), text);
  }
});

test('算例一 results: both orders and the minimum-only baseline', () => {
  const c = compareStrategies(ex1, 5000);
  assert.deepEqual([c.snowball.months, c.avalanche.months, c.minimumOnly.months], [24, 23, 31]);
  assert.deepEqual(c.snowball.payoffMonth, [12, 6, 24]);
  assert.deepEqual(c.avalanche.payoffMonth, [10, 22, 23]);
  assert.deepEqual(c.minimumOnly.payoffMonth, [17, 22, 31]);
  assert.equal(c.snowball.firstPayoffMonth, 6);
  assert.equal(c.avalanche.firstPayoffMonth, 10);
  assert.equal(c.minimumOnly.firstPayoffMonth, 17);
  assert.deepEqual(c.snowball.orderNames, ['小額分期', '信用卡', '信用貸款']);
  assert.deepEqual(c.avalanche.orderNames, ['信用卡', '信用貸款', '小額分期']);
  assert.equal(f(c.snowball.totalInterest), '46,866');
  assert.equal(f(c.avalanche.totalInterest), '44,803');
  assert.equal(f(c.minimumOnly.totalInterest), '61,347');
  assert.equal(f(c.snowball.totalPaid), '506,866');
  assert.equal(f(c.avalanche.totalPaid), '504,803');
  assert.equal(f(c.minimumOnly.totalPaid), '521,347');
  // total paid = principal + interest, to the cent
  for (const r of [c.snowball, c.avalanche, c.minimumOnly]) near(r.totalPaid, 460000 + r.totalInterest);
  assert.equal(f(c.interestGap), '2,064');
  assert.equal(c.monthsGap, 1);
  assert.ok(f(c.minimumOnly.totalInterest - c.snowball.totalInterest) === '14,480' && c.minimumOnly.months - c.snowball.months === 7);
  assert.ok(c.minimumOnly.months - c.avalanche.months === 8);
  assert.equal(formatMonths(24), '2 年');
  assert.equal(formatMonths(23), '1 年 11 個月');
  for (const text of [
    '| 還款順序 | 小額分期 → 信用卡 → 信用貸款 | 信用卡 → 信用貸款 → 小額分期 | 無額外金額 |',
    '| 全部還清 | 24 個月（2 年） | 23 個月 | 31 個月 |',
    '| 第一筆還清 | 第 6 個月（小額分期） | 第 10 個月（信用卡） | 第 17 個月（信用卡） |',
    '| 每筆還清的月份（信用卡／小額分期／信用貸款） | 12／6／24 | 10／22／23 | 17／22／31 |',
    '| 總利息 | 46,866 元 | 44,803 元 | 61,347 元 |',
    '| 總繳款 | 506,866 元 | 504,803 元 | 521,347 元 |',
    '雪崩法比雪球法少付約 2,064 元利息',
    '早 1 個月還清',
    '早 7 到 8 個月還清，少付 1.4 萬元以上的利息',
  ]) {
    assert.ok(md.includes(text), text);
  }
});

test('算例二: smallest balance is also the highest rate, so both orders are identical', () => {
  const c = compareStrategies(ex2, 10000);
  assert.equal(c.snowball.budget, 20000);
  assert.deepEqual(c.snowball.orderNames, c.avalanche.orderNames);
  assert.equal(c.snowball.months, 17);
  assert.equal(c.avalanche.months, 17);
  assert.equal(f(c.snowball.totalInterest), '16,224');
  assert.equal(c.snowball.totalInterest, c.avalanche.totalInterest);
  assert.deepEqual(c.snowball.payoffMonth, [3, 8, 17]);
  assert.equal(c.minimumOnly.months, 35);
  assert.equal(f(c.minimumOnly.totalInterest), '36,995');
  assert.equal(c.interestGap, 0);
  for (const text of ['17 個月還清，總利息 16,224 元，三筆分別在第 3、8、17 個月還清', '只繳最低應繳要 35 個月，總利息 36,995 元', '每月預算 20,000 元']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例三: a minimum below the monthly interest never pays the balance down', () => {
  assert.equal((100000 * 15) / 100 / 12, 1250);
  assert.equal(100000 + 1250 - 1000, 100250);
  const never = simulatePayoff(ex3, 0, 'avalanche');
  assert.equal(never.finished, false);
  assert.equal(never.months, null);
  assert.equal(never.monthsSimulated, MAX_MONTHS);
  assert.equal(never.history[0][0], 100250);
  assert.equal(formatMonths(never.months), '還不完');
  assert.equal(cardMinimumFloor(100000, 15), 6250);
  assert.equal(100000 * 0.05 + 1250, 6250);
  const warn = inputWarnings(ex3).map((w) => w.code).sort();
  assert.deepEqual(warn, ['cardMinBelowFloor', 'neverPaidDown']);
  const fixed = compareStrategies(ex3, 3000);
  assert.equal(fixed.avalanche.months, 31);
  assert.equal(f(fixed.avalanche.totalInterest), '20,653');
  assert.equal(fixed.minimumOnly.finished, false);
  for (const text of ['100,000 + 1,250 − 1,000 = 100,250 元', '100,000 × 5% + 1,250 = 6,250 元', '31 個月還清，總利息 20,653 元']) {
    assert.ok(md.includes(text), text);
  }
});

test('input warnings: 15% flag only on card/cash-card debts; the example debts raise none', () => {
  assert.deepEqual(inputWarnings(ex1), []);
  assert.deepEqual(inputWarnings(ex2), []);
  const over = inputWarnings([{ name: '卡', kind: 'card', balance: 50000, ratePct: 18, minPayment: 5000 }]);
  assert.deepEqual(over.map((w) => w.code), ['cardRateOverCap']);
  const atCap = inputWarnings([{ name: '卡', kind: 'card', balance: 50000, ratePct: 15, minPayment: 5000 }]);
  assert.deepEqual(atCap, []); // exactly 15% is allowed
  const loan = inputWarnings([{ name: '信貸', kind: 'loan', balance: 50000, ratePct: 18, minPayment: 5000 }]);
  assert.deepEqual(loan, []); // 銀行法 第 47-1 條 does not cap a 信用貸款
});

test('NPER cross-check: a single debt paid at its minimum matches the closed form, and so does the page example', () => {
  const nper = (rate, pay, pv) => -Math.log(1 - (pv * rate) / pay) / Math.log(1 + rate);
  const one = [{ name: '小額分期', kind: 'loan', balance: 40000, ratePct: 6, minPayment: 2000 }];
  const sim = simulatePayoff(one, 0, 'avalanche');
  assert.equal(sim.months, Math.ceil(nper(0.06 / 12, 2000, 40000)));
  assert.equal(sim.months, 22);
  assert.equal(nper(0.06 / 12, 2000, 40000).toFixed(1), '21.1');
  // the same debt's payoff month inside the minimum-only run of 算例一
  assert.equal(simulatePayoff(ex1, 0, 'avalanche').payoffMonth[1], 22);
  assert.ok(md.includes('約 21.1，進位 22 個月'));
  // a debt paid in a closed form with extra: balance 10,000 @12%, 1,000 + 500 a month
  const two = simulatePayoff([{ balance: 10000, ratePct: 12, minPayment: 1000 }], 500, 'snowball');
  assert.equal(two.months, Math.ceil(nper(0.01, 1500, 10000)));
  near(two.totalPaid, 10000 + two.totalInterest);
});

test('the monthly budget never changes, and the total paid is principal plus interest for any input', () => {
  const sets = [ex1, ex2, [...ex1, { name: '學貸', kind: 'loan', balance: 90000, ratePct: 1.6, minPayment: 1500 }]];
  for (const set of sets) {
    for (const extra of [0, 1000, 5000, 20000]) {
      for (const strategy of ['snowball', 'avalanche']) {
        const r = simulatePayoff(set, extra, strategy);
        assert.equal(r.finished, true);
        const principal = set.reduce((s, d) => s + d.balance, 0);
        near(r.totalPaid, principal + r.totalInterest, 1e-4);
        r.history.forEach((balances) => balances.forEach((b) => assert.ok(b >= 0)));
      }
    }
  }
  // more extra money never makes the plan slower or dearer
  const a = simulatePayoff(ex1, 1000, 'avalanche');
  const b = simulatePayoff(ex1, 5000, 'avalanche');
  assert.ok(b.months <= a.months && b.totalInterest < a.totalInterest);
  // avalanche never pays more interest than snowball when the budget is fixed (checked on the page examples)
  assert.ok(simulatePayoff(ex1, 5000, 'avalanche').totalInterest <= simulatePayoff(ex1, 5000, 'snowball').totalInterest);
});

test('bad input is rejected, not guessed', () => {
  assert.throws(() => normalizeDebts([]), RangeError);
  assert.throws(() => normalizeDebts([{ balance: 0, ratePct: 5, minPayment: 100 }]), RangeError);
  assert.throws(() => normalizeDebts([{ balance: 1000, ratePct: -1, minPayment: 100 }]), RangeError);
  assert.throws(() => normalizeDebts([{ balance: 1000, ratePct: 101, minPayment: 100 }]), RangeError);
  assert.throws(() => normalizeDebts([{ balance: 1000, ratePct: 5, minPayment: -1 }]), RangeError);
  assert.throws(() => normalizeDebts([{ balance: 'abc', ratePct: 5, minPayment: 100 }]), RangeError);
  assert.throws(() => simulatePayoff(ex1, -1, 'avalanche'), RangeError);
});

test('the companion article prints the same 算例二 numbers and no longer promises a custom order', () => {
  for (const text of ['17 個月', '16,224', '36,995']) assert.ok(article.includes(text), text);
  assert.ok(!article.includes('自訂／混合'));
  assert.ok(!article.includes('三種排序'));
});

test('page has no FAQPage / HowTo markup and no US terms', () => {
  assert.ok(!/FAQPage|HowTo/.test(md));
  assert.ok(!/APR|credit score|401\(k\)|\$/.test(md));
});
