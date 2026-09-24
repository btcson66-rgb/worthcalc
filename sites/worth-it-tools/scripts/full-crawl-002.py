"""Current production sitemap and intentional deindex audit. Python requests/bs4."""
import argparse
import concurrent.futures
import csv
import json
import re
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag

import requests
from bs4 import BeautifulSoup

BASE = 'https://worthcalc.win'
REQUEST_ORIGIN = BASE
ROOT = Path(__file__).resolve().parents[1]
REGISTRY = json.loads((ROOT / 'src/data/deindexed-urls.json').read_text(encoding='utf-8'))

def get(url):
    try:
        request_url = url.replace(BASE, REQUEST_ORIGIN, 1) if url.startswith(BASE) else url
        response = requests.get(request_url, timeout=25, headers={'User-Agent': 'WorthCalcFullAudit002/1.0'}, allow_redirects=True)
        return response, None
    except requests.RequestException as error:
        return None, str(error)

def xml_locs(url):
    response, error = get(url)
    if error or response.status_code != 200:
        raise RuntimeError(f'{url}: {error or response.status_code}')
    return [node.text.strip() for node in ET.fromstring(response.content).iter() if node.tag.endswith('loc') and node.text]

def clean(url):
    return urldefrag(url)[0].split('?')[0]

def inspect(url):
    response, error = get(url)
    row = {'url': url, 'error': error, 'status': None, 'final_url': None, 'redirects': [], 'canonical': None,
           'robots': None, 'title': None, 'description': None, 'h1': [], 'locale': None, 'hreflang': {},
           'links': [], 'schema_count': 0, 'schema_errors': [], 'x_robots_tag': None}
    if error:
        return row
    row['status'] = response.status_code
    final_url = response.url.replace(REQUEST_ORIGIN, BASE, 1)
    row['final_url'] = final_url
    row['redirects'] = [{'url': hop.url.replace(REQUEST_ORIGIN, BASE, 1), 'status': hop.status_code, 'location': hop.headers.get('Location')} for hop in response.history]
    row['x_robots_tag'] = response.headers.get('X-Robots-Tag')
    if 'html' not in response.headers.get('Content-Type', ''):
        return row
    soup = BeautifulSoup(response.text, 'html.parser')
    canonical = soup.select_one('link[rel~=canonical]')
    row['canonical'] = urljoin(final_url, canonical.get('href', '')) if canonical else None
    robots = soup.select_one('meta[name=robots]')
    row['robots'] = robots.get('content') if robots else None
    title = soup.title
    row['title'] = title.get_text(' ', strip=True) if title else None
    description = soup.select_one('meta[name=description]')
    row['description'] = description.get('content') if description else None
    row['h1'] = [item.get_text(' ', strip=True) for item in soup.select('h1')]
    row['locale'] = (soup.html or {}).get('lang')
    for item in soup.select('link[rel~=alternate][hreflang]'):
        row['hreflang'][item['hreflang']] = urljoin(final_url, item.get('href', ''))
    row['links'] = sorted({clean(urljoin(final_url, item['href'])) for item in soup.select('a[href]')
                           if urlparse(urljoin(final_url, item['href'])).netloc == urlparse(BASE).netloc})
    for item in soup.select('script[type="application/ld+json"]'):
        row['schema_count'] += 1
        try:
            json.loads(item.string or item.get_text())
        except (ValueError, TypeError) as schema_error:
            row['schema_errors'].append(str(schema_error))
    return row

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('phase', choices=['BEFORE', 'AFTER'])
    parser.add_argument('--output', default='docs/full-audit-002')
    parser.add_argument('--preview-origin', help='Fetch matching paths from a local preview while checking public canonical URLs')
    args = parser.parse_args()
    global REQUEST_ORIGIN
    REQUEST_ORIGIN = args.preview_origin or BASE
    output = ROOT / args.output
    output.mkdir(parents=True, exist_ok=True)
    if args.preview_origin:
        children = [node.text.strip() for node in ET.parse(ROOT / 'dist/sitemap-index.xml').iter()
                    if node.tag.endswith('loc') and node.text]
        urls = sorted({node.text.strip() for child in (ROOT / 'dist').glob('sitemap-[0-9]*.xml')
                       for node in ET.parse(child).iter() if node.tag.endswith('loc') and node.text})
    else:
        children = xml_locs(f'{BASE}/sitemap-index.xml')
        urls = sorted(set(url for child in children for url in xml_locs(child)))
    # Registry URLs and every retired-locale route in the built route inventory.
    deindexed = set(REGISTRY['urls'])
    dist = ROOT / 'dist'
    if dist.exists():
        for locale in REGISTRY.get('locales', []):
            for page in (dist / locale).rglob('index.html'):
                deindexed.add(BASE + '/' + page.parent.relative_to(dist).as_posix() + '/')
    deindexed.discard(BASE + '/en/')  # Separate compatibility alias, never a deindex disposition.
    targets = sorted(set(urls) | deindexed | {BASE + '/en/'})
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        rows_by_url = dict(zip(targets, pool.map(inspect, targets)))
    rows = [rows_by_url[url] for url in urls]
    deindexed_rows = [rows_by_url[url] for url in sorted(deindexed)]
    all_links = set(link for row in rows for link in row['links'])
    extra_links = sorted(all_links - rows_by_url.keys())
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        rows_by_url.update(zip(extra_links, pool.map(inspect, extra_links)))
    inbound = Counter(link for row in rows for link in row['links'])
    for row in rows:
        row['orphan'] = row['url'] != BASE + '/' and inbound[row['url']] == 0
        row['broken_links'] = [link for link in row['links'] if rows_by_url[link]['error'] or (rows_by_url[link]['status'] or 0) >= 400]
        row['internal_redirects'] = [link for link in row['links'] if rows_by_url[link]['redirects']]
        row['canonical_target_status'] = rows_by_url.get(row['canonical'], {}).get('status')
        row['hreflang_nonreciprocal'] = [f'{lang}:{target}' for lang, target in row['hreflang'].items()
            if target not in rows_by_url or row['url'] not in rows_by_url[target]['hreflang'].values()]
        row['deindexed_hreflang_targets'] = [target for target in row['hreflang'].values() if target in deindexed]
    findings = {
        'sitemap_non200': [r['url'] for r in rows if r['status'] != 200],
        'sitemap_redirects': [r['url'] for r in rows if r['redirects']],
        'sitemap_nonself_canonical': [r['url'] for r in rows if r['canonical'] != r['url']],
        'sitemap_noindex': [r['url'] for r in rows if 'noindex' in (r['robots'] or '').lower() or 'noindex' in (r['x_robots_tag'] or '').lower()],
        'sitemap_in_deindexed': sorted(set(urls) & deindexed),
        'deindexed_without_noindex': [r['url'] for r in deindexed_rows if r['status'] == 200 and 'noindex' not in (r['robots'] or '').lower() and 'noindex' not in (r['x_robots_tag'] or '').lower()],
        'deindexed_in_hreflang': [r['url'] for r in rows if r['deindexed_hreflang_targets']],
        'broken_link_sources': [r['url'] for r in rows if r['broken_links']],
        'internal_redirect_sources': [r['url'] for r in rows if r['internal_redirects']],
        'hreflang_nonreciprocal_sources': [r['url'] for r in rows if r['hreflang_nonreciprocal']],
        'orphan_urls': [r['url'] for r in rows if r['orphan']],
        'alias_internal_link_sources': [r['url'] for r in rows if BASE + '/en/' in r['links']],
        'missing_title': [r['url'] for r in rows if not r['title']],
        'missing_description': [r['url'] for r in rows if not r['description']],
        'missing_h1': [r['url'] for r in rows if not r['h1']],
        'schema_parse_errors': [r['url'] for r in rows if r['schema_errors']],
    }
    prefix = f'WORTHCALC-FULL-CRAWL-{args.phase}-002'
    payload = {'timestamp_utc': datetime.now(timezone.utc).isoformat(), 'request_origin': REQUEST_ORIGIN, 'children': children,
               'sitemap_url_count': len(urls), 'deindexed_checked_count': len(deindexed_rows),
               'retired_locales': REGISTRY.get('locales', []), 'registry_url_count': len(REGISTRY['urls']),
               'alias': rows_by_url[BASE + '/en/'], 'findings': findings, 'rows': rows,
               'deindexed_rows': deindexed_rows, 'extra_link_targets': {key: rows_by_url[key] for key in extra_links}}
    (output / f'{prefix}.json').write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding='utf-8')
    columns = ['url', 'status', 'final_url', 'canonical', 'canonical_target_status', 'robots', 'x_robots_tag',
               'title', 'description', 'h1', 'locale', 'redirects', 'hreflang', 'hreflang_nonreciprocal',
               'links', 'broken_links', 'internal_redirects', 'orphan', 'schema_count', 'schema_errors']
    with (output / f'{prefix}.csv').open('w', newline='', encoding='utf-8-sig') as file:
        writer = csv.DictWriter(file, fieldnames=columns)
        writer.writeheader()
        for row in rows:
            writer.writerow({field: json.dumps(row.get(field), ensure_ascii=False) if isinstance(row.get(field), (list, dict)) else row.get(field) for field in columns})
    lines = [f'# {prefix}', '', f'- UTC: {payload["timestamp_utc"]}', f'- Sitemap children: {len(children)}',
             f'- Every sitemap URL crawled: {len(rows)}/{len(urls)}',
             f'- Intentional deindex routes crawled: {len(deindexed_rows)}',
             f'- Extra internal link targets checked: {len(extra_links)}',
             f'- /en/ status/canonical: {payload["alias"]["status"]} / {payload["alias"]["canonical"]}', '', '## Findings', '']
    for key, values in findings.items():
        lines.append(f'- {key}: {len(values)}' + (f' — {", ".join(values[:10])}' if values else ''))
    (output / f'{prefix}.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(json.dumps({'phase': args.phase, 'sitemap': len(rows), 'deindexed': len(deindexed_rows),
                      'extra_links': len(extra_links), 'findings': {key: len(value) for key, value in findings.items()}}, ensure_ascii=False))

if __name__ == '__main__':
    main()
