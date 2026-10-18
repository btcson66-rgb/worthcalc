// P2 batch 11 (2026-10-18): the arithmetic behind the zh 汽車負擔能力與養車月成本 page. Every number printed in
// src/content/growth-tools/zh/car-affordability.md is recomputed here with the same module the page script imports
// (src/lib/twCarMath.mjs), looked up in the markdown, and cross-checked with plain arithmetic. The three published tables
// (使用牌照稅法 附表一 / 附表四, 徵收及分配辦法 附表二) and the 保發中心 compulsory-insurance table are pinned cell by cell.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  CAR_AGE_SEX,
  CAR_LEVEL_COEFFICIENT,
  COMPULSORY,
  LICENSE_TAX_EV,
  LICENSE_TAX_PETROL,
  ROAD_FEE_PRIVATE_CAR,
  calculateTwCar,
  compulsoryPremium,
  licenseTax,
  loanPayment,
  loanPrincipalFor,
  roadFee,
} from '../src/lib/twCarMath.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/car-affordability.md', import.meta.url), 'utf8');
const article = readFileSync(new URL('../src/content/growth-articles/zh/true-cost-of-car-ownership.md', import.meta.url), 'utf8');
const f = (n) => Math.round(n).toLocaleString('en-US');
const f2 = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

const base = {
  takeHome: 90000, otherDebtPayments: 0, livingCosts: 40000, savingsTarget: 10000, downPayment: 200000, tradeIn: 0,
  aprPct: 3, termMonths: 60, drivetrain: 'petrol', cc: 1800, optionalInsuranceYear: 18000,
  fuelMonthly: 3500, maintenanceMonthly: 1500, parkingMonthly: 2500, transportCapPct: 15,
};

test('使用牌照稅 附表一 (自用小客車), cell by cell, including the cc boundaries', () => {
  assert.deepEqual(LICENSE_TAX_PETROL.map(([u, t]) => [u, t]), [
    [500, 1620], [600, 2160], [1200, 4320], [1800, 7120], [2400, 11230], [3000, 15210],
    [4200, 28220], [5400, 46170], [6600, 69690], [7800, 117000], [Infinity, 151200],
  ]);
  const at = (cc) => licenseTax({ drivetrain: 'petrol', cc }).amount;
  assert.equal(at(500), 1620); assert.equal(at(501), 2160); assert.equal(at(1200), 4320); assert.equal(at(1201), 7120);
  assert.equal(at(1800), 7120); assert.equal(at(1801), 11230); assert.equal(at(3000), 15210); assert.equal(at(3001), 28220);
  assert.equal(at(7800), 117000); assert.equal(at(7801), 151200);
  for (const text of ['| 自用小客車年稅額 | 1,620 元 | 2,160 元 | 4,320 元 | 7,120 元 | 11,230 元 | 15,210 元 |', '3,001–4,200cc 為 28,220 元，4,201–5,400cc 為 46,170 元，5,401–6,600cc 為 69,690 元，6,601–7,800cc 為 117,000 元，7,801cc 以上為 151,200 元']) assert.ok(md.includes(text), text);
});

test('使用牌照稅 附表四 (電動小客車, 英制 HP), cell by cell, and the 免徵 box', () => {
  assert.deepEqual(LICENSE_TAX_EV.map(([u, t]) => [u, t]), [
    [38, 1620], [56, 2160], [83, 4320], [182, 7120], [262, 11230], [322, 15210], [414, 28220], [469, 46170], [509, 69690], [Infinity, 117000],
  ]);
  const at = (hp) => licenseTax({ drivetrain: 'ev', hp }).amount;
  assert.equal(at(38), 1620); assert.equal(at(38.1), 2160); assert.equal(at(182), 7120); assert.equal(at(182.1), 11230);
  assert.equal(at(200), 11230); assert.equal(at(262), 11230); assert.equal(at(262.1), 15210); assert.equal(at(509), 69690); assert.equal(at(509.1), 117000);
  assert.deepEqual(licenseTax({ drivetrain: 'ev', hp: 200, evExempt: true }), { amount: 0, exempt: true });
  assert.equal(licenseTax({ drivetrain: 'petrol', cc: 1800, evExempt: true }).amount, 7120); // the box means nothing for a petrol car
  for (const text of ['| 電動小客車年稅額 | 1,620 元 | 2,160 元 | 4,320 元 | 7,120 元 | 11,230 元 | 15,210 元 |', '322.1–414 HP 為 28,220 元，414.1–469 HP 為 46,170 元，469.1–509 HP 為 69,690 元，509.1 HP 以上為 117,000 元']) assert.ok(md.includes(text), text);
});

test('公路養管費 附表二 (自用小客車每年), cell by cell; EV exempt; rows outside the table are not guessed', () => {
  assert.deepEqual(ROAD_FEE_PRIVATE_CAR.map((r) => [...r]), [
    [251, 500, 2160, 1296], [501, 600, 2880, 1728], [601, 1200, 4320, 2592], [1201, 1800, 4800, 2880], [1801, 2400, 6180, 3708],
    [2401, 3000, 7200, 4320], [3001, 3600, 8640, 5184], [3601, 4200, 9810, 5886], [4201, 4800, 11220, 6732], [4801, 5400, 12180, 7308],
    [5401, 6000, 13080, 7848], [6001, 6600, 13950, 8370], [6601, 7200, 14910, 8946], [7201, 8000, 15720, 9432],
  ]);
  assert.equal(roadFee({ drivetrain: 'petrol', cc: 1800 }).amount, 4800);
  assert.equal(roadFee({ drivetrain: 'petrol', cc: 1801 }).amount, 6180);
  assert.equal(roadFee({ drivetrain: 'diesel', cc: 1800 }).amount, 2880);
  assert.equal(roadFee({ drivetrain: 'diesel', cc: 2400 }).amount, 3708);
  assert.equal(roadFee({ drivetrain: 'petrol', cc: 250 }).listed, false);
  assert.equal(roadFee({ drivetrain: 'petrol', cc: 8001 }).amount, null);
  assert.equal(roadFee({ drivetrain: 'ev', cc: 1 }).amount, 0);
  assert.equal(roadFee({ drivetrain: 'ev', cc: 1 }).exempt, true);
  assert.throws(() => calculateTwCar({ ...base, cc: 8500 }), /roadFee/);
  assert.equal(calculateTwCar({ ...base, cc: 8500, roadFeeOverride: 16000 }).roadFee, 16000); // typed by the reader
  for (const text of ['| 汽油 | 4,320 元 | 4,800 元 | 6,180 元 | 7,200 元 |', '| 柴油 | 2,592 元 | 2,880 元 | 3,708 元 | 4,320 元 |']) assert.ok(md.includes(text), text);
});

test('強制險: the formula reproduces all 100 cells of the 保發中心 自用小客車 table and both published examples', () => {
  // rows = 費率等級 1-10; columns = [男, 女] for 20 歲以下, 21-25, 26-30, 31-60, 超過 60 歲
  const table = [
    [2594, 1757, 2395, 1627, 1567, 1158, 1099, 1019, 1148, 889], [2634, 1796, 2435, 1667, 1607, 1198, 1138, 1059, 1188, 929],
    [2714, 1876, 2514, 1747, 1687, 1278, 1218, 1138, 1268, 1009], [2893, 2056, 2694, 1926, 1866, 1457, 1398, 1318, 1448, 1188],
    [2993, 2155, 2794, 2026, 1966, 1557, 1497, 1418, 1547, 1288], [3093, 2255, 2893, 2126, 2066, 1657, 1597, 1517, 1647, 1388],
    [3192, 2355, 2993, 2225, 2165, 1757, 1697, 1617, 1747, 1487], [3292, 2455, 3093, 2325, 2265, 1856, 1796, 1717, 1846, 1587],
    [3392, 2554, 3192, 2425, 2365, 1956, 1896, 1816, 1946, 1687], [3491, 2654, 3292, 2524, 2465, 2056, 1996, 1916, 2046, 1787],
  ];
  const bands = ['u20', '21-25', '26-30', '31-60', 'o60'];
  let cells = 0;
  for (let level = 1; level <= 10; level += 1) {
    bands.forEach((band, b) => ['male', 'female'].forEach((sex, s) => {
      assert.equal(compulsoryPremium({ ageBand: band, sex, level }), table[level - 1][b * 2 + s], `${band} ${sex} level ${level}`);
      cells += 1;
    }));
  }
  assert.equal(cells, 100);
  // 保險費計算實例: 男 35 歲, 第 2 級, 酒駕 1 次 -> 4,738; 女 19 歲, 第 4 級 -> 2,056
  assert.equal(compulsoryPremium({ ageBand: '31-60', sex: 'male', level: 2, drunkRecords: 1 }), 4738);
  assert.equal(compulsoryPremium({ ageBand: 'u20', sex: 'female', level: 4 }), 2056);
  assert.deepEqual([...CAR_LEVEL_COEFFICIENT], [0.7, 0.74, 0.82, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6]);
  assert.equal(COMPULSORY.basePurePremium, 965.15);
  assert.equal(CAR_AGE_SEX['31-60'].male, 1);
  near((965.15 * (1 + 1 - 1) + 381.94 + 5.86) / (1 - 0.03 - 0.002), 1397.6756198347);
  for (const [text, value] of [
    ['| 男性 31–60 歲，第 4 級（第一次投保） | 1,398 元 |', compulsoryPremium({ ageBand: '31-60', sex: 'male', level: 4 })],
    ['| 女性 31–60 歲，第 4 級 | 1,318 元 |', compulsoryPremium({ ageBand: '31-60', sex: 'female', level: 4 })],
    ['| 男性 20 歲以下，第 4 級 | 2,893 元 |', compulsoryPremium({ ageBand: 'u20', sex: 'male', level: 4 })],
  ]) { assert.ok(md.includes(text), text); assert.ok(text.includes(f(value))); }
  for (const text of ['| 女性 20 歲以下，第 4 級（保發中心計算實例二） | 2,056 元 |', '| 男性 31–60 歲，第 2 級，前一年有酒駕紀錄 1 次（保發中心計算實例一） | 4,738 元 |', '= 1,398 元']) assert.ok(md.includes(text), text);
  assert.throws(() => compulsoryPremium({ ageBand: 'x', sex: 'male' }), RangeError);
  assert.throws(() => compulsoryPremium({ ageBand: 'u20', sex: 'male', level: 11 }), RangeError);
});

test('loan arithmetic: the annuity payment and the principal it carries are inverses; Excel PV agrees', () => {
  const pmt = 3390.166666666666;
  const principal = loanPrincipalFor(pmt, 3, 60);
  near(loanPayment(principal, 3, 60), pmt, 1e-6);
  near(principal, pmt * (1 - 1.0025 ** -60) / 0.0025, 1e-6);
  assert.equal(loanPrincipalFor(1000, 0, 12), 12000);
  assert.equal(f(loanPrincipalFor(3390.17, 3, 60)), '188,671');
  assert.ok(md.includes('`=PV(0.03/12,60,-3390.17)` 約 188,671'));
});

test('算例一 (the calculator defaults): 實領 90,000, 1,800cc 汽油', () => {
  const r = calculateTwCar(base);
  assert.equal(r.licenseTax, 7120);
  assert.equal(r.roadFee, 4800);
  assert.equal(r.compulsory, 1398);
  assert.equal(r.fixedYear, 31318);
  assert.equal(7120 + 4800 + 1398 + 18000, 31318);
  assert.equal(f2(r.fixedMonthly), '2,609.83');
  assert.equal(f2(r.holdingMonthly), '10,109.83');
  assert.equal(r.capBudget, 13500);
  assert.equal(f2(r.afterCap), '3,390.17');
  assert.equal(f2(r.afterLiving), '29,890.17');
  assert.equal(r.binding, 'cap');
  assert.equal(f2(r.affordablePayment), '3,390.17');
  assert.equal(f(r.principal), '188,671');
  assert.equal(f(r.maxPrice), '388,671');
  assert.equal(f(r.totalInterest), '14,739');
  near(r.paymentShare, 0.15);
  for (const text of [
    '| 使用牌照稅（1,201–1,800cc） | 附表一 | 7,120 元／年 |', '| 公路養管費（汽油，1,201–1,800cc） | 附表二 | 4,800 元／年 |',
    '| 每年固定合計 | 7,120 + 4,800 + 1,398 + 18,000 | 31,318 元，每月 2,609.83 元 |', '| 每月持有成本 | 2,609.83 + 3,500 + 1,500 + 2,500 | 10,109.83 元 |',
    '| 交通預算上限 | 90,000 × 15% | 13,500 元 |', '| 條件 B（交通上限） | 13,500 − 10,109.83 | 3,390.17 元 |',
    '| 條件 A（生活） | 90,000 − 0 − 40,000 − 10,000 − 10,109.83 | 29,890.17 元 |', '| 可用車貸月付 | 取較小者，交通上限先卡住 | 3,390.17 元 |',
    '| 可貸本金（3%、60 期） | 3,390.17 × (1 − 1.0025^−60) ÷ 0.0025 | 188,671 元 |', '| 最高車價 | 188,671 + 200,000 | 388,671 元 |',
    '| 60 期總利息 | 3,390.17 × 60 − 188,671 | 14,739 元 |',
  ]) assert.ok(md.includes(text), text);
  assert.equal(2609.83 + 3500 + 1500 + 2500, 10109.83);
  assert.equal(90000 * 0.15, 13500);
});

test('算例二 and 三: the same EV with and without the 縣市 免徵', () => {
  const ev = { ...base, drivetrain: 'ev', hp: 200, fuelMonthly: 1200, maintenanceMonthly: 1000 };
  const a = calculateTwCar({ ...ev, evExempt: true });
  assert.equal(a.licenseTax, 0);
  assert.equal(a.roadFee, 0);
  assert.equal(a.roadFeeExempt, true);
  assert.equal(a.fixedYear, 19398);
  assert.equal(f2(a.fixedMonthly), '1,616.50');
  assert.equal(f2(a.holdingMonthly), '6,316.50');
  assert.equal(f2(a.afterCap), '7,183.50');
  assert.equal(f(a.principal), '399,779');
  assert.equal(f(a.maxPrice), '599,779');
  const b = calculateTwCar({ ...ev, evExempt: false });
  assert.equal(b.licenseTax, 11230);
  assert.equal(b.fixedYear, 30628);
  assert.equal(f2(b.fixedMonthly), '2,552.33');
  assert.equal(f2(b.holdingMonthly), '7,252.33');
  assert.equal(f2(b.afterCap), '6,247.67');
  assert.equal(f(b.principal), '347,697');
  assert.equal(f(b.maxPrice), '547,697');
  assert.ok(a.maxPrice - b.maxPrice > 52000 && a.maxPrice - b.maxPrice < 52200); // "約 5.2 萬元"
  for (const text of [
    '| 每年固定合計 | 0 + 0 + 1,398 + 18,000 | 19,398 元，每月 1,616.50 元 |', '| 每月持有成本 | 1,616.50 + 1,200 + 1,000 + 2,500 | 6,316.50 元 |',
    '| 可用車貸月付（條件 B） | 13,500 − 6,316.50 | 7,183.50 元 |', '| 可貸本金 | 7,183.50 × (1 − 1.0025^−60) ÷ 0.0025 | 399,779 元 |', '| 最高車價 | 399,779 + 200,000 | 599,779 元 |',
    '| 使用牌照稅 | 附表四 | 11,230 元／年 |', '| 每年固定合計 | 11,230 + 0 + 1,398 + 18,000 | 30,628 元，每月 2,552.33 元 |', '| 每月持有成本 | 2,552.33 + 1,200 + 1,000 + 2,500 | 7,252.33 元 |',
    '| 可用車貸月付（條件 B） | 13,500 − 7,252.33 | 6,247.67 元 |', '| 可貸本金 | 6,247.67 × (1 − 1.0025^−60) ÷ 0.0025 | 347,697 元 |', '| 最高車價 | 347,697 + 200,000 | 547,697 元 |',
    '讓最高車價差了約 5.2 萬元',
  ]) assert.ok(md.includes(text), text);
});

test('算例四: the living-costs condition binds', () => {
  const r = calculateTwCar({
    takeHome: 60000, otherDebtPayments: 5000, livingCosts: 40000, savingsTarget: 5000, downPayment: 150000, tradeIn: 0, aprPct: 3, termMonths: 60,
    drivetrain: 'petrol', cc: 1200, optionalInsuranceYear: 12000, fuelMonthly: 2500, maintenanceMonthly: 1000, parkingMonthly: 1500, transportCapPct: 25,
  });
  assert.equal(r.licenseTax, 4320);
  assert.equal(r.roadFee, 4320);
  assert.equal(r.fixedYear, 22038);
  assert.equal(f2(r.fixedMonthly), '1,836.50');
  assert.equal(f2(r.holdingMonthly), '6,836.50');
  assert.equal(f2(r.afterCap), '8,163.50');
  assert.equal(f2(r.afterLiving), '3,163.50');
  assert.equal(r.binding, 'living');
  assert.equal(f2(r.affordablePayment), '3,163.50');
  assert.equal(f(r.principal), '176,056');
  assert.equal(f(r.maxPrice), '326,056');
  for (const text of [
    '| 每年固定合計 | 4,320 + 4,320 + 1,398 + 12,000 | 22,038 元，每月 1,836.50 元 |', '| 每月持有成本 | 1,836.50 + 2,500 + 1,000 + 1,500 | 6,836.50 元 |',
    '| 條件 B（交通上限 25%） | 60,000 × 25% − 6,836.50 | 8,163.50 元 |', '| 條件 A（生活） | 60,000 − 5,000 − 40,000 − 5,000 − 6,836.50 | 3,163.50 元 |',
    '| 可用車貸月付 | 取較小者，生活條件先卡住 | 3,163.50 元 |', '| 可貸本金 | 3,163.50 × (1 − 1.0025^−60) ÷ 0.0025 | 176,056 元 |', '| 最高車價 | 176,056 + 150,000 | 326,056 元 |',
  ]) assert.ok(md.includes(text), text);
});

test('稅費對照表 rows', () => {
  for (const cc of [1200, 1800, 2000, 2400, 3000]) {
    const tax = licenseTax({ drivetrain: 'petrol', cc }).amount;
    const fee = roadFee({ drivetrain: 'petrol', cc }).amount;
    const row = `| ${f(cc).replace(/,(\d{3})$/, ',$1')}cc | ${f(tax)} 元 | ${f(fee)} 元 | ${f(tax + fee)} 元 | ${f2((tax + fee) / 12)} 元 |`;
    assert.ok(md.includes(row), row);
  }
  assert.equal(11230 + 6180 - (7120 + 4800), 5490);
  assert.ok(md.includes('1,800cc 與 2,000cc 一年差 5,490 元'));
});

test('over budget: a holding cost above the budget leaves no loan and no price; bad input is rejected', () => {
  const r = calculateTwCar({ ...base, takeHome: 20000, livingCosts: 10000, savingsTarget: 5000 });
  assert.equal(r.affordablePayment, 0);
  assert.equal(r.maxPrice, 0);
  assert.equal(r.overBudget, true);
  assert.throws(() => calculateTwCar({ ...base, takeHome: 0 }), RangeError);
  assert.throws(() => calculateTwCar({ ...base, termMonths: 0 }), RangeError);
  assert.throws(() => calculateTwCar({ ...base, termMonths: 200 }), RangeError);
  assert.throws(() => calculateTwCar({ ...base, transportCapPct: 0 }), RangeError);
  assert.throws(() => calculateTwCar({ ...base, drivetrain: 'ev', hp: 0 }), RangeError);
  // typed overrides replace the tables and the formula
  const o = calculateTwCar({ ...base, licenseTaxOverride: 5000, roadFeeOverride: 3000, compulsoryOverride: 1500 });
  assert.equal(o.fixedYear, 5000 + 3000 + 1500 + 18000);
  // 0% loan: the principal is the payment times the months
  near(calculateTwCar({ ...base, aprPct: 0 }).principal, calculateTwCar({ ...base, aprPct: 0 }).affordablePayment * 60);
});

test('the page keeps the EV rules at their source wording and carries no US terms or FAQPage / HowTo', () => {
  assert.ok(md.includes('得對完全以電能為動力之機動車輛免徵使用牌照稅'));
  assert.ok(md.includes('至 119 年 12 月 31 日止'));
  assert.ok(md.includes('電動汽車免徵公路使用養護安全管理費'));
  assert.ok(!/FAQPage|HowTo/.test(md));
  assert.ok(!/sales tax|registration fee|DMV|\$|銷售稅/i.test(md));
  assert.ok(article.includes('388,671') && article.includes('599,779'));
});
