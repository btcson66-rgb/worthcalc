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
