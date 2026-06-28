/**
 * Standalone Google Analytics 4 helpers for static tool sites.
 *
 * Copy this module into a site's src/lib/ folder to render the GA4 head
 * snippet only when a valid public Measurement ID is configured.
 */

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeScriptString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

export function isGa4Configured(id: string): boolean {
  return /^G-[A-Z0-9]+$/.test(id.trim());
}

export function ga4HeadSnippet(measurementId: string): string {
  const id = measurementId.trim();

  if (!isGa4Configured(id)) {
    return "";
  }

  const attrId = escapeHtmlAttribute(id);
  const scriptId = escapeScriptString(id);

  return [
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${attrId}"></script>`,
    "<script>",
    "  window.dataLayer = window.dataLayer || [];",
    "  function gtag(){dataLayer.push(arguments);}",
    "  gtag('js', new Date());",
    `  gtag('config', '${scriptId}');`,
    "</script>",
  ].join("\n");
}
