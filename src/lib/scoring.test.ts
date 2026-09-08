import assert from 'node:assert/strict';
import { test } from 'node:test';
import { scoreAttempt } from './scoring.ts';
import type { Attempt, ChoiceId, Question } from '../types/index.ts';

const TITLES: Record<string, string> = { t1: 'Topic one', t2: 'Topic two' };

function q(id: string, topicId: string, correct: ChoiceId): Question {
  return {
    id,
    subject: 'micro',
    unitId: 'micro-1',
    topicId,
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 60,
    stem: 'stem',
    choices: (['A', 'B', 'C', 'D', 'E'] as ChoiceId[]).map((c) => ({ id: c, text: c })),
    correctChoiceId: correct,
    explanation: 'because',
    distractorNotes: {},
  };
}

/** 4 вопроса: тема t1 (3 вопроса, 1 верный), тема t2 (1 вопрос, верный). */
const QUESTIONS = [q('a', 't1', 'A'), q('b', 't1', 'B'), q('c', 't1', 'C'), q('d', 't2', 'D')];

function attempt(picks: Record<string, ChoiceId | null>, seconds: number[] = []): Attempt {
  const answers: Attempt['answers'] = {};
  Object.entries(picks).forEach(([id, choiceId], i) => {
    answers[id] = { choiceId, seconds: seconds[i] ?? 30, visits: 1 };
  });
  return { id: 'x', testSlug: 'demo', startedAt: 0, finishedAt: 1, answers };
}

test('считает верные ответы и процент', () => {
  const r = scoreAttempt(attempt({ a: 'A', b: 'E', c: 'E', d: 'D' }), QUESTIONS, TITLES);
  assert.equal(r.correct, 2);
  assert.equal(r.total, 4);
  assert.equal(r.answered, 4);
  assert.equal(r.percent, 0.5);
});

test('пропущенные вопросы не считаются верными, но уменьшают answered', () => {
  const r = scoreAttempt(attempt({ a: 'A', b: null, c: null, d: null }), QUESTIONS, TITLES);
  assert.equal(r.correct, 1);
  assert.equal(r.answered, 1);
});

test('разбивка по темам учитывает вес темы внутри теста', () => {
  const r = scoreAttempt(attempt({ a: 'A', b: 'E', c: 'E', d: 'D' }), QUESTIONS, TITLES);
  const t1 = r.topics.find((t) => t.topicId === 't1')!;
  const t2 = r.topics.find((t) => t.topicId === 't2')!;

  assert.equal(t1.correct, 1);
  assert.equal(t1.total, 3);
  assert.equal(t1.weight, 0.75);
  assert.ok(Math.abs(t1.priority - (1 - 1 / 3) * 0.75) < 1e-9);

  assert.equal(t2.percent, 1);
  assert.equal(t2.priority, 0, 'полностью верная тема не попадает в приоритет');
});

test('слабейшие темы отсортированы по priority и исключают безошибочные', () => {
  const r = scoreAttempt(attempt({ a: 'A', b: 'E', c: 'E', d: 'D' }), QUESTIONS, TITLES);
  assert.equal(r.weakestTopics.length, 1);
  assert.equal(r.weakestTopics[0].topicId, 't1');
});

test('маленькая слабая тема уступает большой такой же слабой', () => {
  // обе темы провалены полностью: t1 весит 3/4, t2 — 1/4
  const r = scoreAttempt(attempt({ a: 'E', b: 'E', c: 'E', d: 'E' }), QUESTIONS, TITLES);
  assert.deepEqual(
    r.weakestTopics.map((t) => t.topicId),
    ['t1', 't2'],
  );
});

test('медиана времени считается только по отвеченным вопросам', () => {
  const r = scoreAttempt(
    attempt({ a: 'A', b: 'B', c: 'C', d: 'D' }, [10, 20, 30, 0]),
    QUESTIONS,
    TITLES,
  );
  assert.equal(r.medianSeconds, 20);
  assert.equal(r.totalSeconds, 60);
});

test('пустая попытка не роняет расчёт', () => {
  const r = scoreAttempt(attempt({}), QUESTIONS, TITLES);
  assert.equal(r.correct, 0);
  assert.equal(r.answered, 0);
  assert.equal(r.percent, 0);
  assert.equal(r.medianSeconds, 0);
  assert.equal(r.weakestTopics.length, 2);
});
