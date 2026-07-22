import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('src/content');
const locales = ['en', 'zh', 'es', 'fr', 'de'];
const pairs = {
  'mortgage-payoff': 'extra-mortgage-payments-guide',
  'credit-card-payoff': 'credit-card-minimum-payment-trap',
  'budget-builder': 'budget-with-irregular-income',
  'debt-strategy': 'snowball-vs-avalanche',
  'car-affordability': 'true-cost-of-car-ownership',
  'salary-converter': 'hourly-vs-annual-salary',
  'dti-calculator': 'how-to-calculate-dti',
  'home-affordability': 'how-much-home-can-you-afford',
  'inflation-purchasing-power': 'nominal-vs-real-purchasing-power',
  'compound-growth': 'how-compound-growth-works',
};
const banned = [/lorem ipsum/i, /(^|\s)TODO(?:\s|:|$)/m, /guaranteed approval/i, /guaranteed return/i, /一定核貸/, /保證獲利/];
const leakedEnglish = [/For this topic, the core relationship is/i, /Recommended scenarios:/i, /^Official sources for editorial verification/im, /^Use the calculator$/im, /^Editorial limits$/im];
const failures = [];

for (const locale of locales) {
  for (const [tool, article] of Object.entries(pairs)) {
    const files = [
      { kind: 'tool', slug: tool, file: join(root, 'growth-tools', locale, `${tool}.md`), link: `/${locale}/${article}/` },
      { kind: 'article', slug: article, file: join(root, 'growth-articles', locale, `${article}.md`), link: `/${locale}/tools/${tool}/` },
    ];
    for (const item of files) {
      if (!existsSync(item.file)) { failures.push(`Missing ${item.file}`); continue; }
      const text = readFileSync(item.file, 'utf8');
      if (!text.includes(`locale: ${locale}`)) failures.push(`Wrong locale: ${item.file}`);
      if (!text.includes('lastReviewed: 2026-07-23')) failures.push(`Missing review date: ${item.file}`);
      if (!text.includes('https://')) failures.push(`Missing official source URL: ${item.file}`);
      if (!text.includes(item.link)) failures.push(`Missing reciprocal link ${item.link}: ${item.file}`);
      if ((text.match(/^# /gm) ?? []).length !== 0) failures.push(`Content body must not add a second H1: ${item.file}`);
      const minimum = item.kind === 'article' ? (locale === 'zh' ? 2000 : 5400) : (locale === 'zh' ? 1300 : 3500);
      if (text.length < minimum) failures.push(`Content too thin (${text.length}): ${item.file}`);
      for (const pattern of banned) if (pattern.test(text)) failures.push(`Banned claim ${pattern}: ${item.file}`);
      if (locale !== 'en') for (const pattern of leakedEnglish) if (pattern.test(text)) failures.push(`English boilerplate leaked into ${locale}: ${item.file}`);
      if (tool === 'inflation-purchasing-power') {
        for (const gate of ['draft: true', 'noindex: true', 'publicationGate: OFFICIAL_CPI_DATA_REQUIRED']) if (!text.includes(gate)) failures.push(`Inflation gate missing ${gate}: ${item.file}`);
      } else if (!text.includes('draft: false')) failures.push(`Publishable content is not explicitly approved: ${item.file}`);
    }
  }
}

if (failures.length) {
  console.error(`Growth content check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Growth content check passed: 50 localized tool drafts + 50 companion articles; 5 inflation pairs remain explicitly gated.');
