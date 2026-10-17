/*
 * Emergency-fund arithmetic for /zh/emergency-fund-how-much/ (P2 batch 6, 2026-10-17).
 *
 * Pure functions, no DOM, so the page's calculator and tests/tw-emergency-fund-math.test.mjs run the same code.
 * Every constant below was copied from an official page opened on 2026-10-17; the source is named next to it. What is
 * NOT official -- the reader's essential monthly spending, how many months a job search takes, how much cash is on hand --
 * is always a parameter. Nothing here is a "recommended number of months".
 */

/**
 * 失業給付 (就業保險法, 修正日期 民國 111 年 1 月 12 日; law.moj.gov.tw 2026-10-17; 勞保局「給付標準及期間」更新 2023-01-17):
 *  - 第 16 條: 按離職退保當月起前 6 個月平均月投保薪資 60% 按月發給, 最長 6 個月; 退保時已年滿 45 歲或領有身心障礙證明者最長 9 個月.
 *  - 第 19-1 條: 有受其扶養的眷屬, 每 1 人加給平均月投保薪資 10%, 最多計至 20%.
 *  - 第 20 條: 失業給付自向公立就業服務機構辦理求職登記之第 15 日起算.
 *  - 第 11 條: 須非自願離職, 退保前 3 年內保險年資合計滿 1 年以上, 具工作能力及繼續工作意願, 求職登記後 14 日內仍無法推介就業或安排職訓.
 */
export const BENEFIT_RATE = 0.6;
export const DEPENDENT_RATE = 0.1;
export const DEPENDENT_RATE_CAP = 0.2;
export const WAIT_DAYS = 14;
export const BENEFIT_MONTHS_STANDARD = 6;
export const BENEFIT_MONTHS_AGE45_OR_DISABLED = 9;
export const AGE_FOR_LONGER_BENEFIT = 45;

/**
 * 勞工保險投保薪資分級表, 自 115 年 1 月 1 日施行 (114 年 11 月 21 日勞動部勞動保 2 字第 1140091863 號令修正發布;
 * https://www.bli.gov.tw/0005475.html -> https://www.bli.gov.tw/Files/25661, 2026-10-17). 就業保險的月投保薪資準用勞工保險規定
 * (勞保局常見問答 6). Rows: [月薪資總額上限 (null = 以上), 月投保薪資]. Table note 2-4 (職訓受訓者、部分工時、庇護性就業) are not modelled.
 */
/** @type {ReadonlyArray<readonly [number | null, number]>} */
export const INSURED_SALARY_TABLE = Object.freeze([
  [29500, 29500],
  [30300, 30300],
  [31800, 31800],
  [33300, 33300],
  [34800, 34800],
  [36300, 36300],
  [38200, 38200],
  [40100, 40100],
  [42000, 42000],
  [43900, 43900],
  [null, 45800],
]);
export const INSURED_SALARY_CAP = 45800;

/** 勞動部最低工資, 自 115 年 1 月 1 日起: 每月 29,500 元 (114 年 10 月 21 日發布). */
export const MIN_WAGE_MONTHLY = 29500;

/** 勞工退休金條例 第 12 條: 新制資遣費每滿 1 年 1/2 個月平均工資, 未滿 1 年比例計給, 最高 6 個月. */
export const SEVERANCE_MONTHS_PER_YEAR = 0.5;
export const SEVERANCE_MAX_MONTHS = 6;

/** 中央存款保險: 每一存款人在同一家要保機構的存款本金及利息合計最高保額 300 萬元 (自 100 年 1 月 1 日). */
export const DEPOSIT_INSURANCE_LIMIT = 3000000;

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** 月投保薪資 (the table row) for a monthly pay total, 115 table. Pay below the minimum wage uses special tiers that are not modelled: returns the first row. */
/** @param {number | string} monthlyPay @returns {number} */
export function insuredSalaryFor(monthlyPay) {
  const pay = Math.max(0, safeNumber(monthlyPay));
  for (const [upper, insured] of INSURED_SALARY_TABLE) {
    if (upper === null || pay <= upper) return insured;
  }
  return INSURED_SALARY_CAP;
}

/** Maximum number of monthly payments: 9 when 45 or older (or disabled) at the time of leaving, else 6. */
export function benefitMonthsFor({ ageAtLeaving, disabled = false }) {
  return disabled || safeNumber(ageAtLeaving) >= AGE_FOR_LONGER_BENEFIT ? BENEFIT_MONTHS_AGE45_OR_DISABLED : BENEFIT_MONTHS_STANDARD;
}

/** Monthly 失業給付: 平均月投保薪資 x (60% + 10% per dependent, dependents' part capped at 20%). */
export function monthlyBenefit({ avgInsuredSalary, dependents = 0 }) {
  const extra = Math.min(DEPENDENT_RATE_CAP, DEPENDENT_RATE * Math.max(0, Math.floor(safeNumber(dependents))));
  return Math.max(0, safeNumber(avgInsuredSalary)) * (BENEFIT_RATE + extra);
}

/**
 * Cash picture of a job search of `jobSearchMonths` months after an involuntary exit.
 *   essentialMonthly   what must be paid every month while out of work (the reader's number)
 *   involuntary        false = no 失業給付 at all (resigned, self-employed, ...): benefit 0
 *   ownCash            cash already on hand that is free for this purpose (severance pay may be counted here by the reader)
 * The first WAIT_DAYS days after registering carry no payment; a month is treated as 30 days. Payments run for at most
 * `benefitMonths` months. Returns amounts in NT$ (unrounded).
 */
export function jobSearchCoverage({ essentialMonthly, avgInsuredSalary, dependents = 0, ageAtLeaving = 30, disabled = false, involuntary = true, jobSearchMonths, ownCash = 0 }) {
  const need = Math.max(0, safeNumber(essentialMonthly)) * Math.max(0, safeNumber(jobSearchMonths));
  const monthly = involuntary ? monthlyBenefit({ avgInsuredSalary, dependents }) : 0;
  const maxMonths = benefitMonthsFor({ ageAtLeaving, disabled });
  const waitMonths = WAIT_DAYS / 30;
  const paidMonths = involuntary ? Math.min(maxMonths, Math.max(0, safeNumber(jobSearchMonths) - waitMonths)) : 0;
  const benefitTotal = monthly * paidMonths;
  const gap = Math.max(0, need - benefitTotal);
  const reserveNeeded = Math.max(0, gap - Math.max(0, safeNumber(ownCash)));
  const essential = Math.max(0, safeNumber(essentialMonthly));
  return { need, monthly, maxMonths, paidMonths, benefitTotal, gap, reserveNeeded, gapInMonthsOfSpending: essential === 0 ? 0 : gap / essential };
}

/** 新制資遣費: 平均月工資 x min(0.5 x 年資(年, 未滿 1 年比例), 6) -- 勞工退休金條例 第 12 條, 只適用適用新制後的年資. */
export function severancePay({ avgMonthlyWage, serviceYears }) {
  const months = Math.min(SEVERANCE_MAX_MONTHS, SEVERANCE_MONTHS_PER_YEAR * Math.max(0, safeNumber(serviceYears)));
  return { months, amount: Math.max(0, safeNumber(avgMonthlyWage)) * months };
}

/** Largest single-bank deposit the 300 萬 limit covers, minus nothing: simple helper for "how much of the reserve is inside the limit". */
export function insuredPortion(depositAtOneBank) {
  return Math.min(Math.max(0, safeNumber(depositAtOneBank)), DEPOSIT_INSURANCE_LIMIT);
}
