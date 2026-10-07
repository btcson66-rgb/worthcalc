// Submit only the precomputed deployment delta; never fall back to sitemap.
import { readFileSync, writeFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { SITE, validateManifest } from './indexnow-plan.mjs';
const plan = JSON.parse(readFileSync(process.argv[2] || 'indexnow-plan.json', 'utf8'));
validateManifest(plan.manifest);
if (plan.site !== SITE || plan.version !== 1 || !Array.isArray(plan.urls) || new Set(plan.urls).size !== plan.urls.length) throw new Error('Invalid submission plan');
for (const url of plan.urls) {
  const parsed = new URL(url);
  if (parsed.origin !== SITE || parsed.search || parsed.hash || !(url in plan.manifest.pages || plan.removed?.includes(url))) throw new Error('Unsafe submission URL');
}
const log = { mode: plan.mode, count: plan.urls.length, batches: [], reason: plan.reason };
const persist = () => writeFileSync('indexnow-submission-log.json', JSON.stringify(log, null, 2));
try {
if (plan.mode === 'INITIALIZE_BASELINE' && plan.urls.length === 0) {
  writeFileSync('indexnow-accepted.json', JSON.stringify(plan.manifest));
  persist();
  console.log(plan.reason);
} else {
  if (plan.mode !== 'CHANGED_SUBSET') throw new Error('Unknown submission plan mode');
  const key = process.env.INDEXNOW_KEY?.trim();
  if (plan.urls.length && (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key))) throw new Error('INDEXNOW_KEY absent or invalid');
  if (plan.urls.length > 200 && process.env.INDEXNOW_ALLOW_LARGE_DELTA !== 'true') {
    log.reason = 'MANUAL_ACTION_REQUIRED: more than 200 changed URLs; review generated plan before allowing this delta.';
    persist();
    throw new Error(log.reason);
  }
  if (plan.urls.length) {
    const response = await fetch(`${SITE}/indexnow-manifest.json`, { signal: AbortSignal.timeout(30000), redirect: 'error', cache: 'no-store' });
    if (!response.ok) throw new Error(`Deployed manifest HTTP ${response.status}`);
    const deployed = validateManifest(await response.json());
    if (JSON.stringify(deployed) !== JSON.stringify(plan.manifest)) throw new Error('Production manifest differs from this deployment; refuse stale submission');
    const keyResponse = await fetch(`${SITE}/${key}.txt`, { signal: AbortSignal.timeout(30000), redirect: 'error' });
    if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) throw new Error('Public IndexNow key verification failed');
  }
  for (let offset = 0; offset < plan.urls.length; offset += 50) {
    const urls = plan.urls.slice(offset, offset + 50);
    let accepted = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      let status = 0;
      try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST', signal: AbortSignal.timeout(30000),
          headers: { 'content-type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ host: 'worthcalc.win', key, keyLocation: `${SITE}/${key}.txt`, urlList: urls }),
        });
        status = response.status;
      } catch { /* Logs exclude response body, headers, payload and key. */ }
      log.batches.push({ offset, count: urls.length, attempt, status });
      persist();
      if ([200, 202].includes(status)) { accepted = true; break; }
      if (status && status !== 429 && status < 500) throw new Error(`IndexNow rejected batch: HTTP ${status}`);
      if (attempt < 3) await delay(5000 * attempt);
    }
    if (!accepted) throw new Error('IndexNow retry limit reached; see safe submission log');
    if (offset + 50 < plan.urls.length) await delay(2000);
  }
  persist();
  writeFileSync('indexnow-accepted.json', JSON.stringify(plan.manifest));
  console.log(`IndexNow changed subset accepted: ${plan.urls.length} URLs`);
}

} catch (error) {
  log.error = error.message;
  persist();
  throw error;
}
