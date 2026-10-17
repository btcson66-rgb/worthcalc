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
 *  Refinance (轉貸), P2 batch 4, 2026-10-17 -- the cost items below, with their sources:
 *  - 抵押權設定登記費 = 擔保債權總金額 x 千分之一 (土地法第 76 條); 書狀費 每張 80 元 (土地法第 67 條); 塗銷登記免繳登記費
 *    (土地法第 78 條). 高雄市鳳山地政事務所 常見問答 states both figures:
 *    https://fongshan.kcg.gov.tw/News_Content/1828/7131/ ; 土地法 https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060001
 *  - 新銀行手續費／開辦費, 鑑價費, 代書費: set by each bank or provider and NOT built in. The page quotes two banks'
 *    published tariffs (滙豐 2026-09-15: 開辦費 7,000~10,000 incl. 他行轉貸; 台新 2025/08/20: 8,000 for 自住 with a
 *    3-year restricted period, 25,000 for 1 year, 50,000 with no restriction) as examples only.
 *  - 舊貸款提前清償違約金: the rate and base are in the contract; the principles are 金管銀合字第 10902701761 號函 (above)
 *    and the 個人購屋貸款定型化契約範本 (限制清償期間不得超過三年, 違約金採遞減, 死亡/重大傷殘不得收). The reader types
 *    the percentage; on a full payoff the base is taken as the balance paid off.
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

// ---------------------------------------------------------------------------------------------
// 轉貸 (refinance), P2 batch 4, 2026-10-17
// ---------------------------------------------------------------------------------------------

export const LAND_REGISTRATION_RATE = 0.001; // 土地法第 76 條: 千分之一
export const LAND_TITLE_SHEET_FEE = 80; // 土地法第 67 條 / 地政事務所: 每張 80 元

/** 抵押權設定登記費 = 擔保債權總金額 x 1/1000 (rounded to the dollar for display; the land office does the official rounding). */
export function mortgageRegistrationFee(securedAmount) {
  return Math.round(Math.max(0, safeNumber(securedAmount)) * LAND_REGISTRATION_RATE);
}

/**
 * One-off costs of moving a mortgage. Everything except the two statutory items is the reader's input.
 *   securedAmount  擔保債權總金額 (the 設定金額 in the new bank's contract; the bank sets it and it can exceed the loan)
 *   titleSheets    number of 他項權利證明書 (書狀費 each)
 *   penaltyPct     舊貸款提前清償違約金 as a percentage of the balance paid off (0 when outside the restricted period)
 */
export function refinanceCosts({ balance, securedAmount, newBankFee = 0, appraisalFee = 0, scrivenerFee = 0, otherFees = 0, titleSheets = 1, penaltyPct = 0 }) {
  const bal = Math.max(0, safeNumber(balance));
  const secured = safeNumber(securedAmount) > 0 ? safeNumber(securedAmount) : bal;
  const registration = mortgageRegistrationFee(secured);
  const titleFee = Math.max(0, Math.round(safeNumber(titleSheets, 1))) * LAND_TITLE_SHEET_FEE;
  const penalty = Math.round((bal * Math.max(0, safeNumber(penaltyPct))) / 100);
  const bank = Math.max(0, safeNumber(newBankFee));
  const appraisal = Math.max(0, safeNumber(appraisalFee));
  const scrivener = Math.max(0, safeNumber(scrivenerFee));
  const other = Math.max(0, safeNumber(otherFees));
  return { registration, titleFee, penalty, bank, appraisal, scrivener, other, total: registration + titleFee + penalty + bank + appraisal + scrivener + other };
}

/**
 * Compare staying with the old loan against moving the balance to a new loan.
 *   balance        balance owed today
 *   oldAprPct, oldMonthsLeft   today's rate and the months left on the old loan
 *   newAprPct, newMonths       the new loan (newMonths > oldMonthsLeft = the term is reset / extended)
 *   costs          total one-off costs (refinanceCosts().total), paid in cash
 * Both loans are 本息平均攤還, no grace period.
 *
 * Two break-even months, because they answer different questions:
 *   paymentBreakEven   costs / (old payment - new payment): "how long until the lower payment has paid the costs back".
 *                      It is fooled by a longer term: a smaller payment is not a saving if it is paid for longer.
 *   interestBreakEven  first month h with (interest the old loan would have charged in months 1..h) -
 *                      (interest the new loan charges in months 1..h) >= costs: "if I sell or repay in month h, am I ahead".
 *                      Balance + cumulative payments = principal + cumulative interest on both paths, so this is the real gain.
 */
export function evaluateRefinance({ balance, oldAprPct, oldMonthsLeft, newAprPct, newMonths, costs = 0 }) {
  const B = Math.max(0, safeNumber(balance));
  const oldN = Math.max(1, Math.round(safeNumber(oldMonthsLeft, 1)));
  const newN = Math.max(1, Math.round(safeNumber(newMonths, 1)));
  const oldLoan = simulateMortgage({ principal: B, aprPct: oldAprPct, years: oldN / 12 });
  const newLoan = simulateMortgage({ principal: B, aprPct: newAprPct, years: newN / 12 });
  const cost = Math.max(0, safeNumber(costs));
  const oldPayment = oldLoan.firstAmortPayment;
  const newPayment = newLoan.firstAmortPayment;
  const monthlySaving = oldPayment - newPayment;
  const paymentBreakEven = monthlySaving > 0 ? Math.ceil(cost / monthlySaving - 1e-9) : null;
  let interestBreakEven = null;
  let cumOld = 0;
  let cumNew = 0;
  const horizon = Math.min(oldLoan.rows.length, newLoan.rows.length);
  for (let h = 1; h <= horizon; h += 1) {
    cumOld += oldLoan.rows[h - 1].interest;
    cumNew += newLoan.rows[h - 1].interest;
    if (cumOld - cumNew >= cost - 1e-9) {
      interestBreakEven = h;
      break;
    }
  }
  const totalInterestSaved = oldLoan.totalInterest - newLoan.totalInterest;
  return {
    oldLoan, newLoan, oldPayment, newPayment, monthlySaving, paymentBreakEven, interestBreakEven,
    termExtensionMonths: Math.max(0, newN - oldN),
    totalInterestOld: oldLoan.totalInterest,
    totalInterestNew: newLoan.totalInterest,
    totalInterestSaved,
    netOverFullTerm: totalInterestSaved - cost,
    cost,
  };
}

/** Net gain (interest the old loan would have charged minus the new loan's, minus the costs) if the loan ends in month h. */
export function refinanceNetAtMonth(result, h) {
  const k = Math.max(0, Math.round(safeNumber(h)));
  const sum = (loan) => loan.rows.slice(0, k).reduce((acc, r) => acc + r.interest, 0);
  return sum(result.oldLoan) - sum(result.newLoan) - result.cost;
}
