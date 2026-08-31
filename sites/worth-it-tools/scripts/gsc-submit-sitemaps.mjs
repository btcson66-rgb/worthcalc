import { createSign } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ORIGIN = 'https://worthcalc.win';
const EXPECTED_PROPERTY = 'sc-domain:worthcalc.win';
const INDEX_URL = `${SITE_ORIGIN}/sitemap-index.xml`;
const CREDENTIAL_ENV = 'GSC_SERVICE_ACCOUNT_JSON';
const DAY_MS = 24 * 60 * 60 * 1000;
const STUCK_MS = 14 * DAY_MS;
const mode = process.argv.includes('--health') || process.argv.includes('--dry-run') ? 'health' : 'submit';
const forceSubmit = process.argv.includes('--force');
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const reportsDir = join(projectRoot, 'reports');

function base64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function credentials() {
  const raw = process.env[CREDENTIAL_ENV];
  if (!raw) throw new Error(`Missing required environment variable ${CREDENTIAL_ENV}.`);
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`${CREDENTIAL_ENV} must contain valid service-account JSON.`);
  }
  const missing = ['client_email', 'private_key'].filter((field) => !parsed?.[field]);
  if (missing.length) throw new Error(`${CREDENTIAL_ENV} is missing required field(s): ${missing.join(', ')}.`);
  return {
    clientEmail: parsed.client_email,
    privateKey: parsed.private_key.replace(/\\n/g, '\n'),
  };
}

function userOAuthCredentials() {
  const rawClient = process.env.FABLE_OPS_OAUTH_CLIENT_JSON;
  const refreshToken = process.env.FABLE_OPS_REFRESH_TOKEN;
  if (!rawClient && !refreshToken) return null;
  if (!rawClient || !refreshToken) {
    throw new Error('FABLE_OPS_OAUTH_CLIENT_JSON and FABLE_OPS_REFRESH_TOKEN must be configured together.');
  }
  let parsed;
  try {
    parsed = JSON.parse(rawClient);
  } catch {
    throw new Error('FABLE_OPS_OAUTH_CLIENT_JSON must contain valid OAuth client JSON.');
  }
  const client = parsed.installed || parsed.web || parsed;
  if (!client?.client_id || !client?.client_secret) {
    throw new Error('FABLE_OPS_OAUTH_CLIENT_JSON is missing client_id or client_secret.');
  }
  return { clientId: client.client_id, clientSecret: client.client_secret, refreshToken };
}

async function jsonRequest(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text.slice(0, 500) };
  }
  return { response, json, text };
}

async function accessToken() {
  const oauth = userOAuthCredentials();
  if (oauth) {
    const { response, json } = await jsonRequest('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: oauth.refreshToken,
        client_id: oauth.clientId,
        client_secret: oauth.clientSecret,
      }),
    });
    if (!response.ok || !json?.access_token) {
      throw new Error(`Configured user OAuth refresh failed (${response.status}): ${json?.error_description ?? json?.error ?? 'unknown error'}`);
    }
    return json.access_token;
  }

  const serviceAccount = credentials();
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64Url(JSON.stringify({
    iss: serviceAccount.clientEmail,
    scope: 'https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const signingInput = `${header}.${claim}`;
  const signature = createSign('RSA-SHA256')
    .update(signingInput)
    .sign(serviceAccount.privateKey, 'base64url');
  const { response, json } = await jsonRequest('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${signingInput}.${signature}`,
    }),
  });
  if (!response.ok || !json?.access_token) {
    throw new Error(`Google OAuth failed (${response.status}): ${json?.error_description ?? json?.error ?? 'unknown error'}`);
  }
  return json.access_token;
}

async function resolveProperty(token) {
  const { response, json } = await jsonRequest('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`GSC sites.list failed (${response.status}).`);
  const available = (json?.siteEntry ?? []).map((entry) => entry.siteUrl);
  if (!available.includes(EXPECTED_PROPERTY)) {
    throw new Error(`Configured Google identity cannot access required GSC property ${EXPECTED_PROPERTY}. Accessible: ${available.join(', ') || '(none)'}.`);
  }
  return EXPECTED_PROPERTY;
}

function sitemapEndpoint(property, path = '') {
  const base = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps`;
  return path ? `${base}/${encodeURIComponent(path)}` : base;
}

function snapshot(requestedPath, value = {}) {
  return {
    path: value.path ?? requestedPath,
    lastSubmitted: value.lastSubmitted ?? null,
    isPending: value.isPending ?? null,
    lastDownloaded: value.lastDownloaded ?? null,
    isSitemapsIndex: value.isSitemapsIndex ?? null,
    warnings: value.warnings ?? null,
    errors: value.errors ?? null,
  };
}

function dateValue(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function stuckPath(entry, now = new Date()) {
  const submitted = dateValue(entry.lastSubmitted);
  return entry.isPending === true
    && !entry.lastDownloaded
    && submitted
    && now - submitted > STUCK_MS;
}

function printTable(entries) {
  console.table(entries.map((entry) => ({
    path: entry.path,
    lastSubmitted: entry.lastSubmitted,
    isPending: entry.isPending,
    lastDownloaded: entry.lastDownloaded,
    isSitemapsIndex: entry.isSitemapsIndex,
    warnings: entry.warnings,
    errors: entry.errors,
  })));
}

async function sitemapHealth(token, property) {
  const { response, json } = await jsonRequest(sitemapEndpoint(property), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`GSC sitemaps.list failed (${response.status}).`);
  const entries = (json?.sitemap ?? []).map((entry) => snapshot(entry.path, entry));
  printTable(entries);
  const stuck = entries.filter((entry) => stuckPath(entry));
  if (stuck.length) {
    throw new Error(`GSC sitemap stuck pending for more than 14 days with no lastDownloaded: ${stuck.map((entry) => entry.path).join(', ')}`);
  }
  return entries;
}

async function discoverSitemapPaths() {
  const response = await fetch(INDEX_URL, { headers: { Accept: 'application/xml' } });
  const xml = await response.text();
  if (!response.ok) throw new Error(`Could not fetch deployed sitemap index ${INDEX_URL} (${response.status}).`);
  const childPaths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
  if (childPaths.length === 0) throw new Error(`No child sitemap URLs found in ${INDEX_URL}.`);
  for (const path of childPaths) {
    const url = new URL(path);
    if (url.origin !== SITE_ORIGIN || !/^\/sitemap-(?!index\.xml$).+\.xml$/.test(url.pathname)) {
      throw new Error(`Unexpected child sitemap URL in deployed index: ${path}`);
    }
  }
  return [INDEX_URL, ...new Set(childPaths)];
}

function markdownCell(value) {
  if (value === null || value === undefined || value === '') return '(none)';
  return String(value).replaceAll('|', '\\|').replace(/\r?\n/g, ' ');
}

function writeReports(report) {
  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(join(reportsDir, 'gsc-sitemap-submit-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  const markdown = [
    '# GSC Sitemap Submit Report',
    '',
    `Generated: ${report.generatedAt}`,
    `Search Console property: ${report.property ?? '(not resolved)'}`,
    `Status: ${report.status}`,
    '',
    report.message,
    '',
    '| Path | Action | Last submitted | Last downloaded | Pending | Index | Warnings | Errors |',
    '| --- | --- | --- | --- | --- | --- | ---: | ---: |',
    ...report.entries.map((entry) => `| ${markdownCell(entry.path)} | ${markdownCell(entry.action)} | ${markdownCell(entry.lastSubmitted)} | ${markdownCell(entry.lastDownloaded)} | ${markdownCell(entry.isPending)} | ${markdownCell(entry.isSitemapsIndex)} | ${markdownCell(entry.warnings)} | ${markdownCell(entry.errors)} |`),
    '',
    ...(report.alerts.length ? ['## Alerts', '', ...report.alerts.map((alert) => `- ${alert}`), ''] : []),
  ].join('\n');
  writeFileSync(join(reportsDir, 'gsc-sitemap-submit-report.md'), `${markdown}\n`, 'utf8');
}

async function submitSitemaps(token, property) {
  const paths = await discoverSitemapPaths();
  const now = new Date();
  const report = {
    generatedAt: now.toISOString(),
    property,
    status: 'failed',
    message: '',
    entries: [],
    alerts: [],
  };
  let failures = 0;
  let submitted = 0;
  let registered = 0;

  for (const path of paths) {
    const endpoint = sitemapEndpoint(property, path);
    const { response: beforeResponse, json: beforeJson } = await jsonRequest(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!beforeResponse.ok && beforeResponse.status !== 404) {
      failures += 1;
      report.entries.push({ ...snapshot(path), action: 'get_failed' });
      continue;
    }
    const before = beforeResponse.ok ? snapshot(path, beforeJson) : snapshot(path);
    if (stuckPath(before, now)) {
      report.alerts.push(`GSC sitemap stuck pending for more than 14 days with no lastDownloaded: ${before.path}`);
    }
    if (beforeResponse.ok && !forceSubmit) {
      registered += 1;
      report.entries.push({ ...before, action: 'already_registered' });
      continue;
    }

    const putResponse = await fetch(endpoint, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!putResponse.ok) {
      failures += 1;
      report.entries.push({ ...before, action: `put_failed_${putResponse.status}` });
      continue;
    }
    const { response: afterResponse, json: afterJson } = await jsonRequest(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!afterResponse.ok) {
      failures += 1;
      report.entries.push({ ...before, action: `verify_failed_${afterResponse.status}` });
      continue;
    }
    submitted += 1;
    const after = snapshot(path, afterJson);
    if (stuckPath(after, now)) {
      report.alerts.push(`GSC sitemap stuck pending for more than 14 days with no lastDownloaded: ${after.path}`);
    }
    report.entries.push({ ...after, action: forceSubmit ? 'force_submitted' : 'submitted_unregistered' });
  }

  report.alerts = [...new Set(report.alerts)];
  if (failures) {
    report.status = 'failed';
    report.message = `${failures} sitemap path(s) failed.`;
    process.exitCode = 1;
  } else if (submitted) {
    report.status = 'submitted';
    report.message = `Submitted ${submitted} unregistered sitemap path(s); read back ${registered} existing path(s).`;
  } else if (report.alerts.length) {
    report.status = 'registered_pending';
    report.message = `Read back ${registered} registered sitemap path(s). Google download remains pending; no repeat PUT was sent.`;
  } else {
    report.status = 'already_registered';
    report.message = `Read back ${registered} registered sitemap path(s); no repeat PUT was needed.`;
  }
  writeReports(report);
  printTable(report.entries);
  console.log(report.message);
}

try {
  const token = await accessToken();
  const property = await resolveProperty(token);
  if (mode === 'health') {
    await sitemapHealth(token, property);
  } else {
    await submitSitemaps(token, property);
  }
} catch (error) {
  console.error(`[gsc:sitemaps] ${error.message}`);
  process.exitCode = 1;
}
