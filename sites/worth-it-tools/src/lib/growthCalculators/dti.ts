import { assertFiniteNumber } from './common.js';

export interface DebtPayment { id: string; name: string; monthlyPayment: number; includeInFrontEnd?: boolean }
export interface DtiInput {
  grossMonthlyIncome: number;
  housingPayment: number;
  debts: DebtPayment[];
  illustrativeThresholdPercent?: number;
  excludedDebtIds?: string[];
}
export interface DtiResult {
  frontEndPercent: number;
  backEndPercent: number;
  includedDebtPayments: number;
  monthlyIncomeAfterDebtPayments: number;
  thresholdGapPercentagePoints: number | null;
}

export function calculateDti(input: DtiInput): DtiResult {
  assertFiniteNumber(input.grossMonthlyIncome, 'grossMonthlyIncome', 0.01);
  assertFiniteNumber(input.housingPayment, 'housingPayment', 0);
  const excluded = new Set(input.excludedDebtIds ?? []);
  const otherDebt = input.debts.reduce((sum, debt) => {
    assertFiniteNumber(debt.monthlyPayment, debt.name, 0);
    return excluded.has(debt.id) ? sum : sum + debt.monthlyPayment;
  }, 0);
  const front = input.housingPayment / input.grossMonthlyIncome * 100;
  const back = (input.housingPayment + otherDebt) / input.grossMonthlyIncome * 100;
  return {
    frontEndPercent: front,
    backEndPercent: back,
    includedDebtPayments: otherDebt,
    monthlyIncomeAfterDebtPayments: input.grossMonthlyIncome - input.housingPayment - otherDebt,
    thresholdGapPercentagePoints: input.illustrativeThresholdPercent == null
      ? null
      : input.illustrativeThresholdPercent - back,
  };
}
