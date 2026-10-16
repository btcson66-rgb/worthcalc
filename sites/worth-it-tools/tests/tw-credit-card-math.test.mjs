// P2 batch 1 (2026-10-16): the arithmetic behind the 信用卡循環利息計算器. Every
// number printed in src/content/growth-tools/zh/credit-card-payoff.md is asserted
// here, against the same module the page script imports.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cycleInterest, dailyInterest, minimumPayment, simulate, APR_CAP_PCT } from '../src/lib/twCreditCardMath.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/credit-card-payoff.md', import.meta.url), 'utf8');
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const base = { principal: 30000, aprPct: 15, days: 30 };

test('the cap constant is the 銀行法 47-1 figure', () => assert.equal(APR_CAP_PCT, 15));

test('daily and cycle interest: 30,000 at 15%', () => {
  assert.equal(dailyInterest(30000, 15).toFixed(2), '12.33');
  assert.equal(cycleInterest(30000, 15, 30), 370);
  assert.equal(cycleInterest(100000, 15, 30), 1233);
  assert.equal(minimumPayment({ principal: 30000, interest: 370 }), 1870);
  assert.equal(minimumPayment({ principal: 100000, interest: 1233 }), 6233);
  assert.ok(md.includes('12.33 元，30 天一期 = 370 元'));
});

test('minimum-payment path: first three months', () => {
  const r = simulate({ ...base, mode: 'minimum' });
  const rows = r.schedule.slice(0, 3).map((x) => [x.interest, x.payment, x.principalPaid, x.balance]);
  assert.deepEqual(rows, [[370, 1870, 1500, 28500], [351, 1776, 1425, 27075], [334, 1688, 1354, 25721]]);
  for (const [i, row] of rows.entries()) {
    assert.ok(md.includes(`| ${i + 1} | ${fmt(row[0])} 元 | ${fmt(row[1])} 元 | ${fmt(row[2])} 元 | ${fmt(row[3])} 元 |`), `row ${i + 1}`);
  }
});

test('minimum-payment totals: under 1,000, to zero, with a 1,000 floor', () => {
  const r = simulate({ ...base, mode: 'minimum' });
  assert.equal(r.monthsUnder1000, 67);
  assert.equal(r.interestUntilUnder1000, 7155);
  assert.equal(r.payoffMonths, 154);
  assert.equal(r.totalInterest, 7378);
  assert.equal(r.totalPaid, 37378);
  assert.equal((67 / 12).toFixed(1), '5.6');
  const floored = simulate({ ...base, mode: 'minimum', floor: 1000 });
  assert.equal(floored.payoffMonths, 31);
  assert.equal(floored.totalInterest, 5379);
  for (const text of ['第 67 個月（約 5.6 年），累計利息 7,155 元', '第 154 個月，累計利息 7,378 元，總共繳 37,378 元', '31 個月還清，累計利息 5,379 元']) {
    assert.ok(md.includes(text), text);
  }
});

test('interest is never capitalised: total interest is the sum of per-cycle interest on the principal', () => {
  const r = simulate({ ...base, mode: 'fixed', payment: 3000 });
  assert.equal(r.schedule.reduce((s, x) => s + x.interest, 0), r.totalInterest);
  assert.equal(r.schedule.reduce((s, x) => s + x.principalPaid, 0), 30000);
  assert.equal(r.totalPaid, 30000 + r.totalInterest);
});

test('fixed payments', () => {
  const expected = { 3000: [11, 2217, 32217], 2000: [17, 3380, 33380], 1500: [24, 4661, 34661], 1000: [38, 7688, 37688] };
  for (const [payment, [months, interest, paid]] of Object.entries(expected)) {
    const r = simulate({ ...base, mode: 'fixed', payment: Number(payment) });
    assert.equal(r.payoffMonths, months);
    assert.equal(r.totalInterest, interest);
    assert.equal(r.totalPaid, paid);
    assert.ok(md.includes(`| ${fmt(Number(payment))} 元 | ${months} 個月 | ${fmt(interest)} 元 | ${fmt(paid)} 元 |`), `fixed ${payment}`);
  }
  assert.equal(simulate({ ...base, mode: 'fixed', payment: 370 }).status, 'paymentTooLow');
  assert.equal(simulate({ ...base, mode: 'fixed', payment: 300 }).status, 'paymentTooLow');
});

test('rate sensitivity table and the 100,000 case', () => {
  const rows = { 8: [197, 3819, 3935], 12: [296, 5722, 5900], 15: [370, 7155, 7378] };
  for (const [apr, [first, under, total]] of Object.entries(rows)) {
    const r = simulate({ ...base, aprPct: Number(apr), mode: 'minimum' });
    assert.equal(r.schedule[0].interest, first);
    assert.equal(r.interestUntilUnder1000, under);
    assert.equal(r.totalInterest, total);
    assert.equal(r.monthsUnder1000, 67);
    assert.equal(r.payoffMonths, 154);
    assert.ok(md.includes(`| ${apr}% | ${first} 元 | ${fmt(under)} 元 | ${fmt(total)} 元 |`), `apr ${apr}`);
  }
  const big = simulate({ principal: 100000, aprPct: 15, mode: 'minimum' });
  assert.equal(big.monthsUnder1000, 90);
  assert.equal(big.interestUntilUnder1000, 24408);
  const bigFixed = simulate({ principal: 100000, aprPct: 15, mode: 'fixed', payment: 5000 });
  assert.equal(bigFixed.payoffMonths, 24);
  assert.equal(bigFixed.totalInterest, 15530);
  assert.ok(md.includes('第 90 個月（7.5 年），累計利息 24,408 元'));
  assert.ok(md.includes('24 個月還清，累計利息 15,530 元'));
});

test('the 1,000-yuan clause only lowers interest', () => {
  const on = simulate({ ...base, mode: 'minimum', freeUnder1000: true });
  const off = simulate({ ...base, mode: 'minimum' });
  assert.ok(on.totalInterest < off.totalInterest);
  assert.equal(on.interestUntilUnder1000, off.interestUntilUnder1000);
});

test('Excel formulas in the page', () => {
  assert.equal(Math.round(30000 * 0.15 * 30 / 365), 370);
  const i = 0.15 * 30 / 365;
  const nper = -Math.log(1 - (30000 * i) / 3000) / Math.log(1 + i);
  assert.equal(nper.toFixed(2), '10.74');
  assert.equal((30000 * 0.95 ** 3).toFixed(2), '25721.25');
  assert.ok(md.includes('得 10.74，進位為 11 個月'));
  assert.ok(md.includes('得 25,721.25'));
});
