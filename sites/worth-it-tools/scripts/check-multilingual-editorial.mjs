import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { expectedHreflangsFor, isSoftDeindexedUrl } from './deindexing.mjs';

const dist = resolve('dist');
// 2026-10-15 rebuild: only en and zh still have routes (P1b deleted the es/fr/de/hi/ar
// native-market markers along with the pages they described). `hreflangs` still lists
// the retired tags on purpose: the "advertises soft-deindexed hreflang" check below is
// what proves zh pages no longer name an English (or any retired) alternate.
const locales = ['en', 'zh'];
const hreflangs = ['en', 'zh-TW', 'es', 'fr', 'de', 'x-default'];
const failures = [];
// P1b (2026-10-15): cost-per-use-expensive-item, bulk-buying-vs-small-packages,
// meal-prep-vs-takeout-cost, reusable-vs-disposable-break-even and
// price-per-wear-clothing-shoes were removed by the disposition audit, so they are no
// longer routes this check expects to find. P2 batch 3 (2026-10-17) did the same for
// zero-interest-installments-truth, which is now a redirect stub to /tools/installment-true-apr/.
// P2 batch 4 (2026-10-17) did the same for subscription-creep (-> /tools/subscription-audit/) and
// paid-membership-break-even (-> /tools/costco-membership/).
const editorialRoutes = [
  {
    slug: 'upfront-fees-financing-cost',
    nativeMarkers: {
      en: ['net proceeds', 'origination fee', '$1,300'],
      zh: ['實際入帳', '總費用年百分率', 'NT$34,000'],
    },
  },
  {
    slug: 'bnpl-vs-credit-card-installments',
    nativeMarkers: {
      en: ['pay-in-four', '$650', 'withdrew the 2024 BNPL interpretive rule'],
      zh: ['應收債權', 'NT$12,500', '非金融特許業務'],
    },
  },
  {
    slug: 'monthly-vs-annual-subscription',
    nativeMarkers: {
      en: ['probability break-even', '$144', 'renewal notice'],
      zh: ['9.6 個月', 'NT$3,120', '刪除 APP'],
    },
  },
  {
    slug: 'gym-membership-cost-per-visit',
    nativeMarkers: {
      en: ['$12.98', '$251', 'paid months with no visits', 'data-gym-calculator'],
      zh: ['NT$297.60', 'NT$9,144', '健身中心定型化契約', 'data-gym-calculator'],
    },
  },
  {
    slug: 'delivery-membership-break-even',
    nativeMarkers: {
      en: ['$6.49', '$20.82', 'minimum basket', 'data-delivery-membership-calculator'],
      zh: ['NT$60', 'NT$440', '最低消費', 'data-delivery-membership-calculator'],
    },
  },
  {
    slug: 'cashback-caps-real-reward-rate',
    nativeMarkers: {
      en: ['$102', '2.72%', 'Merchant coding', 'data-cashback-caps-calculator'],
      zh: ['NT$350', '1.52%', '一般消費', 'data-cashback-caps-calculator'],
    },
  },
  {
    slug: 'annual-fee-card-breakeven',
    nativeMarkers: {
      en: ['incremental reward rate', 'no-fee alternative', '$6,333.33'],
      zh: ['一般消費', '免年費替代卡', 'NT$150,000'],
    },
  },
  {
    slug: 'rent-vs-buy-guide',
    nativeMarkers: {
      en: ['Loan Estimate', '$148,779', 'holding period'],
      zh: ['實價登錄', 'NT$3,647,764', '寬限期'],
    },
  },
  {
    slug: 'rent-vs-buy-breakeven-year',
    nativeMarkers: {
      en: ['$156,731', 'year 7', 'Closing Disclosure', 'data-rent-buy-breakeven-calculator'],
      zh: ['NT$2,894,592', '第 9 年', '房地合一稅', 'data-rent-buy-breakeven-calculator'],
    },
  },
  {
    slug: 'ev-vs-gas-total-cost',
    nativeMarkers: {
      en: ['$39,864', 'out-the-door', 'data-ev-gas-tco-calculator'],
      zh: ['NT$1,107,644', '汽車燃料使用費', 'data-ev-gas-tco-calculator'],
    },
  },
  {
    slug: 'home-vs-public-ev-charging-cost',
    nativeMarkers: {
      en: ['$1,118', 'marginal home electricity', 'data-ev-charging-cost-calculator'],
      zh: ['NT$16,001', '公設電', 'data-ev-charging-cost-calculator'],
    },
  },
  {
    slug: 'new-vs-used-car-total-cost',
    nativeMarkers: {
      en: ['$26,774', 'Buyers Guide', 'data-new-used-car-tco-calculator'],
      zh: ['NT$617,188', '定型化契約', 'data-new-used-car-tco-calculator'],
    },
  },
  {
    slug: 'car-lease-vs-buy-total-cost',
    nativeMarkers: {
      en: ['$28,650', 'Regulation M', 'data-car-lease-buy-calculator'],
      zh: ['NT$913,000', '定型化契約', 'data-car-lease-buy-calculator'],
    },
  },
  {
    slug: 'full-commute-cost-including-time',
    nativeMarkers: {
      en: ['$732', 'IRS mileage', 'data-commute-full-cost-calculator'],
      zh: ['NT$9,338', '中油牌價', 'data-commute-full-cost-calculator'],
    },
  },
  {
    slug: 'work-from-home-vs-commuting-hidden-costs',
    nativeMarkers: {
      en: ['$610', 'home office deduction', 'data-wfh-commute-calculator'],
      zh: ['NT$5,420', '居家工作職業安全衛生參考指引', 'data-wfh-commute-calculator'],
    },
  },
  {
    slug: 'repair-or-replace-decision-formula',
    nativeMarkers: {
      en: ['$301', 'CPSC', 'data-repair-replace-calculator'],
      zh: ['NT$7,179', '手機送修', 'data-repair-replace-calculator'],
    },
  },
  {
    slug: 'is-an-extended-warranty-worth-it',
    nativeMarkers: {
      en: ['$249', 'manufacturer warranty', 'data-extended-warranty-calculator'],
      zh: ['NT$5,182.5', '獨立擔保', 'data-extended-warranty-calculator'],
    },
  },
  {
    slug: 'upgrade-your-phone-or-keep-it',
    nativeMarkers: {
      en: ['$69.69', 'bill credits', 'data-phone-keep-upgrade-calculator'],
      zh: ['NT$1,293.4', 'IMEI', 'data-phone-keep-upgrade-calculator'],
    },
  },
  {
    slug: 'energy-efficient-appliance-payback',
    nativeMarkers: {
      en: ['$27', 'EnergyGuide', 'data-mode="appliance"'],
      zh: ['NT$525', '能源署', 'data-mode="appliance"'],
    },
  },
  {
    slug: 'true-hourly-wage-after-commuting-work-expenses',
    nativeMarkers: {
      en: ['$14.47/hour', 'Department of Labor', 'data-mode="hourlyWage"'],
      zh: ['NT$247.37', '薪資單', 'data-mode="hourlyWage"'],
    },
  },
  {
    slug: 'pay-raise-vs-inflation-purchasing-power',
    nativeMarkers: {
      en: ['−0.95%', 'Bureau of Labor Statistics', 'data-mode="raiseInflation"'],
      zh: ['NT$60,233.92', '主計總處', 'data-mode="raiseInflation"'],
    },
  },
];
const partialEditorialRoutes = [];

function read(relativePath) {
  const file = join(dist, relativePath);
  if (!existsSync(file)) {
    failures.push(`Missing ${relativePath}`);
    return '';
  }
  return readFileSync(file, 'utf8');
}

for (const article of editorialRoutes) {
  for (const locale of locales) {
    const html = read(`${locale}/${article.slug}/index.html`);
    if (!html) continue;

    const url = `https://worthcalc.win/${locale}/${article.slug}/`;
    const expectedHreflangs = expectedHreflangsFor(url, hreflangs);
    for (const hreflang of expectedHreflangs) {
      if (!html.includes(`hreflang="${hreflang}"`)) {
        failures.push(`/${locale}/${article.slug}/ missing hreflang=${hreflang}`);
      }
    }
    for (const absentHreflang of hreflangs.filter((item) => !expectedHreflangs.includes(item))) {
      if (html.includes(`hreflang="${absentHreflang}"`)) {
        failures.push(`/${locale}/${article.slug}/ advertises soft-deindexed hreflang=${absentHreflang}`);
      }
    }

    for (const marker of ['class="direct-answer"', '<table', 'class="source-list"', 'class="last-verified"']) {
      if (!html.includes(marker)) failures.push(`/${locale}/${article.slug}/ missing ${marker}`);
    }

    // FAQPage is no longer required (and is forbidden site-wide): the FAQ rich result was retired 2026-06-15.
    for (const schemaType of ['Article', 'BreadcrumbList']) {
      if (!html.includes(`"@type":"${schemaType}"`)) {
        failures.push(`/${locale}/${article.slug}/ missing ${schemaType} schema`);
      }
    }

    const markers = article.nativeMarkers[locale];
    if (markers) {
      for (const marker of markers) {
        if (!html.includes(marker)) failures.push(`/${locale}/${article.slug}/ missing native-market marker: ${marker}`);
      }
    }
  }
}

for (const article of partialEditorialRoutes) {
  for (const locale of article.locales) {
    const html = read(`${locale}/${article.slug}/index.html`);
    if (!html) continue;

    const url = `https://worthcalc.win/${locale}/${article.slug}/`;
    const expectedHreflangs = expectedHreflangsFor(
      url,
      [...article.locales.map((item) => item === 'zh' ? 'zh-TW' : item), 'x-default'],
    );
    for (const hreflang of expectedHreflangs) {
      if (!html.includes(`hreflang="${hreflang}"`)) {
        failures.push(`/${locale}/${article.slug}/ missing partial hreflang=${hreflang}`);
      }
    }
    for (const absentHreflang of hreflangs.filter((item) => !expectedHreflangs.includes(item))) {
      if (html.includes(`hreflang="${absentHreflang}"`)) {
        failures.push(`/${locale}/${article.slug}/ advertises incomplete hreflang=${absentHreflang}`);
      }
    }

    for (const marker of ['class="direct-answer"', '<table', 'class="source-list"', 'class="last-verified"']) {
      if (!html.includes(marker)) failures.push(`/${locale}/${article.slug}/ missing ${marker}`);
    }
    // FAQPage is no longer required (and is forbidden site-wide): the FAQ rich result was retired 2026-06-15.
    for (const schemaType of ['Article', 'BreadcrumbList']) {
      if (!html.includes(`"@type":"${schemaType}"`)) {
        failures.push(`/${locale}/${article.slug}/ missing ${schemaType} schema`);
      }
    }
    for (const marker of article.nativeMarkers[locale]) {
      if (!html.includes(marker)) failures.push(`/${locale}/${article.slug}/ missing native-market marker: ${marker}`);
    }
  }

  for (const absentLocale of locales.filter((locale) => !article.locales.includes(locale))) {
    if (existsSync(join(dist, absentLocale, article.slug, 'index.html'))) {
      failures.push(`/${absentLocale}/${article.slug}/ exists before native content is complete`);
    }
  }
}

const sitemap = read('sitemap-0.xml');
for (const article of editorialRoutes) {
  for (const locale of locales) {
    const url = `https://worthcalc.win/${locale}/${article.slug}/`;
    const inSitemap = sitemap.includes(`<loc>${url}</loc>`);
    if (isSoftDeindexedUrl(url) ? inSitemap : !inSitemap) {
      failures.push(isSoftDeindexedUrl(url) ? `Sitemap includes soft-deindexed ${url}` : `Sitemap missing ${url}`);
    }
  }
}
for (const article of partialEditorialRoutes) {
  for (const locale of article.locales) {
    const url = `https://worthcalc.win/${locale}/${article.slug}/`;
    const inSitemap = sitemap.includes(`<loc>${url}</loc>`);
    if (isSoftDeindexedUrl(url) ? inSitemap : !inSitemap) {
      failures.push(isSoftDeindexedUrl(url) ? `Sitemap includes soft-deindexed ${url}` : `Sitemap missing ${url}`);
    }
  }
}
for (const [locale, slug] of [
  ['en', 'costco-membership'],
  ['zh', 'costco-membership'],
  ['en', 'commute-cost'],
  ['zh', 'commute-cost'],
]) {
  const html = read(`${locale}/tools/${slug}/index.html`);
  for (const marker of ['class="direct-answer"', '<table', 'class="source-list"', 'class="last-verified"']) {
    if (html && !html.includes(marker)) failures.push(`/${locale}/tools/${slug}/ missing ${marker}`);
  }
}

if (failures.length) {
  console.error(`Multilingual editorial check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Multilingual editorial check passed: ${editorialRoutes.length} editorial topics x ${locales.length} built locales (en, zh), native-market markers, sources, last-verified, Article+BreadcrumbList schema, no retired hreflang; 4 enriched high-value tools. es/fr/de are retired and not checked.`);
