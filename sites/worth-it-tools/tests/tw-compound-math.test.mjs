// P2 batch 5 (2026-10-17): the arithmetic behind the 複利計算機 page. Every number printed in
// src/content/growth-tools/zh/compound-growth.md is asserted here against the calculator's own month-by-month function
// (src/lib/growthCalculators/compoundGrowth.ts, compiled by `npm run test:growth` into .growth-test-dist) and against
// the closed forms in src/lib/twCompoundMath.mjs, which do not use a loop.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculateCompoundGrowth } from '../.growth-test-dist/index.js';
import {
  annuityFutureValue,
  compoundValue,
  approxRealReturnPct,
  deflate,
  delayedPlan,
  effectiveFromNominal,
  effectiveFromNominalMonthly,
  excelFv,
  excelPmt,
  lumpAndMonthlyFutureValue,
  monthlyRateFromEffective,
  realReturnPct,
  requiredMonthlyDeposit,
  simpleValue,
} from '../src/lib/twCompoundMath.mjs';
import { ZH_COMPOUND_DEFAULTS } from '../src/data/twCompoundDefaults.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/compound-growth.md', import.meta.url), 'utf8');
const f = (n) => Math.round(n).toLocaleString('en-US');
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);
const run = (o) => calculateCompoundGrowth({ initialPrincipal: 0, monthlyContribution: 0, annualReturnPercent: 0, annualFeePercent: 0, annualInflationPercent: 0, years: 1, annualContributionGrowthPercent: 0, contributionTiming: 'end', ...o });

test('closed forms agree with the calculator for lump sums, deposits at either timing, fees and a target', () => {
  for (const timing of ['end', 'beginning']) {
    for (const [pv, pmt, ret, fee, years] of [[0, 10000, 8, 0, 30], [100000, 10000, 5, 0.5, 20], [1000000, 0, 1.7, 0, 10], [50000, 2500, 3, 1, 15], [0, 1, 0, 0, 5]]) {
      const r = run({ initialPrincipal: pv, monthlyContribution: pmt, annualReturnPercent: ret, annualFeePercent: fee, years, contributionTiming: timing });
      near(r.endingBalance, lumpAndMonthlyFutureValue({ principal: pv, monthlyDeposit: pmt, annualReturnPct: ret, annualFeePct: fee, years, timing }), 1e-4);
    }
  }
  const t = run({ initialPrincipal: 100000, monthlyContribution: 10000, annualReturnPercent: 5, annualFeePercent: 0.5, years: 20, targetAmount: 5000000 });
  near(t.requiredMonthlyContributionForTarget, requiredMonthlyDeposit({ target: 5000000, principal: 100000, annualReturnPct: 5, annualFeePct: 0.5, years: 20 }), 1e-3);
  // the calculator's monthly rate is the effective-annual convention: twelve of them make exactly the annual rate
  near((1 + monthlyRateFromEffective(5)) ** 12, 1.05, 1e-12);
  near(annuityFutureValue(1, 0, 12), 12, 1e-12);
});

test('算例一: 100 萬、1.7%、10 年 -- 單利 1,170,000, 複利 1,183,612, 差 13,612', () => {
  const simple = simpleValue(1000000, 1.7, 10);
  const compound = compoundValue(1000000, 1.7, 10);
  assert.equal(f(simple), '1,170,000');
  assert.equal(f(compound), '1,183,612');
  assert.equal(f(compound - simple), '13,612');
  // the calculator reproduces it: 本金 1,000,000, 每月 0, 1.7%, 費用 0, 通膨 0, 10 年
  assert.equal(f(run({ initialPrincipal: 1000000, annualReturnPercent: 1.7, years: 10 }).endingBalance), '1,183,612');
  // 單利 definition (退撫基金): r x t
  near(simple, 1000000 * (1 + 0.017 * 10), 1e-6);
  for (const text of ['| 單利 | 1,000,000 × (1 + 1.7% × 10) | 1,170,000 元 |', '| 複利 | 1,000,000 × 1.017^10 | 1,183,612 元 |', '| 差額 | | 13,612 元 |']) assert.ok(md.includes(text), text);
});

test('算例二: 實質報酬率與購買力 -- 主計總處 CPI 年增率 1.94 / 2.07 / 2.73 與央行 1.7%', () => {
  const months = [0.71, 1.75, 1.2, 1.72, 2.19, 2.56, 2.52, 2.05, 2.73];
  const average = months.reduce((s, v) => s + v, 0) / months.length;
  assert.equal(average.toFixed(2), '1.94');
  const nominal = compoundValue(1000000, 1.7, 10);
  const rows = [[Number(average.toFixed(2)), '-0.24', '1,211,843', '976,705'], [2.07, '-0.36', '1,227,386', '964,336'], [2.73, '-1.00', '1,309,100', '904,142']];
  for (const [infl, real, price, today] of rows) {
    const rr = realReturnPct(1.7, infl);
    assert.equal(rr.toFixed(2), real);
    assert.equal(f(1000000 * (1 + infl / 100) ** 10), price);
    assert.equal(f(deflate(nominal, infl, 10)), today);
    // the same number through the real rate and through the calculator's own deflator
    assert.equal(f(1000000 * (1 + rr / 100) ** 10), today);
    assert.equal(f(run({ initialPrincipal: 1000000, annualReturnPercent: 1.7, annualInflationPercent: infl, years: 10 }).realEndingBalance), today);
    assert.ok(md.includes(`| ${real.replace('-', '−')}% | ${price} 元 | ${today} 元 |`), `${real} row`);
  }
  assert.ok(md.includes('1.94%（115 年 1–9 月平均）') && md.includes('2.07%（115 年全年預測）') && md.includes('2.73%（115 年 9 月）'));
  assert.ok(md.includes('115 年 1 至 9 月各月分別是 0.71、1.75、1.20、1.72、2.19、2.56、2.52、2.05、2.73%'));
  assert.ok(md.includes('一年期臺銀、土銀、合庫、一銀、華銀皆為 1.7%'));
  // 常見錯誤 bullet: 多了約 18.4 萬, 少了約 9.6 萬
  assert.equal((nominal - 1000000).toFixed(0).slice(0, 3), '183');
  assert.equal(((1000000 - deflate(nominal, 2.73, 10)) / 10000).toFixed(1), '9.6');
  assert.ok(md.includes('帳戶多了約 18.4 萬元') && md.includes('反而少了約 9.6 萬元'));
});

test('算例三: the zh 載入範例 values are the page example -- 10萬 + 每月1萬, 5% - 0.5%, 通膨 2%, 20 年, 目標 500 萬', () => {
  assert.deepEqual({ ...ZH_COMPOUND_DEFAULTS }, { initialPrincipal: 100000, monthlyContribution: 10000, returnRate: 5, feeRate: 0.5, inflationRate: 2, years: 20, contributionGrowth: 0, targetAmount: 5000000, contributionTiming: 'end' });
  // the tool definition feeds these into the form (checked against the source, since the definition is TypeScript)
  const definition = readFileSync(new URL('../src/data/growthToolDefinitions.ts', import.meta.url), 'utf8');
  assert.ok(definition.includes("import { ZH_COMPOUND_DEFAULTS } from './twCompoundDefaults.mjs'"));
  assert.ok(definition.includes("const tw = locale === 'zh' ? ZH_COMPOUND_DEFAULTS : null;"));
  const base = { initialPrincipal: 100000, monthlyContribution: 10000, annualInflationPercent: 2, years: 20, targetAmount: 5000000 };
  const main = run({ ...base, annualReturnPercent: 5, annualFeePercent: 0.5 });
  assert.equal(f(main.endingBalance), '4,082,769');
  assert.equal(f(main.realEndingBalance), '2,747,587');
  assert.equal(f(main.totalContributions), '2,500,000');
  assert.equal(f(main.investmentGrowth), '1,582,769');
  assert.equal(main.targetReached, false);
  assert.equal(f(main.requiredMonthlyContributionForTarget), '12,388');
  const rows = [[1.7, 0, '2,992,232', '2,013,686', '17,040'], [3, 0, '3,449,156', '2,321,183', '14,745'], [5, 0.5, '4,082,769', '2,747,587', '12,388'], [7, 0.5, '5,148,624', '3,464,876', '9,690']];
  for (const [ret, fee, nominal, real, need] of rows) {
    const r = run({ ...base, annualReturnPercent: ret, annualFeePercent: fee });
    assert.equal(f(r.endingBalance), nominal);
    assert.equal(f(r.realEndingBalance), real);
    assert.equal(f(r.requiredMonthlyContributionForTarget), need);
    assert.equal(f(r.totalContributions), '2,500,000');
    const feeText = fee === 0 ? '0%' : `${fee}%`;
    const row = ret === 5 ? `| **5%（預設）** | **0.5%** | **${nominal} 元** | **${real} 元** | **${need} 元** |` : `| ${ret}% | ${feeText} | ${nominal} 元 | ${real} 元 | ${need} 元 |`;
    assert.ok(md.includes(row), row);
  }
  assert.ok(md.includes('預設那一列的 4,082,769 元裡，1,582,769 元是複利成長；用每月 10,000 元投入達不到 500 萬，要每月 12,388 元才夠'));
  assert.ok(md.includes('累計投入 100,000 + 10,000 × 240 = 2,500,000 元'));
  assert.ok(md.includes('上面按「載入範例」填入的數字就是算例三'));
});

test('算例四: 退撫基金「投資獲利靠複利」的三個數字 -- 月利率 = 年報酬率 ÷ 12、月初投入; 計算機用有效年利率換算後重現', () => {
  const monthlyNominal = (rate, years, timing) => annuityFutureValue(10000, rate / 100 / 12, years * 12, timing);
  // the page says 約 1,500 萬 / 835 萬 / 592 萬; only (÷12, 月初) matches all three
  assert.equal(f(monthlyNominal(8, 30, 'beginning')), '15,002,952');
  assert.equal(f(monthlyNominal(5, 30, 'beginning')), '8,357,264');
  assert.equal(f(monthlyNominal(8, 20, 'beginning')), '5,929,472');
  assert.equal(Math.round(monthlyNominal(8, 30, 'beginning') / 10000), 1500);
  assert.equal(Math.floor(monthlyNominal(5, 30, 'beginning') / 10000), 835);
  assert.equal(Math.round(monthlyNominal(8, 20, 'beginning') / 10000), 593);
  assert.equal(Math.floor(monthlyNominal(8, 20, 'beginning') / 10000), 592);
  // ...and the other readings do not: 月底 gives 1,490 萬, 有效年利率 8% gives 1,418 / 1,409 萬
  assert.equal(Math.round(monthlyNominal(8, 30, 'end') / 10000), 1490);
  // the calculator reproduces them once the 年利率 is converted to an effective annual rate
  assert.equal(effectiveFromNominalMonthly(8).toFixed(7), '8.2999507');
  assert.equal(effectiveFromNominal(5, 12).toFixed(7), '5.1161898');
  const viaTool = (ret, years) => run({ monthlyContribution: 10000, annualReturnPercent: ret, years, contributionTiming: 'beginning' });
  assert.equal(f(viaTool(8.2999507, 30).endingBalance), '15,002,952');
  assert.equal(f(viaTool(5.1161898, 30).endingBalance), '8,357,264');
  assert.equal(f(viaTool(8.2999507, 20).endingBalance), '5,929,472');
  assert.equal(f(viaTool(8, 30).endingBalance), '14,176,132');
  assert.equal(f(run({ monthlyContribution: 10000, annualReturnPercent: 8, years: 30, contributionTiming: 'end' }).endingBalance), '14,085,506');
  const gap = monthlyNominal(8, 30, 'beginning') - viaTool(8, 30).endingBalance;
  assert.equal(Math.round(gap / 10000), 83);
  assert.equal((gap / monthlyNominal(8, 30, 'beginning') * 100).toFixed(1), '5.5');
  const feeLoss = monthlyNominal(8, 30, 'beginning') - monthlyNominal(5, 30, 'beginning');
  assert.equal(f(feeLoss), '6,645,688');
  assert.equal((feeLoss / monthlyNominal(8, 30, 'beginning') * 100).toFixed(0), '44');
  assert.equal(viaTool(8, 30).totalContributions, 3600000);
  for (const text of [
    '| 8%、30 年 | 15,002,952 元 | 約 1,500 萬 |',
    '| 5%（8% 扣費用 3%）、30 年 | 8,357,264 元 | 約 835 萬 |',
    '| 8%、20 年（35 歲起） | 5,929,472 元 | 592 萬 |',
    '費用 3% 讓 30 年後少了 6,645,688 元，約 44%',
    '(1 + 8% ÷ 12)^12 − 1 = 8.2999507%，5% 則是 5.1161898%',
    '月初投入得到 14,176,132 元，月底投入得到 14,085,506 元，比 15,002,952 元少約 83 萬元',
    '差了 5.5%',
  ]) assert.ok(md.includes(text), text);
});

test('Excel 公式: FV / PMT with the same effective-annual monthly rate reproduce the page', () => {
  const i = monthlyRateFromEffective(4.5);
  assert.equal(f(excelFv(i, 240, 10000, 100000, 0)), '4,082,769');
  // Excel PMT(i, 240, -100000, 5000000, 0) is negative (money paid out); the page writes =-PMT(...)
  assert.equal(f(-excelPmt(i, 240, -100000, 5000000, 0)), '12,388');
  assert.equal(f(excelFv(monthlyRateFromEffective(1.7), 120, 0, 1000000, 0)), '1,183,612');
  // type 1 = deposit at the start of the month
  near(excelFv(i, 240, 10000, 0, 1), annuityFutureValue(10000, i, 240, 'beginning'), 1e-6);
  near(excelPmt(0, 10, -100, 200, 0), -10, 1e-12);
  for (const text of [
    '=FV((1+年報酬率-費用率)^(1/12)-1, 年數*12, -每月投入, -起始本金, 0)',
    '`=FV((1+0.045)^(1/12)-1, 240, -10000, -100000, 0)` 得到 4,082,769 元',
    '`=-PMT((1+0.045)^(1/12)-1, 240, -100000, 5000000, 0)` 得到 12,388 元',
    '`=名目金額/(1+通膨率)^年數`',
    '`=(1+名目)/(1+通膨)-1`',
    '按 1.017，再按 ^ 或 xʸ，輸入 10，按等號，再乘 1,000,000，得到 1,183,612',
  ]) assert.ok(md.includes(text), text);
});

test('the page cites only pages that were opened on 2026-10-17 and carries the 試算僅供參考 line; no stub link', () => {
  for (const text of ['試算結果僅供參考，以銀行與主管機關公告為準', 'https://www.cbc.gov.tw/tw/np-371-1.html', 'https://www.stat.gov.tw/point.aspx?sid=t.2&n=3581&sms=11480', 'https://www.fund.gov.tw/News_Content.aspx?n=3268&s=15185', 'https://www.fund.gov.tw/News_Content.aspx?n=708&s=16920', '資料日 115 年 10 月 16 日']) assert.ok(md.includes(text), text);
  const dates = [...md.matchAll(/verifiedDate: "(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);
  assert.equal(dates.length, 5);
  assert.ok(dates.every((d) => d === '2026-10-17'));
  assert.ok(!md.includes('how-compound-growth-works') && !md.includes('simple-vs-compound-interest'));
  // P2 batch 6: the four savings-goal articles were merged into this page and are redirect stubs now
  for (const slug of ['real-vs-nominal-return', 'effective-interest-rate-explained', 'inflation-adjusted-savings-goal', 'cost-of-delaying-savings-goal']) assert.ok(!md.includes(slug), slug);
  assert.ok(!md.includes('rate.bot.com.tw/ir') || md.includes('沒有打開'));
  assert.ok(!/FAQPage|HowTo/.test(md));
  // the deposit-rate wording never hard-codes a rate as "the" current rate: it is dated and called a demo input
  assert.ok(md.includes('這只是示範輸入，不是預測'));
});

// ---- P2 batch 6 (2026-10-17): the four savings-goal articles were merged into this page --------------------------------

test('實質報酬率: 精確式 (1+n)/(1+i)-1 vs 名目減通膨, and the 115 年 CPI months used as scenarios', () => {
  const rows = [[1.7, 0.71, '0.98', '0.99'], [1.7, 1.72, '-0.02', '-0.02'], [1.7, 2.73, '-1.00', '-1.03'], [5, 3, '1.94', '2.00']];
  for (const [nominal, inflation, exact, approx] of rows) {
    assert.equal(realReturnPct(nominal, inflation).toFixed(2), exact);
    assert.equal(approxRealReturnPct(nominal, inflation).toFixed(2), approx);
    // the exact formula is the inverse of (1 + nominal) = (1 + real) x (1 + inflation)
    near((1 + realReturnPct(nominal, inflation) / 100) * (1 + inflation / 100), 1 + nominal / 100, 1e-12);
    const show = (v) => v.replace('-', '−') + '%';
    assert.ok(md.includes(`${inflation}%`) || md.includes(`${inflation.toFixed(2)}%`), String(inflation));
    assert.ok(md.includes(`| ${show(exact)} | ${show(approx)} |`), `${exact}/${approx} row`);
  }
  // the CPI months quoted next to the table are the DGBAS series already asserted in 算例二
  const cpi = { 1: 0.71, 4: 1.72, 9: 2.73 };
  for (const [month, value] of Object.entries(cpi)) assert.ok(md.includes(`${value.toFixed(2)}%（115 年 ${month} 月）`), month);
  assert.ok(md.includes('(1 + 名目報酬率) ÷ (1 + 通膨率) − 1'));
  assert.ok(md.includes('(1 + 名目) = (1 + 實質) × (1 + 通膨)'));
});

test('有效年利率: nominal annual rate compounded monthly -> effective annual rate, and the 總費用年百分率 quotation', () => {
  const rows = [[1.7, '1.71'], [5, '5.12'], [8, '8.30'], [12, '12.68']];
  for (const [nominal, effective] of rows) {
    assert.equal(effectiveFromNominalMonthly(nominal).toFixed(2), effective);
    // the Excel EFFECT(rate, 12) definition is the same closed form
    near(effectiveFromNominalMonthly(nominal), ((1 + nominal / 100 / 12) ** 12 - 1) * 100, 1e-12);
    assert.ok(md.includes(`| ${nominal}% | ${effective}% |`), `${nominal} row`);
  }
  assert.equal((effectiveFromNominalMonthly(12) - 12).toFixed(2), '0.68');
  assert.equal((effectiveFromNominalMonthly(1.7) - 1.7).toFixed(2), '0.01');
  for (const text of [
    '12% 差了 0.68 個百分點，1.7% 只差 0.01 個百分點',
    '消費者依授信利率及相關費用標準計算之應付所有總費用，以信用額度借款本金計算之年百分率',
    '用內部報酬率法計算，並四捨五入到小數點後第二位',
    'https://law.banking.gov.tw/Chi/FLAW/FLAWDOC01.aspx?lno=6&lsid=FL036733',
    'https://law.banking.gov.tw/Chi/FLAW/FLAWDOC01.aspx?lno=8&lsid=FL036733',
    '`=(1+年利率/12)^12-1`，或用 EFFECT 函數 `=EFFECT(年利率, 12)`',
  ]) assert.ok(md.includes(text), text);
});

test('算例五: 目標先通膨調整 -- 今天 100 萬、10 年、CPI 情境, 起始 0, 月底; the calculator solves the same monthly deposit', () => {
  const rows = [[null, '1,000,000', '8,333', '7,656'], [1.94, '1,211,843', '10,099', '9,278'], [2.07, '1,227,386', '10,228', '9,397'], [2.73, '1,309,100', '10,909', '10,023']];
  for (const [inflation, future, need0, need17] of rows) {
    const target = inflation === null ? 1000000 : compoundValue(1000000, inflation, 10);
    assert.equal(f(target), future);
    assert.equal(f(requiredMonthlyDeposit({ target, annualReturnPct: 0, years: 10 })), need0);
    assert.equal(f(requiredMonthlyDeposit({ target, annualReturnPct: 1.7, years: 10 })), need17);
    // 0% is just target / 120; and the calculator's own reverse solve agrees
    near(requiredMonthlyDeposit({ target, annualReturnPct: 0, years: 10 }), target / 120, 1e-9);
    assert.equal(f(run({ annualReturnPercent: 1.7, years: 10, targetAmount: target }).requiredMonthlyContributionForTarget), need17);
    assert.equal(f(run({ annualReturnPercent: 0, years: 10, targetAmount: target }).requiredMonthlyContributionForTarget), need0);
    // the future price column is the same one 算例二 prints (compound the price, not the deposit)
    if (inflation !== null) assert.ok(md.includes(`${future} 元`), future);
  }
  for (const row of [
    '| 不調整（目標固定 100 萬） | 1,000,000 元 | 8,333 元 | 7,656 元 |',
    '| 1.94%（115 年 1–9 月平均） | 1,211,843 元 | 10,099 元 | 9,278 元 |',
    '| 2.07%（115 年全年預測） | 1,227,386 元 | 10,228 元 | 9,397 元 |',
    '| 2.73%（115 年 9 月） | 1,309,100 元 | 10,909 元 | 10,023 元 |',
  ]) assert.ok(md.includes(row), row);
  const at273 = Math.round(requiredMonthlyDeposit({ target: compoundValue(1000000, 2.73, 10), annualReturnPct: 1.7, years: 10 })) - Math.round(requiredMonthlyDeposit({ target: 1000000, annualReturnPct: 1.7, years: 10 }));
  assert.equal(at273, 2367);
  assert.equal(((compoundValue(1000000, 2.73, 10) / 1000000 - 1) * 100).toFixed(1), '30.9');
  assert.equal(f(compoundValue(1000000, 2.73, 10) - 1000000), '309,100');
  // the Excel line on the page
  assert.equal(f(1000000 * (1 + 0.0273) ** 10), '1,309,100');
  for (const text of ['未來目標 = 今天價格 × (1 + 通膨率)^年數', '目標高了 30.9%，每月要多存 2,367 元（10,023 − 7,656）', '`=1000000*(1+0.0273)^10` 得到 1,309,100 元', '存到 100 萬還差 309,100 元']) assert.ok(md.includes(text), text);
});

test('算例六: 晚開始 -- 目標 100 萬、期限 120 個月不變, 起始 0; delayedPlan agrees with the calculator run for the months that are left', () => {
  const rows = [[0, 120, '8,333', '7,656', '918,726'], [12, 108, '9,259', '8,581', '926,711'], [24, 96, '10,417', '9,737', '934,743']];
  for (const [delay, left, need0, need17, total17] of rows) {
    const p0 = delayedPlan({ target: 1000000, annualReturnPct: 0, totalMonths: 120, delayMonths: delay });
    const p17 = delayedPlan({ target: 1000000, annualReturnPct: 1.7, totalMonths: 120, delayMonths: delay });
    assert.equal(p17.monthsLeft, left);
    assert.equal(f(p0.monthly), need0);
    assert.equal(f(p17.monthly), need17);
    assert.equal(f(p17.totalDeposited), total17);
    assert.equal(f(p0.totalDeposited), '1,000,000');
    // calculator, run over the months that are left
    assert.equal(f(run({ annualReturnPercent: 1.7, years: left / 12, targetAmount: 1000000 }).requiredMonthlyContributionForTarget), need17);
    assert.equal(f(run({ annualReturnPercent: 0, years: left / 12, targetAmount: 1000000 }).requiredMonthlyContributionForTarget), need0);
    // and the deposit really lands on the target
    near(run({ monthlyContribution: p17.monthly, annualReturnPercent: 1.7, years: left / 12 }).endingBalance, 1000000, 1e-4);
    assert.ok(md.includes(`| ${left} | ${need0} 元 | ${need17} 元 | ${total17} 元 |`), `${left} row`);
  }
  const base0 = delayedPlan({ target: 1000000, annualReturnPct: 0, totalMonths: 120 });
  const base17 = delayedPlan({ target: 1000000, annualReturnPct: 1.7, totalMonths: 120 });
  const late24 = delayedPlan({ target: 1000000, annualReturnPct: 0, totalMonths: 120, delayMonths: 24 });
  const late24r = delayedPlan({ target: 1000000, annualReturnPct: 1.7, totalMonths: 120, delayMonths: 24 });
  assert.equal(Math.round(late24.monthly - base0.monthly), 2083);
  assert.equal(Math.round(late24r.monthly - base17.monthly), 2081);
  assert.equal(f(late24r.totalDeposited - base17.totalDeposited), '16,017');
  // delaying the deadline by the same 12 months leaves the monthly amount where it was
  near(delayedPlan({ target: 1000000, annualReturnPct: 1.7, totalMonths: 132, delayMonths: 12 }).monthly, base17.monthly, 1e-9);
  // with a starting balance it grows for the whole period while deposits start late
  const withPrincipal = delayedPlan({ target: 1000000, principal: 200000, annualReturnPct: 1.7, totalMonths: 120, delayMonths: 12 });
  assert.ok(withPrincipal.monthly < late24r.monthly && withPrincipal.monthly > 0);
  for (const text of ['完全不計利息時晚 24 個月每月多 2,083 元，1.7% 時多 2,081 元', '晚 24 個月總共要多投入 16,017 元（934,743 − 918,726）', '每月仍是 7,656 元', '`=-PMT((1+0.017)^(1/12)-1, 108, 0, 1000000, 0)` 得到 8,581 元']) assert.ok(md.includes(text), text);
  assert.equal(f(-excelPmt(monthlyRateFromEffective(1.7), 108, 0, 1000000, 0)), '8,581');
});
