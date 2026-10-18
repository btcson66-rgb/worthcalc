// 全站指南索引：每個語系每一頁編輯型內容，含該頁自己的 H1 當連結文字。
//
// 為什麼存在：2026-08-06 盤點發現 341 個頁面裡有 106 頁「內文零內部連結」，
// 其中最新的六篇（rule-of-72-explained、installment-apr-table、extended-warranty-math
// 的 en 與 zh 版）唯一的入站連結是自己的語言切換器。Google 主要靠連結發現頁面，
// 而這個站的 sitemap 從未被下載過，所以那些頁面等於沒有任何發現路徑——
// 07-28 發布的 /en/rule-of-72-explained/ 到 08-06 仍是「URL is unknown to Google」。
//
// 首頁會把這份索引整份列出，讓每一頁都至少有一條來自全站最常被爬的頁面的連結。
// scripts/check-guide-index.mjs 會擋下任何沒有實質入站連結的編輯頁。
//
// 這個檔案由 `npm run generate:guide-index` 從 dist 產生，不要手改。

import type { ContentLocale } from '../consts';

export interface GuideIndexEntry {
  /** 不含語系前綴的路徑，交給 localizedPath() 組。 */
  path: string;
  title: string;
}

export const guideIndex: Record<ContentLocale, GuideIndexEntry[]> = {
  en: [
    { path: '/average-commuting-cost/', title: 'Average Commuting Cost: Build a Benchmark Without a Misleading National Average' },
    { path: '/bnpl-vs-credit-card-installments/', title: 'Buy now, pay later vs credit-card installments: compare total cost and timing' },
    { path: '/cashback-caps-real-reward-rate/', title: 'Cashback caps and bonus categories: calculate your real reward rate' },
    { path: '/guides/childcare-return-to-work-break-even/', title: 'Childcare vs. Returning to Work: A Take-Home Pay Break-Even Framework' },
    { path: '/annual-fee-card-breakeven/', title: 'Credit Card Annual Fee Break-Even: How Much to Spend on a $95 Fee' },
    { path: '/guides/debt-consolidation-break-even/', title: 'Debt Consolidation Break-Even: Lower Payment vs. Lower Total Cost' },
    { path: '/snowball-vs-avalanche/', title: 'Debt Snowball vs. Avalanche: What the Math (and the Research) Actually Show' },
    { path: '/energy-efficient-appliance-payback/', title: 'Energy-efficient appliance payback: price premium, kWh savings, and break-even' },
    { path: '/ev-vs-gas-total-cost/', title: 'EV vs gas car: how to compare total cost of ownership' },
    { path: '/extra-mortgage-payments-guide/', title: 'Extra Mortgage Payments: What They Actually Save You' },
    { path: '/guides/freelance-minimum-billable-rate/', title: 'Freelance Minimum Billable Rate: Price for Taxes, Non-Billable Time, Benefits and Profit' },
    { path: '/freelancer-pricing-decision-engine/', title: 'Freelancer Pricing Decision Engine' },
    { path: '/gym-membership-cost-per-visit/', title: 'Gym membership cost per visit: how often do you need to go?' },
    { path: '/home-vs-public-ev-charging-cost/', title: 'Home charging vs public charging: what does an EV really cost per mile?' },
    { path: '/hourly-vs-annual-salary/', title: 'Hourly vs. Annual Salary: How to Compare Two Job Offers Fairly' },
    { path: '/rent-vs-buy-breakeven-year/', title: 'How long do you need to stay before buying can beat renting?' },
    { path: '/how-much-home-can-you-afford/', title: 'How Much House Can You Afford? The 28/36 Rule and What It Leaves Out' },
    { path: '/budget-with-irregular-income/', title: 'How to Budget on Irregular Income Without Guessing Next Month' },
    { path: '/how-to-calculate-dti/', title: 'How to Calculate DTI (And Why 43% Isn\'t a Hard Cutoff Anymore)' },
    { path: '/full-commute-cost-including-time/', title: 'How to calculate the full cost of commuting, including your time' },
    { path: '/upfront-fees-financing-cost/', title: 'How upfront fees change the true cost of financing' },
    { path: '/is-an-extended-warranty-worth-it/', title: 'Is an extended warranty worth it? Compare price, failure risk, and repair cost' },
    { path: '/job-offer-true-value-decision-engine/', title: 'Job Offer True Value Decision Engine' },
    { path: '/car-lease-vs-buy-total-cost/', title: 'Lease vs buy a car: compare total cost, mileage, and resale risk' },
    { path: '/money/', title: 'Money briefs' },
    { path: '/monthly-vs-annual-subscription/', title: 'Monthly vs annual subscription: when does annual billing save money?' },
    { path: '/new-vs-used-car-total-cost/', title: 'New vs used car: compare depreciation, repairs, financing, and resale' },
    { path: '/pay-raise-vs-inflation-purchasing-power/', title: 'Pay raise vs inflation: did purchasing power increase?' },
    { path: '/rent-vs-buy-guide/', title: 'Rent vs Buy: The Assumptions That Actually Change the Answer' },
    { path: '/repair-or-replace-decision-formula/', title: 'Repair or replace: a practical decision formula for appliances, phones, and cars' },
    { path: '/true-cost-of-car-ownership/', title: 'The 20/4/10 Rule: How Much Car You Can Actually Afford' },
    { path: '/costco-math/', title: 'The Math of Warehouse Club Memberships' },
    { path: '/true-hourly-wage-after-commuting-work-expenses/', title: 'True hourly wage after commuting and work expenses' },
    { path: '/upgrade-your-phone-or-keep-it/', title: 'Upgrade your phone or keep it? Compare repair, trade-in, and monthly cost' },
    { path: '/delivery-membership-break-even/', title: 'When is a delivery membership worth the annual fee?' },
    { path: '/guides/windfall-debt-vs-cash-allocation/', title: 'Windfall: Pay Debt or Keep Cash? A Better Framework Than a Fixed Percentage Rule' },
    { path: '/work-from-home-vs-commuting-hidden-costs/', title: 'Work from home vs commuting: compare the hidden monthly costs' },
  ],
  zh: [
    { path: '/home-vs-public-ev-charging-cost/', title: '充電樁一度電多少錢？家用與公共充電電費怎麼比？' },
    { path: '/ev-vs-gas-total-cost/', title: '電動車和油車怎麼比較五年總持有成本' },
    { path: '/monthly-vs-annual-subscription/', title: '訂閱月繳還是年繳？用使用月數與取消風險算出答案' },
    { path: '/extra-mortgage-payments-guide/', title: '房貸多繳划不划算？寬限期、提前清償違約金一次搞懂' },
    { path: '/how-to-calculate-dti/', title: '負債比怎麼算？DBR22倍跟房貸月付比是兩件事' },
    { path: '/how-much-home-can-you-afford/', title: '購屋能力怎麼算？房貸成數、房屋稅與地價稅都要算進去' },
    { path: '/guides/fixed-vs-variable-rate-scenario/', title: '固定利率 vs 浮動利率怎麼比？不要猜未來利率，先做 3 條利率路徑壓力測試' },
    { path: '/costco-math/', title: '好市多會員的數學：年費怎麼算才回本' },
    { path: '/pay-raise-vs-inflation-purchasing-power/', title: '加薪有追上通膨嗎？計算實質購買力變化' },
    { path: '/gym-membership-cost-per-visit/', title: '健身房會員每次成本怎麼算？一個月要去幾次才划算' },
    { path: '/budget-with-irregular-income/', title: '接案、業績抽成收入不固定，月預算該怎麼抓？' },
    { path: '/guides/freelance-minimum-billable-rate/', title: '接案最低報價怎麼算？不要用月薪除 160，小時費率要先補回不可計費時間與營運成本' },
    { path: '/energy-efficient-appliance-payback/', title: '節能家電多久回本？用價差、耗電、使用頻率與電價試算' },
    { path: '/money/', title: '金錢速查' },
    { path: '/emergency-fund-how-much/', title: '緊急預備金要存多少？扣掉失業給付後的缺口才是答案' },
    { path: '/snowball-vs-avalanche/', title: '卡債、信貸一起還：雪球法還是雪崩法比較快清完？' },
    { path: '/upfront-fees-financing-cost/', title: '開辦費與手續費如何拉高分期真實成本' },
    { path: '/true-hourly-wage-after-commuting-work-expenses/', title: '扣掉通勤和工作支出後，你的真實時薪是多少' },
    { path: '/rent-vs-buy-breakeven-year/', title: '買房住幾年才可能比租屋划算？損益年分計算' },
    { path: '/guides/windfall-debt-vs-cash-allocation/', title: '年終獎金先還債還是留現金？用利率、缺口與再借款風險分配大筆收入' },
    { path: '/average-commuting-cost/', title: '平均通勤成本與車馬費行情：不用虛構平均數，也能算出可比較的基準' },
    { path: '/hourly-vs-annual-salary/', title: '時薪換算年薪怎麼算才公平？加班費倍率與基本工資要先搞懂' },
    { path: '/upgrade-your-phone-or-keep-it/', title: '手機該換還是繼續用？比較維修、舊換新、資費與每月成本' },
    { path: '/full-commute-cost-including-time/', title: '通勤不只油錢：如何把時間也算進每月通勤成本' },
    { path: '/guides/childcare-return-to-work-break-even/', title: '托育費多少才值得回職場？用稅後收入、通勤與福利做 Break-Even' },
    { path: '/delivery-membership-break-even/', title: '外送會員一年要用幾次才回本' },
    { path: '/repair-or-replace-decision-formula/', title: '維修還是換新？家電、手機與車輛的實用判斷公式' },
    { path: '/bnpl-vs-credit-card-installments/', title: '先買後付 vs 信用卡分期：用總成本與扣款時間比較' },
    { path: '/new-vs-used-car-total-cost/', title: '新車還是中古車？折舊、維修、貸款與轉售怎麼比較' },
    { path: '/guides/extra-payment-personal-loan/', title: '信貸提前還款划算嗎？先算省下利息，再扣違約金與流動性成本' },
    { path: '/cashback-caps-real-reward-rate/', title: '信用卡回饋上限怎麼算？找出真正回饋率' },
    { path: '/annual-fee-card-breakeven/', title: '信用卡年費要刷多少才回本？用增量回饋算真正門檻' },
    { path: '/is-an-extended-warranty-worth-it/', title: '延長保固值得買嗎？比較價格、故障機率與維修費' },
    { path: '/true-cost-of-car-ownership/', title: '養車一個月多少錢？牌照稅、燃料費、強制險都算進去才是真成本' },
    { path: '/work-from-home-vs-commuting-hidden-costs/', title: '在家工作還是通勤？比較每月隱藏成本' },
    { path: '/guides/debt-consolidation-break-even/', title: '債務整合划算嗎？不要只看月付變低，用期限重置與總成本算 Break-Even' },
    { path: '/car-lease-vs-buy-total-cost/', title: '租賃還是買車？總成本、里程限制與轉售風險怎麼算' },
    { path: '/rent-vs-buy-guide/', title: '租屋還是買房？真正會改變答案的關鍵數字' },
    { path: '/guides/rental-deposit-liquidity-cost/', title: '租屋押金要準備多少現金？把資金占用、搬家重疊與退還時間放進現金流' },
    { path: '/freelancer-pricing-decision-engine/', title: 'Freelancer Pricing Decision Engine' },
    { path: '/job-offer-true-value-decision-engine/', title: 'Job Offer True Value Decision Engine' },
  ],
};
