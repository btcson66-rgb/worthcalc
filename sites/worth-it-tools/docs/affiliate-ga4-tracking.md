# WorthCalc Affiliate GA4 追蹤

## Destination and existing analytics

- Company property/stream: Btcson Affiliate Network
- Stream ID: `15689413334`
- Affiliate Measurement ID: `G-Q78WN8NZ0R`
- Build override: `PUBLIC_AFFILIATE_GA_ID`; the deployment workflow supplies the contract value.
- Existing site Measurement ID remains `PUBLIC_GA_ID` and is not replaced.

WorthCalc loads one gtag.js script using whichever existing or affiliate ID is available. The affiliate config uses `send_page_view: false`; affiliate events use `send_to`, so the second destination does not generate a second automatic page view or overwrite the existing GA4 destination.

## Event contract

| Event | Required fields | WorthCalc status |
| --- | --- | --- |
| `affiliate_module_view` | `site_name`, `placement`, `surface_type`, `affiliate_network`, `batch_id` | Implemented in the real `AffiliateRecs` module when its product pool is populated |
| `affiliate_item_view` | Above plus `product_id`, `product_category`, `card_position` | Implemented with 50% IntersectionObserver |
| `affiliate_click` | Above plus product fields | Implemented on native product anchors |
| `affiliate_refresh` | Module fields | No current WorthCalc refresh UI |
| `affiliate_close` | Module fields plus `close_method` | No current WorthCalc closeable Popup |

The normalized product shape is `product_id`, `name`, `category`, `image`, `price`, `affiliate_url`, `affiliate_network`, `batch_id`, and `active`. `productPool` is intentionally empty today, so no recommendation UI is invented or rendered. When a real catalog is approved, use one affiliate URL per product and fill the schema rather than adding site-specific URL fields.

## Context and safeguards

`getAffiliateSiteName()` maps the three company domains to `funnytools`, `worthcalc`, and `familyboard`; local/unknown hosts map to `development`. WorthCalc uses `result_card`/`calculator` for calculator recommendations. The helper sends no PII, calculator input, page URL custom dimension, client/session ID, timestamp, revenue, or purchase event.

Append `?ga_debug=1` to log `[Affiliate GA4]` and add `debug_mode: true`. Module/item observations are deduplicated per page and product batch; rapid repeated interactions are briefly suppressed. No click handler prevents default navigation or waits for a GA callback, so normal, new-tab, middle-click, Ctrl/Cmd-click, and mobile behavior remain native. Existing analytics remains enabled for normal public pages.

## Adding future placements and testing

Only attach to real production UI and map it to `result_card`, `article_inline`, `support_page`, or `sidebar`; use `tool`, `calculator`, `article`, or `support` as appropriate. Test module/item/click payloads, debug mode, 50% visibility, rerender/remount, blocked `gtag`, failed requests, normal link navigation, new tab, and modifier clicks. After the first production `affiliate_click` arrives, manually mark that event as a GA4 Key Event; do not create alternate revenue events or new custom dimensions.

## Four-site shared destination

The shared destination is Btcson Affiliate Network, stream ID `15689413334`, measurement ID `G-Q78WN8NZ0R`. `funnytools`, `roomfeng`, `worthcalc`, and `familyboard` use the same five event names and parameter names while preserving their existing GA4 destinations. RoomFeng's real surfaces are the support catalogue, review-ready article cards, and standalone product cards; FamilyBoard's private app remains excluded; WorthCalc's empty product pool remains empty until a real catalogue is approved.
