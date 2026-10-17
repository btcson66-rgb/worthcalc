// P2 batch 4 (2026-10-17): the arithmetic behind the membership / subscription pages. The pages print numbers
// computed from src/lib/twMembershipMath.mjs at build time; this test pins those numbers and checks that the
// static decision-guide text in src/data/decisionGuides.ts (which cannot import the module) says the same thing.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
  auditSubscriptions, breakEvenMonths, deliveryBreakEven, elapsedMonthsBy15DayRule, gymAveragePrice,
  gymCost, gymEarlyTermination, gymJoiningFeeCap, monthlyEquivalent, monthlyVsAnnual,
} from '../src/lib/twMembershipMath.mjs';

const guidesSource = readFileSync(new URL('../src/data/decisionGuides.ts', import.meta.url), 'utf8');
/** The zh block of one exported guide in decisionGuides.ts. */
function zhGuide(exportName) {
  const start = guidesSource.indexOf(`export const ${exportName}`);
  assert.ok(start >= 0, exportName);
  const zh = guidesSource.indexOf('\n  zh: {', start);
  const end = guidesSource.indexOf('\n};\n', zh);
  return guidesSource.slice(zh, end);
}
const pageSource = (name) => readFileSync(new URL(`../src/pages/${name}`, import.meta.url), 'utf8');

const gymIn = { joiningFee: 1200, monthlyFee: 1288, serviceFee: 100, contractMonths: 12, missedMonths: 2, visitsPerActiveMonth: 6, dropInCost: 450 };

test('gym defaults on the page are the guide example', () => {
  const page = pageSource('[locale]/gym-membership-cost-per-visit.astro');
  assert.ok(page.includes('defaults: { joiningFee: 1200, monthlyFee: 1288, serviceFee: 100, contractMonths: 12, missedMonths: 2, visitsPerActiveMonth: 6, dropInCost: 450 }'));
});

test('gym cost per visit: 17,856 / 60 = 297.60, 4 visits a month break even, member ahead by 9,144', () => {
  const r = gymCost(gymIn);
  assert.equal(r.activeMonths, 10);
  assert.equal(r.totalCost, 17856);
  assert.equal(r.totalVisits, 60);
  assert.equal(r.costPerVisit.toFixed(2), '297.60');
  assert.equal(r.alternativeCost, 27000);
  assert.equal(r.difference, 9144);
  assert.equal(r.breakEvenVisitsPerActiveMonth, 4);
  const guide = zhGuide('gymCostGuides');
  for (const text of ['NT$17,856', 'NT$297.60', 'NT$27,000', 'NT$9,144', '每個有效月份 4 次']) assert.ok(guide.includes(text), text);
});

test('gym sensitivity rows in the guide', () => {
  const rows = [
    [{ visitsPerActiveMonth: 2 }, 20, '892.80', -8856, 'NT$8,856'],
    [{ visitsPerActiveMonth: 4 }, 40, '446.40', 144, 'NT$144'],
    [{ visitsPerActiveMonth: 6 }, 60, '297.60', 9144, 'NT$9,144'],
    [{ missedMonths: 0 }, 72, '248.00', 14544, 'NT$14,544'],
  ];
  const guide = zhGuide('gymCostGuides');
  for (const [override, visits, per, diff, text] of rows) {
    const r = gymCost({ ...gymIn, ...override });
    assert.equal(r.totalVisits, visits);
    assert.equal(r.costPerVisit.toFixed(2), per);
    assert.equal(r.difference, diff);
    assert.ok(guide.includes(text), text);
  }
});

test('gym: 入會費上限 = 月平均價格 x 2 (規範第五點)', () => {
  assert.equal(gymAveragePrice(17856, 12), 1488);
  assert.equal(gymJoiningFeeCap(17856, 12), 2976);
  assert.ok(1200 <= gymJoiningFeeCap(17856, 12));
});

test('十五日規則: 未滿十五日半個月, 逾十五日一個月', () => {
  assert.equal(elapsedMonthsBy15DayRule(4, 0), 4);
  assert.equal(elapsedMonthsBy15DayRule(4, 10), 4.5);
  assert.equal(elapsedMonthsBy15DayRule(4, 15), 4.5);
  assert.equal(elapsedMonthsBy15DayRule(3, 20), 4);
});

test('gym 中途終止 算例一 (預繳 14,400, 用 4 個月又 10 天)', () => {
  const base = { contractTotal: 14400, contractMonths: 12, payment: 'prepaid', paidSoFar: 14400, elapsedMonths: elapsedMonthsBy15DayRule(4, 10) };
  const none = gymEarlyTermination({ ...base, feeType: 'none' });
  assert.equal(none.avgPrice, 1200);
  assert.equal(none.usedCharge, 5400);
  assert.equal(none.balance, 9000);
  assert.equal(none.net, 9000);
  const fixed = gymEarlyTermination({ ...base, feeType: 'fixed' });
  assert.equal(fixed.net, 8400);
  const pct = gymEarlyTermination({ ...base, feeType: 'percent', feePct: 10 });
  assert.equal(pct.fee, 900); // 1,200 x 7.5 unexpired months x 10%
  assert.equal(pct.net, 8100);
  // the percentage is capped at the regulation's 20%
  assert.equal(gymEarlyTermination({ ...base, feeType: 'percent', feePct: 50 }).fee, 1800);
});

test('gym 中途終止 算例二 (月繳 1,300 x 12, 已繳 3 個月, 第 4 個月逾十五日)', () => {
  const r = gymEarlyTermination({ contractTotal: 15600, contractMonths: 12, payment: 'monthly', paidSoFar: 3900, elapsedMonths: elapsedMonthsBy15DayRule(3, 20), feeType: 'fixed' });
  assert.equal(r.avgPrice, 1300);
  assert.equal(r.usedCharge, 5200);
  assert.equal(r.balance, -1300);
  assert.equal(r.fee, 600);
  assert.equal(r.net, -1900); // the member tops up 1,900
});

test('gym 七日內且未使用: 全額退還', () => {
  const r = gymEarlyTermination({ contractTotal: 14400, contractMonths: 12, paidSoFar: 14400, elapsedMonths: 0, daysSinceStart: 5, usedFacility: false });
  assert.equal(r.rule, 'sevenDayFullRefund');
  assert.equal(r.net, 14400);
  // used the facility, or past day 7: the pro-rata rule applies
  assert.notEqual(gymEarlyTermination({ contractTotal: 14400, contractMonths: 12, paidSoFar: 14400, elapsedMonths: 0.5, daysSinceStart: 5, usedFacility: true }).rule, 'sevenDayFullRefund');
});

test('gym 手續費加計應補足金額上限 6,000 元', () => {
  const r = gymEarlyTermination({ contractTotal: 120000, contractMonths: 12, payment: 'monthly', paidSoFar: 10000, elapsedMonths: 2, feeType: 'percent', feePct: 20 });
  // avg 10,000; used 20,000; top-up 10,000 already above 6,000 -> fee squeezed to 0 by the cap
  assert.equal(r.capped, true);
  assert.equal(r.fee, 0);
  const r2 = gymEarlyTermination({ contractTotal: 120000, contractMonths: 12, payment: 'prepaid', paidSoFar: 120000, elapsedMonths: 1, feeType: 'percent', feePct: 20 });
  // fee = 10,000 x 11 x 20% = 22,000, cap 6,000 (nothing to top up)
  assert.equal(r2.fee, 6000);
  assert.equal(r2.capped, true);
});

test('delivery: defaults on the page and the guide example (示範輸入)', () => {
  const page = pageSource('[locale]/delivery-membership-break-even.astro');
  assert.ok(page.includes('defaults: { membershipFee: 1000, unusedMonths: 2, ordersPerActiveMonth: 3, eligibleOrderRate: 80, deliveryFeeDifference: 50, serviceFeeDifference: 10, extraSpendPerEligibleOrder: 0 }'));
  const base = { membershipFee: 1000, unusedMonths: 2, ordersPerActiveMonth: 3, eligibleRatePct: 80, deliverySaving: 50, serviceSaving: 10, extraSpend: 0 };
  const r = deliveryBreakEven(base);
  assert.equal(r.activeMonths, 10);
  assert.equal(r.plannedOrders, 30);
  assert.equal(r.eligibleOrders, 24);
  assert.equal(r.savingPerEligibleOrder, 60);
  assert.equal(r.grossSavings, 1440);
  assert.equal(r.netValue, 440);
  assert.equal(r.breakEvenOrders, 17);
  const guide = zhGuide('deliveryMembershipGuides');
  for (const text of ['NT$1,000', 'NT$1,440', 'NT$440', '17 筆', '17 單']) assert.ok(guide.includes(text), text);
  const rows = [
    [{ ordersPerActiveMonth: 1 }, 8, 480, -520, 'NT$480', 'NT$520'],
    [{ eligibleRatePct: 50 }, 15, 900, -100, 'NT$900', 'NT$100'],
    [{ extraSpend: 25 }, 24, 840, -160, 'NT$840', 'NT$160'],
  ];
  for (const [override, eligible, gross, net, g, n] of rows) {
    const x = deliveryBreakEven({ ...base, ...override });
    assert.equal(x.eligibleOrders, eligible);
    assert.equal(x.grossSavings, gross);
    assert.equal(x.netValue, net);
    assert.ok(guide.includes(g) && guide.includes(n), `${g} ${n}`);
  }
  // no saving per order: break-even is impossible, reported as 0
  assert.equal(deliveryBreakEven({ ...base, deliverySaving: 5, serviceSaving: 0, extraSpend: 10 }).breakEvenOrders, 0);
});

test('monthly vs annual: 300 / 2,880', () => {
  assert.equal(breakEvenMonths(300, 2880), 9.6);
  const base = { monthlyPrice: 300, annualPrice: 2880, earlyMonth: 4 };
  const r = monthlyVsAnnual({ ...base, probabilityFullYearPct: 80 });
  assert.equal(r.expectedMonthly, 3120);
  assert.equal(r.annualSaves, 240);
  assert.equal(r.annualLosesIfEarly, 1680);
  assert.equal(r.tieProbabilityPct, 70);
  assert.equal(monthlyVsAnnual({ ...base, probabilityFullYearPct: 50 }).expectedMonthly, 2400);
  assert.equal(monthlyVsAnnual({ ...base, probabilityFullYearPct: 70 }).annualSaves, 0);
  assert.equal(monthlyVsAnnual({ ...base, probabilityFullYearPct: 100 }).annualSaves, 720);
  const guide = zhGuide('monthlyAnnualGuides');
  for (const text of ['9.6 個月', 'NT$3,120', 'NT$240', 'NT$2,400', 'NT$2,880', 'NT$720']) assert.ok(guide.includes(text), text);
});

test('subscription audit: the default rows and the guide example', () => {
  assert.equal(monthlyEquivalent(690, 'yearly'), 57.5);
  assert.equal(monthlyEquivalent(300, 'quarterly'), 100);
  const a = auditSubscriptions([
    { price: 390, cycle: 'monthly', hours: 12 },
    { price: 180, cycle: 'monthly', hours: 20 },
    { price: 690, cycle: 'yearly', hours: 2 },
  ]);
  assert.equal(a.monthly, 627.5);
  assert.equal(a.yearly, 7530);
  assert.equal(a.fiveYear, 37650);
  assert.deepEqual(a.items.map((i) => i.costPerHour), [32.5, 9, 28.75]);
  const guide = zhGuide('subscriptionGuides');
  for (const text of ['NT$7,530', 'NT$37,650', 'NT$627.5', 'NT$32.5', 'NT$9', 'NT$28.75', 'NT$5,370', 'NT$2,160', 'NT$8,283']) assert.ok(guide.includes(text), text);
  assert.equal(auditSubscriptions([{ price: 390, cycle: 'monthly', hours: 12 }, { price: 690, cycle: 'yearly', hours: 2 }]).yearly, 390 * 12 + 690);
  assert.equal(Math.round(a.yearly * 1.1), 8283);
  assert.equal(a.yearly - 180 * 12, 5370);
  const tool = pageSource('zh/tools/subscription-audit.astro');
  assert.ok(tool.includes("price: 390, cycle: 'monthly', hours: 12") && tool.includes("price: 180, cycle: 'monthly', hours: 20") && tool.includes("price: 690, cycle: 'yearly', hours: 2"));
});

test('the merged pages are gone from the page tree and stubbed in the registry', () => {
  const registry = JSON.parse(readFileSync(new URL('../src/data/redirect-stubs.json', import.meta.url), 'utf8'));
  const map = new Map(registry.stubs.map((s) => [s.from, s.to]));
  assert.equal(map.get('/zh/subscription-creep/'), '/zh/tools/subscription-audit/');
  assert.equal(map.get('/en/subscription-creep/'), '/en/tools/subscription-audit/');
  assert.equal(map.get('/zh/paid-membership-break-even/'), '/zh/tools/costco-membership/');
  assert.equal(map.get('/en/paid-membership-break-even/'), '/en/tools/costco-membership/');
  for (const gone of ['[locale]/paid-membership-break-even.astro', 'zh/subscription-creep.astro', 'en/subscription-creep.astro']) {
    assert.equal(existsSync(new URL(`../src/pages/${gone}`, import.meta.url)), false, gone);
  }
});
