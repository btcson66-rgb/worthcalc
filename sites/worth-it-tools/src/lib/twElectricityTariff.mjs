/*
 * Taipower residential tiered tariff arithmetic (P2 batch 5, 2026-10-17).
 *
 * Pure functions shared by the appliance calculator script, the page's worked examples (rendered at build
 * time from these same functions) and tests/tw-electricity-tariff.test.mjs.
 *
 * WHICH TABLE THIS IS
 *   台灣電力公司「調整後各類用戶電價表」, 中華民國 114 年 10 月 1 日起實施 (= 2025-10-01), 住宅用非時間電價 (表燈).
 *   Unit: 元/度, per month. 夏月 = 6 月 1 日至 9 月 30 日, 非夏月 = 夏月以外時間.
 *   Source file: https://www.taipower.com.tw/media/05klpxyd/1140930_114%E5%B9%B410%E6%9C%88%E9%9B%BB%E5%83%B9%E5%85%AC%E5%91%8A.pdf?mediaDL=true
 *   The row texts below were read from that PDF on 2026-09-23 (see docs/seo/t3-evidence/batch1.md, which quotes each
 *   row: "120 度以下部分 每 度 1.78 1.78", "121~330 度部分 每 度 2.55 2.26", "331~500 度部分 每 度 3.80 3.13",
 *   "501~700 度部分 每 度 5.14 4.24", "701~1000 度部分 每 度 6.44 5.27", "1001 度以上部分 每 度 8.86 7.03",
 *   and the note "用戶因 2 個月抄表、收費一次，計費時各段度數係加倍計算").
 *
 * WHAT WAS CHECKED ON 2026-10-17 (the Taipower site returned 403 to the checking environment that day, so the
 * table itself could not be re-opened; the regulator's disclosure site could):
 *   - 經濟部能源署「電價及費率審議資訊揭露專區」電價表頁: the newest table listed is 台灣電力公司114年下半年電價表,
 *     published 2025-10-03, and it links to the Taipower page that hosts the table.
 *   - 115 年第 1 次審議會 (2026-03-27): 電價不調整; 115 年第 2 次審議會 (2026-09-18): 本次電價調整暫不決定,
 *     留待今年 12 月併入第 3 次電價審議會審議輸配電費率時再行討論. So no newer table exists, but December can change this.
 *   - 2025-09-19 press release: 住宅 700 度以下每度調漲 0.1 元、701 至 1,000 度 0.2 元、1,001 度以上 0.4 元.
 *
 * The calculator lets the reader edit every cell, so a new Taipower table can be typed in without a code change.
 * Not modelled: anything on the bill other than the per-kWh charge, 時間電價, 營業用, 2 個月帳單跨夏月邊界的分攤.
 */

export const TARIFF_VERSION = Object.freeze({
  id: 'taipower-residential-non-time-2025-10-01',
  label: '台電住宅用非時間電價（表燈）',
  effectiveFrom: '2025-10-01',
  effectiveFromRoc: '114 年 10 月 1 日',
  tableTitle: '調整後各類用戶電價表',
  summerRange: '6 月 1 日至 9 月 30 日',
  pdfCheckedOn: '2026-09-23',
  regulatorCheckedOn: '2026-10-17',
});

/** @typedef {{ upTo: number, label: string, summer: number, nonSummer: number }} Tier */

/**
 * Tiers are the part of the MONTH's kWh that falls inside (previous upTo, upTo]. Rates in 元/度.
 * @type {ReadonlyArray<Tier>}
 */
export const DEFAULT_TIERS = Object.freeze([
  Object.freeze({ upTo: 120, label: '120 度以下部分', summer: 1.78, nonSummer: 1.78 }),
  Object.freeze({ upTo: 330, label: '121–330 度部分', summer: 2.55, nonSummer: 2.26 }),
  Object.freeze({ upTo: 500, label: '331–500 度部分', summer: 3.8, nonSummer: 3.13 }),
  Object.freeze({ upTo: 700, label: '501–700 度部分', summer: 5.14, nonSummer: 4.24 }),
  Object.freeze({ upTo: 1000, label: '701–1000 度部分', summer: 6.44, nonSummer: 5.27 }),
  Object.freeze({ upTo: Infinity, label: '1001 度以上部分', summer: 8.86, nonSummer: 7.03 }),
]);

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export const MAX_KWH = 1e7;

/** 夏月 = June 1 – September 30. `month` is 1..12. */
export function seasonOfMonth(month) {
  const m = Math.round(safeNumber(month, 1));
  return m >= 6 && m <= 9 ? 'summer' : 'nonSummer';
}

/** Keeps a reader-edited table usable: finite non-negative rates, strictly increasing upTo, last tier open-ended. */
/** @param {ReadonlyArray<Partial<Tier>> | undefined} [tiers] @returns {Tier[]} */
export function normalizeTiers(tiers) {
  const src = Array.isArray(tiers) && tiers.length > 0 ? tiers : DEFAULT_TIERS;
  let previous = 0;
  return src.map((tier, index) => {
    const last = index === src.length - 1;
    const upTo = last ? Infinity : Math.max(previous, safeNumber(tier.upTo, previous));
    const out = {
      upTo,
      label: tier.label ?? (last ? `${previous + 1} 度以上部分` : `${previous + 1}–${upTo} 度部分`),
      summer: Math.max(0, safeNumber(tier.summer)),
      nonSummer: Math.max(0, safeNumber(tier.nonSummer)),
    };
    previous = last ? previous : upTo;
    return out;
  });
}

/** Rate of one tier for a season. */
export function tierRate(tier, season) {
  return season === 'summer' ? tier.summer : tier.nonSummer;
}

/**
 * Charge for one month of `kwh` (0..MAX_KWH): the kWh inside each tier times that tier's rate.
 * Returns the total and the per-tier split. This is the per-kWh charge only.
 */
export function monthlyBill(kwh, season, tiers = DEFAULT_TIERS) {
  const table = normalizeTiers(tiers);
  const total = Math.min(MAX_KWH, Math.max(0, safeNumber(kwh)));
  let lower = 0;
  let sum = 0;
  const parts = [];
  for (const tier of table) {
    const inside = Math.max(0, Math.min(total, tier.upTo) - lower);
    const rate = tierRate(tier, season);
    const cost = inside * rate;
    parts.push({ label: tier.label, from: lower, upTo: tier.upTo, kwh: inside, rate, cost });
    sum += cost;
    lower = tier.upTo;
    if (total <= tier.upTo) break;
  }
  return { kwh: total, season, total: sum, parts };
}

/** Appliance energy per month: W / 1000 x hours per day x days. The page and the flat-rate tool use 30 days. */
export function applianceMonthlyKwh(watts, hoursPerDay, days = 30) {
  return (Math.max(0, safeNumber(watts)) / 1000) * Math.max(0, safeNumber(hoursPerDay)) * Math.max(0, safeNumber(days, 30));
}

/**
 * What one appliance adds to a month's bill under a tiered tariff:
 *   added = bill(base + appliance) - bill(base)
 * The appliance's kWh sit on top of what the household already uses, so they are billed at the tiers above `baseKwh`.
 *   baseKwh   household kWh in the month WITHOUT this appliance
 *   addKwh    the appliance's kWh in the month
 * averageRate = added / addKwh (元/度 actually paid for the appliance); firstTierRate = the rate of the tier where the
 * appliance's first kWh lands. `split` lists, per tier, how many of the appliance's kWh land there.
 */
export function addedCost({ baseKwh, addKwh, season, tiers = DEFAULT_TIERS }) {
  const base = Math.min(MAX_KWH, Math.max(0, safeNumber(baseKwh)));
  const add = Math.min(MAX_KWH, Math.max(0, safeNumber(addKwh)));
  const before = monthlyBill(base, season, tiers);
  const after = monthlyBill(base + add, season, tiers);
  const added = after.total - before.total;
  const split = [];
  const table = normalizeTiers(tiers);
  let lower = 0;
  for (const tier of table) {
    const lo = Math.max(base, lower);
    const hi = Math.min(base + add, tier.upTo);
    const inside = Math.max(0, hi - lo);
    if (inside > 0) split.push({ label: tier.label, kwh: inside, rate: tierRate(tier, season), cost: inside * tierRate(tier, season) });
    lower = tier.upTo;
  }
  return {
    baseKwh: base,
    addKwh: add,
    season,
    billBefore: before.total,
    billAfter: after.total,
    added,
    averageRate: add > 0 ? added / add : 0,
    firstTierRate: split.length > 0 ? split[0].rate : tierRate(table.find((t) => base < t.upTo) ?? table[table.length - 1], season),
    split,
  };
}

/** Same appliance priced at one flat rate (what the plain calculator does): addKwh x rate. */
export function flatCost(addKwh, rate) {
  return Math.max(0, safeNumber(addKwh)) * Math.max(0, safeNumber(rate));
}

/**
 * A two-month bill doubles every tier's kWh range (Taipower's note under the table), so a household whose two-month
 * bill shows `billKwh` is, per month, in the same tier as `billKwh / 2` -- provided both months have the same season.
 */
export function monthlyKwhFromBill(billKwh, billMonths = 2) {
  return Math.max(0, safeNumber(billKwh)) / Math.max(1, Math.round(safeNumber(billMonths, 1)));
}
