export type PaidProductEventName = 'product_cta_view' | 'product_cta_click' | 'product_checkout_click';

export interface PaidProductEventParams {
  product_id: string;
  product_name: string;
  site_name: string;
  placement: string;
  provider: string;
  locale: string;
}

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: Record<string, string>) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const emitted = new Map<string, number>();

function shouldDedupe(eventName: PaidProductEventName, params: PaidProductEventParams): boolean {
  if (typeof window === 'undefined') return false;
  const key = [eventName, window.location.pathname, params.product_id, params.placement, params.provider].join('|');
  const previous = emitted.get(key);
  const now = Date.now();
  if (previous !== undefined && (eventName === 'product_cta_view' || now - previous < 1200)) return true;
  emitted.set(key, now);
  return false;
}

export function trackProductEvent(eventName: PaidProductEventName, params: PaidProductEventParams): void {
  if (typeof window === 'undefined' || shouldDedupe(eventName, params)) return;
  const payload = {
    ...params,
    page_path: window.location.pathname,
  };
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName, ...payload });
    }
  } catch {
    // Checkout navigation must not depend on analytics availability.
  }
}
