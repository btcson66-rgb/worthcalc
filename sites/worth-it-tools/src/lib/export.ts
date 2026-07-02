/**
 * Client-side export helpers. No external dependencies.
 * All functions create a temporary <a> to trigger a browser download.
 */

function download(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Copy text to clipboard. Returns true on success. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Download a plain-text file. */
export function downloadText(text: string, filename = 'export.txt'): void {
  download(new Blob([text], { type: 'text/plain;charset=utf-8' }), filename);
}

/** Download a JSON file. */
export function downloadJson(data: unknown, filename = 'export.json'): void {
  const json = JSON.stringify(data, null, 2);
  download(new Blob([json], { type: 'application/json;charset=utf-8' }), filename);
}

/** Download a CSV file from a 2D string array (first row = headers). */
export function downloadCsv(rows: string[][], filename = 'export.csv'): void {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => {
          const escaped = cell.replace(/"/g, '""');
          return /[",\n\r]/.test(cell) ? `"${escaped}"` : escaped;
        })
        .join(','),
    )
    .join('\r\n');
  const bom = '﻿';
  download(new Blob([bom + csv], { type: 'text/csv;charset=utf-8' }), filename);
}

/**
 * PDF export placeholder.
 *
 * Generating a real PDF in the browser requires a library (e.g. jsPDF or
 * html2pdf.js, both MIT-licensed). This stub is intentionally left
 * unimplemented so each site can opt in without adding unused weight.
 *
 * Usage pattern when ready:
 *   import jsPDF from 'jspdf';
 *   export function downloadPdf(content: string, filename = 'export.pdf') { ... }
 */
export function downloadPdf(_content: string, _filename = 'export.pdf'): void {
  console.warn(
    '[export] PDF download is not implemented yet. ' +
      'Install jspdf (MIT) and implement downloadPdf() in src/lib/export.ts.',
  );
}
