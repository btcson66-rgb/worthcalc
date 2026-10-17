/*
 * Taiwan labor-pension and labor-insurance arithmetic (P2 batch 1, 2026-10-16).
 *
 * Pure functions, no DOM, so the page script and tests/tw-labor-math.test.mjs
 * run the very same code. Every constant below is copied from an official page
 * opened on 2026-10-16; the source is named next to it. Anything that is not an
 * official figure (return rate, payout years) is a parameter the caller must
 * supply -- nothing here hard-codes a market assumption.
 */

/**
 * 勞工退休金月提繳分級表, in force from 115-01-01 (2026-01-01).
 * 民國 114-11-24 勞動部勞動福 3 字第 1140153598 號令修正發布。
 * Source: https://www.bli.gov.tw/0013083.html -> https://www.bli.gov.tw/Files/25709
 * Row: [級, 實際工資下限, 實際工資上限 (null = 以上), 月提繳工資].
 * Table note 二: amounts are in NT$, rounded half up below the dollar.
 */
/** @type {ReadonlyArray<readonly [number, number, number | null, number]>} */
export const PENSION_WAGE_TABLE = [
  [1, 0, 1500, 1500],
  [2, 1501, 3000, 3000],
  [3, 3001, 4500, 4500],
  [4, 4501, 6000, 6000],
  [5, 6001, 7500, 7500],
  [6, 7501, 8700, 8700],
  [7, 8701, 9900, 9900],
  [8, 9901, 11100, 11100],
  [9, 11101, 12540, 12540],
  [10, 12541, 13500, 13500],
  [11, 13501, 15840, 15840],
  [12, 15841, 16500, 16500],
  [13, 16501, 17280, 17280],
  [14, 17281, 17880, 17880],
  [15, 17881, 19047, 19047],
  [16, 19048, 20008, 20008],
  [17, 20009, 21009, 21009],
  [18, 21010, 22000, 22000],
  [19, 22001, 23100, 23100],
  [20, 23101, 24000, 24000],
  [21, 24001, 25250, 25250],
  [22, 25251, 26400, 26400],
  [23, 26401, 27600, 27600],
  [24, 27601, 28590, 28590],
  [25, 28591, 29500, 29500],
  [26, 29501, 30300, 30300],
  [27, 30301, 31800, 31800],
  [28, 31801, 33300, 33300],
  [29, 33301, 34800, 34800],
  [30, 34801, 36300, 36300],
  [31, 36301, 38200, 38200],
  [32, 38201, 40100, 40100],
  [33, 40101, 42000, 42000],
  [34, 42001, 43900, 43900],
  [35, 43901, 45800, 45800],
  [36, 45801, 48200, 48200],
  [37, 48201, 50600, 50600],
  [38, 50601, 53000, 53000],
  [39, 53001, 55400, 55400],
  [40, 55401, 57800, 57800],
  [41, 57801, 60800, 60800],
  [42, 60801, 63800, 63800],
  [43, 63801, 66800, 66800],
  [44, 66801, 69800, 69800],
  [45, 69801, 72800, 72800],
  [46, 72801, 76500, 76500],
  [47, 76501, 80200, 80200],
  [48, 80201, 83900, 83900],
  [49, 83901, 87600, 87600],
  [50, 87601, 92100, 92100],
  [51, 92101, 96600, 96600],
  [52, 96601, 101100, 101100],
  [53, 101101, 105600, 105600],
  [54, 105601, 110100, 110100],
  [55, 110101, 115500, 115500],
  [56, 115501, 120900, 120900],
  [57, 120901, 126300, 126300],
  [58, 126301, 131700, 131700],
  [59, 131701, 137100, 137100],
  [60, 137101, 142500, 142500],
  [61, 142501, 147900, 147900],
  [62, 147901, null, 150000],
];

/** 勞工退休金條例 §14 I: employer contribution may not be below 6% of monthly wage. */
export const EMPLOYER_MIN_RATE = 0.06;
/** 勞工退休金條例 §14 III: voluntary contribution within 6% of monthly wage. */
export const SELF_MAX_RATE = 0.06;

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** Map an actual monthly wage to its 級 and 月提繳工資. */
export function contributionWage(actualWage) {
  const wage = Math.max(0, Math.round(safeNumber(actualWage)));
  for (const [level, low, high, contribution] of PENSION_WAGE_TABLE) {
    if (wage >= low && (high === null || wage <= high)) return { level, low, high, contribution };
  }
  const last = PENSION_WAGE_TABLE[PENSION_WAGE_TABLE.length - 1];
  return { level: last[0], low: last[1], high: last[2], contribution: last[3] };
}

/** Monthly contribution amounts, following 條例 §14 (rates are clamped to the legal range). */
export function monthlyContribution({ actualWage, employerRate = EMPLOYER_MIN_RATE, selfRate = 0 }) {
  const grade = contributionWage(actualWage);
  const employer = Math.max(EMPLOYER_MIN_RATE, safeNumber(employerRate, EMPLOYER_MIN_RATE));
  const self = Math.min(SELF_MAX_RATE, Math.max(0, safeNumber(selfRate)));
  // 勞保局 states the voluntary-contribution amount is "以元為單位，角以下4捨5入"
  // (https://www.bli.gov.tw/0101850.html Q7). The same whole-dollar rounding is
  // applied to the employer amount here; for every grade ending in 00 it makes
  // no difference at 6%.
  const employerMonthly = Math.round(grade.contribution * employer);
  const selfMonthly = Math.round(grade.contribution * self);
  return { ...grade, employerRate: employer, selfRate: self, employerMonthly, selfMonthly, totalMonthly: employerMonthly + selfMonthly };
}

/**
 * Account balance after `years` of contributions at a constant wage.
 * Simplification (stated on the page): contributions at each month end, return
 * compounded monthly at the rate equivalent to the annual rate the reader
 * enters. The real account distributes earnings once a year and the wage grade
 * moves with pay; this is an estimate, not the Bureau's figure.
 */
export function accumulate({ totalMonthly, years, annualReturnPct }) {
  const months = Math.max(0, Math.round(safeNumber(years) * 12));
  const annual = safeNumber(annualReturnPct) / 100;
  const i = Math.pow(1 + annual, 1 / 12) - 1;
  let balance = 0;
  for (let m = 0; m < months; m += 1) balance = balance * (1 + i) + totalMonthly;
  const principal = totalMonthly * months;
  return { months, principal, balance, earnings: balance - principal };
}

/**
 * Level monthly payout that uses up `balance` in `payoutYears` at `annualRatePct`.
 * NOT the Bureau's formula: the Bureau uses the 年金生命表, 平均餘命 and its own
 * interest rate and pays quarterly (勞工退休金條例 §23 I(1)). This is the
 * reader-adjustable approximation shown next to that explanation.
 */
export function levelPayout({ balance, payoutYears, annualRatePct }) {
  const n = Math.max(1, Math.round(safeNumber(payoutYears) * 12));
  const i = Math.pow(1 + safeNumber(annualRatePct) / 100, 1 / 12) - 1;
  if (i === 0) return balance / n;
  return (balance * i) / (1 - Math.pow(1 + i, -n));
}

/* ───────────────────────── 勞保老年年金 ───────────────────────── */

/**
 * 法定請領年齡 by birth year (民國). Source: 勞保局 FAQ
 * https://www.bli.gov.tw/0017461.html  "勞保老年年金法定請領年齡與出生年次對照表".
 */
export function statutoryClaimAge(birthYearRoc) {
  const y = Math.round(safeNumber(birthYearRoc));
  if (y <= 46) return 60;
  if (y >= 51) return 65;
  return 60 + (y - 46);
}

/**
 * 老年年金: take the higher of the two formulas, then apply 展延/減給.
 * Source: https://www.bli.gov.tw/0004857.html and https://www.bli.gov.tw/0017461.html
 *   (一) 平均月投保薪資 x 保險年資 x 0.775% + 3,000
 *   (二) 平均月投保薪資 x 保險年資 x 1.55%
 *   展延: 每延後 1 年增給 4%, 最多 20%;  減給: 最多提前 5 年, 每提前 1 年減 4%, 最多 20%
 *   期間未滿 1 年依實際月數按比例。
 * `serviceMonths` is the insured service in whole months (the Bureau counts under
 * 1 year by months, under 30 days as 1 month).
 */
export function oldAgeAnnuity({ avgSalary, serviceMonths, birthYearRoc, claimAgeMonths }) {
  const salary = Math.max(0, safeNumber(avgSalary));
  const months = Math.max(0, Math.round(safeNumber(serviceMonths)));
  const years = months / 12;
  const statutoryMonths = statutoryClaimAge(birthYearRoc) * 12;
  const claim = Math.round(safeNumber(claimAgeMonths, statutoryMonths));
  const formulaA = salary * years * 0.00775 + 3000;
  const formulaB = salary * years * 0.0155;
  const base = Math.max(formulaA, formulaB);
  const diffYears = (claim - statutoryMonths) / 12;
  let adjustment = 0;
  let status = 'eligible';
  if (months < 180) status = 'under15';
  else if (diffYears < 0) {
    if (diffYears < -5) status = 'tooEarly';
    adjustment = -Math.min(0.2, 0.04 * -diffYears);
  } else {
    adjustment = Math.min(0.2, 0.04 * diffYears);
  }
  const monthly = base * (1 + adjustment);
  return { years, statutoryAge: statutoryMonths / 12, formulaA, formulaB, usedFormula: formulaA >= formulaB ? 'A' : 'B', base, adjustment, monthly, status };
}

/** Insured service after age 60 counts for at most 5 years in a lump sum (勞保局 給付標準 二、三; 條例 §59 II). */
export const POST60_CAP_MONTHS = 60;

/**
 * Service months that count toward a lump sum. `serviceMonths` is the total insured service and
 * `monthsAfter60` the part of it served after age 60; the part beyond 5 years is not counted.
 * Source: https://www.bli.gov.tw/0004857.html 二 ("其逾60歲以後之保險年資，最多以5年計") and 三.
 */
export function countedServiceMonths({ serviceMonths, monthsAfter60 = 0 }) {
  const total = Math.max(0, Math.round(safeNumber(serviceMonths)));
  const after = Math.min(total, Math.max(0, Math.round(safeNumber(monthsAfter60))));
  const dropped = Math.max(0, after - POST60_CAP_MONTHS);
  return { total, after, counted: total - dropped, dropped };
}

/**
 * 老年一次金 (<15 年) = 平均月投保薪資 x 年資(每滿 1 年發 1 個月, 不足 1 年按月數比例);
 * 逾 60 歲以後的年資最多以 5 年計.
 * Source: https://www.bli.gov.tw/0004857.html 二.
 */
export function oldAgeLumpSumUnder15({ avgSalary, serviceMonths, monthsAfter60 = 0 }) {
  const { counted } = countedServiceMonths({ serviceMonths, monthsAfter60 });
  return Math.max(0, safeNumber(avgSalary)) * (counted / 12);
}

const onceTier = (years) => Math.min(years, 15) + Math.max(0, years - 15) * 2;

/**
 * 一次請領老年給付 (only for people with insured service before 98-01-01 who
 * meet 勞工保險條例 §58 II): 15 年內每年 1 個月, 超過部分每年 2 個月, 上限 45 個月.
 * 逾 60 歲繼續工作者, 逾 60 歲後的年資最多以 5 年計, 合併 60 歲以前的給付, 最高 50 個月 (條例 §59 II).
 *
 * The official text does not say how many months each year after 60 earns. Two readings are
 * consistent with it -- (1) 合計: add the counted years first, then apply the 15-year tier;
 * (2) 分開: the pre-60 amount (cap 45) plus 1 month for each counted year after 60 -- and they
 * agree only in some cases (a combined service of 15 years or less, or a result at the 50-month
 * ceiling). When they disagree the result is `determinable: false` and no number is returned.
 * Source: https://www.bli.gov.tw/0004857.html 三; https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=59
 */
export function onceClaimOldAge({ avgSalary, serviceMonths, monthsAfter60 = 0 }) {
  const salary = Math.max(0, safeNumber(avgSalary));
  const { total, after, counted, dropped } = countedServiceMonths({ serviceMonths, monthsAfter60 });
  if (after === 0) {
    const payMonths = Math.min(45, onceTier(total / 12));
    return { payMonths, amount: salary * payMonths, determinable: true, counted, dropped };
  }
  const countedAfter = after - dropped;
  const reading1 = Math.min(50, onceTier(counted / 12));
  const reading2 = Math.min(50, Math.min(45, onceTier((total - after) / 12)) + countedAfter / 12);
  const determinable = Math.abs(reading1 - reading2) < 1e-9;
  return {
    payMonths: determinable ? reading1 : null,
    amount: determinable ? salary * reading1 : null,
    determinable,
    counted,
    dropped,
    readings: [reading1, reading2],
  };
}
