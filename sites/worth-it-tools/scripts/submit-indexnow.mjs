// Submit all live sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver).
// Runs in CI after deploy. The key file must be publicly hosted at
// https://worthcalc.win/<key>.txt (committed under public/).
const SITE = 'https://worthcalc.win';
const KEY = process.env.INDEXNOW_KEY?.trim();

if (!KEY) {
  console.log('INDEXNOW_KEY not set; skipping IndexNow submission.');
  process.exit(0);
}

async function fetchSitemapUrls() {
  const index = await (await fetch(`${SITE}/sitemap-index.xml`)).text();
  const children = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const child of children) {
    const xml = await (await fetch(child)).text();
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return [...new Set(urls)];
}

const urlList = await fetchSitemapUrls();
if (!urlList.length) {
  console.error('No URLs found in sitemap; aborting.');
  process.exit(1);
}

const resp = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'worthcalc.win',
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200/202 = accepted. Other codes indicate key or payload problems.
console.log(`IndexNow submitted ${urlList.length} URLs; status=${resp.status}`);
if (![200, 202].includes(resp.status)) {
  console.error(await resp.text());
  process.exit(1);
}
