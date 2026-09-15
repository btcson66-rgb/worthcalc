/**
 * Shared calculator interaction layer.
 *
 * Loaded once from ToolLayout, so every tool page gets it without importing
 * anything. Everything here is progressive enhancement: each feature attaches
 * only where the markup opts in, and the page works unchanged without it.
 *
 * No charting library. This site ships 1,200+ static pages; a bundle on each
 * one would cost more in load time than the charts are worth, so the few charts
 * we need are drawn as inline SVG and CSS widths.
 */

const REDUCED = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/* ── Sliders ────────────────────────────────────────────────────────────────
   A slider is attached to a number input by putting `data-range` on it. The
   text input stays authoritative and stays unconstrained: typing a value past
   the slider's range widens the range rather than clamping the number. The
   slider is for exploring "what if", not a validation boundary. */

function niceStep(span: number): number {
  const raw = span / 100;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const snapped = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return snapped * mag;
}

function fmtTick(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${+(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${+(value / 1_000).toFixed(abs >= 10_000 ? 0 : 1)}k`;
  return `${+value.toFixed(2)}`;
}

function attachRange(input: HTMLInputElement) {
  const lo = Number(input.dataset.rangeMin ?? input.min ?? 0) || 0;
  let hi = Number(input.dataset.rangeMax ?? input.max);
  if (!Number.isFinite(hi) || hi <= lo) return;

  const step = Number(input.dataset.rangeStep) || niceStep(hi - lo);

  const wrap = document.createElement('div');
  wrap.className = 'calc-field__slider';

  const range = document.createElement('input');
  range.type = 'range';
  range.className = 'calc-range';
  range.min = String(lo);
  range.max = String(hi);
  range.step = String(step);
  range.tabIndex = -1;
  // The number input already exposes the value to assistive tech; a second
  // control reporting the same value is noise in a screen reader, so the
  // slider is a pointer affordance only.
  range.setAttribute('aria-hidden', 'true');

  const ticks = document.createElement('div');
  ticks.className = 'calc-field__ticks';
  const lowTick = document.createElement('span');
  const highTick = document.createElement('span');
  ticks.append(lowTick, highTick);

  const paint = () => {
    const value = Number(input.value) || 0;
    // Typing past the top of the band widens it instead of clamping.
    if (value > hi) {
      hi = Number(niceStep(value) * 100);
      range.max = String(hi);
      range.step = String(niceStep(hi - lo));
    }
    range.value = String(Math.min(Math.max(value, lo), hi));
    const pct = hi === lo ? 0 : ((Number(range.value) - lo) / (hi - lo)) * 100;
    range.style.setProperty('--fill', `${pct}%`);
    lowTick.textContent = fmtTick(lo);
    highTick.textContent = fmtTick(hi);
  };

  range.addEventListener('input', () => {
    input.value = range.value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    paint();
  });
  input.addEventListener('input', paint);

  wrap.append(range, ticks);
  input.insertAdjacentElement('afterend', wrap);
  paint();
}

/* ── Charts ─────────────────────────────────────────────────────────────── */

export interface Slice {
  label: string;
  value: number;
}

/**
 * Paired bars — the dominant form on this site, because nearly every question
 * here is "is this cheaper than that". The smallest value is marked as the
 * answer and the rest recede, so the chart states a conclusion instead of
 * leaving the reader to compare two similar lengths.
 */
export function renderBars(host: HTMLElement, items: Slice[], format: (n: number) => string) {
  const max = Math.max(...items.map((i) => i.value), 0);
  const best = items.reduce((a, b) => (b.value < a.value ? b : a), items[0]);
  host.classList.add('viz-bars', 'is-emphasis');
  host.innerHTML = items
    .map((item) => {
      const pct = max > 0 ? (item.value / max) * 100 : 0;
      const isBest = item === best;
      return `<div class="viz-bar${isBest ? ' is-best' : ''}">
        <div class="viz-bar__head">
          <span class="viz-bar__name">${escapeHtml(item.label)}</span>
          <span class="viz-bar__value">${escapeHtml(format(item.value))}</span>
        </div>
        <div class="viz-bar__track"><span class="viz-bar__fill" style="--pct:${pct.toFixed(1)}%"></span></div>
      </div>`;
    })
    .join('');
}

/**
 * A meter: one quantity against the threshold that decides the question —
 * "have you used enough of this membership to cover its fee". The page this
 * replaces drew that as two numbers side by side, which makes the reader do
 * the division themselves.
 */
export function renderMeter(host: HTMLElement, value: number, target: number, format: (n: number) => string) {
  const pct = target > 0 ? (value / target) * 100 : 0;
  host.classList.add('viz-meter');
  host.classList.toggle('is-over', value >= target);
  host.innerHTML = `<div class="viz-meter__track">
      <div class="viz-meter__fill" style="--pct:${pct.toFixed(1)}%"></div>
    </div>
    <div class="viz-meter__scale"><span>${escapeHtml(format(0))}</span><span>${escapeHtml(format(target))}</span></div>`;
}

/** Part-to-whole, ≤ 6 segments, with a 2px surface gap between fills. */
export function renderStack(host: HTMLElement, items: Slice[]) {
  const total = items.reduce((sum, i) => sum + Math.max(0, i.value), 0);
  host.classList.add('viz-stack');
  host.innerHTML = items
    .map((item) => {
      const pct = total > 0 ? (Math.max(0, item.value) / total) * 100 : 0;
      return `<div class="viz-stack__seg" style="--pct:${pct.toFixed(2)}%" title="${escapeHtml(item.label)}"></div>`;
    })
    .join('');
}

/**
 * The legend and the values table. Two slots in the chart palette fall below
 * 3:1 on this surface, which obliges a relief channel — so the numbers ship as
 * text beside every chart, always, not as a fallback.
 */
export function renderLegendTable(
  host: HTMLElement,
  items: Slice[],
  format: (n: number) => string,
  caption: string,
) {
  const rows = items
    .map(
      (item, i) =>
        `<tr><th scope="row"><span class="calc-table__swatch" style="background:var(--chart-${i + 1})"></span>${escapeHtml(item.label)}</th><td>${escapeHtml(format(item.value))}</td></tr>`,
    )
    .join('');
  host.innerHTML = `<table class="calc-table"><caption>${escapeHtml(caption)}</caption><tbody>${rows}</tbody></table>`;
}

export interface LineSeries {
  label: string;
  points: number[];
}

/**
 * Two cost curves over time, with the crossing marked.
 *
 * For "rent or buy" the crossover year IS the answer, and a pair of totals
 * cannot show it — the reader has to be told when one curve passes the other.
 * 2px strokes, a recessive grid, and the intersection labelled directly.
 */
export function renderLine(
  host: HTMLElement,
  series: [LineSeries, LineSeries],
  xLabel: (i: number) => string,
  format: (n: number) => string,
  crossoverIndex = -1,
) {
  const W = 320;
  const H = 150;
  const PAD = { top: 10, right: 10, bottom: 22, left: 44 };
  const n = Math.max(series[0].points.length, series[1].points.length);
  if (n < 2) {
    host.innerHTML = '';
    return;
  }
  const all = [...series[0].points, ...series[1].points];
  const lo = Math.min(...all, 0);
  const hi = Math.max(...all, 1);
  const span = hi - lo || 1;

  const x = (i: number) => PAD.left + (i / (n - 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - (v - lo) / span) * (H - PAD.top - PAD.bottom);

  const path = (pts: number[]) =>
    pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  const gridRows = [0, 0.5, 1]
    .map((f) => {
      const yy = PAD.top + f * (H - PAD.top - PAD.bottom);
      const val = lo + (1 - f) * span;
      return `<line x1="${PAD.left}" y1="${yy.toFixed(1)}" x2="${W - PAD.right}" y2="${yy.toFixed(1)}" />
        <text class="viz-line__axis" x="${PAD.left - 6}" y="${(yy + 3.5).toFixed(1)}" text-anchor="end">${escapeHtml(fmtTick(val))}</text>`;
    })
    .join('');

  const ticks = [0, n - 1]
    .map(
      (i) =>
        `<text class="viz-line__axis" x="${x(i).toFixed(1)}" y="${H - 6}" text-anchor="${i === 0 ? 'start' : 'end'}">${escapeHtml(xLabel(i))}</text>`,
    )
    .join('');

  let marker = '';
  if (crossoverIndex > 0 && crossoverIndex < n) {
    const mx = x(crossoverIndex);
    const my = y(series[0].points[crossoverIndex]);
    marker = `<circle class="viz-line__marker" cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="5" />
      <text class="viz-line__marker-label" x="${Math.min(mx + 8, W - 40).toFixed(1)}" y="${Math.max(my - 8, 12).toFixed(1)}">${escapeHtml(xLabel(crossoverIndex))}</text>`;
  }

  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(series[0].label)} versus ${escapeHtml(series[1].label)} over time">
      <g class="viz-line__grid">${gridRows}</g>
      ${ticks}
      <path class="viz-line__series viz-line__series--2" d="${path(series[1].points)}" />
      <path class="viz-line__series viz-line__series--1" d="${path(series[0].points)}" />
      ${marker}
    </svg>
    <ul class="viz-legend">
      <li><span class="viz-legend__swatch" style="background:var(--chart-1)"></span>${escapeHtml(series[0].label)}</li>
      <li><span class="viz-legend__swatch" style="background:var(--chart-2)"></span>${escapeHtml(series[1].label)}</li>
    </ul>`;
}

function escapeHtml(value: string): string {
  return String(value).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}

/* ── Count-up ───────────────────────────────────────────────────────────────
   Only for a figure the reader just caused to change. Capped at 420ms: a
   result that takes longer than that to settle feels broken while a slider is
   still moving. Skipped entirely under reduced-motion. */

export function countUp(el: HTMLElement, to: number, format: (n: number) => string) {
  const from = Number(el.dataset.value ?? 0);
  el.dataset.value = String(to);
  if (REDUCED() || !Number.isFinite(from) || from === to) {
    el.textContent = format(to);
    return;
  }
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / 420, 1);
    const eased = 1 - (1 - t) ** 3;
    el.textContent = format(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ── Boot ───────────────────────────────────────────────────────────────── */

function boot() {
  document
    .querySelectorAll<HTMLInputElement>('input[data-range]')
    .forEach(attachRange);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
