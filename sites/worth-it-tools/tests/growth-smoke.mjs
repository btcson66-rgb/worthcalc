import assert from 'node:assert/strict';
import {
  calculateMortgagePayoff,
  calculateCreditCardPayoff,
  calculateBudget,
  calculateDebtStrategy,
  calculateCarAffordability,
  calculateSalaryConversion,
  calculateDti,
  calculateHomeAffordability,
  calculateInflationAdjustment,
  calculateCompoundGrowth,
} from '../.growth-test-dist/index.js';

const mortgage = calculateMortgagePayoff({ balance: 200000, annualRatePercent: 5, remainingMonths: 360, extraMonthly: 200 });
assert(mortgage.acceleratedMonths < mortgage.baselineMonths);
assert(mortgage.interestSaved > 0);

const card = calculateCreditCardPayoff({ balance: 5000, annualRatePercent: 20, mode: 'targetMonths', targetMonths: 24 });
assert(card.payoffMonths !== null && card.payoffMonths <= 24);

const budget = calculateBudget({
  income: [{ id: 'i', name: 'salary', amount: 60000, frequency: 'annual', category: 'other' }],
  expenses: [{ id: 'e', name: 'rent', amount: 1500, frequency: 'monthly', category: 'needs' }],
});
assert.equal(Math.round(budget.monthlyIncome), 5000);
assert.equal(Math.round(budget.monthlySurplus), 3500);

const debt = calculateDebtStrategy({
  debts: [
    { id: 'a', name: 'A', balance: 1000, annualRatePercent: 20, minimumPayment: 50 },
    { id: 'b', name: 'B', balance: 2000, annualRatePercent: 5, minimumPayment: 60 },
  ],
  extraMonthlyPayment: 200,
  strategy: 'avalanche',
});
assert(debt.payoffMonths !== null);

const car = calculateCarAffordability({
  monthlyTakeHomeIncome: 5000, currentDebtPayments: 300, essentialLivingCosts: 2500, monthlySavingsTarget: 500,
  downPayment: 5000, tradeInNetValue: 2000, annualRatePercent: 6, termMonths: 60, taxesAndFees: 1500,
  monthlyInsurance: 150, monthlyFuelOrCharging: 150, monthlyMaintenance: 80, monthlyParkingAndTolls: 20,
  maxTransportationSharePercent: 15,
});
assert(car.maxVehiclePrice > 0);

const salary = calculateSalaryConversion({ hourlyRate: 25, hoursPerWeek: 40, paidWeeksPerYear: 52, salaryPaymentsPerYear: 12 });
assert.equal(salary.annualGross, 52000);

const dti = calculateDti({ grossMonthlyIncome: 8000, housingPayment: 2000, debts: [{ id: 'c', name: 'car', monthlyPayment: 400 }] });
assert.equal(Math.round(dti.backEndPercent), 30);

const home = calculateHomeAffordability({
  grossMonthlyIncome: 8000, otherMonthlyDebtPayments: 400, maxDebtToIncomePercent: 36, downPayment: 60000,
  annualRatePercent: 6, termMonths: 360, annualPropertyTaxPercent: 1.1, annualHomeInsurance: 1800,
  monthlyAssociationFees: 100, annualMaintenancePercent: 1, annualMortgageInsurancePercent: 0.5,
  mortgageInsuranceLtvThresholdPercent: 80, closingCostPercent: 3, fixedClosingCosts: 0,
});
assert(home.maxHomePrice > home.loanAmount);

const inflation = calculateInflationAdjustment({ amount: 100, startPeriod: '2020', endPeriod: '2025', series: [{ period: '2020', index: 100 }, { period: '2025', index: 120 }] });
assert.equal(inflation.adjustedAmount, 120);

const growth = calculateCompoundGrowth({ initialPrincipal: 10000, monthlyContribution: 500, annualReturnPercent: 7, annualFeePercent: 0.2, annualInflationPercent: 2, years: 10 });
assert(growth.endingBalance > growth.totalContributions);

console.log('WorthCalc calculation-engine smoke tests passed.');
