export type MoneyLocale = 'en' | 'zh';

const CURRENCY_BY_LOCALE: Record<MoneyLocale, string> = {
  en: 'USD',
  zh: 'TWD',
};

const FORMAT_LOCALE_BY_LOCALE: Record<MoneyLocale, string> = {
  en: 'en-US',
  zh: 'zh-TW',
};

function hasPositiveAndNegative(values: number[]): boolean {
  return values.some((value) => value > 0) && values.some((value) => value < 0);
}

function npv(cashflows: number[], monthlyRate: number): number {
  return cashflows.reduce(
    (total, cashflow, period) => total + cashflow / (1 + monthlyRate) ** period,
    0,
  );
}

/**
 * Solve the monthly internal rate of return for a cashflow series.
 *
 * Cashflows are ordered by month, with index 0 representing today. The return
 * value is a monthly decimal rate, so 0.01 means 1% per month. Invalid or
 * unsolvable cashflows return NaN instead of throwing.
 */
export function irrMonthly(cashflows: number[]): number {
  if (cashflows.length < 2 || cashflows.some((value) => !Number.isFinite(value))) {
    return Number.NaN;
  }
  if (!hasPositiveAndNegative(cashflows)) return Number.NaN;

  const zeroRateValue = npv(cashflows, 0);
  if (Math.abs(zeroRateValue) < 1e-9) return 0;

  let lower = -0.999999;
  let upper = 1;
  let lowerValue = npv(cashflows, lower);
  let upperValue = npv(cashflows, upper);

  for (let attempt = 0; attempt < 32 && lowerValue * upperValue > 0; attempt += 1) {
    upper = upper * 2 + 0.5;
    upperValue = npv(cashflows, upper);
  }

  if (lowerValue * upperValue > 0) {
    const samples = 240;
    let previousRate = lower;
    let previousValue = lowerValue;
    for (let index = 1; index <= samples; index += 1) {
      const rate = -0.999999 + (12 * index) / samples;
      const value = npv(cashflows, rate);
      if (previousValue * value <= 0) {
        lower = previousRate;
        upper = rate;
        lowerValue = previousValue;
        upperValue = value;
        break;
      }
      previousRate = rate;
      previousValue = value;
    }
  }

  if (lowerValue * upperValue > 0) return Number.NaN;

  for (let iteration = 0; iteration < 120; iteration += 1) {
    const middle = (lower + upper) / 2;
    const middleValue = npv(cashflows, middle);

    if (Math.abs(middleValue) < 1e-8) return middle;
    if (lowerValue * middleValue <= 0) {
      upper = middle;
      upperValue = middleValue;
    } else {
      lower = middle;
      lowerValue = middleValue;
    }

    if (Math.abs(upper - lower) < 1e-10) break;
  }

  return (lower + upper) / 2;
}

/**
 * Convert a monthly decimal rate into an effective annual percentage rate.
 */
export function aprFromMonthlyRate(monthlyRate: number): number {
  return Number.isFinite(monthlyRate) ? ((1 + monthlyRate) ** 12 - 1) * 100 : Number.NaN;
}

/**
 * Calculate the future value of equal monthly end-of-month contributions.
 */
export function futureValue(monthly: number, annualRatePct: number, years: number): number {
  if (![monthly, annualRatePct, years].every(Number.isFinite) || years <= 0) return 0;
  const months = Math.round(years * 12);
  const monthlyRate = annualRatePct / 100 / 12;
  if (Math.abs(monthlyRate) < 1e-12) return monthly * months;
  return monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate);
}

/**
 * Calculate the future value of a lump sum after annual compounding.
 */
export function compoundValue(principal: number, annualRatePct: number, years: number): number {
  if (![principal, annualRatePct, years].every(Number.isFinite) || years <= 0) return principal;
  return principal * (1 + annualRatePct / 100) ** years;
}

/**
 * Calculate a fixed monthly loan payment for an amortizing loan.
 */
export function monthlyPayment(principal: number, annualRatePct: number, years: number): number {
  if (![principal, annualRatePct, years].every(Number.isFinite) || principal <= 0 || years <= 0) {
    return 0;
  }
  const months = years * 12;
  const monthlyRate = annualRatePct / 100 / 12;
  if (Math.abs(monthlyRate) < 1e-12) return principal / months;
  return (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
}

/**
 * Calculate the remaining balance after a number of monthly loan payments.
 */
export function remainingLoanBalance(
  principal: number,
  annualRatePct: number,
  years: number,
  paymentsMade: number,
): number {
  if (![principal, annualRatePct, years, paymentsMade].every(Number.isFinite) || principal <= 0) {
    return 0;
  }
  const totalPayments = years * 12;
  const paidPayments = Math.min(Math.max(0, paymentsMade), totalPayments);
  const payment = monthlyPayment(principal, annualRatePct, years);
  const monthlyRate = annualRatePct / 100 / 12;
  if (Math.abs(monthlyRate) < 1e-12) {
    return Math.max(0, principal - payment * paidPayments);
  }
  return Math.max(
    0,
    principal * (1 + monthlyRate) ** paidPayments -
      payment * (((1 + monthlyRate) ** paidPayments - 1) / monthlyRate),
  );
}

/**
 * Format a number as the default site currency for a locale.
 */
export function formatCurrency(value: number, locale: MoneyLocale): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(FORMAT_LOCALE_BY_LOCALE[locale], {
    style: 'currency',
    currency: CURRENCY_BY_LOCALE[locale],
    maximumFractionDigits: 0,
  }).format(safeValue);
}

/**
 * Format a percentage with a stable number of fraction digits.
 */
export function formatPercent(value: number, fractionDigits = 1): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue.toFixed(fractionDigits)}%`;
}
