import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, '..');

const checks = [
  {
    locale: 'en',
    source: path.join(siteRoot, 'src/pages/en/tools/commute-cost.astro'),
    links: ['/en/guides/remote-work-pay-cut-cash-break-even/'],
  },
  {
    locale: 'zh',
    source: path.join(siteRoot, 'src/pages/zh/tools/commute-cost.astro'),
    links: [
      '/zh/guides/remote-work-pay-cut-cash-break-even/',
      '/zh/guides/transit-pass-vs-pay-as-you-go-usage-break-even/',
    ],
  },
];

for (const check of checks) {
  const source = fs.readFileSync(check.source, 'utf8');
  for (const href of check.links) {
    const occurrences = source.split(href).length - 1;
    assert.equal(
      occurrences,
      1,
      `${check.locale} commute recommendation ${href} must render exactly once in source (found ${occurrences})`,
    );
  }

  const built = path.join(siteRoot, `dist/${check.locale}/tools/commute-cost/index.html`);
  if (fs.existsSync(built)) {
    const html = fs.readFileSync(built, 'utf8');
    for (const href of check.links) {
      const occurrences = html.split(href).length - 1;
      assert.equal(
        occurrences,
        1,
        `${check.locale} commute recommendation ${href} must render exactly once in build (found ${occurrences})`,
      );
    }
  }
}

console.log('[commute-regression] PASS: contextual recommendation links render once per intended locale/page.');
