// P2 batch 1 (2026-10-16): the arithmetic behind the 勞退試算 and 勞保老年年金試算
// pages. The expected numbers are the ones printed in the two money briefs; a
// change to either side fails here.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  PENSION_WAGE_TABLE, contributionWage, monthlyContribution, accumulate, levelPayout,
  statutoryClaimAge, oldAgeAnnuity, oldAgeLumpSumUnder15, onceClaimOldAge,
} from '../src/lib/twLaborMath.mjs';

const round = (n) => Math.round(n);

test('wage table: 62 contiguous grades, grade wage equals the band top, last grade is 150,000', () => {
  assert.equal(PENSION_WAGE_TABLE.length, 62);
  PENSION_WAGE_TABLE.forEach(([level, low, high, wage], index) => {
    assert.equal(level, index + 1);
    if (index > 0) assert.equal(low, PENSION_WAGE_TABLE[index - 1][2] + 1);
    if (high !== null) assert.equal(wage, high);
  });
  assert.equal(PENSION_WAGE_TABLE[61][3], 150000);
});

test('the brief prints the whole table; every row matches the data', () => {
  const md = readFileSync(new URL('../src/content/money-briefs/zh/labor-pension-contribution-wage-table.md', import.meta.url), 'utf8');
  for (const [level, low, high, wage] of PENSION_WAGE_TABLE) {
    const fmt = (n) => n.toLocaleString('en-US');
    const band = low === 0 ? `${fmt(high)} 以下` : high === null ? `${fmt(low)} 以上` : `${fmt(low)}–${fmt(high)}`;
    const six = wage * 0.06;
    const sixText = Number.isInteger(six) ? fmt(six) : String(Number(six.toFixed(2))).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const row = `| ${level} | ${band} | ${fmt(wage)} | ${sixText} |`;
    assert.ok(md.includes(row), `missing or wrong row: ${row}`);
  }
});

test('contributionWage picks the grade at the band edges', () => {
  assert.deepEqual(contributionWage(45000), { level: 35, low: 43901, high: 45800, contribution: 45800 });
  assert.equal(contributionWage(43900).contribution, 43900);
  assert.equal(contributionWage(43901).contribution, 45800);
  assert.equal(contributionWage(45800).contribution, 45800);
  assert.equal(contributionWage(45801).contribution, 48200);
  assert.equal(contributionWage(200000).contribution, 150000);
  assert.equal(contributionWage(0).contribution, 1500);
});

test('employer rate is clamped to the legal floor, self rate to 0-6%', () => {
  const c = monthlyContribution({ actualWage: 45000, employerRate: 0.03, selfRate: 0.09 });
  assert.equal(c.employerRate, 0.06);
  assert.equal(c.selfRate, 0.06);
  assert.equal(c.employerMonthly, 2748);
  assert.equal(c.selfMonthly, 2748);
});

test('example 1: 45,000 / 6% / 30 years', () => {
  const c = monthlyContribution({ actualWage: 45000 });
  assert.equal(c.employerMonthly, 2748);
  const at = (rate) => accumulate({ totalMonthly: c.totalMonthly, years: 30, annualReturnPct: rate });
  assert.equal(at(0).principal, 989280);
  assert.equal(round(at(0).balance), 989280);
  assert.equal(round(at(2).earnings), 360712);
  assert.equal(round(at(2).balance), 1349992);
  assert.equal(round(at(4).earnings), 893844);
  assert.equal(round(at(4).balance), 1883124);
  assert.equal(round(at(7.64).earnings), 2629247);
  assert.equal(round(at(7.64).balance), 3618527);
  assert.equal(round(levelPayout({ balance: at(0).balance, payoutYears: 20, annualRatePct: 1.1473 })), 4612);
  assert.equal(round(levelPayout({ balance: at(2).balance, payoutYears: 20, annualRatePct: 1.1473 })), 6294);
  assert.equal(round(levelPayout({ balance: at(4).balance, payoutYears: 20, annualRatePct: 1.1473 })), 8780);
  assert.equal(round(levelPayout({ balance: at(7.64).balance, payoutYears: 20, annualRatePct: 1.1473 })), 16871);
});

test('example 2: 60,000 / employer 6% + self 6% / 20 years', () => {
  const both = monthlyContribution({ actualWage: 60000, selfRate: 0.06 });
  assert.equal(both.level, 41);
  assert.equal(both.contribution, 60800);
  assert.equal(both.employerMonthly, 3648);
  assert.equal(both.selfMonthly, 3648);
  assert.equal(both.totalMonthly, 7296);
  const empOnly = monthlyContribution({ actualWage: 60000 });
  assert.equal(accumulate({ totalMonthly: empOnly.totalMonthly, years: 20, annualReturnPct: 0 }).principal, 875520);
  assert.equal(round(accumulate({ totalMonthly: empOnly.totalMonthly, years: 20, annualReturnPct: 7.64 }).balance), 1991671);
  assert.equal(accumulate({ totalMonthly: both.totalMonthly, years: 20, annualReturnPct: 0 }).principal, 1751040);
  assert.equal(round(accumulate({ totalMonthly: both.totalMonthly, years: 20, annualReturnPct: 7.64 }).balance), 3983341);
});

test('under-reporting one grade: 43,900 vs 45,800', () => {
  const low = monthlyContribution({ actualWage: 43900 }).employerMonthly;
  assert.equal(low, 2634);
  assert.equal(2748 - low, 114);
  assert.equal(114 * 12, 1368);
  assert.equal(114 * 12 * 30, 41040);
});

test('Excel FV in the brief equals accumulate (2%, 360 months, 2,748)', () => {
  const i = Math.pow(1.02, 1 / 12) - 1;
  const fv = 2748 * (Math.pow(1 + i, 360) - 1) / i;
  assert.equal(round(fv), 1349992);
});

test('statutory claim age by birth year follows the Bureau table', () => {
  assert.equal(statutoryClaimAge(40), 60);
  assert.equal(statutoryClaimAge(46), 60);
  assert.equal(statutoryClaimAge(47), 61);
  assert.equal(statutoryClaimAge(48), 62);
  assert.equal(statutoryClaimAge(49), 63);
  assert.equal(statutoryClaimAge(50), 64);
  assert.equal(statutoryClaimAge(51), 65);
  assert.equal(statutoryClaimAge(52), 65);
  assert.equal(statutoryClaimAge(80), 65);
});

test('old-age annuity: formulas A and B, take the higher', () => {
  const r = oldAgeAnnuity({ avgSalary: 45800, serviceMonths: 360, birthYearRoc: 60, claimAgeMonths: 65 * 12 });
  assert.equal(round(r.formulaA * 10) / 10, 13648.5);
  assert.equal(round(r.formulaB), 21297);
  assert.equal(r.usedFormula, 'B');
  assert.equal(round(r.monthly), 21297);
  assert.equal(r.adjustment, 0);
  const short = oldAgeAnnuity({ avgSalary: 20000, serviceMonths: 180, birthYearRoc: 60, claimAgeMonths: 65 * 12 });
  assert.equal(short.usedFormula, 'A'); // 20000 x 15 x 0.775% + 3000 = 5325 > 4650
  assert.equal(round(short.monthly), 5325);
  // crossover: salary x years below 3000 / 0.775% = 387,096.77
  assert.equal(oldAgeAnnuity({ avgSalary: 25806, serviceMonths: 180, birthYearRoc: 60 }).usedFormula, 'A');
  assert.equal(oldAgeAnnuity({ avgSalary: 25807, serviceMonths: 180, birthYearRoc: 60 }).usedFormula, 'B');
});

test('old-age annuity: early claim reduces 4% a year (max 20%), delay adds 4% a year (max 20%)', () => {
  const base = { avgSalary: 45800, serviceMonths: 360, birthYearRoc: 60 };
  const at = (age, months = 0) => oldAgeAnnuity({ ...base, claimAgeMonths: age * 12 + months });
  assert.equal(at(60).adjustment, -0.2);
  assert.equal(round(at(60).monthly), 17038); // 21297 x 0.8 = 17037.6
  assert.equal(at(63).adjustment, -0.08);
  assert.equal(round(at(63).monthly), 19593); // 21297 x 0.92 = 19593.24
  assert.equal(round(at(64, 6).adjustment * 1000) / 1000, -0.02); // 6 months early = 2%
  assert.equal(at(65).adjustment, 0);
  assert.equal(round(at(67).monthly), 23001); // 21297 x 1.08 = 23000.76
  assert.equal(at(70).adjustment, 0.2);
  assert.equal(at(72).adjustment, 0.2); // capped
  assert.equal(at(59).status, 'tooEarly');
  assert.equal(oldAgeAnnuity({ ...base, serviceMonths: 179, claimAgeMonths: 65 * 12 }).status, 'under15');
});

test('lump sums: <15 years and the pre-1998 once-claim option', () => {
  assert.equal(round(oldAgeLumpSumUnder15({ avgSalary: 30000, serviceMonths: 120 })), 300000);
  assert.equal(onceClaimOldAge({ avgSalary: 45800, serviceMonths: 240 }).payMonths, 25);
  assert.equal(onceClaimOldAge({ avgSalary: 45800, serviceMonths: 240 }).amount, 1145000);
  assert.equal(onceClaimOldAge({ avgSalary: 45800, serviceMonths: 360 }).payMonths, 45);
  assert.equal(onceClaimOldAge({ avgSalary: 45800, serviceMonths: 360 }).amount, 2061000);
  assert.equal(onceClaimOldAge({ avgSalary: 45800, serviceMonths: 420 }).payMonths, 45); // 15 + 2 x 20 = 55, capped
});

test('the old-age brief prints the numbers the calculator produces', () => {
  const md = readFileSync(new URL('../src/content/money-briefs/zh/labor-insurance-old-age-lump-sum-vs-annuity.md', import.meta.url), 'utf8');
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  const base = { avgSalary: 45800, serviceMonths: 360, birthYearRoc: 60 };
  for (const age of [60, 61, 62, 63, 64, 65, 67, 70]) {
    const r = oldAgeAnnuity({ ...base, claimAgeMonths: age * 12 });
    assert.ok(md.includes(`${fmt(r.monthly)} 元 | ${fmt(r.monthly * 12)} 元 |`), `age ${age}: ${fmt(r.monthly)} / ${fmt(r.monthly * 12)}`);
  }
  for (const years of [15, 20, 25, 30, 35, 40]) {
    const r = oldAgeAnnuity({ ...base, serviceMonths: years * 12, claimAgeMonths: 780 });
    assert.ok(md.includes(`| ${years} 年 | ${fmt(r.monthly)} 元 |`), `years ${years}`);
  }
  for (const [salary, years, a, b, used] of [[25000, 15, '5,906.25', '5,812.5', '公式一'], [30300, 15, '6,522.375', '7,044.75', '公式二'], [45800, 15, '8,324.25', '10,648.5', '公式二']]) {
    const r = oldAgeAnnuity({ avgSalary: salary, serviceMonths: years * 12, birthYearRoc: 60, claimAgeMonths: 780 });
    assert.ok(md.includes(`| ${fmt(salary)} × ${years} 年 | ${a} 元 | ${b} 元 | ${used} |`), `${salary} x ${years}`);
    assert.equal(r.usedFormula, used === '公式一' ? 'A' : 'B');
  }
  assert.equal(Math.round(oldAgeAnnuity({ ...base, claimAgeMonths: 64 * 12 + 6 }).monthly), 20871);
  assert.equal(Math.round(oldAgeAnnuity({ ...base, claimAgeMonths: 780 }).monthly * 12), 255564);
  assert.equal((onceClaimOldAge({ avgSalary: 45800, serviceMonths: 360 }).amount / oldAgeAnnuity({ ...base, claimAgeMonths: 720 }).monthly).toFixed(1), '121.0');
  assert.equal(Math.round(3000 / 0.00775), 387097);
  assert.equal((3000 / 0.00775 / 15).toFixed(0), '25806');
  assert.equal(oldAgeLumpSumUnder15({ avgSalary: 30000, serviceMonths: 126 }), 315000);
});
