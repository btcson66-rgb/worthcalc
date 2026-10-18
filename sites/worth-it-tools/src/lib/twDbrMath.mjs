/*
 * 負債比 DBR 與房貸月付占收入 (P2 batch 10, 2026-10-18), zh only.
 *
 * Replaces the US front-end / back-end DTI model that /zh/tools/dti-calculator/ used to run. Pure functions,
 * shared by the page script, the page's worked examples (tests/tw-dbr-math.test.mjs asserts every number the page
 * prints) and the tests. Nothing here is a bank's rule; everything built in is a published reference line.
 *
 * What is official, and where it was read on 2026-10-18 (Taiwan date):
 *
 *  - DBR = 全體金融機構無擔保債務歸戶後的總餘額 (信用卡、現金卡、信用貸款) ÷ 平均月收入, "不宜超過 22 倍";
 *    房屋貸款是擔保貸款, 不受 22 倍限制. 金融健檢 lights: DBR 超過 22 紅燈, 介於 1 到 22 黃燈, 小於 1 綠燈.
 *    金管會金融智慧網 金融健檢軟體  https://moneywise.fsc.gov.tw/tabf/main/tool1.html
 *  - "金管會要求各銀行對於個人於全體銀行無擔保債務 (含信用卡/信用貸款/現金卡) 總餘額不得超過個人平均月收入的 22 倍",
 *    example 月薪 4 萬 -> 22 倍 88 萬, 卡債加信貸約 50 萬 -> 剩餘 38 萬; and "銀行仍會算借款人的收支比率, 原則上所有銀行
 *    總負債之月付金不得大於月收入的一定比例" -- no ratio is published, so none is built in.
 *    金管會金融智慧網 順利辦理貸款應注意事項  https://moneywise.fsc.gov.tw/tabf/FW/FW2_page_C.html
 *  - 房貸支出 (含還本及還息) 不得超過個人或家庭收入的 1/3; 1/3 以上為紅燈 ("超過 1/3"), 1/3 到 1/5 為黃燈, 小於 1/5 為綠燈;
 *    有寬限期的房貸以進入還本時期的月付計. Same 金融健檢 page. Exactly 22 times, exactly 1 time, exactly 1/3 and exactly 1/5
 *    are therefore yellow (the page says 超過 / 小於, not 以上 / 以下).
 *
 * NOT official, and shown as such: the "含其他債務月付占收入" ratio. It is the quantity banks call 收支比 in spirit, but no
 * unified definition or ceiling is published (金管會 says only "一定比例"), so it has no light. A bank's own ceiling can be
 * typed in by the reader (optional) to see the gap; the page never supplies one.
 */

import { burdenLight, safeNumber } from './twMortgageMath.mjs';

export const DBR_LIMIT_MULTIPLE = 22; // 金管會金融智慧網
export const DBR_GREEN_BELOW = 1; // 金融健檢: DBR 小於 1 為綠燈

const EPS = 1e-9;

/** 金融健檢 DBR lights: 超過 22 紅; 1 到 22 黃 (22 and 1 included); 小於 1 綠. */
export function dbrLight(dbr) {
  return dbr > DBR_LIMIT_MULTIPLE + EPS ? 'red' : dbr >= DBR_GREEN_BELOW - EPS ? 'yellow' : 'green';
}

function need(name, value, { positive = false } = {}) {
  const n = safeNumber(value, NaN);
  if (!Number.isFinite(n) || n < 0 || (positive && n <= 0)) {
    throw new RangeError(`${name} must be ${positive ? 'greater than 0' : 'a number of 0 or more'}.`);
  }
  return n;
}

/**
 * monthlyIncome            平均月收入 (稅前, 元)
 * cardBalance              信用卡未還餘額
 * cashCardBalance          現金卡動用餘額
 * creditLoanBalance        信用貸款餘額
 * mortgagePayment          房貸月付 (本+利; 有寬限期者填進入還本後的月付)
 * otherMonthlyPayments     其他債務月付 (信貸、車貸、卡分期…), optional
 * bankLimitPercent         承貸銀行告訴你的月付占收入上限 (%), optional -- never supplied by the page
 */
/**
 * @param {{ monthlyIncome: number | string, cardBalance?: number | string, cashCardBalance?: number | string,
 *   creditLoanBalance?: number | string, mortgagePayment?: number | string, otherMonthlyPayments?: number | string,
 *   bankLimitPercent?: number | string | null }} input
 */
export function calculateTwDebtRatios({
  monthlyIncome,
  cardBalance = 0,
  cashCardBalance = 0,
  creditLoanBalance = 0,
  mortgagePayment = 0,
  otherMonthlyPayments = 0,
  bankLimitPercent = undefined,
}) {
  const income = need('monthlyIncome', monthlyIncome, { positive: true });
  const card = need('cardBalance', cardBalance);
  const cashCard = need('cashCardBalance', cashCardBalance);
  const creditLoan = need('creditLoanBalance', creditLoanBalance);
  const mortgage = need('mortgagePayment', mortgagePayment);
  const other = need('otherMonthlyPayments', otherMonthlyPayments);

  const unsecuredTotal = card + cashCard + creditLoan;
  const dbr = unsecuredTotal / income;
  const dbrCeiling = DBR_LIMIT_MULTIPLE * income;
  const dbrRoom = dbrCeiling - unsecuredTotal; // negative = over the 22x line

  const burden = burdenLight(mortgage, income);
  const mortgageRatio = burden.ratio;
  const toThird = income / 3 - mortgage; // monthly room left under the 1/3 line (negative = over)
  const toFifth = income / 5 - mortgage; // monthly room left under the 1/5 line

  const totalPayments = mortgage + other;
  const totalPaymentRatio = totalPayments / income;
  let bankGapPoints = null;
  if (bankLimitPercent != null && safeNumber(bankLimitPercent, NaN) > 0) {
    bankGapPoints = safeNumber(bankLimitPercent) - totalPaymentRatio * 100;
  }

  return {
    unsecuredTotal,
    dbr,
    dbrLight: dbrLight(dbr),
    dbrCeiling,
    dbrRoom,
    mortgageRatio,
    mortgageLight: burden.light,
    toThird,
    toFifth,
    totalPayments,
    totalPaymentRatio,
    bankGapPoints,
  };
}
