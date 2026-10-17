/*
 * True-hourly-wage arithmetic for /zh/true-hourly-wage-after-commuting-work-expenses/ (P2 batch 6, 2026-10-17).
 *
 * trueHourly() is the formula the page's calculator (src/components/DecisionMathCalculator.astro, mode "hourlyWage") runs:
 *   (take-home pay - unreimbursed work costs) / (paid hours + unpaid required hours + commute hours)
 * tests/tw-hourly-wage-math.test.mjs pins the two to each other. Commute cost is always the reader's own input.
 *
 * Constants copied from official pages opened on 2026-10-17:
 *  - 勞動部歷年最低工資: 自 115 年 1 月 1 日起每月 29,500 元、每小時 196 元 (114 年 10 月 21 日發布).
 *    https://www.mol.gov.tw/1607/28162/28166/28180/70460/76761/76833/post
 *    勞動部常見問答: 每月最低工資指按月計酬、每週 40 小時內履行勞務的最低報酬; 每小時最低工資是按時計酬者的最低報酬;
 *    數額都只指正常工作時間內的報酬, 不含延長工時與休息日工資. https://www.mol.gov.tw/1607/28690/2282/2284/2290/7121/post
 *  - 勞動基準法 第 24 條: 平日延長工時 2 小時內加給 1/3 以上, 再延長 2 小時內加給 2/3 以上.
 *  - 勞動基準法 第 30 條: 正常工時每日 8 小時、每週 40 小時; 雇主應置備出勤紀錄 (逐日記載至分鐘), 保存 5 年.
 */
export const MIN_WAGE_MONTHLY = 29500;
export const MIN_WAGE_HOURLY = 196;

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** (take-home - work costs) / (paid + unpaid + commute hours). Like the calculator, the divisor is never below 1 hour. */
export function trueHourly({ takeHome, workCosts = 0, paidHours, unpaidHours = 0, commuteHours = 0 }) {
  const hours = safeNumber(paidHours) + safeNumber(unpaidHours) + safeNumber(commuteHours);
  return (safeNumber(takeHome) - safeNumber(workCosts)) / Math.max(1, hours);
}

/** Headline hourly rate: gross pay over paid hours only (divisor never below 1, as in the calculator). */
export function surfaceHourly({ grossPay, paidHours }) {
  return safeNumber(grossPay) / Math.max(1, safeNumber(paidHours));
}

/** Total commute hours in a period from the round-trip hours per working day. */
export function commuteHoursFor({ roundTripHoursPerDay, days }) {
  return Math.max(0, safeNumber(roundTripHoursPerDay)) * Math.max(0, safeNumber(days));
}

/**
 * 勞動基準法 第 24 條 weekday overtime: the first 2 hours of a day at 4/3 of the 平日每小時工資額, the next 2 at 5/3
 * (the statute says "加給三分之一以上 / 三分之二以上", so these are minimums). Over 4 hours in one day is not modelled.
 */
export function weekdayOvertimePay({ hourlyWage, hoursPerDay, days = 1 }) {
  const h = Math.max(0, safeNumber(hoursPerDay));
  if (h > 4) throw new RangeError('weekdayOvertimePay models at most 4 overtime hours in one day');
  const first = Math.min(h, 2);
  const second = Math.max(0, h - 2);
  const wage = Math.max(0, safeNumber(hourlyWage));
  return (wage * first * (4 / 3) + wage * second * (5 / 3)) * Math.max(0, safeNumber(days));
}
