// P2 batch 2 (2026-10-17): the arithmetic behind the 房貸試算 page. Every number printed in
// src/content/growth-tools/zh/mortgage-payoff.md is asserted here, against the module the
// page script imports, and cross-checked with closed forms that do not use the schedule loop.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { annuityPayment, burdenLight, monthlyRate, prepayEffect, simulateMortgage } from '../src/lib/twMortgageMath.mjs';

const md = readFileSync(new URL('../src/content/growth-tools/zh/mortgage-payoff.md', import.meta.url), 'utf8');
const f = (n) => Math.round(n).toLocaleString('en-US');
const base = { principal: 10000000, aprPct: 2, years: 30 };
const i = 0.02 / 12;

test('Excel PMT / IPMT / PPMT / CUMIPMT equivalents for 1,000 萬 / 30 年 / 2%', () => {
  const pmt = annuityPayment(10000000, i, 360);
  assert.equal(pmt.toFixed(2), '36961.95');
  const factor = (i * (1 + i) ** 360) / ((1 + i) ** 360 - 1); // 土地銀行 平均攤還率
  assert.ok(Math.abs(pmt - 10000000 * factor) < 1e-6);
  const r = simulateMortgage(base);
  assert.equal(r.rows[0].interest.toFixed(2), '16666.67'); // IPMT(…,1,…)
  assert.equal(r.rows[0].principal.toFixed(2), '20295.28'); // PPMT(…,1,…)
  assert.equal(Math.round(pmt * 360 - 10000000), 3306301); // -CUMIPMT(…)
  assert.equal(Math.round(r.totalInterest), 3306301);
  assert.equal(Math.round(r.totalPaid), 13306301);
  assert.equal(r.months, 360);
  assert.ok(Math.abs(r.rows.reduce((s, x) => s + x.principal, 0) - 10000000) < 1e-6);
  assert.ok(r.rows.at(-1).balance < 1e-6);
});

test('算例一 table: 本息平均 vs 本金平均', () => {
  const a = simulateMortgage(base);
  const e = simulateMortgage({ ...base, method: 'equalPrincipal' });
  assert.equal(f(e.firstAmortPayment), '44,444');
  assert.equal(f(e.lastPayment), '27,824');
  assert.equal(f(e.totalInterest), '3,008,333');
  assert.equal(f(e.totalPaid), '13,008,333');
  // closed form: P x i x (n+1) / 2
  assert.equal(Math.round(10000000 * i * 361 / 2), 3008333);
  assert.equal(f(a.totalInterest - e.totalInterest), '297,968');
  assert.equal(f(e.rows[0].principal), '27,778');
  assert.equal(f(e.rows[0].interest), '16,667');
  assert.equal(f(e.rows[359].interest), '46');
  for (const text of ['36,962 元（固定）', '第 1 個月 44,444 元 → 最後 1 個月 27,824 元', '| 總利息 | 3,306,301 元 | 3,008,333 元 |', '| 總付款 | 13,306,301 元 | 13,008,333 元 |', '總利息少約 297,968 元', '≈ 36,962 元；總利息 = 36,961.95 × 360 − 10,000,000 ≈ 3,306,301 元']) {
    assert.ok(md.includes(text), text);
  }
});

test('利息逐月: 第 1、120、360 個月與前 10 年', () => {
  const r = simulateMortgage(base);
  const m = (k) => r.rows[k - 1];
  assert.deepEqual([f(m(1).interest), f(m(1).principal), f(m(1).balance)], ['16,667', '20,295', '9,979,705']);
  assert.deepEqual([f(m(120).interest), f(m(120).principal), f(m(120).balance)], ['12,219', '24,743', '7,306,417']);
  assert.deepEqual([f(m(360).interest), f(m(360).principal), f(m(360).balance)], ['62', '36,900', '0']);
  assert.equal((m(1).interest / m(1).payment * 100).toFixed(1), '45.1');
  const first10 = r.rows.slice(0, 120);
  assert.equal(f(first10.reduce((s, x) => s + x.payment, 0)), '4,435,434');
  assert.equal(f(first10.reduce((s, x) => s + x.interest, 0)), '1,741,851');
  assert.equal(f(first10.reduce((s, x) => s + x.principal, 0)), '2,693,583');
  for (const text of ['| 第 1 個月 | 16,667 元 | 20,295 元 | 9,979,705 元 |', '| 第 120 個月（第 10 年底） | 12,219 元 | 24,743 元 | 7,306,417 元 |', '| 第 360 個月 | 62 元 | 36,900 元 | 0 元 |', '利息占 45.1%', '共繳 4,435,434 元，其中利息 1,741,851 元、本金 2,693,583 元']) {
    assert.ok(md.includes(text), text);
  }
});

test('算例二: 寬限期 0 / 3 / 5 年, with a closed-form check on the total interest', () => {
  const none = simulateMortgage(base);
  for (const [g, grace, after, interest, extra] of [[3, '16,667', '39,969', '3,549,959', '243,658'], [5, '16,667', '42,385', '3,715,630', '409,329']]) {
    const r = simulateMortgage({ ...base, graceYears: g });
    assert.equal(r.months, 360);
    assert.equal(f(r.gracePayment), grace);
    assert.equal(f(r.firstAmortPayment), after);
    assert.equal(f(r.totalInterest), interest);
    assert.equal(f(r.totalInterest - none.totalInterest), extra);
    // closed form: interest-only months + an annuity over the remaining months
    const rem = 360 - g * 12;
    const closed = g * 12 * 10000000 * i + annuityPayment(10000000, i, rem) * rem - 10000000;
    assert.equal(Math.round(closed), Math.round(r.totalInterest));
    assert.ok(md.includes(`| ${g} 年 | ${grace} 元 | ${after} 元 | ${interest} 元 | ${extra} 元 |`), `row ${g}`);
  }
  const g3 = simulateMortgage({ ...base, graceYears: 3 });
  assert.equal(f(g3.firstAmortPayment - g3.gracePayment), '23,302');
  assert.equal(f(36962 - 16667), '20,295');
  assert.equal(f(39969 - 36962), '3,007');
  assert.equal((g3.firstAmortPayment / 100000 * 100).toFixed(1), '40.0');
  assert.ok(md.includes('月付從 16,667 元跳到 39,969 元，多 23,302 元'));
  assert.ok(md.includes('40.0%'));
});

test('算例三: 剩餘 800 萬 / 25 年 / 2%, 第 1 個月後還 100 萬, 違約金 1% (假設)', () => {
  const b = { principal: 8000000, aprPct: 2, years: 25 };
  const none = simulateMortgage(b);
  assert.equal(f(none.firstAmortPayment), '33,908');
  assert.equal(f(none.totalInterest), '2,172,504');
  const shorten = prepayEffect(b, { month: 1, amount: 1000000, mode: 'shorten', penaltyPct: 1, penaltyBase: 'amount' });
  assert.deepEqual([shorten.withPrepay.months, f(shorten.withPrepay.rows[1].payment), f(shorten.withPrepay.totalInterest), f(shorten.interestSaved), shorten.monthsSaved, f(shorten.withPrepay.penalty), f(shorten.netSaved)],
    [254, '33,908', '1,589,044', '583,460', 46, '10,000', '573,460']);
  const lower = prepayEffect(b, { month: 1, amount: 1000000, mode: 'lower', penaltyPct: 1, penaltyBase: 'amount' });
  assert.deepEqual([lower.withPrepay.months, f(lower.withPrepay.rows[1].payment), f(lower.withPrepay.totalInterest), f(lower.interestSaved), lower.monthsSaved, f(lower.withPrepay.penalty), f(lower.netSaved)],
    [300, '29,659', '1,901,912', '270,592', 0, '10,000', '260,592']);
  // the lowered payment is the annuity of what is left over the remaining 299 months
  assert.equal(f(annuityPayment(simulateMortgage(b).rows[0].balance - 1000000, i, 299)), '29,659');
  // the penalty base matters: 1% of the balance before the prepayment instead of 1% of the amount
  const bal = prepayEffect(b, { month: 1, amount: 1000000, mode: 'shorten', penaltyPct: 1, penaltyBase: 'balance' });
  assert.equal(f(bal.withPrepay.penalty), '79,794');
  assert.equal(f(bal.netSaved), '503,666');
  for (const text of ['| 月付不變、縮短期數 | 33,908 元 | 254 個月（提早 46 個月） | 1,589,044 元 | 583,460 元 | 10,000 元 | 573,460 元 |', '| 期數不變、降低月付 | 29,659 元 | 300 個月 | 1,901,912 元 | 270,592 元 | 10,000 元 | 260,592 元 |', '總利息 2,172,504 元', '就是 79,794 元，淨省降到 503,666 元']) {
    assert.ok(md.includes(text), text);
  }
  // interest saved by a prepayment is never negative and never more than the interest of the loan
  assert.ok(shorten.interestSaved > 0 && shorten.interestSaved < none.totalInterest);
});

test('a prepayment during the grace period works and the schedule always ends at zero', () => {
  const r = simulateMortgage({ ...base, graceYears: 3, prepay: { month: 12, amount: 2000000, mode: 'lower', penaltyPct: 0 } });
  assert.equal(f(r.rows[11].balance), '8,000,000');
  assert.equal(f(r.rows[12].payment), '13,333'); // interest-only on the lower balance
  assert.ok(r.rows.at(-1).balance < 1e-6);
  assert.ok(Math.abs(r.rows.reduce((s, x) => s + x.principal + x.extra, 0) - 10000000) < 1e-5);
  for (const method of ['annuity', 'equalPrincipal']) {
    for (const mode of ['shorten', 'lower']) {
      const x = simulateMortgage({ ...base, method, graceYears: 2, prepay: { month: 40, amount: 3000000, mode, penaltyPct: 0 } });
      assert.ok(x.rows.at(-1).balance < 1e-6, `${method}/${mode}`);
      assert.ok(Math.abs(x.rows.reduce((s, y) => s + y.principal + y.extra, 0) - 10000000) < 1e-5, `${method}/${mode} principal`);
    }
  }
});

test('zero rate and tiny inputs do not break', () => {
  const r = simulateMortgage({ principal: 1200000, aprPct: 0, years: 10 });
  assert.equal(r.firstAmortPayment, 10000);
  assert.equal(r.totalInterest, 0);
  assert.equal(monthlyRate(-3), 0);
  assert.equal(simulateMortgage({ principal: 0, aprPct: 2, years: 5 }).months, 0);
});

test('房貸支出占收入: 金管會金融健檢 1/3 and 1/5 lights', () => {
  assert.equal(burdenLight(36962, 100000).light, 'red');
  assert.equal((burdenLight(36962, 100000).ratio * 100).toFixed(2), '36.96');
  assert.equal(burdenLight(36962, 200000).light, 'green');
  assert.equal((burdenLight(36962, 200000).ratio * 100).toFixed(1), '18.5');
  assert.equal(burdenLight(100000 / 3, 100000).light, 'yellow'); // exactly 1/3 is not above 1/3
  assert.equal(burdenLight(20000, 100000).light, 'yellow'); // exactly 1/5 is yellow
  assert.equal(burdenLight(19999, 100000).light, 'green');
  assert.equal(burdenLight(1, 0), null);
  for (const text of ['36.96%，超過 1/3', '18.5%，低於 1/5']) assert.ok(md.includes(text), text);
});

// P2 batch 3 (2026-10-17): the 青安 policy numbers in extra-mortgage-payments-guide were re-read from the
// 行政院 and 財政部 pages on 2026-10-17. Pin the figures and the arithmetic that ties them together.
test('青安 3.0 figures in extra-mortgage-payments-guide match the official pages and each other', () => {
  const md = readFileSync(new URL('../src/content/growth-articles/zh/extra-mortgage-payments-guide.md', import.meta.url), 'utf8');
  for (const s of ['第 4012 次會議', '1.775%', '1.9%', '半碼（0.125%）', '1.5 碼（0.375%）', '2029 年 7 月 31 日', '2026 年 8 月 1 日', '1,000 萬元', '1,200 萬元', '1,500 萬元', '最長 40 年']) {
    assert.ok(md.includes(s), `missing ${s}`);
  }
  assert.ok(/lastReviewed: 2026-10-17/.test(md));
  // 2 碼 = 0.5 percentage point = 0.125 (bank) + 0.375 (government); 2.275% - 0.5 = 1.775%; one 半碼 less subsidy = 1.9%
  assert.equal(0.125 + 0.375, 0.5);
  assert.equal(Math.round((2.275 - 0.5) * 1000) / 1000, 1.775);
  assert.equal(Math.round((1.775 + 0.125) * 1000) / 1000, 1.9);
  // the unsourced claim about how prepayment changes the subsidy must not return
  assert.ok(!md.includes('補貼是依剩餘本金與補貼利率計算'));
  assert.ok(!md.includes('提前多繳會減少未來享受補貼利率的本金基礎'));
});

// ---------------------------------------------------------------------------------------------------------------
// P2 batch 4 (2026-10-17): 轉貸 (refinance). The page /zh/money/mortgage-refinance-break-even/ prints these numbers
// in its tables; the test recomputes every printed row with the calculator's own functions.
// ---------------------------------------------------------------------------------------------------------------
import { readFileSync as readRefinanceFile } from 'node:fs';
import { evaluateRefinance, mortgageRegistrationFee, refinanceCosts, refinanceNetAtMonth } from '../src/lib/twMortgageMath.mjs';

const refiMd = readRefinanceFile(new URL('../src/content/money-briefs/zh/mortgage-refinance-break-even.md', import.meta.url), 'utf8');
const f0 = (n) => Math.round(n).toLocaleString('en-US');
const refiBase = { balance: 8000000, oldAprPct: 2.6, oldMonthsLeft: 300, newAprPct: 2.1 };

test('轉貸: statutory items -- 登記費 = 設定金額 x 千分之一, 書狀費 80 元/張', () => {
  assert.equal(mortgageRegistrationFee(8000000), 8000);
  assert.equal(mortgageRegistrationFee(9600000), 9600);
  const c = refinanceCosts({ balance: 8000000, securedAmount: 8000000, newBankFee: 8000, scrivenerFee: 10000, penaltyPct: 0 });
  assert.deepEqual(c, { registration: 8000, titleFee: 80, penalty: 0, bank: 8000, appraisal: 0, scrivener: 10000, other: 0, total: 26080 });
  // blank secured amount = the balance; two sheets = 160
  assert.equal(refinanceCosts({ balance: 8000000, titleSheets: 2 }).titleFee, 160);
  assert.equal(refinanceCosts({ balance: 8000000 }).registration, 8000);
  // 違約金 on a full payoff is the percentage times the balance paid off
  for (const [pct, amount] of [[0.5, 40000], [1, 80000], [2, 160000]]) assert.equal(refinanceCosts({ balance: 8000000, penaltyPct: pct }).penalty, amount);
  assert.ok(refiMd.includes('登記費 8,000 元') && refiMd.includes('登記費 9,600 元'));
  assert.ok(refiMd.includes('0.5% 是 40,000 元、1% 是 80,000 元、2% 是 160,000 元'));
});

test('轉貸 算例一: 8,000,000 / 2.6% -> 2.1% / 費用 26,080 -- the page table, row by row', () => {
  const costs = 26080;
  const same = evaluateRefinance({ ...refiBase, newMonths: 300, costs });
  const reset = evaluateRefinance({ ...refiBase, newMonths: 360, costs });
  assert.equal(f0(same.oldPayment), '36,294');
  assert.equal(same.oldPayment.toFixed(2), '36293.56');
  assert.equal(same.newPayment.toFixed(2), '34299.17');
  assert.equal(reset.newPayment.toFixed(2), '29971.21');
  const rows = [
    `| 每月本息 | ${f0(same.oldPayment)} 元 | ${f0(same.newPayment)} 元 | ${f0(reset.newPayment)} 元 |`,
    `| 每月少付 | — | ${f0(same.monthlySaving)} 元 | ${f0(reset.monthlySaving)} 元 |`,
    `| 回本月數 ①（月付差） | — | ${same.paymentBreakEven} 個月 | ${reset.paymentBreakEven} 個月 |`,
    `| 回本月數 ②（少付的利息 ≥ 費用） | — | ${same.interestBreakEven} 個月 | ${reset.interestBreakEven} 個月 |`,
    `| 跑完全程的利息 | ${f0(same.totalInterestOld)} 元 | ${f0(same.totalInterestNew)} 元 | ${f0(reset.totalInterestNew)} 元 |`,
    `| 少付的利息 | — | ${f0(same.totalInterestSaved)} 元 | ${f0(reset.totalInterestSaved)} 元 |`,
    `| 扣掉費用後淨賺 | — | ${f0(same.netOverFullTerm)} 元 | ${f0(reset.netOverFullTerm)} 元 |`,
    `| 持有 60 個月的淨賺 | — | ${f0(refinanceNetAtMonth(same, 60))} 元 | ${f0(refinanceNetAtMonth(reset, 60))} 元 |`,
  ];
  for (const row of rows) assert.ok(refiMd.includes(row), row);
  assert.deepEqual([same.paymentBreakEven, same.interestBreakEven, reset.paymentBreakEven, reset.interestBreakEven], [14, 8, 5, 8]);
  assert.equal(f0(same.totalInterestSaved), '598,317');
  assert.equal(f0(reset.totalInterestSaved), '98,431');
  assert.equal(f0(reset.monthlySaving), '6,322');
  // 年期重置 paragraph
  assert.equal(f0(reset.totalInterestNew - same.totalInterestNew), '499,886');
  assert.equal(f0(Math.round(same.newPayment) - Math.round(reset.newPayment)), '4,328');
  assert.ok(refiMd.includes('多 499,886 元') && refiMd.includes('每月多出 4,328 元'));
  // the page's lead answer
  assert.ok(refiMd.includes('持有 8 個月後累計少付的利息就超過費用') && refiMd.includes('月付看起來少 6,322 元，跑完全程只省 98,431 元利息，不是 598,317 元'));
  // break-even is exactly the first month where the interest saved reaches the costs
  assert.ok(refinanceNetAtMonth(same, 7) < 0 && refinanceNetAtMonth(same, 8) >= 0);
});

test('轉貸 算例二: 舊貸款違約金 0.5% -> 費用 66,080', () => {
  const costs = refinanceCosts({ balance: 8000000, securedAmount: 8000000, newBankFee: 8000, scrivenerFee: 10000, penaltyPct: 0.5 });
  assert.equal(costs.penalty, 40000);
  assert.equal(costs.total, 66080);
  const same = evaluateRefinance({ ...refiBase, newMonths: 300, costs: costs.total });
  const reset = evaluateRefinance({ ...refiBase, newMonths: 360, costs: costs.total });
  const rows = [
    `| 回本月數 ①（月付差） | ${same.paymentBreakEven} 個月 | ${reset.paymentBreakEven} 個月 |`,
    `| 回本月數 ②（少付的利息 ≥ 費用） | ${same.interestBreakEven} 個月 | ${reset.interestBreakEven} 個月 |`,
    `| 跑完全程淨賺 | ${f0(same.netOverFullTerm)} 元 | ${f0(reset.netOverFullTerm)} 元 |`,
    `| 持有 36 個月的淨賺 | ${f0(refinanceNetAtMonth(same, 36))} 元 | ${f0(refinanceNetAtMonth(reset, 36))} 元 |`,
  ];
  for (const row of rows) assert.ok(refiMd.includes(row), row);
  assert.deepEqual([same.paymentBreakEven, same.interestBreakEven, reset.paymentBreakEven, reset.interestBreakEven], [34, 21, 11, 21]);
  assert.ok(refiMd.includes('| 一次性費用 | 66,080 元 | 66,080 元 |'));
});

test('轉貸 對照表: 餘額 x 利差 -> 回本月數 ②', () => {
  for (const balance of [3000000, 5000000, 8000000, 12000000]) {
    const costs = refinanceCosts({ balance, newBankFee: 8000, scrivenerFee: 10000 });
    const cells = [0.25, 0.5, 0.75, 1].map((d) => {
      const r = evaluateRefinance({ balance, oldAprPct: 2.6, oldMonthsLeft: 300, newAprPct: 2.6 - d, newMonths: 300, costs: costs.total });
      return `${r.interestBreakEven} 個月`;
    });
    const row = `| ${f0(balance)} 元 | ${f0(costs.total)} 元 | ${cells.join(' | ')} |`;
    assert.ok(refiMd.includes(row), row);
  }
});

test('轉貸: 先問原銀行調降利率 (費用 3,000 元)', () => {
  const r = evaluateRefinance({ ...refiBase, newMonths: 300, costs: 3000 });
  assert.equal(r.interestBreakEven, 1);
  assert.equal(f0(r.netOverFullTerm), '595,317');
  assert.equal(f0(r.netOverFullTerm - evaluateRefinance({ ...refiBase, newMonths: 300, costs: 26080 }).netOverFullTerm), '23,080');
  assert.ok(refiMd.includes('第 1 個月就超過費用，跑完全程淨賺 595,317 元，比轉貸多 23,080 元'));
});

test('轉貸 Excel 數字: PMT 與 CUMIPMT 的封閉解', () => {
  const pmt = (rate, n, pv) => (pv * (rate / 12) * (1 + rate / 12) ** n) / ((1 + rate / 12) ** n - 1);
  assert.equal(pmt(0.026, 300, 8000000).toFixed(2), '36293.56');
  assert.equal(pmt(0.021, 300, 8000000).toFixed(2), '34299.17');
  // interest over the first 60 payments = 60 x payment - principal repaid; principal repaid = pv - balance(60)
  const interest60 = (rate) => {
    const i = rate / 12;
    const p = pmt(rate, 300, 8000000);
    const balance60 = 8000000 * (1 + i) ** 60 - p * (((1 + i) ** 60 - 1) / i);
    return 60 * p - (8000000 - balance60);
  };
  assert.equal(f0(interest60(0.026)), '964,145');
  assert.equal(f0(interest60(0.021)), '774,942');
  assert.equal(f0(interest60(0.026) - interest60(0.021)), '189,203');
  assert.equal(f0(interest60(0.026) - interest60(0.021) - 26080), '163,123');
  for (const frag of ['36,293.56', '34,299.17', '964,145', '774,942', '189,203', '163,123']) assert.ok(refiMd.includes(frag), frag);
});

test('轉貸 page quotes the bank and statute figures it cites', () => {
  // 違約金 table (bank-published tiers, 2025-09-30 open data / bank pages)
  for (const row of [
    '| 臺灣銀行 | 1% | 0.7% | 0.5% |', '| 臺灣土地銀行 | 1% | 0.75% | 0.5% |', '| 華南銀行 | 1% | 0.8% | 0.6% |', '| 兆豐銀行 | 1% | 0.5% | 未列 |',
    '| 台北富邦銀行 | 1% | 0.75% | 0.5% |', '| 台新銀行 | 1% | 0.75% | 0.5% |', '| 滙豐（台灣） | 2% | 1.5% | 1% |',
  ]) assert.ok(refiMd.includes(row), row);
  for (const frag of ['每件 8,000 元', '7,000～10,000 元', '台新（2025/08/20）房屋貸款「調降利率」每件 3,000 元', '每次 2,000 元', '總花費在 1 萬至 3 萬元之間', '一般建議房貸利率差異達四碼（1%）以上才值得考慮', '千分之一', '每張 80 元', '塗銷登記免繳納登記費', '限制清償期間」不得超過三年', '限制 3 年 8,000 元、限制 1 年 25,000 元、無限制 50,000 元']) {
    assert.ok(refiMd.includes(frag), frag);
  }
  assert.ok(refiMd.includes('試算結果僅供參考，以銀行與地政機關公告為準。'));
});
