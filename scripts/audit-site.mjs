#!/usr/bin/env node
/**
 * audit-site.mjs — Run the AdSense/SEO audit for a single site.
 *
 * Usage:
 *   npm run audit-site -- --slug my-site
 *   node scripts/audit-site.mjs --slug my-site
 *
 * If the site has its own `npm run audit` script, it delegates to that.
 * Otherwise it builds and runs the audit script directly.
 */

import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');

let slug = '';
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--slug' && process.argv[i + 1]) {
    slug = process.argv[++i];
  }
}

if (!slug) {
  console.error('Usage: npm run audit-site -- --slug <site-slug>');
  const sitesDir = join(ROOT, 'sites');
  if (existsSync(sitesDir)) {
    const { readdirSync, statSync } = await import('node:fs');
    const sites = readdirSync(sitesDir).filter((d) => statSync(join(sitesDir, d)).isDirectory());
    if (sites.length > 0) {
      console.error(`Available sites: ${sites.join(', ')}`);
    }
  }
  process.exit(1);
}

const siteDir = join(ROOT, 'sites', slug);
if (!existsSync(siteDir)) {
  console.error(`Error: sites/${slug} does not exist.`);
  process.exit(1);
}

console.log(`\nAuditing site: ${slug}\n`);

try {
  execSync('npm run audit', { cwd: siteDir, stdio: 'inherit' });
} catch {
  process.exit(1);
}
