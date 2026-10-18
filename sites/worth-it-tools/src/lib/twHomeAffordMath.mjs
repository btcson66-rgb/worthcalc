/*
 * 買房負擔能力 (P2 batch 10, 2026-10-18), zh only.
 *
 * Replaces the US model that /zh/tools/home-affordability/ used to run (PMI, a "住房＋其他債務" DTI ceiling, a fixed
 * down payment). Pure functions shared by the page script, the page's worked examples and
 * tests/tw-home-afford-math.test.mjs, which asserts every number the page prints. The interest rate and the loan
 * ratio the reader wants are always inputs; no bank's rate or approval ratio is built in.
 *
 * What is official, and where it was read on 2026-10-18 (Taiwan date):
 *
 *  - 中央銀行對金融機構辦理不動產抵押貸款業務規定 (修正規定, 115-09-17 發布, 115-09-18 生效), full text read from the
 *    PDF linked on https://www.cbc.gov.tw/tw/cp-4217-192880-d9bde-1.html :
 *      第 3 點 公司法人購置住宅貸款: (一) 不得有寬限期; (二) 額度最高不得超過住宅(含基地)鑑價或買賣金額較低者之三成;
 *              (三) 不得另以修繕、周轉金或其他名目額外增加貸款.
 *      第 4 點 (一) 自然人購置高價住宅貸款: 適用第 3 點各款. 高價住宅 (第 2 點 (四)): 建物權狀含「住」字樣, 鑑價或買賣
 *              金額 臺北市 7,000 萬以上, 新北市 6,000 萬以上, 其他地區 4,000 萬以上.
 *      第 4 點 (二) 購屋貸款 (非高價住宅), 先向聯徵中心查名下「房貸」戶數並確認名下有無房屋:
 *              1. 無房貸但已有房屋者: 適用第 3 點第一款 (不得有寬限期); 規定沒有訂成數上限.
 *              2. 已有一戶房貸者: 適用第 3 點第一款及第三款, 並且額度最高不得超過鑑價或買賣金額較低者之七成.
 *              3. 已有二戶以上房貸者: 適用第 3 點各款 (三成, 不得有寬限期).
 *    規定沒有限制「名下無房貸、也無房屋」者的成數與寬限期 (第 4 點 (二) 的三種情形都不含這一種); 銀行仍依自己的授信
 *    規範核貸, 且其內部規範較嚴者從其規範 (第 10 點).
 *    The press release of 115-09-17 (https://www.cbc.gov.tw/tw/cp-357-192864-4319f-1.html) lists the same table:
 *    第 2 戶 6 成 -> 7 成, effective 2026-09-18, 無寬限期.
 *  - 央行 問與答 (115-09-18 增修版, https://www.cbc.gov.tw/dl-227702-d82559a407814bb8b6797e6d81215f4e.html): 「房貸」戶數以聯徵
 *    歸戶、1 筆擔保品算 1 戶; 繼承取得的房屋或房貸不計; 已取得清償證明者可排除 (Q11-Q16); 名下有房屋、擬換屋自住者
 *    切結 18 個月內出售原屋可不受不得有寬限期限制 (Q17); 第 2 戶換屋自住切結後可不受成數上限與寬限期限制 (Q18); 青年安心
 *    成家購屋優惠貸款不受第 1 戶、第 2 戶限制 (Q4). Q9: 「不得有寬限期」包括前期少還、後期還大額的作法.
 *    The calculator does NOT apply any of those exceptions; the page lists them for the reader to ask the bank.
 *  - 金管會金融智慧網 金融健檢 (https://moneywise.fsc.gov.tw/tabf/main/tool1.html): 購屋前準備 3 成以上自備款; 每月房貸
 *    支出 (含還本及還息) 不得超過個人或家庭收入的 1/3; 超過 1/3 紅燈, 1/3 到 1/5 黃燈, 小於 1/5 綠燈; 有寬限期的房貸以
 *    進入同時還本及還息時期的月付計.
 *  - 房貸月付: 本息平均攤還 (臺灣土地銀行 貸款還款方式說明, https://www.landbank.com.tw/Calculate/Repayment): 平均攤還率
 *    = {(1+i)^n x i} / {(1+i)^n - 1}, i = 年利率 / 12; 附寬限期者寬限期內只繳利息 (金管會金融智慧網 房貸試算軟體,
 *    https://moneywise.fsc.gov.tw/tabf/main/tool4.html). Implemented by annuityPayment() in twMortgageMath.mjs.
 *
 * NOT official, and stated on the page as simplifications: the rate stays the same for the whole term (Taiwanese
 * mortgages are mostly floating); payments are not rounded month by month; the loan is a percentage of the price typed
 * in (the rule's base is the LOWER of 鑑價 and 買賣金額, so a low appraisal means a smaller loan than shown); the
 * price is solved from the monthly-payment line alone (plus cash on hand, if typed in) -- taxes, fees and other debts
 * are not part of the 1/3 line, which the 金融健檢 defines on the mortgage payment only.
 */

import { annuityPayment, burdenLight, monthlyRate, safeNumber } from './twMortgageMath.mjs';

export const CBC_RULE_EFFECTIVE = '2026-09-18';

/** The solved price is shown rounded down to a whole 萬. */
export const PRICE_STEP = 10000;

/**
 * Identity -> what the 央行 rule says. cap is a ratio (0.7 = 7 成) or null when the rule sets none;
 * graceBanned is true when the rule says 不得有寬限期.
 */
export const HOME_IDENTITIES = Object.freeze({
  noLoanNoHouse: { label: '自然人：名下無房貸、也無房屋', cap: null, graceBanned: false },
  noLoanHasHouse: { label: '自然人：名下無房貸，但已有房屋（央行稱第 1 戶）', cap: null, graceBanned: true },
  oneLoan: { label: '自然人：名下已有 1 戶房貸（央行稱第 2 戶）', cap: 0.7, graceBanned: true },
  twoPlusLoans: { label: '自然人：名下已有 2 戶以上房貸（第 3 戶以上）', cap: 0.3, graceBanned: true },
  highPrice: { label: '自然人購置高價住宅', cap: 0.3, graceBanned: true },
  corporate: { label: '公司法人購置住宅', cap: 0.3, graceBanned: true },
});

/** 高價住宅門檻 by 房屋所在地 (第 2 點 (四)): 鑑價或買賣金額在此以上. */
export const HIGH_PRICE_THRESHOLD = Object.freeze({
  taipei: { label: '臺北市', amount: 70000000 },
  newTaipei: { label: '新北市', amount: 60000000 },
  other: { label: '臺北市、新北市以外', amount: 40000000 },
});

export const TARGET_RATIOS = Object.freeze({
  third: { label: '1/3（金融健檢紅燈線）', value: 1 / 3 },
  fifth: { label: '1/5（金融健檢綠燈線，較保守）', value: 1 / 5 },
});

function bad(message) {
  throw new RangeError(message);
}

function num(name, value, { positive = false, max = Infinity } = {}) {
  const n = safeNumber(value, NaN);
  if (!Number.isFinite(n) || n < 0 || (positive && n <= 0) || n > max) {
    bad(`${name} is out of range.`);
  }
  return n;
}

/** 本息平均攤還: monthly payment per 1 yuan of loan, over `months` months at annual rate `aprPct` (%). */
export function paymentPerYuan(aprPct, months) {
  return annuityPayment(1, monthlyRate(aprPct), months);
}

/**
 * Solve the highest price whose 房貸月付 stays on or under income x target, with the loan = price x ratio.
 *
 *   monthlyIncome   稅前月收入 (個人或家庭)
 *   identity        key of HOME_IDENTITIES
 *   region          key of HIGH_PRICE_THRESHOLD (only used for the high-price check)
 *   ltvPct          loan ratio in percent that the reader wants; blank/0 = the 央行 cap (error when the rule sets none)
 *   aprPct, years   the reader's rate and term
 *   graceYears      interest-only years inside the term (ignored, and reported, where the rule bans a grace period)
 *   target          'third' | 'fifth'
 *   cash            optional 可動用自備款; the price can not exceed cash / (1 - ratio)
 *   otherDebtPayments, holdingCosts   optional monthly amounts, shown but NOT part of the 1/3 line
 */
export function solveTwHomeAffordability({
  monthlyIncome,
  identity,
  region = 'other',
  ltvPct = 0,
  aprPct,
  years,
  graceYears = 0,
  target = 'third',
  cash = 0,
  otherDebtPayments = 0,
  holdingCosts = 0,
}) {
  const income = num('monthlyIncome', monthlyIncome, { positive: true });
  const rule = HOME_IDENTITIES[identity];
  if (!rule) bad('identity is not one of the supported kinds.');
  const threshold = HIGH_PRICE_THRESHOLD[region];
  if (!threshold) bad('region is not one of the supported kinds.');
  const targetRatio = TARGET_RATIOS[target];
  if (!targetRatio) bad('target must be third or fifth.');
  const rate = num('aprPct', aprPct, { max: 100 });
  const termYears = num('years', years, { positive: true, max: 50 });
  const termMonths = Math.round(termYears * 12);
  if (termMonths < 1) bad('years is too short.');
  const cashOnHand = num('cash', cash);
  const otherDebt = num('otherDebtPayments', otherDebtPayments);
  const holding = num('holdingCosts', holdingCosts);

  // loan ratio: the reader's wish, never above the 央行 cap
  const wish = num('ltvPct', ltvPct, { max: 100 });
  const capPct = rule.cap === null ? null : Math.round(rule.cap * 1000) / 10;
  let ltv;
  let ltvClamped = false;
  if (wish > 0) {
    ltv = capPct !== null && wish > capPct ? capPct : wish;
    ltvClamped = capPct !== null && wish > capPct;
  } else if (capPct !== null) {
    ltv = capPct;
  } else {
    bad('ltvPct is required for this identity: the rule sets no ceiling.');
  }
  const ratio = ltv / 100;
  if (ratio > 1) bad('ltvPct must not exceed 100.');

  // grace period: only where the rule does not ban it, and always shorter than the term
  const requestedGrace = num('graceYears', graceYears, { max: 50 });
  const graceIgnored = rule.graceBanned && requestedGrace > 0;
  let graceMonths = rule.graceBanned ? 0 : Math.round(requestedGrace * 12);
  if (graceMonths >= termMonths) bad('graceYears must be shorter than years.');
  if (graceMonths < 0) graceMonths = 0;

  // the line is read on the payment AFTER the grace period (金融健檢)
  const factorAfterGrace = paymentPerYuan(rate, termMonths - graceMonths);
  const factorNoGrace = paymentPerYuan(rate, termMonths);
  const paymentCeiling = income * targetRatio.value;

  const priceByPayment = paymentCeiling / (ratio * factorAfterGrace);
  const priceByCash = cashOnHand > 0 && ratio < 1 ? cashOnHand / (1 - ratio) : Infinity;
  const binding = priceByCash < priceByPayment ? 'cash' : 'payment';
  // the price is rounded DOWN to a whole 萬 (a stated simplification: it keeps the payment under the line and avoids a
  // false precision), and the loan down to a whole yuan, so the payment can never end up above the line.
  const maxPrice = Math.floor(Math.min(priceByPayment, priceByCash) / PRICE_STEP) * PRICE_STEP;

  const loan = Math.floor(maxPrice * ratio + 1e-6);
  const downPayment = maxPrice - loan; // 頭期款 = 總價 - 總價 x 成數 (the loan rounded down, so this is rounded up)
  const monthlyAfterGrace = loan * factorAfterGrace;
  const monthlyNoGrace = loan * factorNoGrace;
  const monthlyDuringGrace = graceMonths > 0 ? loan * monthlyRate(rate) : null;
  const burden = burdenLight(monthlyAfterGrace, income);

  // 高價住宅 check: the rule switches on the price, so a result on the wrong side of the line does not apply
  let thresholdCheck = 'ok';
  if (identity === 'highPrice' && maxPrice < threshold.amount) thresholdCheck = 'below';
  if (identity !== 'highPrice' && identity !== 'corporate' && maxPrice >= threshold.amount) thresholdCheck = 'above';

  return {
    identity,
    capPct,
    ltvPct: ltv,
    ltvClamped,
    graceBanned: rule.graceBanned,
    graceIgnored,
    graceMonths,
    paymentCeiling,
    maxPrice,
    binding,
    priceByPayment,
    priceByCash,
    loan,
    downPayment,
    downPaymentPct: maxPrice > 0 ? (downPayment / maxPrice) * 100 : 0,
    monthlyAfterGrace,
    monthlyNoGrace,
    monthlyDuringGrace,
    // differences of the payments as they are shown (whole yuan), so the page's subtraction always checks out
    graceSavingDuring: monthlyDuringGrace === null ? null : Math.round(monthlyNoGrace) - Math.round(monthlyDuringGrace),
    graceExtraAfter: graceMonths > 0 ? Math.round(monthlyAfterGrace) - Math.round(monthlyNoGrace) : null,
    ratio: burden.ratio,
    light: burden.light,
    thresholdCheck,
    thresholdAmount: threshold.amount,
    thresholdLabel: threshold.label,
    withOtherDebtRatio: (monthlyAfterGrace + otherDebt) / income,
    monthlyCashflow: monthlyAfterGrace + holding,
  };
}
