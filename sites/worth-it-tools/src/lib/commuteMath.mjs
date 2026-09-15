// Pure, finite-safe calculations shared by the commute calculators and tests.
// Inputs are deliberately bounded so malformed browser values cannot overflow
// the result or make the UI render Infinity/NaN.
export const MAX_INPUT = 1e9;
export const KILOMETERS_PER_MILE = 1.609344;
export const LITERS_PER_GALLON = 3.785411784;
export const IMPERIAL_EFFICIENCY_CONVERSION = 235.214583;

export function finiteNonNegative(value, max = MAX_INPUT) {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return 0;
  return Math.min(numeric, max);
}

export function safeAdd(...values) {
  const total = values.reduce((sum, value) => sum + finiteNonNegative(value), 0);
  return Number.isFinite(total) ? Math.min(total, Number.MAX_SAFE_INTEGER) : Number.MAX_SAFE_INTEGER;
}

export function safeMultiply(...values) {
  let total = 1;
  for (const value of values) {
    const numeric = finiteNonNegative(value);
    if (numeric === 0) return 0;
    total *= numeric;
    if (!Number.isFinite(total)) return Number.MAX_SAFE_INTEGER;
  }
  return Math.min(total, Number.MAX_SAFE_INTEGER);
}

export function safeDivide(numerator, denominator) {
  const top = finiteNonNegative(numerator);
  const bottom = finiteNonNegative(denominator);
  if (top === 0 || bottom === 0) return 0;
  const quotient = top / bottom;
  return Number.isFinite(quotient) ? Math.min(quotient, Number.MAX_SAFE_INTEGER) : Number.MAX_SAFE_INTEGER;
}

export function deriveDrivingRate({
  unit,
  mode,
  directCost = 0,
  fuelEfficiency = 0,
  fuelPrice = 0,
  evEfficiency = 0,
  electricityPrice = 0,
}) {
  if (mode === 'direct') return finiteNonNegative(directCost);
  if (mode === 'fuel') {
    const efficiency = finiteNonNegative(fuelEfficiency);
    if (efficiency === 0) return 0;
    return unit === 'imperial'
      ? safeDivide(fuelPrice, efficiency)
      : safeDivide(safeMultiply(fuelEfficiency, fuelPrice), 100);
  }
  return safeDivide(safeMultiply(evEfficiency, electricityPrice), 100);
}

export function timeCostPerMonth({ minutesOneWay = 0, workdays = 0, wage = 0 }) {
  return safeDivide(safeMultiply(minutesOneWay, 2, workdays, wage), 60);
}

export function buildModeCost({
  name,
  distanceOneWay = 0,
  workdays = 0,
  rate = 0,
  monthlyFixed = 0,
  oneWayFare = 0,
  monthlyPass = 0,
  minutesOneWay = 0,
  wage = 0,
}) {
  const distance = finiteNonNegative(distanceOneWay);
  const days = finiteNonNegative(workdays);
  const distanceDirect = safeMultiply(distance, 2, days, rate);
  const fareDirect = safeMultiply(oneWayFare, 2, days);
  const fixed = safeAdd(monthlyFixed, monthlyPass);
  const direct = safeAdd(distanceDirect, fareDirect, fixed);
  const time = timeCostPerMonth({ minutesOneWay, workdays: days, wage });
  const total = safeAdd(direct, time);
  const perDay = safeDivide(total, days);
  const monthlyDistance = safeMultiply(distance, 2, days);

  return {
    name,
    direct,
    time,
    total,
    perTrip: perDay,
    perDay,
    perMonth: total,
    perYear: safeMultiply(total, 12),
    perDistance: safeDivide(total, monthlyDistance),
  };
}

export function calculateRtoAnnual({
  weeklyOfficeDays = 0,
  distanceOneWay = 0,
  rate = 0,
  monthlyFixed = 0,
  minutesOneWay = 0,
  wage = 0,
  baselineWorkdaysPerMonth = 20,
}) {
  const officeDays = Math.min(finiteNonNegative(weeklyOfficeDays), 7);
  const baselineDays = finiteNonNegative(baselineWorkdaysPerMonth);
  const dailyDistanceCost = safeMultiply(distanceOneWay, 2, rate);
  const dailyFixedCost = safeDivide(monthlyFixed, baselineDays);
  const dailyTimeCost = safeDivide(safeMultiply(minutesOneWay, 2, wage), 60);
  return safeMultiply(officeDays, 52, safeAdd(dailyDistanceCost, dailyFixedCost, dailyTimeCost));
}
