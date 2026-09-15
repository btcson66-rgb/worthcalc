import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateApplianceCost, rankAppliances, safeNonNegative } from '../src/lib/applianceMath.mjs';
import { calculateSimpleEvCharging } from '../src/lib/evChargingMath.mjs';

test('appliance cost converts W to kW and all requested periods', () => {
  const result = calculateApplianceCost({ watts: 1500, hoursPerDay: 4, rate: 0.2 });
  assert.equal(result.watts, 1500);
  assert.equal(result.hoursPerDay, 4);
  assert.equal(result.rate, 0.2);
  assert.ok(Math.abs(result.perHour - 0.3) < 1e-12);
  assert.ok(Math.abs(result.perDay - 1.2) < 1e-12);
  assert.ok(Math.abs(result.perMonth - 36) < 1e-12);
  assert.ok(Math.abs(result.perYear - 438) < 1e-12);
});

test('malformed, negative, infinite and excessive input is bounded without NaN', () => {
  for (const value of [undefined, null, 'nope', Number.NaN, Number.POSITIVE_INFINITY, -4, 1e20]) {
    assert.ok(Number.isFinite(safeNonNegative(value)));
    assert.ok(safeNonNegative(value) >= 0);
  }
  const result = calculateApplianceCost({ watts: Number.POSITIVE_INFINITY, hoursPerDay: -2, rate: 'bad' });
  assert.deepEqual(result, { watts: 0, hoursPerDay: 0, rate: 0, perHour: 0, perDay: 0, perMonth: 0, perYear: 0 });
});

test('ranking uses the same daily formula and does not hang on zero rate', () => {
  const appliances = [
    { id: 'low', name: { en: 'Low', zh: '低' }, default_watts: 10, default_hours_per_day: 1 },
    { id: 'high', name: { en: 'High', zh: '高' }, default_watts: 100, default_hours_per_day: 2 },
  ];
  assert.deepEqual(rankAppliances(appliances, 0).map((item) => item.id), ['high', 'low']);
  assert.deepEqual(rankAppliances(appliances, 0.2).map((item) => item.id), ['high', 'low']);
});

test('Taiwan EV charging boundary returns finite monthly and annual outputs', () => {
  const result = calculateSimpleEvCharging({ efficiencyKwhPer100Km: 16.5, monthlyKm: 1000, homeRate: 3.8, publicRate: 6.9, homeEquipmentCost: 30000 });
  assert.equal(result.monthlyKwh, 165);
  assert.equal(result.homeMonthly, 627);
  assert.equal(result.publicMonthly, 1138.5);
  assert.equal(result.homeAnnual, 7524);
  assert.equal(result.publicAnnual, 13662);
  assert.ok(Math.abs(result.paybackMonths - 58.651026392961874) < 1e-12);
});

test('Taiwan EV charging malformed and no-savings boundary is finite', () => {
  const result = calculateSimpleEvCharging({ efficiencyKwhPer100Km: Number.POSITIVE_INFINITY, monthlyKm: -1, homeRate: 5, publicRate: 4, homeEquipmentCost: 30000 });
  assert.deepEqual(result, { monthlyKwh: 0, homeMonthly: 0, publicMonthly: 0, homeAnnual: 0, publicAnnual: 0, homePerKwh: 5, publicPerKwh: 4, monthlySavings: 0, paybackMonths: Number.POSITIVE_INFINITY });
});
