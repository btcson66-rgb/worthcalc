/**
 * Build-time only. Per-guide OG cards live in `public/images/guides/og/` and are
 * produced by `npm run generate:og-images`, which needs Playwright + Noto fonts +
 * cwebp. A newly added SEO package therefore lands in the registry before its
 * cards exist. `seoPackageRegistry.ogImagePathFor()` derives a path for every
 * guide unconditionally, so without this guard those pages would ship an
 * `og:image` pointing at a 404. Fall back to the site default instead, and let
 * `npm run check:og-images` report which guides are still waiting for a card.
 */

// Vite resolves this at build time against the project root, so it does not
// depend on cwd or on where the SSR bundle ends up on disk. The loader
// functions are never called, so the images are not re-emitted as assets.
const available = new Set(
  Object.keys(import.meta.glob('/public/images/guides/og/*.webp')).map((p) => p.slice(p.lastIndexOf('/') + 1)),
);

/** Returns `ogImage` when its card exists, otherwise `undefined` (layout then uses SITE.defaultOgImage). */
export function resolveGuideOgImage(ogImage: string | undefined): string | undefined {
  if (!ogImage) return undefined;
  if (!ogImage.startsWith('/images/guides/og/')) return ogImage;
  return available.has(ogImage.slice(ogImage.lastIndexOf('/') + 1)) ? ogImage : undefined;
}
