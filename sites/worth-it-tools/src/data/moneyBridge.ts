/*
 * The money-brief spider bridge (2026-11-08, task pack TP-20261108-P2-WORTHCALC).
 *
 * Google had indexed `/`, the /zh/tools/* calculators and two guides, but none of the
 * /zh/money/* briefs. A page that nothing indexed links to can only be found through
 * static <a href> links on pages Google already knows, so each indexed page carries a
 * "台灣在地金錢決策延伸試算" table that points to the briefs on the same decision.
 *
 * ONE map drives all of it:
 *   BRIDGE_MAP      indexed page (locale-free logical path) -> money brief slugs
 *   MONEY_ANCHORS   money brief slug -> keyword anchor text + one neutral sentence
 *
 * Rules for editing this file
 *   - The sentences carry NO figures. Every NT$ amount, rate and threshold lives in the brief
 *     itself, next to its source. Repeating a number here would give it a second place to go stale.
 *   - A slug that is not live (draft, or `publishAt` in the future) is skipped at render time by
 *     src/components/MoneyBridge.astro, so no link ever points at a 404.
 *   - A slug that does not exist at all throws at build time (typo guard).
 *   - `npm run check:money-bridge` parses dist/ and fails if any live money page gets fewer than
 *     two inbound links from the indexed set, so adding a brief without mapping it fails CI.
 */

export interface MoneyAnchor {
  /** Keyword anchor text, the phrase a reader would search. */
  anchor: string;
  /** What the reader finds there, without any figure. */
  note: string;
}

export const MONEY_ANCHORS: Record<string, MoneyAnchor> = {
  'ac-energy-grade-payback': { anchor: '冷氣一級能效回本', note: '一級與三級冷氣的耗電差，換算成電費要多久才補回價差。' },
  'car-loan-vs-cash': { anchor: '車貸 vs 付現試算', note: '同一台車貸款與付現，利息與機會成本各差多少。' },
  'car-road-fee-license-tax-fixed-cost': { anchor: '牌照稅與公路養管費一年多少', note: '不同排氣量每年躲不掉的兩筆固定稅費，逐級對照。' },
  'central-bank-rate-mortgage-payment': { anchor: '央行升息房貸月付', note: '央行調整利率後，同一筆房貸的月付怎麼變，前提是銀行全數反映。' },
  'dependent-exemption-tax-savings': { anchor: '扶養親屬免稅額省稅', note: '多報一位扶養親屬能省的稅，取決於你的邊際稅率。' },
  'e-scooter-subsidy-2026': { anchor: '電動機車補助 2026', note: '中央加縣市的電動機車購車補助怎麼疊加，扣掉補助後的實付價。' },
  'freeway-etc-commute-toll': { anchor: '國道 ETC 通勤費', note: '每天走國道通勤，一個月的 ETC 通行費怎麼算。' },
  'house-tax-owner-occupied-vs-non': { anchor: '房屋稅自住稅率', note: '自住與非自住的房屋稅稅率差，同一間房子的稅額對照。' },
  'itemized-vs-standard-deduction': { anchor: '列舉扣除 vs 標準扣除額', note: '有房貸時，列舉與標準扣除額哪個划算。' },
  'labor-insurance-old-age-lump-sum-vs-annuity': { anchor: '勞保老年給付年金試算', note: '勞保老年年金的公式、請領年齡與提前減給怎麼算。' },
  'labor-pension-contribution-wage-table': { anchor: '勞退提繳工資分級表', note: '月提繳工資怎麼分級，雇主提繳與自提各自怎麼算。' },
  'labor-pension-voluntary-contribution-tax': { anchor: '勞退自提 6% 節稅', note: '勞退自提 6% 從所得額扣除，一年能省多少稅。' },
  'land-value-tax-owner-occupied-rate': { anchor: '地價稅自用住宅稅率', note: '自用住宅優惠稅率要申請，沒申請就按一般稅率。' },
  'mortgage-grace-period-end-payment': { anchor: '房貸寬限期結束月付', note: '寬限期結束後月付會跳多少，用還本付息期的月付先算好。' },
  'mortgage-prepay-vs-invest': { anchor: '房貸提前還款 vs 定存', note: '多一筆錢，提前還房貸與放定存，一年的差額怎麼比。' },
  'mortgage-refinance-break-even': { anchor: '房貸轉貸回本試算', note: '轉貸要付的設定費、代書費與違約金，幾個月才回本。' },
  'national-pension-vs-labor-insurance': { anchor: '國民年金 vs 勞保', note: '國民年金與勞保的保費與老年給付，兩種身分怎麼差。' },
  'nhi-premium-insured-salary-grade': { anchor: '健保費投保金額級距', note: '月薪對應的投保金額級距，自付保費與眷屬加保怎麼算。' },
  'nhi-supplementary-premium': { anchor: '二代健保補充保費', note: '獎金與單筆給付什麼時候會被扣補充保費。' },
  'phone-contract-subsidy-value': { anchor: '手機綁約補貼值', note: '電信綁約送的手機補貼，攤到每月到底值多少。' },
  'rent-subsidy-300b-amount': { anchor: '300億租金補貼金額', note: '中央租金補貼各類身分每月能領多少，申請前先算。' },
  'savings-insurance-irr': { anchor: '儲蓄險 IRR 年化報酬', note: '繳費年期與領回金額換成年化報酬率，和定存對照。' },
  'taipower-summer-rates-ac-bill': { anchor: '夏月冷氣電費', note: '夏天開冷氣一個月多繳多少電費，要看原本用電落在哪個級距。' },
  'taipower-summer-vs-non-summer-rates': { anchor: '台電夏月電價', note: '同樣度數，夏月比非夏月多繳多少，差距從哪一度開始。' },
  'taipower-time-of-use-vs-tiered': { anchor: '時間電價 vs 累進電價', note: '時間電價的尖峰離峰時段與門檻，什麼用電習慣才划算。' },
  'time-deposit-early-withdrawal': { anchor: '定存中途解約利息', note: '定存中途解約，會比存滿少拿多少利息。' },
  'tpass-commuter-pass-breakeven': { anchor: 'TPASS 月票回本', note: '月票價格除以單程票價，就是每月要搭幾趟才回本。' },
  'year-end-bonus-withholding-tax': { anchor: '年終獎金扣繳稅', note: '年終獎金超過起扣點會先被扣繳一筆稅，那不是你最後要繳的稅。' },
  'youth-home-loan-3-subsidy-value': { anchor: '新青安房貸試算', note: '新青安貸款期間拉長與利息補貼，總利息差多少。' },
};

/**
 * Indexed page -> the money briefs on the same decision. Keys are locale-free logical paths
 * (`/tools/<slug>` for calculators, `/<slug>` for guides). Only zh pages are bridged.
 */
export const BRIDGE_MAP: Record<string, string[]> = {
  '/tools/appliance-electricity-cost': [
    'taipower-summer-vs-non-summer-rates',
    'taipower-summer-rates-ac-bill',
    'taipower-time-of-use-vs-tiered',
    'ac-energy-grade-payback',
  ],
  '/tools/budget-builder': [
    'taipower-summer-vs-non-summer-rates',
    'taipower-summer-rates-ac-bill',
    'taipower-time-of-use-vs-tiered',
    'ac-energy-grade-payback',
    'house-tax-owner-occupied-vs-non',
    'land-value-tax-owner-occupied-rate',
    'tpass-commuter-pass-breakeven',
    'nhi-supplementary-premium',
    'nhi-premium-insured-salary-grade',
    'year-end-bonus-withholding-tax',
    'dependent-exemption-tax-savings',
    'rent-subsidy-300b-amount',
    'labor-pension-voluntary-contribution-tax',
    'savings-insurance-irr',
    'time-deposit-early-withdrawal',
  ],
  '/tools/car-affordability': [
    'car-road-fee-license-tax-fixed-cost',
    'car-loan-vs-cash',
    'freeway-etc-commute-toll',
    'tpass-commuter-pass-breakeven',
    'e-scooter-subsidy-2026',
  ],
  '/tools/cashback-breakeven': ['phone-contract-subsidy-value'],
  '/tools/commute-cost': [
    'tpass-commuter-pass-breakeven',
    'freeway-etc-commute-toll',
    'e-scooter-subsidy-2026',
    'car-road-fee-license-tax-fixed-cost',
  ],
  '/tools/compound-growth': [
    'time-deposit-early-withdrawal',
    'savings-insurance-irr',
    'labor-pension-voluntary-contribution-tax',
    'labor-pension-contribution-wage-table',
    'labor-insurance-old-age-lump-sum-vs-annuity',
    'national-pension-vs-labor-insurance',
    'mortgage-prepay-vs-invest',
  ],
  '/tools/debt-strategy': [
    'mortgage-refinance-break-even',
    'mortgage-prepay-vs-invest',
    'car-loan-vs-cash',
  ],
  '/tools/dti-calculator': [
    'youth-home-loan-3-subsidy-value',
    'mortgage-grace-period-end-payment',
    'central-bank-rate-mortgage-payment',
    'house-tax-owner-occupied-vs-non',
  ],
  '/tools/ev-vs-gas': [
    'e-scooter-subsidy-2026',
    'taipower-time-of-use-vs-tiered',
    'taipower-summer-vs-non-summer-rates',
    'car-road-fee-license-tax-fixed-cost',
    'freeway-etc-commute-toll',
  ],
  '/tools/home-affordability': [
    'youth-home-loan-3-subsidy-value',
    'mortgage-grace-period-end-payment',
    'central-bank-rate-mortgage-payment',
    'house-tax-owner-occupied-vs-non',
    'land-value-tax-owner-occupied-rate',
    'itemized-vs-standard-deduction',
    'rent-subsidy-300b-amount',
  ],
  '/tools/installment-true-apr': [
    'phone-contract-subsidy-value',
    'car-loan-vs-cash',
    'ac-energy-grade-payback',
  ],
  '/tools/mortgage-payoff': [
    'youth-home-loan-3-subsidy-value',
    'mortgage-grace-period-end-payment',
    'mortgage-prepay-vs-invest',
    'mortgage-refinance-break-even',
    'central-bank-rate-mortgage-payment',
    'house-tax-owner-occupied-vs-non',
    'land-value-tax-owner-occupied-rate',
    'itemized-vs-standard-deduction',
    'rent-subsidy-300b-amount',
  ],
  '/tools/salary-converter': [
    'nhi-premium-insured-salary-grade',
    'nhi-supplementary-premium',
    'year-end-bonus-withholding-tax',
    'labor-pension-voluntary-contribution-tax',
    'labor-pension-contribution-wage-table',
    'dependent-exemption-tax-savings',
    'itemized-vs-standard-deduction',
    'labor-insurance-old-age-lump-sum-vs-annuity',
    'national-pension-vs-labor-insurance',
  ],
  '/tools/subscription-audit': [
    'phone-contract-subsidy-value',
    'taipower-summer-rates-ac-bill',
  ],
  '/how-to-calculate-dti': [
    'youth-home-loan-3-subsidy-value',
    'mortgage-grace-period-end-payment',
    'central-bank-rate-mortgage-payment',
    'mortgage-refinance-break-even',
    'car-loan-vs-cash',
  ],
  '/true-cost-of-car-ownership': [
    'car-road-fee-license-tax-fixed-cost',
    'car-loan-vs-cash',
    'e-scooter-subsidy-2026',
    'freeway-etc-commute-toll',
    'tpass-commuter-pass-breakeven',
  ],
};
