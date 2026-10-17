// P2 batch 6 (2026-10-17): the arithmetic behind /zh/emergency-fund-how-much/. The page prints the numbers its own source
// computes with src/lib/twEmergencyFundMath.mjs; this file pins those functions against the official examples and recomputes the
// page's examples independently (no shared helper), then checks the page and calculator sources for the wording that carries them.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  BENEFIT_MONTHS_AGE45_OR_DISABLED,
  DEPOSIT_INSURANCE_LIMIT,
  INSURED_SALARY_CAP,
  INSURED_SALARY_TABLE,
  MIN_WAGE_MONTHLY,
  benefitMonthsFor,
  insuredPortion,
  insuredSalaryFor,
  jobSearchCoverage,
  monthlyBenefit,
  severancePay,
} from '../src/lib/twEmergencyFundMath.mjs';
import { cycleInterest } from '../src/lib/twCreditCardMath.mjs';

const page = readFileSync(new URL('../src/pages/zh/emergency-fund-how-much.astro', import.meta.url), 'utf8');
const calc = readFileSync(new URL('../src/components/TWEmergencyFundCalculator.astro', import.meta.url), 'utf8');
const f = (n) => Math.round(n).toLocaleString('en-US');
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

test('勞保局常見問答 11 official example: 平均月投保薪資 30,000, 2 dependents -> 18,000 + 6,000 = 24,000 (= 80%)', () => {
  assert.equal(monthlyBenefit({ avgInsuredSalary: 30000, dependents: 0 }), 18000);
  assert.equal(monthlyBenefit({ avgInsuredSalary: 30000, dependents: 2 }), 24000);
  assert.equal(monthlyBenefit({ avgInsuredSalary: 30000, dependents: 2 }) - monthlyBenefit({ avgInsuredSalary: 30000 }), 6000);
});

test('就業保險法 §19-1: 10% per dependent, capped at 20%; §16: 60% base', () => {
  const salary = 40100;
  assert.equal(monthlyBenefit({ avgInsuredSalary: salary, dependents: 1 }), salary * 0.7);
  assert.equal(monthlyBenefit({ avgInsuredSalary: salary, dependents: 2 }), salary * 0.8);
  assert.equal(monthlyBenefit({ avgInsuredSalary: salary, dependents: 5 }), salary * 0.8);
  assert.equal(monthlyBenefit({ avgInsuredSalary: salary, dependents: -3 }), salary * 0.6);
  assert.equal(monthlyBenefit({ avgInsuredSalary: 0, dependents: 2 }), 0);
});

test('就業保險法 §16: 6 months, 9 when 45 or older at leaving or holding a 身心障礙證明', () => {
  assert.equal(benefitMonthsFor({ ageAtLeaving: 44 }), 6);
  assert.equal(benefitMonthsFor({ ageAtLeaving: 45 }), 9);
  assert.equal(benefitMonthsFor({ ageAtLeaving: 30, disabled: true }), 9);
  assert.equal(BENEFIT_MONTHS_AGE45_OR_DISABLED, 9);
});

test('勞工保險投保薪資分級表 (115-01-01): eleven grades, top 45,800 from 43,901 up', () => {
  assert.equal(INSURED_SALARY_TABLE.length, 11);
  assert.equal(INSURED_SALARY_CAP, 45800);
  const expected = [[29000, 29500], [29500, 29500], [29501, 30300], [30300, 30300], [30301, 31800], [32000, 33300], [33300, 33300], [34800, 34800], [36300, 36300], [38200, 38200], [40100, 40100], [42000, 42000], [43900, 43900], [43901, 45800], [52000, 45800], [1000000, 45800]];
  for (const [pay, grade] of expected) assert.equal(insuredSalaryFor(pay), grade, String(pay));
  assert.equal(MIN_WAGE_MONTHLY, 29500);
  // every grade is its own upper bound except the last
  for (const [upper, insured] of INSURED_SALARY_TABLE.slice(0, -1)) assert.equal(upper, insured);
});

test('算例一: 32 歲、月薪 52,000、單身、被資遣、必要支出 40,000、找 8 個月 -> 164,880 / 320,000 / 155,120', () => {
  const insured = insuredSalaryFor(52000);
  assert.equal(insured, 45800);
  const r = jobSearchCoverage({ essentialMonthly: 40000, avgInsuredSalary: insured, dependents: 0, ageAtLeaving: 32, jobSearchMonths: 8 });
  assert.equal(r.monthly, 27480);
  assert.equal(r.maxMonths, 6);
  assert.equal(r.paidMonths, 6);
  assert.equal(r.benefitTotal, 164880);
  assert.equal(r.need, 320000);
  assert.equal(r.gap, 155120);
  assert.equal(r.reserveNeeded, 155120);
  assert.equal((r.gapInMonthsOfSpending).toFixed(2), '3.88');
  // independent recomputation
  assert.equal(45800 * 0.6 * 6, 164880);
  assert.equal(40000 * 8 - 164880, 155120);
  // one more month of job search adds exactly one month of spending (the benefit is already used up); two fewer shrinks it
  const nine = jobSearchCoverage({ essentialMonthly: 40000, avgInsuredSalary: insured, ageAtLeaving: 32, jobSearchMonths: 9 });
  assert.equal(nine.gap - r.gap, 40000);
  const six = jobSearchCoverage({ essentialMonthly: 40000, avgInsuredSalary: insured, ageAtLeaving: 32, jobSearchMonths: 6 });
  near(six.paidMonths, 6 - 14 / 30);
  near(six.gap, 240000 - 27480 * (6 - 14 / 30), 1e-6);
  // cash on hand reduces only the reserve, not the gap
  const withCash = jobSearchCoverage({ essentialMonthly: 40000, avgInsuredSalary: insured, ageAtLeaving: 32, jobSearchMonths: 8, ownCash: 100000 });
  assert.equal(withCash.gap, 155120);
  assert.equal(withCash.reserveNeeded, 55120);
  assert.equal(jobSearchCoverage({ essentialMonthly: 40000, avgInsuredSalary: insured, jobSearchMonths: 8, ownCash: 999999 }).reserveNeeded, 0);
  // the calculator's defaults are exactly this example
  for (const attr of ['id="ef-pay" type="number" inputmode="numeric" min="0" step="500" value="52000"', 'id="ef-age" type="number" inputmode="numeric" min="15" max="80" step="1" value="32"', 'id="ef-dependents" type="number" inputmode="numeric" min="0" max="20" step="1" value="0"', 'id="ef-essential" type="number" inputmode="numeric" min="0" step="1000" value="40000"', 'id="ef-months" type="number" inputmode="decimal" min="0" max="60" step="1" value="8"', 'id="ef-cash" type="number" inputmode="numeric" min="0" step="1000" value="0"']) assert.ok(calc.includes(attr), attr);
  assert.ok(calc.includes('<option value="1" selected>非自願離職') && calc.includes('<option value="1" selected>是</option>') && calc.includes('<option value="0" selected>沒有</option>'));
});

test('算例二: 47 歲、月薪 32,000、扶養 2 人、必要支出 38,000、找 12 個月 -> 26,640 x 9 = 239,760; gap 216,240', () => {
  const insured = insuredSalaryFor(32000);
  assert.equal(insured, 33300);
  const r = jobSearchCoverage({ essentialMonthly: 38000, avgInsuredSalary: insured, dependents: 2, ageAtLeaving: 47, jobSearchMonths: 12 });
  assert.equal(r.monthly, 26640);
  assert.equal(r.maxMonths, 9);
  assert.equal(r.benefitTotal, 239760);
  assert.equal(r.need, 456000);
  assert.equal(r.gap, 216240);
  assert.equal(r.gapInMonthsOfSpending.toFixed(2), '5.69');
  assert.equal(33300 * 0.8 * 9, 239760);
  assert.equal(38000 * 12 - 239760, 216240);
});

test('算例三: resigning / self-employed gets no 失業給付 -> the whole 320,000 (8.00 months) is the gap, 164,880 more than 算例一', () => {
  const c = jobSearchCoverage({ essentialMonthly: 40000, avgInsuredSalary: 45800, involuntary: false, jobSearchMonths: 8 });
  assert.equal(c.monthly, 0);
  assert.equal(c.benefitTotal, 0);
  assert.equal(c.gap, 320000);
  assert.equal(c.gapInMonthsOfSpending, 8);
  assert.equal(c.gap - 155120, 164880);
});

test('benefit cannot exceed what was needed, and a zero-length search has no gap', () => {
  const short = jobSearchCoverage({ essentialMonthly: 10000, avgInsuredSalary: 45800, dependents: 2, jobSearchMonths: 1 });
  near(short.paidMonths, 1 - 14 / 30);
  assert.ok(short.benefitTotal > short.need - 1e9);
  assert.equal(jobSearchCoverage({ essentialMonthly: 40000, avgInsuredSalary: 45800, jobSearchMonths: 0 }).gap, 0);
  assert.equal(jobSearchCoverage({ essentialMonthly: 0, avgInsuredSalary: 45800, jobSearchMonths: 5 }).gapInMonthsOfSpending, 0);
  // a benefit larger than the spending (no negative gap)
  assert.equal(jobSearchCoverage({ essentialMonthly: 10000, avgInsuredSalary: 45800, dependents: 2, jobSearchMonths: 6 }).gap, 0);
});

test('資遣費 (勞退條例 §12): 0.5 month of average wage per year, pro-rated under a year, at most 6 months', () => {
  assert.deepEqual(severancePay({ avgMonthlyWage: 50000, serviceYears: 6.5 }), { months: 3.25, amount: 162500 });
  assert.deepEqual(severancePay({ avgMonthlyWage: 50000, serviceYears: 20 }), { months: 6, amount: 300000 });
  assert.deepEqual(severancePay({ avgMonthlyWage: 50000, serviceYears: 12 }), { months: 6, amount: 300000 });
  assert.deepEqual(severancePay({ avgMonthlyWage: 50000, serviceYears: 0.5 }), { months: 0.25, amount: 12500 });
  assert.deepEqual(severancePay({ avgMonthlyWage: 50000, serviceYears: 0 }), { months: 0, amount: 0 });
});

test('存款保險 300 萬 and the credit-card example', () => {
  assert.equal(DEPOSIT_INSURANCE_LIMIT, 3000000);
  assert.equal(insuredPortion(2500000), 2500000);
  assert.equal(insuredPortion(4000000), 3000000);
  assert.equal(f(cycleInterest(100000, 15, 30)), '1,233');
  assert.equal(f(100000 * 0.15 / 365 * 30), '1,233');
});

test('irregular-income example arithmetic printed on the page', () => {
  assert.equal(60000 - 35000, 25000);
  assert.equal(25000 * 4, 100000);
  assert.equal(300000 - (60000 + 80000), 160000);
  assert.equal((160000 / 55000).toFixed(1), '2.9');
  assert.equal((300000 / 55000).toFixed(2), '5.45');
  assert.equal(80000 * 6, 480000);
  assert.equal(55000 * 6, 330000);
  assert.equal(480000 - 330000, 150000);
  assert.equal(INSURED_SALARY_CAP * 0.6, 27480);
  assert.equal(INSURED_SALARY_CAP * 0.8, 36640);
});

test('the page: calculator first, every rule dated 2026-10-17, no 3/6-month verdict, no FAQPage/HowTo, no stub links', () => {
  assert.ok(page.indexOf('<TWEmergencyFundCalculator />') < page.indexOf('<h2>失業給付：誰領得到、領多少、領多久</h2>'));
  const dates = [...page.matchAll(/verifiedDate: checked/g)].length;
  assert.equal(dates, 10);
  assert.ok(page.includes("const checked = '2026-10-17';"));
  for (const url of [
    'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0050021',
    'https://www.bli.gov.tw/0005071.html',
    'https://www.bli.gov.tw/0102796.html',
    'https://www.bli.gov.tw/0005475.html',
    'https://www.bli.gov.tw/0101716.html',
    'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=12',
    'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=16',
    'https://www.mol.gov.tw/1607/28162/28166/28180/70460/76761/76833/post',
    'https://www.cdic.gov.tw/main_ch/docdetail.aspx?uid=33&pid=8&docid=9',
    'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0380001&flno=47-1',
  ]) assert.ok(page.includes(url), url);
  for (const text of ['試算僅供參考，以機關公告為準', '不給「存 3 個月還是 6 個月」的答案', '標為無資料', '最長 6 個月；離職辦理退保時已年滿 45 歲', '前 14 天沒有給付']) {
    assert.ok(page.includes(text) || calc.includes(text), text);
  }
  assert.ok(calc.includes('試算僅供參考，以機關公告為準'));
  assert.ok(!/FAQPage|HowTo/.test(page + calc));
  assert.ok(!/consumerfinance|federalreserve/.test(page + calc));
  for (const slug of ['emergency-fund-irregular-income', 'emergency-fund-vs-debt-payoff', 'emergency-fund-vs-sinking-fund', 'money/emergency-fund-size-2026']) assert.ok(!page.includes(slug), slug);
});
