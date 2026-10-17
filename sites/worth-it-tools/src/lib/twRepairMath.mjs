/*
 * Repair / replace, phone keep / upgrade and extended-warranty arithmetic (P2 batch 5, 2026-10-17).
 *
 * The three calculators used to carry these formulas inline in their page scripts. They now import this module, so
 * the page scripts, the worked examples printed on the pages and tests/tw-repair-math.test.mjs all run one set of
 * functions. Nothing here supplies a failure rate, a trade-in value or a price: every input is the reader's.
 *
 * What is official on these pages (all opened 2026-10-17):
 *  - 經濟部 88 年 3 月 3 日經商字第 88002193 號函公告「電器買賣定型化契約應記載及不得記載事項」(應記載事項第五點):
 *    "因非可歸責於買受人之事由，致商品於保固期間內毀損者，出賣人負維修責任；如經送修三次仍未能修復者，買受人得請求
 *    出賣人返還其所支付之價金，或更換同一種類之商品，出賣人不得拒絕。"  Executive Yuan listing (date 88-03-03):
 *    https://www.ey.gov.tw/Page/DFB720D019CCCB0A/f6ba3f43-981d-4533-a555-79910d9eaeb3 ; text: https://www.ey.gov.tw/File/622D89D9A3A1ADED
 *  - 消費者保護法第 25 條 (書面保證書應載明事項) and 施行細則第 26 條 (未出具保證書仍就其保證之品質負責); 民法第 354、356、359、365 條
 *    (瑕疵擔保: 物之瑕疵須在危險移轉於買受人時存在; 通知後六個月或交付後五年, 請求權消滅). https://law.moj.gov.tw
 *  - 行政院消保處「手機送修，消費者應注意事項?」: 備份並記錄 IMEI 與產品序號、拔 SIM 卡及刪除涉及隱私的資料、確認保固範圍與
 *    檢測處理費、收費故障品須先報價並取得同意. https://cpc.ey.gov.tw/Page/8644AFB8F5DCB8A3/286ce994-7f56-4290-8482-4c819dc863f0
 */

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
const nonNeg = (value) => Math.max(0, safeNumber(value));
const pct = (value) => Math.min(100, nonNeg(value)) / 100;

/**
 * 維修 vs 換新, expressed per reliable month.
 *   repairQuote            written quote still to be paid
 *   repairMonths           reliable months the repair is expected to add
 *   recurrenceProbability  % chance of a repeat failure (reader's scenario)
 *   recurrenceCost         what the repeat failure would cost
 *   extraEnergyMonthly     extra energy the old item uses per month versus the replacement
 *   replacementPrice / replacementFees / currentValue   net replacement = price + fees - what the old item fetches
 *   replacementMonths      useful months of the replacement
 */
export function evaluateRepairReplace({ repairQuote, repairMonths, recurrenceProbability, recurrenceCost, extraEnergyMonthly, replacementPrice, replacementFees, currentValue, replacementMonths }) {
  const rMonths = Math.max(1, nonNeg(repairMonths));
  const nMonths = Math.max(1, nonNeg(replacementMonths));
  const recurrenceExpected = pct(recurrenceProbability) * nonNeg(recurrenceCost);
  const energyPenalty = nonNeg(extraEnergyMonthly) * rMonths;
  const repairExpected = nonNeg(repairQuote) + recurrenceExpected + energyPenalty;
  const replacementNet = Math.max(0, nonNeg(replacementPrice) + nonNeg(replacementFees) - nonNeg(currentValue));
  const repairMonthly = repairExpected / rMonths;
  const replacementMonthly = replacementNet / nMonths;
  const repairRatio = replacementNet ? (nonNeg(repairQuote) / replacementNet) * 100 : 0;
  const breakEvenQuote = Math.max(0, rMonths * replacementMonthly - recurrenceExpected - energyPenalty);
  return {
    recurrenceExpected,
    energyPenalty,
    repairExpected,
    replacementNet,
    repairMonthly,
    replacementMonthly,
    repairRatio,
    breakEvenQuote,
    repairWins: repairMonthly <= replacementMonthly,
    difference: Math.abs(repairMonthly - replacementMonthly),
  };
}

/**
 * 手機續用 vs 換機, normalised to cost per month.
 * Keep: (repair - resale of the old phone later) / remaining months + current plan.
 * Upgrade: (price + fees + transfer - trade-in now - resale of the new phone later) / holding months + new plan.
 */
export function evaluatePhoneKeepUpgrade({ repairCost, remainingMonths, currentResaleLater, tradeInNow, newPhonePrice, upgradeFees, transferCost, currentPlanMonthly, newPlanMonthly, newHoldingMonths, newResaleLater }) {
  const remaining = Math.max(1, nonNeg(remainingMonths));
  const holding = Math.max(1, nonNeg(newHoldingMonths));
  const keepDeviceMonthly = (nonNeg(repairCost) - nonNeg(currentResaleLater)) / remaining;
  const upgradeGross = nonNeg(newPhonePrice) + nonNeg(upgradeFees) + nonNeg(transferCost);
  const upgradeDeviceMonthly = (upgradeGross - nonNeg(tradeInNow) - nonNeg(newResaleLater)) / holding;
  const keepFullMonthly = keepDeviceMonthly + nonNeg(currentPlanMonthly);
  const upgradeFullMonthly = upgradeDeviceMonthly + nonNeg(newPlanMonthly);
  const breakEvenTradeIn = Math.max(0, upgradeGross - nonNeg(newResaleLater) - holding * (keepFullMonthly - nonNeg(newPlanMonthly)));
  return {
    keepDeviceMonthly,
    upgradeDeviceMonthly,
    keepFullMonthly,
    upgradeFullMonthly,
    breakEvenTradeIn,
    keepWins: keepFullMonthly <= upgradeFullMonthly,
    difference: Math.abs(keepFullMonthly - upgradeFullMonthly),
  };
}

/**
 * 延長保固 expected cost for one representative failure.
 *   payout on an approved claim = min(cap, max(0, repair - deductible))
 *   self-funded expected = failure x repair
 *   plan expected = price + failure x [approval x (max(0, repair - payout) + claimCost) + (1 - approval) x repair]
 *   break-even failure probability = price / (approval x max(0, payout - claimCost))
 */
export function evaluateExtendedWarranty({ planPrice, failureProbability, approvalProbability, repairCost, deductible, claimCost, payoutCap }) {
  const failure = pct(failureProbability);
  const approval = pct(approvalProbability);
  const repair = nonNeg(repairCost);
  const payout = Math.min(nonNeg(payoutCap), Math.max(0, repair - nonNeg(deductible)));
  const approvedConsumerCost = Math.max(0, repair - payout) + nonNeg(claimCost);
  const selfFundExpected = failure * repair;
  const planExpected = nonNeg(planPrice) + failure * (approval * approvedConsumerCost + (1 - approval) * repair);
  const expectedPayout = failure * approval * payout;
  const netValue = selfFundExpected - planExpected;
  const savingsPerFailure = approval * Math.max(0, payout - nonNeg(claimCost));
  const breakEvenProbability = savingsPerFailure ? (nonNeg(planPrice) / savingsPerFailure) * 100 : Infinity;
  return { payout, selfFundExpected, planExpected, expectedPayout, netValue, breakEvenProbability, planWins: netValue >= 0 };
}
