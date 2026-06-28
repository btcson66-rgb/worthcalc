#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const SITES_DIR = join(ROOT, 'sites');

function isVisibleDirectory(dir, name) {
  if (name.startsWith('.')) return false;
  const fullPath = join(dir, name);
  return statSync(fullPath).isDirectory();
}

function listHtmlFiles(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...listHtmlFiles(fullPath));
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

function runCommand(command, cwd, options = {}) {
  try {
    execSync(command, {
      cwd,
      stdio: options.inherit ? 'inherit' : 'pipe',
    });
    return true;
  } catch (error) {
    if (!options.inherit && error.stdout) process.stdout.write(error.stdout);
    if (!options.inherit && error.stderr) process.stderr.write(error.stderr);
    console.error(`Command failed in ${relative(ROOT, cwd)}: ${command}`);
    return false;
  }
}

function hasAnyHtmlContaining(htmlFiles, needle) {
  return htmlFiles.some((file) => readFileSync(file, 'utf8').includes(needle));
}

function isToolIndexFile(file, distDir) {
  const parts = relative(distDir, file).split(/[\\/]/);
  return parts.includes('tools') && parts.at(-1) === 'index.html';
}

const siteNames = existsSync(SITES_DIR)
  ? readdirSync(SITES_DIR).filter((name) => isVisibleDirectory(SITES_DIR, name))
  : [];

const results = [];

for (const site of siteNames) {
  const siteDir = join(SITES_DIR, site);
  const packageJson = join(siteDir, 'package.json');

  if (!existsSync(packageJson)) {
    continue;
  }

  if (!existsSync(join(siteDir, 'node_modules'))) {
    console.log(`\nInstalling dependencies for ${site}...\n`);
    runCommand('npm install --no-audit --no-fund', siteDir, { inherit: true });
  }

  console.log(`\nBuilding ${site}...\n`);
  const buildOk = runCommand('npm run build', siteDir);

  let auditOk = false;
  if (buildOk) {
    console.log(`\nAuditing ${site}...\n`);
    auditOk = runCommand('npm run audit', siteDir);
  }

  const distDir = join(siteDir, 'dist');
  const htmlFiles = listHtmlFiles(distDir);

  results.push({
    site,
    build: buildOk,
    audit: auditOk,
    pages: htmlFiles.length,
    tools: htmlFiles.filter((file) => isToolIndexFile(file, distDir)).length,
    sitemap: existsSync(join(distDir, 'sitemap-index.xml')) || existsSync(join(distDir, 'sitemap.xml')),
    ga4: hasAnyHtmlContaining(htmlFiles, 'googletagmanager.com/gtag/js'),
    adsense: hasAnyHtmlContaining(htmlFiles, 'ad-slot') || hasAnyHtmlContaining(htmlFiles, 'adsbygoogle'),
  });
}

const headers = ['Site', 'Build', 'Audit', 'Pages', 'Tools', 'Sitemap', 'GA4', 'AdSense'];
const rows = results.map((result) => [
  result.site,
  result.build ? 'PASS' : 'FAIL',
  result.audit ? 'PASS' : 'FAIL',
  String(result.pages),
  String(result.tools),
  result.sitemap ? 'PASS' : 'FAIL',
  result.ga4 ? 'PASS' : 'FAIL',
  result.adsense ? 'PASS' : 'FAIL',
]);

const widths = headers.map((header, index) => (
  Math.max(header.length, ...rows.map((row) => row[index].length))
));

function formatRow(row) {
  return row.map((value, index) => value.padEnd(widths[index])).join(' | ');
}

console.log('\nSummary\n');
console.log(formatRow(headers));
console.log(widths.map((width) => '-'.repeat(width)).join('-|-'));
for (const row of rows) {
  console.log(formatRow(row));
}

if (results.some((result) => !result.build)) {
  process.exit(1);
}
