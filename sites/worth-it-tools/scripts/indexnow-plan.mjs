import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITE = 'https://worthcalc.win';
export function validateManifest(value) {
  if (value?.version !== 1 || value.site !== SITE || !value.pages || typeof value.pages !== 'object' || Array.isArray(value.pages)) throw new Error('Invalid IndexNow baseline manifest');
  for (const [url, hash] of Object.entries(value.pages)) {
    const parsed = new URL(url);
    if (parsed.origin !== SITE || parsed.search || parsed.hash || !/^[a-f0-9]{64}$/.test(hash)) throw new Error('Unsafe IndexNow manifest entry');
  }
  return value;
}
export function createManifest(dist) {
  const index = readFileSync(join(dist, 'sitemap-index.xml'), 'utf8');
  const pages = {};
  for (const [, child] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const childUrl = new URL(child);
    if (childUrl.origin !== SITE || !/^\/sitemap-[\w-]+\.xml$/.test(childUrl.pathname)) throw new Error('Unsafe child sitemap');
    const xml = readFileSync(join(dist, childUrl.pathname.slice(1)), 'utf8');
    for (const [, url] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const parsed = new URL(url);
      if (parsed.origin !== SITE || parsed.search || parsed.hash || parsed.pathname.includes('..')) throw new Error('Unsafe sitemap URL');
      const html = readFileSync(join(dist, parsed.pathname.slice(1), 'index.html'), 'utf8');
      const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].filter(([tag]) => /name=["']robots["']/i.test(tag)).map(([tag]) => tag).join(' ');
      const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)].find(([tag]) => /rel=["']canonical["']/i.test(tag))?.[0];
      const canonical = canonicalTag?.match(/href=["']([^"']+)["']/i)?.[1];
      if (/noindex/i.test(robots) || canonical !== url) throw new Error(`Non-indexable or noncanonical sitemap entry: ${url}`);
      // Source dates remain meaningful. Drop tool version metadata; the
      // manifest itself intentionally has no generated-at timestamp.
      const stableHtml = html.replace(/<meta\b[^>]*name=["']generator["'][^>]*>/gi, '');
      pages[url] = createHash('sha256').update(stableHtml).digest('hex');
    }
  }
  if (!Object.keys(pages).length) throw new Error('Empty IndexNow manifest');
  return validateManifest({ version: 1, site: SITE, pages: Object.fromEntries(Object.entries(pages).sort()) });
}
export function createPlan(current, previous) {
  validateManifest(current);
  if (previous === null) return { version: 1, site: SITE, mode: 'INITIALIZE_BASELINE', reason: 'MANUAL_ACTION_REQUIRED: first deployment initializes the public manifest; no bulk fallback submission.', urls: [], manifest: current };
  validateManifest(previous);
  const changed = Object.keys(current.pages).filter((url) => current.pages[url] !== previous.pages[url]);
  const removed = Object.keys(previous.pages).filter((url) => !(url in current.pages));
  return { version: 1, site: SITE, mode: 'CHANGED_SUBSET', changed, removed, urls: [...new Set([...changed, ...removed])].sort(), manifest: current };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const dist = process.argv[2] || 'dist';
  const current = createManifest(dist);
  // The public current-build manifest is not proof of accepted submission.
  // Restore the last accepted artifact in CI so a failed POST stays pending
  // for the next deployment instead of disappearing from its delta.
  const acceptedPath = process.env.INDEXNOW_ACCEPTED_MANIFEST || 'indexnow-previous-accepted.json';
  const previous = existsSync(acceptedPath) ? validateManifest(JSON.parse(readFileSync(acceptedPath, 'utf8'))) : null;
  if (previous === null) {
    const published = await fetch(`${SITE}/indexnow-manifest.json`, { signal: AbortSignal.timeout(30000), redirect: 'error', cache: 'no-store' });
    if (published.status !== 404) throw new Error('Accepted IndexNow baseline unavailable; refuse to reset an existing or unverified public manifest');
  }
  const plan = createPlan(current, previous);
  writeFileSync(join(dist, 'indexnow-manifest.json'), JSON.stringify(current));
  writeFileSync('indexnow-plan.json', JSON.stringify(plan));
  console.log(JSON.stringify({ mode: plan.mode, reason: plan.reason, changed: plan.changed?.length || 0, removed: plan.removed?.length || 0, total: plan.urls.length }));
}
