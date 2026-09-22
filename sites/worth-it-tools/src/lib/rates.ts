import ratesData from '../../data/rates.json';

/**
 * Single source of truth for published fee and reward figures.
 *
 * Every membership number that appears on a page comes from `data/rates.json`
 * through this module. Nothing derived is written down as a literal either:
 * the break-even spend, the monthly threshold and the spend that reaches the
 * reward cap are all computed here, so a fee change updates the prose too.
 *
 * `scripts/verify-rates.mjs` fails the build when a guarded figure is written
 * next to a Costco keyword anywhere in `src/`, which is what stopped the
 * retired NT$1,350 / NT$1,150 / NT$82,500 set from being caught for a year.
 */

export interface RateTier {
  /** Official tier name in the market's own wording. */
  name: string;
  annual_fee: number;
  /** Decimal, not percent: 2% is 0.02. */
  reward_rate: number;
  /** Annual cap on the reward, required whenever reward_rate > 0. */
  reward_cap?: number;
}

export interface RateGroup {
  label: string;
  currency: string;
  tiers: Record<string, RateTier>;
  upgrade_delta: number;
  breakeven_qualified_spend: number;
  breakeven_note: string;
  source: string;
  /** ISO date the figures were last checked against `source`. */
  checked: string;
}

const groups = ratesData as unknown as Record<string, RateGroup>;

export const costcoTw = groups.costco_tw;
export const costcoUs = groups.costco_us;

/** Spend at which the reward stops growing, derived rather than stored. */
export function capReachedAt(tier: RateTier): number {
  if (!tier.reward_cap || !tier.reward_rate) return 0;
  return Math.round(tier.reward_cap / tier.reward_rate);
}

/** Monthly equivalent of an annual threshold. */
export function perMonth(annual: number): number {
  return annual / 12;
}

/** Annual spend needed for a savings rate to cover a fee. */
export function savingsBreakeven(fee: number, savingsRate: number): number {
  return savingsRate > 0 ? fee / savingsRate : 0;
}

function group(value: number, separator = ','): string {
  const digits = Math.round(Math.abs(value)).toString();
  let out = '';
  for (let index = 0; index < digits.length; index += 1) {
    if (index > 0 && (digits.length - index) % 3 === 0) out += separator;
    out += digits[index];
  }
  return value < 0 ? `-${out}` : out;
}

/** NT$1,500 — Taiwanese dollars, no decimals. */
export function ntd(value: number): string {
  return `NT$${group(value)}`;
}

/** Bare grouped number for prose that already carries the currency. */
export function amount(value: number): string {
  return group(value);
}

/** $65, or $270.83 when the figure is not a whole dollar. */
export function usd(value: number, decimals = 0): string {
  if (decimals > 0) {
    const [whole, fraction] = value.toFixed(decimals).split('.');
    return `$${group(Number(whole))}.${fraction}`;
  }
  return `$${group(value)}`;
}

/** 0.02 -> "2%", 0.155 -> "15.5%". */
export function percent(rate: number): string {
  return `${Number((rate * 100).toFixed(2))}%`;
}

/** 2026-09-22 -> "2026 年 9 月 22 日". */
export function zhDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`;
}

/** 2026-09-22 -> "September 22, 2026". */
export function enDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
}
