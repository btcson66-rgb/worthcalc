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

test('hourly-vs-annual-salary: 時薪 220 × 40 小時 × 52 週 = 457,600', () => {
  const r = calculateSalaryConversion({ hourlyRate: 220, hoursPerWeek: 40, paidWeeksPerYear: 52, salaryPaymentsPerYear: 12 });
  assert.equal(r.annualGross, 457600);
  assert.equal(220 * 40 * 52, 457600);
});

test('dti-calculator / how-to-calculate-dti: 月收入 80,000、房貸月付 26,000、信貸月付 12,000、無擔保餘額 480,000', () => {
  const r = calculateDti({ grossMonthlyIncome: 80000, housingPayment: 26000, debts: [{ id: 'loan', name: '信貸', monthlyPayment: 12000 }] });
  assert.equal(r.frontEndPercent, 32.5);
  assert.equal(r.backEndPercent, 47.5);
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

test('how-much-home-can-you-afford: 150,000 × 40% − 15,000 − 8,000 = 37,000, and the calculator agrees on the 45,000 limit', () => {
  assert.equal(150000 * 0.4 - 15000, 45000);
  assert.equal(45000 - 8000, 37000);
  const r = calculateHomeAffordability({
    grossMonthlyIncome: 150000, otherMonthlyDebtPayments: 15000, maxDebtToIncomePercent: 40, downPayment: 4000000,
    annualRatePercent: 2.2, termMonths: 360, annualPropertyTaxPercent: 0, annualHomeInsurance: 0,
    monthlyAssociationFees: 8000, annualMaintenancePercent: 0, annualMortgageInsurancePercent: 0,
    mortgageInsuranceLtvThresholdPercent: 80, closingCostPercent: 0, fixedClosingCosts: 0,
  });
  assert.equal(r.monthlyHousingLimit, 45000);
  assert.ok(Math.abs(r.breakdown.totalMonthlyHousing - 45000) < 1, 'the solved price spends the whole limit');
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
  assert.equal(ZH_GROWTH_DEFAULTS.homeThresholdPercent, 33.3); // 金融健檢 1/3
  assert.ok(Math.abs(100 / 3 - ZH_GROWTH_DEFAULTS.homeThresholdPercent) < 0.05);
  assert.equal(ZH_GROWTH_DEFAULTS.mortgageInsurancePercent, 0);
});
