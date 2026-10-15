export interface SeoPackage012GuideMeta {
  key: string; packageId: '012'; locale: 'en' | 'zh'; articleSlug: string;
  title: string; seoTitle: string; metaDescription: string; excerpt: string; canonical: string;
  robots: 'index,follow'; ogTitle: string; ogDescription: string; ogImage: string; imageAlt: string;
  imageBrief: string; lastReviewed: string; related: string[]; breadcrumbLabel: string; schemaFile: string;
}

const image = '/images/guides/annual-bills-monthly-equivalent-og.webp';
type PackageLocale = SeoPackage012GuideMeta['locale'];
type PackageEntry = { locale: PackageLocale; title: string; description: string; excerpt: string; alt: string };
const definitions: { slug: string; entries: PackageEntry[] }[] = [
  { slug: "costco-executive-break-even-eligible-spend", entries: [
    { locale: "en", title: "Costco Executive Break-Even: How Much Eligible Spending Covers the Upgrade?", description: "Calculate the eligible Costco spending needed to recover an Executive upgrade fee without counting excluded or extra purchases.", excerpt: "Calculate the eligible Costco spending needed to recover an Executive upgrade fee without counting excluded or extra purchases.", alt: "Costco membership cost comparison" },
    { locale: "zh", title: "Costco 黑鑽卡會員回本要買多少？用合格消費算升級損益兩平", description: "用符合回饋資格的 Costco 消費、升級費與實際使用情境，計算黑鑽卡會員何時可能回本。", excerpt: "用符合回饋資格的 Costco 消費、升級費與實際使用情境，計算黑鑽卡會員何時可能回本。", alt: "Costco 會員成本比較" },
  ] },
  { slug: "costco-membership-fee-break-even-savings", entries: [
    { locale: "en", title: "Costco Membership Fee Break-Even: How Much Shopping Must Be Cheaper?", description: "Estimate the Costco shopping savings needed to recover a membership fee after travel, delivery, waste, and realistic use.", excerpt: "Estimate the Costco shopping savings needed to recover a membership fee after travel, delivery, waste, and realistic use.", alt: "Costco membership cost comparison" },
    { locale: "zh", title: "Costco 會員費要買多少才回本？把實際價差與交通成本一起算", description: "比較 Costco 會員費、原本就會購買的商品價差、交通、配送、囤貨浪費與實際使用量。", excerpt: "比較 Costco 會員費、原本就會購買的商品價差、交通、配送、囤貨浪費與實際使用量。", alt: "Costco 會員成本比較" },
  ] },
  { slug: "costco-household-card-break-even-use", entries: [
    { locale: "en", title: "Costco Household Card Break-Even: When Does Shared Use Add Real Value?", description: "Measure the incremental value of a Costco household card using planned purchases, duplicate fees avoided, and extra travel or spending.", excerpt: "Measure the incremental value of a Costco household card using planned purchases, duplicate fees avoided, and extra travel or spending.", alt: "Costco membership cost comparison" },
    { locale: "zh", title: "Costco 家庭卡值得嗎？用實際使用量算共用會員的價值", description: "以家庭卡帶來的原本計畫消費、可避免成本、額外交通與新增支出，估算共用會員的實際價值。", excerpt: "以家庭卡帶來的原本計畫消費、可避免成本、額外交通與新增支出，估算共用會員的實際價值。", alt: "Costco 會員成本比較" },
  ] },
  { slug: "costco-gas-detour-break-even", entries: [
    { locale: "en", title: "Costco Gas Detour Break-Even: Is the Lower Price Worth the Extra Drive?", description: "Calculate whether a Costco fuel price gap covers the fuel, time, and route cost of making a detour.", excerpt: "Calculate whether a Costco fuel price gap covers the fuel, time, and route cost of making a detour.", alt: "Costco membership cost comparison" },
    { locale: "zh", title: "Costco 加油繞路划算嗎？把油價差、里程與會員成本算清楚", description: "計算 Costco 加油的每加侖價差是否足以抵銷額外里程、油耗、停車與繞路成本。", excerpt: "計算 Costco 加油的每加侖價差是否足以抵銷額外里程、油耗、停車與繞路成本。", alt: "Costco 會員成本比較" },
  ] },
  { slug: "costco-reward-exclusion-effective-rate", entries: [
    { locale: "en", title: "Costco Reward Exclusions: Calculate Your Effective Reward Rate", description: "Convert an advertised Costco reward rate into an effective rate after excluded purchases, refunds, taxes, and unused eligibility.", excerpt: "Convert an advertised Costco reward rate into an effective rate after excluded purchases, refunds, taxes, and unused eligibility.", alt: "Costco membership cost comparison" },
    { locale: "zh", title: "Costco 回饋排除項目怎麼算？找出你的實際回饋率", description: "把 Costco 宣稱的回饋率調整為符合資格消費、退貨、稅費與排除項目後的有效回饋率。", excerpt: "把 Costco 宣稱的回饋率調整為符合資格消費、退貨、稅費與排除項目後的有效回饋率。", alt: "Costco 會員成本比較" },
  ] },
  { slug: "costco-reward-cap-usage-break-even", entries: [
    { locale: "en", title: "Costco Reward Cap: Find the Spending Level Where More Purchases Stop Helping", description: "Model a Costco reward cap, qualified spending, and the point where additional purchases no longer increase membership value.", excerpt: "Model a Costco reward cap, qualified spending, and the point where additional purchases no longer increase membership value.", alt: "Costco membership cost comparison" },
    { locale: "zh", title: "Costco 回饋上限怎麼算？找出超過哪個消費額後不再增加", description: "把 Costco 回饋率、合格消費與年度上限放入公式，找出額外消費不再增加回饋的區間。", excerpt: "把 Costco 回饋率、合格消費與年度上限放入公式，找出額外消費不再增加回饋的區間。", alt: "Costco 會員成本比較" },
  ] },
  { slug: "costco-renewal-refund-reward-timing", entries: [
    { locale: "en", title: "Costco Renewal, Refund, and Reward Timing: Calculate the Net Membership Cost", description: "Map renewal dates, reward issuance, cancellation, and refunds to estimate the cash cost of changing a Costco membership.", excerpt: "Map renewal dates, reward issuance, cancellation, and refunds to estimate the cash cost of changing a Costco membership.", alt: "Costco membership cost comparison" },
    { locale: "zh", title: "Costco 續約、退費與回饋何時發生？計算會員變更的淨成本", description: "把升級、回饋發放、續約、取消、降級與退款日期放在同一條時間線，估算實際現金成本。", excerpt: "把升級、回饋發放、續約、取消、降級與退款日期放在同一條時間線，估算實際現金成本。", alt: "Costco 會員成本比較" },
  ] },
];

function relatedFor(locale: SeoPackage012GuideMeta['locale'], slug: string): string[] {
  const annual = `/${locale}/guides/annual-cost-savings-calculator/`;
  const recurring = `/${locale}/guides/recurring-costs-annual-total/`;
  const sibling = slug === 'costco-executive-break-even-eligible-spend'
    ? `/${locale}/guides/costco-membership-fee-break-even-savings/`
    : `/${locale}/guides/costco-executive-break-even-eligible-spend/`;
  return [annual, recurring, sibling];
}

export const seoPackage012Guides: Record<string, SeoPackage012GuideMeta> = {};
for (const definition of definitions) {
  for (const entry of definition.entries) {
    const key = `${entry.locale}/${definition.slug}`;
    seoPackage012Guides[key] = {
      key, packageId: '012', locale: entry.locale, articleSlug: definition.slug,
      title: entry.title, seoTitle: `${entry.title} | WorthCalc`, metaDescription: entry.description,
      excerpt: entry.excerpt, canonical: `https://worthcalc.win/${entry.locale}/guides/${definition.slug}/`,
      robots: 'index,follow', ogTitle: entry.title, ogDescription: entry.description, ogImage: image,
      imageAlt: entry.alt, imageBrief: 'Costco membership cost comparison', lastReviewed: '2026-09-02',
      related: relatedFor(entry.locale, definition.slug), breadcrumbLabel: entry.title,
      schemaFile: `012__${entry.locale}__${definition.slug}.json`,
    };
  }
}
