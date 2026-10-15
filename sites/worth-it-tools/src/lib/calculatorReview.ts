import type { Locale } from '../consts';

interface ReviewDetails {
  methodology: string;
  assumptions: string[];
  example: string;
  limitations: string[];
  lastUpdated: string;
  disclaimer: string;
}

type ReviewMap = Record<string, Partial<Record<Locale, ReviewDetails>>>;

const financialDisclaimer = {
  en: 'This tool provides estimates only. It is not financial advice. Results depend on the numbers you enter and the simplified assumptions listed here.',
  zh: '本工具僅提供估算，不是財務建議。結果取決於你輸入的數字，以及本頁列出的簡化假設。',
};

const lastUpdated = {
  en: 'July 7, 2026',
  zh: '2026-07-07',
};

const reviews: ReviewMap = {
  'installment-true-apr': {
    en: {
      methodology:
        'The calculator treats the cash price as the amount financed, then solves the monthly internal rate of return from the installment payments and any upfront fee. The monthly rate is annualized into an estimated APR.',
      assumptions: [
        'The default cash price of 10,000, 12 installments, and total paid of 10,300 are example values for testing the model.',
        'The default acceptable APR of 10% is a personal warning threshold, not a recommendation or market benchmark.',
        'Payments are treated as equal monthly payments unless you enter a separate payment per installment.',
      ],
      example:
        'If a 10,000 cash price is paid back as 10,300 over 12 monthly installments, the flat fee is 300. Because the balance falls during the year, the estimated APR is higher than a simple 3% fee.',
      limitations: [
        'Late fees, penalty interest, credit-card rewards, taxes, and missed cash discounts are not included.',
        'Real lender APR disclosures may use jurisdiction-specific rules that differ from this simplified estimate.',
      ],
      lastUpdated: lastUpdated.en,
      disclaimer: financialDisclaimer.en,
    },
    zh: {
      methodology:
        '計算機會把現金價視為被融資金額，再用每期付款與任何前置費用反推月內部報酬率，最後年化成估算 APR。',
      assumptions: [
        '預設現金價 10,000、12 期、總付款 10,300 只是示範值，請改成實際方案。',
        '預設可接受 APR 10% 只是個人提醒門檻，不是建議或市場標準。',
        '若未輸入每期付款，系統會把總付款平均分配到每一期。',
      ],
      example:
        '若現金價 10,000，12 期總付款 10,300，表面費用是 300。因為本金會逐月下降，估算 APR 會高於單純 3% 費用。',
      limitations: [
        '未包含遲繳費、罰息、信用卡回饋、稅費或放棄現金折扣的成本。',
        '實際金融機構揭露 APR 可能依所在地法規採用不同計算方式。',
      ],
      lastUpdated: lastUpdated.zh,
      disclaimer: financialDisclaimer.zh,
    },
  },
  'subscription-audit': {
    en: {
      methodology:
        'Each subscription is normalized into a monthly cost. Monthly bills stay unchanged, quarterly bills are divided by 3, and yearly bills are divided by 12 before totals are projected over one and five years.',
      assumptions: [
        'Default rows such as Netflix, Spotify, and cloud storage are sample subscriptions only.',
        'The five-year figure assumes today\'s prices stay unchanged and does not model inflation or plan upgrades.',
        'Cost per use is calculated only when you enter monthly hours used.',
      ],
      example:
        'A 29.99 yearly cloud-storage plan is counted as about 2.50 per month. Three subscriptions are then added together to show monthly, yearly, and five-year totals.',
      limitations: [
        'Shared plans, discounts, taxes, foreign-exchange fees, and future price increases are not automatically detected.',
        'The tool does not cancel services for you; it only highlights costs to review.',
      ],
      lastUpdated: lastUpdated.en,
      disclaimer: financialDisclaimer.en,
    },
    zh: {
      methodology:
        '每一筆訂閱都會換算成月成本：月繳維持原值、季繳除以 3、年繳除以 12，再推估一年與五年總額。',
      assumptions: [
        'Netflix、Spotify、雲端儲存等預設列只是示範訂閱，不代表你的實際支出。',
        '五年總額假設價格不變，未納入漲價、升級方案或匯率變動。',
        '只有填入每月使用時數時，才會估算每小時成本。',
      ],
      example:
        '29.99 的年繳雲端儲存會換算成每月約 2.50，再和其他訂閱相加，得到月支出、年支出與五年支出。',
      limitations: [
        '未自動辨識共享方案、折扣、稅費、海外交易費或未來漲價。',
        '工具不會替你取消服務，只用來標示值得檢查的成本。',
      ],
      lastUpdated: lastUpdated.zh,
      disclaimer: financialDisclaimer.zh,
    },
  },
  // 'costco-membership' 的區塊已移除。它和頁面自己的 DecisionGuide 各講一套
  // 「計算方法」與「限制」，查核日期一個 2026-07-07 一個 2026-07-18，中文版
  // 還殘留美國的 Gold Star / Executive 年費當成台灣的示範值。兩套互相矛盾的
  // 方法論放在同一個 YMYL 頁面上，比只有一套更糟，所以兩個好市多頁面改用
  // showReview={false}，只留 DecisionGuide 那一套，數字統一由 data/rates.json 供給。
  'ev-vs-gas': {
    en: {
      methodology:
        'EV total cost equals purchase price minus subsidy plus electricity and maintenance over the ownership period. Gas total cost equals purchase price plus fuel and maintenance over the same period.',
      assumptions: [
        'Default values such as 38,000 EV price, 30,000 gas-car price, 7,500 rebate, 1,200 km/month, 0.16/kWh, 3.80/gallon, and 5 years are illustrative examples.',
        'Gas efficiency is entered in mpg and converted to kilometers per gallon.',
        'Break-even compares the upfront price gap with annual operating savings.',
      ],
      example:
        'If the EV costs more upfront but saves money on electricity and maintenance each year, the break-even year is the upfront gap divided by estimated annual savings.',
      limitations: [
        'Insurance, financing, taxes, registration, charger installation, resale value, battery degradation, and local incentives beyond the entered subsidy are not included.',
        'Energy prices and maintenance costs can vary sharply by location and vehicle model.',
      ],
      lastUpdated: lastUpdated.en,
      disclaimer: financialDisclaimer.en,
    },
    zh: {
      methodology:
        '電動車總成本等於購車價扣補助，再加上持有期間的電費與保養費。燃油車總成本等於購車價加上同期間油費與保養費。',
      assumptions: [
        '預設 38,000 電動車、30,000 燃油車、7,500 補助、每月 1,200 公里、0.16/kWh、3.80/加侖、5 年持有都是示範值。',
        '燃油效率以 mpg 輸入，系統會轉成每加侖公里數。',
        '損益兩平用前期價差除以每年營運成本節省估算。',
      ],
      example:
        '若電動車前期較貴，但每年電費與保養省下成本，損益兩平年約等於前期價差除以每年省下金額。',
      limitations: [
        '未包含保險、貸款、稅費、牌照、充電樁安裝、殘值、電池衰退，以及輸入補助以外的地方優惠。',
        '能源價格與保養成本會因地區和車款大幅不同。',
      ],
      lastUpdated: lastUpdated.zh,
      disclaimer: financialDisclaimer.zh,
    },
  },
  'cashback-breakeven': {
    en: {
      methodology:
        'The calculator multiplies monthly spending in each category by 12 and by the entered cashback rate. It adds any welcome bonus, subtracts the annual fee, and compares the result with a no-fee 1% baseline.',
      assumptions: [
        'Default annual fee 95, welcome bonus 200, groceries 500 at 3%, dining 250 at 2%, other 500 at 1.5%, and the 1% no-fee baseline are editable examples.',
        'The welcome bonus should only be included if you can earn it without extra spending.',
        'Break-even spend assumes the same category mix as the current inputs.',
      ],
      example:
        'If monthly spending totals 1,250 and the weighted reward rate beats 1%, the calculator estimates whether rewards plus bonus exceed the annual fee and the no-fee baseline.',
      limitations: [
        'Point-transfer value, rotating categories, reward caps, merchant coding, interest charges, and late fees are not modeled.',
        'Actual card terms can change and should be verified with the issuer.',
      ],
      lastUpdated: lastUpdated.en,
      disclaimer: financialDisclaimer.en,
    },
    zh: {
      methodology:
        '計算機會用各類別月消費乘以 12 和輸入回饋率，加入迎新禮、扣除年費，再和免年費 1% 基準卡比較。',
      assumptions: [
        '預設年費 95、迎新禮 200、雜貨 500 且 3%、餐飲 250 且 2%、其他 500 且 1.5%、免年費 1% 基準都是示範值。',
        '只有在不需額外消費即可達成時，才應加入迎新禮。',
        '損益兩平消費額假設類別消費比例和目前輸入相同。',
      ],
      example:
        '若每月總消費 1,250，且加權回饋率高於 1%，工具會估算回饋加迎新禮是否足以超過年費與免年費基準。',
      limitations: [
        '未模型化點數轉換價值、輪替類別、回饋上限、商戶代碼、利息或遲繳費。',
        '實際卡片條款可能改變，應向發卡機構確認。',
      ],
      lastUpdated: lastUpdated.zh,
      disclaimer: financialDisclaimer.zh,
    },
  },
  'commute-cost': {
    en: {
      methodology:
        'The calculator estimates monthly commute cost for car, transit, rideshare, and bike. Car cost uses round-trip distance, workdays, cost per kilometer, parking, and tolls; optional time cost uses minutes and hourly wage.',
      assumptions: [
        'Default 15 km one-way, 22 workdays, 0.67 per km, 120 transit pass, 18 rideshare fare, 20 bike cost, 180 parking, 40 tolls, and 30 hourly wage are sample urban-commute values.',
        'Set hourly wage to 0 when you want direct cash cost only.',
        'Workdays should reflect hybrid schedules rather than a full-time office default if that is your situation.',
      ],
      example:
        'For a 15 km one-way drive over 22 workdays, car distance is 660 km per month before parking and tolls. Optional time cost is added from round-trip minutes and the hourly wage input.',
      limitations: [
        'Vehicle depreciation, insurance, weather, safety, parking availability, employer benefits, and service reliability are not fully captured.',
        'Costs can differ sharply by city, commute time, and personal constraints.',
      ],
      lastUpdated: lastUpdated.en,
      disclaimer: financialDisclaimer.en,
    },
    zh: {
      methodology:
        '計算機會估算開車、大眾運輸、叫車與單車的月通勤成本。開車用往返距離、工作天、每公里成本、停車與過路費；可選時間成本則用分鐘數與時薪。',
      assumptions: [
        '預設單程 15 公里、每月 22 個工作天、每公里 0.67、月票 120、單程叫車 18、單車 20、停車 180、過路費 40、時薪 30 都是城市通勤示範值。',
        '若只想看現金支出，請把時薪設為 0。',
        '混合辦公者應輸入實際通勤天數，不必沿用全職到辦公室假設。',
      ],
      example:
        '若單程 15 公里、每月 22 天，開車里程為每月 660 公里，再加停車與過路費；若輸入時薪，會再加入往返時間成本。',
      limitations: [
        '未完整納入車輛折舊、保險、天氣、安全性、停車可得性、雇主補助或服務可靠度。',
        '成本會因城市、通勤時段與個人限制而大幅不同。',
      ],
      lastUpdated: lastUpdated.zh,
      disclaimer: financialDisclaimer.zh,
    },
  },
};

export function getCalculatorReview(slug: string, locale: Locale): ReviewDetails | undefined {
  return reviews[slug]?.[locale] ?? reviews[slug]?.en;
}
