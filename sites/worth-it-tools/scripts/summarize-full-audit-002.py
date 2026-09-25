"""Turn the two complete crawl snapshots into inventories and an explicit diff."""
import csv
import json
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parents[1]
out = root / 'docs/full-audit-002'
before = json.loads((out / 'WORTHCALC-FULL-CRAWL-BEFORE-002.json').read_text(encoding='utf-8'))
after = json.loads((out / 'WORTHCALC-FULL-CRAWL-AFTER-002.json').read_text(encoding='utf-8'))
registry = json.loads((root / 'src/data/deindexed-urls.json').read_text(encoding='utf-8'))
routes = []
for page in (root / 'dist').rglob('index.html'):
    if '__audit-gate-002' in page.parts:
        continue
    relative_path = page.parent.relative_to(root / 'dist').as_posix()
    path = '/' if relative_path == '.' else '/' + relative_path.strip('/') + '/'
    soup = BeautifulSoup(page.read_text(encoding='utf-8'), 'html.parser')
    canonical = soup.select_one('link[rel~=canonical]')
    robots = soup.select_one('meta[name=robots]')
    locale = path.split('/')[1] if path != '/' else 'root'
    routes.append({'path': path, 'locale': locale, 'canonical': canonical.get('href') if canonical else None,
                   'robots': robots.get('content') if robots else None,
                   'in_sitemap': 'https://worthcalc.win' + path in {r['url'] for r in after['rows']}})
routes.sort(key=lambda row: row['path'])
(out / 'WORTHCALC-ROUTE-INVENTORY-002.json').write_text(json.dumps(routes, indent=2, ensure_ascii=False), encoding='utf-8')
deindexed = {'decision': registry.get('decision'), 'localeDecision': registry.get('localeDecision'),
             'locales': registry.get('locales'), 'registry_url_count': len(registry['urls']),
             'registry_urls': registry['urls'], 'expanded_checked_urls': [row['url'] for row in after['deindexed_rows']]}
(out / 'WORTHCALC-DEINDEXED-REGISTRY-002.json').write_text(json.dumps(deindexed, indent=2, ensure_ascii=False), encoding='utf-8')
redirects = {phase: [{'url': row['url'], 'redirects': row['redirects']} for row in snapshot['rows'] + snapshot['deindexed_rows'] if row['redirects']]
             for phase, snapshot in [('before', before), ('after', after)]}
(out / 'WORTHCALC-REDIRECT-INVENTORY-002.json').write_text(json.dumps(redirects, indent=2, ensure_ascii=False), encoding='utf-8')
with (out / 'WORTHCALC-HREFLANG-MATRIX-002.csv').open('w', newline='', encoding='utf-8-sig') as file:
    writer = csv.writer(file)
    writer.writerow(['source', 'hreflang', 'target', 'reciprocal'])
    rows = {row['url']: row for row in after['rows']}
    for row in after['rows']:
        for language, target in row['hreflang'].items():
            writer.writerow([row['url'], language, target, target in rows and row['url'] in rows[target]['hreflang'].values()])
with (out / 'WORTHCALC-SITEMAP-URLS-002.csv').open('w', newline='', encoding='utf-8-sig') as file:
    writer = csv.writer(file)
    writer.writerow(['url', 'lastmod'])
    sitemap_entries = {}
    for child in (root / 'dist').glob('sitemap-*.xml'):
        for item in ET.parse(child).getroot():
            values = {node.tag.split('}')[-1]: node.text for node in item}
            if values.get('loc'):
                sitemap_entries[values['loc']] = values.get('lastmod')
    for row in after['rows']:
        writer.writerow([row['url'], sitemap_entries.get(row['url'], 'MISSING_FROM_BUILT_SITEMAP')])
keys = sorted(set(before['findings']) | set(after['findings']))
lines = ['# WORTHCALC-FULL-AUDIT-AND-REPAIR-002 — crawl diff', '',
         f'- Before: production at {before["timestamp_utc"]}',
         f'- After: local candidate preview at {after["timestamp_utc"]}; production has not been updated.',
         f'- Sitemap: {before["sitemap_url_count"]} → {after["sitemap_url_count"]}, both 100% crawled.',
         f'- Intentional deindex routes checked: {before["deindexed_checked_count"]} → {after["deindexed_checked_count"]}.',
         f'- Built routes: {len(routes)} (excluding test fixture); locale counts: {dict(Counter(r["locale"] for r in routes))}.',
         '', '| Check | Production before | Candidate after |', '|---|---:|---:|']
for key in keys:
    lines.append(f'| {key} | {len(before["findings"].get(key, []))} | {len(after["findings"].get(key, []))} |')
lines += ['', 'The six production broken-link sources expose Cloudflare email-protection placeholders to raw HTTP crawlers. A browser decoded the contact link to mailto:btcson224@gmail.com. The local preview has no Cloudflare obfuscation.',
          'One intentionally retired URL returned HTTP 503 in the first production sweep: /en/guides/true-cost-of-free-shipping-threshold/. Two immediate repeat requests returned 404. The first result is retained as a transient observation.',
          'The 9 legacy auto-calculator pages have no Reset control; browser reload retains edited number fields. Their route, calculation, validation, locale, mobile and console checks passed, but the requested full interaction gate is incomplete.',
          'ExportButtons.astro and downloadGate.ts exist, but no current page imports ExportButtons. The gate was exercised with a browser fixture and mocked endpoint; live user-facing TXT/JSON/email export reachability is not verified.']
(out / 'WORTHCALC-FULL-AUDIT-AND-REPAIR-002-DIFF.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(f'route inventory {len(routes)}; hreflang matrix generated; diff generated')
