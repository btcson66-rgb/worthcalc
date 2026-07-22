import { annualPercentToMonthlyRate, assertFiniteNumber, paymentForPrincipal } from './common.js';

export interface LumpSumPayment { month: number; amount: number }
export interface MortgagePayoffInput {
  balance: number;
  annualRatePercent: number;
  remainingMonths: number;
  scheduledPayment?: number;
  extraMonthly?: number;
  lumpSums?: LumpSumPayment[];
}
export interface LoanScheduleRow {
  month: number;
  startingBalance: number;
  interest: number;
  scheduledPrincipal: number;
  extraPrincipal: number;
  endingBalance: number;
}
export interface MortgagePayoffResult {
  scheduledPayment: number;
  baselineMonths: number;
  acceleratedMonths: number;
  baselineInterest: number;
  acceleratedInterest: number;
  monthsSaved: number;
  interestSaved: number;
  schedule: LoanScheduleRow[];
}

function simulate(input: MortgagePayoffInput, accelerated: boolean) {
  const monthlyRate = annualPercentToMonthlyRate(input.annualRatePercent);
  const payment = input.scheduledPayment ?? paymentForPrincipal(input.balance, monthlyRate, input.remainingMonths);
  const lumpMap = new Map<number, number>();
  for (const item of input.lumpSums ?? []) lumpMap.set(item.month, (lumpMap.get(item.month) ?? 0) + item.amount);
  let balance = input.balance;
  let interestTotal = 0;
  const schedule: LoanScheduleRow[] = [];
  const maxMonths = Math.max(input.remainingMonths * 4, 1200);

  for (let month = 1; month <= maxMonths && balance > 0.005; month += 1) {
    const startingBalance = balance;
    const interest = startingBalance * monthlyRate;
    const regularPrincipalCapacity = payment - interest;
    if (regularPrincipalCapacity <= 0 && startingBalance > 0) {
      throw new RangeError('Scheduled payment is not high enough to cover monthly interest.');
    }
    const extraRequested = accelerated
      ? (input.extraMonthly ?? 0) + (lumpMap.get(month) ?? 0)
      : 0;
    const scheduledPrincipal = Math.min(startingBalance, Math.max(0, regularPrincipalCapacity));
    const extraPrincipal = Math.min(
      Math.max(0, startingBalance - scheduledPrincipal),
      Math.max(0, extraRequested),
    );
    balance = Math.max(0, startingBalance - scheduledPrincipal - extraPrincipal);
    interestTotal += interest;
    schedule.push({ month, startingBalance, interest, scheduledPrincipal, extraPrincipal, endingBalance: balance });
  }

  if (balance > 0.005) throw new RangeError('Loan did not amortize within the safety limit.');
  return { months: schedule.length, interest: interestTotal, schedule, payment };
}

export function calculateMortgagePayoff(input: MortgagePayoffInput): MortgagePayoffResult {
  assertFiniteNumber(input.balance, 'balance', 0);
  assertFiniteNumber(input.annualRatePercent, 'annualRatePercent', 0);
  assertFiniteNumber(input.remainingMonths, 'remainingMonths', 1);
  assertFiniteNumber(input.extraMonthly ?? 0, 'extraMonthly', 0);
  if (input.scheduledPayment != null) assertFiniteNumber(input.scheduledPayment, 'scheduledPayment', 0.01);
  if (!Number.isInteger(input.remainingMonths)) throw new RangeError('remainingMonths must be an integer.');
  for (const item of input.lumpSums ?? []) {
    assertFiniteNumber(item.month, 'lumpSum.month', 1);
    assertFiniteNumber(item.amount, 'lumpSum.amount', 0);
    if (!Number.isInteger(item.month)) throw new RangeError('lumpSum.month must be an integer.');
  }
  const baseline = simulate(input, false);
  const accelerated = simulate(input, true);
  return {
    scheduledPayment: baseline.payment,
    baselineMonths: baseline.months,
    acceleratedMonths: accelerated.months,
    baselineInterest: baseline.interest,
    acceleratedInterest: accelerated.interest,
    monthsSaved: Math.max(0, baseline.months - accelerated.months),
    interestSaved: Math.max(0, baseline.interest - accelerated.interest),
    schedule: accelerated.schedule,
  };
}
