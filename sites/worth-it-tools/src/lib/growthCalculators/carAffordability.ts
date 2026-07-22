import { annualPercentToMonthlyRate, assertFiniteNumber, principalForPayment } from './common.js';

export interface CarAffordabilityInput {
  monthlyTakeHomeIncome: number;
  currentDebtPayments: number;
  essentialLivingCosts: number;
  monthlySavingsTarget: number;
  downPayment: number;
  tradeInNetValue: number;
  annualRatePercent: number;
  termMonths: number;
  taxesAndFees: number;
  monthlyInsurance: number;
  monthlyFuelOrCharging: number;
  monthlyMaintenance: number;
  monthlyParkingAndTolls: number;
  maxTransportationSharePercent: number;
}
export interface CarAffordabilityResult {
  monthlyOperatingCost: number;
  residualBudgetForPayment: number;
  shareBasedBudgetForPayment: number;
  affordableMonthlyLoanPayment: number;
  maxFinancedPrincipal: number;
  maxVehiclePrice: number;
  totalTransportationSharePercent: number;
}

export function calculateCarAffordability(input: CarAffordabilityInput): CarAffordabilityResult {
  for (const [name, value] of Object.entries(input)) assertFiniteNumber(value, name, 0);
  if (!Number.isInteger(input.termMonths) || input.termMonths < 1) throw new RangeError('termMonths must be a positive integer.');
  if (input.maxTransportationSharePercent > 100) throw new RangeError('maxTransportationSharePercent must not exceed 100.');
  const operating = input.monthlyInsurance + input.monthlyFuelOrCharging + input.monthlyMaintenance + input.monthlyParkingAndTolls;
  const residual = input.monthlyTakeHomeIncome - input.currentDebtPayments - input.essentialLivingCosts - input.monthlySavingsTarget - operating;
  const shareCap = input.monthlyTakeHomeIncome * input.maxTransportationSharePercent / 100 - operating;
  const affordablePayment = Math.max(0, Math.min(residual, shareCap));
  const monthlyRate = annualPercentToMonthlyRate(input.annualRatePercent);
  const principal = principalForPayment(affordablePayment, monthlyRate, input.termMonths);
  const price = Math.max(0, principal + input.downPayment + input.tradeInNetValue - input.taxesAndFees);
  const share = input.monthlyTakeHomeIncome > 0 ? (affordablePayment + operating) / input.monthlyTakeHomeIncome * 100 : 0;
  return {
    monthlyOperatingCost: operating,
    residualBudgetForPayment: Math.max(0, residual),
    shareBasedBudgetForPayment: Math.max(0, shareCap),
    affordableMonthlyLoanPayment: affordablePayment,
    maxFinancedPrincipal: principal,
    maxVehiclePrice: price,
    totalTransportationSharePercent: share,
  };
}
