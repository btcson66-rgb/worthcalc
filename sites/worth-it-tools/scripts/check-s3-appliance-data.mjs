import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const data = JSON.parse(readFileSync(join(root, 'src', 'data', 'appliances.json'), 'utf8'));
const failures = [];
const urls = data.filter((item) => typeof item.source_url === 'string' && /^https?:\/\//.test(item.source_url)).length;
const dates = data.filter((item) => /^2026-09-15$/.test(item.verified_date)).length;
for (const item of data) {
  if (!item.id || !item.name?.en || !item.name?.zh) failures.push(`${item.id || 'unknown'} missing localized name`);
  if (!Number.isFinite(item.watts_low) || !Number.isFinite(item.watts_high) || item.watts_low < 0 || item.watts_high < item.watts_low) failures.push(`${item.id} invalid watt range`);
  if (!Number.isFinite(item.default_watts) || !Number.isFinite(item.default_hours_per_day) || item.default_watts < 0 || item.default_hours_per_day < 0) failures.push(`${item.id} invalid default`);
  if (!item.source_url || !/^https?:\/\//.test(item.source_url)) failures.push(`${item.id} missing source_url`);
  if (!item.source_tier || !item.verified_date) failures.push(`${item.id} missing provenance`);
}
const bannedRateCount = JSON.stringify(data).includes('8.12') ? 1 : 0;
if (data.length < 40) failures.push(`expected at least 40 entries, found ${data.length}`);
if (urls !== data.length) failures.push(`source_url coverage ${urls}/${data.length}`);
if (dates !== data.length) failures.push(`verified_date coverage ${dates}/${data.length}`);
if (bannedRateCount !== 0) failures.push('banned Taiwan rate 8.12 found');
if (failures.length) {
  console.error(`[s3-appliances] FAIL: ${failures.join('; ')}`);
  process.exit(1);
}
console.log(`[s3-appliances] ${data.length} entries; source_url ${urls}/${data.length}; verified_date ${dates}/${data.length}; banned rate 8.12 ${bannedRateCount}; PASS`);
