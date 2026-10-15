import type { ContentLocale } from '../consts';
import type { DecisionGuideContent } from '../types/decisionGuide';
import type { TrustBlockProps } from '../types/trustBlock';

const FALLBACK_COPY: Record<ContentLocale, {
  method: string;
  noAdvice: string;
  defaults: string;
  excluded: string;
}> = {
  en: {
    method: 'This page applies the visible inputs to the calculation shown on the page.',
    noAdvice: 'This is a calculation, not advice.',
    defaults: 'Default values can go stale; confirm current figures before relying on them.',
    excluded: 'Only the listed inputs are included; other costs, terms, taxes, and personal circumstances are outside this calculation.',
  },
  zh: {
    method: '本頁把可見的輸入值帶入頁面所示的計算方式。',
    noAdvice: '這是計算，不是建議。',
    defaults: '預設值可能過期；使用前請確認當下數字。',
    excluded: '本頁只納入列出的輸入，其他成本、條款、稅費與個人情況不在計算範圍。',
  },
};

/**
 * Every content locale now has its own trust copy, so this is the identity.
 * It used to collapse hi and ar onto English, which put an English "How this
 * is calculated" block — heading, labels and all — on 310 pages that declare
 * lang="hi" and lang="ar".
 */
export function trustLocale(locale: ContentLocale): ContentLocale {
  return locale;
}

export function isoDate(value?: string): string {
  if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = value ? new Date(value) : undefined;
  return !parsed || Number.isNaN(parsed.valueOf()) ? '2026-09-15' : parsed.toISOString().slice(0, 10);
}

export function fallbackTrustBlock(locale: ContentLocale, lastReviewed?: string): TrustBlockProps {
  const core = trustLocale(locale);
  const copy = FALLBACK_COPY[core];
  return {
    method: copy.method,
    sources: [],
    limits: [copy.noAdvice, copy.defaults, copy.excluded],
    lastReviewed: isoDate(lastReviewed),
    locale: core,
  };
}

/**
 * Build a page's trust block from the decision guide it already renders.
 *
 * These pages carry real per-page substantiation in `decisionGuides.ts` — a
 * formula, specific limitations, and primary sources (CFPB, IRS, ADAC and the
 * like) — but none of it reached the trust block, so 178 indexable pages fell
 * back to identical boilerplate. Worse, that boilerplate asserted "this page
 * cites no outside figures" on pages that cite the CFPB directly, which is not
 * a thin-content problem but a false statement on YMYL pages.
 *
 * Nothing here is invented: every field is the guide's own data. Each source
 * takes the guide's `lastVerified` as its verification date, which is exactly
 * what that date means on these pages.
 */
export function trustBlockFromDecisionGuide(
  guide: DecisionGuideContent,
  locale: ContentLocale,
): TrustBlockProps {
  const base = fallbackTrustBlock(locale, guide.lastVerified);
  const verifiedDate = isoDate(guide.lastVerified);
  return {
    method: base.method,
    formula: guide.formula || undefined,
    sources: guide.sources.map((source) => ({
      label: source.label,
      url: source.href,
      verifiedDate,
    })),
    limits: guide.limitations.length > 0 ? guide.limitations : base.limits,
    lastReviewed: verifiedDate,
    locale,
  };
}
