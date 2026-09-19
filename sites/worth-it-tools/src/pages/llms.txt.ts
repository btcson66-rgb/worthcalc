import type { APIContext } from 'astro';
import { SITE, CORE_LOCALES, LOCALE_HREFLANG } from '../consts';
import { getCollection } from 'astro:content';
import { getCalculators, getGuides } from '../lib/catalog';
import { isPublished, publishCutoff } from '../lib/publication';
import { TOPIC_IDS, topicCopy, topicPath } from '../lib/topics';

export const prerender = true;

/*
 * llms.txt used to be a hand-maintained file in public/. It listed 18 tools and
 * three guides while the site had 49 English guides, so anything reading it saw
 * a fraction of the site and no way to tell what it was missing. That is the same
 * drift that left 106 pages with no internal link: a list a human has to remember
 * to update is a list that goes stale.
 *
 * It is generated from the same catalogue the pages render from now, so it
 * cannot disagree with them, and it leads with the topic hubs so an assistant
 * reading it sees the site's structure before its 1,200 URLs.
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
  const calculators = (await getCalculators('en')).sort((left, right) => left.title.localeCompare(right.title, 'en'));
  const guides = getGuides('en');
  // Read from the collection rather than from getGuides(): guideIndex.ts is
  // generated from a previous build and committed, so a brief released by the
  // nightly rebuild would be missing from this file until someone regenerated
  // it. This is the file answer engines read to find out what the site holds,
  // and a stale list here is worse than a stale list anywhere else on the site.
  const briefCutoff = publishCutoff();
  const briefs = (await getCollection('moneyBriefs', ({ data }) => !data.draft))
    .filter((entry) => entry.data.locale === 'en' && isPublished(entry.data.publishAt, briefCutoff))
    .sort((left, right) => right.data.publishAt.localeCompare(left.data.publishAt));

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

  lines.push('', '## Topics', '');
  lines.push(`Every page belongs to one of six decision topics. Each hub lists the calculators and guides for it.`, '');
  for (const topic of TOPIC_IDS) {
    lines.push(`- [${topicCopy.en[topic].name}](${url(`/en${topicPath(topic)}/`)}): ${topicCopy.en[topic].blurb}`);
  }

  lines.push('', '## Calculators', '');
  lines.push(`- Directory, grouped by topic: ${url('/en/tools/')}`, '');
  for (const tool of calculators) {
    lines.push(`- [${tool.title}](${url(`/en${tool.path}/`)}): ${tool.description}`);
  }

  lines.push('', '## Guides', '');
  lines.push(`- Directory, grouped by topic: ${url('/en/guides/')}`, '');
  for (const guide of guides) {
    lines.push(`- [${guide.title}](${url(`/en${guide.path}`)})`);
  }

  if (briefs.length > 0) {
    lines.push('', '## Money briefs (dated reference figures)', '');
    lines.push(
      `- Hub: ${url('/en/money/')}`,
      '',
      'Each brief states one figure from a named primary source with the date it was',
      'verified, then applies it to the arithmetic that turns it into a decision. Unlike',
      'the guides above, these carry figures that move; every entry below shows the date',
      'that figure was last checked, and a brief is re-verified rather than left standing.',
      '',
    );
    for (const brief of briefs) {
      const checked = brief.data.lastReviewed.toISOString().slice(0, 10);
      lines.push(`- [${brief.data.title}](${url(`/en/money/${brief.data.briefSlug}/`)}) — checked ${checked}. ${brief.data.answer}`);
    }
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
    `- Every calculator, grouped by topic: ${url('/en/tools/')}`,
    `- Every guide, grouped by topic: ${url('/en/guides/')}`,
    `- Dated reference figures, newest first: ${url('/en/money/')}`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
