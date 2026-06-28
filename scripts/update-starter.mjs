#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const TEMPLATE_DIR = join(ROOT, 'starter-template');
const SITES_DIR = join(ROOT, 'sites');

const fixedTrackablePaths = [
  'src/lib/seo.ts',
  'src/lib/storage.ts',
  'src/lib/export.ts',
  'src/i18n/ui.ts',
  'src/i18n/utils.ts',
  'src/styles/global.css',
  'scripts/check-links.mjs',
  'scripts/audit.mjs',
  'license-audit.md',
];

function isVisibleDirectory(dir, name) {
  if (name.startsWith('.')) return false;
  return statSync(join(dir, name)).isDirectory();
}

function listAstroFiles(relativeDir) {
  const dir = join(TEMPLATE_DIR, relativeDir);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((entry) => entry.endsWith('.astro') && statSync(join(dir, entry)).isFile())
    .map((entry) => `${relativeDir}/${entry}`);
}

function readComparableContent(filePath, relativePath) {
  const content = readFileSync(filePath, 'utf8');

  if (relativePath === 'license-audit.md') {
    return content
      .split(/\r?\n/)
      .filter((line) => /^(#{1,6}\s+|- \[[ xX]\]|- |\d+\. )/.test(line.trim()))
      .map((line) => line.trim().replace(/\S/g, 'x'))
      .join('\n');
  }

  return content;
}

const trackablePaths = [
  ...listAstroFiles('src/components'),
  ...listAstroFiles('src/layouts'),
  ...fixedTrackablePaths,
];

const siteNames = existsSync(SITES_DIR)
  ? readdirSync(SITES_DIR).filter((name) => isVisibleDirectory(SITES_DIR, name))
  : [];

let totalDiverged = 0;
let totalMissing = 0;

for (const site of siteNames) {
  const diverged = [];
  const missing = [];
  const siteDir = join(SITES_DIR, site);

  for (const relativePath of trackablePaths) {
    const templatePath = join(TEMPLATE_DIR, relativePath);
    const sitePath = join(siteDir, relativePath);

    if (!existsSync(templatePath)) {
      continue;
    }

    if (!existsSync(sitePath)) {
      missing.push(relativePath);
      continue;
    }

    const templateContent = readComparableContent(templatePath, relativePath);
    const siteContent = readComparableContent(sitePath, relativePath);

    if (templateContent !== siteContent) {
      diverged.push(relativePath);
    }
  }

  totalDiverged += diverged.length;
  totalMissing += missing.length;

  console.log(`[${site}]`);
  console.log('  Diverged (review manually):');
  if (diverged.length === 0) {
    console.log('    - None');
  } else {
    for (const file of diverged) {
      console.log(`    - ${file}`);
    }
  }

  console.log('  Missing from site:');
  if (missing.length === 0) {
    console.log('    - None');
  } else {
    for (const file of missing) {
      console.log(`    - ${file}`);
    }
  }
  console.log('');
}

console.log('To sync a file: copy it from starter-template/ to sites/<slug>/. Review changes before overwriting.');
console.log(`${totalDiverged} diverged files, ${totalMissing} missing files across ${siteNames.length} sites.`);
