import { SITE, LOCALE_HREFLANG, LOCALES, type Locale } from '../consts';

export interface SeoInput {
  /** Page title without the brand suffix. */
  title: string;
  /** Meta description (~50–160 chars recommended). */
  description: string;
  /** Active locale of the page. */
  locale: Locale;
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
  /** Locales that have an equivalent page. Defaults to every site locale. */
  alternateLocales?: Locale[];
}

export interface ResolvedSeo {
  fullTitle: string;
  description: string;
  canonical: string;
  ogImage: string;
  type: 'website' | 'article';
  locale: Locale;
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

function localizedPagePath(locale: Locale, logical: string): string {
  return logical ? `/${locale}/${logical}/` : `/${locale}/`;
}

/** Resolve raw SEO input into everything the <head> needs. */
export function resolveSeo(input: SeoInput): ResolvedSeo {
  const base = origin(input);
  const fullTitle = input.title ? `${input.title} | ${SITE.name}` : SITE.name;
  const canonical = absolute(base, pagePath(input.url.pathname));
  const ogImage = absolute(base, input.image ?? SITE.defaultOgImage);
  const type = input.type ?? 'website';
  const robots = input.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large';

  // hreflang alternates: swap the locale segment of the current path.
  const segments = input.url.pathname.split('/').filter(Boolean);
  if ((LOCALES as string[]).includes(segments[0])) segments.shift();
  const logical = segments.join('/');
  const alternateLocales = input.alternateLocales ?? [...LOCALES];
  const alternates = alternateLocales.map((loc) => ({
    hreflang: LOCALE_HREFLANG[loc],
    href: absolute(base, localizedPagePath(loc, logical)),
  }));
  alternates.push({
    hreflang: 'x-default',
    href: absolute(base, logical ? localizedPagePath(alternateLocales[0] ?? input.locale, logical) : '/'),
  });

  const openGraph: Record<string, string> = {
    'og:type': type,
    'og:title': fullTitle,
    'og:description': input.description,
    'og:url': canonical,
    'og:site_name': SITE.name,
    'og:image': ogImage,
    'og:locale': LOCALE_HREFLANG[input.locale].replace('-', '_'),
  };

  const twitter: Record<string, string> = {
    'twitter:card': 'summary_large_image',
    'twitter:title': fullTitle,
    'twitter:description': input.description,
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
  locale: Locale;
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
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}
