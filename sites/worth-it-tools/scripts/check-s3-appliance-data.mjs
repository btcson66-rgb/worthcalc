import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const data = JSON.parse(readFileSync(join(root, 'src', 'data', 'appliances.json'), 'utf8'));
const failures = [];
const urls = data.filter((item) => typeof item.source_url === 'string' && /^https?:\/\//.test(item.source_url)).length;
// P2 batch 6 (2026-10-17): four entries are derived from 能源署 label registers (verified 2026-10-17); every other entry is a
// labelled demo value (verified 2026-09-15, not Energy Administration data).
const label = data.filter((item) => item.source_tier === 'moeaea-label');
const demo = data.filter((item) => item.source_tier === 'demo');
const dates = data.filter((item) => (item.source_tier === 'moeaea-label' ? /^2026-10-17$/ : /^2026-09-15$/).test(item.verified_date)).length;
for (const item of data) {
  if (!item.id || !item.name?.en || !item.name?.zh) failures.push(`${item.id || 'unknown'} missing localized name`);
  if (!Number.isFinite(item.watts_low) || !Number.isFinite(item.watts_high) || item.watts_low < 0 || item.watts_high < item.watts_low) failures.push(`${item.id} invalid watt range`);
  if (!Number.isFinite(item.default_watts) || !Number.isFinite(item.default_hours_per_day) || item.default_watts < 0 || item.default_hours_per_day < 0) failures.push(`${item.id} invalid default`);
  if (!item.source_url || !/^https?:\/\//.test(item.source_url)) failures.push(`${item.id} missing source_url`);
  if (!item.source_tier || !item.verified_date) failures.push(`${item.id} missing provenance`);
  if (!['moeaea-label', 'demo'].includes(item.source_tier)) failures.push(`${item.id} has unknown source_tier ${item.source_tier}`);
  if (!item.zh_note || !item.source_note) failures.push(`${item.id} missing zh_note/source_note`);
  if (item.source_tier === 'moeaea-label' && (!/^https:\/\/ea03\.moeaea\.gov\.tw\//.test(item.source_url) || !item.label_dataset || !(item.label_models > 0))) failures.push(`${item.id} label entry lacks the 能源署 dataset, its model count or an ea03.moeaea.gov.tw source`);
  if (item.source_tier === 'demo' && !/示範值/.test(item.zh_note)) failures.push(`${item.id} demo entry must say 示範值`);
}
if (label.length !== 4) failures.push(`expected 4 能源署-derived entries, found ${label.length}`);
if (label.length + demo.length !== data.length) failures.push('every entry must be moeaea-label or demo');
const bannedRateCount = JSON.stringify(data).includes('8.12') ? 1 : 0;
if (data.length < 40) failures.push(`expected at least 40 entries, found ${data.length}`);
if (urls !== data.length) failures.push(`source_url coverage ${urls}/${data.length}`);
if (dates !== data.length) failures.push(`verified_date coverage ${dates}/${data.length}`);
if (bannedRateCount !== 0) failures.push('banned Taiwan rate 8.12 found');
if (failures.length) {
  console.error(`[s3-appliances] FAIL: ${failures.join('; ')}`);
  process.exit(1);
}
console.log(`[s3-appliances] ${data.length} entries (${label.length} from 能源署 label registers, ${demo.length} labelled 示範值); source_url ${urls}/${data.length}; verified_date ${dates}/${data.length}; banned rate 8.12 ${bannedRateCount}; PASS`);
