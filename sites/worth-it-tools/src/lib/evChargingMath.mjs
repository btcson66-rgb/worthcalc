import { safeNonNegative } from './applianceMath.mjs';

export function calculateSimpleEvCharging({
  efficiencyKwhPer100Km,
  monthlyKm,
  homeRate,
  publicRate,
  homeEquipmentCost,
}) {
  const efficiency = safeNonNegative(efficiencyKwhPer100Km);
  const distance = safeNonNegative(monthlyKm);
  const home = safeNonNegative(homeRate);
  const publicCharging = safeNonNegative(publicRate);
  const equipment = safeNonNegative(homeEquipmentCost);
  const monthlyKwh = (efficiency * distance) / 100;
  const homeMonthly = monthlyKwh * home;
  const publicMonthly = monthlyKwh * publicCharging;
  const monthlySavings = publicMonthly - homeMonthly;
  return {
    monthlyKwh,
    homeMonthly,
    publicMonthly,
    homeAnnual: homeMonthly * 12,
    publicAnnual: publicMonthly * 12,
    homePerKwh: home,
    publicPerKwh: publicCharging,
    monthlySavings,
    paybackMonths: monthlySavings > 0 ? equipment / monthlySavings : Number.POSITIVE_INFINITY,
  };
}
