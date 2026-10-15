export interface SeoPackage010GuideMeta {
  key: string;
  packageId: '010';
  locale: 'en' | 'zh';
  articleSlug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  canonical: string;
  robots: 'index,follow';
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  imageAlt: string;
  imageBrief: string;
  lastReviewed: string;
  related: string[];
  breadcrumbLabel: string;
  schemaFile: string;
}

const image = '/images/guides/annual-bills-monthly-equivalent-og.webp';

export const seoPackage010Guides: Record<string, SeoPackage010GuideMeta> = {
  'en/annual-cost-savings-calculator': {
    key: 'en/annual-cost-savings-calculator', packageId: '010', locale: 'en', articleSlug: 'annual-cost-savings-calculator',
    title: 'Annual Cost Savings Calculator: Compare Real Savings After Fees, Waste, and Usage',
    seoTitle: 'Annual Cost Savings Calculator | WorthCalc',
    metaDescription: 'Calculate annual savings from a switch using recurring fees, one-time costs, waste, and actual usage instead of a headline discount.',
    excerpt: 'A cheaper price is not automatically a saving. Compare the old and new annual totals, then subtract switching costs and unused capacity.',
    canonical: 'https://worthcalc.win/en/guides/annual-cost-savings-calculator/', robots: 'index,follow',
    ogTitle: 'Annual Cost Savings Calculator: Count the Costs That Actually Repeat',
    ogDescription: 'A practical annual comparison for subscriptions, insurance, utilities, memberships, and household services.', ogImage: image,
    imageAlt: 'annual cost savings comparison with recurring fees and actual usage', imageBrief: 'Two annual cost columns with fees, waste, and usage adjustments.', lastReviewed: '2026-09-02',
    related: ['/en/tools/budget-builder/', '/en/guides/annual-bills-monthly-equivalent/', '/en/guides/annual-bills-cash-flow-low-point/'], breadcrumbLabel: 'Annual Cost Savings Calculator', schemaFile: '010__en__annual-cost-savings-calculator.json',
  },
  'zh/annual-cost-savings-calculator': {
    key: 'zh/annual-cost-savings-calculator', packageId: '010', locale: 'zh', articleSlug: 'annual-cost-savings-calculator',
    title: '年度省下多少錢怎麼算？把手續費、耗損與實際使用算進來', seoTitle: '年度省錢計算器：比較真實年成本 | WorthCalc',
    metaDescription: '比較更換方案前後的年度總成本，納入固定費、一次性費用、未使用額度與實際使用量。', excerpt: '標價變便宜不等於真的省錢；要比較的是一年內實際付出的總額。',
    canonical: 'https://worthcalc.win/zh/guides/annual-cost-savings-calculator/', robots: 'index,follow', ogTitle: '年度省錢計算器：從折扣價算到真實年成本', ogDescription: '適合訂閱、保險、公用服務與家庭方案的年度成本比較方法。', ogImage: image, imageAlt: '年度方案成本與實際省下金額比較', imageBrief: '以固定費、轉換成本與使用量調整兩組年度成本。', lastReviewed: '2026-09-02',
    related: ['/zh/tools/budget-builder/', '/zh/guides/annual-expenses-monthly-equivalent/', '/zh/guides/annual-bill-cluster-cash-low-point/'], breadcrumbLabel: '年度省錢計算器', schemaFile: '010__zh__annual-cost-savings-calculator.json',
  },
};

type AdditionalEntry = {
  locale: SeoPackage010GuideMeta['locale'];
  title: string;
  description: string;
  excerpt: string;
  alt: string;
};

const additionalDefinitions: { slug: string; entries: AdditionalEntry[] }[] = [
  {
    slug: 'recurring-costs-annual-total',
    entries: [
      { locale: 'en', title: 'Recurring Costs Annual Total: Add Monthly, Quarterly, and Yearly Bills', description: 'Calculate the full annual total for recurring costs paid on different schedules, including irregular charges.', excerpt: 'A monthly total is incomplete when quarterly and annual bills are missing. Put every recurring schedule on one twelve-month timeline.', alt: 'recurring costs combined into an annual total' },
      { locale: 'zh', title: '固定支出年度總額怎麼算？整合月繳、季繳與年繳費用', description: '把不同付款週期的固定支出放到同一個十二個月時間軸，算出完整年度成本。', excerpt: '只看月費會漏掉季繳與年繳帳單；先把所有重複付款放在同一張年度表。', alt: '整合不同付款週期的年度固定支出' },
    ],
  },
  {
    slug: 'monthly-vs-annual-total-cost',
    entries: [
      { locale: 'en', title: 'Monthly vs Annual Payment: Compare Total Cost and Cash-Flow Risk', description: 'Compare monthly and annual payment plans after fees, discounts, refunds, and the value of keeping cash available.', excerpt: 'Annual billing may be cheaper on paper but requires more cash today. Compare price and liquidity separately.', alt: 'monthly versus annual payment total-cost comparison' },
      { locale: 'zh', title: '月繳還是年繳比較划算？同時看總成本與現金流風險', description: '比較月繳與年繳方案的費用、折扣、退款條件，以及一次付清對現金流的影響。', excerpt: '年繳可能標價較低，卻會先占用一大筆現金；總成本和流動性要分開判斷。', alt: '月繳與年繳的總成本比較' },
    ],
  },
  {
    slug: 'savings-break-even-use-period',
    entries: [
      { locale: 'en', title: 'Savings Break-Even Period: How Many Months or Uses Make a Switch Worth It?', description: 'Find the months or uses required for a cheaper option to recover its joining fee and switching cost.', excerpt: 'Divide the one-time switching cost by the recurring saving per period, then test whether your expected usage reaches that point.', alt: 'break-even months for recovering a switching cost' },
      { locale: 'zh', title: '省錢損益兩平要多久？算出幾個月或幾次使用才值得換', description: '用一次性轉換成本除以每期節省金額，找出新方案開始真正省錢的時間或使用次數。', excerpt: '先算回收開通費需要幾個月，再檢查自己的使用量是否真的到得了那個門檻。', alt: '回收轉換成本所需的損益兩平月份' },
    ],
  },
  {
    slug: 'introductory-discount-renewal-cost',
    entries: [
      { locale: 'en', title: 'Introductory Discount vs Renewal Cost: Calculate the First-Year Total', description: 'Separate a promotional price from the renewal price and calculate what a subscription costs in year one and later years.', excerpt: 'The first-year headline can hide an expensive renewal. Show both totals before treating a promotion as a saving.', alt: 'introductory discount and renewal cost comparison' },
      { locale: 'zh', title: '首年優惠與續約價格怎麼算？先拆開第一年和之後的成本', description: '把促銷期價格與續約價格分開，計算訂閱第一年及後續年度的實際總成本。', excerpt: '首年低價可能掩蓋昂貴續約；把兩段費用分開，才知道優惠是不是值得。', alt: '首年優惠與續約價格的成本比較' },
    ],
  },
  {
    slug: 'unused-membership-capacity-cost',
    entries: [
      { locale: 'en', title: 'Unused Membership Capacity: Calculate the Cost of Benefits You Do Not Use', description: 'Measure the effective cost of a membership or bundle using the benefits you actually use, not the advertised limit.', excerpt: 'A large allowance is not value if it expires unused. Divide the fee by realistic usage and compare alternatives.', alt: 'unused membership benefits and effective cost per use' },
      { locale: 'zh', title: '會員額度用不完怎麼算？找出未使用福利的實際成本', description: '用實際使用的福利或次數計算會員方案的有效成本，不要只看廣告上的最高額度。', excerpt: '額度再大，過期沒用到就不是價值；用歷史使用量算每次真正使用的成本。', alt: '未使用會員額度與每次實際成本' },
    ],
  },
  {
    slug: 'one-time-switching-cost-payback',
    entries: [
      { locale: 'en', title: 'One-Time Switching Cost Payback: When Does a Cheaper Plan Recover the Fee?', description: 'Calculate how long a lower recurring price takes to recover cancellation, setup, installation, or equipment costs.', excerpt: 'A cheaper monthly price can still be a poor short-term move. Count the payback months before switching.', alt: 'payback period for a one-time switching cost' },
      { locale: 'zh', title: '一次性轉換費多久回本？便宜方案何時才開始省錢', description: '計算解約、開通、安裝或設備等一次性費用，要經過多久才會被每期節省抵銷。', excerpt: '月費較低不代表短期划算；先算回本月數，再決定是否現在更換。', alt: '一次性轉換費的回本期間' },
    ],
  },
];

function relatedFor(locale: AdditionalEntry['locale']): string[] {
  const budgetTool = ['en', 'zh'].includes(locale) ? `/${locale}/tools/budget-builder/` : '/en/tools/budget-builder/';
  const annualGuide = locale === 'zh' ? '/zh/guides/annual-expenses-monthly-equivalent/' : '/en/guides/annual-bills-monthly-equivalent/';
  return [budgetTool, `/${locale}/guides/annual-cost-savings-calculator/`, annualGuide];
}

for (const definition of additionalDefinitions) {
  for (const entry of definition.entries) {
    const key = `${entry.locale}/${definition.slug}`;
    seoPackage010Guides[key] = {
      key, packageId: '010', locale: entry.locale, articleSlug: definition.slug,
      title: entry.title, seoTitle: `${entry.title} | WorthCalc`, metaDescription: entry.description,
      excerpt: entry.excerpt, canonical: `https://worthcalc.win/${entry.locale}/guides/${definition.slug}/`, robots: 'index,follow',
      ogTitle: entry.title, ogDescription: entry.description, ogImage: image, imageAlt: entry.alt,
      imageBrief: `Editorial comparison diagram for ${definition.slug}.`, lastReviewed: '2026-09-02',
      related: relatedFor(entry.locale), breadcrumbLabel: entry.title, schemaFile: `010__${entry.locale}__${definition.slug}.json`,
    };
  }
}
