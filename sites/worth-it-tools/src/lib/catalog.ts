import { getCollection } from 'astro:content';
import { CORE_LOCALES, type ContentLocale, type CoreLocale } from '../consts';
import { guideIndex } from '../data/guideIndex';
import { homeContent } from './home';
import { findSlugSiblings, isReviewedSiblingPair } from './slugSiblings';
import { classifyTopic, type TopicId } from './topics';

/*
 * One place that answers "what does WorthCalc actually publish?".
 *
 * It exists because the answer used to be typed by hand in five languages.
 * /en/about/ said "we currently publish eight calculators" and /zh/about/ said
 * 「目前我們提供八個計算機」 while the site served eighteen; the Spanish, French
 * and German About pages each claimed "eight calculators and 29 decision
 * guides" against 17 calculators and ~196 guides. A number a human has to
 * remember to update is a number that will be wrong, and on a money site a
 * visibly stale self-description is a trust problem, not a typo.
 *
 * Everything here is derived from the data the pages themselves render from,
 * so a count cannot disagree with the catalogue.
 */

export interface CalculatorEntry {
  /** Path without the locale prefix, e.g. `/tools/rent-vs-buy`. */
  path: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  topic: TopicId;
}

/**
 * The calculators the homepage leads with, in order.
 *
 * Every slug here exists in all five core locales, so one list serves them all;
 * a locale that is missing one simply shows fewer cards rather than a dead link.
 */
export const FEATURED_CALCULATOR_PATHS: readonly string[] = [
  '/tools/costco-membership',
  '/tools/rent-vs-buy',
  '/tools/commute-cost',
  '/tools/installment-true-apr',
  '/tools/cashback-breakeven',
  '/tools/ev-vs-gas',
  '/tools/home-affordability',
  '/tools/dti-calculator',
  '/tools/subscription-audit',
  '/tools/compound-growth',
];

/** Every calculator published in a locale: hand-built core tools plus growth tools. */
export async function getCalculators(locale: CoreLocale): Promise<CalculatorEntry[]> {
  const core = homeContent[locale].tools.map((tool) => ({
    path: tool.path,
    slug: tool.path.split('/').filter(Boolean).at(-1) ?? '',
    title: tool.title,
    description: tool.description,
    icon: tool.icon,
    topic: classifyTopic(tool.path),
  }));

  const growth = (await getCollection('growthTools', ({ data }) => data.locale === locale && !data.draft)).map(
    (entry) => ({
      path: `/tools/${entry.data.toolSlug}`,
      slug: entry.data.toolSlug,
      title: entry.data.title,
      description: entry.data.description,
      icon: '📊',
      topic: classifyTopic(entry.data.toolSlug),
    }),
  );

  const seen = new Set<string>();
  return [...core, ...growth].filter((entry) => {
    if (seen.has(entry.path)) return false;
    seen.add(entry.path);
    return true;
  });
}

/** The homepage selection, in FEATURED_CALCULATOR_PATHS order, minus anything a locale lacks. */
export async function getFeaturedCalculators(locale: CoreLocale): Promise<CalculatorEntry[]> {
  const byPath = new Map((await getCalculators(locale)).map((entry) => [entry.path, entry]));
  return FEATURED_CALCULATOR_PATHS.map((path) => byPath.get(path)).filter(
    (entry): entry is CalculatorEntry => Boolean(entry),
  );
}

export function getCalculatorsByTopic(entries: CalculatorEntry[]): Map<TopicId, CalculatorEntry[]> {
  const grouped = new Map<TopicId, CalculatorEntry[]>();
  for (const entry of entries) {
    const bucket = grouped.get(entry.topic) ?? [];
    bucket.push(entry);
    grouped.set(entry.topic, bucket);
  }
  for (const bucket of grouped.values()) bucket.sort((a, b) => a.title.localeCompare(b.title));
  return grouped;
}

export interface GuideEntry {
  path: string;
  title: string;
  topic: TopicId;
}

/**
 * Every editorial page in a locale, from the generated index.
 *
 * The directory and hub routes are excluded: they are navigation over the
 * library, not entries in it, and listing them would make the guide directory
 * link to itself.
 */
const guideCache = new Map<ContentLocale, GuideEntry[]>();

export function getGuides(locale: ContentLocale): GuideEntry[] {
  const cached = guideCache.get(locale);
  if (cached) return cached;
  const entries = guideIndex[locale]
    // '/money/' is the brief hub, the same kind of navigation surface as
    // '/guides/' and the topic hubs. Individual briefs ('/money/<slug>/') stay
    // in the list: an extra inbound link from the guide directory is exactly
    // what a newly released brief wants.
    .filter((entry) => entry.path !== '/guides/' && entry.path !== '/money/' && !entry.path.startsWith('/topics/'))
    .map((entry) => ({ path: entry.path, title: entry.title, topic: classifyTopic(entry.path) }));
  // Every editorial page asks for this list to find its topic and its siblings,
  // so it is built once per locale rather than ~1,150 times per build.
  guideCache.set(locale, entries);
  return entries;
}

/**
 * Every page in this locale that shares the given path's slug.
 *
 * Generic and unfiltered: a slug match is evidence of a collision, not proof
 * that two pages answer the same question. Use this for auditing. Production
 * UI must use getReviewedSlugSiblings() instead — see src/lib/slugSiblings.ts
 * for why the two are separate.
 */
export function getSlugSiblings(locale: ContentLocale, path: string): GuideEntry[] {
  const entries = getGuides(locale);
  const siblingPaths = new Set(findSlugSiblings(entries.map((entry) => entry.path), path));
  return entries.filter((entry) => siblingPaths.has(entry.path));
}

/**
 * The subset of getSlugSiblings() a person has confirmed shares one search
 * intent. This is the only sibling list a reader is ever shown.
 */
export function getReviewedSlugSiblings(locale: ContentLocale, path: string): GuideEntry[] {
  return getSlugSiblings(locale, path).filter((entry) => isReviewedSiblingPair(path, entry.path));
}

export function getGuidesByTopic(entries: GuideEntry[]): Map<TopicId, GuideEntry[]> {
  const grouped = new Map<TopicId, GuideEntry[]>();
  for (const entry of entries) {
    const bucket = grouped.get(entry.topic) ?? [];
    bucket.push(entry);
    grouped.set(entry.topic, bucket);
  }
  return grouped;
}

export interface LibraryCounts {
  calculators: number;
  guides: number;
  languages: number;
}

/** Live counts for any page that wants to state the size of the library. */
export async function getLibraryCounts(locale: CoreLocale): Promise<LibraryCounts> {
  const calculators = await getCalculators(locale);
  return {
    calculators: calculators.length,
    guides: getGuides(locale).length,
    languages: CORE_LOCALES.length,
  };
}
