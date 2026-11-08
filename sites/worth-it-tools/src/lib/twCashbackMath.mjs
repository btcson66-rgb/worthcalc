/*
 * 信用卡年費回本 / 回饋打平 arithmetic (extracted 2026-11-08 from the inline script of
 * src/pages/zh/tools/cashback-breakeven.astro so the page script, the page's worked tables and
 * tests/tw-cashback-math.test.mjs run the same function).
 *
 *   gross       = sum(category monthly spend x 12 x category rate)
 *   baseline    = total monthly spend x 12 x 1%                (免年費 1% 基準卡)
 *   net         = gross + 首刷禮 - 年費
 *   incremental = net - baseline                               (> 0: 比 1% 基準卡多賺)
 *   needed      = (年費 - 首刷禮) / ((加權回饋率 - 1%) x 12)   (打平月消費; 首刷禮 >= 年費 -> 0; 加權回饋率 <= 1% -> Infinity)
 *
 * Rates are fractions here (0.03 = 3%). Nothing is built in: the reader supplies every rate and fee.
 */

const nonNeg = (value) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/**
 * @param {{ fee: number, bonus: number, spends: number[], rates: number[] }} input rates as fractions
 */
export function evaluateCashback({ fee, bonus, spends, rates }) {
  const f = nonNeg(fee);
  const b = nonNeg(bonus);
  const s = spends.map(nonNeg);
  const r = rates.map(nonNeg);
  const monthlySpend = s.reduce((sum, spend) => sum + spend, 0);
  const gross = s.reduce((sum, spend, index) => sum + spend * 12 * r[index], 0);
  const baseline = monthlySpend * 12 * 0.01;
  const net = gross + b - f;
  const incremental = net - baseline;
  const weightedRate = monthlySpend > 0 ? gross / (monthlySpend * 12) : r.reduce((sum, rate) => sum + rate, 0) / r.length;
  const rateEdge = weightedRate - 0.01;
  const needed = b >= f ? 0 : rateEdge > 0 ? (f - b) / rateEdge / 12 : Number.POSITIVE_INFINITY;
  return { monthlySpend, gross, baseline, net, incremental, weightedRate, rateEdge, needed };
}
