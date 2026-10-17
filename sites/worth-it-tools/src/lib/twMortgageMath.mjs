/*
 * Taiwan mortgage arithmetic (P2 batch 2, 2026-10-17).
 *
 * Pure functions shared by the page script, the page's worked examples (rendered at
 * build time from these same functions) and tests/tw-mortgage-math.test.mjs.
 * The interest rate is always the reader's input; no bank's rate is built in.
 *
 * What is official, and where it was read on 2026-10-17:
 *
 *  - 本息平均攤還 (年金法): every month the same principal-plus-interest; the 平均攤還率
 *    is {(1+i)^n x i} / {(1+i)^n - 1} with i = 年利率 / 12 and n = 年期 x 12; interest =
 *    balance x i. 本金平均攤還: principal = loan / total months, interest on the balance.
 *    附寬限期: during the grace period only interest is paid, after which one of the two
 *    methods starts on the remaining term. 臺灣土地銀行 貸款還款方式說明
 *    https://www.landbank.com.tw/Calculate/Repayment
 *  - 房貸寬限期 is the period after drawdown in which the borrower pays interest only;
 *    after it, principal and interest are paid together. 金管會金融智慧網 房貸試算軟體
 *    https://moneywise.fsc.gov.tw/tabf/main/tool4.html
 *  - 提前清償違約金: 金管銀合字第 10902701761 號函 (109-02-03) -- computed on the
 *    loan balance or the amount prepaid (not the original loan), with the rate falling
 *    year by year. https://law.fsc.gov.tw/LawContent.aspx?id=GL003663
 *  - 房貸支出占收入 1/3 and 1/5 lights: 金管會金融智慧網 金融健檢. Not a bank approval rule.
 *    https://moneywise.fsc.gov.tw/tabf/main/tool1.html
 *
 * NOT official, and stated on the page as simplifications: payments are not rounded
 * month by month (a bank bill differs by a few dollars); the rate does not change;
 * the prepayment is made right after a given month's payment; the penalty rate and its
 * base are typed in by the reader (default 0).
 */

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export const monthlyRate = (aprPct) => Math.max(0, safeNumber(aprPct)) / 100 / 12;

/** 本息平均攤還: balance x i(1+i)^n / ((1+i)^n - 1); i = 0 gives balance / n. */
export function annuityPayment(balance, i, months) {
  if (months <= 0) return balance;
  if (i === 0) return balance / months;
  const g = (1 + i) ** months;
  return (balance * i * g) / (g - 1);
}

/**
 * Month-by-month schedule.
 *   principal     loan amount, or the balance left today
 *   aprPct        annual rate in percent (reader input)
 *   years         term in years
 *   graceYears    interest-only years inside the term (0 = none)
 *   method        'annuity' (本息平均攤還) | 'equalPrincipal' (本金平均攤還)
 *   prepay        { month, amount, mode, penaltyPct, penaltyBase }
 *                 a lump sum paid right after the payment of `month`.
 *                 mode 'shorten' keeps the monthly payment (term ends sooner);
 *                 mode 'lower' recomputes the payment over the remaining term.
 *                 penalty = penaltyPct% of the amount prepaid ('amount') or of the balance
 *                 before the prepayment ('balance').
 */
export function simulateMortgage({ principal, aprPct, years, graceYears = 0, method = 'annuity', prepay = null }) {
  const P = Math.max(0, safeNumber(principal));
  const N = Math.max(1, Math.round(safeNumber(years, 1) * 12));
  const G = Math.min(Math.max(0, Math.round(safeNumber(graceYears) * 12)), N - 1);
  const i = monthlyRate(aprPct);
  const amortMonths = N - G;
  // payments of the original plan (a grace period leaves the balance untouched)
  const payOriginal = annuityPayment(P, i, amortMonths);
  const principalOriginal = P / amortMonths;
  let payCur = payOriginal;
  let ppCur = principalOriginal;
  let balance = P;
  let totalInterest = 0;
  let totalPaid = 0;
  let prepaid = 0;
  let penalty = 0;
  const rows = [];
  const pre = prepay && safeNumber(prepay.amount) > 0 && safeNumber(prepay.month) >= 1 ? prepay : null;
  for (let month = 1; month <= N && balance > 0.005; month += 1) {
    const interest = balance * i;
    let princ;
    let payment;
    if (month <= G) {
      princ = 0;
      payment = interest;
    } else if (method === 'equalPrincipal') {
      princ = Math.min(ppCur, balance);
      payment = princ + interest;
    } else {
      payment = Math.min(payCur, balance + interest);
      princ = payment - interest;
    }
    balance -= princ;
    totalInterest += interest;
    totalPaid += payment;
    let extra = 0;
    if (pre && Math.round(safeNumber(pre.month)) === month && balance > 0.005) {
      extra = Math.min(safeNumber(pre.amount), balance);
      const base = pre.penaltyBase === 'balance' ? balance : extra;
      penalty = (base * Math.max(0, safeNumber(pre.penaltyPct))) / 100;
      balance -= extra;
      prepaid = extra;
      totalPaid += extra;
      if (pre.mode === 'lower' && balance > 0.005) {
        const left = month <= G ? amortMonths : N - month;
        payCur = annuityPayment(balance, i, left);
        ppCur = balance / left;
      }
    }
    rows.push({ month, interest, principal: princ, payment, extra, balance: Math.max(0, balance) });
  }
  if (rows.length === 0) {
    return { rows, months: 0, graceMonths: G, gracePayment: 0, firstAmortPayment: 0, lastPayment: 0, totalInterest: 0, totalPaid: 0, prepaid: 0, penalty: 0, totalCost: 0 };
  }
  const firstAmort = rows[G] ?? rows[rows.length - 1];
  return {
    rows,
    months: rows.length,
    graceMonths: G,
    gracePayment: G > 0 ? rows[0].payment : 0,
    firstAmortPayment: firstAmort.payment,
    lastPayment: rows[rows.length - 1].payment,
    totalInterest,
    totalPaid,
    prepaid,
    penalty,
    totalCost: totalInterest + penalty,
  };
}

/** Prepayment comparison against the same loan without it: interest saved, months saved, net of the penalty. */
export function prepayEffect(base, prepay) {
  const without = simulateMortgage(base);
  const withPrepay = simulateMortgage({ ...base, prepay });
  return {
    without,
    withPrepay,
    interestSaved: without.totalInterest - withPrepay.totalInterest,
    monthsSaved: without.months - withPrepay.months,
    netSaved: without.totalInterest - withPrepay.totalInterest - withPrepay.penalty,
  };
}

/**
 * 房貸支出占收入 (金管會金融智慧網 金融健檢): above 1/3 red, from 1/5 to 1/3 yellow,
 * below 1/5 green. With a grace period the guide says to use the payment after it ends.
 */
export function burdenLight(monthlyPayment, monthlyIncome) {
  const income = safeNumber(monthlyIncome);
  if (income <= 0) return null;
  const ratio = safeNumber(monthlyPayment) / income;
  const eps = 1e-9; // exactly 1/3 is not "above" 1/3, exactly 1/5 is yellow
  const light = ratio > 1 / 3 + eps ? 'red' : ratio >= 1 / 5 - eps ? 'yellow' : 'green';
  return { ratio, light };
}
