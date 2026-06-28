#!/usr/bin/env node
/**
 * create-site.mjs
 *
 * Creates a new site from starter-template into sites/<slug>/.
 *
 * Usage:
 *   npm run create-site -- --slug my-tool-site --name "My Tool Site"
 *   node scripts/create-site.mjs --slug my-tool-site --name "My Tool Site"
 */

import { existsSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

// ── Parse args ──────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--slug' && argv[i + 1]) {
      args.slug = argv[++i];
    } else if (argv[i] === '--name' && argv[i + 1]) {
      args.name = argv[++i];
    }
  }
  return args;
}

const args = parseArgs(process.argv);

if (!args.slug) {
  console.error('Usage: node scripts/create-site.mjs --slug <slug> --name "<Site Name>"');
  console.error('Example: node scripts/create-site.mjs --slug room-layout-fengshui --name "Room Layout Feng Shui Planner"');
  process.exit(1);
}

const slug = args.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const name = args.name || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

if (!slug) {
  console.error('Error: --slug cannot be empty after sanitisation.');
  process.exit(1);
}

// ── Paths ───────────────────────────────────────────────────────────────────

const ROOT = resolve(import.meta.dirname, '..');
const TEMPLATE = join(ROOT, 'starter-template');
const SITES = join(ROOT, 'sites');
const TARGET = join(SITES, slug);

if (!existsSync(TEMPLATE)) {
  console.error(`Error: starter-template not found at ${TEMPLATE}`);
  process.exit(1);
}

if (existsSync(TARGET)) {
  console.error(`Error: sites/${slug} already exists. Choose a different slug or delete the existing folder.`);
  process.exit(1);
}

// ── Copy helper ─────────────────────────────────────────────────────────────

const SKIP = new Set(['node_modules', 'dist', '.astro', '.env', 'package-lock.json']);

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (SKIP.has(entry)) continue;
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// ── Execute ─────────────────────────────────────────────────────────────────

console.log(`\nCreating site: ${name} (${slug})`);
console.log(`  From: ${relative(ROOT, TEMPLATE)}`);
console.log(`  To:   sites/${slug}\n`);

// 1. Copy template
copyDir(TEMPLATE, TARGET);
console.log('✓ Copied starter-template files');

// 2. Generate site.config.ts from example
const configExample = join(TARGET, 'site.config.example.ts');
const configTarget = join(TARGET, 'site.config.ts');
if (existsSync(configExample)) {
  let config = readFileSync(configExample, 'utf8');
  config = config
    .replace(/siteId: '.*?'/, `siteId: '${slug}'`)
    .replace(/siteName: '.*?'/, `siteName: '${name}'`)
    .replace(/siteDescription: '.*?'/, `siteDescription: '${name} — free, fast, browser-based tools.'`);
  writeFileSync(configTarget, config, 'utf8');
  console.log('✓ Generated site.config.ts');
}

// 3. Update README with site name
const readmePath = join(TARGET, 'README.md');
if (existsSync(readmePath)) {
  let readme = readFileSync(readmePath, 'utf8');
  readme = readme.replace(/# Reusable Static SEO Tool-Site Starter/g, `# ${name}`);
  readme = readme.replace(/SEO Tool Starter/g, name);
  writeFileSync(readmePath, readme, 'utf8');
  console.log('✓ Updated README.md with site name');
}

// 4. Update package.json name
const pkgPath = join(TARGET, 'package.json');
if (existsSync(pkgPath)) {
  let pkg = readFileSync(pkgPath, 'utf8');
  pkg = pkg.replace(/"name": ".*?"/, `"name": "${slug}"`);
  pkg = pkg.replace(/"description": ".*?"/, `"description": "${name} — free, fast, browser-based tools."`);
  writeFileSync(pkgPath, pkg, 'utf8');
  console.log('✓ Updated package.json');
}

// 5. Generate .env.example (already copied, but ensure it exists)
const envExamplePath = join(TARGET, '.env.example');
if (!existsSync(envExamplePath)) {
  writeFileSync(
    envExamplePath,
    `SITE_URL=https://${slug}.example.com\nPUBLIC_GA_ID=\nPUBLIC_ADSENSE_CLIENT=\n`,
    'utf8',
  );
  console.log('✓ Generated .env.example');
}

// 6. Create launch-checklist.md
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(TARGET, 'launch-checklist.md'),
  `# Launch Checklist — ${name}

Created: ${today}
Status: draft

## Pre-Launch

- [ ] \`npm run build\` passes
- [ ] \`npm run audit\` passes
- [ ] sitemap.xml generated
- [ ] robots.txt correct
- [ ] All legal pages complete (about, privacy, terms, contact, disclaimer)
- [ ] GA4 Measurement ID configured in .env
- [ ] Mobile layout tested
- [ ] All internal links valid
- [ ] No thin/empty pages
- [ ] Tool(s) functional in browser
- [ ] AdSense placeholders do not block tool usage

## Deployment

- [ ] \`SITE_URL\` set to production domain in .env
- [ ] Deployed to Cloudflare Pages / Vercel / GitHub Pages
- [ ] Custom domain DNS configured
- [ ] HTTPS verified

## Post-Launch

- [ ] Google Search Console property created
- [ ] Domain verified (DNS TXT)
- [ ] /sitemap-index.xml submitted to GSC
- [ ] GA4 real-time data confirmed
- [ ] AdSense application submitted (when ready)
- [ ] license-audit.md reviewed and dated

## Notes

_Add site-specific notes here._
`,
  'utf8',
);
console.log('✓ Created launch-checklist.md');

// 7. Update license-audit.md header
const auditPath = join(TARGET, 'license-audit.md');
if (existsSync(auditPath)) {
  let audit = readFileSync(auditPath, 'utf8');
  audit = audit.replace(/^# .*$/m, `# License Audit — ${name}`);
  writeFileSync(auditPath, audit, 'utf8');
  console.log('✓ Updated license-audit.md');
}

// ── Done ────────────────────────────────────────────────────────────────────

console.log(`
${'─'.repeat(60)}
✓ Site "${name}" created at sites/${slug}/

Next steps:
  cd sites/${slug}
  npm install
  npm run dev           # start dev server
  npm run build         # production build
  npm run audit         # check AdSense / SEO readiness

Then:
  1. Edit site.config.ts with your production URL
  2. Set PUBLIC_GA_ID in .env
  3. Deploy dist/ to Cloudflare Pages / Vercel / GitHub Pages
  4. Submit /sitemap-index.xml to Google Search Console
  5. Review launch-checklist.md
${'─'.repeat(60)}
`);
