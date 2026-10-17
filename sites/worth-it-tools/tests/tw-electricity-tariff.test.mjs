// P2 batch 5 (2026-10-17): the arithmetic behind the tiered-tariff mode of /zh/tools/appliance-electricity-cost/.
// The page's worked examples are computed at build time from src/lib/twElectricityTariff.mjs (the module the
// calculator script imports); every figure the page prints is pinned here, and the module is cross-checked against
// an independent per-kWh brute force and against the numbers already printed in the Taipower money briefs.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  DEFAULT_TIERS,
  TARIFF_VERSION,
  addedCost,
  applianceMonthlyKwh,
  flatCost,
  monthlyBill,
  monthlyKwhFromBill,
  normalizeTiers,
  seasonOfMonth,
} from '../src/lib/twElectricityTariff.mjs';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);
const explainer = readFileSync(new URL('../src/components/TWTariffExplainer.astro', import.meta.url), 'utf8');
const calculator = readFileSync(new URL('../src/components/ApplianceCostCalculator.astro', import.meta.url), 'utf8');
const brief = (name) => readFileSync(new URL(`../src/content/money-briefs/zh/${name}.md`, import.meta.url), 'utf8');

test('the table is the Taipower 114/10/1 住宅用非時間電價, row by row (原文: "120 度以下部分 每 度 1.78 1.78" ...)', () => {
  assert.equal(TARIFF_VERSION.effectiveFrom, '2025-10-01');
  assert.equal(TARIFF_VERSION.effectiveFromRoc, '114 年 10 月 1 日');
  const expected = [
    [120, 1.78, 1.78],
    [330, 2.55, 2.26],
    [500, 3.8, 3.13],
    [700, 5.14, 4.24],
    [1000, 6.44, 5.27],
    [Infinity, 8.86, 7.03],
  ];
  assert.deepEqual(DEFAULT_TIERS.map((t) => [t.upTo, t.summer, t.nonSummer]), expected);
  // rates never fall as the tier rises, and summer is never cheaper than non-summer
  for (let i = 1; i < DEFAULT_TIERS.length; i += 1) {
    assert.ok(DEFAULT_TIERS[i].summer >= DEFAULT_TIERS[i - 1].summer);
    assert.ok(DEFAULT_TIERS[i].nonSummer >= DEFAULT_TIERS[i - 1].nonSummer);
  }
  for (const t of DEFAULT_TIERS) assert.ok(t.summer >= t.nonSummer);
});

test('the same table appears, unchanged, in the Taipower money briefs already on the site', () => {
  const md = brief('taipower-summer-vs-non-summer-rates');
  const rows = [
    '| 120 度以下部分 | 1.78 | 1.78 | 0 |',
    '| 121–330 度部分 | 2.55 | 2.26 | 0.29 |',
    '| 331–500 度部分 | 3.80 | 3.13 | 0.67 |',
    '| 501–700 度部分 | 5.14 | 4.24 | 0.90 |',
    '| 701–1000 度部分 | 6.44 | 5.27 | 1.17 |',
    '| 1001 度以上部分 | 8.86 | 7.03 | **1.83** |',
  ];
  for (const row of rows) assert.ok(md.includes(row), row);
  // the brief's monthly bills (200..1000 度) are reproduced by the module
  const table = [[200, 417.6, 394.4], [300, 672.6, 620.4], [400, 1015.1, 907.3], [500, 1395.1, 1220.3], [600, 1909.1, 1644.3], [700, 2423.1, 2068.3], [1000, 4355.1, 3649.3]];
  for (const [kwh, summer, nonSummer] of table) {
    near(monthlyBill(kwh, 'summer').total, summer, 1e-6);
    near(monthlyBill(kwh, 'nonSummer').total, nonSummer, 1e-6);
  }
  // the AC brief's headline: 250 度 + 240 度 and 450 度 + 240 度 in summer
  const base250 = addedCost({ baseKwh: 250, addKwh: 240, season: 'summer' });
  const base450 = addedCost({ baseKwh: 450, addKwh: 240, season: 'summer' });
  assert.equal(Math.round(base250.added), 812);
  assert.equal(Math.round(base450.added), 1167);
});

test('the flat-rate tool presets (3.80 / 3.13) are the 331–500 度 tier of the same table', () => {
  assert.ok(calculator.includes("'non-time-summer': 3.8"));
  assert.ok(calculator.includes("'non-time-non-summer': 3.13"));
  assert.equal(DEFAULT_TIERS[2].summer, 3.8);
  assert.equal(DEFAULT_TIERS[2].nonSummer, 3.13);
});

test('monthlyBill matches an independent per-kWh brute force for every whole kWh from 0 to 1,500', () => {
  const rateOfKwhNumber = (k, season) => {
    // the k-th kWh of the month (k = 1, 2, ...) sits in the tier with lower < k <= upTo
    const tier = DEFAULT_TIERS.find((t) => k <= t.upTo);
    return season === 'summer' ? tier.summer : tier.nonSummer;
  };
  for (const season of ['summer', 'nonSummer']) {
    let running = 0;
    for (let x = 0; x <= 1500; x += 1) {
      if (x > 0) running += rateOfKwhNumber(x, season);
      near(monthlyBill(x, season).total, running, 1e-6);
    }
  }
});

test('addedCost = bill(base + add) - bill(base), and its split sums to the same amount', () => {
  for (const season of ['summer', 'nonSummer']) {
    for (const base of [0, 50, 120, 119.5, 300, 330, 480, 699, 1000, 1500]) {
      for (const add of [0, 0.5, 14.985, 21, 180, 223.68, 900]) {
        const r = addedCost({ baseKwh: base, addKwh: add, season });
        near(r.added, monthlyBill(base + add, season).total - monthlyBill(base, season).total, 1e-9);
        near(r.split.reduce((s, p) => s + p.cost, 0), r.added, 1e-9);
        near(r.split.reduce((s, p) => s + p.kwh, 0), add, 1e-9);
      }
    }
  }
  assert.equal(addedCost({ baseKwh: 300, addKwh: 0, season: 'summer' }).added, 0);
});

test('malformed, negative and excessive input stays finite', () => {
  for (const bad of [undefined, null, 'x', NaN, Infinity, -5]) {
    assert.ok(Number.isFinite(monthlyBill(bad, 'summer').total));
    const r = addedCost({ baseKwh: bad, addKwh: bad, season: 'nonSummer' });
    assert.ok(Number.isFinite(r.added) && r.added >= 0);
  }
  assert.ok(Number.isFinite(monthlyBill(1e30, 'summer').total));
  // a reader-edited table is repaired, not trusted
  const fixed = normalizeTiers([{ upTo: 500, summer: -1, nonSummer: 'a' }, { upTo: 100, summer: 2, nonSummer: 2 }, { upTo: 1, summer: 3, nonSummer: 3 }]);
  assert.deepEqual(fixed.map((t) => t.upTo), [500, 500, Infinity]);
  assert.deepEqual(fixed.map((t) => t.summer), [0, 2, 3]);
  assert.equal(seasonOfMonth(5), 'nonSummer');
  assert.equal(seasonOfMonth(6), 'summer');
  assert.equal(seasonOfMonth(9), 'summer');
  assert.equal(seasonOfMonth(10), 'nonSummer');
});

test('算例一: 電暖器 1,500 W x 4 h x 30 天 = 180 度, 非夏月, 全戶 100 / 300 / 500 度', () => {
  const kwh = applianceMonthlyKwh(1500, 4);
  assert.equal(kwh, 180);
  const rows = [100, 300, 500].map((base) => addedCost({ baseKwh: base, addKwh: kwh, season: 'nonSummer' }));
  assert.deepEqual(rows.map((r) => r.added.toFixed(2)), ['397.20', '537.30', '763.20']);
  assert.deepEqual(rows.map((r) => r.averageRate.toFixed(2)), ['2.21', '2.98', '4.24']);
  // tier split, written out by hand: 100->280: 20 @ 1.78 + 160 @ 2.26; 300->480: 30 @ 2.26 + 150 @ 3.13; 500->680: 180 @ 4.24
  near(20 * 1.78 + 160 * 2.26, 397.2, 1e-9);
  near(30 * 2.26 + 150 * 3.13, 537.3, 1e-9);
  near(180 * 4.24, 763.2, 1e-9);
  assert.deepEqual(rows[0].split.map((p) => [p.label, p.kwh, p.rate]), [['120 度以下部分', 20, 1.78], ['121–330 度部分', 160, 2.26]]);
  assert.deepEqual(rows[1].split.map((p) => [p.label, p.kwh, p.rate]), [['121–330 度部分', 30, 2.26], ['331–500 度部分', 150, 3.13]]);
  assert.deepEqual(rows[2].split.map((p) => [p.label, p.kwh, p.rate]), [['501–700 度部分', 180, 4.24]]);
  // flat 3.13 x 180 = 563.40; over/under-estimates quoted on the page
  near(flatCost(kwh, 3.13), 563.4, 1e-9);
  assert.equal((563.4 - rows[0].added).toFixed(1), '166.2');
  assert.equal((563.4 - rows[1].added).toFixed(1), '26.1');
  assert.equal((rows[2].added - 563.4).toFixed(1), '199.8');
  assert.equal((rows[2].added / rows[0].added).toFixed(2), '1.92');
});

test('算例二: 移動式冷氣 932 W x 8 h x 30 天 = 223.68 度, 夏月, 兩個月 840 度 = 每月 420 度', () => {
  const kwh = applianceMonthlyKwh(932, 8);
  assert.equal(kwh.toFixed(2), '223.68');
  assert.equal(monthlyKwhFromBill(840, 2), 420);
  const r = addedCost({ baseKwh: 420, addKwh: kwh, season: 'summer' });
  assert.equal(r.split.length, 2);
  assert.equal(r.split[0].kwh, 80);
  assert.equal(r.split[0].cost.toFixed(1), '304.0');
  assert.equal(r.split[1].kwh.toFixed(2), '143.68');
  assert.equal(r.split[1].cost.toFixed(1), '738.5');
  assert.equal(r.added.toFixed(1), '1042.5');
  assert.equal(r.averageRate.toFixed(2), '4.66');
  assert.equal((r.added * 2).toFixed(1), '2085.0');
  const flat = flatCost(kwh, 3.8);
  assert.equal(flat.toFixed(1), '850.0');
  assert.equal((r.added - flat).toFixed(1), '192.5');
  // 兩個月一期: 840 度 is two months of 420, not one month of 840
  assert.equal(monthlyBill(840, 'summer').total.toFixed(1), '3324.7');
  assert.equal((monthlyBill(420, 'summer').total * 2).toFixed(1), '2182.2');
  assert.equal((monthlyBill(840, 'summer').total - monthlyBill(420, 'summer').total * 2).toFixed(1), '1142.5');
  // doubling every tier's range is the same as halving the kWh: bill(2x, doubled tiers) = 2 x bill(x)
  const doubled = DEFAULT_TIERS.map((t) => ({ ...t, upTo: t.upTo * 2 }));
  near(monthlyBill(840, 'summer', doubled).total, 2 * monthlyBill(420, 'summer').total, 1e-9);
});

test('the explainer computes its figures from the module and states the checks it could and could not make', () => {
  assert.ok(explainer.includes("from '../lib/twElectricityTariff.mjs'"));
  for (const text of [
    '調整後各類用戶電價表',
    '用戶因 2 個月抄表、收費一次，計費時各段度數係加倍計算',
    '台灣電力公司114年下半年電價表',
    '2025-10-03',
    '本次電價調整暫不決定，留待今年12月併入第3次電價審議會審議輸配電費率時再行討論',
    '回應 403',
    '試算僅供參考，以台電與主管機關公告為準',
    'data-tariff-example',
  ]) assert.ok(explainer.includes(text), text);
  // no tariff number is typed into the prose: the only literals are the example inputs (watts, hours, kWh of the bill)
  for (const literal of ['1.78', '2.26', '3.13', '4.24', '5.14', '6.44', '8.86', '7.03', '397.2', '537.3', '763.2', '1042.5']) {
    assert.ok(!explainer.includes(literal), `hard-coded ${literal}`);
  }
  // the calculator script uses the same module
  assert.ok(calculator.includes("from '../lib/twElectricityTariff.mjs'"));
});
