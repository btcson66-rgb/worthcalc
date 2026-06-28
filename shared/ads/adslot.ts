/**
 * Standalone AdSense snippet helpers for static tool sites.
 *
 * Copy this module into a site's src/lib/ folder to render AdSense markup or
 * inert placeholders while keeping placement policy reminders close to code.
 */

export const ADSENSE_POLICY_NOTES =
  "Ads must be clearly labeled, must not block tool controls or results, must not mimic buttons or navigation, and should be limited to no more than 3 ad units per page.";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function adsenseSnippet(clientId: string, slotId?: string): string {
  const client = escapeHtml(clientId.trim());
  const slot = slotId?.trim() ? `\n  data-ad-slot="${escapeHtml(slotId.trim())}"` : "";

  if (!client) {
    return "";
  }

  return [
    `<ins class="adsbygoogle"`,
    `  style="display:block"`,
    `  data-ad-client="${client}"${slot}`,
    `  data-ad-format="auto"`,
    `  data-full-width-responsive="true"></ins>`,
    `<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
  ].join("\n");
}

export function placeholderHtml(label: string): string {
  return [
    `<div class="ad-placeholder" aria-label="${escapeHtml(label)}">`,
    `  <span>${escapeHtml(label)}</span>`,
    `</div>`,
  ].join("\n");
}
