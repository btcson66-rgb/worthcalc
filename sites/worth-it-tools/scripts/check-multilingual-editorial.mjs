import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const locales = ['en', 'zh', 'es', 'fr', 'de'];
const hreflangs = ['en', 'zh-Hant', 'es', 'fr', 'de', 'x-default'];
const failures = [];
const editorialRoutes = [
  {
    slug: 'subscription-creep',
    nativeMarkers: {
      es: ['movimientos bancarios', 'permanencia', '12,99 €'],
      fr: ['relevés bancaires', 'préavis', '13,99 €'],
      de: ['Kontoauszug', 'Kündigungsfrist', '11,99 €'],
    },
  },
  {
    slug: 'zero-interest-installments-truth',
    nativeMarkers: {
      es: ['precio al contado', 'comisión de apertura', '5,63 %'],
      fr: ['prix comptant', 'frais de dossier', '5,63 %'],
      de: ['Barpreis', 'Rahmenkredit', '5,63 %'],
    },
  },
  {
    slug: 'upfront-fees-financing-cost',
    nativeMarkers: {
      en: ['net proceeds', 'origination fee', '$1,300'],
      zh: ['實際入帳', '總費用年百分率', 'NT$34,000'],
      es: ['comisión de apertura', '7.680 €', '12,21%'],
      fr: ['frais de dossier', '11 520 €', '8,10%'],
      de: ['Disagio', 'Restschuldversicherung', '14.400 €', '8,05%'],
    },
  },
  {
    slug: 'annual-fee-card-breakeven',
    nativeMarkers: {
      en: ['incremental reward rate', 'no-fee alternative', '$6,333.33'],
      zh: ['一般消費', '免年費替代卡', 'NT$150,000'],
      es: ['comisión de emisión', 'alternativa sin cuota', '6.000 €'],
      fr: ['document d’information tarifaire', 'carte sans cotisation', '5 400 €'],
      de: ['Preis- und Leistungsverzeichnis', 'kostenlosen Alternative', '9.600 €'],
    },
  },
  {
    slug: 'rent-vs-buy-guide',
    nativeMarkers: {
      en: ['Loan Estimate', '$148,779', 'holding period'],
      zh: ['實價登錄', 'NT$3,647,764', '寬限期'],
      es: ['FEIN', 'FiAE', '95.170 €'],
      fr: ['fonds travaux', 'TAEG', '117 962 €'],
      de: ['Kaltmiete', 'Zinsbindung', '198.880 €'],
    },
  },
];

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

    for (const hreflang of hreflangs) {
      if (!html.includes(`hreflang="${hreflang}"`)) {
        failures.push(`/${locale}/${article.slug}/ missing hreflang=${hreflang}`);
      }
    }

    for (const marker of ['class="direct-answer"', '<table', 'class="source-list"', 'class="last-verified"']) {
      if (!html.includes(marker)) failures.push(`/${locale}/${article.slug}/ missing ${marker}`);
    }

    for (const schemaType of ['Article', 'FAQPage', 'BreadcrumbList']) {
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

const sitemap = read('sitemap-0.xml');
for (const article of editorialRoutes) {
  for (const locale of locales) {
    const url = `https://worthcalc.win/${locale}/${article.slug}/`;
    if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`Sitemap missing ${url}`);
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

console.log('Multilingual editorial check passed: 5 complete five-locale topics, 17 added routes, 4 enriched high-value tools.');
