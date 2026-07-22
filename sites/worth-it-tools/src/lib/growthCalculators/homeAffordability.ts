import { annualPercentToMonthlyRate, assertFiniteNumber, binarySearchMaximum, paymentForPrincipal } from './common.js';

export interface HomeAffordabilityInput {
  grossMonthlyIncome: number;
  otherMonthlyDebtPayments: number;
  maxDebtToIncomePercent: number;
  optionalMonthlyHousingBudget?: number;
  downPayment: number;
  annualRatePercent: number;
  termMonths: number;
  annualPropertyTaxPercent: number;
  annualHomeInsurance: number;
  monthlyAssociationFees: number;
  annualMaintenancePercent: number;
  annualMortgageInsurancePercent: number;
  mortgageInsuranceLtvThresholdPercent: number;
  closingCostPercent: number;
  fixedClosingCosts: number;
}
export interface HomeCostBreakdown {
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  associationFees: number;
  maintenanceReserve: number;
  mortgageInsurance: number;
  totalMonthlyHousing: number;
}
export interface HomeAffordabilityResult {
  maxHomePrice: number;
  loanAmount: number;
  monthlyHousingLimit: number;
  estimatedClosingCosts: number;
  cashNeeded: number;
  breakdown: HomeCostBreakdown;
}

function breakdownForPrice(input: HomeAffordabilityInput, price: number): HomeCostBreakdown {
  const loan = Math.max(0, price - input.downPayment);
  const monthlyRate = annualPercentToMonthlyRate(input.annualRatePercent);
  const principalAndInterest = paymentForPrincipal(loan, monthlyRate, input.termMonths);
  const ltv = price > 0 ? loan / price * 100 : 0;
  const mortgageInsurance = ltv > input.mortgageInsuranceLtvThresholdPercent
    ? loan * input.annualMortgageInsurancePercent / 100 / 12
    : 0;
  const propertyTax = price * input.annualPropertyTaxPercent / 100 / 12;
  const maintenanceReserve = price * input.annualMaintenancePercent / 100 / 12;
  const insurance = input.annualHomeInsurance / 12;
  const totalMonthlyHousing = principalAndInterest + propertyTax + insurance + input.monthlyAssociationFees + maintenanceReserve + mortgageInsurance;
  return { principalAndInterest, propertyTax, insurance, associationFees: input.monthlyAssociationFees, maintenanceReserve, mortgageInsurance, totalMonthlyHousing };
}

export function calculateHomeAffordability(input: HomeAffordabilityInput): HomeAffordabilityResult {
  for (const [name, value] of Object.entries(input)) {
    if (value !== undefined) assertFiniteNumber(value, name, 0);
  }
  if (!Number.isInteger(input.termMonths) || input.termMonths < 1) throw new RangeError('termMonths must be a positive integer.');
  if (input.maxDebtToIncomePercent > 100) throw new RangeError('maxDebtToIncomePercent must not exceed 100.');
  if (input.mortgageInsuranceLtvThresholdPercent > 100) throw new RangeError('mortgageInsuranceLtvThresholdPercent must not exceed 100.');
  const dtiHousingLimit = input.grossMonthlyIncome * input.maxDebtToIncomePercent / 100 - input.otherMonthlyDebtPayments;
  const housingLimit = Math.max(0, Math.min(dtiHousingLimit, input.optionalMonthlyHousingBudget ?? Infinity));
  const maxSearch = Math.max(input.downPayment + housingLimit * input.termMonths * 2, input.downPayment + 100000);
  const maxHomePrice = binarySearchMaximum(
    price => breakdownForPrice(input, price).totalMonthlyHousing <= housingLimit,
    input.downPayment,
    maxSearch,
  );
  const breakdown = breakdownForPrice(input, maxHomePrice);
  const estimatedClosingCosts = maxHomePrice * input.closingCostPercent / 100 + input.fixedClosingCosts;
  return {
    maxHomePrice,
    loanAmount: Math.max(0, maxHomePrice - input.downPayment),
    monthlyHousingLimit: housingLimit,
    estimatedClosingCosts,
    cashNeeded: input.downPayment + estimatedClosingCosts,
    breakdown,
  };
}
