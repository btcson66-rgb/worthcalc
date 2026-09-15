import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const pages = [
  { path: 'en/tools/appliance-running-cost/index.html', tokens: ['data-appliance-calculator', 'appliance-select', 'appliance-watts', 'appliance-hours', 'appliance-rate', 'Complete appliance list'] },
  { path: 'zh/tools/appliance-electricity-cost/index.html', tokens: ['data-appliance-calculator', 'appliance-select', 'appliance-watts', 'appliance-hours', 'appliance-rate', '完整家電清單'] },
  { path: 'zh/home-vs-public-ev-charging-cost/index.html', tokens: ['data-tw-charging-calculator', 'tw-ev-efficiency', 'tw-monthly-km', 'tw-home-rate', 'tw-public-rate', 'tw-equipment-cost', 'U-POWER'] },
];
const failures = [];
for (const page of pages) {
  const path = join('dist', page.path);
  if (!existsSync(path)) {
    failures.push(`${page.path} missing`);
    continue;
  }
  const html = readFileSync(path, 'utf8');
  for (const token of page.tokens) if (!html.includes(token)) failures.push(`${page.path} missing ${token}`);
  if (html.includes('8.12')) failures.push(`${page.path} contains banned rate 8.12`);
}
if (failures.length) {
  console.error(`[s3-boundary] FAIL: ${failures.join('; ')}`);
  process.exit(1);
}
console.log(`[s3-boundary] ${pages.length}/${pages.length} pages; required input/output markers present; banned rate 8.12 0; PASS`);
