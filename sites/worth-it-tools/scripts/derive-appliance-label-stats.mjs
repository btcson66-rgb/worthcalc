// Regenerates src/data/applianceLabelStats.json from the 能源署 open-data CSV files (P2 batch 6, 2026-10-17).
//
//   node scripts/derive-appliance-label-stats.mjs <dir-with-the-csv-files> [YYYY-MM-DD]
//
// The directory must hold the files below under their published names (download them from the two list pages named in
// src/lib/applianceLabelMath.mjs). The raw CSVs are not committed (the air-conditioner file alone is >1 MB); only the derived
// statistics are, together with the dataset names, so the page numbers can be re-derived and compared by anyone.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acRatedWatts, dehumidifierRunningWatts, fridgeAverageWatts, monitorOnModeWatts, parseCsv, summarize } from '../src/lib/applianceLabelMath.mjs';

const dir = process.argv[2];
const readOn = process.argv[3] ?? '2026-10-17';
if (!dir) { console.error('usage: node scripts/derive-appliance-label-stats.mjs <csv-dir> [date]'); process.exit(1); }

const rows = (name) => parseCsv(readFileSync(join(dir, name), 'utf8'));
const col = (header, wanted) => {
  const i = header.findIndex((h) => h.includes(wanted));
  if (i < 0) throw new Error(`column "${wanted}" missing in ${header.join('|')}`);
  return i;
};
const round = (n) => Math.round(n * 100) / 100;
const finish = (s) => ({ n: s.n, p25: round(s.p25), median: round(s.median), p75: round(s.p75) });

const datasets = {};

{
  const name = '電冰箱107年新分級基準能源效率分級標示登錄資訊.csv';
  const [h, ...r] = rows(name);
  const vi = col(h, '有效內容積'); const ei = col(h, '能源因數值');
  datasets.refrigerator = {
    set: '電冰箱107年新分級基準能源效率分級標示登錄資訊', file: name, listed: r.length, kind: '能源效率分級標示（強制）',
    formula: '有效內容積(公升) ÷ 能源因數 EF(公升/(度/月)) = 度/月；× 1000 ÷ 720 小時 = 平均瓦數',
    watts: finish(summarize(r.map((x) => fridgeAverageWatts(x[vi], x[ei])))),
  };
}
{
  const name = '除濕機115能源效率分級標示登錄資訊.csv';
  const [h, ...r] = rows(name);
  const ci = col(h, '額定除濕能力'); const ei = col(h, '能源因數值');
  datasets.dehumidifier = {
    set: '除濕機115年新分級基準能源效率分級標示登錄資訊', file: name, listed: r.length, kind: '能源效率分級標示（強制）',
    formula: '額定除濕能力(公升/日) ÷ 能源因數 EF(公升/千瓦小時) ÷ 24 小時 × 1000 = 以額定能力運轉的瓦數',
    watts: finish(summarize(r.map((x) => dehumidifierRunningWatts(x[ci], x[ei])))),
  };
}
{
  const name = '無風管空氣調節機114能源效率分級標示登錄資訊.csv';
  const [h, ...r] = rows(name);
  const pi = col(h, '額定冷氣能力消耗電功率'); const ki = col(h, '機組構成方式');
  const single = r.filter((x) => x[ki] === '單體式');
  datasets.windowAirConditioner = {
    set: '無風管空氣調節機114能源效率分級標示登錄資訊（機組構成方式＝單體式）', file: name, listed: single.length, kind: '能源效率分級標示（強制）',
    formula: '額定冷氣能力消耗電功率標示值(kW) × 1000 = 瓦數（額定冷氣能力下的消耗電功率，不是整日平均）',
    watts: finish(summarize(single.map((x) => acRatedWatts(x[pi])))),
  };
}
{
  const name = '經濟部能源署_顯示器節能標章有效獲證資訊.csv';
  const [h, ...r] = rows(name);
  const ri = col(h, '測試報告能源效率');
  datasets.monitor = {
    set: '顯示器節能標章有效獲證資訊', file: name, listed: r.length, kind: '節能標章（自願）',
    formula: '「開機模式平均消耗功率(W)」的測試報告值',
    watts: finish(summarize(r.map((x) => monitorOnModeWatts(x[ri])))),
  };
}

const out = {
  readOn,
  sources: {
    classified: 'https://ea03.moeaea.gov.tw/e0410/03/gen/opendata/list.aspx',
    energyLabel: 'https://ea03.moeaea.gov.tw/e0410/01/other/opendata/list.aspx',
  },
  statistic: '中位數與第 25～75 百分位（線性內插），不用最小／最大值：公開清單含登錄錯誤（例如一台冷氣被列為 2,115 kW）。',
  datasets,
};
const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'applianceLabelStats.json');
writeFileSync(target, JSON.stringify(out, null, 2) + '\n');
console.log(JSON.stringify(out.datasets, null, 1));
