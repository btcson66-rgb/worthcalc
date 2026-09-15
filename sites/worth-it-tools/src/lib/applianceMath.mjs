const MAX_INPUT = 1e9;

export function safeNonNegative(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(MAX_INPUT, Math.max(0, numeric));
}

export function calculateApplianceCost({ watts, hoursPerDay, rate }) {
  const safeWatts = safeNonNegative(watts);
  const safeHours = safeNonNegative(hoursPerDay);
  const safeRate = safeNonNegative(rate);
  const perHour = (safeWatts / 1000) * safeRate;
  const perDay = perHour * safeHours;
  return {
    watts: safeWatts,
    hoursPerDay: safeHours,
    rate: safeRate,
    perHour,
    perDay,
    perMonth: perDay * 30,
    perYear: perDay * 365,
  };
}

export function rankAppliances(appliances, rate) {
  const safeRate = safeNonNegative(rate);
  return appliances
    .map((appliance) => ({
      ...appliance,
      cost: calculateApplianceCost({
        watts: appliance.default_watts,
        hoursPerDay: appliance.default_hours_per_day,
        rate: safeRate,
      }).perDay,
    }))
    .sort((left, right) => right.cost - left.cost || left.name.en.localeCompare(right.name.en));
}
