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

const approx = (actual, expected, tolerance = 1e-6) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);
};

// Mortgage: zero-rate math and duplicate lump sums in the same month.
const zeroRateMortgage = calculateMortgagePayoff({ balance: 1200, annualRatePercent: 0, remainingMonths: 12 });
approx(zeroRateMortgage.scheduledPayment, 100);
assert.equal(zeroRateMortgage.baselineMonths, 12);
const duplicateLumps = calculateMortgagePayoff({
  balance: 1000, annualRatePercent: 0, remainingMonths: 10, scheduledPayment: 100,
  lumpSums: [{ month: 1, amount: 100 }, { month: 1, amount: 100 }],
});
assert.equal(duplicateLumps.acceleratedMonths, 8);
assert.throws(() => calculateMortgagePayoff({ balance: 1000, annualRatePercent: 12, remainingMonths: 12, scheduledPayment: 5 }), /not high enough/);

// Credit card: exact zero-rate target and a minimum-payment non-amortization warning.
const zeroRateCard = calculateCreditCardPayoff({ balance: 1200, annualRatePercent: 0, mode: 'targetMonths', targetMonths: 12 });
approx(zeroRateCard.requiredMonthlyPayment, 100, 0.001);
assert.equal(zeroRateCard.payoffMonths, 12);
const minCard = calculateCreditCardPayoff({ balance: 5000, annualRatePercent: 29.99, mode: 'minimumPayment', minimumPercent: 1, minimumFloor: 25, newMonthlyCharges: 100 });
assert.ok(minCard.requiredMonthlyPayment > 0);
assert.equal(minCard.negativeAmortization, true);
assert.throws(() => calculateCreditCardPayoff({ balance: 1000, annualRatePercent: 20, mode: 'targetMonths', targetMonths: 12.5 }), /integer/);

// Budget frequency normalization and target-ratio validation.
const frequencyBudget = calculateBudget({
  income: [{ id: 'w', name: 'weekly income', amount: 120, frequency: 'weekly', category: 'other' }],
  expenses: [{ id: 'a', name: 'annual bill', amount: 1200, frequency: 'annual', category: 'needs' }],
  targetRatios: { needs: 0.5 },
});
approx(frequencyBudget.monthlyIncome, 520);
approx(frequencyBudget.monthlyExpenses, 100);
assert.throws(() => calculateBudget({ income: [], expenses: [], targetRatios: { needs: 1.2 } }), /less than or equal to 1/);

// Debt strategy: a cleared minimum payment must keep rolling forward.
const rolloverDebt = calculateDebtStrategy({
  debts: [
    { id: 'a', name: 'A', balance: 100, annualRatePercent: 0, minimumPayment: 100 },
    { id: 'b', name: 'B', balance: 1000, annualRatePercent: 0, minimumPayment: 100 },
  ],
  extraMonthlyPayment: 0,
  strategy: 'snowball',
});
assert.equal(rolloverDebt.payoffMonths, 6);
assert.deepEqual(rolloverDebt.payoffOrder.map(x => x.id), ['a', 'b']);

// Car affordability: a zero-interest loan has a predictable principal.
const car = calculateCarAffordability({
  monthlyTakeHomeIncome: 5000, currentDebtPayments: 0, essentialLivingCosts: 2500, monthlySavingsTarget: 500,
  downPayment: 5000, tradeInNetValue: 0, annualRatePercent: 0, termMonths: 60, taxesAndFees: 0,
  monthlyInsurance: 100, monthlyFuelOrCharging: 100, monthlyMaintenance: 50, monthlyParkingAndTolls: 0,
  maxTransportationSharePercent: 20,
});
approx(car.affordableMonthlyLoanPayment, 750);
approx(car.maxFinancedPrincipal, 45000);
approx(car.maxVehiclePrice, 50000);
assert.throws(() => calculateCarAffordability({ ...{
  monthlyTakeHomeIncome: 5000, currentDebtPayments: 0, essentialLivingCosts: 2500, monthlySavingsTarget: 500,
  downPayment: 0, tradeInNetValue: 0, annualRatePercent: 0, termMonths: 60, taxesAndFees: 0,
  monthlyInsurance: 0, monthlyFuelOrCharging: 0, monthlyMaintenance: 0, monthlyParkingAndTolls: 0,
}, maxTransportationSharePercent: 101 }), /must not exceed 100/);

// Salary conversion: 14 payments and validation of missing pay basis.
const salary14 = calculateSalaryConversion({ annualSalary: 42000, hoursPerWeek: 40, paidWeeksPerYear: 52, salaryPaymentsPerYear: 14 });
approx(salary14.amountPerSalaryPayment, 3000);
assert.throws(() => calculateSalaryConversion({ hoursPerWeek: 40, paidWeeksPerYear: 52 }), /Provide hourlyRate or annualSalary/);

// DTI exclusion scenario.
const dti = calculateDti({
  grossMonthlyIncome: 10000,
  housingPayment: 2500,
  debts: [{ id: 'car', name: 'Car', monthlyPayment: 500 }, { id: 'card', name: 'Card', monthlyPayment: 250 }],
  excludedDebtIds: ['card'],
});
approx(dti.frontEndPercent, 25);
approx(dti.backEndPercent, 30);

// Home affordability: zero-rate, no-cost case and range validation.
const home = calculateHomeAffordability({
  grossMonthlyIncome: 5000, otherMonthlyDebtPayments: 0, maxDebtToIncomePercent: 20,
  optionalMonthlyHousingBudget: 1000, downPayment: 20000, annualRatePercent: 0, termMonths: 120,
  annualPropertyTaxPercent: 0, annualHomeInsurance: 0, monthlyAssociationFees: 0,
  annualMaintenancePercent: 0, annualMortgageInsurancePercent: 0,
  mortgageInsuranceLtvThresholdPercent: 80, closingCostPercent: 0, fixedClosingCosts: 0,
});
approx(home.maxHomePrice, 140000, 0.01);
assert.throws(() => calculateHomeAffordability({
  grossMonthlyIncome: 5000, otherMonthlyDebtPayments: 0, maxDebtToIncomePercent: 120,
  downPayment: 0, annualRatePercent: 5, termMonths: 360, annualPropertyTaxPercent: 0,
  annualHomeInsurance: 0, monthlyAssociationFees: 0, annualMaintenancePercent: 0,
  annualMortgageInsurancePercent: 0, mortgageInsuranceLtvThresholdPercent: 80,
  closingCostPercent: 0, fixedClosingCosts: 0,
}), /must not exceed 100/);

// Inflation: official series must be complete and unique.
const inflation = calculateInflationAdjustment({
  amount: 250, startPeriod: '2020', endPeriod: '2024',
  series: [{ period: '2020', index: 100 }, { period: '2024', index: 125 }],
});
approx(inflation.adjustedAmount, 312.5);
approx(inflation.cumulativeInflationPercent, 25);
assert.throws(() => calculateInflationAdjustment({
  amount: 100, startPeriod: '2020', endPeriod: '2020',
  series: [{ period: '2020', index: 100 }, { period: '2020', index: 101 }],
}), /Duplicate/);
assert.throws(() => calculateInflationAdjustment({ amount: 100, startPeriod: '2019', endPeriod: '2020', series: [] }), /not available/);

// Compound growth: zero return, deflation and invalid net return.
const zeroGrowth = calculateCompoundGrowth({
  initialPrincipal: 1000, monthlyContribution: 100, annualReturnPercent: 0,
  annualFeePercent: 0, annualInflationPercent: 0, years: 1,
});
approx(zeroGrowth.endingBalance, 2200);
approx(zeroGrowth.totalContributions, 2200);
const deflation = calculateCompoundGrowth({
  initialPrincipal: 1000, monthlyContribution: 0, annualReturnPercent: -5,
  annualFeePercent: 0, annualInflationPercent: -1, years: 1,
});
assert.ok(deflation.endingBalance < 1000);
assert.throws(() => calculateCompoundGrowth({
  initialPrincipal: 1000, monthlyContribution: 0, annualReturnPercent: 0,
  annualFeePercent: 100, annualInflationPercent: 0, years: 1,
}), /greater than -100/);

console.log('WorthCalc edge-case and regression tests passed.');
