# Site Launch Checklist

Print or copy this checklist before publishing a new site. Do not launch until every required item is complete or intentionally signed off.

## Build & Code

- [ ] `npm run build` passes.
- [ ] `npm run audit` passes.
- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] No console errors in the browser.

## SEO

- [ ] Every page has a unique title.
- [ ] Every page has a unique meta description.
- [ ] Every page has a canonical URL.
- [ ] Every page has exactly one clear H1.
- [ ] Sitemap is generated.
- [ ] `robots.txt` is correct.
- [ ] Structured data is valid.
- [ ] Structured data tested with Google Rich Results Test.

## Legal

- [ ] About page is complete with real content.
- [ ] Privacy policy is complete and mentions analytics, cookies, and advertising.
- [ ] Terms page is complete.
- [ ] Contact page includes a real email address.
- [ ] Disclaimer page is complete.

## Analytics

- [ ] GA4 Measurement ID is configured.
- [ ] Real-time data is confirmed in GA4.
- [ ] Google Search Console property is created.
- [ ] Domain is verified in Google Search Console.
- [ ] Sitemap is submitted in Google Search Console.

## Performance

- [ ] Page load is under 3 seconds on mobile.
- [ ] Lighthouse score is above 80.
- [ ] Images are optimised.
- [ ] No unnecessary render-blocking resources.

## Mobile

- [ ] Responsive layout tested at 375px width.
- [ ] Responsive layout tested at 768px width.
- [ ] Responsive layout tested at 1440px width.
- [ ] Touch targets are at least 44px.
- [ ] No horizontal scroll on mobile.

## Links

- [ ] No broken internal links, checked with `npm run check:links`.
- [ ] No broken external links, checked manually.
- [ ] No orphan pages.
- [ ] Footer links work.
- [ ] Main navigation links work.

## AdSense Prep

- [ ] Ad placeholders render correctly.
- [ ] Ads do not block content.
- [ ] Ads do not block tool controls or results.
- [ ] `ads.txt` is in `public/` when ready.
- [ ] Privacy policy mentions cookies and advertising.

## Content

- [ ] No thin pages.
- [ ] No placeholder text such as `[TODO]`.
- [ ] No "Lorem ipsum" text.
- [ ] Tools actually work.
- [ ] FAQ has real answers.
- [ ] Examples are useful and specific.

## Final

- [ ] Domain DNS is configured.
- [ ] HTTPS is working.
- [ ] 404 page exists or missing pages are handled cleanly.
- [ ] Favicon is present.
- [ ] Site is ready for visitors.
