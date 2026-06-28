/**
 * Standalone JSON-LD schema helpers for static SEO tool sites.
 *
 * Copy this module into a site's src/lib/ folder to generate FAQPage,
 * BreadcrumbList, and SoftwareApplication objects without dependencies.
 */

export type FaqItem = {
  q: string;
  a: string;
};

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type SoftwareAppOptions = {
  name: string;
  url: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
};

export function faqSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function softwareAppSchema(opts: SoftwareAppOptions): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    url: opts.url,
    description: opts.description,
    applicationCategory: opts.applicationCategory ?? "UtilitiesApplication",
    operatingSystem: opts.operatingSystem ?? "Web browser",
    offers: {
      "@type": "Offer",
      price: opts.offers?.price ?? "0",
      priceCurrency: opts.offers?.priceCurrency ?? "USD",
    },
  };
}
