import assert from 'node:assert/strict';
import { test } from 'node:test';
import { MICRO_UNITS, unitWeight } from '../config/exam-units.ts';
import { WEEK_OPTIONS, buildPlan, buildSchedule } from './study-plan.ts';

/** Сроки, на которых план остаётся понедельным. */
const SHORT_OPTIONS = WEEK_OPTIONS.filter((w) => w <= 12);

test('в плане столько недель, сколько запрошено, и последняя — пробник', () => {
  for (const weeks of SHORT_OPTIONS) {
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
  for (const weeks of SHORT_OPTIONS) {
    const covered = new Set(buildPlan(weeks, MICRO_UNITS).flatMap((w) => w.units.map((u) => u.unit.number)));
    for (const unit of MICRO_UNITS) {
      assert.ok(covered.has(unit.number), `${weeks} недель: юнит ${unit.number} потерян`);
    }
  }
});

test('юниты идут по порядку и не возвращаются', () => {
  for (const weeks of SHORT_OPTIONS) {
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
  for (const weeks of SHORT_OPTIONS) {
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

test('короткий срок — только недели, без куска про курс', () => {
  for (const weeks of [2, 4, 8, 12]) {
    const s = buildSchedule(weeks, MICRO_UNITS);
    assert.equal(s.course, null, `${weeks} недель`);
    assert.equal(s.weeks.length, weeks);
  }
});

test('длинный срок: курс плюс девять недель повторения', () => {
  for (const weeks of [20, 30]) {
    const s = buildSchedule(weeks, MICRO_UNITS);
    assert.ok(s.course, `${weeks} недель: нет куска про курс`);
    assert.equal(s.course?.fromWeek, 1);
    assert.equal(s.course?.toWeek, weeks - 9);
    assert.equal(s.weeks.length, 9);
    assert.equal(s.weeks[0].number, weeks - 8, `${weeks}: первая неделя повторения`);
    assert.equal(s.weeks.at(-1)?.number, weeks, `${weeks}: последняя неделя`);
    assert.equal(s.weeks.at(-1)?.isFinal, true);
  }
});

test('недели до экзамена считаются верно на любом сроке', () => {
  for (const weeks of WEEK_OPTIONS) {
    const s = buildSchedule(weeks, MICRO_UNITS);
    for (const w of s.weeks) {
      assert.equal(w.weeksLeft, weeks - w.number + 1, `${weeks} недель, неделя ${w.number}`);
    }
    assert.equal(s.weeks.at(-1)?.weeksLeft, 1);
  }
});

test('на длинном сроке все юниты названы в куске про курс', () => {
  const s = buildSchedule(30, MICRO_UNITS);
  assert.deepEqual(
    s.course?.units.map((u) => u.number),
    MICRO_UNITS.map((u) => u.number),
  );
});
