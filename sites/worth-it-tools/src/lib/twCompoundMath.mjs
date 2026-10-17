/*
 * Compound-growth arithmetic for the 複利成長與儲蓄目標計算機 page (P2 batch 5, 2026-10-17).
 *
 * Closed-form helpers that the page's worked examples are checked against (tests/tw-compound-math.test.mjs compares
 * them with the calculator's own month-by-month function, src/lib/growthCalculators/compoundGrowth.ts, compiled by
 * `npm run test:growth`). Nothing here is a rate: every rate is the reader's input, and the figures the page prints
 * as examples are inputs taken from official pages read on 2026-10-17:
 *
 *  - 中央銀行「五大銀行平均存款利率」與「五大銀行平均基準利率」(資料日 115 年 10 月 16 日；一般定期存款固定利率):
 *    一年期 臺銀 / 土銀 / 合庫 / 一銀 / 華銀 皆 1.7%. https://www.cbc.gov.tw/tw/np-371-1.html (Excel: /tw/public/data/averagerate.xlsx)
 *  - 行政院主計總處 重要經社指標「消費者物價指數年增率」: 115 年 9 月 2.73%, 115 年預測 2.07%, 114 年 1.66%;
 *    115 年 1–9 月各月 0.71, 1.75, 1.20, 1.72, 2.19, 2.56, 2.52, 2.05, 2.73.
 *    https://www.stat.gov.tw/point.aspx?sid=t.2&n=3581&sms=11480
 *  - 公務人員退休撫卹基金管理局「投資獲利靠複利」(上版日期 103-04-29): 複利公式 FV = PV x (1 + R)^n, and the
 *    每月投資 1 萬元 / 30 年 / 8% -> 約 1,500 萬, 扣費後 5% -> 約 835 萬, 35 歲起 -> 約 592 萬 example.
 *    https://www.fund.gov.tw/News_Content.aspx?n=3268&s=15185
 *  - 單利: 公務人員退休撫卹基金管理局 財經名詞「單利」("利率為 r 採單利計算時，t 年後之利率即為 rt");
 *    教育部《重編國語辭典修訂本》「單利」. https://www.fund.gov.tw/News_Content.aspx?n=708&s=16920
 *
 * Two rate conventions exist and the page spells out which one the calculator uses:
 *  - the calculator treats the annual return as an EFFECTIVE annual rate: monthly rate = (1 + r)^(1/12) - 1;
 *  - the 退撫基金 page's monthly example uses a NOMINAL rate compounded monthly: monthly rate = r / 12, contributions
 *    at the START of each month. The same "8%" therefore gives different totals; effectiveFromNominalMonthly()
 *    converts one into the other so the example can be reproduced in the calculator.
 */

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** Effective annual rate (in %) of a nominal annual rate compounded `periods` times a year. */
export function effectiveFromNominal(nominalPct, periods = 12) {
  const r = safeNumber(nominalPct) / 100;
  const m = Math.max(1, Math.round(safeNumber(periods, 12)));
  return ((1 + r / m) ** m - 1) * 100;
}

/** Shorthand for the 12-period case; the value to type into the calculator to reproduce a "年利率 ÷ 12" example. */
export const effectiveFromNominalMonthly = (nominalPct) => effectiveFromNominal(nominalPct, 12);

/** Monthly rate the calculator uses for an annual return of `annualPct` percent (effective-annual convention). */
export function monthlyRateFromEffective(annualPct) {
  return (1 + safeNumber(annualPct) / 100) ** (1 / 12) - 1;
}

/** 複利 FV = PV x (1 + R)^n  (R per period, n periods). */
export function compoundValue(pv, ratePct, periods) {
  return safeNumber(pv) * (1 + safeNumber(ratePct) / 100) ** safeNumber(periods);
}

/** 單利: PV x (1 + r x t). */
export function simpleValue(pv, ratePct, years) {
  return safeNumber(pv) * (1 + (safeNumber(ratePct) / 100) * safeNumber(years));
}

/** Net annual return the calculator uses: assumed return minus the annual fee, both in percentage points. */
export function netReturnPct(returnPct, feePct) {
  return safeNumber(returnPct) - safeNumber(feePct);
}

/** Real return (%) from a nominal return and inflation, both % per year: (1 + n) / (1 + i) - 1. */
export function realReturnPct(nominalPct, inflationPct) {
  return ((1 + safeNumber(nominalPct) / 100) / (1 + safeNumber(inflationPct) / 100) - 1) * 100;
}

/** Today's purchasing power of `value` received after `years` of `inflationPct` per year. */
export function deflate(value, inflationPct, years) {
  return safeNumber(value) / (1 + safeNumber(inflationPct) / 100) ** safeNumber(years);
}

/**
 * Future value of equal monthly deposits.
 *   rateMonthly  monthly rate as a fraction
 *   timing       'end' (deposit after the month's growth, the calculator's default) or 'beginning'
 */
export function annuityFutureValue(monthlyDeposit, rateMonthly, months, timing = 'end') {
  const pmt = safeNumber(monthlyDeposit);
  const i = safeNumber(rateMonthly);
  const n = Math.max(0, Math.round(safeNumber(months)));
  if (n === 0) return 0;
  const base = i === 0 ? pmt * n : (pmt * ((1 + i) ** n - 1)) / i;
  return timing === 'beginning' ? base * (1 + i) : base;
}

/** Lump sum plus monthly deposits, effective-annual convention, no contribution growth. */
export function lumpAndMonthlyFutureValue({ principal = 0, monthlyDeposit = 0, annualReturnPct = 0, annualFeePct = 0, years = 0, timing = 'end' }) {
  const i = monthlyRateFromEffective(netReturnPct(annualReturnPct, annualFeePct));
  const months = Math.round(safeNumber(years) * 12);
  return safeNumber(principal) * (1 + i) ** months + annuityFutureValue(monthlyDeposit, i, months, timing);
}

/** Monthly deposit that reaches `target` from `principal` (closed form of the above). Negative means the principal alone is enough. */
export function requiredMonthlyDeposit({ target, principal = 0, annualReturnPct = 0, annualFeePct = 0, years = 0, timing = 'end' }) {
  const i = monthlyRateFromEffective(netReturnPct(annualReturnPct, annualFeePct));
  const months = Math.round(safeNumber(years) * 12);
  const grownPrincipal = safeNumber(principal) * (1 + i) ** months;
  const perDollar = annuityFutureValue(1, i, months, timing);
  return perDollar === 0 ? Infinity : (safeNumber(target) - grownPrincipal) / perDollar;
}

/** Excel's FV(rate, nper, pmt, pv, type) with the sign convention of the page's formula (positive result). */
export function excelFv(rate, nper, pmt, pv, type = 0) {
  const i = safeNumber(rate);
  const n = safeNumber(nper);
  const grown = safeNumber(pv) * (1 + i) ** n;
  const stream = i === 0 ? safeNumber(pmt) * n : (safeNumber(pmt) * (1 + i * (type ? 1 : 0)) * ((1 + i) ** n - 1)) / i;
  return grown + stream;
}

/**
 * Excel's PMT(rate, nper, pv, fv, type): the payment that makes pv x g + pmt x (1 + rate x type) x (g - 1) / rate + fv = 0,
 * g = (1 + rate)^nper. Money paid out is negative in Excel, so PMT(i, n, -principal, target) is negative; the page writes
 * =-PMT(...) to show it as a positive monthly deposit.
 */
export function excelPmt(rate, nper, pv, fv = 0, type = 0) {
  const i = safeNumber(rate);
  const n = safeNumber(nper);
  const g = (1 + i) ** n;
  if (i === 0) return -(safeNumber(pv) + safeNumber(fv)) / n;
  return (-(safeNumber(fv) + safeNumber(pv) * g) * i) / ((g - 1) * (1 + i * (type ? 1 : 0)));
}
