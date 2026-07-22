import { assertFiniteNumber, normalizeToMonthly } from './common.js';
import type { Frequency } from './common.js';

export type BudgetCategory = 'needs' | 'wants' | 'savings' | 'debt' | 'other';
export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  frequency: Frequency;
  category: BudgetCategory;
}
export interface BudgetBuilderInput {
  income: BudgetItem[];
  expenses: BudgetItem[];
  targetRatios?: Partial<Record<BudgetCategory, number>>;
}
export interface BudgetBuilderResult {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySurplus: number;
  annualSurplus: number;
  categoryTotals: Record<BudgetCategory, number>;
  categoryRatios: Record<BudgetCategory, number>;
  targetVariance: Partial<Record<BudgetCategory, number>>;
}

const categories: BudgetCategory[] = ['needs', 'wants', 'savings', 'debt', 'other'];

export function calculateBudget(input: BudgetBuilderInput): BudgetBuilderResult {
  const categoryTotals = Object.fromEntries(categories.map(c => [c, 0])) as Record<BudgetCategory, number>;
  let monthlyIncome = 0;
  let monthlyExpenses = 0;

  for (const item of input.income) {
    assertFiniteNumber(item.amount, `income.${item.name}`, 0);
    monthlyIncome += normalizeToMonthly(item.amount, item.frequency);
  }
  for (const item of input.expenses) {
    assertFiniteNumber(item.amount, `expense.${item.name}`, 0);
    const monthly = normalizeToMonthly(item.amount, item.frequency);
    monthlyExpenses += monthly;
    categoryTotals[item.category] += monthly;
  }

  const categoryRatios = Object.fromEntries(categories.map(category => [
    category,
    monthlyIncome > 0 ? categoryTotals[category] / monthlyIncome : 0,
  ])) as Record<BudgetCategory, number>;
  const targetVariance: Partial<Record<BudgetCategory, number>> = {};
  for (const [category, ratio] of Object.entries(input.targetRatios ?? {}) as [BudgetCategory, number][]) {
    assertFiniteNumber(ratio, `targetRatios.${category}`, 0);
    if (ratio > 1) throw new RangeError(`targetRatios.${category} must be less than or equal to 1.`);
    targetVariance[category] = categoryRatios[category] - ratio;
  }

  const monthlySurplus = monthlyIncome - monthlyExpenses;
  return {
    monthlyIncome,
    monthlyExpenses,
    monthlySurplus,
    annualSurplus: monthlySurplus * 12,
    categoryTotals,
    categoryRatios,
    targetVariance,
  };
}
