/*
 * 好市多台灣會員規則的算術 (P2 batch 3, 2026-10-17).
 *
 * Pure functions shared by /zh/costco-math/, /zh/tools/costco-membership/ and
 * tests/tw-costco-math.test.mjs. What is official, and where it was read on 2026-10-17
 * (the pages are rendered by script; the text was read from the site's own CMS endpoint,
 * https://www.costco.com.tw/rest/v2/taiwan/cms/pages?pageType=ContentPage&pageLabelOrId=...):
 *
 *  - 2% 回饋金 accrues from the day the member becomes 黑鑽卡 "至到期日前3個月止"; the settled
 *    amount then carries "至下一年度". Official example (常見問與答 - 黑鑽卡 2% 回饋金, Q2):
 *    expiry 2025/11/30, upgrade 2025/03/04 -> first window 2025/03/04 ~ 2025/08/31, second
 *    window 2025/09/01 ~ 2026/08/31.
 *  - 回饋金 is issued "於會員卡到期之前兩個月" (會員規章 J.1), "會員卡到期前兩個月的 1 號"
 *    (FAQ Q3), and must be used within one year of issue (規章 J.1).
 *  - 2% 回饋金 is "計算需扣除所有政府課稅 (包括但不限於 5% 之加值型營業稅) 後計算" (規章 I.1).
 *  - Refund on 黑鑽卡 (規章 H.8): before issue -> fee refunded and accrued 2% cancelled; issued and
 *    used -> fee minus the 2% already used; issued but unused -> fee refunded and the 2% void.
 *
 * NOT official, and therefore labelled as illustrations on the page: the rounding of the
 * tax-exclusive amount (whole dollars here) and the month-proration of an upgrade fee, whose
 * month count the rules do not spell out.
 */

const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const parse = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) throw new Error(`bad ISO date: ${s}`);
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
};
/** Last day of the month that is `back` months before the month of `d`. */
function endOfMonthBefore(d, back) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - back + 1, 0));
}

/** 升級回本的合格年消費 = 升級價差 ÷ 回饋率. */
export function upgradeBreakeven(delta, rate) {
  return rate > 0 ? Math.round(delta / rate) : 0;
}

/** 回饋觸頂的合格年消費 = 年度上限 ÷ 回饋率. */
export function capSpend(cap, rate) {
  return rate > 0 ? Math.round(cap / rate) : 0;
}

/** Tax-exclusive base of a tax-inclusive amount (5% 營業稅), whole dollars. */
export function netOfTax(gross, taxRate = 0.05) {
  return Math.round(gross / (1 + taxRate));
}

/** 2% on the tax-exclusive amount, capped for the year. */
export function rewardOn(gross, rate, taxRate = 0.05, capLeft = Infinity) {
  return Math.min(Math.round(netOfTax(gross, taxRate) * rate), capLeft);
}

/**
 * Accrual windows: [upgrade date, end of the month 3 months before the expiry month], then each later year
 * from the day after the previous window to the same point one membership year later.
 * @returns {{from: string, to: string}[]}
 */
export function accrualWindows(upgradeDate, expiryDate, years = 2) {
  const up = parse(upgradeDate);
  const exp = parse(expiryDate);
  const windows = [];
  let from = up;
  for (let y = 0; y < years; y += 1) {
    const e = new Date(Date.UTC(exp.getUTCFullYear() + y, exp.getUTCMonth(), exp.getUTCDate()));
    const to = endOfMonthBefore(e, 3);
    windows.push({ from: iso(from), to: iso(to) });
    from = new Date(to.getTime() + 86400000);
  }
  return windows;
}

/** 核發日: the 1st of the month two months before the expiry month. */
export function issueDate(expiryDate) {
  const exp = parse(expiryDate);
  return iso(new Date(Date.UTC(exp.getUTCFullYear(), exp.getUTCMonth() - 2, 1)));
}

/** 核發後一年內使用完畢: one year after the issue date. */
export function useByDate(issue) {
  const d = parse(issue);
  return iso(new Date(Date.UTC(d.getUTCFullYear() + 1, d.getUTCMonth(), d.getUTCDate())));
}

/**
 * 直接申辦黑鑽卡後退卡 (規章 H.8): amount refunded to the member.
 * stage: 'beforeIssue' | 'issuedUsed' | 'issuedUnused'
 */
export function executiveRefund(fee, stage, usedReward = 0) {
  if (stage === 'issuedUsed') return Math.max(0, fee - usedReward);
  return fee; // before issue, or issued but unused (the reward is voided)
}

/** Illustration only: an upgrade fee prorated by months left (the rules do not spell out the month count). */
export function proratedUpgradeIllustration(delta, monthsLeft) {
  return Math.round((delta * monthsLeft) / 12);
}

/**
 * Illustration only. Official: accrual in the first window stops 3 months before expiry. Assumed (not
 * official): the upgrade fee falls in proportion to the months left. Returns the eligible spend per month
 * needed inside the first accrual window to earn back the prorated fee at `rate`.
 */
export function firstWindowMonthlyNeed(delta, rate, monthsLeft) {
  const accrualMonths = monthsLeft - 3;
  if (rate <= 0 || accrualMonths <= 0) return Number.NaN;
  return Math.round(((delta * monthsLeft) / 12 / rate) / accrualMonths);
}
