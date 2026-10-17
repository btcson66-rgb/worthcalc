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
