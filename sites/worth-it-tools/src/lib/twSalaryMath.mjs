/*
 * 時薪、日薪、月薪、年薪互換與加班費 (P2 batch 11, 2026-10-18), zh only.
 *
 * Replaces the shared (US-style) salary converter on /zh/tools/salary-converter/. Pure functions, shared by the page
 * script, the page's worked examples (tests/tw-salary-math.test.mjs asserts every number the page prints) and the
 * tests. Wages the reader types (月薪, 日薪, 時薪, 年終獎金月數) are inputs; what is built in is only a published rule.
 *
 * What is official, and where it was read on 2026-10-18 (Taiwan date):
 *
 *  - 勞動基準法 第 30 條: 正常工作時間每日不得超過 8 小時, 每週不得超過 40 小時.
 *    https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=30
 *  - 勞動基準法 第 24 條: 平日延長工時 2 小時以內加給 1/3 以上, 再延長 2 小時以內加給 2/3 以上 (so 4/3 and 5/3 of the
 *    平日每小時工資額 are the minimums); 休息日工作 2 小時以內 "另再加給一又三分之一以上", 工作 2 小時後再繼續工作
 *    "另再加給一又三分之二以上" (第 2 項).
 *    https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=24
 *  - 勞動部 加班補休規定: 休息日出勤 前 2 小時另再加給 1 又 1/3, 第 3 至 8 小時另再加給 1 又 2/3, 第 9 至 12 小時另再加給
 *    2 又 2/3 (the 9-12 hour tier is stated on this page, not in the statute text).
 *    https://www.mol.gov.tw/1607/28162/28166/28180/28198/28202/47031/post
 *  - 勞動部 月薪制加班費試算系統 (calcr2.mol.gov.tw/Monthly) prints its own formula, e.g. 平日加班費 (36000/240*4/3*6) = 1200,
 *    休息日加班費 (36000/240*4/3*2) = 400. This module's overtimePay() reproduces those two numbers (tested).
 *    https://calcr2.mol.gov.tw/Monthly
 *  - 月薪換時薪: 勞動部 澄清稿 (2018-09-14) "以月薪除以 30, 推計平日 1 日工資, 嗣再除以 8, 得出平日每小時工資額"; 例: 月薪 36,000
 *    -> 日 1,200 -> 時 150. https://www.mol.gov.tw/1607/1632/1640/20597/
 *    勞動部 常見問答 (2014-11-25, 更新 2026-01-01): 月薪給付總額除勞資雙方另有約定外, 視為已給付相當於 240 小時之工資;
 *    例: 每月最低工資 29,500 元, 平日每小時工資額 (29,500 ÷ 30 ÷ 8). 勞資雙方已重行約定工資總額及計算內涵者, 依新約定.
 *    https://www.mol.gov.tw/1607/28690/2282/2284/2290/7119/post
 *  - 基本工資 115-01-01 起: 月 29,500 元, 時 196 元 (勞動部 114-10-21 發布).
 *    https://www.mol.gov.tw/1607/28162/28166/28180/70460/76761/76833/post
 *    勞動部 常見問答 (更新 2026-04-21): 月最低工資指按月計酬且每週 40 小時內履行勞務的最低報酬; 時薪是按時計酬者單位時間的
 *    最低報酬; 數額只指正常工作時間內的報酬, 不含延長工時與休息日、休假日、例假工作加給; 按日計酬者的日薪, 在法定正常工作
 *    時數內不得低於每小時 196 元乘以工作時數 (沒有發布日薪數額). https://www.mol.gov.tw/1607/28690/2282/2284/2290/7121/post
 *    勞動部 時薪制勞工的權益: 時薪 196 元已把例假與休息日工資折入; 按時計酬者的延時工資以約定時薪 (不低於 196) 為基礎依第 24 條算.
 *    https://www.mol.gov.tw/topic/3067/5990/5999/14486/
 *  - 延長工時上限: 勞基法 第 32 條 第 2 項 一日正常加延長不得超過 12 小時; 延長工時一個月不得超過 46 小時 (經工會或勞資會議
 *    同意可到 54 小時, 每 3 個月不得超過 138 小時); 第 36 條 第 3 項 休息日工作時間計入延長工作時間總數.
 *    https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=32 , .../flno=36
 *  - 年終獎金不是法定項目: 勞基法 第 29 條 只規定事業單位年度有盈餘時, 對全年工作無過失的勞工 "應給與獎金或分配紅利", 沒有規定
 *    名稱、月數或金額; 勞動部 常見問答 (特休未休工資, 更新 2026-04-21) 稱 "雇主依民俗發給勞工年終獎金的福利性質".
 *    https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=29 ;
 *    https://www.mol.gov.tw/1607/28690/2282/2284/2290/7171/post
 *
 * NOT official, and stated on the page as simplifications: the page never rounds a wage in the middle of a calculation
 * (a payroll slip may round the hourly wage to the dollar); the same overtime pattern is assumed in all 12 months; the
 * 4/3, 5/3, 8/3 multipliers are the statutory minimums (an employer may pay more); 例假日, 國定假日, 特別休假 and
 * 輪班/變形工時 are not modelled; 休息日 pay is for the hours actually worked (the 4-hour minimum that existed
 * before the 2018-03-01 amendment is not in the current text of 第 24 條).
 */

export const MIN_WAGE_MONTHLY = 29500; // 勞動部, 115-01-01
export const MIN_WAGE_HOURLY = 196; // 勞動部, 115-01-01
export const DAYS_PER_MONTH = 30; // 勞動部 月薪 ÷ 30
export const NORMAL_DAILY_HOURS = 8; // 勞基法 第 30 條
export const NORMAL_WEEKLY_HOURS = 40; // 勞基法 第 30 條
export const MONTHLY_WAGE_HOURS = DAYS_PER_MONTH * NORMAL_DAILY_HOURS; // 240
export const OVERTIME_MONTH_LIMIT = 46; // 勞基法 第 32 條 第 2 項
export const OVERTIME_MONTH_LIMIT_WITH_CONSENT = 54; // 經工會或勞資會議同意
export const WEEKDAY_OVERTIME_MAX_PER_DAY = 4; // 8 + 4 = 12 小時 (第 32 條 第 2 項)
export const REST_DAY_MAX_HOURS = 12;

/** Weekday overtime tiers: [hours up to (cumulative within the day), multiple of 平日每小時工資額]. 勞基法 第 24 條. */
export const WEEKDAY_TIERS = Object.freeze([
  Object.freeze({ upTo: 2, multiple: 4 / 3 }),
  Object.freeze({ upTo: 4, multiple: 5 / 3 }),
]);
/** 休息日 tiers (勞基法 第 24 條 第 2 項; the 9-12 hour tier is from 勞動部 加班補休規定). */
export const REST_DAY_TIERS = Object.freeze([
  Object.freeze({ upTo: 2, multiple: 4 / 3 }),
  Object.freeze({ upTo: 8, multiple: 5 / 3 }),
  Object.freeze({ upTo: 12, multiple: 8 / 3 }),
]);

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function need(name, value, { positive = false, max = Infinity } = {}) {
  const n = safeNumber(value, NaN);
  if (!Number.isFinite(n) || n < 0 || (positive && n <= 0) || n > max) {
    throw new RangeError(`${name} must be ${positive ? 'greater than 0' : 'a number of 0 or more'}${max < Infinity ? ` and at most ${max}` : ''}.`);
  }
  return n;
}

/** Pay for `hours` hours worked in one day under the given tiers, at `hourlyWage`. */
function tieredPay(hourlyWage, hours, tiers) {
  let paid = 0;
  let from = 0;
  let total = 0;
  for (const tier of tiers) {
    const slice = Math.max(0, Math.min(hours, tier.upTo) - from);
    total += slice * tier.multiple * hourlyWage;
    paid += slice;
    from = tier.upTo;
  }
  if (Math.abs(paid - hours) > 1e-9) throw new RangeError('hours exceed the modelled tiers');
  return total;
}

/** 月薪 -> 平日每小時工資額, 勞動部: 月薪 ÷ 30 ÷ 8 (= ÷ 240). */
export const monthlyToHourly = (monthly) => need('monthly', monthly) / DAYS_PER_MONTH / NORMAL_DAILY_HOURS;
/** 月薪 -> 1 日工資, 勞動部: 月薪 ÷ 30. */
export const monthlyToDaily = (monthly) => need('monthly', monthly) / DAYS_PER_MONTH;

/** Weekday overtime for one day of `hoursPerDay` overtime hours (0-4): first 2 h at 4/3, next 2 h at 5/3. */
export function weekdayOvertimeForDay(hourlyWage, hoursPerDay) {
  const w = need('hourlyWage', hourlyWage);
  const h = need('weekdayHoursPerDay', hoursPerDay, { max: WEEKDAY_OVERTIME_MAX_PER_DAY });
  return tieredPay(w, h, WEEKDAY_TIERS);
}

/** 休息日 pay for one visit of `hours` hours (0-12): 1-2 h at 4/3, 3-8 h at 5/3, 9-12 h at 8/3. */
export function restDayOvertimeForVisit(hourlyWage, hours) {
  const w = need('hourlyWage', hourlyWage);
  const h = need('restDayHoursPerVisit', hours, { max: REST_DAY_MAX_HOURS });
  return tieredPay(w, h, REST_DAY_TIERS);
}

/**
 * Monthly overtime pay.
 *   hourlyWage            平日每小時工資額
 *   weekdayHoursPerDay    平日每次加班幾小時 (0-4)
 *   weekdayDays           一個月內平日加班幾天
 *   restDayHoursPerVisit  休息日每次出勤幾小時 (0-12)
 *   restDayVisits         一個月內休息日出勤幾次
 */
export function overtimePay({ hourlyWage, weekdayHoursPerDay = 0, weekdayDays = 0, restDayHoursPerVisit = 0, restDayVisits = 0 }) {
  const days = need('weekdayDays', weekdayDays, { max: 31 });
  const visits = need('restDayVisits', restDayVisits, { max: 31 });
  const weekday = weekdayOvertimeForDay(hourlyWage, weekdayHoursPerDay) * days;
  const restDay = restDayOvertimeForVisit(hourlyWage, restDayHoursPerVisit) * visits;
  const weekdayHours = need('weekdayHoursPerDay', weekdayHoursPerDay) * days;
  const restDayHours = need('restDayHoursPerVisit', restDayHoursPerVisit) * visits;
  const hours = weekdayHours + restDayHours;
  return {
    weekday,
    restDay,
    total: weekday + restDay,
    weekdayHours,
    restDayHours,
    hours,
    overMonthLimit: hours > OVERTIME_MONTH_LIMIT + 1e-9,
    overConsentLimit: hours > OVERTIME_MONTH_LIMIT_WITH_CONSENT + 1e-9,
  };
}

/** Minimum-wage check. kind: 'monthly' (按月計酬, full time) | 'hourly' (按時計酬, also used for 日薪 ÷ 每日工時). */
export function minimumWageGap({ kind, amount }) {
  const floor = kind === 'monthly' ? MIN_WAGE_MONTHLY : MIN_WAGE_HOURLY;
  const value = need('amount', amount);
  return { floor, below: value < floor - 1e-9, gap: value - floor };
}

/**
 * Convert a wage between 時薪, 日薪, 月薪 and 年薪.
 *
 * basis 'monthly'  amount = 月薪 (每月固定薪資, 稅前). hourly = ÷ 240, daily = ÷ 30 (勞動部 convention).
 * basis 'annual'   amount = 年薪 (稅前), paymentMonths = 年薪分成幾個月發 (預設 12; 例如契約約定 13.5 個月).
 *                  月薪 = 年薪 ÷ paymentMonths, then as 'monthly'.
 * basis 'daily'    amount = 日薪; hoursPerDay 每日正常工時 (<= 8), daysPerWeek 每週出勤日數, weeks 計薪週數.
 *                  hourly = 日薪 ÷ hoursPerDay.
 * basis 'hourly'   amount = 時薪; same hoursPerDay / daysPerWeek / weeks. daily = 時薪 × hoursPerDay.
 *
 * compareWeeklyHours (monthly / annual basis only): 每週實際工時, only to give effectiveHourly = 年薪 ÷ (每週工時 × 52).
 *
 * bonusMonths (monthly / daily / hourly basis only): 契約或工作規則約定的年終獎金, 以 "平均月薪" 的幾個月計; 預設 0.
 * The page never assumes a year-end bonus exists.
 */
export function convertSalary({
  basis,
  amount,
  paymentMonths = 12,
  hoursPerDay = NORMAL_DAILY_HOURS,
  daysPerWeek = 5,
  weeks = 52,
  bonusMonths = 0,
  compareWeeklyHours = NORMAL_WEEKLY_HOURS,
}) {
  const value = need('amount', amount, { positive: true });
  const warnings = [];
  let monthly;
  let daily;
  let hourly;
  let annualBase;
  let hourlyBasisFloorKind;
  let weeklyHours = null;
  let effectiveHourly;

  if (basis === 'monthly' || basis === 'annual') {
    const months = basis === 'annual' ? need('paymentMonths', paymentMonths, { positive: true, max: 36 }) : 12;
    monthly = basis === 'annual' ? value / months : value;
    daily = monthlyToDaily(monthly);
    hourly = monthlyToHourly(monthly);
    annualBase = basis === 'annual' ? value : monthly * 12;
    hourlyBasisFloorKind = 'monthly';
    // 比較不同工作用: 年薪 ÷ (每週實際工時 × 52 週). Not the 勞動部 加班費 base (that is 月薪 ÷ 240).
    effectiveHourly = annualBase / (need('compareWeeklyHours', compareWeeklyHours, { positive: true, max: 84 }) * 52);
  } else if (basis === 'daily' || basis === 'hourly') {
    const hpd = need('hoursPerDay', hoursPerDay, { positive: true, max: NORMAL_DAILY_HOURS });
    const dpw = need('daysPerWeek', daysPerWeek, { positive: true, max: 7 });
    const wk = need('weeks', weeks, { positive: true, max: 53 });
    weeklyHours = hpd * dpw;
    if (weeklyHours > NORMAL_WEEKLY_HOURS + 1e-9) {
      warnings.push('weeklyHoursOver40');
    }
    if (basis === 'daily') {
      daily = value;
      hourly = value / hpd;
    } else {
      hourly = value;
      daily = value * hpd;
    }
    annualBase = daily * dpw * wk;
    monthly = annualBase / 12;
    hourlyBasisFloorKind = 'hourly';
    effectiveHourly = annualBase / (weeklyHours * wk);
  } else {
    throw new RangeError('basis must be monthly, annual, daily or hourly');
  }

  const bonusM = basis === 'annual' ? 0 : need('bonusMonths', bonusMonths, { max: 36 });
  const bonus = bonusM * monthly;
  const annualGross = annualBase + bonus;

  const floorCheck =
    hourlyBasisFloorKind === 'monthly'
      ? minimumWageGap({ kind: 'monthly', amount: monthly })
      : minimumWageGap({ kind: 'hourly', amount: hourly });

  return {
    basis,
    monthly,
    daily,
    hourly,
    effectiveHourly,
    annualBase,
    bonus,
    annualGross,
    weeklyHours,
    floorKind: hourlyBasisFloorKind,
    floor: floorCheck.floor,
    belowFloor: floorCheck.below,
    floorGap: floorCheck.gap,
    warnings,
  };
}

/** Convert plus overtime: the monthly overtime pattern is assumed to repeat in all 12 months. */
export function convertWithOvertime(input) {
  const base = convertSalary(input);
  const ot = overtimePay({
    hourlyWage: base.hourly,
    weekdayHoursPerDay: input.weekdayHoursPerDay ?? 0,
    weekdayDays: input.weekdayDays ?? 0,
    restDayHoursPerVisit: input.restDayHoursPerVisit ?? 0,
    restDayVisits: input.restDayVisits ?? 0,
  });
  return {
    ...base,
    overtime: ot,
    monthlyWithOvertime: base.monthly + ot.total,
    annualWithOvertime: base.annualGross + ot.total * 12,
  };
}
