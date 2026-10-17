// P2 batch 5 (2026-10-17): the arithmetic behind the repair / phone / extended-warranty pages. The calculators and the
// pages' worked examples all import src/lib/twRepairMath.mjs (and the tiered tariff for the fridge energy example);
// this file pins every figure those pages print, cross-checks the module against an explicit probability tree and
// against the numbers already printed in the decision guides, and checks that the legal wording on the pages is the
// wording that was read in the official texts on 2026-10-17.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evaluateExtendedWarranty, evaluatePhoneKeepUpgrade, evaluateRepairReplace } from '../src/lib/twRepairMath.mjs';
import { addedCost } from '../src/lib/twElectricityTariff.mjs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const guides = read('../src/data/decisionGuides.ts');
const repairPage = read('../src/pages/[locale]/repair-or-replace-decision-formula.astro');
const phonePage = read('../src/pages/[locale]/upgrade-your-phone-or-keep-it.astro');
const warrantyPage = read('../src/pages/[locale]/is-an-extended-warranty-worth-it.astro');
const f0 = (n) => Math.round(n).toLocaleString('en-US');
const f1 = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

test('the decision guides\' zh worked examples are reproduced by the module (repair, warranty, phone)', () => {
  const r = evaluateRepairReplace({ repairQuote: 6000, repairMonths: 30, recurrenceProbability: 25, recurrenceCost: 5000, extraEnergyMonthly: 100, replacementPrice: 32000, replacementFees: 1000, currentValue: 1000, replacementMonths: 84 });
  assert.equal(f0(r.repairExpected), '10,250');
  assert.equal(f1(r.repairMonthly), '341.7');
  assert.equal(f0(r.replacementMonthly), '381');
  assert.equal(f1(r.difference), '39.3');
  assert.equal(f0(r.breakEvenQuote), '7,179');
  for (const text of ['NT$10,250', '平均 NT$341.7/月', 'NT$381/月', '少 NT$39.3', '約 NT$7,179']) assert.ok(guides.includes(text), text);

  const w = evaluateExtendedWarranty({ planPrice: 3990, failureProbability: 30, approvalProbability: 75, repairCost: 12000, deductible: 1000, claimCost: 300, payoutCap: 15000 });
  assert.equal(w.payout, 11000);
  assert.equal(f0(w.expectedPayout), '2,475');
  assert.equal(w.selfFundExpected, 3600);
  assert.equal(w.planExpected, 5182.5);
  assert.equal(w.netValue, -1582.5);
  assert.equal(w.breakEvenProbability.toFixed(1), '49.7');
  for (const text of ['NT$5,182.5', 'NT$1,582.5', '損益故障率約 49.7%', '期望給付 NT$2,475']) assert.ok(guides.includes(text), text);

  const p = evaluatePhoneKeepUpgrade({ repairCost: 4500, remainingMonths: 18, currentResaleLater: 1000, tradeInNow: 6000, newPhonePrice: 30000, upgradeFees: 1000, transferCost: 800, currentPlanMonthly: 599, newPlanMonthly: 799, newHoldingMonths: 36, newResaleLater: 8000 });
  assert.equal(f1(p.keepDeviceMonthly), '194.4');
  assert.equal(f1(p.keepFullMonthly), '793.4');
  assert.equal(f1(p.upgradeDeviceMonthly), '494.4');
  assert.equal(f1(p.upgradeFullMonthly), '1,293.4');
  assert.equal(Math.round(p.difference), 500);
  for (const text of ['NT$793.4', 'NT$1,293.4', '續用每月少 NT$500']) assert.ok(guides.includes(text), text);
});

test('evaluateExtendedWarranty equals an explicit probability tree (no failure / approved / denied)', () => {
  for (const input of [
    { planPrice: 3990, failureProbability: 30, approvalProbability: 75, repairCost: 12000, deductible: 1000, claimCost: 300, payoutCap: 15000 },
    { planPrice: 2000, failureProbability: 10, approvalProbability: 50, repairCost: 8000, deductible: 0, claimCost: 0, payoutCap: 3000 },
    { planPrice: 6000, failureProbability: 100, approvalProbability: 100, repairCost: 20000, deductible: 1000, claimCost: 300, payoutCap: 1e9 },
  ]) {
    const pFail = input.failureProbability / 100;
    const pOk = input.approvalProbability / 100;
    const payout = Math.min(input.payoutCap, Math.max(0, input.repairCost - input.deductible));
    const tree = [
      { p: 1 - pFail, cost: input.planPrice },
      { p: pFail * pOk, cost: input.planPrice + (input.repairCost - payout) + input.claimCost },
      { p: pFail * (1 - pOk), cost: input.planPrice + input.repairCost },
    ];
    near(tree.reduce((s, b) => s + b.p, 0), 1);
    const planExpected = tree.reduce((s, b) => s + b.p * b.cost, 0);
    const w = evaluateExtendedWarranty(input);
    near(w.planExpected, planExpected, 1e-9);
    near(w.selfFundExpected, pFail * input.repairCost, 1e-9);
    // at the break-even probability the two expected costs are equal
    if (Number.isFinite(w.breakEvenProbability) && w.breakEvenProbability <= 100) {
      const atBreakEven = evaluateExtendedWarranty({ ...input, failureProbability: w.breakEvenProbability });
      near(atBreakEven.netValue, 0, 1e-6);
    }
  }
  assert.equal(evaluateExtendedWarranty({ planPrice: 100, failureProbability: 50, approvalProbability: 0, repairCost: 1000, deductible: 0, claimCost: 0, payoutCap: 1000 }).breakEvenProbability, Infinity);
});

test('evaluateRepairReplace: break-even quote makes both monthly costs equal; bad input stays finite', () => {
  const base = { repairQuote: 5000, repairMonths: 36, recurrenceProbability: 20, recurrenceCost: 4000, extraEnergyMonthly: 100, replacementPrice: 28000, replacementFees: 1200, currentValue: 0, replacementMonths: 120 };
  const r = evaluateRepairReplace(base);
  const atLimit = evaluateRepairReplace({ ...base, repairQuote: r.breakEvenQuote });
  near(atLimit.repairMonthly, atLimit.replacementMonthly, 1e-9);
  for (const bad of [undefined, null, 'x', NaN, Infinity, -5]) {
    const x = evaluateRepairReplace({ ...base, repairQuote: bad, repairMonths: bad, replacementMonths: bad, replacementPrice: bad });
    assert.ok(Number.isFinite(x.repairMonthly) && Number.isFinite(x.replacementMonthly) && Number.isFinite(x.breakEvenQuote));
    const w = evaluateExtendedWarranty({ planPrice: bad, failureProbability: bad, approvalProbability: bad, repairCost: bad, deductible: bad, claimCost: bad, payoutCap: bad });
    assert.ok(Number.isFinite(w.planExpected));
    const p = evaluatePhoneKeepUpgrade({ repairCost: bad, remainingMonths: bad, currentResaleLater: bad, tradeInNow: bad, newPhonePrice: bad, upgradeFees: bad, transferCost: bad, currentPlanMonthly: bad, newPlanMonthly: bad, newHoldingMonths: bad, newResaleLater: bad });
    assert.ok(Number.isFinite(p.keepFullMonthly) && Number.isFinite(p.upgradeFullMonthly));
  }
});

test('冰箱算例 (家電壞了修還是換): 舊機每月多耗 35 度, 累進電價下的電費差, 再代入維修比較', () => {
  const nonSummer = addedCost({ baseKwh: 300, addKwh: 35, season: 'nonSummer' });
  const summer = addedCost({ baseKwh: 450, addKwh: 35, season: 'summer' });
  const n2 = (n) => (Math.round(n * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  assert.equal(n2(nonSummer.added), '83.45'); // 30 度 x 2.26 + 5 度 x 3.13
  near(nonSummer.added, 30 * 2.26 + 5 * 3.13, 1e-9);
  assert.equal(nonSummer.averageRate.toFixed(2), '2.38');
  assert.equal(n2(summer.added), '133.00'); // 35 度 x 3.80, all inside 331-500
  near(summer.added, 35 * 3.8, 1e-9);
  assert.equal(summer.averageRate.toFixed(2), '3.80');
  const year = (8 * nonSummer.added + 4 * summer.added) / 12;
  assert.equal(n2(year), '99.97');
  const base = { repairQuote: 5000, repairMonths: 36, recurrenceProbability: 20, recurrenceCost: 4000, replacementPrice: 28000, replacementFees: 1200, currentValue: 0, replacementMonths: 120 };
  const rows = [0, 50, 100, 150].map((energy) => ({ energy, ...evaluateRepairReplace({ ...base, extraEnergyMonthly: energy }) }));
  assert.deepEqual(rows.map((r) => f1(r.repairMonthly)), ['161.1', '211.1', '261.1', '311.1']);
  assert.deepEqual(rows.map((r) => f1(r.replacementMonthly)), ['243.3', '243.3', '243.3', '243.3']);
  assert.deepEqual(rows.map((r) => r.repairWins), [true, true, false, false]);
  assert.deepEqual(rows.map((r) => f1(r.difference)), ['82.2', '32.2', '17.8', '67.8']);
  assert.deepEqual(rows.map((r) => f0(r.breakEvenQuote)), ['7,960', '6,160', '4,360', '2,560']);
  assert.equal(f0(rows[0].repairExpected), '5,800');
  assert.equal(f0(rows[2].repairExpected), '9,400');
  assert.equal(f0(rows[0].replacementNet), '29,200');
  assert.equal(rows[0].repairRatio.toFixed(1), '17.1');
  // the page computes all of this from the modules, and says the same things
  for (const text of ["from '../../lib/twElectricityTariff.mjs'", "from '../../lib/twRepairMath.mjs'", 'const fridgeExtraKwh = 35', '約 100 元／月，下面就填 100', '(8 × {n2(energyNonSummer.added)} + 4 × {n2(energySummer.added)}) ÷ 12 = {n2(energyYear)} 元', '維修報價只占換新淨成本的 17.1%']) assert.ok(repairPage.includes(text), text);
  // using a whole-bill average rate instead of the tier the kWh land in would give a different energy cost
  assert.notEqual(f1(35 * 3.7823), f1(nonSummer.added));
});

test('手機算例: 維修 NT$1,800 / NT$8,000 對同一支新機, 與修後可再用月數', () => {
  const phoneBase = { currentResaleLater: 800, tradeInNow: 4000, newPhonePrice: 25000, upgradeFees: 500, transferCost: 0, currentPlanMonthly: 599, newPlanMonthly: 599, newHoldingMonths: 36, newResaleLater: 7000 };
  const small = evaluatePhoneKeepUpgrade({ ...phoneBase, repairCost: 1800, remainingMonths: 12 });
  const big = evaluatePhoneKeepUpgrade({ ...phoneBase, repairCost: 8000, remainingMonths: 12 });
  assert.equal(f1(small.upgradeDeviceMonthly), '402.8'); // (25,000 + 500 - 4,000 - 7,000) / 36
  near(small.upgradeDeviceMonthly, (25000 + 500 - 4000 - 7000) / 36, 1e-9);
  assert.equal(f1(small.upgradeFullMonthly), '1,001.8');
  assert.equal(f1(small.keepFullMonthly), '682.3');
  assert.equal(small.keepWins, true);
  assert.equal(f1(small.difference), '319.4');
  assert.equal(f0(small.breakEvenTradeIn), '15,500');
  assert.equal(f1(big.keepFullMonthly), '1,199.0');
  assert.equal(big.keepWins, false);
  assert.equal(f1(big.difference), '197.2');
  assert.equal(f0(big.breakEvenTradeIn), '0'); // even with no trade-in the upgrade is cheaper per month
  const life = [6, 12, 18, 24].map((m) => ({ m, ...evaluatePhoneKeepUpgrade({ ...phoneBase, repairCost: 1800, remainingMonths: m }) }));
  assert.deepEqual(life.map((r) => f1(r.keepDeviceMonthly)), ['166.7', '83.3', '55.6', '41.7']);
  assert.deepEqual(life.map((r) => f1(r.keepFullMonthly)), ['765.7', '682.3', '654.6', '640.7']);
  assert.deepEqual(life.map((r) => f0(r.breakEvenTradeIn)), ['12,500', '15,500', '16,500', '17,000']);
  // at the break-even trade-in the two full monthly costs match
  const atLimit = evaluatePhoneKeepUpgrade({ ...phoneBase, repairCost: 1800, remainingMonths: 12, tradeInNow: small.breakEvenTradeIn });
  near(atLimit.keepFullMonthly, atLimit.upgradeFullMonthly, 1e-9);
  for (const text of ["from '../../lib/twRepairMath.mjs'", '備份個人資料以免流失，並記錄 IMEI 碼及產品序號', '拔除 SIM 卡及刪除涉及隱私的資料', '須收費的故障品，維修商應先向消費者報價並取得消費者同意，才可以進行更換', '如果更換非新品主機板，維修單應明列新舊主機板序號', '/money/phone-contract-subsidy-value']) assert.ok(phonePage.includes(text), text);
  // unsourced claims removed in this batch must not come back
  for (const text of ['電池膨脹', '環境部']) assert.ok(!phonePage.includes(text), text);
  assert.ok(!guides.includes('環境部 — 手機回收責任') && !guides.includes('電池膨脹'));
});

test('延長保固 損益故障率表: 核准率 75%、自負額 1,000、申請成本 300', () => {
  const cell = (price, repair) => evaluateExtendedWarranty({ planPrice: price, failureProbability: 0, approvalProbability: 75, repairCost: repair, deductible: 1000, claimCost: 300, payoutCap: 1e9 }).breakEvenProbability;
  const expected = { 2000: ['39.8', '24.9', '14.3'], 4000: ['79.6', '49.8', '28.5'], 6000: ['119.4', '74.8', '42.8'] };
  for (const [price, row] of Object.entries(expected)) {
    assert.deepEqual([8000, 12000, 20000].map((repair) => cell(Number(price), repair).toFixed(1)), row);
  }
  // closed form: price / (approval x (repair - deductible - claim cost))
  near(cell(4000, 12000), (4000 / (0.75 * (12000 - 1000 - 300))) * 100, 1e-9);
  assert.ok(cell(6000, 8000) > 100);
  for (const text of ["from '../../lib/twRepairMath.mjs'", '核准率 75%、自負額 NT$1,000、申請成本 NT$300', '超過 100%，代表就算一定會壞，期望值也不划算']) assert.ok(warrantyPage.includes(text), text);
  // the two rules of thumb that had no source are gone
  for (const text of ['15% 左右', '30% 左右', '經驗法則']) assert.ok(!warrantyPage.includes(text), text);
});

test('the legal wording on the pages is the wording read in the official texts on 2026-10-17', () => {
  const quote = '因非可歸責於買受人之事由，致商品於保固期間內毀損者，出賣人負維修責任；如經送修三次仍未能修復者，買受人得請求出賣人返還其所支付之價金，或更換同一種類之商品，出賣人不得拒絕。';
  assert.ok(repairPage.includes(quote));
  assert.ok(warrantyPage.includes(quote));
  for (const text of ['企業經營者對消費者保證商品或服務之品質時，應主動出具書面保證書。', '企業經營者未依本法第二十五條規定出具書面保證書者，仍應就其保證之品質負責。']) assert.ok(warrantyPage.includes(text), text);
  assert.ok(warrantyPage.includes('依第三百七十三條之規定危險移轉於買受人時'));
  assert.ok(warrantyPage.includes('六個月間不行使') && warrantyPage.includes('經過五年'));
  // the 88-03-03 date and the statement that scope depends on the notice
  for (const page of [repairPage, warrantyPage]) {
    assert.ok(page.includes('88') && page.includes('不是法律意見'));
    assert.ok(page.includes('https://www.ey.gov.tw/File/622D89D9A3A1ADED'));
  }
  assert.ok(repairPage.includes('88-03-03'));
  // every guide source that the trust block dates 2026-10-17 was opened that day; the two moenv pages (403 that day) are gone
  assert.ok(!guides.includes('enews.moenv.gov.tw'));
});

test('the three calculators import the shared module and carry no copy of the formulas', () => {
  for (const [file, fn] of [['RepairReplaceCalculator', 'evaluateRepairReplace'], ['PhoneKeepUpgradeCalculator', 'evaluatePhoneKeepUpgrade'], ['ExtendedWarrantyCalculator', 'evaluateExtendedWarranty']]) {
    const src = read(`../src/components/${file}.astro`);
    assert.ok(src.includes(`import { ${fn} } from '../lib/twRepairMath.mjs'`), file);
    assert.ok(src.includes(`${fn}({`), file);
  }
  assert.ok(!read('../src/components/RepairReplaceCalculator.astro').includes('recurrenceExpected'));
  assert.ok(!read('../src/components/ExtendedWarrantyCalculator.astro').includes('approvedConsumerCost'));
});
