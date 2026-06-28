/**
 * Standalone PDF export placeholder for static browser-based tools.
 *
 * Copy this module into a site's src/lib/ folder as a temporary stub. Replace
 * it with a jsPDF-backed implementation when a site needs real PDF export.
 */

export function downloadPdf(content: string, filename = "export.pdf"): void {
  console.warn(
    `PDF export is not installed. To enable ${filename}, add jsPDF to this site and replace shared/export/pdf-placeholder.ts with a real implementation.`,
    content,
  );
}
