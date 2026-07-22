import { assertFiniteNumber } from './common.js';

export interface SalaryConverterInput {
  hourlyRate?: number;
  annualSalary?: number;
  hoursPerWeek: number;
  paidWeeksPerYear: number;
  unpaidLeaveWeeks?: number;
  overtimeHoursPerWeek?: number;
  overtimeMultiplier?: number;
  annualBonus?: number;
  annualCommission?: number;
  salaryPaymentsPerYear?: number;
}
export interface SalaryConverterResult {
  annualGross: number;
  monthlyAverage: number;
  weeklyAverage: number;
  biweeklyAverage: number;
  semimonthlyAverage: number;
  hourlyEquivalent: number;
  amountPerSalaryPayment: number;
  regularHoursPerYear: number;
  overtimePayPerYear: number;
}

export function calculateSalaryConversion(input: SalaryConverterInput): SalaryConverterResult {
  if (input.hourlyRate == null && input.annualSalary == null) throw new RangeError('Provide hourlyRate or annualSalary.');
  if (input.hourlyRate != null) assertFiniteNumber(input.hourlyRate, 'hourlyRate', 0);
  if (input.annualSalary != null) assertFiniteNumber(input.annualSalary, 'annualSalary', 0);
  assertFiniteNumber(input.hoursPerWeek, 'hoursPerWeek', 0.01);
  assertFiniteNumber(input.paidWeeksPerYear, 'paidWeeksPerYear', 0.01);
  assertFiniteNumber(input.unpaidLeaveWeeks ?? 0, 'unpaidLeaveWeeks', 0);
  assertFiniteNumber(input.overtimeHoursPerWeek ?? 0, 'overtimeHoursPerWeek', 0);
  assertFiniteNumber(input.overtimeMultiplier ?? 1.5, 'overtimeMultiplier', 0);
  assertFiniteNumber(input.annualBonus ?? 0, 'annualBonus', 0);
  assertFiniteNumber(input.annualCommission ?? 0, 'annualCommission', 0);
  const effectiveWeeks = Math.max(0, input.paidWeeksPerYear - (input.unpaidLeaveWeeks ?? 0));
  const regularHours = input.hoursPerWeek * effectiveWeeks;
  const baseAnnual = input.annualSalary ?? ((input.hourlyRate ?? 0) * regularHours);
  const overtimePay = (input.hourlyRate ?? (regularHours > 0 ? baseAnnual / regularHours : 0))
    * (input.overtimeMultiplier ?? 1.5)
    * (input.overtimeHoursPerWeek ?? 0)
    * effectiveWeeks;
  const annualGross = baseAnnual + overtimePay + (input.annualBonus ?? 0) + (input.annualCommission ?? 0);
  const totalHours = regularHours + (input.overtimeHoursPerWeek ?? 0) * effectiveWeeks;
  const payments = input.salaryPaymentsPerYear ?? 12;
  assertFiniteNumber(payments, 'salaryPaymentsPerYear', 1);
  if (!Number.isInteger(payments)) throw new RangeError('salaryPaymentsPerYear must be an integer.');
  return {
    annualGross,
    monthlyAverage: annualGross / 12,
    weeklyAverage: annualGross / 52,
    biweeklyAverage: annualGross / 26,
    semimonthlyAverage: annualGross / 24,
    hourlyEquivalent: totalHours > 0 ? annualGross / totalHours : 0,
    amountPerSalaryPayment: annualGross / payments,
    regularHoursPerYear: regularHours,
    overtimePayPerYear: overtimePay,
  };
}
