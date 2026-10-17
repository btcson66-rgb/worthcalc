/*
 * Watts from 經濟部能源署 energy-efficiency label data (P2 batch 6, 2026-10-17).
 *
 * The 能源署 open-data files (https://ea03.moeaea.gov.tw/e0410/03/gen/opendata/list.aspx, 能源效率分級標示登錄資訊) and the
 * 節能標章 files (https://ea03.moeaea.gov.tw/e0410/01/other/opendata/list.aspx) publish a model's rating, not "typical watts".
 * Where the published columns pin a power draw down, these functions turn them into watts; where they do not (televisions,
 * computers, fans, microwave cooking power, ...), no number is made up and the appliance stays a labelled 示範值.
 *
 *   電冰箱      有效內容積 (L) / 能源因數 EF (L per 度/月)         = 度/月 -> / (30 x 24 h) = 平均瓦數 (標準測試條件, 30 天 720 小時)
 *   除濕機      額定除濕能力 (L/日) / 能源因數 EF (L/kWh) / 24 h   = 以額定能力運轉時的瓦數
 *   冷氣        額定冷氣能力消耗電功率標示值 (kW) x 1000, 機組構成方式「單體式」(窗型／移動式)
 *   顯示器      節能標章 「開機模式平均消耗功率(W)」
 * Statistics: linear-interpolation quantiles (type 7). The published lists contain data-entry errors (one air conditioner is
 * listed at 2,115 kW), so the page uses the median with the 25th-75th percentile as the range, never min/max.
 */
export const HOURS_PER_MONTH = 30 * 24;

export function fridgeKwhPerMonth(volumeLitres, energyFactor) {
  const v = Number(volumeLitres);
  const ef = Number(energyFactor);
  return Number.isFinite(v) && Number.isFinite(ef) && v > 0 && ef > 0 ? v / ef : null;
}

export function fridgeAverageWatts(volumeLitres, energyFactor) {
  const kwh = fridgeKwhPerMonth(volumeLitres, energyFactor);
  return kwh === null ? null : (kwh * 1000) / HOURS_PER_MONTH;
}

export function dehumidifierRunningWatts(ratedLitresPerDay, energyFactor) {
  const cap = Number(ratedLitresPerDay);
  const ef = Number(energyFactor);
  return Number.isFinite(cap) && Number.isFinite(ef) && cap > 0 && ef > 0 ? (cap / ef / 24) * 1000 : null;
}

export function acRatedWatts(ratedPowerKw) {
  const kw = Number(ratedPowerKw);
  return Number.isFinite(kw) && kw > 0 ? kw * 1000 : null;
}

export function monitorOnModeWatts(resultText) {
  const m = /開機模式平均消耗功率\(W\)\s*=\s*([0-9]+(?:\.[0-9]+)?)/.exec(String(resultText));
  return m ? Number(m[1]) : null;
}

/** Linear-interpolation quantile (R type 7) of an array of finite numbers; p in [0, 1]. */
export function quantile(values, p) {
  const xs = values.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  if (xs.length === 0) return null;
  const k = (xs.length - 1) * Math.min(1, Math.max(0, p));
  const lo = Math.floor(k);
  const hi = Math.min(lo + 1, xs.length - 1);
  return xs[lo] + (xs[hi] - xs[lo]) * (k - lo);
}

export function summarize(values) {
  const xs = values.filter((x) => Number.isFinite(x));
  return { n: xs.length, p25: quantile(xs, 0.25), median: quantile(xs, 0.5), p75: quantile(xs, 0.75) };
}

/** Minimal CSV reader for the 能源署 files (UTF-8 with BOM, quoted fields allowed). */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  const src = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i += 1;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}
