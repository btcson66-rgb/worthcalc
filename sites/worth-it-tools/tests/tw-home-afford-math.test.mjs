// P2 batch 10 (2026-10-18): the arithmetic and the rules behind the zh 房屋負擔能力 page. Every number printed in
// src/content/growth-tools/zh/home-affordability.md is recomputed with the module the page script imports
// (src/lib/twHomeAffordMath.mjs) and looked up in the markdown, and cross-checked with a closed form that does not use
// the module (the 土地銀行 平均攤還率 formula written out directly).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  HIGH_PRICE_THRESHOLD,
  HOME_IDENTITIES,
  PRICE_STEP,
  TARGET_RATIOS,
  paymentPerYuan,
  solveTwHomeAffordability,
} from '../src/lib/twHomeAffordMath.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/home-affordability.md', import.meta.url), 'utf8');
const f = (n) => Math.round(n).toLocaleString('en-US');
const pct2 = (r) => `${(r * 100).toFixed(2)}%`;

// 土地銀行 貸款還款方式說明: 平均攤還率 = {(1+i)^n x i} / {(1+i)^n - 1}, i = 年利率 / 12, n = 年期 x 12
const landbankRate = (aprPct, months) => {
  const i = aprPct / 100 / 12;
  return ((1 + i) ** months * i) / ((1 + i) ** months - 1);
};
const base = { monthlyIncome: 150000, aprPct: 2, years: 30, region: 'other' };

test('央行規定 identities, article by article (中央銀行對金融機構辦理不動產抵押貸款業務規定, 115-09-18 生效)', () => {
  const H = HOME_IDENTITIES;
  assert.deepEqual([H.noLoanNoHouse.cap, H.noLoanNoHouse.graceBanned], [null, false]); // 第 4 點 (二) covers no such case
  assert.deepEqual([H.noLoanHasHouse.cap, H.noLoanHasHouse.graceBanned], [null, true]); // 4 (二) 1: 適用第 3 點第一款 only
  assert.deepEqual([H.oneLoan.cap, H.oneLoan.graceBanned], [0.7, true]); // 4 (二) 2: 七成, 6 成 -> 7 成 on 2026-09-18
  assert.deepEqual([H.twoPlusLoans.cap, H.twoPlusLoans.graceBanned], [0.3, true]); // 4 (二) 3: 第 3 點各款
  assert.deepEqual([H.highPrice.cap, H.highPrice.graceBanned], [0.3, true]); // 4 (一)
  assert.deepEqual([H.corporate.cap, H.corporate.graceBanned], [0.3, true]); // 第 3 點
  assert.deepEqual(Object.keys(H).length, 6);
  // 第 2 點 (四) 高價住宅 thresholds
  assert.equal(HIGH_PRICE_THRESHOLD.taipei.amount, 70000000);
  assert.equal(HIGH_PRICE_THRESHOLD.newTaipei.amount, 60000000);
  assert.equal(HIGH_PRICE_THRESHOLD.other.amount, 40000000);
  // 金融健檢 lines
  assert.equal(TARGET_RATIOS.third.value, 1 / 3);
  assert.equal(TARGET_RATIOS.fifth.value, 1 / 5);
});

test('平均攤還率 matches the written-out 土地銀行 formula', () => {
  assert.ok(Math.abs(paymentPerYuan(2, 360) - landbankRate(2, 360)) < 1e-15);
  assert.ok(Math.abs(paymentPerYuan(2, 300) - landbankRate(2, 300)) < 1e-15);
  assert.equal(paymentPerYuan(2, 360).toFixed(10), '0.0036961947');
  assert.equal(paymentPerYuan(2, 300).toFixed(10), '0.0042385434');
  assert.ok(Math.abs(paymentPerYuan(0, 360) - 1 / 360) < 1e-15); // 0% rate: principal / months
  assert.ok(md.includes('0.0036961947') && md.includes('0.0042385434'));
});

test('算例一 (the calculator defaults): 15 萬, 名下無房貸也無房屋, 8 成, 2%, 30 年', () => {
  const r = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80 });
  assert.equal(r.paymentCeiling, 50000);
  const loanCap = 50000 / landbankRate(2, 360);
  assert.equal(f(loanCap), '13,527,426');
  assert.equal(Math.floor(loanCap / 0.8 / PRICE_STEP) * PRICE_STEP, 16900000);
  assert.equal(r.maxPrice, 16900000);
  assert.equal(r.loan, 13520000);
  assert.equal(r.downPayment, 3380000);
  assert.equal(r.downPayment, r.maxPrice - r.maxPrice * 0.8); // 頭期款 = 總價 − 總價 × 成數
  assert.equal(r.downPaymentPct, 20);
  assert.equal(f(r.monthlyAfterGrace), '49,973');
  assert.equal(f(13520000 * landbankRate(2, 360)), '49,973');
  assert.equal(pct2(r.ratio), '33.32%');
  assert.equal(r.light, 'yellow'); // at or under 1/3 and above 1/5
  assert.ok(r.monthlyAfterGrace <= r.paymentCeiling);
  assert.equal(r.binding, 'payment');
  assert.equal(r.thresholdCheck, 'ok');
  assert.equal(r.monthlyDuringGrace, null);
  const fifth = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80, target: 'fifth' });
  assert.equal(fifth.paymentCeiling, 30000);
  assert.equal(fifth.maxPrice, 10140000);
  for (const text of ['| 月付上限 | 150,000 ÷ 3 | 50,000 元 |', '| 貸款上限 | 50,000 ÷ 0.0036961947 | 約 13,527,426 元 |', '| 最高總價 | 貸款上限 ÷ 0.8，捨去到萬元 | 16,900,000 元 |', '| 貸款 | 16,900,000 × 80% | 13,520,000 元 |', '| 頭期款 | 16,900,000 − 13,520,000 | 3,380,000 元（總價的 20%） |', '| 月付 | 13,520,000 × 0.0036961947 | 49,973 元，占收入 33.32%，落在黃燈 |', '月付上限是 30,000 元，最高總價降到 10,140,000 元']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例二: the same income as a 第 2 戶 (7 成 cap), then with 4,000,000 of cash', () => {
  const r = solveTwHomeAffordability({ ...base, identity: 'oneLoan' }); // blank ratio = the 央行 cap
  assert.equal(r.capPct, 70);
  assert.equal(r.ltvPct, 70);
  assert.equal(r.maxPrice, 19320000);
  assert.equal(r.loan, 13524000);
  assert.equal(r.downPayment, 5796000);
  assert.equal(r.downPaymentPct, 30);
  assert.equal(f(r.monthlyAfterGrace), '49,987');
  assert.equal(f(r.priceByPayment), '19,324,894');
  assert.ok(r.downPayment > 3380000); // more cash than 算例一 for a pricier house
  const c = solveTwHomeAffordability({ ...base, identity: 'oneLoan', cash: 4000000 });
  assert.equal(c.binding, 'cash');
  assert.equal(f(4000000 / (1 - 0.7)), '13,333,333');
  assert.equal(c.maxPrice, 13330000);
  assert.equal(c.loan, 9331000);
  assert.equal(c.downPayment, 3999000);
  assert.ok(c.downPayment <= 4000000);
  assert.equal(f(c.monthlyAfterGrace), '34,489');
  assert.equal(pct2(c.ratio), '22.99%');
  for (const text of ['| 最高總價 | 貸款上限 ÷ 0.7，捨去到萬元 | 19,320,000 元 |', '| 貸款 | 19,320,000 × 70% | 13,524,000 元 |', '| 頭期款 | 19,320,000 − 13,524,000 | 5,796,000 元（總價的 30%） |', '| 月付 | 13,524,000 × 0.0036961947 | 49,987 元 |', '頭期款從 338 萬元變成 580 萬元', '約 13,333,333），捨去到萬元為 13,330,000 元，貸款 9,331,000 元、頭期款 3,999,000 元，月付 34,489 元，占收入 22.99%']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例三: a 5-year 寬限期 is judged on the payment AFTER it', () => {
  const g = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80, graceYears: 5 });
  assert.equal(g.graceMonths, 60);
  assert.equal(f(50000 / landbankRate(2, 300)), '11,796,505');
  assert.equal(g.maxPrice, 14740000);
  assert.equal(g.loan, 11792000);
  assert.equal(g.downPayment, 2948000);
  assert.equal(f(g.monthlyDuringGrace), '19,653');
  assert.equal(f(11792000 * 0.02 / 12), '19,653'); // interest only
  assert.equal(f(g.monthlyAfterGrace), '49,981');
  assert.equal(f(11792000 * landbankRate(2, 300)), '49,981');
  assert.equal(f(g.monthlyNoGrace), '43,586');
  assert.equal(f(11792000 * landbankRate(2, 360)), '43,586');
  assert.equal(g.graceSavingDuring, 43586 - 19653); // the difference of the payments as shown
  assert.equal(g.graceSavingDuring, 23933);
  assert.equal(g.graceExtraAfter, 6395);
  assert.ok(g.monthlyAfterGrace <= g.paymentCeiling);
  const plain = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80 });
  assert.equal(plain.maxPrice - g.maxPrice, 2160000);
  assert.ok(g.maxPrice < plain.maxPrice); // a grace period lowers what 1/3 lets you buy
  for (const text of ['剩下 25 年（300 個月），平均攤還率變成 0.0042385434', '| 貸款上限 | 50,000 ÷ 0.0042385434 | 約 11,796,505 元 |', '| 最高總價 | 貸款上限 ÷ 0.8，捨去到萬元 | 14,740,000 元 |', '| 貸款 | 14,740,000 × 80% | 11,792,000 元 |', '| 頭期款 | 14,740,000 − 11,792,000 | 2,948,000 元 |', '| 寬限期內每月（只繳利息） | 11,792,000 × 0.02 ÷ 12 | 19,653 元 |', '| 寬限期結束後每月 | 11,792,000 × 0.0042385434 | 49,981 元 |', '| 同價位、沒有寬限期的月付 | 11,792,000 × 0.0036961947 | 43,586 元 |', '寬限期內每月比沒有寬限期少繳 23,933 元，期滿後每月多繳 6,395 元', '少 2,160,000 元']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例四: 3 成 (高價住宅 / 法人 / 第 3 戶以上) makes cash, not the payment, the hard part', () => {
  for (const identity of ['highPrice', 'corporate', 'twoPlusLoans']) {
    const r = solveTwHomeAffordability({ ...base, identity });
    assert.equal(r.ltvPct, 30);
    assert.equal(r.maxPrice, 45090000);
    assert.equal(r.loan, 13527000);
    assert.equal(r.downPayment, 31563000);
    assert.equal(r.downPaymentPct, 70);
  }
  const high = solveTwHomeAffordability({ ...base, identity: 'highPrice' });
  assert.equal(high.thresholdCheck, 'ok'); // 4,509 萬 >= 4,000 萬 (other regions)
  assert.ok(high.maxPrice >= HIGH_PRICE_THRESHOLD.other.amount);
  for (const text of ['| 最高總價 | 貸款上限 ÷ 0.3，捨去到萬元 | 45,090,000 元 |', '| 貸款 | 45,090,000 × 30% | 13,527,000 元 |', '| 頭期款 | 45,090,000 − 13,527,000 | 31,563,000 元（總價的 70%） |', '月付撐得起 4,509 萬元的房子，但要準備超過 3,100 萬元的頭期款']) {
    assert.ok(md.includes(text), text);
  }
});

test('the cap is a ceiling: a higher wish is cut back, a lower wish is kept', () => {
  const high = solveTwHomeAffordability({ ...base, identity: 'oneLoan', ltvPct: 80 });
  assert.equal(high.ltvPct, 70);
  assert.equal(high.ltvClamped, true);
  const low = solveTwHomeAffordability({ ...base, identity: 'oneLoan', ltvPct: 60 });
  assert.equal(low.ltvPct, 60);
  assert.equal(low.ltvClamped, false);
  const three = solveTwHomeAffordability({ ...base, identity: 'twoPlusLoans', ltvPct: 50 });
  assert.equal(three.ltvPct, 30);
});

test('a ratio is mandatory where the rule sets no ceiling, and nothing is guessed', () => {
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse' }), RangeError);
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'noLoanHasHouse', ltvPct: 0 }), RangeError);
  assert.doesNotThrow(() => solveTwHomeAffordability({ ...base, identity: 'noLoanHasHouse', ltvPct: 80 }));
});

test('where the rule bans a 寬限期 the input is ignored and reported', () => {
  for (const identity of ['noLoanHasHouse', 'oneLoan', 'twoPlusLoans', 'highPrice', 'corporate']) {
    const r = solveTwHomeAffordability({ ...base, identity, ltvPct: 30, graceYears: 5 });
    assert.equal(r.graceIgnored, true, identity);
    assert.equal(r.graceMonths, 0, identity);
    assert.equal(r.monthlyDuringGrace, null, identity);
    const none = solveTwHomeAffordability({ ...base, identity, ltvPct: 30, graceYears: 0 });
    assert.equal(r.maxPrice, none.maxPrice, identity);
  }
  const ok = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80, graceYears: 5 });
  assert.equal(ok.graceIgnored, false);
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80, graceYears: 30 }), RangeError);
});

test('高價住宅 switch: a result on the wrong side of the threshold is flagged', () => {
  const rich = { monthlyIncome: 400000, aprPct: 2, years: 30 };
  const above = solveTwHomeAffordability({ ...rich, monthlyIncome: 600000, region: 'taipei', identity: 'oneLoan' });
  assert.ok(above.maxPrice >= 70000000);
  assert.equal(above.thresholdCheck, 'above');
  const exact = solveTwHomeAffordability({ ...rich, region: 'taipei', identity: 'highPrice' });
  assert.equal(exact.thresholdCheck, 'ok');
  assert.equal(solveTwHomeAffordability({ ...base, identity: 'highPrice', region: 'taipei' }).thresholdCheck, 'below'); // 4,509 萬 < 7,000 萬
  assert.equal(solveTwHomeAffordability({ ...base, identity: 'oneLoan', region: 'other' }).thresholdCheck, 'ok');
  assert.equal(solveTwHomeAffordability({ ...base, identity: 'corporate', region: 'taipei' }).thresholdCheck, 'ok'); // 法人: always 3 成
});

test('cash on hand never lets the down payment exceed it, and 100% financing has no cash limit', () => {
  for (const cash of [1000000, 2500000, 4000000, 9000000]) {
    const r = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80, cash });
    assert.ok(r.downPayment <= cash, `cash ${cash}`);
    assert.ok(r.monthlyAfterGrace <= r.paymentCeiling);
  }
  const all = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 100, cash: 100 });
  assert.equal(all.binding, 'payment');
});

test('the solved price sits at the line: one more 萬 would break it', () => {
  for (const [identity, ltvPct, graceYears] of [['noLoanNoHouse', 80, 0], ['noLoanNoHouse', 80, 5], ['oneLoan', 0, 0], ['highPrice', 0, 0]]) {
    const r = solveTwHomeAffordability({ ...base, identity, ltvPct, graceYears });
    const months = 360 - r.graceMonths;
    const pay = (price) => Math.floor(price * (r.ltvPct / 100)) * landbankRate(2, months);
    assert.ok(pay(r.maxPrice) <= 50000 + 1e-9);
    assert.ok(pay(r.maxPrice + PRICE_STEP) > 50000);
  }
});

test('optional fields are shown but stay out of the 1/3 line', () => {
  const plain = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80 });
  const extra = solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80, otherDebtPayments: 12000, holdingCosts: 3000 });
  assert.equal(extra.maxPrice, plain.maxPrice);
  assert.equal(f(extra.withOtherDebtRatio * 150000), f(plain.monthlyAfterGrace + 12000));
  assert.equal(f(extra.monthlyCashflow), f(plain.monthlyAfterGrace + 3000));
});

test('bad input is rejected instead of guessed', () => {
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'oneLoan', monthlyIncome: 0 }), RangeError);
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'oneLoan', aprPct: -1 }), RangeError);
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'oneLoan', years: 0 }), RangeError);
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'oneLoan', ltvPct: 120 }), RangeError);
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'nobody' }), RangeError);
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'oneLoan', region: 'mars' }), RangeError);
  assert.throws(() => solveTwHomeAffordability({ ...base, identity: 'oneLoan', target: 'half' }), RangeError);
});

test('the page names no foreign rule and no built-in rate', () => {
  for (const bad of ['PMI', '房貸保險', '28/36', '36%', 'FAQPage', 'HowTo', '保證核貸', '一定核貸']) assert.ok(!md.includes(bad), bad);
  assert.ok(md.includes('第 2 戶購屋貸款的成數上限由 6 成調升為 7 成'));
  assert.ok(md.includes('不得有寬限期'));
});
