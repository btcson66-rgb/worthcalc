import { annualPercentToMonthlyRate, assertFiniteNumber } from './common.js';

export interface DebtAccount {
  id: string;
  name: string;
  balance: number;
  annualRatePercent: number;
  minimumPayment: number;
}
export type DebtStrategy = 'snowball' | 'avalanche' | 'custom';
export interface DebtStrategyInput {
  debts: DebtAccount[];
  extraMonthlyPayment: number;
  strategy: DebtStrategy;
  customOrder?: string[];
}
export interface DebtPayoffEvent { id: string; name: string; payoffMonth: number }
export interface DebtStrategyResult {
  payoffMonths: number | null;
  totalInterest: number;
  totalPaid: number;
  payoffOrder: DebtPayoffEvent[];
  remainingBalance: number;
}

function orderedActive(debts: DebtAccount[], strategy: DebtStrategy, customOrder: string[] = []): DebtAccount[] {
  const active = debts.filter(d => d.balance > 0.005);
  if (strategy === 'snowball') return active.sort((a, b) => a.balance - b.balance || b.annualRatePercent - a.annualRatePercent);
  if (strategy === 'avalanche') return active.sort((a, b) => b.annualRatePercent - a.annualRatePercent || a.balance - b.balance);
  const rank = new Map(customOrder.map((id, index) => [id, index]));
  return active.sort((a, b) => (rank.get(a.id) ?? 9999) - (rank.get(b.id) ?? 9999));
}

export function calculateDebtStrategy(input: DebtStrategyInput): DebtStrategyResult {
  assertFiniteNumber(input.extraMonthlyPayment, 'extraMonthlyPayment', 0);
  const debts = input.debts.map(d => ({ ...d }));
  for (const debt of debts) {
    assertFiniteNumber(debt.balance, `${debt.name}.balance`, 0);
    assertFiniteNumber(debt.annualRatePercent, `${debt.name}.annualRatePercent`, 0);
    assertFiniteNumber(debt.minimumPayment, `${debt.name}.minimumPayment`, 0);
  }
  const originalMinimumBudget = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  let totalInterest = 0;
  let totalPaid = 0;
  const payoffOrder: DebtPayoffEvent[] = [];
  const maxMonths = 1200;

  for (let month = 1; month <= maxMonths; month += 1) {
    const activeBefore = debts.filter(d => d.balance > 0.005);
    if (activeBefore.length === 0) {
      return { payoffMonths: month - 1, totalInterest, totalPaid, payoffOrder, remainingBalance: 0 };
    }

    for (const debt of activeBefore) {
      const interest = debt.balance * annualPercentToMonthlyRate(debt.annualRatePercent);
      debt.balance += interest;
      totalInterest += interest;
    }

    let minimumPaidThisMonth = 0;
    for (const debt of debts.filter(d => d.balance > 0.005)) {
      const payment = Math.min(debt.balance, debt.minimumPayment);
      debt.balance -= payment;
      minimumPaidThisMonth += payment;
      totalPaid += payment;
      if (debt.balance <= 0.005) {
        payoffOrder.push({ id: debt.id, name: debt.name, payoffMonth: month });
      }
    }

    // Keep the original monthly debt-payment budget constant. Once a debt is
    // cleared, its former minimum payment becomes available to the next debt.
    let rollover = input.extraMonthlyPayment + Math.max(0, originalMinimumBudget - minimumPaidThisMonth);

    const priority = orderedActive(debts, input.strategy, input.customOrder);
    for (const debt of priority) {
      if (rollover <= 0) break;
      const payment = Math.min(debt.balance, rollover);
      debt.balance -= payment;
      rollover -= payment;
      totalPaid += payment;
      if (debt.balance <= 0.005 && !payoffOrder.some(e => e.id === debt.id)) {
        payoffOrder.push({ id: debt.id, name: debt.name, payoffMonth: month });
      }
    }

  }

  return {
    payoffMonths: null,
    totalInterest,
    totalPaid,
    payoffOrder,
    remainingBalance: debts.reduce((sum, d) => sum + Math.max(0, d.balance), 0),
  };
}
