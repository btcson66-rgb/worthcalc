// P2 batch 6 (2026-10-17): the arithmetic behind the Taiwan scenarios on /zh/true-hourly-wage-after-commuting-work-expenses/.
// The page computes every figure with src/lib/twHourlyWageMath.mjs; this file pins that module to the calculator's own formula
// (read from DecisionMathCalculator.astro), recomputes the examples by hand, and checks the sources the page cites.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MIN_WAGE_HOURLY, MIN_WAGE_MONTHLY, commuteHoursFor, surfaceHourly, trueHourly, weekdayOvertimePay } from '../src/lib/twHourlyWageMath.mjs';

const page = readFileSync(new URL('../src/pages/[locale]/true-hourly-wage-after-commuting-work-expenses.astro', import.meta.url), 'utf8');
const component = readFileSync(new URL('../src/components/DecisionMathCalculator.astro', import.meta.url), 'utf8');
const guides = readFileSync(new URL('../src/data/decisionGuides.ts', import.meta.url), 'utf8');
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

test('trueHourly is the formula DecisionMathCalculator runs, including the 1-hour floor on the divisor', () => {
  assert.ok(component.includes("const hours = value('paidHours') + value('unpaidHours') + value('commuteHours');"));
  assert.ok(component.includes("first = (value('takeHomePay') - value('workCosts')) / Math.max(1, hours);"));
  assert.ok(component.includes("second = value('grossPay') / Math.max(1, value('paidHours'));"));
  assert.equal(trueHourly({ takeHome: 100, workCosts: 40, paidHours: 0, unpaidHours: 0, commuteHours: 0 }), 60);
  assert.equal(surfaceHourly({ grossPay: 90, paidHours: 0 }), 90);
  near(trueHourly({ takeHome: 52000, workCosts: 5000, paidHours: 160, unpaidHours: 8, commuteHours: 22 }), 47000 / 190);
});

test('the guide example already on the page (NT$60,000 / 52,000 / 5,000, 160 + 8 + 22 hours) is unchanged: 375.00 and 247.37', () => {
  assert.equal(surfaceHourly({ grossPay: 60000, paidHours: 160 }).toFixed(2), '375.00');
  assert.equal(trueHourly({ takeHome: 52000, workCosts: 5000, paidHours: 160, unpaidHours: 8, commuteHours: 22 }).toFixed(2), '247.37');
  assert.equal(trueHourly({ takeHome: 52000, workCosts: 5000, paidHours: 160, unpaidHours: 20, commuteHours: 22 }).toFixed(2), '232.67');
  assert.equal(trueHourly({ takeHome: 52000, workCosts: 5000, paidHours: 160, unpaidHours: 8, commuteHours: 10 }).toFixed(2), '264.04');
});

test('勞動部 115 年最低工資: 29,500 / 月, 196 / 小時', () => {
  assert.equal(MIN_WAGE_MONTHLY, 29500);
  assert.equal(MIN_WAGE_HOURLY, 196);
  for (const text of ['每月最低工資 {n0(MIN_WAGE_MONTHLY)} 元、每小時最低工資 {MIN_WAGE_HOURLY} 元', '只指正常工作時間內的報酬', '每週正常工時不超過 40 小時']) assert.ok(page.includes(text), text);
});

test('情境一: 時薪 196、每天 4 小時 x 22 天 = 88 小時 = 17,248; 通勤 22 小時、2,200 元 -> 136.80', () => {
  assert.equal(22 * 4, 88);
  assert.equal(196 * 88, 17248);
  assert.equal(commuteHoursFor({ roundTripHoursPerDay: 1, days: 22 }), 22);
  assert.equal(100 * 22, 2200);
  const t = trueHourly({ takeHome: 17248, workCosts: 2200, paidHours: 88, commuteHours: 22 });
  assert.equal(t.toFixed(2), '136.80');
  assert.equal(17248 - 2200, 15048);
  assert.equal(88 + 22, 110);
  assert.equal(Math.round(196 - t), 59);
  assert.ok(page.includes('const s1 = { days: 22, shift: 4, trip: 1, tripCost: 100 };'));
});

test('情境二: 月薪 29,500、160 小時、通勤 33 小時、2,640 元 -> 表面 184.38, 真實 139.17', () => {
  assert.equal(commuteHoursFor({ roundTripHoursPerDay: 1.5, days: 22 }), 33);
  assert.equal(120 * 22, 2640);
  assert.equal(surfaceHourly({ grossPay: 29500, paidHours: 160 }).toFixed(2), '184.38');
  assert.equal(trueHourly({ takeHome: 29500, workCosts: 2640, paidHours: 160, commuteHours: 33 }).toFixed(2), '139.17');
  assert.equal(29500 - 2640, 26860);
  assert.equal(160 + 33, 193);
  assert.ok(page.includes('const s2 = { days: 22, trip: 1.5, tripCost: 120, paid: 160 };'));
});

test('情境三: 勞基法 §24 weekday overtime -- 250 x 2 x 4/3 x 4 days = 2,667; the default example moves from 247.37 to 261.40', () => {
  near(weekdayOvertimePay({ hourlyWage: 250, hoursPerDay: 2, days: 4 }), 8000 / 3, 1e-9);
  assert.equal(Math.round(weekdayOvertimePay({ hourlyWage: 250, hoursPerDay: 2, days: 4 })), 2667);
  // beyond the first two hours the minimum is 5/3
  near(weekdayOvertimePay({ hourlyWage: 250, hoursPerDay: 4 }), 250 * 2 * (4 / 3) + 250 * 2 * (5 / 3));
  assert.equal(weekdayOvertimePay({ hourlyWage: 250, hoursPerDay: 0, days: 5 }), 0);
  assert.throws(() => weekdayOvertimePay({ hourlyWage: 250, hoursPerDay: 5 }), RangeError);
  const base = { takeHome: 52000, workCosts: 5000, paidHours: 160, unpaidHours: 8, commuteHours: 22 };
  const pay = weekdayOvertimePay({ hourlyWage: 250, hoursPerDay: 2, days: 4 });
  assert.equal(trueHourly({ ...base, takeHome: base.takeHome + pay }).toFixed(2), '261.40');
  assert.equal(trueHourly(base).toFixed(2), '247.37');
});

test('sources: 勞基法 §24 and §30, 最低工資 pages, all dated 2026-10-17 in the guide; TPASS price is not quoted; no FAQPage/HowTo', () => {
  const zhGuide = guides.slice(guides.indexOf('export const trueHourlyWageGuides'), guides.indexOf('export const raiseInflationGuides'));
  const zhPart = zhGuide.slice(zhGuide.indexOf('  zh: {'));
  for (const url of [
    'https://www.mol.gov.tw/1607/28162/28166/28180/70460/76761/76833/post',
    'https://www.mol.gov.tw/1607/28690/2282/2284/2290/7121/post',
    'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=24',
    'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=30',
    'https://www.mol.gov.tw/1607/28162/28166/28218/28226/30382/post',
    'https://www.mol.gov.tw/1607/28690/2282/2284/2290/7168/post',
  ]) assert.ok(zhPart.includes(url), url);
  assert.ok(zhPart.includes("lastVerified: '2026-10-17'"));
  assert.ok(page.includes('TPASS 官網 2026-10-17 回傳空白頁，本頁沒有重新引用票價'));
  assert.ok(!/TPASS[^。]{0,20}\d{3,4}\s*元/.test(page));
  assert.ok(!/FAQPage|HowTo/.test(page));
  assert.ok(page.includes('試算僅供參考，以機關公告為準'));
});
