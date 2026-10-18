// P2 batch 8 (2026-10-18): recompute the worked examples that the 14 re-sourced pages print, with the same
// functions the calculators run, and pin the zh defaults that replaced foreign (US) rules.
// Needs .growth-test-dist, which `npm run test:growth` builds first.
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateSalaryConversion,
  calculateDti,
  calculateCarAffordability,
  calculateHomeAffordability,
} from '../.growth-test-dist/index.js';
import { ZH_GROWTH_DEFAULTS } from '../src/data/twGrowthDefaults.mjs';
import { calculateTwDebtRatios } from '../src/lib/twDbrMath.mjs';
import { solveTwHomeAffordability } from '../src/lib/twHomeAffordMath.mjs';

test('hourly-vs-annual-salary: 時薪 220 × 40 小時 × 52 週 = 457,600', () => {
  const r = calculateSalaryConversion({ hourlyRate: 220, hoursPerWeek: 40, paidWeeksPerYear: 52, salaryPaymentsPerYear: 12 });
  assert.equal(r.annualGross, 457600);
  assert.equal(220 * 40 * 52, 457600);
});

test('dti-calculator / how-to-calculate-dti: 月收入 80,000、房貸月付 26,000、信貸月付 12,000、無擔保餘額 480,000', () => {
  // P2 batch 10: the zh page now runs src/lib/twDbrMath.mjs; the shared calculateDti still serves the en page.
  const r = calculateDti({ grossMonthlyIncome: 80000, housingPayment: 26000, debts: [{ id: 'loan', name: '信貸', monthlyPayment: 12000 }] });
  assert.equal(r.frontEndPercent, 32.5);
  assert.equal(r.backEndPercent, 47.5);
  const tw = calculateTwDebtRatios({ monthlyIncome: 80000, cardBalance: 80000, creditLoanBalance: 400000, mortgagePayment: 26000, otherMonthlyPayments: 12000 });
  assert.equal(tw.dbr, 6);
  assert.equal(tw.mortgageRatio * 100, 32.5);
  assert.equal(tw.totalPaymentRatio * 100, 47.5);
  assert.equal(400000 + 80000, 480000);
  assert.equal(480000 / 80000, 6); // DBR, a plain division
  assert.ok(r.frontEndPercent < 100 / 3 && r.frontEndPercent > 20, '32.5% sits between 1/3 and 1/5 (金融健檢 黃燈)');
});

test('true-cost-of-car-ownership: 實領 90,000、上限 15%、持有成本 8,000 → 車貸月付 5,500', () => {
  const r = calculateCarAffordability({
    monthlyTakeHomeIncome: 90000, currentDebtPayments: 0, essentialLivingCosts: 0, monthlySavingsTarget: 0,
    downPayment: 0, tradeInNetValue: 0, annualRatePercent: 2, termMonths: 60, taxesAndFees: 0,
    monthlyInsurance: 3000, monthlyFuelOrCharging: 2500, monthlyMaintenance: 1500, monthlyParkingAndTolls: 1000,
    maxTransportationSharePercent: 15,
  });
  assert.equal(r.monthlyOperatingCost, 8000);
  assert.equal(r.affordableMonthlyLoanPayment, 5500);
  assert.equal(90000 * 0.15, 13500);
});

test('how-much-home-can-you-afford: 15 萬收入 → 1/3 月付上限 50,000 → 8 成 16,900,000, 7 成 19,320,000, 3 成 45,090,000 (P2 batch 10: the zh tool runs src/lib/twHomeAffordMath.mjs)', () => {
  assert.equal(150000 / 3, 50000);
  const base = { monthlyIncome: 150000, aprPct: 2, years: 30, region: 'other' };
  assert.equal(solveTwHomeAffordability({ ...base, identity: 'noLoanNoHouse', ltvPct: 80 }).maxPrice, 16900000);
  assert.equal(solveTwHomeAffordability({ ...base, identity: 'oneLoan' }).maxPrice, 19320000);
  assert.equal(solveTwHomeAffordability({ ...base, identity: 'highPrice' }).maxPrice, 45090000);
  // the shared calculateHomeAffordability still serves the en page
  const r = calculateHomeAffordability({
    grossMonthlyIncome: 150000, otherMonthlyDebtPayments: 15000, maxDebtToIncomePercent: 40, downPayment: 4000000,
    annualRatePercent: 2.2, termMonths: 360, annualPropertyTaxPercent: 0, annualHomeInsurance: 0,
    monthlyAssociationFees: 8000, annualMaintenancePercent: 0, annualMortgageInsurancePercent: 0,
    mortgageInsuranceLtvThresholdPercent: 80, closingCostPercent: 0, fixedClosingCosts: 0,
  });
  assert.equal(r.monthlyHousingLimit, 45000);
});

test('budget-with-irregular-income: 年繳與半年繳換算成每月', () => {
  assert.equal(36000 / 12, 3000); // 年繳所得稅 3.6 萬
  assert.equal((18000 * 2) / 12, 3000); // 半年繳保費 1.8 萬
  assert.equal((18000 * 2 + 12000) / 12, 4000); // 汽車保險 + 房屋稅
});

test('zh defaults: Taiwanese rule instead of the shared US value', () => {
  assert.equal(ZH_GROWTH_DEFAULTS.overtimeMultiplier, 1.34); // 勞基法第 24 條 first two hours, 1 + 1/3 rounded
  assert.ok(Math.abs((1 + 1 / 3) - 1.34) < 0.01);
  assert.ok(ZH_GROWTH_DEFAULTS.debt1Rate <= 15); // 銀行法第 47-1 條 cap
  // homeThresholdPercent / mortgageInsurancePercent were retired in P2 batch 10 with the US home calculator on zh
  assert.equal('homeThresholdPercent' in ZH_GROWTH_DEFAULTS, false);
  assert.equal('mortgageInsurancePercent' in ZH_GROWTH_DEFAULTS, false);
});
