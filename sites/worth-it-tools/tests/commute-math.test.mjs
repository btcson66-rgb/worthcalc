import assert from 'node:assert/strict';
import test from 'node:test';
import {
  KILOMETERS_PER_MILE,
  buildModeCost,
  calculateRtoAnnual,
  deriveDrivingRate,
  finiteNonNegative,
  safeDivide,
} from '../src/lib/commuteMath.mjs';

const malformedValues = [undefined, '', 0, -1, Number.NaN, Number.POSITIVE_INFINITY, 1e300];

test('finiteNonNegative normalizes malformed and negative browser values', () => {
  for (const value of malformedValues) {
    assert.equal(Number.isFinite(finiteNonNegative(value)), true);
    assert.equal(finiteNonNegative(value) >= 0, true);
  }
  assert.equal(finiteNonNegative(1e300) <= 1e9, true);
});

test('driving rates cover imperial, metric fuel, EV, and zero efficiency', () => {
  assert.equal(deriveDrivingRate({ unit: 'imperial', mode: 'fuel', fuelEfficiency: 25, fuelPrice: 4.157 }), 4.157 / 25);
  assert.equal(deriveDrivingRate({ unit: 'metric', mode: 'fuel', fuelEfficiency: 6.5, fuelPrice: 32.7 }), 6.5 * 32.7 / 100);
  assert.equal(deriveDrivingRate({ unit: 'metric', mode: 'ev', evEfficiency: 15, electricityPrice: 3.8 }), 15 * 3.8 / 100);
  assert.equal(deriveDrivingRate({ unit: 'metric', mode: 'fuel', fuelEfficiency: 0, fuelPrice: 32.7 }), 0);
});

test('mode breakdowns always return finite outputs at boundaries', () => {
  for (const value of malformedValues) {
    const breakdown = buildModeCost({
      name: 'Boundary',
      distanceOneWay: value,
      workdays: value,
      rate: value,
      monthlyFixed: value,
      oneWayFare: value,
      monthlyPass: value,
      minutesOneWay: value,
      wage: value,
    });
    for (const output of Object.values(breakdown).filter((entry) => typeof entry === 'number')) {
      assert.equal(Number.isFinite(output), true, `non-finite output for ${String(value)}`);
    }
  }
});

test('RTO annual comparison is zero for remote baseline and finite for seven days', () => {
  assert.equal(calculateRtoAnnual({ weeklyOfficeDays: 0, distanceOneWay: 20, rate: 2, monthlyFixed: 200, minutesOneWay: 30, wage: 20 }), 0);
  const annual = calculateRtoAnnual({ weeklyOfficeDays: 7, distanceOneWay: 20, rate: 2, monthlyFixed: 200, minutesOneWay: 30, wage: 20 });
  assert.equal(Number.isFinite(annual), true);
  assert.equal(annual > 0, true);
});

test('mile and kilometer distance rates preserve a round trip', () => {
  const miles = 15;
  const kilometers = miles * KILOMETERS_PER_MILE;
  const imperialRate = deriveDrivingRate({ unit: 'imperial', mode: 'fuel', fuelEfficiency: 25, fuelPrice: 4.157 });
  const metricRate = deriveDrivingRate({ unit: 'metric', mode: 'fuel', fuelEfficiency: 6.5, fuelPrice: 32.7 });
  assert.equal(safeDivide(miles * imperialRate, kilometers), safeDivide(imperialRate, KILOMETERS_PER_MILE));
  assert.equal(Number.isFinite(metricRate), true);
});
