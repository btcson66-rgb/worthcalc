// P2 batch 2 (2026-10-17): the arithmetic behind the 信用卡分期試算 page. The page prints numbers
// computed from this same module at build time; this test pins them and cross-checks the
// internal-rate-of-return solver against an independent implementation of Excel's RATE equation.
import test from 'node:test';
import assert from 'node:assert/strict';
import { aprOfOneTimeFee, annuityFactor, buildSchedule, earlySettlement, evaluatePlan, irrMonthly } from '../src/lib/twInstallmentMath.mjs';

/** Excel RATE(nper, pmt, pv): the rate r solving pv*(1+r)^n + pmt*((1+r)^n - 1)/r = 0 (end-of-period payments). */
function excelRate(nper, pmt, pv) {
  const f = (r) => pv * (1 + r) ** nper + pmt * (((1 + r) ** nper - 1) / r);
  let lo = 1e-9;
  let hi = 1;
  for (let i = 0; i < 200; i += 1) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid; else lo = mid;
  }
  return (lo + hi) / 2;
}

test('IRR solver agrees with the Excel RATE equation for level payments', () => {
  for (const [n, pmt, pv] of [[12, 2550, 30000], [24, 2714, 60000], [48, 200, 8000], [6, 5200, 30000], [36, 1000, 30000]]) {
    const ours = irrMonthly([pv, ...Array(n).fill(-pmt)]);
    assert.ok(Math.abs(ours - excelRate(n, -pmt, pv)) < 1e-10, `${n} x ${pmt}`);
  }
});

test('Microsoft documents RATE(48,-200,8000) = 0.77% a month (9.24% a year)', () => {
  const m = irrMonthly([8000, ...Array(48).fill(-200)]);
  assert.equal((m * 100).toFixed(2), '0.77');
  assert.equal((m * 12 * 100).toFixed(2), '9.24');
});

test('合作金庫 青安 example: 2,000,000 / 20 years / 2.275% / fees 5,300 discloses 2.30% -> APR is monthly IRR x 12, not compounded', () => {
  const r = evaluatePlan({ listPrice: 2000000, n: 240, aprPct: 2.275, oneTimeFee: 5300, feeTiming: 'upfront' });
  assert.equal(r.aprPct, 2.3);
  assert.equal(r.compoundedPct, 2.33);
});

test('算例一: 30,000, 12 期, 零利率, 手續費 600 加在第 1 期', () => {
  const r = evaluatePlan({ listPrice: 30000, n: 12, oneTimeFee: 600 });
  assert.equal(r.firstPayment, 3100);
  assert.equal(r.schedule.rows[1].payment, 2500);
  assert.equal(r.totalPaid, 30600);
  assert.equal(r.totalCost, 600);
  assert.equal(r.totalInterest, 0);
  assert.equal((r.monthly * 100).toFixed(4), '0.3112');
  assert.equal(r.aprPct, 3.73);
  assert.equal(r.compoundedPct, 3.8);
  assert.equal(evaluatePlan({ listPrice: 30000, n: 12, oneTimeFee: 600, feeTiming: 'upfront' }).aprPct, 3.75);
  assert.equal(Math.round(irrMonthly([30000, ...Array(12).fill(-2550)]) * 12 * 10000) / 100, 3.67);
  // the page's intuition: average balance of an equal-principal plan is (n+1)/(2n) of the price
  assert.equal(((2 / (13 / 24))).toFixed(2), '3.69');
});

test('對照表 one-time fee x periods', () => {
  const rows = { 1: [6.02, 3.45, 1.86, 0.97], 2: [12.08, 6.92, 3.73, 1.94], 3: [18.18, 10.43, 5.63, 2.93], 5: [30.5, 17.56, 9.5, 4.95] };
  for (const [fee, expected] of Object.entries(rows)) {
    assert.deepEqual([3, 6, 12, 24].map((n) => aprOfOneTimeFee(Number(fee), n)), expected, `fee ${fee}%`);
  }
});

test('短期分期: 30,000, 3 期, 手續費 900 -> 18.18%, 多付 900', () => {
  const r = evaluatePlan({ listPrice: 30000, n: 3, oneTimeFee: 900 });
  assert.equal(r.aprPct, 18.18);
  assert.equal(r.totalCost, 900);
});

test('每期手續費 100 x 12 期 = 1,200, 年百分率 7.3%', () => {
  const r = evaluatePlan({ listPrice: 30000, n: 12, perPeriodFee: 100 });
  assert.equal(r.firstPayment, 2600);
  assert.equal(r.totalFees, 1200);
  assert.equal(r.totalCost, 1200);
  assert.equal(r.aprPct, 7.3);
});

test('算例二: 60,000, 24 期, 年利率為假設值', () => {
  const f = annuityFactor(0.08 / 12, 24);
  assert.equal(f.toFixed(7), '0.0452273');
  assert.equal(Math.round(60000 * f), 2714);
  const out = Object.fromEntries([6, 8, 10].map((rate) => {
    const r = evaluatePlan({ listPrice: 60000, n: 24, aprPct: rate });
    return [rate, [r.firstPayment, r.totalInterest, r.totalPaid, r.aprPct]];
  }));
  assert.deepEqual(out[8], [2714, 5127, 65127, 8]);
  assert.equal(out[6][3], 6);
  assert.equal(out[10][3], 10);
  const eq = evaluatePlan({ listPrice: 60000, n: 24, aprPct: 8, method: 'equalPrincipal' });
  assert.equal(eq.firstPayment, 2900);
  assert.equal(eq.lastPayment, 2517);
  assert.equal(eq.totalInterest, 5000);
  const withFee = evaluatePlan({ listPrice: 60000, n: 24, aprPct: 8, perPeriodFee: 50 });
  assert.equal(withFee.firstPayment, 2764);
  assert.equal(withFee.totalCost, 6327);
});

test('schedule never leaves a balance and never pays negative principal', () => {
  for (const method of ['annuity', 'equalPrincipal']) {
    for (const [price, n, rate] of [[60000, 24, 8], [30000, 12, 0], [12345, 7, 3.3], [100000, 3, 15]]) {
      const { rows } = buildSchedule({ listPrice: price, n, aprPct: rate, method });
      assert.equal(rows.at(-1).balance, 0, `${method} ${price}/${n}/${rate}`);
      assert.equal(rows.reduce((s, r) => s + r.principal, 0), price);
      assert.ok(rows.every((r) => r.principal >= 0 && r.interest >= 0));
    }
  }
});

test('算例三: 現金價 28,800 vs 分期 12 期共 30,000 -> 標準年百分率 0%, 含價差 7.6%', () => {
  const r = evaluatePlan({ listPrice: 30000, cashPrice: 28800, n: 12 });
  assert.equal(r.aprPct, 0);
  assert.equal(r.totalCost, 1200);
  assert.equal(r.aprRealPct, 7.6);
  assert.equal(r.compoundedRealPct, 7.87);
  assert.equal(r.hasPriceGap, true);
});

test('算例四: 提前結清 -- 手續費不退, 年百分率反而更高', () => {
  const input = { listPrice: 30000, n: 12, oneTimeFee: 600 };
  const rows = [1, 3, 6, 9, 11].map((k) => {
    const e = earlySettlement(input, k, 0);
    return [k, e.remaining, e.totalPaid, e.aprPct];
  });
  assert.deepEqual(rows, [[1, 27500, 30600, 24], [3, 22500, 30600, 8.79], [6, 15000, 30600, 5.1], [9, 7500, 30600, 4.04], [11, 2500, 30600, 3.78]]);
  assert.ok(rows.every((row) => row[3] > 3.73), 'every early settlement is dearer per year than running to term');
  assert.equal(earlySettlement(input, 12, 0), null);
  assert.equal(earlySettlement({ ...input, paymentOverride: 2600 }, 6, 0), null);
  // a settlement fee adds cost
  assert.ok(earlySettlement(input, 6, 300).totalPaid === 30900);
});

test('帳單金額已知: 每期 2,600 x 12 for 30,000 -> 7.3%', () => {
  const r = evaluatePlan({ listPrice: 30000, n: 12, paymentOverride: 2600 });
  assert.equal(r.totalPaid, 31200);
  assert.equal(r.aprPct, 7.3);
});

test('no solution -> NaN, never a made-up rate', () => {
  assert.ok(Number.isNaN(irrMonthly([100, 50])));
  assert.ok(Number.isNaN(irrMonthly([-100, -50])));
  assert.ok(Number.isNaN(irrMonthly([0])));
});

// P2 batch 3 (2026-10-17): the page must say how the annual figure is computed and what it was checked
// against, must date the bank-association snapshot, and must no longer link the merged article.
import { readFileSync } from 'node:fs';
const zhPage = readFileSync(new URL('../src/pages/zh/tools/installment-true-apr.astro', import.meta.url), 'utf8');
const stubs = JSON.parse(readFileSync(new URL('../src/data/redirect-stubs.json', import.meta.url), 'utf8')).stubs;

test('the page states the 月 IRR × 12 method and its verification against the 合作金庫 example', () => {
  assert.match(zhPage, /先解出月 IRR/);
  assert.match(zhPage, /乘以 12/);
  assert.match(zhPage, /2\.30%/);
  assert.match(zhPage, /2\.33%/);
  assert.match(zhPage, /合作金庫/);
  const r = evaluatePlan({ listPrice: 2000000, n: 240, aprPct: 2.275, oneTimeFee: 5300, feeTiming: 'upfront' });
  assert.equal(r.aprPct, 2.3);
  assert.equal(r.compoundedPct, 2.33);
});

test('the bank-association fee table is labelled as a dated snapshot', () => {
  assert.match(zhPage, /2026-07-22 的快照/);
  assert.match(zhPage, /115 年 7 月 22 日/);
});

test('zero-interest-installments-truth is a redirect stub to the tool, and the tool does not link it', () => {
  assert.ok(stubs.some((s) => s.from === '/zh/zero-interest-installments-truth/' && s.to === '/zh/tools/installment-true-apr/'));
  assert.ok(stubs.some((s) => s.from === '/en/zero-interest-installments-truth/' && s.to === '/en/tools/installment-true-apr/'));
  assert.ok(!zhPage.includes('zero-interest-installments-truth'));
});

// ---------------------------------------------------------------------------------------------------------------
// P2 batch 4 (2026-10-17): 帳單分期 mode
// ---------------------------------------------------------------------------------------------------------------
import { ANNOUNCED_EARLY_FEES, billEarlySettlement, evaluateBillInstallment } from '../src/lib/twInstallmentMath.mjs';

test('富邦公布的帳單分期對照表（1 萬元、3.9%~15%）：12 個格子與年金法函式逐格相同', () => {
  const published = { 3: [3355, 3417], 6: [1686, 1740], 12: [851, 903], 18: [573, 624], 24: [434, 485], 30: [350, 402] };
  for (const [n, [lo, hi]] of Object.entries(published)) {
    assert.equal(evaluatePlan({ listPrice: 10000, n: Number(n), aprPct: 3.9 }).firstPayment, lo, `${n} 期 3.9%`);
    assert.equal(evaluatePlan({ listPrice: 10000, n: Number(n), aprPct: 15 }).firstPayment, hi, `${n} 期 15%`);
  }
  // 富邦的 100,000 元 / 12 期 / I = 1.71% 範例: 分期利率 4.62%~15%, 年百分率等於分期利率
  assert.equal(evaluatePlan({ listPrice: 100000, n: 12, aprPct: 4.62 }).aprPct, 4.62);
  assert.equal(evaluatePlan({ listPrice: 100000, n: 12, aprPct: 15 }).aprPct, 15);
});

test('算例五: 帳單 30,000 / 最低應繳 3,000 / 先繳 3,000 / 12 期 / 10%', () => {
  const r = evaluateBillInstallment({ statementTotal: 30000, minimumDue: 3000, paidNow: 3000, n: 12, aprPct: 10, revolvingAprPct: 15 });
  assert.equal(r.financed, 27000);
  assert.deepEqual(r.checks, { paidAtLeastMinimum: true, financeableEnough: true, positive: true });
  assert.equal(annuityFactor(0.1 / 12, 12).toFixed(7), '0.0879159');
  assert.equal(r.plan.firstPayment, 2374);
  assert.equal(r.plan.lastPayment, 2369);
  assert.equal(r.plan.totalInterest, 1483);
  assert.equal(r.plan.totalPaid, 28483);
  assert.equal(r.plan.aprPct, 9.99); // per-bill rounding to the dollar; the bank-disclosed figure is the 10% rate itself
  // keep revolving at 15% and pay the same amount every month
  assert.equal(r.revolving.status, 'paidOff');
  assert.equal(r.revolving.months, 13);
  assert.equal(r.revolving.totalInterest, 2273);
  assert.equal(r.revolving.extraVsInstallment, 790);
  const at12 = evaluateBillInstallment({ statementTotal: 30000, minimumDue: 3000, paidNow: 3000, n: 12, aprPct: 10, revolvingAprPct: 12 }).revolving;
  assert.equal(at12.totalInterest, 1780);
  assert.equal(at12.extraVsInstallment, 297);
  // the table by instalment count
  const byN = Object.fromEntries([6, 12, 18, 24, 30].map((n) => [n, evaluatePlan({ listPrice: 27000, n, aprPct: 10 })]));
  assert.deepEqual([6, 12, 18, 24, 30].map((n) => byN[n].firstPayment), [4632, 2374, 1622, 1246, 1021]);
  assert.deepEqual([6, 12, 18, 24, 30].map((n) => byN[n].totalInterest), [792, 1483, 2188, 2904, 3624]);
  assert.deepEqual([6, 12, 18, 24, 30].map((n) => byN[n].totalPaid), [27792, 28483, 29188, 29904, 30624]);
});

test('帳單分期的資格檢查: 至少先繳最低應繳; 應繳總額扣最低應繳要達門檻', () => {
  const base = { statementTotal: 30000, minimumDue: 3000, n: 12, aprPct: 10 };
  assert.equal(evaluateBillInstallment({ ...base, paidNow: 2000 }).checks.paidAtLeastMinimum, false);
  assert.equal(evaluateBillInstallment({ ...base, statementTotal: 3900 }).checks.financeableEnough, false); // 900 < 1,000
  assert.equal(evaluateBillInstallment({ ...base, statementTotal: 4000 }).checks.financeableEnough, true); // 1,000 >= 1,000
  assert.equal(evaluateBillInstallment({ ...base, paidNow: 30000 }).plan, null); // nothing left to finance
  assert.equal(evaluateBillInstallment({ ...base }).paid, 3000); // default: pay only the minimum
  // paying more now shrinks the financed amount one for one
  assert.equal(evaluateBillInstallment({ ...base, paidNow: 8000 }).financed, 22000);
});

test('算例六: 提前結清 (27,000 / 12 期 / 10%) 與三家公告的違約金', () => {
  const loan = { financed: 27000, n: 12, aprPct: 10 };
  const rows = { 1: [24851, 1258], 3: [20499, 862], 6: [13834, 405], 9: [7000, 117], 11: [2349, 20] };
  for (const [k, [remaining, avoided]] of Object.entries(rows)) {
    const e = billEarlySettlement(loan, Number(k), 0);
    assert.equal(e.remaining, remaining, `k=${k} remaining`);
    assert.equal(e.interestAvoided, avoided, `k=${k} interest avoided`);
    // interest already paid + interest avoided = total interest
    assert.equal(e.interestPaid + e.interestAvoided, 1483);
  }
  assert.equal(billEarlySettlement(loan, 12, 0), null);
  assert.equal(billEarlySettlement(loan, 0, 0), null);
  const fees = (k) => [ANNOUNCED_EARLY_FEES.taishin(k, 12), ANNOUNCED_EARLY_FEES.fubon(k, 12), ANNOUNCED_EARLY_FEES.dbs(k, 12)];
  assert.deepEqual(fees(1), [300, 160, 300]);
  assert.deepEqual(fees(3), [300, 150, 300]);
  assert.deepEqual(fees(6), [200, 140, 300]);
  assert.deepEqual(fees(9), [200, 140, 150]);
  assert.deepEqual(fees(11), [200, 140, 150]);
  // 提前結清只有省下的利息大於違約金才划算
  assert.equal(billEarlySettlement(loan, 3, 300).netSaving, 562);
  assert.equal(billEarlySettlement(loan, 3, 150).netSaving, 712);
  assert.equal(billEarlySettlement(loan, 6, 300).netSaving, 105);
  assert.equal(billEarlySettlement(loan, 9, 200).netSaving, -83);
  assert.equal(billEarlySettlement(loan, 11, 200).netSaving, -180);
});

test('帳單分期 page text: the bank announcements it quotes are the numbers in the function and the page uses the same defaults as the component', () => {
  const page = readFileSync(new URL('../src/pages/zh/tools/installment-true-apr.astro', import.meta.url), 'utf8');
  const comp = readFileSync(new URL('../src/components/TWBillInstallmentCalculator.astro', import.meta.url), 'utf8');
  assert.ok(page.includes("const billIn = { statementTotal: 30000, minimumDue: 3000, paidNow: 3000, n: 12, aprPct: 10, revolvingAprPct: 15 };"));
  for (const frag of ['id="bp-total" type="number" inputmode="numeric" min="0" step="1000" value="30000"', 'id="bp-min" type="number" inputmode="numeric" min="0" step="100" value="3000"', 'id="bp-paid" type="number" inputmode="numeric" min="0" step="100" value="3000"', '<option value="12" selected>', 'id="bp-rate" type="number" inputmode="decimal" min="0" max="100" step="0.01" value="10"', 'id="bp-rev" type="number" inputmode="decimal" min="0" max="100" step="0.01" value="15"']) {
    assert.ok(comp.includes(frag), frag);
  }
  // the three issuers' published fee tiers, as quoted on the page
  for (const frag of ['160 元', '150 元', '140 元', '已入帳 1~5 期 300 元', '6~11 期 200 元', '未到期期數超過或等同申辦期數的一半 300 元', '少於一半 150 元', '年利率 6.25%~15%', '約定年利率 2.99%~14.99%', '上限 15%']) {
    assert.ok(page.includes(frag), frag);
  }
});
