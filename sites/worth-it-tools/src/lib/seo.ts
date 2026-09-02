import { CONTENT_LOCALES, CORE_LOCALES, SITE, LOCALE_HREFLANG, type ContentLocale } from '../consts';
import deindexedRegistry from '../data/deindexed-urls.json';

const DEINDEXED_PATHS = new Set(deindexedRegistry.urls.map((url) => new URL(url).pathname));

export interface SeoInput {
  /** Page title without the brand suffix. */
  title: string;
  /** Optional exact title for editorial packages whose title already includes the brand. */
  titleOverride?: string;
  /** Meta description (~50–160 chars recommended). */
  description: string;
  /** Optional social metadata overrides. */
  ogTitle?: string;
  ogDescription?: string;
  /** Optional exact robots value supplied by an editorial package. */
  robots?: string;
  /** Optional accessible description for the social share image. */
  imageAlt?: string;
  /** Active locale of the page. */
  locale: ContentLocale;
  /** The current page URL (pass `Astro.url`). */
  url: URL;
  /** The deployed site origin (pass `Astro.site`). Falls back to SITE.url. */
  site?: URL;
  /** Optional social share image path or absolute URL. */
  image?: string;
  /** Open Graph type. */
  type?: 'website' | 'article';
  /** When true, emit a noindex robots directive. */
  noindex?: boolean;
  /** Locales that have an equivalent page. Defaults to complete site locales. */
  alternateLocales?: ContentLocale[];
}

export interface ResolvedSeo {
  fullTitle: string;
  description: string;
  canonical: string;
  ogImage: string;
  type: 'website' | 'article';
  locale: ContentLocale;
  htmlLang: string;
  robots: string;
  /** hreflang alternates for every locale + x-default. */
  alternates: { hreflang: string; href: string }[];
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
}

function origin(input: SeoInput): string {
  const base = input.site?.origin ?? SITE.url;
  return base.replace(/\/$/, '');
}

function absolute(base: string, path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

function pagePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/** True for a URL in the reversible W34 soft-deindex registry. */
export function isSoftDeindexed(pathname: string): boolean {
  return DEINDEXED_PATHS.has(pagePath(pathname));
}

function localizedPagePath(locale: ContentLocale, logical: string): string {
  if (!logical && locale === 'en') return '/';
  return logical ? `/${locale}/${logical}/` : `/${locale}/`;
}

/** Resolve raw SEO input into everything the <head> needs. */
export function resolveSeo(input: SeoInput): ResolvedSeo {
  const base = origin(input);
  const fullTitle = input.titleOverride ?? (input.title ? `${input.title} | ${SITE.name}` : SITE.name);
  const currentPath = pagePath(input.url.pathname);
  const canonicalPath = input.locale === 'en' && currentPath === '/en/' ? '/' : currentPath;
  const canonical = absolute(base, canonicalPath);
  const ogImage = absolute(base, input.image ?? SITE.defaultOgImage);
  const type = input.type ?? 'website';
  const softDeindexed = isSoftDeindexed(currentPath);
  const robots = softDeindexed
    ? 'noindex,follow'
    : input.robots ?? (input.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large');

  // hreflang alternates: swap the locale segment of the current path.
  const segments = input.url.pathname.split('/').filter(Boolean);
  if ((CONTENT_LOCALES as string[]).includes(segments[0])) segments.shift();
  const logical = segments.join('/');
  const alternateLocales = input.alternateLocales ?? [...CORE_LOCALES];
  const xDefaultLocale = alternateLocales.includes('en') ? 'en' : (alternateLocales[0] ?? input.locale);
  const alternates = alternateLocales
    .map((loc) => ({
      locale: loc,
      hreflang: LOCALE_HREFLANG[loc],
      href: absolute(base, localizedPagePath(loc, logical)),
    }))
    // Sibling locales must not advertise a German URL that is deliberately
    // noindex. The German page itself keeps the existing cluster so users can
    // still switch to an indexable equivalent without changing page routing.
    .filter((alternate) => !(
      input.locale !== 'de' &&
      alternate.locale === 'de' &&
      isSoftDeindexed(new URL(alternate.href).pathname)
    ))
    .map(({ hreflang, href }) => ({ hreflang, href }));
  alternates.push({
    hreflang: 'x-default',
    href: absolute(base, logical ? localizedPagePath(xDefaultLocale, logical) : '/'),
  });

  const openGraph: Record<string, string> = {
    'og:type': type,
    'og:title': input.ogTitle ?? fullTitle,
    'og:description': input.ogDescription ?? input.description,
    'og:url': canonical,
    'og:site_name': SITE.name,
    'og:image': ogImage,
    'og:locale': LOCALE_HREFLANG[input.locale].replace('-', '_'),
  };

  if (input.imageAlt) openGraph['og:image:alt'] = input.imageAlt;

  const twitter: Record<string, string> = {
    'twitter:card': 'summary_large_image',
    'twitter:title': input.ogTitle ?? fullTitle,
    'twitter:description': input.ogDescription ?? input.description,
    'twitter:image': ogImage,
  };
  if (SITE.twitter) twitter['twitter:site'] = SITE.twitter;

  return {
    fullTitle,
    description: input.description,
    canonical,
    ogImage,
    type,
    locale: input.locale,
    htmlLang: LOCALE_HREFLANG[input.locale],
    robots,
    alternates,
    openGraph,
    twitter,
  };
}

/* ───────────────────────── Structured data (JSON-LD) ──────────────────────── */

/*
 * One publisher entity, referenced by @id from everywhere else.
 *
 * Every page used to emit `author: { "@type": "Organization", "name": "WorthCalc" }`
 * as a bare inline stub — no identifier, no URL, no logo. Nothing tied those stubs
 * together, so to anything building a knowledge graph the site looked like 341
 * unrelated anonymous publishers rather than one publisher of 341 pages.
 *
 * That matters more here than on most sites: worthcalc is currently read far more
 * by assistants than by people. One week of Cloudflare logs: GPTBot 213 requests,
 * ClaudeBot 123, ChatGPT-User 77, OAI-SearchBot 74, PerplexityBot 8. Those are the
 * readers who need a publisher they can actually resolve.
 */
function resolveBase(site?: URL): string {
  return (site?.origin ?? SITE.url).replace(/\/$/, '');
}

export function organizationId(site?: URL): string {
  return `${resolveBase(site)}/#organization`;
}

export function webSiteId(site?: URL): string {
  return `${resolveBase(site)}/#website`;
}

export interface EntityJsonLdOptions {
  description?: string;
  topics?: readonly string[];
}

/** The publisher entity. Emitted once per page by SEO.astro. */
export function organizationJsonLd(site?: URL, options: EntityJsonLdOptions = {}): object {
  const base = resolveBase(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId(site),
    name: SITE.name,
    url: `${base}/`,
    logo: {
      '@type': 'ImageObject',
      url: absolute(base, SITE.logo),
    },
    image: absolute(base, SITE.defaultOgImage),
    ...(options.description ? { description: options.description } : {}),
    ...(options.topics?.length ? { knowsAbout: options.topics } : {}),
  };
}

/** The site entity, so a citation can resolve which site a page belongs to. */
export function webSiteJsonLd(site?: URL, options: EntityJsonLdOptions = {}): object {
  const base = resolveBase(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': webSiteId(site),
    name: SITE.name,
    url: `${base}/`,
    publisher: { '@id': organizationId(site) },
    inLanguage: CORE_LOCALES.map((locale) => LOCALE_HREFLANG[locale]),
    ...(options.description ? { description: options.description } : {}),
    ...(options.topics?.length
      ? { about: options.topics.map((name) => ({ '@type': 'Thing', name })) }
      : {}),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Build a schema.org FAQPage JSON-LD object. */
export function faqJsonLd(items: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Absolute or site-relative URL for this crumb. */
  url: string;
}

/** Build a schema.org BreadcrumbList JSON-LD object. */
export function breadcrumbJsonLd(items: BreadcrumbItem[], site?: URL): object {
  const base = (site?.origin ?? SITE.url).replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(base, item.url),
    })),
  };
}

/** Build a schema.org SoftwareApplication object for a tool page. */
export function softwareAppJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  locale: ContentLocale;
  site?: URL;
}): object {
  const base = (opts.site?.origin ?? SITE.url).replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    url: absolute(base, opts.url),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    inLanguage: LOCALE_HREFLANG[opts.locale],
    offers: { '@type': 'Offer', price: '0', priceCurrency: opts.locale === 'zh' ? 'TWD' : opts.locale === 'en' ? 'USD' : 'EUR' },
    publisher: { '@id': organizationId(opts.site) },
    isPartOf: { '@id': webSiteId(opts.site) },
  };
}

/** Build a schema.org Article object for editorial pages. */
export function articleJsonLd(opts: {
  headline: string;
  description: string;
  url: string;
  locale: ContentLocale;
  dateModified?: string;
  site?: URL;
}): object {
  const base = (opts.site?.origin ?? SITE.url).replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: absolute(base, pagePath(opts.url)),
    inLanguage: LOCALE_HREFLANG[opts.locale],
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    author: { '@id': organizationId(opts.site) },
    publisher: { '@id': organizationId(opts.site) },
    isPartOf: { '@id': webSiteId(opts.site) },
  };
}
