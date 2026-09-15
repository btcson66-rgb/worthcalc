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
  es: {
    method: 'Esta página aplica los datos visibles a la operación que muestra.',
    noAdvice: 'Es un cálculo, no un asesoramiento.',
    defaults: 'Los valores predeterminados pueden quedar desactualizados; compruebe las cifras vigentes.',
    excluded: 'Solo se incluyen los datos indicados; otros costes, condiciones, impuestos y circunstancias quedan fuera.',
  },
  fr: {
    method: 'Cette page applique les données visibles au calcul affiché.',
    noAdvice: 'Ceci est un calcul, pas un conseil.',
    defaults: 'Les valeurs par défaut peuvent vieillir ; vérifiez les chiffres en vigueur avant de les utiliser.',
    excluded: 'Seules les données indiquées sont incluses ; les autres coûts, conditions, taxes et situations personnelles sont exclus.',
  },
  de: {
    method: 'Diese Seite wendet die sichtbaren Eingaben auf die angezeigte Rechnung an.',
    noAdvice: 'Dies ist eine Rechnung, keine Beratung.',
    defaults: 'Vorgaben können veralten; prüfen Sie aktuelle Zahlen, bevor Sie sie verwenden.',
    excluded: 'Nur die genannten Eingaben werden berücksichtigt; weitere Kosten, Bedingungen, Steuern und persönliche Umstände bleiben außen vor.',
  },
  hi: {
    method: 'यह पृष्ठ दिखाई देने वाले इनपुट को पृष्ठ पर दी गई गणना में लागू करता है।',
    noAdvice: 'यह एक गणना है, सलाह नहीं।',
    defaults: 'डिफ़ॉल्ट मान पुराने पड़ सकते हैं; उन पर भरोसा करने से पहले मौजूदा आंकड़े जाँच लें।',
    excluded: 'इसमें केवल सूचीबद्ध इनपुट शामिल हैं; अन्य लागतें, शर्तें, कर और व्यक्तिगत परिस्थितियाँ इस गणना से बाहर हैं।',
  },
  ar: {
    method: 'تطبّق هذه الصفحة المدخلات الظاهرة على الحساب المعروض فيها.',
    noAdvice: 'هذا حساب وليس نصيحة.',
    defaults: 'قد تتقادم القيم الافتراضية؛ تحقق من الأرقام الحالية قبل الاعتماد عليها.',
    excluded: 'تشمل الحسبة المدخلات المذكورة فقط؛ أما التكاليف والشروط والضرائب والظروف الشخصية الأخرى فهي خارج نطاقها.',
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
