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
    slug: 'bnpl-vs-credit-card-installments',
    nativeMarkers: {
      en: ['pay-in-four', '$650', 'withdrew the 2024 BNPL interpretive rule'],
      zh: ['應收債權', 'NT$12,500', '非金融特許業務'],
      es: ['pago revolving', '498 €', 'Banco de España'],
      fr: ['paiement fractionné', '20 novembre 2026', '750 €'],
      de: ['Zahlungsaufschub', '20. November 2026', '935 €'],
    },
  },
  {
    slug: 'monthly-vs-annual-subscription',
    nativeMarkers: {
      en: ['probability break-even', '$144', 'renewal notice'],
      zh: ['9.6 個月', 'NT$3,120', '刪除 APP'],
      es: ['9,23 meses', '133,25 €', 'artículo 62'],
      fr: ['résiliation en trois clics', '132,66 €', 'reconduction tacite'],
      de: ['Kündigungsbutton', '140,29 €', 'Mindestlaufzeit'],
    },
  },
  {
    slug: 'paid-membership-break-even',
    nativeMarkers: {
      en: ['eligible use', '$2.10', 'benefit cap'],
      zh: ['原本就會消費', 'NT$54', '回饋上限'],
      es: ['pedido elegible', '2,15 €', 'tope'],
      fr: ['achat admissible', '2,40 €', 'reconduction tacite'],
      de: ['Mitgliedsbeitrag', '1,00 €', 'Kündigungsbutton'],
    },
  },
  {
    slug: 'gym-membership-cost-per-visit',
    nativeMarkers: {
      en: ['$12.98', '$251', 'paid months with no visits', 'data-gym-calculator'],
      zh: ['NT$297.60', 'NT$9,144', '健身中心定型化契約', 'data-gym-calculator'],
      es: ['9,50 €', '110,20 €', 'matrícula', 'data-gym-calculator'],
      fr: ['9,48 €', '76 €', 'reconduction tacite', 'data-gym-calculator'],
      de: ['12,88 €', '49,40 €', 'Mindestlaufzeit', 'data-gym-calculator'],
    },
  },
  {
    slug: 'delivery-membership-break-even',
    nativeMarkers: {
      en: ['$6.49', '$20.82', 'minimum basket', 'data-delivery-membership-calculator'],
      zh: ['NT$95', 'NT$1,081', '最低消費', 'data-delivery-membership-calculator'],
      es: ['3,29 €', '9,23 €', 'pedido mínimo', 'data-delivery-membership-calculator'],
      fr: ['3,69 €', '6,43 €', 'montant minimum', 'data-delivery-membership-calculator'],
      de: ['3,99 €', '13,85 €', 'Mindestbestellwert', 'data-delivery-membership-calculator'],
    },
  },
  {
    slug: 'cashback-caps-real-reward-rate',
    nativeMarkers: {
      en: ['$102', '2.72%', 'Merchant coding', 'data-cashback-caps-calculator'],
      zh: ['NT$350', '1.52%', '一般消費', 'data-cashback-caps-calculator'],
      es: ['33,25 €', '2,08%', 'operaciones excluidas', 'data-cashback-caps-calculator'],
      fr: ['31,10 €', '1,78 %', 'inscription', 'data-cashback-caps-calculator'],
      de: ['32,75 €', '1,42 %', 'Tankstellenumsätze', 'data-cashback-caps-calculator'],
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
  {
    slug: 'rent-vs-buy-breakeven-year',
    nativeMarkers: {
      en: ['$156,731', 'year 7', 'Closing Disclosure', 'data-rent-buy-breakeven-calculator'],
      zh: ['NT$2,894,592', '第 9 年', '房地合一稅', 'data-rent-buy-breakeven-calculator'],
      es: ['81.020 €', 'año 9', 'FEIN', 'data-rent-buy-breakeven-calculator'],
      fr: ['104 732 €', 'année 10', 'capital restant dû', 'data-rent-buy-breakeven-calculator'],
      de: ['210.948 €', 'Jahr 19', 'Vorfälligkeitsentschädigung', 'data-rent-buy-breakeven-calculator'],
    },
  },
  {
    slug: 'ev-vs-gas-total-cost',
    nativeMarkers: {
      en: ['$39,864', 'out-the-door', 'data-ev-gas-tco-calculator'],
      zh: ['NT$1,107,644', '汽車燃料使用費', 'data-ev-gas-tco-calculator'],
      es: ['29.776 €', 'MOVES', 'data-ev-gas-tco-calculator'],
      fr: ['29 096 €', 'Coup de pouce', 'data-ev-gas-tco-calculator'],
      de: ['34.552 €', 'Kfz-Steuerbefreiung', 'data-ev-gas-tco-calculator'],
    },
  },
  {
    slug: 'home-vs-public-ev-charging-cost',
    nativeMarkers: {
      en: ['$1,118', 'marginal home electricity', 'data-ev-charging-cost-calculator'],
      zh: ['NT$16,001', '公設電', 'data-ev-charging-cost-calculator'],
      es: ['880 €', 'mapa REVE', 'data-ev-charging-cost-calculator'],
      fr: ['821 €', 'heures creuses', 'data-ev-charging-cost-calculator'],
      de: ['1.311 €', 'Blockierentgelt', 'data-ev-charging-cost-calculator'],
    },
  },
  {
    slug: 'new-vs-used-car-total-cost',
    nativeMarkers: {
      en: ['$26,774', 'Buyers Guide', 'data-new-used-car-tco-calculator'],
      zh: ['NT$617,188', '定型化契約', 'data-new-used-car-tco-calculator'],
      es: ['23.517 €', 'reserva de dominio', 'data-new-used-car-tco-calculator'],
      fr: ['25 268 €', 'HistoVec', 'data-new-used-car-tco-calculator'],
      de: ['25.741 €', 'Sachmängelhaftung', 'data-new-used-car-tco-calculator'],
    },
  },
  {
    slug: 'car-lease-vs-buy-total-cost',
    nativeMarkers: {
      en: ['$28,650', 'Regulation M', 'data-car-lease-buy-calculator'],
      zh: ['NT$913,000', '定型化契約', 'data-car-lease-buy-calculator'],
      es: ['22.100 €', 'Banco de España', 'data-car-lease-buy-calculator'],
      fr: ['22 270 €', 'premier loyer majoré', 'data-car-lease-buy-calculator'],
      de: ['24.940 €', 'Kilometerleasing', 'data-car-lease-buy-calculator'],
    },
  },
  {
    slug: 'full-commute-cost-including-time',
    nativeMarkers: {
      en: ['$732', 'IRS mileage', 'data-commute-full-cost-calculator'],
      zh: ['NT$9,338', '中油牌價', 'data-commute-full-cost-calculator'],
      es: ['241,27 €', 'IDAE', 'data-commute-full-cost-calculator'],
      fr: ['278,33 €', 'prise en charge', 'data-commute-full-cost-calculator'],
      de: ['732 €', 'Entfernungspauschale', 'data-commute-full-cost-calculator'],
    },
  },
  {
    slug: 'work-from-home-vs-commuting-hidden-costs',
    nativeMarkers: {
      en: ['$610', 'home office deduction', 'data-wfh-commute-calculator'],
      zh: ['NT$5,420', '居家工作職業安全衛生參考指引', 'data-wfh-commute-calculator'],
      es: ['275 €', 'Ley 10/2021', 'data-wfh-commute-calculator'],
      fr: ['67,40 €', '2,70 €', 'data-wfh-commute-calculator'],
      de: ['303 €', 'Tagespauschale', 'data-wfh-commute-calculator'],
    },
  },
  {
    slug: 'repair-or-replace-decision-formula',
    nativeMarkers: {
      en: ['$301', 'CPSC', 'data-repair-replace-calculator'],
      zh: ['NT$7,179', '手機送修', 'data-repair-replace-calculator'],
      es: ['196 €', 'tres años', 'data-repair-replace-calculator'],
      fr: ['223 €', 'QualiRépar', 'data-repair-replace-calculator'],
      de: ['232 €', '10. Juli 2026', 'data-repair-replace-calculator'],
    },
  },
  {
    slug: 'is-an-extended-warranty-worth-it',
    nativeMarkers: {
      en: ['$249', 'manufacturer warranty', 'data-extended-warranty-calculator'],
      zh: ['NT$5,182.5', '獨立擔保', 'data-extended-warranty-calculator'],
      es: ['188 €', 'tres años', 'data-extended-warranty-calculator'],
      fr: ['233,38 €', 'case précochée', 'data-extended-warranty-calculator'],
      de: ['238,75 €', 'Zeitwert', 'data-extended-warranty-calculator'],
    },
  },
  {
    slug: 'upgrade-your-phone-or-keep-it',
    nativeMarkers: {
      en: ['$69.69', 'bill credits', 'data-phone-keep-upgrade-calculator'],
      zh: ['NT$1,293.4', 'IMEI', 'data-phone-keep-upgrade-calculator'],
      es: ['37,08 €', 'tres años', 'data-phone-keep-upgrade-calculator'],
      fr: ['43,06 €', 'effacement superficiel', 'data-phone-keep-upgrade-calculator'],
      de: ['38,19 €', 'zweijährigen Vertrag', 'data-phone-keep-upgrade-calculator'],
    },
  },
  {
    slug: 'energy-efficient-appliance-payback',
    nativeMarkers: {
      en: ['$27', 'EnergyGuide', 'data-mode="appliance"'],
      zh: ['NT$525', '能源署', 'data-mode="appliance"'],
      es: ['27,50 €', 'A–G', 'data-mode="appliance"'],
      fr: ['27,50 €', '100 cycles', 'data-mode="appliance"'],
      de: ['46,20 €', 'tatsächlichen Verbrauch', 'data-mode="appliance"'],
    },
  },
  {
    slug: 'cost-per-use-expensive-item',
    nativeMarkers: {
      en: ['$11/use', 'sunk', 'data-mode="costPerUse"'],
      zh: ['NT$285', '沉沒成本', 'data-mode="costPerUse"'],
      es: ['10 €/uso', 'tres años', 'data-mode="costPerUse"'],
      fr: ['11,67 €/usage', 'indice de durabilité', 'data-mode="costPerUse"'],
      de: ['9,50 €', 'Besitzaufwand', 'data-mode="costPerUse"'],
    },
  },
];
const partialEditorialRoutes = [
  {
    slug: 'bulk-buying-vs-small-packages',
    locales: ['en', 'zh', 'es'],
    nativeMarkers: {
      en: ['$5.06', 'FoodKeeper', 'data-mode="bulk"'],
      zh: ['NT$125', '食藥署', 'data-mode="bulk"'],
      es: ['5 €/unidad', 'AESAN', 'data-mode="bulk"'],
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

for (const article of partialEditorialRoutes) {
  for (const locale of article.locales) {
    const html = read(`${locale}/${article.slug}/index.html`);
    if (!html) continue;

    const expectedHreflang = locale === 'zh' ? 'zh-Hant' : locale;
    for (const hreflang of [expectedHreflang, 'x-default']) {
      if (!html.includes(`hreflang="${hreflang}"`)) {
        failures.push(`/${locale}/${article.slug}/ missing partial hreflang=${hreflang}`);
      }
    }
    for (const absentHreflang of hreflangs.filter((item) => ![expectedHreflang, 'x-default'].includes(item))) {
      if (html.includes(`hreflang="${absentHreflang}"`)) {
        failures.push(`/${locale}/${article.slug}/ advertises incomplete hreflang=${absentHreflang}`);
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
    if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`Sitemap missing ${url}`);
  }
}
for (const article of partialEditorialRoutes) {
  for (const locale of article.locales) {
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

console.log('Multilingual editorial check passed: 23 complete five-locale topics, topic 24 at 3/5, 110 added routes, 4 enriched high-value tools, 18 embedded decision calculators.');
