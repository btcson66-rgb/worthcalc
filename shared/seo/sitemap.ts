/**
 * Standalone XML sitemap generator for static tool sites.
 *
 * Copy this module into a site's src/lib/ folder when it needs a pure
 * dependency-free function that turns URL records into sitemap XML.
 */

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((url) => {
      const lines = [
        "  <url>",
        `    <loc>${escapeXml(url.loc)}</loc>`,
      ];

      if (url.lastmod) {
        lines.push(`    <lastmod>${escapeXml(url.lastmod)}</lastmod>`);
      }

      if (url.changefreq) {
        lines.push(`    <changefreq>${escapeXml(url.changefreq)}</changefreq>`);
      }

      if (typeof url.priority === "number") {
        lines.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
      }

      lines.push("  </url>");
      return lines.join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
  ].join("\n");
}
