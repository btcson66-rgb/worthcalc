// P2 batch 6 (2026-10-17): wattage from 經濟部能源署 label registers. The raw CSVs are not committed (the air-conditioner file is >1 MB);
// scripts/derive-appliance-label-stats.mjs regenerates src/data/applianceLabelStats.json from them. These tests pin the conversions to
// rows copied from the official files, the quantile rule, and the link between the statistics file and src/data/appliances.json.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { acRatedWatts, dehumidifierRunningWatts, fridgeAverageWatts, fridgeKwhPerMonth, monitorOnModeWatts, parseCsv, quantile, summarize } from '../src/lib/applianceLabelMath.mjs';

const appliances = JSON.parse(readFileSync(new URL('../src/data/appliances.json', import.meta.url), 'utf8'));
const stats = JSON.parse(readFileSync(new URL('../src/data/applianceLabelStats.json', import.meta.url), 'utf8'));
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);
const r1 = (x) => Math.round(x * 10) / 10;

test('refrigerator: rows copied from the 能源署 register (大同 TR-C580VP 580 L / EF 26.20; TR-C1618VPN 610 L / EF 26.90)', () => {
  near(fridgeKwhPerMonth(580, 26.2), 580 / 26.2);
  assert.equal(fridgeKwhPerMonth(580, 26.2).toFixed(2), '22.14');
  assert.equal(fridgeAverageWatts(580, 26.2).toFixed(2), '30.75');
  assert.equal(fridgeAverageWatts(610, 26.9).toFixed(2), '31.50');
  assert.equal(fridgeAverageWatts(0, 26.9), null);
  assert.equal(fridgeAverageWatts('x', 26.9), null);
  assert.equal(fridgeAverageWatts(580, 0), null);
});

test('dehumidifier (上洋 DH18W-T 18.50 L/day, EF 3.11; 大同 TDH-210LB 10.50 L/day, EF 2.76): capacity / EF / 24 h', () => {
  assert.equal(dehumidifierRunningWatts(18.5, 3.11).toFixed(1), '247.9');
  assert.equal(dehumidifierRunningWatts(10.5, 2.76).toFixed(1), '158.5');
  assert.equal(dehumidifierRunningWatts(10.5, -1), null);
});

test('air conditioner (上加 KU-80NP3 rated 2.08 kW, KU-72NP3 1.75 kW) and monitor on-mode text', () => {
  assert.equal(acRatedWatts(2.08), 2080);
  assert.equal(acRatedWatts(1.75), 1750);
  assert.equal(acRatedWatts(0), null);
  assert.equal(monitorOnModeWatts('開機模式平均消耗功率(W)=120.7，待機-被動模式平均消耗功率(W)=0.27'), 120.7);
  assert.equal(monitorOnModeWatts('開機模式平均消耗功率(W)=12.5，睡眠模式平均消耗功率(W)=0.13，關機模式平均消耗功率(W)=0.12'), 12.5);
  assert.equal(monitorOnModeWatts('沒有這一欄'), null);
});

test('quantiles are linear-interpolation (type 7) and ignore non-finite values; one wild entry does not move the median or the quartiles', () => {
  assert.equal(quantile([1, 2, 3, 4], 0.5), 2.5);
  assert.equal(quantile([1, 2, 3, 4, 5], 0.25), 2);
  assert.equal(quantile([1, 2, 3, 4, 5], 0.75), 4);
  assert.equal(quantile([], 0.5), null);
  assert.deepEqual(summarize([3, NaN, 1, 2, Infinity]), { n: 3, p25: 1.5, median: 2, p75: 2.5 });
  const clean = [880, 1000, 1250, 1500, 2070];
  const withError = [...clean, 2115000];
  assert.ok(quantile(withError, 0.5) < 2000 && quantile(withError, 0.75) < 3000);
});

test('parseCsv reads BOM, quotes and CRLF', () => {
  assert.deepEqual(parseCsv('﻿項次,型號\r\n1,"A,B"\r\n2,"say ""hi"""\r\n'), [['項次', '型號'], ['1', 'A,B'], ['2', 'say "hi"']]);
});

test('statistics file: four datasets read on 2026-10-17, each with its source list page', () => {
  assert.equal(stats.readOn, '2026-10-17');
  assert.deepEqual(Object.keys(stats.datasets).sort(), ['dehumidifier', 'monitor', 'refrigerator', 'windowAirConditioner']);
  assert.equal(stats.sources.classified, 'https://ea03.moeaea.gov.tw/e0410/03/gen/opendata/list.aspx');
  assert.equal(stats.sources.energyLabel, 'https://ea03.moeaea.gov.tw/e0410/01/other/opendata/list.aspx');
  for (const d of Object.values(stats.datasets)) {
    assert.ok(d.watts.n > 100 && d.watts.p25 < d.watts.median && d.watts.median < d.watts.p75, d.set);
    assert.equal(d.watts.n, d.listed, `${d.set}: every listed model had usable columns`);
  }
  assert.deepEqual(Object.values(stats.datasets).map((d) => d.watts.n), [1776, 700, 1323, 420]);
});

test('appliances.json: exactly the four label entries use the statistics (median default, 25th-75th range); the other 39 say 示範值', () => {
  assert.equal(appliances.length, 43);
  const byId = Object.fromEntries(appliances.map((a) => [a.id, a]));
  const pairs = [['refrigerator', 'refrigerator'], ['dehumidifier', 'dehumidifier'], ['portable-ac', 'windowAirConditioner'], ['monitor', 'monitor']];
  for (const [id, key] of pairs) {
    const a = byId[id];
    const w = stats.datasets[key].watts;
    assert.equal(a.source_tier, 'moeaea-label', id);
    assert.equal(a.default_watts, r1(w.median), id);
    assert.equal(a.watts_low, r1(w.p25), id);
    assert.equal(a.watts_high, r1(w.p75), id);
    assert.equal(a.label_models, w.n, id);
    assert.equal(a.label_dataset, stats.datasets[key].set, id);
    assert.equal(a.verified_date, '2026-10-17');
    assert.ok(a.source_url.startsWith('https://ea03.moeaea.gov.tw/e0410/'), id);
    assert.ok(a.zh_note.includes(String(w.n)) && a.zh_note.includes('中位數'), id);
  }
  const demo = appliances.filter((a) => a.source_tier === 'demo');
  assert.equal(demo.length, 39);
  for (const a of demo) {
    assert.ok(a.zh_note.startsWith('示範值'), a.id);
    assert.equal(a.verified_date, '2026-09-15');
  }
  // the page and calculator say so
  const page = readFileSync(new URL('../src/pages/zh/tools/appliance-electricity-cost.astro', import.meta.url), 'utf8');
  const component = readFileSync(new URL('../src/components/ApplianceCostCalculator.astro', import.meta.url), 'utf8');
  for (const text of ['其他 39 項與所有的每日使用時數都是標明「示範值」的假設', '一台冷氣被列為 2,115 kW', 'https://ea03.moeaea.gov.tw/e0410/03/gen/opendata/list.aspx', 'https://ea03.moeaea.gov.tw/e0410/01/other/opendata/list.aspx']) assert.ok(page.includes(text), text);
  assert.ok(component.includes('示範值（非能源署資料）'));
  assert.ok(!page.includes('repo 指南'));
});
