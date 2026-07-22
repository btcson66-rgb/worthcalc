import { annualPercentToMonthlyRate, assertFiniteNumber, binarySearchMinimum } from './common.js';

export type CreditCardMode = 'fixedPayment' | 'minimumPayment' | 'targetMonths';
export interface CreditCardPayoffInput {
  balance: number;
  annualRatePercent: number;
  mode: CreditCardMode;
  monthlyPayment?: number;
  targetMonths?: number;
  minimumPercent?: number;
  minimumFloor?: number;
  newMonthlyCharges?: number;
  promotionalAnnualRatePercent?: number;
  promotionalMonths?: number;
}
export interface CreditCardScheduleRow {
  month: number;
  startingBalance: number;
  charges: number;
  interest: number;
  payment: number;
  endingBalance: number;
}
export interface CreditCardPayoffResult {
  requiredMonthlyPayment: number;
  payoffMonths: number | null;
  totalInterest: number;
  totalPayments: number;
  totalNewCharges: number;
  negativeAmortization: boolean;
  schedule: CreditCardScheduleRow[];
}

function monthlyRateFor(input: CreditCardPayoffInput, month: number): number {
  if ((input.promotionalMonths ?? 0) >= month) {
    return annualPercentToMonthlyRate(input.promotionalAnnualRatePercent ?? input.annualRatePercent);
  }
  return annualPercentToMonthlyRate(input.annualRatePercent);
}

function minimumPayment(input: CreditCardPayoffInput, balancePlusInterest: number): number {
  const percent = (input.minimumPercent ?? 2) / 100;
  return Math.max(input.minimumFloor ?? 25, balancePlusInterest * percent);
}

function simulate(input: CreditCardPayoffInput, fixedPayment: number, maxMonths = 1200): CreditCardPayoffResult {
  let balance = input.balance;
  let totalInterest = 0;
  let totalPayments = 0;
  let totalNewCharges = 0;
  let negativeAmortization = false;
  const schedule: CreditCardScheduleRow[] = [];

  for (let month = 1; month <= maxMonths && balance > 0.005; month += 1) {
    const startingBalance = balance;
    const charges = input.newMonthlyCharges ?? 0;
    const interest = (startingBalance + charges) * monthlyRateFor(input, month);
    const beforePayment = startingBalance + charges + interest;
    const requested = input.mode === 'minimumPayment' ? minimumPayment(input, beforePayment) : fixedPayment;
    const payment = Math.min(beforePayment, requested);
    balance = Math.max(0, beforePayment - payment);
    if (payment <= interest + charges && balance > 0.005) negativeAmortization = true;
    totalInterest += interest;
    totalPayments += payment;
    totalNewCharges += charges;
    schedule.push({ month, startingBalance, charges, interest, payment, endingBalance: balance });
  }

  return {
    requiredMonthlyPayment: fixedPayment,
    payoffMonths: balance <= 0.005 ? schedule.length : null,
    totalInterest,
    totalPayments,
    totalNewCharges,
    negativeAmortization,
    schedule,
  };
}

export function calculateCreditCardPayoff(input: CreditCardPayoffInput): CreditCardPayoffResult {
  assertFiniteNumber(input.balance, 'balance', 0);
  assertFiniteNumber(input.annualRatePercent, 'annualRatePercent', 0);
  assertFiniteNumber(input.newMonthlyCharges ?? 0, 'newMonthlyCharges', 0);
  assertFiniteNumber(input.minimumPercent ?? 2, 'minimumPercent', 0);
  assertFiniteNumber(input.minimumFloor ?? 25, 'minimumFloor', 0);
  if (input.promotionalAnnualRatePercent != null) assertFiniteNumber(input.promotionalAnnualRatePercent, 'promotionalAnnualRatePercent', 0);
  if (input.promotionalMonths != null) {
    assertFiniteNumber(input.promotionalMonths, 'promotionalMonths', 0);
    if (!Number.isInteger(input.promotionalMonths)) throw new RangeError('promotionalMonths must be an integer.');
  }

  if (input.mode === 'targetMonths') {
    assertFiniteNumber(input.targetMonths ?? 0, 'targetMonths', 1);
    if (!Number.isInteger(input.targetMonths)) throw new RangeError('targetMonths must be an integer.');
    const target = input.targetMonths!;
    const high = Math.max(input.balance * 2 + (input.newMonthlyCharges ?? 0) * target, 100);
    const required = binarySearchMinimum(
      payment => {
        const result = simulate({ ...input, mode: 'fixedPayment' }, payment, target);
        return result.payoffMonths !== null && result.payoffMonths <= target;
      },
      0,
      high,
    );
    return simulate({ ...input, mode: 'fixedPayment' }, required, target);
  }

  const fixed = input.mode === 'fixedPayment' ? (input.monthlyPayment ?? 0) : 0;
  if (input.mode === 'fixedPayment') assertFiniteNumber(fixed, 'monthlyPayment', 0.01);
  const result = simulate(input, fixed);
  return input.mode === 'minimumPayment'
    ? { ...result, requiredMonthlyPayment: result.schedule[0]?.payment ?? 0 }
    : result;
}
