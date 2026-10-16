/*
 * Taiwan credit-card revolving-interest arithmetic (P2 batch 1, 2026-10-16).
 *
 * Pure functions shared by the page script and tests/tw-credit-card-math.test.mjs.
 * What is official and where it was read on 2026-10-16:
 *
 *  - 年利率上限 15%: 銀行法第 47-1 條第 2 項 (自 104-09-01).
 *    https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0380001&flno=47-1
 *  - 不得以複利計息, 費用不計入循環信用本金, 當期消費不計入當期本金計息:
 *    信用卡業務機構管理辦法第 48 條.
 *    https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0380055&flno=48
 *  - 最低應繳金額每期至少包含: 當期一般消費 10%, 當期預借現金及前期未清償帳款 5%,
 *    分期本息, 超額款, 累計逾期最低應繳, 循環信用利息及各項費用:
 *    金管銀票字第 10340001781 號令 (104-07-01 生效).
 *    https://law.fsc.gov.tw/LawContent.aspx?id=GL001164
 *  - 已付款項依序抵沖費用, 利息, 前期剩餘未付款項, 當期帳款本金; 利息以元為單位
 *    四捨五入; 繳款後剩餘未付款項不足新臺幣一千元, 則當期結帳日後的循環信用利息
 *    不予計收: 信用卡定型化契約範本第 14, 15 條 (103-09-12 修正).
 *    https://law.fsc.gov.tw/LawContent.aspx?id=FL049932
 *
 * NOT official, and therefore stated on the page as simplifications: a cycle is a
 * fixed number of days (default 30) with interest = principal x APR x days / 365;
 * the payment is made at the end of the cycle; no new spending; the 5% minimum is
 * rounded up to a whole dollar; an issuer-specific minimum-payment floor is a
 * reader input (default 0).
 */

export const APR_CAP_PCT = 15;

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** 日息 = 本金 x 年利率 / 365 (not rounded). */
export function dailyInterest(principal, aprPct) {
  return (Math.max(0, safeNumber(principal)) * Math.max(0, safeNumber(aprPct))) / 100 / 365;
}

/** One cycle's revolving interest, rounded to the dollar (範本第 15 條「元以下四捨五入」). */
export function cycleInterest(principal, aprPct, days = 30) {
  return Math.round(dailyInterest(principal, aprPct) * Math.max(0, safeNumber(days, 30)));
}

/**
 * Minimum payment for a cycle with no new spending: 5% of the previous unpaid
 * balance (rounded up to a whole dollar) plus the cycle's interest, but not less
 * than the issuer floor and never more than what is owed.
 */
export function minimumPayment({ principal, interest, minPct = 5, floor = 0 }) {
  const raw = Math.ceil((principal * minPct) / 100) + interest;
  return Math.min(principal + interest, Math.max(raw, safeNumber(floor)));
}

/**
 * Run the balance down month by month.
 * mode 'minimum': pay the minimum every cycle.
 * mode 'fixed': pay `payment` every cycle (applied to interest first, then principal).
 * `freeUnder1000`: apply 範本第 15 條 -- once the principal left after a payment is
 * below NT$1,000, no further revolving interest is charged.
 */
export function simulate({ principal, aprPct, days = 30, mode, payment = 0, minPct = 5, floor = 0, freeUnder1000 = false, maxMonths = 1200 }) {
  let balance = Math.max(0, Math.round(safeNumber(principal)));
  let months = 0;
  let totalInterest = 0;
  let totalPaid = 0;
  let interestFree = false;
  let monthsUnder1000 = null;
  let interestUntilUnder1000 = null;
  const schedule = [];
  while (balance > 0 && months < maxMonths) {
    months += 1;
    const interest = interestFree ? 0 : cycleInterest(balance, aprPct, days);
    const due = mode === 'minimum'
      ? minimumPayment({ principal: balance, interest, minPct, floor })
      : Math.min(balance + interest, Math.max(0, safeNumber(payment)));
    if (mode === 'fixed' && due <= interest && due < balance + interest) {
      return { months, totalInterest, totalPaid, payoffMonths: null, monthsUnder1000, interestUntilUnder1000, status: 'paymentTooLow', schedule };
    }
    const principalPaid = Math.min(balance, due - interest);
    balance -= principalPaid;
    totalInterest += interest;
    totalPaid += due;
    if (balance < 1000 && monthsUnder1000 === null) {
      monthsUnder1000 = months;
      interestUntilUnder1000 = totalInterest;
    }
    if (freeUnder1000 && balance > 0 && balance < 1000) interestFree = true;
    schedule.push({ month: months, interest, payment: due, principalPaid, balance });
  }
  return { months, totalInterest, totalPaid, payoffMonths: balance === 0 ? months : null, monthsUnder1000, interestUntilUnder1000, status: balance === 0 ? 'paidOff' : 'notWithinLimit', schedule };
}
