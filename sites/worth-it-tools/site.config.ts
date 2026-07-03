/**
 * Site configuration - the single source of truth for each deployed site.
 *
 * When you create a new site with `npm run create-site`, this file is copied
 * to `sites/<slug>/site.config.ts` and populated with the values you provide.
 *
 * Every field below is consumed at BUILD TIME by Astro via the consts.ts
 * adapter. Changing values here takes effect on the next `npm run build`.
 */

import type { Locale } from './src/consts';

export interface SiteConfig {
  /** Unique machine-readable slug (kebab-case). Must match the folder name under sites/. */
  siteId: string;
  /** Human-readable brand name shown in header, footer, <title>. */
  siteName: string;
  /** One-sentence site description for meta tags / OG. */
  siteDescription: string;
  /** Default locale when user hits /. */
  defaultLocale: Locale;
  /** All supported locales. Each gets its own /xx/ route prefix. */
  locales: Locale[];
  /** Canonical production URL (no trailing slash). */
  baseUrl: string;
  /** GA4 Measurement ID (e.g. G-XXXXXXXXXX). Empty string = disabled. */
  ga4Id: string;
  /** AdSense publisher ID (e.g. ca-pub-0000000000000000). Empty string = disabled. */
  adsenseClientId: string;
  /** Contact email shown on /contact. */
  contactEmail: string;
  /** Whether to generate sitemap.xml. */
  sitemapEnabled: boolean;
  /** Whether to render AdSense ad slots (even as placeholders). */
  adsEnabled: boolean;
  /** Deployment status tracker. */
  launchStatus: 'draft' | 'staging' | 'live';

  /** Static pages outside of tools (auto-generated from starter). */
  pages: string[];
  /** Tool slugs registered on this site (each needs a page in src/pages/{locale}/tools/{slug}.astro). */
  tools: string[];
  /** Tool categories for homepage grouping (optional). */
  categories: string[];
  /** Legal/info pages that must exist for AdSense compliance. */
  legalPages: string[];
  /** Primary navigation links (header). */
  navigation: NavItem[];
  /** Footer link groups. */
  footerLinks: FooterGroup[];
}

export interface NavItem {
  labelKey: string;
  path: string;
}

export interface FooterGroup {
  heading: string;
  links: { label: string; path: string }[];
}

const config: SiteConfig = {
  siteId: 'worth-it-tools',
  siteName: 'WorthCalc',
  siteDescription: "Free money-decision calculators - find out if it's actually worth it. 值不值得？用數字幫你判斷。",
  defaultLocale: 'en',
  locales: ['en', 'zh'],
  baseUrl: 'https://worthcalc.win',
  ga4Id: '',
  adsenseClientId: '',
  contactEmail: 'hello@example.com',
  sitemapEnabled: true,
  adsEnabled: true,
  launchStatus: 'live',

  pages: ['index', 'about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog'],
  tools: [
    'installment-true-apr',
    'subscription-audit',
    'costco-membership',
    'ev-vs-gas',
    'rent-vs-buy',
    'commute-cost',
    'latte-factor',
    'cashback-breakeven',
  ],
  categories: [
    'spending-decisions',
    'subscriptions-memberships',
    'transport',
    'housing',
    'credit-finance',
  ],
  legalPages: ['about', 'privacy', 'terms', 'contact', 'disclaimer'],
  navigation: [
    { labelKey: 'nav.home', path: '/' },
    { labelKey: 'nav.tools', path: '/#tools' },
    { labelKey: 'nav.about', path: '/about' },
    { labelKey: 'nav.contact', path: '/contact' },
  ],
  footerLinks: [
    {
      heading: 'Legal',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Contact', path: '/contact' },
        { label: 'Disclaimer', path: '/disclaimer' },
        { label: 'Changelog', path: '/changelog' },
      ],
    },
  ],
};

export default config;
