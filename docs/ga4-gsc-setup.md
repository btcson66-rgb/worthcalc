# GA4 & Google Search Console Setup Guide

This guide explains how to connect a static site to Google Analytics 4 and Google Search Console. It is written for non-engineers and uses the names shown in Google menus.

## GA4 Setup

1. Go to [analytics.google.com](https://analytics.google.com/).
2. Sign in with the Google account you want to use for the site.
3. Click **Admin**.
4. Under **Account**, click **Create account** if you do not already have one.
5. Enter an account name, review the sharing settings, and continue.
6. Create a GA4 property:
   - Go to **Admin > Property > Create property**.
   - Enter the property name.
   - Choose the reporting time zone and currency.
   - Continue through the setup screens.
7. Create a Web data stream:
   - Go to **Admin > Data collection and modification > Data streams**.
   - Click **Web**.
   - Enter the website URL, for example `https://yourdomain.com`.
   - Enter a stream name, such as the site name.
   - Click **Create stream**.
8. Copy the Measurement ID:
   - Go to **Settings > Data Streams > Web**.
   - Open the web stream.
   - Copy the ID that looks like `G-XXXXXXXXXX`.
9. Add the Measurement ID to the site environment file:
   - Open the site's `.env` file.
   - Set `PUBLIC_GA_ID=G-XXXXXXXXXX`.
   - Replace `G-XXXXXXXXXX` with the real Measurement ID.
10. Rebuild and redeploy the site using the site's normal deployment process.
11. Verify real-time data:
   - Open your website in a browser.
   - In GA4, go to **Reports > Realtime**.
   - You should see at least one active user within a few minutes.

## GSC Setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Click **Add property**.
3. Choose **URL prefix**.
4. Enter the exact website URL, for example `https://yourdomain.com`.
5. Click **Continue**.

### Verify with a DNS TXT record

1. In Search Console, choose the DNS TXT record verification option.
2. Copy the TXT record value Google gives you.
3. Open your domain registrar or DNS provider dashboard. This may be Cloudflare, Namecheap, GoDaddy, Google Domains, Porkbun, or another provider.
4. Find the DNS settings for your domain.
5. Add a new TXT record:
   - Type: `TXT`
   - Name or Host: usually `@`
   - Value or Content: paste the TXT value from Google
   - TTL: leave the default value if you are not sure
6. Save the record.
7. Wait for DNS to update. This can take a few minutes, but sometimes it takes several hours.
8. Return to Search Console and click **Verify**.

### Alternative: verify with an HTML file

1. In Search Console, choose the HTML file verification method.
2. Download the verification file from Google.
3. Place the file in the site's `public/` folder.
4. Rebuild and redeploy the site.
5. Confirm the file opens at `https://yourdomain.com/google-verification-file.html`.
6. Return to Search Console and click **Verify**.

## Sitemap Submission

1. After the property is verified, open the site in Search Console.
2. Go to **Indexing > Sitemaps**.
3. In the sitemap input field, enter `sitemap-index.xml`.
4. Click **Submit**.
5. Check the status the next day. Google may need time to fetch and process the sitemap.

## Checking Performance

1. Go to **Performance > Search results**.
2. Review these metrics:
   - Queries: search terms people used before seeing your site in Google.
   - Clicks: how many times users clicked from Google Search to your site.
   - Impressions: how many times your site appeared in search results.
   - CTR: the percentage of impressions that became clicks.
   - Position: the average ranking position for your pages or queries.

## Troubleshooting

### "Not indexed"

- Check `robots.txt` and confirm it does not block important pages.
- Check the sitemap and confirm the page URL is included.
- Use **URL inspection** in Search Console and inspect the exact page URL.
- If the page is valid, click **Request indexing**.
- Make sure the page has real content and is not a duplicate or placeholder.

### "No data"

- Wait 48-72 hours after setup. GA4 and Search Console do not always show data immediately.
- Confirm the GA4 Measurement ID is correct.
- Visit the site yourself and check **Reports > Realtime** in GA4.
- Confirm the site was rebuilt and deployed after adding `PUBLIC_GA_ID`.
- For Search Console, confirm the exact property matches the live domain, including `https://`.
