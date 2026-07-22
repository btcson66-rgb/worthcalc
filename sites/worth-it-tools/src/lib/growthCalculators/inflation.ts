import { assertFiniteNumber } from './common.js';

export interface PriceIndexPoint { period: string; index: number }
export interface InflationInput {
  amount: number;
  startPeriod: string;
  endPeriod: string;
  series: PriceIndexPoint[];
}
export interface InflationResult {
  adjustedAmount: number;
  cumulativeInflationPercent: number;
  purchasingPowerRatio: number;
  startIndex: number;
  endIndex: number;
}

export function calculateInflationAdjustment(input: InflationInput): InflationResult {
  assertFiniteNumber(input.amount, 'amount', 0);
  const map = new Map<string, number>();
  for (const point of input.series) {
    if (!point.period.trim()) throw new RangeError('Price-index period must not be blank.');
    assertFiniteNumber(point.index, `index.${point.period}`, 0.000001);
    if (map.has(point.period)) throw new RangeError(`Duplicate price-index period: ${point.period}.`);
    map.set(point.period, point.index);
  }
  const startIndex = map.get(input.startPeriod);
  const endIndex = map.get(input.endPeriod);
  if (startIndex == null || endIndex == null) throw new RangeError('Selected period is not available in the supplied price-index series.');
  assertFiniteNumber(startIndex, 'startIndex', 0.000001);
  assertFiniteNumber(endIndex, 'endIndex', 0.000001);
  const ratio = endIndex / startIndex;
  return {
    adjustedAmount: input.amount * ratio,
    cumulativeInflationPercent: (ratio - 1) * 100,
    purchasingPowerRatio: startIndex / endIndex,
    startIndex,
    endIndex,
  };
}
