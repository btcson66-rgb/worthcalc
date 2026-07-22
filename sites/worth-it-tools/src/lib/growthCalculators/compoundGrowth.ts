import { assertFiniteNumber, binarySearchMinimum } from './common.js';

export interface CompoundGrowthInput {
  initialPrincipal: number;
  monthlyContribution: number;
  annualReturnPercent: number;
  annualFeePercent: number;
  annualInflationPercent: number;
  years: number;
  annualContributionGrowthPercent?: number;
  contributionTiming?: 'beginning' | 'end';
  targetAmount?: number;
}
export interface GrowthYearRow {
  year: number;
  endingBalance: number;
  contributionsToDate: number;
  growthToDate: number;
  realBalance: number;
}
export interface CompoundGrowthResult {
  endingBalance: number;
  realEndingBalance: number;
  totalContributions: number;
  investmentGrowth: number;
  requiredMonthlyContributionForTarget: number | null;
  targetReached: boolean | null;
  yearly: GrowthYearRow[];
}

function simulate(input: CompoundGrowthInput, contribution: number) {
  const months = Math.round(input.years * 12);
  const netAnnualReturn = input.annualReturnPercent - input.annualFeePercent;
  const monthlyRate = Math.pow(1 + netAnnualReturn / 100, 1 / 12) - 1;
  let balance = input.initialPrincipal;
  let totalContributions = input.initialPrincipal;
  const yearly: GrowthYearRow[] = [];

  for (let month = 1; month <= months; month += 1) {
    const yearIndex = Math.floor((month - 1) / 12);
    const grownContribution = contribution * Math.pow(1 + (input.annualContributionGrowthPercent ?? 0) / 100, yearIndex);
    if (input.contributionTiming === 'beginning') {
      balance += grownContribution;
      totalContributions += grownContribution;
    }
    balance *= 1 + monthlyRate;
    if (input.contributionTiming !== 'beginning') {
      balance += grownContribution;
      totalContributions += grownContribution;
    }
    if (month % 12 === 0) {
      const year = month / 12;
      const realBalance = balance / Math.pow(1 + input.annualInflationPercent / 100, year);
      yearly.push({ year, endingBalance: balance, contributionsToDate: totalContributions, growthToDate: balance - totalContributions, realBalance });
    }
  }
  return { balance, totalContributions, yearly };
}

export function calculateCompoundGrowth(input: CompoundGrowthInput): CompoundGrowthResult {
  assertFiniteNumber(input.initialPrincipal, 'initialPrincipal', 0);
  assertFiniteNumber(input.monthlyContribution, 'monthlyContribution', 0);
  assertFiniteNumber(input.annualReturnPercent, 'annualReturnPercent', -99.999999);
  assertFiniteNumber(input.annualFeePercent, 'annualFeePercent', 0);
  assertFiniteNumber(input.annualInflationPercent, 'annualInflationPercent', -99.999999);
  assertFiniteNumber(input.years, 'years', 0.01);
  if (input.annualContributionGrowthPercent != null) assertFiniteNumber(input.annualContributionGrowthPercent, 'annualContributionGrowthPercent', -99.999999);
  if (input.targetAmount != null) assertFiniteNumber(input.targetAmount, 'targetAmount', 0);
  if (input.annualReturnPercent - input.annualFeePercent <= -100) {
    throw new RangeError('Net annual return after fees must be greater than -100%.');
  }
  const base = simulate(input, input.monthlyContribution);
  let required: number | null = null;
  if (input.targetAmount != null) {
    required = binarySearchMinimum(
      contribution => simulate(input, contribution).balance >= input.targetAmount!,
      0,
      Math.max(input.targetAmount, input.monthlyContribution * 1000, 1000),
    );
  }
  const realEndingBalance = base.balance / Math.pow(1 + input.annualInflationPercent / 100, input.years);
  return {
    endingBalance: base.balance,
    realEndingBalance,
    totalContributions: base.totalContributions,
    investmentGrowth: base.balance - base.totalContributions,
    requiredMonthlyContributionForTarget: required,
    targetReached: input.targetAmount == null ? null : base.balance >= input.targetAmount,
    yearly: base.yearly,
  };
}
