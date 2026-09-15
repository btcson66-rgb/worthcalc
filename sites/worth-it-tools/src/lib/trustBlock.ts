import type { ContentLocale, CoreLocale } from '../consts';
import type { TrustBlockProps } from '../types/trustBlock';

const FALLBACK_COPY: Record<CoreLocale, {
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
};

export function trustLocale(locale: ContentLocale): CoreLocale {
  return locale === 'en' || locale === 'zh' || locale === 'es' || locale === 'fr' || locale === 'de' ? locale : 'en';
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
