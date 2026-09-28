import assert from 'node:assert/strict';
import { test } from 'node:test';
import { MICRO_UNITS, unitWeight } from '../config/exam-units.ts';
import { WEEK_OPTIONS, buildPlan } from './study-plan.ts';

test('в плане столько недель, сколько запрошено, и последняя — пробник', () => {
  for (const weeks of WEEK_OPTIONS) {
    const plan = buildPlan(weeks, MICRO_UNITS);
    assert.equal(plan.length, weeks, `${weeks} недель`);
    assert.equal(plan.at(-1)?.isFinal, true);
    assert.deepEqual(plan.at(-1)?.units, []);
    assert.deepEqual(
      plan.map((w) => w.number),
      Array.from({ length: weeks }, (_, i) => i + 1),
    );
  }
});

test('каждый юнит попадает хотя бы в одну неделю при любом сроке', () => {
  for (const weeks of WEEK_OPTIONS) {
    const covered = new Set(buildPlan(weeks, MICRO_UNITS).flatMap((w) => w.units.map((u) => u.unit.number)));
    for (const unit of MICRO_UNITS) {
      assert.ok(covered.has(unit.number), `${weeks} недель: юнит ${unit.number} потерян`);
    }
  }
});

test('юниты идут по порядку и не возвращаются', () => {
  for (const weeks of WEEK_OPTIONS) {
    const seen = buildPlan(weeks, MICRO_UNITS).flatMap((w) => w.units.map((u) => u.unit.number));
    for (let i = 1; i < seen.length; i++) assert.ok(seen[i] >= seen[i - 1], `${weeks}: ${seen}`);
  }
});

test('тяжёлый юнит получает не меньше недель, чем лёгкий', () => {
  const plan = buildPlan(12, MICRO_UNITS);
  const weeksPer = (n: number) => plan.filter((w) => w.units.some((u) => u.unit.number === n)).length;
  const sorted = [...MICRO_UNITS].sort((a, b) => unitWeight(b) - unitWeight(a));
  const heaviest = sorted[0].number;
  const lightest = sorted.at(-1)!.number;
  assert.ok(
    weeksPer(heaviest) >= weeksPer(lightest),
    `юнит ${heaviest} (${weeksPer(heaviest)} нед.) против юнита ${lightest} (${weeksPer(lightest)} нед.)`,
  );
});

test('каждый юнит заканчивается ровно один раз', () => {
  for (const weeks of WEEK_OPTIONS) {
    const finished = buildPlan(weeks, MICRO_UNITS)
      .flatMap((w) => w.units)
      .filter((u) => u.finishes)
      .map((u) => u.unit.number);
    assert.deepEqual(
      finished,
      MICRO_UNITS.map((u) => u.number),
      `${weeks} недель: ${finished}`,
    );
  }
});

test('две недели — это одна учебная неделя на всё и одна на пробник', () => {
  const plan = buildPlan(2, MICRO_UNITS);
  assert.equal(plan.length, 2);
  assert.equal(plan[0].units.length, MICRO_UNITS.length);
  assert.equal(plan[1].isFinal, true);
});
