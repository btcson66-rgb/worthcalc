export const EPSILON = 1e-9;

export type Frequency =
  | 'weekly'
  | 'biweekly'
  | 'semimonthly'
  | 'monthly'
  | 'quarterly'
  | 'annual'
  | 'oneTime';

export function assertFiniteNumber(value: number, name: string, min = -Infinity): void {
  if (!Number.isFinite(value) || value < min) {
    throw new RangeError(`${name} must be a finite number greater than or equal to ${min}.`);
  }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function annualPercentToMonthlyRate(annualPercent: number): number {
  assertFiniteNumber(annualPercent, 'annualPercent', 0);
  return annualPercent / 100 / 12;
}

export function paymentForPrincipal(principal: number, monthlyRate: number, months: number): number {
  assertFiniteNumber(principal, 'principal', 0);
  assertFiniteNumber(monthlyRate, 'monthlyRate', 0);
  assertFiniteNumber(months, 'months', 1);
  if (principal === 0) return 0;
  if (Math.abs(monthlyRate) < EPSILON) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return principal * monthlyRate * factor / (factor - 1);
}

export function principalForPayment(payment: number, monthlyRate: number, months: number): number {
  assertFiniteNumber(payment, 'payment', 0);
  assertFiniteNumber(monthlyRate, 'monthlyRate', 0);
  assertFiniteNumber(months, 'months', 1);
  if (payment === 0) return 0;
  if (Math.abs(monthlyRate) < EPSILON) return payment * months;
  return payment * (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate;
}

export function normalizeToMonthly(amount: number, frequency: Frequency): number {
  assertFiniteNumber(amount, 'amount');
  switch (frequency) {
    case 'weekly': return amount * 52 / 12;
    case 'biweekly': return amount * 26 / 12;
    case 'semimonthly': return amount * 2;
    case 'monthly': return amount;
    case 'quarterly': return amount / 3;
    case 'annual': return amount / 12;
    case 'oneTime': return amount / 12;
  }
}

export function roundCurrency(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function binarySearchMinimum(
  predicate: (value: number) => boolean,
  low: number,
  high: number,
  iterations = 100,
): number {
  for (let i = 0; i < iterations; i += 1) {
    const mid = (low + high) / 2;
    if (predicate(mid)) high = mid;
    else low = mid;
  }
  return high;
}

export function binarySearchMaximum(
  predicate: (value: number) => boolean,
  low: number,
  high: number,
  iterations = 100,
): number {
  for (let i = 0; i < iterations; i += 1) {
    const mid = (low + high) / 2;
    if (predicate(mid)) low = mid;
    else high = mid;
  }
  return low;
}
