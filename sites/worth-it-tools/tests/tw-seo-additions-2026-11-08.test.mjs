// 2026-11-08 SEO/AKSEO additions (task pack TP-20261108-P2-WORTHCALC): every NT$ figure in the tables and worked cases
// added that day is recomputed here with the site's own math modules and looked up, character for character, in the
// markdown that prints it. If a rate table or formula changes, this test fails before a stale number ships.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { buildModeCost } from '../src/lib/commuteMath.mjs';
import { calculateTwCar } from '../src/lib/twCarMath.mjs';
import { calculateTwDebtRatios } from '../src/lib/twDbrMath.mjs';
import { evaluateCashback } from '../src/lib/twCashbackMath.mjs';
import { monthlyBill } from '../src/lib/twElectricityTariff.mjs';

const read = (p) => readFileSync(new URL(`../src/content/${p}`, import.meta.url), 'utf8');
const dti = read('growth-articles/zh/how-to-calculate-dti.md');
const car = read('growth-articles/zh/true-cost-of-car-ownership.md');
const tpass = read('money-briefs/zh/tpass-commuter-pass-breakeven.md');
const power = read('money-briefs/zh/taipower-summer-vs-non-summer-rates.md');
const cashbackPage = readFileSync(new URL('../src/pages/zh/tools/cashback-breakeven.astro', import.meta.url), 'utf8');
const f = (n) => Math.round(n).toLocaleString('en-US');
const f2 = (n) => (Math.round(n * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const f1 = (n) => (Math.round(n * 10) / 10).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

test('DBR / 房貸月付占收入 lights for the three 80,000-yuan-income scenarios printed in the DTI guide', () => {
  const rows = [
    { card: 10000, loan: 30000, mortgage: 15000, dbr: 0.5, dbrLight: 'green', ratio: 0.1875, mortgageLight: 'green', room: 1720000 },
    { card: 80000, loan: 400000, mortgage: 26000, dbr: 6, dbrLight: 'yellow', ratio: 0.325, mortgageLight: 'yellow', room: 1280000 },
    { card: 240000, loan: 1600000, mortgage: 30000, dbr: 23, dbrLight: 'red', ratio: 0.375, mortgageLight: 'red', room: -80000 },
  ];
  for (const row of rows) {
    const r = calculateTwDebtRatios({ monthlyIncome: 80000, cardBalance: row.card, creditLoanBalance: row.loan, mortgagePayment: row.mortgage });
    assert.equal(r.dbr, row.dbr); assert.equal(r.dbrLight, row.dbrLight);
    assert.equal(r.mortgageRatio, row.ratio); assert.equal(r.mortgageLight, row.mortgageLight);
    assert.equal(r.dbrRoom, row.room);
  }
  for (const text of ['| 輕負債 | 40,000 元 | 0.5 倍 | 綠燈 | 15,000 元 | 18.75% | 綠燈 | 還有 1,720,000 元空間 |', '| 案例中的小陳 | 480,000 元 | 6 倍 | 黃燈 | 26,000 元 | 32.5% | 黃燈 | 還有 1,280,000 元空間 |', '| 無擔保負債偏高 | 1,840,000 元 | 23 倍 | 紅燈 | 30,000 元 | 37.5% | 紅燈 | 超過 80,000 元 |', '| DBR 22 倍上限 | 80,000 × 22 | 1,760,000 元 |', '| 房貸月付 1/5 線 | 80,000 ÷ 5 | 16,000 元 |', '約 26,667 元']) assert.ok(dti.includes(text), text);
  assert.equal(80000 * 22, 1760000); assert.equal(Math.round(80000 / 3), 26667);
});

test('true-cost guide: yearly and five-year holding cost, petrol 1,800cc vs EV 200 HP (county-exempt) vs 1,200 TPASS', () => {
  const base = { takeHome: 90000, livingCosts: 40000, savingsTarget: 10000, downPayment: 200000, aprPct: 3, termMonths: 60, transportCapPct: 15, optionalInsuranceYear: 18000, parkingMonthly: 2500 };
  const p = calculateTwCar({ ...base, drivetrain: 'petrol', cc: 1800, fuelMonthly: 3500, maintenanceMonthly: 1500 });
  const e = calculateTwCar({ ...base, drivetrain: 'ev', hp: 200, evExempt: true, fuelMonthly: 1200, maintenanceMonthly: 1000 });
  assert.deepEqual([p.licenseTax, p.roadFee, p.compulsory, p.fixedYear], [7120, 4800, 1398, 31318]);
  assert.deepEqual([e.licenseTax, e.roadFee, e.compulsory, e.fixedYear], [0, 0, 1398, 19398]);
  const petrolYear = p.fixedYear + 3500 * 12 + 1500 * 12 + 2500 * 12;
  const evYear = e.fixedYear + 1200 * 12 + 1000 * 12 + 2500 * 12;
  const passYear = 1200 * 12;
  assert.deepEqual([petrolYear, evYear, passYear], [121318, 75798, 14400]);
  assert.deepEqual([petrolYear * 5, evYear * 5, passYear * 5], [606590, 378990, 72000]);
  for (const text of ['| 使用牌照稅 | 7,120 | 0 | — |', '| 公路養管費 | 4,800 | 0 | — |', '| 強制險（男性 31–60 歲、第 4 級） | 1,398 | 1,398 | — |', '| 油費／電費 | 42,000 | 14,400 | — |', '| 保養與維修 | 18,000 | 12,000 | — |', '| 停車 | 30,000 | 30,000 | — |', `| **每年合計** | **${f(petrolYear)}** | **${f(evYear)}** | **${f(passYear)}** |`, `| **五年合計（每年金額不變）** | **${f(petrolYear * 5)}** | **${f(evYear * 5)}** | **${f(passYear * 5)}** |`]) assert.ok(car.includes(text), text);
});

test('TPASS brief: three commuter cases, break-even days, annual effect', () => {
  const cases = [
    { name: 'A', fare: 25, days: 22, direct: 1100, delta: -100, be: 24 },
    { name: 'B', fare: 40, days: 22, direct: 1760, delta: 560, be: 15 },
    { name: 'C', fare: 60, days: 20, direct: 2400, delta: 1200, be: 10 },
  ];
  for (const c of cases) {
    const fare = buildModeCost({ name: 'fare', oneWayFare: c.fare, workdays: c.days });
    const pass = buildModeCost({ name: 'pass', monthlyPass: 1200, workdays: c.days });
    assert.equal(fare.direct, c.direct); assert.equal(pass.direct, 1200);
    assert.equal(fare.direct - pass.direct, c.delta);
    assert.equal(Math.ceil(1200 / (c.fare * 2)), c.be);
  }
  for (const text of ['| A：只搭一段捷運 | 25 元 | 22 天 | 1,100 元 | 1,200 元 | 多付 100 元 | 24 天 | 多付 1,200 元 |', '| B：捷運轉公車 | 40 元 | 22 天 | 1,760 元 | 1,200 元 | 省 560 元 | 15 天 | 省 6,720 元 |', '| C：長程雙轉乘 | 60 元 | 20 天 | 2,400 元 | 1,200 元 | 省 1,200 元 | 10 天 | 省 14,400 元 |']) assert.ok(tpass.includes(text), text);
  assert.equal(buildModeCost({ name: 'x', oneWayFare: 30, workdays: 20 }).direct, 1200);
});

test('Taipower brief: summer-extra thresholds and three household cases', () => {
  const diff = (k) => monthlyBill(k, 'summer').total - monthlyBill(k, 'nonSummer').total;
  for (const [target, kwh] of [[50, 293], [100, 389], [300, 640], [500, 825], [1000, 1161]]) {
    assert.ok(diff(kwh) >= target && diff(kwh - 1) < target, `${target}: ${kwh}`);
    assert.ok(power.includes(`| ${f(target)} 元 | ${f(kwh)} 度 | ${f2(diff(kwh))} 元 |`), `threshold ${target}`);
  }
  assert.equal(diff(120), 0);
  for (const [kwh, s, n, d, four] of [[150, 290.1, 281.4, 8.7, 34.8], [350, 825.1, 750.8, 74.3, 297.2], [800, 3067.1, 2595.3, 471.8, 1887.2]]) {
    const sum = monthlyBill(kwh, 'summer').total;
    const non = monthlyBill(kwh, 'nonSummer').total;
    assert.equal(Math.round(sum * 10) / 10, s); assert.equal(Math.round(non * 10) / 10, n);
    assert.equal(Math.round((sum - non) * 10) / 10, d); assert.equal(Math.round((sum - non) * 4 * 10) / 10, four);
    assert.ok(power.includes(`| ${f(kwh)} 度 | ${f1(s)} 元 | ${f1(n)} 元 | ${f1(d)} 元 | ${f1(four)} 元 |`), `case ${kwh}`);
  }
});

test('cashback worked tables use the shared function and the figures the page states', () => {
  const mix = { spends: [12000, 8000, 10000], rates: [0.03, 0.02, 0.012] };
  const at = (k) => evaluateCashback({ fee: 3000, bonus: 0, spends: mix.spends.map((x) => x * k), rates: mix.rates });
  assert.equal(Math.round(at(1).gross), 7680); assert.equal(Math.round(at(1).net), 4680); assert.equal(Math.round(at(1).incremental), 1080);
  assert.equal(Math.round(at(0.5).incremental), -960);
  assert.equal(Math.round(at(1).needed), 22059);
  assert.equal(evaluateCashback({ fee: 1200, bonus: 1000, ...mix }).needed.toFixed(0), '1471');
  assert.equal(evaluateCashback({ fee: 3000, bonus: 5000, ...mix }).needed, 0); // 首刷禮 >= 年費
  assert.equal(evaluateCashback({ fee: 3000, bonus: 0, spends: [10000], rates: [0.01] }).needed, Infinity); // 回饋率不高於 1%
  assert.ok(cashbackPage.includes('https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=G0380055'));
  assert.ok(cashbackPage.includes('https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0380001&flno=47-1'));
});
