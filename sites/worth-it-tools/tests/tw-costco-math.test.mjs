// P2 batch 3 (2026-10-17): the arithmetic and date rules behind /zh/costco-math/ and the Costco tool.
// Each assertion is either an official example (named in the test) or plain arithmetic on official terms.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { accrualWindows, capSpend, executiveRefund, firstWindowMonthlyNeed, issueDate, netOfTax, proratedUpgradeIllustration, rewardOn, upgradeBreakeven, useByDate } from '../src/lib/twCostcoMath.mjs';

const rates = JSON.parse(readFileSync(new URL('../data/rates.json', import.meta.url), 'utf8')).costco_tw;
const exec = rates.tiers.executive;

test('official FAQ Q2 example: expiry 2025/11/30, upgrade 2025/03/04', () => {
  assert.deepEqual(accrualWindows('2025-03-04', '2025-11-30'), [
    { from: '2025-03-04', to: '2025-08-31' },
    { from: '2025-09-01', to: '2026-08-31' },
  ]);
});

test('issue date is the 1st of the month two months before expiry, which is the day after window 1 ends', () => {
  assert.equal(issueDate('2025-11-30'), '2025-09-01');
  assert.equal(issueDate('2027-03-31'), '2027-01-01');
  assert.deepEqual(accrualWindows('2026-10-17', '2027-03-31'), [
    { from: '2026-10-17', to: '2026-12-31' },
    { from: '2027-01-01', to: '2027-12-31' },
  ]);
  assert.equal(useByDate('2027-01-01'), '2028-01-01');
});

test('upgrade break-even and cap come from the data file, not typed numbers', () => {
  assert.equal(upgradeBreakeven(rates.upgrade_delta, exec.reward_rate), rates.breakeven_qualified_spend);
  assert.equal(upgradeBreakeven(rates.upgrade_delta, exec.reward_rate), 75000);
  assert.equal(capSpend(exec.reward_cap, exec.reward_rate), 1500000);
});

test('2% is computed on the amount after 5% 營業稅', () => {
  assert.equal(netOfTax(10500), 10000);
  assert.equal(rewardOn(10500, 0.02), 200);
  assert.equal(rewardOn(21000, 0.02), 400);
  // the cap binds: 100 left in the year
  assert.equal(rewardOn(21000, 0.02, 0.05, 100), 100);
  // naive "2% of the receipt total" overstates by exactly the tax share
  assert.equal(Math.round(10500 * 0.02), 210);
});

test('規章 H.8 refund of a directly-bought 黑鑽卡', () => {
  assert.equal(executiveRefund(exec.annual_fee, 'beforeIssue'), 3000);
  assert.equal(executiveRefund(exec.annual_fee, 'issuedUnused'), 3000);
  assert.equal(executiveRefund(exec.annual_fee, 'issuedUsed', 1200), 1800);
  assert.equal(executiveRefund(exec.annual_fee, 'issuedUsed', 5000), 0);
});

test('month-proration illustration', () => {
  assert.equal(proratedUpgradeIllustration(rates.upgrade_delta, 6), 750);
  assert.equal(proratedUpgradeIllustration(rates.upgrade_delta, 12), 1500);
});

test('the Costco pages print no exclusion that the official list does not contain', () => {
  const files = ['../src/pages/zh/costco-math.astro', '../src/pages/zh/tools/costco-membership.astro', '../src/data/decisionGuides.ts'];
  for (const f of files) {
    const text = readFileSync(new URL(f, import.meta.url), 'utf8');
    // 菸酒 and 電信 are not on the official 2% exclusion list (FAQ Q1, read 2026-10-17)
    assert.ok(!/菸酒|電信/.test(text.split('\n').filter((l) => /好市多|Costco|回饋|合格/.test(l)).join('\n')), `${f} still names 菸酒/電信 as excluded`);
  }
});

test('first-window illustration: accrual stops 3 months before expiry, fee assumed prorated by months left', () => {
  assert.equal(firstWindowMonthlyNeed(rates.upgrade_delta, exec.reward_rate, 12), 8333);
  assert.equal(firstWindowMonthlyNeed(rates.upgrade_delta, exec.reward_rate, 9), 9375);
  assert.equal(firstWindowMonthlyNeed(rates.upgrade_delta, exec.reward_rate, 6), 12500);
  assert.equal(firstWindowMonthlyNeed(rates.upgrade_delta, exec.reward_rate, 4), 25000);
  assert.ok(Number.isNaN(firstWindowMonthlyNeed(rates.upgrade_delta, exec.reward_rate, 3)));
  // steady state (a full membership year of accrual) is the plain 75,000 / 12
  assert.equal(Math.round(rates.breakeven_qualified_spend / 12), 6250);
});
