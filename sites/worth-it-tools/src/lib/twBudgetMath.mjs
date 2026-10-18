/*
 * 不固定收入月預算 (P2 batch 11, 2026-10-18), zh only.
 *
 * Replaces the shared "50/20/15/10 split" budget calculator on /zh/tools/budget-builder/, which never used the annual and
 * quarterly bills the page is about. Pure functions, shared by the page script, the page's worked examples
 * (tests/tw-budget-math.test.mjs asserts every number the page prints) and the tests.
 *
 * This module is plain arithmetic and builds in NO rule, rate or tax bracket:
 *   - every income, bill, 補充保費 and 所得稅 figure is the reader's own number;
 *   - the 補充保費 rate is announced by the 主管機關 each year (全民健康保險法 第 33 條) and the 健保署 page answered 403 on
 *     2026-10-18, so the page asks the reader for the amount instead of computing it;
 *   - the 6-month reserve is this site's own suggestion for irregular earners, not an official rule (the default is only a
 *     starting value).
 * What the page text cites (read on 2026-10-18, Taiwan date), not used in any calculation here:
 *   - 115 年度綜合所得稅課稅級距與速算公式 (財政部 2025-11-27 公告, 適用 116 年 5 月申報): 5% 0~610,000; 12% 610,001~1,380,000;
 *     20% 1,380,001~2,770,000; 30% 2,770,001~5,190,000; 40% 5,190,001 以上; 速算公式 應納稅額 = 綜合所得淨額 x 稅率 - 累進差額
 *     (0; 42,700; 153,100; 430,100; 949,100). https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=34b463dc8f1b49f29d440d92a6fd5139
 *   - 所得稅法 第 14 條 第 1 項 第 2 類 執行業務所得. https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=14
 *   - 全民健康保險扣取及繳納補充保險費辦法 第 3、4 條: 單次給付達新臺幣 2 萬元者由扣費義務人扣取; 第 4 條 第 2 項 第 3 款
 *     專門職業及技術人員自行執業者、無一定雇主或自營作業而參加職業工會者之執行業務收入免扣; 第 7 款 非所屬投保單位給付且未達基本工資
 *     之薪資收入免扣. https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0060027
 *
 * Simplifications, stated on the page: a bill paid n times a year is spread evenly (amount x n / 12); income months are used as
 * typed (no growth, no seasonality model); the reserve target is the required monthly spending times the months chosen.
 */

export const MAX_INCOME_MONTHS = 24;
export const MAX_BILLS = 6;

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function need(name, value, { max = Infinity } = {}) {
  const n = safeNumber(value, NaN);
  if (!Number.isFinite(n) || n < 0 || n > max) throw new RangeError(`${name} must be a number from 0 to ${max}.`);
  return n;
}

/**
 * Parse "85000, 140000 30000" (commas, 、, spaces or new lines) into numbers; throws RangeError on anything else.
 * A thousands separator inside one amount ("85,000", "1,250,000") is ignored, so it is not read as two amounts; a comma
 * between two amounts needs a space after it (or have the amounts longer than three digits, as incomes are).
 */
export function parseIncomes(text) {
  const parts = String(text ?? '')
    .replace(/(?<!\d)(\d{1,3})((?:,\d{3})+)(?!\d)/g, (m) => m.replace(/,/g, ''))
    .split(/[\s,，、;；]+/)
    .filter((p) => p !== '');
  if (parts.length === 0) throw new RangeError('at least one month of income is required');
  if (parts.length > MAX_INCOME_MONTHS) throw new RangeError(`at most ${MAX_INCOME_MONTHS} months`);
  return parts.map((p) => need('income', p.replace(/,/g, '')));
}

/** Budget baseline: 'average' | 'lowest3' (average of the three lowest months, or of all if fewer) | 'worst'. */
export function incomeBaseline(incomes, mode) {
  if (!Array.isArray(incomes) || incomes.length === 0) throw new RangeError('at least one month of income is required');
  const sorted = [...incomes].sort((a, b) => a - b);
  if (mode === 'worst') return sorted[0];
  if (mode === 'lowest3') {
    const low = sorted.slice(0, 3);
    return low.reduce((s, v) => s + v, 0) / low.length;
  }
  if (mode === 'average') return incomes.reduce((s, v) => s + v, 0) / incomes.length;
  throw new RangeError('mode must be average, lowest3 or worst');
}

/** Monthly set-aside for one bill: amount per payment x payments per year / 12. */
export function monthlyEquivalent(amount, timesPerYear) {
  const a = need('amount', amount);
  const n = safeNumber(timesPerYear, NaN);
  if (!Number.isFinite(n) || n <= 0 || n > 12) throw new RangeError('timesPerYear must be greater than 0 and at most 12');
  return (a * n) / 12;
}

/**
 * incomes             每月收入 (the reader's last 3-24 months)
 * mode                'average' | 'lowest3' | 'worst'
 * fixedMonthly        每月固定支出 (房租或房貸, 伙食, 水電, 交通 ...; the reader's number)
 * bills               [{ name, amount, timesPerYear }]  年繳 1, 半年繳 2, 季繳 4 ...
 * withholdingMonthly  每月預估補充保費與其他就源扣繳款 (the reader's number; 0 if none)
 * reserveMonths       緊急預備金要幾個月的必要支出 (default 6, this site's own suggestion)
 * reserveBalance      目前的預備金餘額
 */
/**
 * @param {{ incomes: number[], mode?: string, fixedMonthly?: number | string, bills?: { name?: string, amount: number | string, timesPerYear: number | string }[],
 *   withholdingMonthly?: number | string, reserveMonths?: number | string, reserveBalance?: number | string }} input
 */
export function calculateIrregularBudget({ incomes, mode = 'average', fixedMonthly = 0, bills = [], withholdingMonthly = 0, reserveMonths = 6, reserveBalance = 0 }) {
  if (!Array.isArray(incomes) || incomes.length === 0) throw new RangeError('at least one month of income is required');
  incomes.forEach((v) => need('income', v));
  if (bills.length > MAX_BILLS) throw new RangeError(`at most ${MAX_BILLS} bills`);
  const fixed = need('fixedMonthly', fixedMonthly);
  const withholding = need('withholdingMonthly', withholdingMonthly);
  const months = need('reserveMonths', reserveMonths, { max: 36 });
  const balance = need('reserveBalance', reserveBalance);

  const billRows = bills.map((b) => ({ name: b.name?.trim() || '帳單', amount: need('amount', b.amount), timesPerYear: safeNumber(b.timesPerYear), monthly: monthlyEquivalent(b.amount, b.timesPerYear) }));
  const billsMonthly = billRows.reduce((s, b) => s + b.monthly, 0);
  const baseline = incomeBaseline(incomes, mode);
  const required = fixed + billsMonthly + withholding;
  const surplus = baseline - required;
  const sorted = [...incomes].sort((a, b) => a - b);
  const worst = sorted[0];
  const best = sorted[sorted.length - 1];
  const reserveTarget = months * required;
  const reserveGap = Math.max(0, reserveTarget - balance);
  return {
    baseline,
    average: incomeBaseline(incomes, 'average'),
    lowest3: incomeBaseline(incomes, 'lowest3'),
    worst,
    best,
    billRows,
    billsMonthly,
    required,
    surplus,
    worstGap: worst - required,
    leanMonths: incomes.filter((v) => v < required).length,
    reserveTarget,
    reserveGap,
    monthsToReserve: reserveGap === 0 ? 0 : surplus > 0 ? Math.ceil(reserveGap / surplus) : null,
  };
}
