import type { ContentLocale } from '../consts';

export interface TrustBlockSource {
  label: string;
  url: string;
  verifiedDate: string;
}

export interface TrustBlockProps {
  method: string;
  formula?: string;
  sources: TrustBlockSource[];
  limits: string[];
  lastReviewed: string;
  locale: ContentLocale;
}
