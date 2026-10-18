// P2 batch 11 (2026-10-18): the arithmetic behind the zh 時薪、日薪、月薪、年薪換算與加班費 page. Every number printed in
// src/content/growth-tools/zh/salary-converter.md is recomputed here with the same module the page script imports
// (src/lib/twSalaryMath.mjs), looked up in the markdown, and cross-checked with plain arithmetic.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  MIN_WAGE_HOURLY,
  MIN_WAGE_MONTHLY,
  MONTHLY_WAGE_HOURS,
  REST_DAY_TIERS,
  WEEKDAY_TIERS,
  convertSalary,
  convertWithOvertime,
  minimumWageGap,
  monthlyToDaily,
  monthlyToHourly,
  overtimePay,
  restDayOvertimeForVisit,
  weekdayOvertimeForDay,
} from '../src/lib/twSalaryMath.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/salary-converter.md', import.meta.url), 'utf8');
const article = readFileSync(new URL('../src/content/growth-articles/zh/hourly-vs-annual-salary.md', import.meta.url), 'utf8');
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);
const f = (n) => Math.round(n).toLocaleString('en-US');
const f2 = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

test('the built-in constants are exactly the published ones', () => {
  assert.equal(MIN_WAGE_MONTHLY, 29500); // 勞動部 115-01-01
  assert.equal(MIN_WAGE_HOURLY, 196);
  assert.equal(MONTHLY_WAGE_HOURS, 240); // 30 x 8
  assert.deepEqual(WEEKDAY_TIERS.map((t) => [t.upTo, t.multiple]), [[2, 4 / 3], [4, 5 / 3]]);
  assert.deepEqual(REST_DAY_TIERS.map((t) => [t.upTo, t.multiple]), [[2, 4 / 3], [8, 5 / 3], [12, 8 / 3]]);
});

test('勞動部 澄清稿: 月薪 36,000 -> 日薪 1,200 -> 時薪 150', () => {
  assert.equal(monthlyToDaily(36000), 1200);
  assert.equal(monthlyToHourly(36000), 150);
  assert.equal(36000 / 30 / 8, 150);
  assert.equal(36000 / 240, 150);
});

test("勞動部 月薪制加班費試算系統 prints 36000/240*4/3*6 = 1200 and 36000/240*4/3*2 = 400; the module reproduces both", () => {
  near((36000 / 240) * (4 / 3) * 6, 1200);
  near((36000 / 240) * (4 / 3) * 2, 400);
  // 6 weekday overtime hours inside the first tier of three days of 2 hours
  near(overtimePay({ hourlyWage: 150, weekdayHoursPerDay: 2, weekdayDays: 3 }).total, 1200);
  near(overtimePay({ hourlyWage: 150, restDayHoursPerVisit: 2, restDayVisits: 1 }).total, 400);
});

test('算例一: 月薪 36,000', () => {
  const r = convertSalary({ basis: 'monthly', amount: 36000 });
  assert.equal(r.daily, 1200);
  assert.equal(r.hourly, 150);
  assert.equal(r.annualGross, 432000);
  for (const text of ['| 日薪 | 36,000 ÷ 30 | 1,200 元 |', '| 平日每小時工資額 | 1,200 ÷ 8 | 150 元 |', '| 年薪（12 個月，不含年終、加班） | 36,000 × 12 | 432,000 元 |']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例二 (the calculator defaults): 月薪 36,000, 平日 10 天 x 3 小時, 休息日 1 次 x 10 小時, 無年終', () => {
  const r = convertWithOvertime({ basis: 'monthly', amount: 36000, bonusMonths: 0, weekdayHoursPerDay: 3, weekdayDays: 10, restDayHoursPerVisit: 10, restDayVisits: 1 });
  near(weekdayOvertimeForDay(150, 3), 650);
  near(150 * (4 / 3) * 2 + 150 * (5 / 3) * 1, 650);
  near(r.overtime.weekday, 6500);
  near(restDayOvertimeForVisit(150, 10), 2700);
  near(150 * (4 / 3) * 2 + 150 * (5 / 3) * 6 + 150 * (8 / 3) * 2, 2700);
  near(r.overtime.restDay, 2700);
  near(r.overtime.total, 9200);
  near(r.monthlyWithOvertime, 45200);
  assert.equal(r.overtime.hours, 40);
  assert.equal(r.overtime.overMonthLimit, false);
  near(r.annualWithOvertime, 542400);
  for (const text of [
    '| 平日單日加班費 | 150 × 4/3 × 2 + 150 × 5/3 × 1 = 400 + 250 | 650 元 |',
    '| 平日加班費（10 天） | 650 × 10 | 6,500 元 |',
    '| 休息日出勤 10 小時 | 150 × 4/3 × 2 + 150 × 5/3 × 6 + 150 × 8/3 × 2 = 400 + 1,500 + 800 | 2,700 元 |',
    '| 當月加班費 | 6,500 + 2,700 | 9,200 元 |',
    '| 含加班的當月收入 | 36,000 + 9,200 | 45,200 元 |',
    '| 當月加班時數 | 3 × 10 + 10 | 40 小時，未超過 46 小時 |',
    '| 全年（每月同樣加班、無年終） | 45,200 × 12 | 542,400 元 |',
  ]) {
    assert.ok(md.includes(text), text);
  }
});

test('算例三: 月薪 29,500 (基本工資)', () => {
  const r = convertSalary({ basis: 'monthly', amount: 29500 });
  near(r.daily, 983.3333333333334);
  near(r.hourly, 122.91666666666667);
  assert.equal(r.belowFloor, false);
  assert.equal(r.floorGap, 0);
  near(weekdayOvertimeForDay(r.hourly, 2), 327.7777777777777);
  near(weekdayOvertimeForDay(r.hourly, 2) * 10, 3277.777777777778);
  for (const text of ['| 日薪 | 29,500 ÷ 30 | 983.33 元 |', '| 平日每小時工資額 | 29,500 ÷ 30 ÷ 8 | 122.92 元 |', '| 平日加班 2 小時 | 122.9167 × 4/3 × 2 | 327.78 元 |', '| 一個月 10 天 | 327.78 × 10 | 約 3,278 元 |']) {
    assert.ok(md.includes(text), text);
  }
  assert.equal(f(weekdayOvertimeForDay(r.hourly, 2) * 10), '3,278');
});

test('算例四: 時薪 196, 每日 8 小時 x 每週 5 天 x 52 週', () => {
  const r = convertSalary({ basis: 'hourly', amount: 196, hoursPerDay: 8, daysPerWeek: 5, weeks: 52 });
  assert.equal(r.daily, 1568);
  assert.equal(r.annualGross, 407680);
  near(r.monthly, 33973.333333333336);
  assert.equal(r.weeklyHours, 40);
  assert.equal(r.belowFloor, false);
  near(weekdayOvertimeForDay(196, 3), 849.3333333333333);
  near(restDayOvertimeForVisit(196, 4), 1176);
  assert.equal(196 * 8, 1568);
  assert.equal(1568 * 5 * 52, 407680);
  for (const text of ['| 日薪 | 196 × 8 | 1,568 元 |', '| 年薪（不含加班與年終） | 1,568 × 5 × 52 | 407,680 元 |', '| 月平均 | 407,680 ÷ 12 | 33,973.33 元 |', '| 平日加班 3 小時 | 196 × 4/3 × 2 + 196 × 5/3 × 1 | 849.33 元 |', '| 休息日出勤 4 小時 | 196 × 4/3 × 2 + 196 × 5/3 × 2 | 1,176 元 |']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例五: 年薪 540,000, 契約 13.5 個月', () => {
  const r = convertSalary({ basis: 'annual', amount: 540000, paymentMonths: 13.5 });
  assert.equal(r.monthly, 40000);
  near(r.daily, 1333.3333333333333);
  near(r.hourly, 166.66666666666666);
  assert.equal(r.annualGross, 540000);
  assert.equal(13.5 - 12, 1.5);
  assert.equal(40000 * 1.5, 60000);
  for (const text of ['| 月薪 | 540,000 ÷ 13.5 | 40,000 元 |', '| 日薪 | 40,000 ÷ 30 | 1,333.33 元 |', '| 平日每小時工資額 | 40,000 ÷ 240 | 166.67 元 |', '| 超出 12 個月的部分 | 13.5 − 12 = 1.5 個月 | 60,000 元（要看契約怎麼約定，不是法定） |']) {
    assert.ok(md.includes(text), text);
  }
});

test('實際工時時薪: 月薪 36,000 -> 每週 40 小時 207.69, 48 小時 173.08; 時薪制等於時薪', () => {
  const a = convertSalary({ basis: 'monthly', amount: 36000 });
  near(a.effectiveHourly, 432000 / 2080);
  assert.equal(f2(a.effectiveHourly), '207.69');
  const b = convertSalary({ basis: 'monthly', amount: 36000, compareWeeklyHours: 48 });
  near(b.effectiveHourly, 432000 / 2496);
  assert.equal(f2(b.effectiveHourly), '173.08');
  assert.equal(40 * 52, 2080);
  assert.equal(48 * 52, 2496);
  near(convertSalary({ basis: 'hourly', amount: 196 }).effectiveHourly, 196);
  near(convertSalary({ basis: 'daily', amount: 1600, hoursPerDay: 8 }).effectiveHourly, 200);
  assert.ok(md.includes('每週 40 小時是 432,000 ÷ 2,080 = 207.69 元，每週 48 小時是 432,000 ÷ 2,496 = 173.08 元'));
  assert.ok(md.includes('`實際工時時薪 = 年薪 ÷（每週實際工時 × 52 週）`'));
  for (const text of ['月薪 36,000 元，日薪 1,200 元，時薪 150 元', '每週 40 小時是 432,000 ÷ 2,080 = 207.69 元', '每週 48 小時是 432,000 ÷ 2,496 = 173.08 元']) assert.ok(article.includes(text), text);
});

test('算例六: 時薪 180, 每日 4 小時 x 5 天 x 52 週 -> 低於 196', () => {
  const r = convertSalary({ basis: 'hourly', amount: 180, hoursPerDay: 4, daysPerWeek: 5, weeks: 52 });
  assert.equal(r.annualGross, 187200);
  assert.equal(r.monthly, 15600);
  assert.equal(r.belowFloor, true);
  assert.equal(r.floorGap, -16);
  assert.equal(180 * 4 * 5 * 52, 187200);
  assert.ok(md.includes('年薪 180 × 4 × 5 × 52 = 187,200 元，月平均 15,600 元'));
});

test('日薪制: 日薪 = 196 x 工時 is exactly the floor; below it is flagged; weekly hours over 40 warn', () => {
  assert.equal(convertSalary({ basis: 'daily', amount: 196 * 8 }).belowFloor, false);
  assert.equal(convertSalary({ basis: 'daily', amount: 196 * 8 - 1 }).belowFloor, true);
  assert.equal(convertSalary({ basis: 'daily', amount: 196 * 4, hoursPerDay: 4 }).belowFloor, false); // 4 小時的日薪 784
  const six = convertSalary({ basis: 'hourly', amount: 200, hoursPerDay: 8, daysPerWeek: 6 });
  assert.deepEqual(six.warnings, ['weeklyHoursOver40']);
  assert.deepEqual(convertSalary({ basis: 'hourly', amount: 200 }).warnings, []);
});

test('minimum wage lines: the monthly floor is exactly 29,500 and the hourly floor exactly 196', () => {
  assert.equal(minimumWageGap({ kind: 'monthly', amount: 29500 }).below, false);
  assert.equal(minimumWageGap({ kind: 'monthly', amount: 29499 }).below, true);
  assert.equal(minimumWageGap({ kind: 'hourly', amount: 196 }).below, false);
  assert.equal(minimumWageGap({ kind: 'hourly', amount: 195.99 }).below, true);
});

test('換算對照表: every row of the table', () => {
  for (const monthly of [29500, 32000, 36000, 40000, 50000, 60000]) {
    const r = convertSalary({ basis: 'monthly', amount: monthly });
    const row = `| ${f(monthly)} | ${f2(r.daily)} | ${f2(r.hourly)} | ${f2((r.hourly * 4) / 3)} | ${f2((r.hourly * 5) / 3)} | ${f(r.annualGross)} |`;
    assert.ok(md.includes(row), row);
  }
});

test('overtime limits: 46 / 54 hours, 4 weekday hours, 12 rest-day hours', () => {
  assert.equal(overtimePay({ hourlyWage: 150, weekdayHoursPerDay: 2, weekdayDays: 23 }).overMonthLimit, false); // 46
  assert.equal(overtimePay({ hourlyWage: 150, weekdayHoursPerDay: 2, weekdayDays: 24 }).overMonthLimit, true); // 48
  assert.equal(overtimePay({ hourlyWage: 150, weekdayHoursPerDay: 2, weekdayDays: 24 }).overConsentLimit, false);
  assert.equal(overtimePay({ hourlyWage: 150, weekdayHoursPerDay: 2, weekdayDays: 28 }).overConsentLimit, true); // 56
  assert.throws(() => weekdayOvertimeForDay(150, 4.5), RangeError);
  assert.throws(() => restDayOvertimeForVisit(150, 12.5), RangeError);
  near(restDayOvertimeForVisit(150, 12), 150 * (8 / 3 + 10 + 32 / 3));
  // 休息日 hours count toward the monthly total (勞基法 第 36 條)
  const mixed = overtimePay({ hourlyWage: 150, weekdayHoursPerDay: 2, weekdayDays: 20, restDayHoursPerVisit: 8, restDayVisits: 1 });
  assert.equal(mixed.hours, 48);
  assert.equal(mixed.overMonthLimit, true);
});

test('Excel formulas on the page match the module', () => {
  const B2 = 150;
  const weekday = (h) => B2 * ((4 / 3) * Math.min(h, 2) + (5 / 3) * Math.max(0, Math.min(h, 4) - 2));
  const rest = (h) => B2 * ((4 / 3) * Math.min(h, 2) + (5 / 3) * Math.max(0, Math.min(h, 8) - 2) + (8 / 3) * Math.max(0, h - 8));
  for (const h of [0, 1, 2, 2.5, 3, 4]) near(weekday(h), weekdayOvertimeForDay(150, h));
  for (const h of [0, 1, 2, 5, 8, 9, 10, 12]) near(rest(h), restDayOvertimeForVisit(150, h));
  near(weekday(3), 650);
  near(rest(10), 2700);
  assert.ok(md.includes('`=B2*(4/3*MIN(h,2)+5/3*MAX(0,MIN(h,4)-2))`'));
  assert.ok(md.includes('`=B2*(4/3*MIN(h,2)+5/3*MAX(0,MIN(h,8)-2)+8/3*MAX(0,h-8))`'));
  assert.ok(md.includes('150 × (4/3 × 2 + 5/3 × 1) = 650'));
});

test('bad input is rejected, not guessed', () => {
  assert.throws(() => convertSalary({ basis: 'monthly', amount: 0 }), RangeError);
  assert.throws(() => convertSalary({ basis: 'monthly', amount: -1 }), RangeError);
  assert.throws(() => convertSalary({ basis: 'hourly', amount: 200, hoursPerDay: 9 }), RangeError);
  assert.throws(() => convertSalary({ basis: 'weekly', amount: 1 }), RangeError);
  assert.throws(() => convertSalary({ basis: 'monthly', amount: 'abc' }), RangeError);
});

test('page never claims a legal year-end bonus and has no FAQPage / HowTo / US overtime terms', () => {
  assert.ok(md.includes('年終獎金不是法定項目'));
  assert.ok(!/FAQPage|HowTo/.test(md));
  assert.ok(!/1\.5\s*倍|時薪制.*FLSA|\$/.test(md));
  assert.equal(convertSalary({ basis: 'monthly', amount: 36000 }).bonus, 0); // bonusMonths defaults to 0
});
