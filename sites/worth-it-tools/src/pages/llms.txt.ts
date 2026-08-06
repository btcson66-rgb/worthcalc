import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, CORE_LOCALES, LOCALE_HREFLANG } from '../consts';
import { homeContent } from '../lib/home';
import { guideIndex } from '../data/guideIndex';

export const prerender = true;

/*
 * llms.txt used to be a hand-maintained file in public/. It listed 18 tools and
 * three guides while the site had 49 English guides, so anything reading it saw
 * a fraction of the site and no way to tell what it was missing. That is the same
 * drift that left 106 pages with no internal link: a list a human has to remember
 * to update is a list that goes stale.
 *
 * It is generated from the same data the pages render from now, so it cannot
 * disagree with them.
 */
const LOCALE_LABEL: Record<string, string> = {
  en: 'English (default, canonical)',
  zh: '繁體中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export const GET = async ({ site }: APIContext): Promise<Response> => {
  const origin = (site?.origin ?? SITE.url).replace(/\/$/, '');
  const url = (path: string) => `${origin}${path}`;
  const en = homeContent.en;

  const growthTools = (await getCollection('growthTools', ({ data }) => data.locale === 'en' && !data.draft))
    .sort((left, right) => left.data.title.localeCompare(right.data.title, 'en'));

  const lines: string[] = [
    `# ${SITE.name} (worthcalc.win)`,
    '',
    `> ${SITE.name} is a free set of browser-based "is it actually worth it?" calculators for`,
    '> real money decisions: membership break-evens, rent vs buy, EV vs gas, commute cost,',
    '> subscriptions, installment APR, debt payoff, salary conversion and budgeting.',
    '> No account and no backend; every calculation runs client-side in the browser.',
    '',
    '- Every calculator is free and needs no sign-up. Inputs and results stay in the browser; nothing is uploaded.',
    '- Figures shown in worked examples are editable defaults for illustration, not quoted market rates.',
    '- Each calculator page states its formula, its assumptions and what it deliberately excludes.',
  ];

  for (const locale of CORE_LOCALES) {
    const path = locale === 'en' ? '/' : `/${locale}/`;
    lines.push(`- ${LOCALE_LABEL[locale] ?? LOCALE_HREFLANG[locale]}: ${url(path)}`);
  }

  lines.push('', '## Calculators', '');
  for (const tool of en.tools) {
    lines.push(`- [${tool.title}](${url(`/en${tool.path}/`)}): ${tool.description}`);
  }
  for (const entry of growthTools) {
    lines.push(`- [${entry.data.title}](${url(`/en/tools/${entry.data.toolSlug}/`)}): ${entry.data.description}`);
  }

  lines.push('', '## Guides', '');
  for (const guide of guideIndex.en) {
    lines.push(`- [${guide.title}](${url(`/en${guide.path}`)})`);
  }

  lines.push(
    '',
    '## Other languages',
    '',
    'Traditional Chinese covers the same catalogue written for the Taiwan market, not translated:',
    `${url('/zh/')}. Spanish, French and German exist for a subset of topics and are frozen —`,
    'no new routes are being added to them.',
    '',
    '## Site index',
    '',
    `- Sitemap: ${url('/sitemap-index.xml')}`,
    `- Every guide, linked in full: ${url('/')}`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
