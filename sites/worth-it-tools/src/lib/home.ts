import { HOME_LOCALE, LOCALE_HREFLANG, SITE, type CoreLocale } from '../consts';
import type { EntityJsonLdOptions, FaqItem } from './seo';
import { organizationId, webSiteId } from './seo';

interface HomeTool {
  icon: string;
  title: string;
  path: string;
  description: string;
}

interface HomeGuide {
  title: string;
  path: string;
  description: string;
}

interface HomeValue {
  heading: string;
  lead: string;
  items: { title: string; body: string }[];
}

interface HomeCategories {
  heading: string;
  lead: string;
  cta: string;
}

/** Copy for the section that hands the reader off to the two directories. */
interface HomeLibrary {
  heading: string;
  lead: string;
  calculators: string;
  guides: string;
  moreTopics: string;
}

interface HomeTrustSource {
  label: string;
  href: string;
}

interface HomeTrust {
  heading: string;
  methodHeading: string;
  method: string;
  sourcesHeading: string;
  sourcesLead: string;
  sources?: HomeTrustSource[];
  scopeHeading: string;
  scope: string;
  reviewedLabel: string;
  reviewedDate: string;
  reviewedDisplay: string;
  advice: string;
}

export interface HomeContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  accent: string;
  headingSuffix: string;
  intro: string;
  badges: string[];
  entity?: EntityJsonLdOptions;
  value: HomeValue;
  categories: HomeCategories;
  library: HomeLibrary;
  trust: HomeTrust;
  toolsHeading: string;
  toolsLead: string;
  toolsCta: string;
  tools: HomeTool[];
  methodHeading: string;
  methodLead: string;
  methodSteps: string[];
  guidesHeading: string;
  guidesLead: string;
  guidesCta: string;
  guides: HomeGuide[];
  guidesMore: string;
  faqHeading: string;
  faq: FaqItem[];
}

export const homeContent: Record<CoreLocale, HomeContent> = {
  en: {
    title: 'Transparent Calculators for Real Money Decisions',
    description:
      'WorthCalc turns money decisions into visible arithmetic. Every calculator states its formula, lets you replace the defaults with your own numbers, and says what it leaves out.',
    eyebrow: 'Break-even, total cost, and affordability, worked in the open',
    heading: 'Transparent calculators for ',
    accent: 'real money decisions',
    headingSuffix: '',
    intro:
      'Most money questions have a threshold hiding in them: the spend where a fee pays for itself, the year where buying beats renting, the number of uses that makes a purchase worth it. WorthCalc finds that threshold and shows the arithmetic that produced it.',
    badges: ['Transparent formulas', 'Editable assumptions', 'Browser-based'],
    entity: {
      description:
        'WorthCalc publishes transparent calculators and decision guides across six money topics: housing affordability, debt and credit, transportation and ownership cost, everyday break-evens, subscriptions and memberships, and income, savings and growth.',
      topics: [
        'Housing affordability and rent versus buy',
        'Debt, credit and true borrowing cost',
        'Transportation and total cost of ownership',
        'Everyday break-even and cost per use',
        'Subscriptions and membership break-even',
        'Income, savings rate and compound growth',
      ],
    },
    value: {
      heading: 'What WorthCalc is for',
      lead: 'A number you cannot check is not much better than a guess. These three rules decide what gets published here.',
      items: [
        {
          title: 'The formula is on the page',
          body: 'Every calculator states the arithmetic it runs and shows the intermediate figures, so you can verify the result rather than trust it.',
        },
        {
          title: 'The assumptions are yours to change',
          body: 'Defaults are editable examples, never market averages or quotes. Replace them with your own bill, contract, statement or offer.',
        },
        {
          title: 'The limits are written down',
          body: 'Each page names what it excludes — taxes, eligibility rules, contract terms — and which input would reverse the conclusion.',
        },
      ],
    },
    categories: {
      heading: 'Four decisions WorthCalc covers in depth',
      lead: 'Each area pairs the calculators that produce a number with the guides that explain what the number means.',
      cta: 'Open this topic',
    },
    library: {
      heading: 'Browse the whole library',
      lead: 'Two directories, both grouped by topic: one for the calculators, one for the written guides behind them.',
      calculators: 'All calculators',
      guides: 'All guides',
      moreTopics: 'More topics',
    },
    trust: {
      heading: 'Method, sources, and limits',
      methodHeading: 'Method',
      method:
        'Each calculator applies a visible formula to the values you enter, compares alternatives over the same period, and returns a break-even threshold, total cost, or ratio. Editable defaults are examples, not quotes or recommendations.',
      sourcesHeading: 'Data sources',
      sourcesLead:
        "Start with your own current contract, statement, bill, quote, paystub, and provider terms. The calculation frameworks link to these durable public sources already used by the site's supporting guides:",
      sources: [
        { label: 'Costco — Executive Rewards terms', href: 'https://www.costco.com/executive-rewards.html' },
        { label: 'Consumer Financial Protection Bureau — credit-card rewards program guidance', href: 'https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2024-07-design-marketing-and-administration-of-credit-card-rewards-programs/' },
        { label: 'IRS Publication 463 — commuting and vehicle-expense boundaries', href: 'https://www.irs.gov/publications/p463' },
        { label: 'Consumer Financial Protection Bureau — debt-to-income ratio', href: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/' },
      ],
      scopeHeading: 'What the calculators include',
      scope:
        'A result includes only the inputs and categories named on that calculator. It does not automatically include every tax, fee, eligibility or underwriting rule, reward exclusion, route condition, employer benefit, financing term, or personal risk.',
      reviewedLabel: 'Homepage method last reviewed',
      reviewedDate: '2026-08-24',
      reviewedDisplay: 'August 24, 2026',
      advice:
        'WorthCalc provides general educational estimates. This is not financial advice, and no result predicts approval, guarantees savings, or replaces current terms or qualified professional advice.',
    },
    toolsHeading: 'Most-used calculators',
    toolsLead: 'Ten to start with. The full catalogue, grouped by topic, is on the calculator directory.',
    toolsCta: 'Open calculator',
    tools: [
      {
        icon: '💳',
        title: 'Installment True APR Calculator',
        path: '/tools/installment-true-apr',
        description: 'See the real interest rate hiding behind "0%" installment and BNPL plans.',
      },
      {
        icon: '📺',
        title: 'Subscription Audit Calculator',
        path: '/tools/subscription-audit',
        description: 'Add up every subscription and see what you really pay per month, year, and 5 years.',
      },
      {
        icon: '🛒',
        title: 'Costco Membership Calculator',
        path: '/tools/costco-membership',
        description: 'Find the monthly spend where a Gold Star or Executive membership pays for itself.',
      },
      {
        icon: '🚌',
        title: 'Commute Cost Calculator',
        path: '/tools/commute-cost',
        description: 'Compare car, transit, rideshare, and bike costs per month, including your time.',
      },
    ],
    methodHeading: 'A decision process you can audit',
    methodLead: 'A useful calculator shows what changes the answer instead of hiding a recommendation behind one default.',
    methodSteps: [
      'Start with the contract, bill, quote, or usage history—not a promotional headline.',
      'Compare alternatives over the same period and keep recoverable value separate from true cost.',
      'Change the uncertain inputs until the result flips; a fragile answer needs more evidence.',
      'Confirm current prices, taxes, eligibility, cancellation rules, and professional advice where the stakes require it.',
    ],
    guidesHeading: 'Popular decision guides',
    guidesLead: 'Use the deeper guides when one calculator is not enough. Each one exposes its formula, worked example, sensitivity cases, limitations, and source trail.',
    guidesCta: 'Read guide',
    guides: [
      { title: 'The truth about 0% installments', path: '/zero-interest-installments-truth', description: 'Separate the cash price, mandatory fees, lost discounts, and the real annualized cost.' },
      { title: 'Rent versus buy: the complete framework', path: '/rent-vs-buy-guide', description: 'Compare the same home and holding period, including sale proceeds and the opportunity cost of upfront cash.' },
      { title: 'EV versus gas total cost', path: '/ev-vs-gas-total-cost', description: 'Build the comparison from purchase, energy, insurance, maintenance, incentives, and resale.' },
      { title: 'Annual-fee card break-even', path: '/annual-fee-card-breakeven', description: 'Test renewal value against the no-fee card you could actually use, not against zero rewards.' },
      { title: 'True hourly wage after work costs', path: '/true-hourly-wage-after-commuting-work-expenses', description: 'Reprice a job with take-home pay, required time, commuting, and unreimbursed expenses.' },
      { title: 'Pay raise versus inflation', path: '/pay-raise-vs-inflation-purchasing-power', description: 'Use matching CPI periods to distinguish a nominal raise from a real purchasing-power change.' },
    ],
    guidesMore: 'Every guide, grouped by topic',
    faqHeading: 'Common questions about WorthCalc',
    faq: [
      {
        question: 'Are WorthCalc results financial advice?',
        answer:
          'No. The results are general informational estimates only. For major financial, tax, legal, debt, housing, or investment decisions, consult a qualified professional who can review your full situation.',
      },
      {
        question: 'Do the calculators send my numbers to a server?',
        answer:
          'No. The calculators run in your browser. Some tools may use browser localStorage so your own device can remember values, but the inputs are not uploaded to WorthCalc.',
      },
      {
        question: 'Why can my result differ from a real bill or offer?',
        answer:
          'Real-world prices, taxes, fees, interest rates, rewards rules, usage patterns, and promotional terms can change. Treat the output as a decision aid and confirm current terms with the provider.',
      },
      {
        question: 'Is WorthCalc free to use?',
        answer:
          'Yes. The calculators are free and do not require registration. The site may be supported by advertising, as explained in the privacy policy.',
      },
    ],
  },
  zh: {
    title: '算得出來的金錢決策：公式透明的計算機',
    description:
      'WorthCalc 把金錢決策變成看得見的算式。每個計算機都寫出公式、讓你用自己的數字取代預設值，並說明它刻意不納入什麼。',
    eyebrow: '回本門檻、完整成本與負擔能力，全部攤開來算',
    heading: '算得出來的',
    accent: '金錢決策',
    headingSuffix: '：公式透明、假設可調',
    intro:
      '大多數金錢問題裡都藏著一個門檻：年費要刷多少才回本、第幾年買房才勝過租房、一件東西要用幾次才值得。WorthCalc 把那個門檻算出來，並把得到它的算式一起攤開。',
    badges: ['公式公開', '假設可調整', '瀏覽器本機試算'],
    entity: {
      description:
        'WorthCalc 提供公式透明的計算機與決策指南，涵蓋六個金錢主題：住房負擔能力、債務與信用、交通與持有成本、日常回本門檻、訂閱與會員，以及收入、儲蓄與成長。',
      topics: [
        '住房負擔能力與租買比較',
        '債務、信用與真實借貸成本',
        '交通與總持有成本',
        '日常回本門檻與每次使用成本',
        '訂閱與會員回本門檻',
        '收入、儲蓄率與複利成長',
      ],
    },
    value: {
      heading: 'WorthCalc 想解決的問題',
      lead: '一個你無法自己驗算的數字，和猜的差別不大。本站只出版符合這三條規則的內容。',
      items: [
        {
          title: '公式就寫在頁面上',
          body: '每個計算機都會寫出它執行的算式，並顯示中間數字，讓你可以自己核對結果，而不是只能相信它。',
        },
        {
          title: '假設由你決定',
          body: '預設值是可以修改的範例，不是市場平均值，也不是報價。請換成你自己的帳單、契約、對帳單或報價單。',
        },
        {
          title: '限制會寫清楚',
          body: '每一頁都會說明它不納入什麼——稅費、資格條件、契約條款——以及哪一個輸入值會讓結論翻轉。',
        },
      ],
    },
    categories: {
      heading: 'WorthCalc 深入整理的四個決策主題',
      lead: '每個主題都把算出數字的計算機，和解釋這個數字代表什麼的指南放在一起。',
      cta: '進入這個主題',
    },
    library: {
      heading: '瀏覽完整內容庫',
      lead: '兩份依主題分類的索引：一份是所有計算機，一份是它們背後的文字指南。',
      calculators: '全部計算機',
      guides: '全部指南',
      moreTopics: '更多主題',
    },
    trust: {
      heading: '計算方法、資料來源與限制',
      methodHeading: '計算方法',
      method:
        '每個計算機都把你輸入的數字帶入頁面公開的公式，在相同期間比較方案，並輸出回本門檻、總成本或比率。可調整的預設值只是示範，不是報價或建議。',
      sourcesHeading: '資料來源',
      sourcesLead:
        '應優先使用你手上的最新契約、帳單、報價、薪資單與業者條款。各主題的計算框架另引用本站既有指南使用的長期公開來源：',
      sources: [
        { label: 'Costco 好市多台灣 — 會員權益與方案', href: 'https://www.costco.com.tw/membership' },
        { label: '金融監督管理委員會 — 信用卡定型化契約規範', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=FL049905&media=print' },
        { label: '交通部運輸研究所 — 通勤與行車成本分類', href: 'https://www.iot.gov.tw/zh_tw/archive/pub/reports/-59902021' },
        { label: '中華民國銀行公會 — 會員授信準則', href: 'https://www.ba.org.tw/Upload/Important/38c042e7-fa61-4bff-88c6-7dc5733f0d1e/%E6%8E%88%E4%BF%A1%E6%BA%96%E5%89%87%E5%85%A8%E6%96%8710701.pdf' },
      ],
      scopeHeading: '計算機會納入哪些項目',
      scope:
        '試算只會納入該計算機明列且由你輸入的項目；不會自動涵蓋所有稅費、資格或授信規則、回饋排除、路線條件、雇主補助、融資條款與個人風險。',
      reviewedLabel: '首頁方法最後審閱',
      reviewedDate: '2026-08-24',
      reviewedDisplay: '2026 年 8 月 24 日',
      advice:
        'WorthCalc 提供一般教育用途的估算。本頁不是財務建議，任何結果都不代表核准、不保證節省，也不能取代最新契約條款或合格專業人士的個別建議。',
    },
    toolsHeading: '最常用的計算機',
    toolsLead: '先從這十個開始。完整目錄依主題分類，放在計算機索引頁。',
    toolsCta: '開啟計算機',
    tools: [
      {
        icon: '💳',
        title: '信用卡分期試算',
        path: '/tools/installment-true-apr',
        description: '看穿「0 利率」分期背後的真實年利率，手續費其實是幾 % 利息。',
      },
      {
        icon: '📺',
        title: '訂閱支出健檢計算機',
        path: '/tools/subscription-audit',
        description: '把 Netflix、Spotify 等訂閱加總，看每月、一年、五年到底花多少。',
      },
      {
        icon: '🛒',
        title: 'Costco 會員值不值得計算機',
        path: '/tools/costco-membership',
        description: '算出好市多金星、商業、黑鑽會員的回本消費門檻與年度淨效益。',
      },
      {
        icon: '🚌',
        title: '通勤成本計算機',
        path: '/tools/commute-cost',
        description: '比較機車、汽車、大眾運輸與 Uber 的每月、每年通勤花費。',
      },
      {
        icon: '🛵',
        title: '電動機車 vs 油車計算機',
        path: '/tools/ev-vs-gas',
        description: '比較 Gogoro 類電動機車與 125cc 油車的五年總持有成本與回本年。',
      },
      {
        icon: '🎁',
        title: '信用卡回饋打平計算機',
        path: '/tools/cashback-breakeven',
        description: '算出年費卡要刷多少才回本，並跟免年費 1% 回饋卡直接比較。',
      },
    ],
    methodHeading: '一套可以自行核對的決策流程',
    methodLead: '好用的計算機不應替你藏住假設，而要讓你看見答案在哪個條件下會翻轉。',
    methodSteps: [
      '先找合約、帳單、報價與實際使用紀錄，不拿廣告標語當輸入值。',
      '所有方案使用同一比較期間，並把可回收價值與真正支出分開。',
      '調整利率、使用次數、持有年限與轉售價，找出結論是否穩健。',
      '行動前再確認最新價格、資格、稅費、取消規則；重大決定應找合格專業人士。',
    ],
    guidesHeading: '熱門金錢決策指南',
    guidesLead: '需要比單一數字更完整的答案時，閱讀含公式、案例、敏感度、限制與官方來源的深度指南。',
    guidesCta: '閱讀指南',
    guides: [
      { title: '零利率分期真的零成本嗎？', path: '/zero-interest-installments-truth', description: '把現金價、必要手續費、放棄折扣與真實年化成本分開核對。' },
      { title: '租屋還是買房完整比較', path: '/rent-vs-buy-guide', description: '以同地段、同居住期間比較房貸利息、持有成本、期末淨值與頭期款機會成本。' },
      { title: '電動車與油車總持有成本', path: '/ev-vs-gas-total-cost', description: '從購車淨價、能源、保險、保養、補助與轉售價建立完整比較。' },
      { title: '信用卡年費回本門檻', path: '/annual-fee-card-breakeven', description: '把續卡價值與實際可申辦的免年費卡比較，而不是假設替代方案零回饋。' },
      { title: '扣除通勤與工作成本的真實時薪', path: '/true-hourly-wage-after-commuting-work-expenses', description: '用同一期實領、必要時間、通勤與未報銷支出重新比較工作。' },
      { title: '加薪有沒有跑贏通膨？', path: '/pay-raise-vs-inflation-purchasing-power', description: '使用相同期間 CPI，分清楚名目加薪與實質購買力變化。' },
    ],
    guidesMore: '全部指南，依主題分類',
    faqHeading: '關於 WorthCalc 的常見問題',
    faq: [
      {
        question: 'WorthCalc 的結果是財務建議嗎？',
        answer:
          '不是。計算結果僅供一般資訊與估算參考。若涉及重大財務、稅務、法律、債務、房屋或投資決策，請諮詢能完整了解你情況的合格專業人士。',
      },
      {
        question: '計算機會把我的數字送到伺服器嗎？',
        answer:
          '不會。計算機在你的瀏覽器中執行。部分工具可能使用瀏覽器 localStorage，讓你的裝置記住輸入值，但資料不會上傳到 WorthCalc。',
      },
      {
        question: '為什麼結果可能和真實帳單或方案不同？',
        answer:
          '實際價格、稅費、利率、回饋規則、使用習慣和促銷條款都可能變動。請把結果當作決策輔助，重要條件仍要向服務提供者確認。',
      },
      {
        question: 'WorthCalc 可以免費使用嗎？',
        answer:
          '可以。所有計算機都免費使用，也不需要註冊。本站可能透過廣告支持營運，詳情請見隱私權政策。',
      },
    ],
  },
};

export interface HomeFeaturedItem {
  title: string;
  path: string;
}

export function homeJsonLd(locale: CoreLocale, site?: URL, featured?: readonly HomeFeaturedItem[]): object[] {
  const content = homeContent[locale];
  const origin = (site?.origin ?? SITE.url).replace(/\/$/, '');
  const pageUrl = locale === HOME_LOCALE ? `${origin}/` : `${origin}/${locale}/`;
  // The ItemList has to describe what the page actually renders, so the caller
  // passes the same featured selection the homepage lays out.
  const featuredItems = featured ?? content.tools;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: content.title,
      description: content.description,
      url: pageUrl,
      inLanguage: LOCALE_HREFLANG[locale],
      // Point at the one WebSite entity SEO.astro emits instead of repeating an
      // anonymous copy of it, so a consumer resolves one site rather than two.
      isPartOf: { '@id': webSiteId(site) },
      publisher: { '@id': organizationId(site) },
      ...(content.entity?.topics?.length
        ? { about: content.entity.topics.map((name) => ({ '@type': 'Thing', name })) }
        : {}),
      ...(content.trust ? { dateModified: content.trust.reviewedDate } : {}),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: featuredItems.length,
        itemListElement: featuredItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          url: `${origin}/${locale}${item.path}/`,
        })),
      },
    },
  ];
}
