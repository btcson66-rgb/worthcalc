import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');

test('TASK10 WorthCalc registry keeps stable IDs and current checkout references', () => {
  const registry = read('src/data/paid-products.ts');
  for (const [id, payhipId, gumroadId] of [
    ['PRODUCT-003', 'tVdur', 'spgrvp'],
    ['PRODUCT-005', 'NDfro', 'xbsnpk'],
  ]) {
    assert.match(registry, new RegExp(`'${id}':`));
    assert.match(registry, new RegExp(`link=${payhipId}`));
    assert.match(registry, new RegExp(`product=${gumroadId}`));
    assert.match(registry, /price: 'US\$19'/);
  }
});

test('TASK10 WorthCalc owned pages contain SEO, provider buttons, and unified events', () => {
  for (const page of [
    'en/freelancer-pricing-decision-engine/index.html',
    'zh/freelancer-pricing-decision-engine/index.html',
    'en/job-offer-true-value-decision-engine/index.html',
    'zh/job-offer-true-value-decision-engine/index.html',
  ]) {
    const html = read(`dist/${page}`);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /robots/);
    assert.match(html, /SoftwareApplication/);
    assert.match(html, /Offer/);
    assert.match(html, /19\.00/);
    assert.match(html, /payhip\.com\/buy\?s=1(?:&amp;|&)link=/);
    assert.match(html, /gumroad\.com\/checkout\?product=/);
    for (const event of ['product_cta_view', 'product_cta_click', 'product_checkout_click']) assert.match(html, new RegExp(event));
  }
});

test('TASK10 WorthCalc contextual placements stay within the intended high-intent set', () => {
  const p3Pages = [
    'en/guides/freelance-minimum-billable-rate/index.html',
    'zh/guides/freelance-minimum-billable-rate/index.html',
    'en/price-in-work-hours/index.html',
    'zh/price-in-work-hours/index.html',
    'en/tools/salary-converter/index.html',
    'zh/tools/salary-converter/index.html',
  ];
  const p5Pages = [
    'en/guides/benefits-replacement-cost-vs-salary/index.html',
    'en/guides/relocation-higher-salary-break-even/index.html',
    'en/guides/cash-runway-before-quitting-job/index.html',
    'zh/guides/higher-salary-long-commute-vs-lower-salary-nearby/index.html',
    'en/price-in-work-hours/index.html',
    'zh/price-in-work-hours/index.html',
    'en/true-hourly-wage-after-commuting-work-expenses/index.html',
    'zh/true-hourly-wage-after-commuting-work-expenses/index.html',
  ];
  for (const page of p3Pages) assert.match(read(`dist/${page}`), /PRODUCT-003/);
  for (const page of p5Pages) assert.match(read(`dist/${page}`), /PRODUCT-005/);
  assert.doesNotMatch(read('src/components/PaidProductPanel.astro'), /affiliateAnalytics|affiliate_click/);
});
