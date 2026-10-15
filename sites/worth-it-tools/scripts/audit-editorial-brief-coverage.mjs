import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const dist = resolve('dist');
// 2026-10-15 rebuild: es, fr and de are retired (no routes), so a topic is "complete"
// when both built locales (en, zh) carry it with every required marker, not all five.
// The release floors below were five-locale counts. home (6 -> 2), legal (30 -> 12) and the
// per-variant counts (145 -> 58) are re-based to en + zh; html, tool and editorial keep their
// original floors because the built output still clears them.
// P1b (2026-10-15) removed or merged five of the 29 brief topics (cost-per-use-expensive-item,
// bulk-buying-vs-small-packages, meal-prep-vs-takeout-cost, reusable-vs-disposable-break-even,
// price-per-wear-clothing-shoes) and five calculators (cashback-breakeven, cost-per-mile, ev-vs-gas,
// latte-factor, rent-vs-buy), so the floors drop with them: tool 40 -> 32 (3 calculators x en + zh, plus the
// zh pages of cashback-breakeven and ev-vs-gas that the CEO's P1b verdict kept as real calculator pages),
// topics 29 -> 24 and variants 58 -> 48 (24 topics x en + zh). Measured after P1b: 32 tool pages,
// 48/48 variants aligned and compliant, 24/24 complete topics. Redirect stubs are counted in their own
// class so they cannot satisfy the tool or editorial floors.
const locales = ['en', 'zh'];
const requiredMarkers = [
  'class="direct-answer"',
  'class="formula"',
  '<table',
  'class="guide-cta"',
  'class="source-list"',
  'class="last-verified"',
];

const briefRoutes = [
  { id: '01', slug: 'zero-interest-installments-truth' },
  { id: '02', slug: 'upfront-fees-financing-cost' },
  { id: '03', slug: 'bnpl-vs-credit-card-installments' },
  { id: '04', slug: 'monthly-vs-annual-subscription' },
  { id: '05', slug: 'subscription-creep' },
  { id: '06', slug: 'paid-membership-break-even' },
  { id: '07', slug: 'gym-membership-cost-per-visit' },
  { id: '08', slug: 'delivery-membership-break-even' },
  { id: '09', slug: 'annual-fee-card-breakeven' },
  { id: '10', slug: 'cashback-caps-real-reward-rate' },
  { id: '11', slug: 'rent-vs-buy-guide' },
  { id: '12', slug: 'rent-vs-buy-breakeven-year' },
  { id: '13', slug: 'ev-vs-gas-total-cost' },
  { id: '14', slug: 'home-vs-public-ev-charging-cost' },
  { id: '15', slug: 'new-vs-used-car-total-cost' },
  { id: '16', slug: 'car-lease-vs-buy-total-cost' },
  { id: '17', slug: 'full-commute-cost-including-time' },
  { id: '18', slug: 'work-from-home-vs-commuting-hidden-costs' },
  { id: '19', slug: 'repair-or-replace-decision-formula' },
  { id: '20', slug: 'is-an-extended-warranty-worth-it' },
  { id: '21', slug: 'upgrade-your-phone-or-keep-it' },
  { id: '22', slug: 'energy-efficient-appliance-payback' },
  { id: '28', slug: 'true-hourly-wage-after-commuting-work-expenses' },
  { id: '29', slug: 'pay-raise-vs-inflation-purchasing-power' },
];

const releaseFloor = {
  html: 237,
  home: 2,
  legal: 12,
  tool: 32,
  editorial: 160,
  alignedVariants: 48,
  compliantVariants: 48,
  completeTopics: 24,
};

function walkHtml(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) files.push(...walkHtml(full));
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

function sitePath(file) {
  const value = relative(dist, file).split(sep).join('/');
  return value === 'index.html' ? '/' : `/${value.replace(/index\.html$/, '')}`;
}

const htmlFiles = walkHtml(dist);
const paths = htmlFiles.map(sitePath);
const legalSlugs = new Set(['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog']);
const counts = { error: 0, stub: 0, home: 0, legal: 0, tool: 0, editorial: 0 };
// A redirect stub (a merged page, or /zh/) stands where a page used to be. It is not a page
// anyone reads, so it must not count towards the tool or editorial floors below.
const isRedirectStub = (file) => {
  const html = readFileSync(file, 'utf8');
  return /<meta http-equiv="refresh"/i.test(html) && /<meta name="robots" content="noindex/i.test(html);
};

for (const [index, path] of paths.entries()) {
  if (path === '/404.html') counts.error += 1;
  else if (isRedirectStub(htmlFiles[index])) counts.stub += 1;
  else if (path === '/' || /^\/(?:en|zh)\/$/.test(path)) counts.home += 1;
  else if (/^\/(?:en|zh)\/tools\//.test(path)) counts.tool += 1;
  else if (legalSlugs.has(path.split('/').filter(Boolean).at(-1))) counts.legal += 1;
  else counts.editorial += 1;
}

let alignedVariants = 0;
let compliantVariants = 0;
const topicRows = [];

for (const topic of briefRoutes) {
  let present = 0;
  let compliant = 0;
  for (const locale of locales) {
    const file = join(dist, locale, topic.slug, 'index.html');
    if (!existsSync(file)) continue;
    present += 1;
    const html = readFileSync(file, 'utf8');
    if (requiredMarkers.every((marker) => html.includes(marker))) compliant += 1;
  }
  alignedVariants += present;
  compliantVariants += compliant;
  topicRows.push({ id: topic.id, route: topic.slug, present, compliant });
}

const completeTopics = topicRows.filter((topic) => topic.present === locales.length && topic.compliant === locales.length).length;

console.log('WorthCalc editorial brief coverage');
console.log(`- Total built HTML: ${htmlFiles.length}`);
console.log(`- Page classes: ${JSON.stringify(counts)}`);
console.log(`- Task-aligned article variants: ${alignedVariants}/${locales.length * briefRoutes.length}`);
console.log(`- Fully brief-compliant variants: ${compliantVariants}/${locales.length * briefRoutes.length}`);
console.log(`- Complete two-language (en + zh) topics: ${completeTopics}/${briefRoutes.length}`);
for (const topic of topicRows) {
  console.log(`  #${topic.id} ${topic.route}: ${topic.present}/${locales.length} present, ${topic.compliant}/${locales.length} fully structured`);
}

const classifiedPages = Object.values(counts).reduce((sum, count) => sum + count, 0);
const regressed =
  classifiedPages !== htmlFiles.length ||
  htmlFiles.length < releaseFloor.html ||
  counts.home < releaseFloor.home ||
  counts.legal < releaseFloor.legal ||
  counts.tool < releaseFloor.tool ||
  counts.editorial < releaseFloor.editorial ||
  alignedVariants < releaseFloor.alignedVariants ||
  compliantVariants < releaseFloor.compliantVariants ||
  completeTopics < releaseFloor.completeTopics;

if (regressed) {
  console.error('Editorial coverage regressed below the audited release floor.');
  process.exit(1);
}
