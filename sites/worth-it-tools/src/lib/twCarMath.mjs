/*
 * 汽車負擔能力與完整月成本 (P2 batch 11, 2026-10-18), zh only.
 *
 * Replaces the shared (US-style) car calculator on /zh/tools/car-affordability/ (sales tax, registration fee, a single
 * "taxes and fees" lump). Pure functions, shared by the page script, the page's worked examples (tests/tw-car-math.test.mjs
 * asserts every number the page prints) and the tests. Income, the budget rule (交通支出上限), 任意險, 油電, 保養, 停車 and the
 * loan rate and term are the reader's inputs; what is built in is the published tax table, the published road fee table and
 * the published compulsory-insurance formula, each with an override box on the page.
 *
 * What is official, and where it was read on 2026-10-18 (Taiwan date):
 *
 *  - 使用牌照稅 (自用小客車, 依汽缸總排氣量): 使用牌照稅法 第 6 條 附表一 小客車使用牌照稅稅額表 (全國法規資料庫, PDF
 *    FileId 0000234183): 500cc 以下 1,620; 501-600 2,160; 601-1,200 4,320; 1,201-1,800 7,120; 1,801-2,400 11,230;
 *    2,401-3,000 15,210; 3,001-4,200 28,220; 4,201-5,400 46,170; 5,401-6,600 69,690; 6,601-7,800 117,000; 7,801 以上 151,200.
 *    電動小客車: 附表四 (FileId 0000235257), 依馬達最大馬力 (英制 HP): 38 以下 1,620; 38.1-56 2,160; 56.1-83 4,320; 83.1-182 7,120;
 *    182.1-262 11,230; 262.1-322 15,210; 322.1-414 28,220; 414.1-469 46,170; 469.1-509 69,690; 509.1 以上 117,000.
 *    第 10 條: 每年 4 月 1 日起一個月內一次徵收. 第 5 條 第 2 項: 直轄市及縣 (市) 政府 "得" 對完全以電能為動力之機動車輛免徵使用牌照稅,
 *    電動汽車自 101-01-06 至 119-12-31, so exemption is a local decision: the page asks the reader, default NOT exempt.
 *    https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=G0340095
 *  - 公路使用養護安全管理費 (舊稱汽車燃料使用費): 公路使用養護安全管理費徵收及分配辦法 (交通部, 修正 115-05-21) 第 3 條: 費率汽油每公升
 *    2.5 元、柴油每公升 1.5 元; 第 4 條 第 1 項 第 6 款: 電動汽車免徵; 第 6 條: 自用車與機車於每年 7 月一次徵收; 附表二 各型汽車每季 (年)
 *    徵收費額表 (FileId 0000418377), 自用小客車每年, 汽油 / 柴油: 251-500cc 2,160 / 1,296; 501-600 2,880 / 1,728; 601-1,200 4,320 / 2,592;
 *    1,201-1,800 4,800 / 2,880; 1,801-2,400 6,180 / 3,708; 2,401-3,000 7,200 / 4,320; 3,001-3,600 8,640 / 5,184; 3,601-4,200 9,810 / 5,886;
 *    4,201-4,800 11,220 / 6,732; 4,801-5,400 12,180 / 7,308; 5,401-6,000 13,080 / 7,848; 6,001-6,600 13,950 / 8,370;
 *    6,601-7,200 14,910 / 8,946; 7,201-8,000 15,720 / 9,432. The table has no row for a small car at 250cc or below or above 8,000cc;
 *    there the page asks the reader for the amount. Island registration (離島) is charged 70% (第 4 條 第 3 項) and is not modelled.
 *    https://law.moj.gov.tw/LawClass/LawAll.aspx?PCODE=K0040007 ; 公路法 第 27 條 (the statute: 使用燃料車輛之徵收費率不得超過燃料進口或出廠價格 25%).
 *    The thb.gov.tw (公路局) fee page answered with a bot challenge on 2026-10-18 and was NOT used.
 *  - 強制汽車責任保險 (保險事業發展中心 費率資訊, 113-04-17 修正, the latest version listed on the page on 2026-10-18):
 *    總保費 = (調整後純保費 + 保險人之業務費用 + 健全本保險之費用) / (1 - 特別補償基金提撥率 - 安定基金提存率) + 酒後駕車加費;
 *    自用小客車 (自然人) 調整後純保費 = 基本純保費 x (年齡性別係數 + 違規肇事紀錄等級係數 - 1); 汽車 業務費用 381.94 元, 健全本保險之費用 5.86 元,
 *    特別補償基金提撥率 3%, 安定基金提存率 0.2%, 酒後駕車加費 = 前一年酒駕紀錄次數 x 3,600 元; 基本純保費 965.15 (保險費計算實例);
 *    費率等級 1-10 係數 0.70 0.74 0.82 1.00 1.10 1.20 1.30 1.40 1.50 1.60; 第一次投保或無承保紀錄為第 4 等級; 年齡性別係數見 CAR_AGE_SEX.
 *    https://www.cali.org.tw/Rate/Default ; 保險費計算實例 https://www.cali.org.tw/files/Rate/Pdf/113insexample.pdf ;
 *    強制險費率表 https://www.cali.org.tw/files/Rate/Pdf/113Allcar.pdf (the page's table for 自用小客車 is reproduced by this formula for all
 *    120 cells; tested). 自 115-07-01 起給付標準提高 (死亡與第一等級失能 300 萬) is stated on the same site; whether the premium table was
 *    revised for it is not stated there, so the page tells the reader to use the insurer's quote.
 *  - 本息平均攤還 (車貸 payment): 臺灣土地銀行 貸款還款方式說明 https://www.landbank.com.tw/Calculate/Repayment (the same annuity formula as
 *    twMortgageMath.mjs). The loan rate and term are always the reader's input.
 *
 * NOT official, and stated on the page as simplifications: 交通支出上限 is the reader's own budget rule; the loan is paid as a
 * level 本息平均攤還 with an unchanging rate and nothing is rounded month by month; the 貨物稅, 營業稅 and 領牌規費 are inside the quoted
 * price or typed as 其他一次性費用 (nothing built in); 任意險, 油電, 保養 and 停車 are the reader's numbers; 貸款手續費 and 動保 are not modelled.
 */

/** [上限 cc (inclusive), 年稅額]; 自用小客車. 使用牌照稅法 第 6 條 附表一. */
export const LICENSE_TAX_PETROL = Object.freeze([
  [500, 1620], [600, 2160], [1200, 4320], [1800, 7120], [2400, 11230], [3000, 15210],
  [4200, 28220], [5400, 46170], [6600, 69690], [7800, 117000], [Infinity, 151200],
]);

/** [上限 英制 HP (inclusive), 年稅額]; 完全以電能為動力之電動小客車 自用. 使用牌照稅法 第 6 條 附表四. */
export const LICENSE_TAX_EV = Object.freeze([
  [38, 1620], [56, 2160], [83, 4320], [182, 7120], [262, 11230], [322, 15210],
  [414, 28220], [469, 46170], [509, 69690], [Infinity, 117000],
]);

/** [下限 cc, 上限 cc, 汽油 每年, 柴油 每年]; 自用小客車. 公路使用養護安全管理費徵收及分配辦法 附表二. */
export const ROAD_FEE_PRIVATE_CAR = Object.freeze([
  [251, 500, 2160, 1296], [501, 600, 2880, 1728], [601, 1200, 4320, 2592], [1201, 1800, 4800, 2880],
  [1801, 2400, 6180, 3708], [2401, 3000, 7200, 4320], [3001, 3600, 8640, 5184], [3601, 4200, 9810, 5886],
  [4201, 4800, 11220, 6732], [4801, 5400, 12180, 7308], [5401, 6000, 13080, 7848], [6001, 6600, 13950, 8370],
  [6601, 7200, 14910, 8946], [7201, 8000, 15720, 9432],
]);

export const COMPULSORY = Object.freeze({
  basePurePremium: 965.15,
  operatingCost: 381.94,
  soundnessCost: 5.86,
  specialFundRate: 0.03,
  stabilityFundRate: 0.002,
  drunkSurchargePerRecord: 3600,
});

/** 費率等級 1-10 的係數 (違規肇事紀錄等級係數). */
export const CAR_LEVEL_COEFFICIENT = Object.freeze([0.7, 0.74, 0.82, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6]);
export const FIRST_TIME_LEVEL = 4;

/** 年齡性別係數: age band -> [男, 女]. */
export const CAR_AGE_SEX = Object.freeze({
  'u20': { label: '20 歲（含）以下', male: 2.5, female: 1.66 },
  '21-25': { label: '超過 20 歲至 25 歲（含）以下', male: 2.3, female: 1.53 },
  '26-30': { label: '超過 25 歲至 30 歲（含）以下', male: 1.47, female: 1.06 },
  '31-60': { label: '超過 30 歲至 60 歲（含）以下', male: 1.0, female: 0.92 },
  'o60': { label: '超過 60 歲以上', male: 1.05, female: 0.79 },
});

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function need(name, value, { positive = false, max = Infinity } = {}) {
  const n = safeNumber(value, NaN);
  if (!Number.isFinite(n) || n < 0 || (positive && n <= 0) || n > max) {
    throw new RangeError(`${name} must be ${positive ? 'greater than 0' : 'a number of 0 or more'}${max < Infinity ? ` and at most ${max}` : ''}.`);
  }
  return n;
}

/** 使用牌照稅 (per year) for 自用小客車 by 排氣量 cc, or by 馬力 (英制 HP) for 完全以電能為動力. */
export function licenseTax({ drivetrain, cc, hp, evExempt = false }) {
  if (drivetrain === 'ev') {
    if (evExempt) return { amount: 0, exempt: true };
    const power = need('hp', hp, { positive: true });
    const row = LICENSE_TAX_EV.find(([upper]) => power <= upper);
    return { amount: row[1], exempt: false };
  }
  const volume = need('cc', cc, { positive: true });
  const row = LICENSE_TAX_PETROL.find(([upper]) => volume <= upper);
  return { amount: row[1], exempt: false };
}

/** 公路養管費 (per year) for 自用小客車, or null when the published table has no row (the reader must type it). */
export function roadFee({ drivetrain, cc }) {
  if (drivetrain === 'ev') return { amount: 0, exempt: true, listed: true }; // 辦法 第 4 條 第 1 項 第 6 款: 電動汽車免徵
  const volume = need('cc', cc, { positive: true });
  const row = ROAD_FEE_PRIVATE_CAR.find(([lo, hi]) => volume >= lo && volume <= hi);
  if (!row) return { amount: null, exempt: false, listed: false };
  return { amount: drivetrain === 'diesel' ? row[3] : row[2], exempt: false, listed: true };
}

/**
 * 強制汽車責任保險 一年期保費, 自用小客車 (自然人), rounded to the dollar as the 保發中心 examples do.
 *   ageBand  key of CAR_AGE_SEX      sex  'male' | 'female'      level  1-10 (first time or no record: 4)
 *   drunkRecords  前一年酒後駕車違規紀錄次數 (0 or more)
 */
export function compulsoryPremium({ ageBand, sex, level = FIRST_TIME_LEVEL, drunkRecords = 0 }) {
  const band = CAR_AGE_SEX[ageBand];
  if (!band || (sex !== 'male' && sex !== 'female')) throw new RangeError('ageBand or sex is not valid');
  const lv = Math.round(safeNumber(level, NaN));
  if (!(lv >= 1 && lv <= 10)) throw new RangeError('level must be 1 to 10');
  const drunk = need('drunkRecords', drunkRecords);
  const { basePurePremium, operatingCost, soundnessCost, specialFundRate, stabilityFundRate, drunkSurchargePerRecord } = COMPULSORY;
  const adjusted = basePurePremium * (band[sex] + CAR_LEVEL_COEFFICIENT[lv - 1] - 1);
  const raw = (adjusted + operatingCost + soundnessCost) / (1 - specialFundRate - stabilityFundRate) + drunkSurchargePerRecord * drunk;
  return Math.round(raw);
}

/** 本息平均攤還 monthly payment. */
export function loanPayment(principal, aprPct, months) {
  const i = Math.max(0, safeNumber(aprPct)) / 100 / 12;
  if (months <= 0) return principal;
  if (i === 0) return principal / months;
  const g = (1 + i) ** months;
  return (principal * i * g) / (g - 1);
}

/** Principal a monthly payment can carry over `months` at `aprPct`: payment x (1 - (1 + i)^-n) / i. */
export function loanPrincipalFor(payment, aprPct, months) {
  const i = Math.max(0, safeNumber(aprPct)) / 100 / 12;
  if (i === 0) return payment * months;
  return (payment * (1 - (1 + i) ** -months)) / i;
}

/**
 * Affordability.
 *   takeHome            每月實領收入         otherDebtPayments   其他債務月付      livingCosts  必要生活支出     savingsTarget  每月儲蓄目標
 *   downPayment         頭期款               tradeIn             舊車折抵淨值      oneTimeCosts 其他一次性購車費用 (reader's number, default 0)
 *   aprPct, termMonths  車貸年利率與期數 (reader's number)
 *   drivetrain          'petrol' | 'diesel' | 'ev'        cc / hp   排氣量 / 馬達最大馬力 (英制)       evExempt  所在縣市已免徵使用牌照稅
 *   licenseTaxOverride, roadFeeOverride, compulsoryOverride   yearly amounts typed by the reader (null = use the table / formula)
 *   ageBand, sex, level, drunkRecords                         for 強制險
 *   optionalInsuranceYear  任意險 每年   fuelMonthly 油電 每月   maintenanceMonthly 保養 每月   parkingMonthly 停車與通行費 每月
 *   transportCapPct     交通支出上限 (% of 實領, the reader's own rule)
 */
export function calculateTwCar(input) {
  const takeHome = need('takeHome', input.takeHome, { positive: true });
  const otherDebt = need('otherDebtPayments', input.otherDebtPayments ?? 0);
  const living = need('livingCosts', input.livingCosts ?? 0);
  const savings = need('savingsTarget', input.savingsTarget ?? 0);
  const down = need('downPayment', input.downPayment ?? 0);
  const tradeIn = need('tradeIn', input.tradeIn ?? 0);
  const oneTime = need('oneTimeCosts', input.oneTimeCosts ?? 0);
  const apr = need('aprPct', input.aprPct ?? 0, { max: 100 });
  const months = Math.round(need('termMonths', input.termMonths, { positive: true, max: 120 }));
  const capPct = need('transportCapPct', input.transportCapPct, { positive: true, max: 100 });
  const optionalYear = need('optionalInsuranceYear', input.optionalInsuranceYear ?? 0);
  const fuel = need('fuelMonthly', input.fuelMonthly ?? 0);
  const maintenance = need('maintenanceMonthly', input.maintenanceMonthly ?? 0);
  const parking = need('parkingMonthly', input.parkingMonthly ?? 0);

  const drivetrain = input.drivetrain === 'ev' || input.drivetrain === 'diesel' ? input.drivetrain : 'petrol';

  const taxResult = input.licenseTaxOverride != null ? { amount: need('licenseTaxOverride', input.licenseTaxOverride), exempt: false, typed: true } : licenseTax({ drivetrain, cc: input.cc, hp: input.hp, evExempt: !!input.evExempt });
  const feeTable = roadFee({ drivetrain, cc: drivetrain === 'ev' ? 1 : input.cc });
  let feeAmount;
  if (input.roadFeeOverride != null) feeAmount = need('roadFeeOverride', input.roadFeeOverride);
  else if (feeTable.amount === null) throw new RangeError('roadFee: the published table has no row for this displacement; type the amount');
  else feeAmount = feeTable.amount;
  const compulsoryAmount =
    input.compulsoryOverride != null
      ? need('compulsoryOverride', input.compulsoryOverride)
      : compulsoryPremium({ ageBand: input.ageBand ?? '31-60', sex: input.sex ?? 'male', level: input.level ?? FIRST_TIME_LEVEL, drunkRecords: input.drunkRecords ?? 0 });

  const fixedYear = taxResult.amount + feeAmount + compulsoryAmount + optionalYear;
  const fixedMonthly = fixedYear / 12;
  const holdingMonthly = fixedMonthly + fuel + maintenance + parking;

  const afterLiving = takeHome - otherDebt - living - savings - holdingMonthly; // what is left of the take-home pay
  const capBudget = (takeHome * capPct) / 100;
  const afterCap = capBudget - holdingMonthly; // what the transport cap leaves for the loan
  const affordablePayment = Math.max(0, Math.min(afterLiving, afterCap));
  const binding = afterLiving < afterCap ? 'living' : 'cap';
  const principal = loanPrincipalFor(affordablePayment, apr, months);
  const maxPrice = principal > 0 ? principal + down + tradeIn - oneTime : 0;
  const totalInterest = affordablePayment * months - principal;

  return {
    drivetrain,
    licenseTax: taxResult.amount,
    licenseTaxExempt: !!taxResult.exempt,
    roadFee: feeAmount,
    roadFeeExempt: !!feeTable.exempt && input.roadFeeOverride == null,
    compulsory: compulsoryAmount,
    optionalInsuranceYear: optionalYear,
    fixedYear,
    fixedMonthly,
    holdingMonthly,
    capBudget,
    afterLiving,
    afterCap,
    affordablePayment,
    binding,
    overBudget: afterLiving < 0 || afterCap < 0,
    principal,
    maxPrice,
    totalInterest,
    months,
    paymentShare: (affordablePayment + holdingMonthly) / takeHome,
  };
}
