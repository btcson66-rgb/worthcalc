// 2027 (116-01-01) minimum wage page and calculator switch (2026-11-20).
// The expected numbers below are the ones printed on the issuing agencies' own pages, typed in by hand, NOT read back from
// the code under test:
//   勞動部 歷年最低工資/基本工資調整: 「民國115年10月16日發布，自116年1月1日起實施，訂定每月最低工資為30,900元，每小時最低工資為205元。」
//   勞動部 新聞稿 (2026-09-24): 每月 29,500 -> 30,900, 調升 1,400 元, 調幅 4.745%; 每小時 196 -> 205.
//   勞保局 (2026-11-17): 116-01-01 起勞工保險投保薪資第 1 級 30,900 元, 原第 2 級 30,300 元刪除, 其餘金額未修正; 勞保費率 13% (含就保 1%),
//   即普通事故 12%。分級表 PDF (勞動部勞動保 2 字第 1150092891 號令): 30,900 / 31,800 / 33,300 / 34,800 / 36,300 / 38,200 / 40,100 / 42,000 / 43,900 / 45,800。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  MIN_WAGE_HOURLY,
  MIN_WAGE_HOURLY_2027,
  MIN_WAGE_MONTHLY,
  MIN_WAGE_MONTHLY_2027,
  convertSalary,
  minimumWageAsOf,
  minimumWageGap,
} from '../src/lib/twSalaryMath.mjs';

const brief = readFileSync(new URL('../src/content/money-briefs/zh/minimum-wage-2027.md', import.meta.url), 'utf8');
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);
const f2 = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

test('the 2027 constants are the official figures; the 2026 constants are untouched', () => {
  assert.equal(MIN_WAGE_MONTHLY_2027, 30900);
  assert.equal(MIN_WAGE_HOURLY_2027, 205);
  assert.equal(MIN_WAGE_MONTHLY, 29500);
  assert.equal(MIN_WAGE_HOURLY, 196);
  assert.equal(MIN_WAGE_MONTHLY_2027 - MIN_WAGE_MONTHLY, 1400); // 勞動部: 調升 1,400 元
  assert.equal(MIN_WAGE_HOURLY_2027 - MIN_WAGE_HOURLY, 9);
  near(((30900 - 29500) / 29500) * 100, 4.745, 0.001); // 勞動部: 調幅 4.745%
});

test('minimumWageAsOf switches on 2027-01-01 and never before', () => {
  assert.deepEqual(minimumWageAsOf('2026-12-31'), { year: 115, monthly: 29500, hourly: 196 });
  assert.deepEqual(minimumWageAsOf('2027-01-01'), { year: 116, monthly: 30900, hourly: 205 });
  assert.deepEqual(minimumWageAsOf('2027-06-15'), { year: 116, monthly: 30900, hourly: 205 });
  assert.deepEqual(minimumWageAsOf(undefined), { year: 115, monthly: 29500, hourly: 196 });
  assert.deepEqual(minimumWageAsOf('not a date'), { year: 115, monthly: 29500, hourly: 196 });
});

test('the floor check uses the figure in force on the date given', () => {
  assert.equal(minimumWageGap({ kind: 'monthly', amount: 30000, asOf: '2026-12-31' }).below, false);
  const m = minimumWageGap({ kind: 'monthly', amount: 30000, asOf: '2027-01-01' });
  assert.equal(m.below, true);
  assert.equal(m.floor, 30900);
  assert.equal(m.floorYear, 116);
  assert.equal(minimumWageGap({ kind: 'monthly', amount: 30900, asOf: '2027-01-01' }).below, false);
  assert.equal(minimumWageGap({ kind: 'hourly', amount: 204.99, asOf: '2027-01-01' }).below, true);
  assert.equal(minimumWageGap({ kind: 'hourly', amount: 205, asOf: '2027-01-01' }).below, false);
  assert.equal(minimumWageGap({ kind: 'hourly', amount: 196, asOf: '2027-01-01' }).below, true);
  assert.equal(convertSalary({ basis: 'monthly', amount: 30900, asOf: '2027-01-01' }).belowFloor, false);
  assert.equal(convertSalary({ basis: 'hourly', amount: 200, asOf: '2027-01-01' }).belowFloor, true);
  assert.equal(convertSalary({ basis: 'hourly', amount: 200, asOf: '2026-12-31' }).belowFloor, false);
});

test('the brief prints the official figures', () => {
  for (const text of [
    '每月最低工資由 29,500 元調為 30,900 元',
    '每小時最低工資由 196 元調為 205 元',
    '115 年 10 月 16 日發布',
    '自 116 年 1 月 1 日',
    '多 1,400 元（調幅 4.745%）',
    '勞工保險投保薪資第 1 級 | 29,500 元 | **30,900 元**',
    '原第 2 級 30,300 元',
    '**13%**',
    '31,800、33,300、34,800、36,300、38,200、40,100、42,000、43,900、45,800 元',
    '30,900 × 12% = 3,708 元',
    '30,900 ×  1% =   309 元',
  ]) assert.ok(brief.includes(text), text);
});

test('every overtime figure on the brief is recomputed from the official wage', () => {
  const base27 = 30900 / 30 / 8;
  const base26 = 29500 / 30 / 8;
  near(base27, 128.75);
  assert.ok(brief.includes(`| 日薪 ÷ 8 = 平日每小時工資額 | ${f2(base26)} 元 | ${f2(base27)} 元 |`));
  assert.ok(brief.includes('| 月薪 ÷ 30 = 日薪 | 983.33 元 | 1,030 元 |'));
  const weekday3 = (h) => h * (4 / 3) * 2 + h * (5 / 3);
  const restDay4 = (h) => h * (4 / 3) * 2 + h * (5 / 3) * 2;
  assert.ok(brief.includes(`= ${f2(weekday3(base27))} 元`));
  assert.ok(brief.includes(`= ${f2(weekday3(base26))} 元`));
  assert.ok(brief.includes(`= ${f2(restDay4(base27))} 元`));
  assert.ok(brief.includes(`= ${f2(restDay4(base26))} 元`));
  assert.ok(brief.includes(`| 平日加班 3 小時 | 205 × 4/3 × 2 + 205 × 5/3 × 1 | ${f2(weekday3(205))} 元 |`));
  assert.ok(brief.includes(`| 休息日出勤 4 小時 | 205 × 4/3 × 2 + 205 × 5/3 × 2 | ${restDay4(205).toLocaleString('en-US')} 元 |`));
  assert.ok(brief.includes(`| 每日 8 小時的日薪 | 205 × 8 | ${(205 * 8).toLocaleString('en-US')} 元 |`));
  assert.ok(brief.includes(`| ${f2((205 * 8 * 5 * 52) / 12)} 元 |`));
});
