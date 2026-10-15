export interface SeoPackage011GuideMeta {
  key: string;
  packageId: '011';
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

type Entry = {
  locale: SeoPackage011GuideMeta['locale'];
  title: string;
  description: string;
  excerpt: string;
  alt: string;
};

const image = '/images/guides/annual-bills-monthly-equivalent-og.webp';

const definitions: { slug: string; entries: Entry[] }[] = [
  {
    slug: 'subscription-price-increase-annual-impact',
    entries: [
      { locale: 'en', title: 'Subscription Price Increase: Calculate the Annual Impact on Your Budget', description: 'Measure how a monthly subscription price increase changes your annual cost, cash flow, and comparison with alternatives.', excerpt: 'A small monthly increase belongs in the months when it applies. Calculate the new total before deciding whether to switch.', alt: 'annual impact of a subscription price increase' },
      { locale: 'zh', title: '訂閱漲價一年多付多少？把生效日期與實際使用期算進預算', description: '計算訂閱月費上調對年度總成本、現金流與替代方案損益兩平的實際影響。', excerpt: '先按生效月份重算年度總額，再比較留下或更換方案的未來成本。', alt: '訂閱漲價對年度預算的影響' },
    ],
  },
  {
    slug: 'free-trial-auto-renewal-first-charge',
    entries: [
      { locale: 'en', title: 'Free Trial Auto-Renewal Cost: Calculate the First Charge Before You Start', description: 'Turn a free trial into a realistic first-period cost by checking renewal price, fees, cancellation timing, and actual use.', excerpt: 'A trial headline can hide shipping or a first renewal. Put the deadline and possible charge on your calendar.', alt: 'free trial and first auto-renewal cost' },
      { locale: 'zh', title: '免費試用自動續費會扣多少？先算第一筆可能的實際成本', description: '把免費試用的續約價、運費、稅費、取消期限與實際使用量放進第一期成本比較。', excerpt: '試用畫面寫 0 元不代表沒有運費或續約風險；先把最晚取消日放入行事曆。', alt: '免費試用與第一筆自動續費成本' },
    ],
  },
  {
    slug: 'pause-vs-cancel-membership-cost',
    entries: [
      { locale: 'en', title: 'Pause vs Cancel a Membership: Compare the Cost of Keeping Access', description: 'Compare a membership pause with cancellation by adding pause fees, reactivation costs, lost credits, and expected return time.', excerpt: 'A free cancellation today may carry a joining fee later. Compare the whole gap, not just the next charge.', alt: 'pause versus cancel membership cost' },
      { locale: 'zh', title: '會員暫停還是取消比較省？比較保留資格與重新加入的成本', description: '把暫停費、重新啟用費、失效額度與預計回來使用的時間放在同一張會員成本比較表。', excerpt: '不要只看今天是否免費；把停用期和回來時的費用放在同一個情境。', alt: '會員暫停與取消成本比較' },
    ],
  },
  {
    slug: 'family-plan-break-even-members',
    entries: [
      { locale: 'en', title: 'Family Plan Break-Even: How Many Members Make the Upgrade Worth It?', description: 'Calculate when a family or multi-user plan costs less than separate accounts using actual active members and usage.', excerpt: 'Available seats are not active users. Count the accounts the shared plan really replaces.', alt: 'family plan break-even active members' },
      { locale: 'zh', title: '家庭方案幾個人用才划算？算出多人會員的損益兩平人數', description: '用實際活躍人數、額外席次、稅費與促銷後價格，比較家庭方案和分開帳號的真實成本。', excerpt: '可用席次不等於活躍使用者；只計算家庭方案真正取代的帳號。', alt: '家庭方案活躍人數損益兩平' },
    ],
  },
  {
    slug: 'prepaid-balance-expiration-cost',
    entries: [
      { locale: 'en', title: 'Prepaid Balance Expiration Cost: Measure What Unused Credits Really Cost', description: 'Calculate the effective cost of prepaid credits or visits when part of the balance expires or is unlikely to be used.', excerpt: 'The advertised unit price assumes full use. Divide by the credits you can realistically complete.', alt: 'prepaid credits and expiration cost per use' },
      { locale: 'zh', title: '預付額度到期怎麼算？找出用不完點數的實際成本', description: '計算預付點數、堂數或次數在到期前只能用掉一部分時的有效單位成本。', excerpt: '廣告單價假設全部用完；應除以有效期間內實際完成的數量。', alt: '預付點數到期與每次實際成本' },
    ],
  },
  {
    slug: 'minimum-spend-fee-waiver-break-even',
    entries: [
      { locale: 'en', title: 'Minimum Spend Fee Waiver: Calculate Whether the Threshold Saves Money', description: 'Find the break-even point for a fee waiver without treating unnecessary spending as a saving.', excerpt: 'A waived fee is useful only when the qualifying purchases were already needed.', alt: 'minimum spend threshold and fee waiver break-even' },
      { locale: 'zh', title: '滿額免手續費真的省嗎？用必要消費算損益兩平門檻', description: '計算滿額免運或免手續費是否真的降低成本，並把為了達標而增加的非必要消費分開。', excerpt: '免掉的費用只有在必要消費本來就會發生時才是真正節省。', alt: '滿額免手續費與損益兩平門檻' },
    ],
  },
  {
    slug: 'billing-date-cash-flow-overlap',
    entries: [
      { locale: 'en', title: 'Billing Date Cash-Flow Overlap: Plan for Large Charges in the Same Week', description: 'Map subscription and annual bill dates to find temporary cash-flow pressure without confusing timing with annual cost.', excerpt: 'Close billing dates can create a low balance even when the twelve-month total is unchanged.', alt: 'billing date overlap and cash-flow low point' },
      { locale: 'zh', title: '帳單日撞在同一週怎麼辦？分清現金流壓力與年度總成本', description: '把訂閱續費、年繳帳單與收入日放到實際日期，找出短期現金流低點。', excerpt: '扣款靠近可能壓低餘額，但不代表十二個月總額增加。', alt: '帳單日重疊與現金流低點' },
    ],
  },
];

function relatedFor(locale: SeoPackage011GuideMeta['locale'], slug: string): string[] {
  const budget = ['en', 'zh'].includes(locale) ? `/${locale}/tools/budget-builder/` : '/en/tools/budget-builder/';
  const annual = `/${locale}/guides/annual-cost-savings-calculator/`;
  const recurring = `/${locale}/guides/recurring-costs-annual-total/`;
  const sibling = slug === 'recurring-costs-annual-total' ? annual : recurring;
  return [budget, annual, sibling];
}

export const seoPackage011Guides: Record<string, SeoPackage011GuideMeta> = {};

for (const definition of definitions) {
  for (const entry of definition.entries) {
    const key = `${entry.locale}/${definition.slug}`;
    seoPackage011Guides[key] = {
      key, packageId: '011', locale: entry.locale, articleSlug: definition.slug,
      title: entry.title, seoTitle: `${entry.title} | WorthCalc`, metaDescription: entry.description,
      excerpt: entry.excerpt, canonical: `https://worthcalc.win/${entry.locale}/guides/${definition.slug}/`, robots: 'index,follow',
      ogTitle: entry.title, ogDescription: entry.description, ogImage: image, imageAlt: entry.alt,
      imageBrief: `Editorial cost comparison diagram for ${definition.slug}.`, lastReviewed: '2026-09-02',
      related: relatedFor(entry.locale, definition.slug), breadcrumbLabel: entry.title,
      schemaFile: `011__${entry.locale}__${definition.slug}.json`,
    };
  }
}
