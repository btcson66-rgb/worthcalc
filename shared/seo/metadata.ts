/**
 * Standalone SEO metadata helpers for static tool sites.
 *
 * Copy this module into a site's src/lib/ folder when it needs simple,
 * dependency-free helpers for titles, descriptions, and canonical URLs.
 */

export function generateTitle(title: string, siteName: string): string {
  const cleanTitle = title.trim();
  const cleanSiteName = siteName.trim();

  if (!cleanTitle) {
    return cleanSiteName;
  }

  if (!cleanSiteName) {
    return cleanTitle;
  }

  return `${cleanTitle} | ${cleanSiteName}`;
}

export function generateMetaDescription(desc: string, maxLen = 155): string {
  const cleanDesc = desc.replace(/\s+/g, " ").trim();

  if (cleanDesc.length <= maxLen) {
    return cleanDesc;
  }

  if (maxLen <= 3) {
    return cleanDesc.slice(0, maxLen);
  }

  const truncated = cleanDesc.slice(0, maxLen - 3).trimEnd();
  return `${truncated}...`;
}

export function generateCanonical(baseUrl: string, pathname: string): string {
  const cleanBase = baseUrl.trim().replace(/\/+$/, "");
  const cleanPath = pathname.trim();
  const normalizedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  return new URL(normalizedPath, `${cleanBase}/`).toString();
}
