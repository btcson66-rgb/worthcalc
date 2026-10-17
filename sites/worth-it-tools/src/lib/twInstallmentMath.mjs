/*
 * Taiwan credit-card installment arithmetic (P2 batch 2, 2026-10-17).
 *
 * Pure functions shared by the page script, the page's worked examples (which are
 * rendered at build time from these same functions) and tests/tw-installment-math.test.mjs.
 *
 * What is official, and where it was read on 2026-10-17:
 *
 *  - 年百分率 is defined by the 內部報酬率法: the present value of what the lender
 *    pays out equals the present value of every instalment and fee at rate i; the
 *    result is rounded to two decimals; instalments are counted as 12 months to the
 *    year; payments are applied to fees first, then interest, then principal; fees
 *    caused by the consumer's own breach (late-payment penalties) are excluded:
 *    銀行業暨保險業辦理消費者信用交易廣告應揭示總費用範圍及年百分率計算方式標準 第 6、7、8 條.
 *    https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=G0380176
 *    The text does not say whether the monthly rate is multiplied by 12 or compounded.
 *    A published example settles it in practice: 合作金庫 青安貸款 總費用年百分率範例
 *    (NT$2,000,000, 20 years, 2.275%, 年金法, fees NT$5,300 -> "2.30%起") reproduces
 *    only with monthly IRR x 12 (2.30); (1 + m)^12 - 1 would give 2.33.
 *    https://www.tcb-bank.com.tw/personal-banking/loan/mortgage/house-loan-overview/policy-loan-01
 *    So `aprPct` below is monthly IRR x 12 (= Excel's =RATE(n,-pmt,pv)*12), and the
 *    compounded figure is returned separately for comparison only.
 *  - 本息平均攤還 (年金法) and 本金平均攤還 formulas: 臺灣土地銀行 貸款還款方式說明
 *    https://www.landbank.com.tw/Calculate/Repayment
 *
 * NOT official, and therefore stated on the page as simplifications: the monthly
 * rate is the annual rate / 12; each instalment is rounded to the dollar and the
 * last one absorbs the difference; a one-time fee is charged either with the first
 * bill or on the purchase date (reader's choice); the instalment starts one month
 * after purchase. Issuers differ -- the reader should use the figures on their own
 * 分期付款約定書 or bill, which the `paymentOverride` input accepts.
 */

export const MONTHS_PER_YEAR = 12;

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** Net present value of cash flows indexed by month (index 0 = purchase date). */
export function npv(cashflows, monthlyRate) {
  return cashflows.reduce((sum, cf, t) => sum + cf / (1 + monthlyRate) ** t, 0);
}

/**
 * Monthly internal rate of return. Cash flows are from the borrower's side:
 * what is received is positive, what is paid is negative. Returns NaN when no
 * rate exists (no sign change). Bisection on (-0.99, 100): NPV is monotonic for
 * the single sign change that a loan produces, so this cannot miss the root.
 */
export function irrMonthly(cashflows) {
  if (cashflows.length < 2 || cashflows.some((cf) => !Number.isFinite(cf))) return Number.NaN;
  const hasIn = cashflows.some((cf) => cf > 0);
  const hasOut = cashflows.some((cf) => cf < 0);
  if (!hasIn || !hasOut) return Number.NaN;
  let lo = -0.99;
  let hi = 100;
  if (npv(cashflows, lo) * npv(cashflows, hi) > 0) return Number.NaN;
  for (let i = 0; i < 300; i += 1) {
    const mid = (lo + hi) / 2;
    if (npv(cashflows, lo) * npv(cashflows, mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

/** 年百分率 as a fraction, the way Taiwanese issuers disclose it: monthly IRR x 12 (see header). */
export function nominalFromMonthly(m) {
  return m * MONTHS_PER_YEAR;
}

/** The compounded annual equivalent, (1 + m)^12 - 1, for comparison only. */
export function compoundedFromMonthly(m) {
  return (1 + m) ** MONTHS_PER_YEAR - 1;
}

/** 標準 第 8 條 第 2 款: rounded to two decimals, expressed in percent. */
export function pct2(fraction) {
  return Math.round(fraction * 10000) / 100 + 0; // + 0 turns -0 into 0
}

/** 每月應付本息金額之平均攤還率 (土地銀行): i(1+i)^n / ((1+i)^n - 1). */
export function annuityFactor(monthlyRate, n) {
  if (monthlyRate === 0) return 1 / n;
  const g = (1 + monthlyRate) ** n;
  return (monthlyRate * g) / (g - 1);
}

/**
 * Build the payment schedule.
 *   listPrice   amount financed (分期標價)
 *   n           number of monthly instalments
 *   aprPct      annual interest rate in percent (0 = 零利率), monthly rate = apr / 12
 *   method      'annuity' (本息平均攤還) or 'equalPrincipal' (本金平均攤還)
 *   oneTimeFee  one-time fee in dollars
 *   feeTiming   'first' (added to the first bill) or 'upfront' (paid on the purchase date)
 *   perPeriodFee  fee added to every bill
 *   paymentOverride  if > 0, every bill is this amount (already containing interest and
 *                    per-period fees); interest and principal are then unknown.
 */
export function buildSchedule({ listPrice, n, aprPct = 0, method = 'annuity', oneTimeFee = 0, feeTiming = 'first', perPeriodFee = 0, paymentOverride = 0 }) {
  const L = Math.max(0, Math.round(safeNumber(listPrice)));
  const count = Math.max(1, Math.round(safeNumber(n, 1)));
  const i = Math.max(0, safeNumber(aprPct)) / 100 / MONTHS_PER_YEAR;
  const fee1 = Math.max(0, safeNumber(oneTimeFee));
  const feeN = Math.max(0, safeNumber(perPeriodFee));
  const override = Math.max(0, safeNumber(paymentOverride));
  const rows = [];
  let balance = L;
  for (let k = 1; k <= count; k += 1) {
    let interest = 0;
    let principal = 0;
    let base;
    if (override > 0) {
      base = override;
      principal = Number.NaN;
      interest = Number.NaN;
    } else {
      interest = Math.round(balance * i);
      if (k === count) {
        principal = balance;
      } else if (method === 'equalPrincipal') {
        principal = Math.round(L / count);
      } else {
        principal = Math.round(L * annuityFactor(i, count)) - interest;
      }
      principal = Math.min(principal, balance);
      base = principal + interest;
      balance -= principal;
    }
    const fee = (override > 0 ? 0 : feeN) + (k === 1 && feeTiming === 'first' ? fee1 : 0);
    rows.push({ k, principal, interest, fee, payment: base + fee, balance: override > 0 ? Number.NaN : balance });
  }
  return { rows, listPrice: L, n: count, upfrontFee: feeTiming === 'upfront' ? fee1 : 0 };
}

/** Borrower-side cash flows: month 0 receives `received` (minus any upfront fee), then each bill. */
export function cashflowsOf(schedule, received) {
  const flows = [received - schedule.upfrontFee];
  for (const row of schedule.rows) flows.push(-row.payment);
  return flows;
}

/**
 * Full result for a plan.
 *   cashPrice   today's one-shot price (what the instalment plan "lends" you). Defaults to listPrice.
 * `aprPct` follows 標準: the amount lent is the financed price and only interest and fees count.
 * `aprRealPct` additionally counts the price gap when the instalment price is higher than the cash price.
 */
export function evaluatePlan(input) {
  const listPrice = Math.max(0, Math.round(safeNumber(input.listPrice)));
  const cashRaw = safeNumber(input.cashPrice, listPrice);
  const cashPrice = cashRaw > 0 ? Math.round(cashRaw) : listPrice;
  const schedule = buildSchedule({ ...input, listPrice });
  const totalPaid = schedule.rows.reduce((s, r) => s + r.payment, 0) + schedule.upfrontFee;
  const legalFlows = cashflowsOf(schedule, listPrice);
  const realFlows = cashflowsOf(schedule, cashPrice);
  const mLegal = irrMonthly(legalFlows);
  const mReal = irrMonthly(realFlows);
  return {
    schedule,
    listPrice,
    cashPrice,
    totalPaid,
    totalCost: totalPaid - cashPrice,
    totalInterest: schedule.rows.reduce((s, r) => s + (Number.isFinite(r.interest) ? r.interest : 0), 0),
    totalFees: schedule.rows.reduce((s, r) => s + r.fee, 0) + schedule.upfrontFee,
    firstPayment: schedule.rows[0].payment,
    lastPayment: schedule.rows[schedule.rows.length - 1].payment,
    monthly: mLegal,
    monthlyReal: mReal,
    aprPct: pct2(nominalFromMonthly(mLegal)),
    compoundedPct: pct2(compoundedFromMonthly(mLegal)),
    aprRealPct: pct2(nominalFromMonthly(mReal)),
    compoundedRealPct: pct2(compoundedFromMonthly(mReal)),
    hasPriceGap: cashPrice !== listPrice,
  };
}

/**
 * Settle the whole remaining balance right after paying bill `k` (1 <= k < n).
 * Fees already paid are not refunded (an assumption -- the reader must check the
 * contract); `settlementFee` is an extra charge the reader types in. Not available
 * with `paymentOverride` because the remaining principal is then unknown.
 */
export function earlySettlement(input, k, settlementFee = 0) {
  const listPrice = Math.max(0, Math.round(safeNumber(input.listPrice)));
  const cashRaw = safeNumber(input.cashPrice, listPrice);
  const cashPrice = cashRaw > 0 ? Math.round(cashRaw) : listPrice;
  const schedule = buildSchedule({ ...input, listPrice });
  const kk = Math.round(safeNumber(k));
  if (safeNumber(input.paymentOverride) > 0 || kk < 1 || kk >= schedule.n) return null;
  const paidRows = schedule.rows.slice(0, kk);
  const remaining = paidRows[kk - 1].balance;
  const extra = remaining + Math.max(0, safeNumber(settlementFee));
  const flows = [cashPrice - schedule.upfrontFee];
  paidRows.forEach((row, idx) => flows.push(-(row.payment + (idx === kk - 1 ? extra : 0))));
  const totalPaid = paidRows.reduce((s, r) => s + r.payment, 0) + extra + schedule.upfrontFee;
  const m = irrMonthly(flows);
  return { k: kk, remaining, totalPaid, totalCost: totalPaid - cashPrice, aprPct: pct2(nominalFromMonthly(m)), compoundedPct: pct2(compoundedFromMonthly(m)), monthly: m };
}

/** APR (percent, 2 decimals) of a zero-interest plan that charges one fee of `feePct` percent of the price with the first bill. */
export function aprOfOneTimeFee(feePct, n, price = 100000) {
  const result = evaluatePlan({ listPrice: price, n, aprPct: 0, oneTimeFee: (price * feePct) / 100, feeTiming: 'first' });
  return result.aprPct;
}

/** The exact cash-price discount that makes a zero-interest plan cost `aprPct`-equivalent, for the "放棄現金折扣" case. */
export function aprOfForgoneDiscount(cashPrice, listPrice, n) {
  return evaluatePlan({ listPrice, cashPrice, n, aprPct: 0 }).aprRealPct;
}
