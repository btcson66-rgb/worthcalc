import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const overridePath = resolve(siteDir, 'src', 'data', 's4TitleOverrides.json');
const overrides = JSON.parse(await readFile(overridePath, 'utf8'));
const entries = Object.entries(overrides);
const legalSlugs = new Set(['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog']);
const failures = [];

for (const [pathname, value] of entries) {
  const slug = pathname.split('/').filter(Boolean).at(-1);
  if (!pathname.startsWith('/') || !pathname.endsWith('/')) failures.push(pathname + ': path must be slash-delimited');
  if (!value?.title?.trim() || !value?.description?.trim()) failures.push(pathname + ': title and description are required');
  if (legalSlugs.has(slug)) failures.push(pathname + ': legal title override is forbidden');
}

// 63 pairs when the S4 package shipped; 31 after the 2026-10-15 P1b disposition removed the
// overrides of retired locales (es/fr/de/hi/ar) and of pages that were removed or merged away.
const EXPECTED_PAIRS = 31;
if (entries.length !== EXPECTED_PAIRS) failures.push(`expected ${EXPECTED_PAIRS} title/description pairs, found ${entries.length}`);
if (failures.length > 0) {
  console.error('[s4-titles] FAIL');
  failures.forEach((failure) => console.error('  ' + failure));
  process.exit(1);
}

console.log(`[s4-titles] PASS — ${EXPECTED_PAIRS} title/description pairs; legal title overrides 0`);
