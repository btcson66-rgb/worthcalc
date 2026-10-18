/*
 * 雪球法 vs 雪崩法 (P2 batch 11, 2026-10-18), zh only.
 *
 * Replaces the shared debt-strategy calculator on /zh/tools/debt-strategy/. Pure functions, shared by the page script,
 * the page's worked examples (tests/tw-debt-math.test.mjs asserts every number the page prints) and the tests.
 * Balances, rates and minimum payments are always the reader's own inputs (from the bill or the contract); the only
 * built-in figures are published rules, used to flag an input, never to fill one in.
 *
 * What is official, and where it was read on 2026-10-18 (Taiwan date):
 *
 *  - 銀行法 第 47-1 條 第 2 項: 自 104 年 9 月 1 日起, 銀行辦理現金卡之利率或信用卡業務機構辦理信用卡之循環信用利率
 *    不得超過年利率百分之十五. The cap is on 現金卡 and 信用卡循環信用 only; a 信用貸款, 車貸 or 學貸 is not covered by this
 *    article, so the page flags a rate above 15% only for the two debt kinds the article names.
 *    https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0380001&flno=47-1
 *  - 最低應繳金額: 金管會 金管銀票字第 10340001781 號令 (103-05-23 發布, 104-07-01 生效), 信用卡業務機構管理辦法第 44 條第 2 項:
 *    每期至少應包含 (一) 當期一般消費之 10%, (二) 當期預借現金、前期未清償之消費帳款及預借現金等應付帳款之 5%,
 *    (三) 每期應付之分期本金及利息, (四) 超過信用額度之全部使用信用卡交易金額, (五) 累計以前各期逾期未付最低應繳款項之總和,
 *    (六) 循環信用利息及各項費用. https://law.fsc.gov.tw/LawContent.aspx?id=GL001164
 *    This page does not compute a bank's 最低應繳 from the 令: the reader types the amount on the bill. The 令 is used for one
 *    thing only, a floor check on a card: a card with only an old balance (no new purchases, no installments, no overdue
 *    amount, no over-limit amount) owes at least 5% of the balance plus that month's revolving interest (items 二 and 六).
 *    cardMinimumFloor() computes that floor so the page can warn when the typed amount is lower; the interest in it is
 *    balance x rate / 12, an approximation of the bank's daily interest.
 *
 * NOT official, and stated on the page as simplifications:
 *  - monthly interest = balance x annual rate / 12 (a card bank charges daily interest; a loan may use another day count)
 *    and nothing is rounded to the dollar month by month;
 *  - the minimum payment is treated as a fixed amount, although a real card minimum falls as the balance falls, so a card
 *    paid at the minimum only is cleared a little slower in real life than here;
 *  - the extra amount and the freed minimum payments (the "snowball") go to the first debt in the order fixed at the start:
 *    snowball = smallest balance first, avalanche = highest rate first (ties: snowball takes the higher rate first,
 *    avalanche takes the smaller balance first, then input order);
 *  - the monthly budget (sum of all minimums + extra) stays the same every month;
 *  - no new borrowing, no change of rate (a promotional rate ending is not modelled), no fees, no 協商.
 */

export const CARD_RATE_CAP_PCT = 15; // 銀行法 第 47-1 條 第 2 項
export const CARD_BALANCE_MIN_SHARE = 0.05; // 金管會令 (二): 前期未清償之消費帳款之 5%
export const MAX_MONTHS = 1200; // 100 years: beyond this a plan is reported as not finishing

const EPS = 1e-7;

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * kind: 'card' (信用卡循環信用 or 現金卡: the only kinds 銀行法 第 47-1 條 caps) | 'loan' (信用貸款, 車貸, 學貸, 分期, 其他)
 * @typedef {{ name?: string, kind?: 'card' | 'loan', balance: number | string, ratePct: number | string, minPayment: number | string }} Debt
 */

/** Validate and normalise the debts; throws RangeError with a field name on bad input. */
export function normalizeDebts(debts) {
  if (!Array.isArray(debts) || debts.length === 0) throw new RangeError('at least one debt is required');
  return debts.map((d, i) => {
    const balance = safeNumber(d.balance, NaN);
    const ratePct = safeNumber(d.ratePct, NaN);
    const minPayment = safeNumber(d.minPayment, NaN);
    if (!Number.isFinite(balance) || balance <= 0) throw new RangeError(`debt ${i + 1}: balance must be greater than 0`);
    if (!Number.isFinite(ratePct) || ratePct < 0 || ratePct > 100) throw new RangeError(`debt ${i + 1}: rate must be between 0 and 100`);
    if (!Number.isFinite(minPayment) || minPayment < 0) throw new RangeError(`debt ${i + 1}: minimum payment must be 0 or more`);
    return { index: i, name: d.name?.trim() || `債務 ${i + 1}`, kind: d.kind === 'card' ? 'card' : 'loan', balance, ratePct, minPayment };
  });
}

/** Payoff order fixed at the start. 'snowball' = smallest balance first; 'avalanche' = highest rate first. */
export function payoffOrder(debts, strategy) {
  const list = normalizeDebts(debts);
  const byInput = (a, b) => a.index - b.index;
  const cmp =
    strategy === 'snowball'
      ? (a, b) => a.balance - b.balance || b.ratePct - a.ratePct || byInput(a, b)
      : strategy === 'avalanche'
        ? (a, b) => b.ratePct - a.ratePct || a.balance - b.balance || byInput(a, b)
        : null;
  if (!cmp) throw new RangeError('strategy must be snowball or avalanche');
  return [...list].sort(cmp).map((d) => d.index);
}

/**
 * Simulate the payoff.
 *   debts     the reader's debts (see Debt)
 *   extra     extra amount paid every month on top of all minimum payments (0 or more)
 *   strategy  'snowball' | 'avalanche'
 *
 * Every month: 1) interest = balance x rate / 12 is added to each open debt; 2) each open debt gets its minimum payment
 * (never more than it owes); 3) everything left of the fixed monthly budget (sum of the starting minimums + extra) goes to the
 * open debts in payoff order, each up to what it owes. When a debt is cleared its minimum payment is freed, which is why the
 * budget stays the same and the first debt in the order receives more.
 */
export function simulatePayoff(debts, extra, strategy) {
  const list = normalizeDebts(debts);
  const extraPay = safeNumber(extra, NaN);
  if (!Number.isFinite(extraPay) || extraPay < 0) throw new RangeError('extra must be 0 or more');
  const order = payoffOrder(list, strategy);
  const budget = list.reduce((sum, d) => sum + d.minPayment, 0) + extraPay;
  const bal = list.map((d) => d.balance);
  const payoffMonth = list.map(() => null);
  const interestPaid = list.map(() => 0);
  const history = []; // balances at the end of each month, in input order
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;

  while (month < MAX_MONTHS && bal.some((b) => b > EPS)) {
    month += 1;
    // 1) interest
    list.forEach((d, i) => {
      if (bal[i] <= EPS) return;
      const interest = (bal[i] * d.ratePct) / 100 / 12;
      bal[i] += interest;
      interestPaid[i] += interest;
      totalInterest += interest;
    });
    // 2) minimum payments
    let left = budget;
    list.forEach((d, i) => {
      if (bal[i] <= EPS) return;
      const pay = Math.min(d.minPayment, bal[i]);
      bal[i] -= pay;
      left -= pay;
      totalPaid += pay;
    });
    // 3) everything else, in payoff order
    for (const i of order) {
      if (left <= EPS) break;
      if (bal[i] <= EPS) continue;
      const pay = Math.min(left, bal[i]);
      bal[i] -= pay;
      left -= pay;
      totalPaid += pay;
    }
    list.forEach((_, i) => {
      if (payoffMonth[i] === null && bal[i] <= EPS) {
        bal[i] = 0;
        payoffMonth[i] = month;
      }
    });
    history.push(bal.map((b) => (b > EPS ? b : 0)));
  }

  const finished = bal.every((b) => b <= EPS);
  return {
    strategy,
    finished,
    months: finished ? month : null,
    monthsSimulated: month,
    totalInterest,
    totalPaid,
    remaining: bal.reduce((sum, b) => sum + (b > EPS ? b : 0), 0),
    order,
    orderNames: order.map((i) => list[i].name),
    payoffMonth,
    firstPayoffMonth: payoffMonth.filter((m) => m !== null).reduce((min, m) => Math.min(min, m), Infinity),
    interestPaid,
    budget,
    history,
  };
}

/** Both orders plus the "minimum payments only" baseline, and the gap between the two orders. */
export function compareStrategies(debts, extra) {
  const snowball = simulatePayoff(debts, extra, 'snowball');
  const avalanche = simulatePayoff(debts, extra, 'avalanche');
  const minimumOnly = simulatePayoff(debts, 0, 'avalanche');
  const both = snowball.finished && avalanche.finished;
  return {
    snowball,
    avalanche,
    minimumOnly,
    interestGap: both ? snowball.totalInterest - avalanche.totalInterest : null,
    monthsGap: both ? snowball.months - avalanche.months : null,
  };
}

/**
 * Per-debt input checks, returned as warnings the page shows next to the result (they never block the calculation).
 *   cardRateOverCap       a 'card' debt with a rate above 15% (銀行法 第 47-1 條 第 2 項)
 *   neverPaidDown         a minimum payment that does not cover the first month's interest (the balance would not fall)
 *   cardMinBelowFloor     a 'card' minimum below 5% of the balance plus one month's interest (金管會令 (二)(六), old balance only)
 */
export function inputWarnings(debts) {
  const list = normalizeDebts(debts);
  const out = [];
  for (const d of list) {
    if (d.kind === 'card' && d.ratePct > CARD_RATE_CAP_PCT + EPS) out.push({ code: 'cardRateOverCap', index: d.index, name: d.name, ratePct: d.ratePct });
    const interest = (d.balance * d.ratePct) / 100 / 12;
    if (d.minPayment <= interest + EPS && d.minPayment < d.balance + interest) out.push({ code: 'neverPaidDown', index: d.index, name: d.name, interest, minPayment: d.minPayment });
    if (d.kind === 'card') {
      const floor = cardMinimumFloor(d.balance, d.ratePct);
      if (d.minPayment < floor - 0.5) out.push({ code: 'cardMinBelowFloor', index: d.index, name: d.name, floor, minPayment: d.minPayment });
    }
  }
  return out;
}

/** 5% of the old balance plus one month of revolving interest (金管會令 (二)+(六)); a floor for a card with no other items. */
export function cardMinimumFloor(balance, ratePct) {
  const b = safeNumber(balance);
  return b * CARD_BALANCE_MIN_SHARE + (b * safeNumber(ratePct)) / 100 / 12;
}

/** Months as "X 年 Y 個月" (or "Y 個月" under a year). */
export function formatMonths(months) {
  if (months === null || months === undefined) return '還不完';
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} 個月`;
  return rest === 0 ? `${years} 年` : `${years} 年 ${rest} 個月`;
}
