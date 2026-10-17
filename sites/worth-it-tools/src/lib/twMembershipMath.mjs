/*
 * Membership and subscription arithmetic (P2 batch 4, 2026-10-17).
 *
 * Pure functions shared by the page scripts (DeliveryMembershipCalculator, GymCostCalculator,
 * the subscription audit), by the numbers printed in the pages' prose and decision guides
 * (rendered at build time from these same functions) and by tests/tw-membership-math.test.mjs.
 *
 * Nothing in here carries a platform price, a gym price or a bank rate. Every fee is the
 * reader's input; the worked examples on the pages use round illustrative numbers that are
 * labelled as such.
 *
 * What is official, and where it was read on 2026-10-17:
 *
 *  - 健身中心定型化契約應記載及不得記載事項 (教育部 110-11-01 臺教授體部字第 1100039418D 號令修正,
 *    111-01-01 生效). Quoted points used below:
 *      四: 契約期間不得逾三年; 按月定額收取會籍費用者以十年為限
 *      五: 入會費及其他費用總額不得逾月平均價格之二倍; 月平均價格 = 契約總金額 / 契約月數 (含贈送月數)
 *      十(一): 契約生效七日內且未使用服務而終止 -> 全額退還
 *      十(二)1: 已預繳全部費用 -> 已繳全部費用 - 月平均價格 x 實際經過時間 (未滿十五日以半個月計, 逾十五日以一個月計), 有餘額退還
 *      十(二)2: 月繳 -> 月平均價格 x 實際經過月數 (同樣的十五日規則), 不足補足, 有餘額退還
 *      十(二)3: 手續費 -> 不收取 / 定額 600 元 / 不定額 = 月平均價格 x 約定使用期間未到期時間比例 x 百分之○ (不得逾 20%)
 *        (the text says 未到期時間比例; this module reads it as the unexpired number of months, i.e. a percentage of the
 *        unexpired part of the contract -- the page says so and defers to the contract)
 *      十: 入會費及其他費用於終止契約時得不列入退費計算範圍; 手續費加計應補足金額上限 6,000 元
 *    https://www.ey.gov.tw/File/11A27ED8536A6030?A=C (行政院全球資訊網附件)
 *
 * NOT official and therefore stated on the pages as simplifications: the "約定使用期間" is
 * taken as the whole contract; elapsed time is counted in whole and half months by the
 * 十五日 rule applied to the reader's day count; the reader types the percentage or fixed
 * fee their own contract names.
 */

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

const round2 = (n) => Math.round(n * 100) / 100;

// ---------------------------------------------------------------------------------------------
// Delivery membership (外送會員)
// ---------------------------------------------------------------------------------------------

/**
 * Break-even of a delivery membership.
 *   membershipFee        fee for the period compared (a year)
 *   unusedMonths         months with no orders at all (0-12)
 *   ordersPerActiveMonth orders the reader would place anyway
 *   eligibleRatePct      share of those orders that meet the merchant and basket rules (0-100)
 *   deliverySaving       delivery-fee difference per eligible order (member vs non-member checkout)
 *   serviceSaving        service-fee difference per eligible order
 *   extraSpend           extra spend added only to reach the minimum, per eligible order
 */
export function deliveryBreakEven({ membershipFee, unusedMonths = 0, ordersPerActiveMonth, eligibleRatePct = 100, deliverySaving, serviceSaving = 0, extraSpend = 0 }) {
  const fee = Math.max(0, safeNumber(membershipFee));
  const unused = Math.min(12, Math.max(0, Math.round(safeNumber(unusedMonths))));
  const activeMonths = 12 - unused;
  const perMonth = Math.max(0, safeNumber(ordersPerActiveMonth));
  const rate = Math.min(100, Math.max(0, safeNumber(eligibleRatePct))) / 100;
  const plannedOrders = activeMonths * perMonth;
  const eligibleOrders = plannedOrders * rate;
  const savingPerEligibleOrder = safeNumber(deliverySaving) + safeNumber(serviceSaving) - Math.max(0, safeNumber(extraSpend));
  const grossSavings = eligibleOrders * savingPerEligibleOrder;
  const netValue = grossSavings - fee;
  const breakEvenOrders = savingPerEligibleOrder > 0 ? Math.ceil(fee / savingPerEligibleOrder) : 0;
  return { activeMonths, plannedOrders, eligibleOrders, savingPerEligibleOrder, grossSavings, netValue, breakEvenOrders };
}

// ---------------------------------------------------------------------------------------------
// Gym cost per visit (健身房單次成本)
// ---------------------------------------------------------------------------------------------

/** Total contract cost, cost per visit and the visits per active month needed to beat a drop-in price. */
export function gymCost({ joiningFee = 0, monthlyFee, serviceFee = 0, contractMonths, missedMonths = 0, visitsPerActiveMonth, dropInCost = 0 }) {
  const joining = Math.max(0, safeNumber(joiningFee));
  const monthly = Math.max(0, safeNumber(monthlyFee));
  const service = Math.max(0, safeNumber(serviceFee));
  const months = Math.max(1, Math.round(safeNumber(contractMonths, 1)));
  const missed = Math.min(months, Math.max(0, Math.round(safeNumber(missedMonths))));
  const visitsPerMonth = Math.max(0, safeNumber(visitsPerActiveMonth));
  const dropIn = Math.max(0, safeNumber(dropInCost));
  const activeMonths = Math.max(0, months - missed);
  const totalVisits = activeMonths * visitsPerMonth;
  const totalCost = joining + months * (monthly + service);
  const alternativeCost = totalVisits * dropIn;
  const difference = alternativeCost - totalCost; // > 0: the membership is cheaper
  const costPerVisit = totalVisits > 0 ? totalCost / totalVisits : 0;
  const breakEvenVisitsPerActiveMonth = activeMonths > 0 && dropIn > 0 ? Math.ceil(totalCost / (dropIn * activeMonths)) : 0;
  return { activeMonths, totalVisits, totalCost, alternativeCost, difference, costPerVisit, breakEvenVisitsPerActiveMonth };
}

/** 月平均價格 = 契約總金額 / 契約月數 (含贈送月數). */
export function gymAveragePrice(contractTotal, contractMonths) {
  const months = Math.max(1, safeNumber(contractMonths, 1));
  return Math.max(0, safeNumber(contractTotal)) / months;
}

/** 入會費及其他費用總額上限 = 月平均價格 x 2 (第五點). */
export function gymJoiningFeeCap(contractTotal, contractMonths) {
  return 2 * gymAveragePrice(contractTotal, contractMonths);
}

/**
 * 實際經過月數 under the 十五日 rule: whole months, plus half a month if the remainder is under
 * 15 days, plus a whole month if it is over 15 days. "逾十五日" is read as more than 15 days;
 * exactly 15 days is therefore half a month ("未滿十五日者以半個月計" does not name the 15th day, and
 * the page says so).
 */
export function elapsedMonthsBy15DayRule(wholeMonths, extraDays) {
  const whole = Math.max(0, Math.round(safeNumber(wholeMonths)));
  const days = Math.max(0, Math.round(safeNumber(extraDays)));
  if (days === 0) return whole;
  return days > 15 ? whole + 1 : whole + 0.5;
}

/**
 * Settlement when the member ends the contract early (第十點, 可歸責消費者事由).
 *   contractTotal   契約總金額 (everything the contract adds up to, including joining and other fees)
 *   contractMonths  契約月數 (including gifted months)
 *   payment         'prepaid' (paid it all up front) or 'monthly'
 *   paidSoFar       what has been paid so far (prepaid: the whole prepayment; monthly: the sum of months paid)
 *   elapsedMonths   from elapsedMonthsBy15DayRule
 *   usedFacility    whether the member used the facility
 *   daysSinceStart  days since the contract took effect (for the 七日 full-refund rule)
 *   feeType         'none' | 'fixed' | 'percent'
 *   feePct          for 'percent': the percentage the contract names (capped at 20)
 *   fixedFee        for 'fixed': the contract's fixed fee (the regulation's template says 600)
 * Returns { rule, avgPrice, usedCharge, balance, fee, net, capped }.
 * net > 0: the gym refunds that amount; net < 0: the member must pay that amount.
 */
export function gymEarlyTermination({ contractTotal, contractMonths, payment = 'prepaid', paidSoFar, elapsedMonths, usedFacility = true, daysSinceStart = 999, feeType = 'none', feePct = 0, fixedFee = 600 }) {
  const paid = Math.max(0, safeNumber(paidSoFar));
  const avg = gymAveragePrice(contractTotal, contractMonths);
  const months = Math.max(1, safeNumber(contractMonths, 1));
  const elapsed = Math.max(0, safeNumber(elapsedMonths));
  if (safeNumber(daysSinceStart, 999) <= 7 && !usedFacility) {
    return { rule: 'sevenDayFullRefund', avgPrice: avg, usedCharge: 0, balance: paid, fee: 0, net: paid, capped: false };
  }
  const usedCharge = round2(avg * elapsed);
  const balance = round2(paid - usedCharge); // prepaid: refund if > 0; monthly: paid - charge (< 0 means top-up)
  const unexpired = Math.max(0, months - elapsed);
  let fee = 0;
  if (feeType === 'fixed') fee = Math.max(0, safeNumber(fixedFee));
  else if (feeType === 'percent') fee = round2(avg * unexpired * (Math.min(20, Math.max(0, safeNumber(feePct))) / 100));
  // 手續費加計應補足金額上限不得超過 6,000 元
  const topUp = balance < 0 ? -balance : 0;
  let capped = false;
  if (fee + topUp > 6000) {
    fee = Math.max(0, 6000 - topUp);
    capped = true;
  }
  const net = round2(balance - fee);
  return { rule: payment === 'monthly' ? 'monthly' : 'prepaid', avgPrice: round2(avg), usedCharge, balance, fee, net, capped };
}

// ---------------------------------------------------------------------------------------------
// Monthly vs annual subscription (月繳 vs 年繳)
// ---------------------------------------------------------------------------------------------

/** Months of monthly payments that equal the annual price: annual / monthly. */
export function breakEvenMonths(monthlyPrice, annualPrice) {
  const m = safeNumber(monthlyPrice);
  return m > 0 ? safeNumber(annualPrice) / m : Number.NaN;
}

/**
 * Two-outcome model: the member either uses all 12 months or stops after `earlyMonth`.
 * monthly cost: 12M with probability p, kM otherwise. Annual is a non-refundable A.
 * Returns the expected monthly cost, annual minus that (negative = annual is cheaper in
 * expectation) and the full-year probability at which both tie, (A - kM) / (12M - kM).
 */
export function monthlyVsAnnual({ monthlyPrice, annualPrice, earlyMonth, probabilityFullYearPct }) {
  const M = Math.max(0, safeNumber(monthlyPrice));
  const A = Math.max(0, safeNumber(annualPrice));
  const k = Math.min(12, Math.max(0, Math.round(safeNumber(earlyMonth))));
  const p = Math.min(100, Math.max(0, safeNumber(probabilityFullYearPct))) / 100;
  const fullYearMonthly = 12 * M;
  const earlyMonthly = k * M;
  const expectedMonthly = p * fullYearMonthly + (1 - p) * earlyMonthly;
  const denominator = fullYearMonthly - earlyMonthly;
  const tieProbabilityPct = denominator > 0 ? ((A - earlyMonthly) / denominator) * 100 : Number.NaN;
  return {
    fullYearMonthly,
    earlyMonthly,
    expectedMonthly,
    annualSaves: expectedMonthly - A, // > 0: annual is cheaper in expectation
    annualSavesIfFullYear: fullYearMonthly - A,
    annualLosesIfEarly: A - earlyMonthly,
    tieProbabilityPct,
  };
}

// ---------------------------------------------------------------------------------------------
// Subscription audit (訂閱支出健檢)
// ---------------------------------------------------------------------------------------------

export const CYCLE_MONTHS = { monthly: 1, quarterly: 3, yearly: 12 };

/** Monthly equivalent of one charge: monthly as is, quarterly / 3, yearly / 12. */
export function monthlyEquivalent(price, cycle) {
  return Math.max(0, safeNumber(price)) / (CYCLE_MONTHS[cycle] ?? 1);
}

/** Totals for a list of { price, cycle, hours }: monthly, yearly, five-year, and cost per hour. */
export function auditSubscriptions(rows) {
  const items = rows.map((row) => {
    const monthly = monthlyEquivalent(row.price, row.cycle);
    const hours = Math.max(0, safeNumber(row.hours));
    return { ...row, monthly, yearly: monthly * 12, costPerHour: hours > 0 && monthly > 0 ? monthly / hours : null };
  });
  const monthly = items.reduce((sum, item) => sum + item.monthly, 0);
  return { items, monthly, yearly: monthly * 12, fiveYear: monthly * 60 };
}
