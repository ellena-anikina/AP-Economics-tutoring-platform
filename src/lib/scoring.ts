import type {
  Attempt,
  Question,
  SkillResult,
  SkillTag,
  TestResult,
  TopicResult,
} from '@/types';

const SKILL_ORDER: SkillTag[] = ['conceptual', 'calculation', 'graphing', 'analysis'];

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/**
 * Считает результат попытки.
 *
 * priority = (1 − доля верных) × вес темы в тесте. Наверх выходят не просто
 * слабые темы, а слабые и при этом весомые — то есть те, что реально стоят
 * баллов. Это единственное место, где считается «что тебе стоит баллов».
 */
export function scoreAttempt(
  attempt: Attempt,
  questions: Question[],
  topicTitles: Record<string, string>,
): TestResult {
  const total = questions.length;
  let correct = 0;
  let answered = 0;

  const byTopic = new Map<string, { correct: number; total: number }>();
  const bySkill = new Map<SkillTag, { correct: number; total: number }>();
  const times: number[] = [];
  let totalSeconds = 0;

  for (const q of questions) {
    const record = attempt.answers[q.id];
    const picked = record?.choiceId ?? null;
    const isCorrect = picked === q.correctChoiceId;

    if (picked !== null) answered += 1;
    if (isCorrect) correct += 1;

    const seconds = record?.seconds ?? 0;
    totalSeconds += seconds;
    if (seconds > 0) times.push(seconds);

    const topic = byTopic.get(q.topicId) ?? { correct: 0, total: 0 };
    topic.total += 1;
    if (isCorrect) topic.correct += 1;
    byTopic.set(q.topicId, topic);

    const skill = bySkill.get(q.skill) ?? { correct: 0, total: 0 };
    skill.total += 1;
    if (isCorrect) skill.correct += 1;
    bySkill.set(q.skill, skill);
  }

  const topics: TopicResult[] = [...byTopic.entries()]
    .map(([topicId, t]) => {
      const percent = t.total === 0 ? 0 : t.correct / t.total;
      const weight = total === 0 ? 0 : t.total / total;
      return {
        topicId,
        title: topicTitles[topicId] ?? topicId,
        correct: t.correct,
        total: t.total,
        percent,
        weight,
        priority: (1 - percent) * weight,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const weakestTopics = [...topics]
    .filter((t) => t.priority > 0)
    .sort((a, b) => b.priority - a.priority || a.percent - b.percent)
    .slice(0, 3);

  const skills: SkillResult[] = SKILL_ORDER.filter((s) => bySkill.has(s)).map((skill) => {
    const s = bySkill.get(skill)!;
    return { skill, correct: s.correct, total: s.total };
  });

  return {
    attemptId: attempt.id,
    testSlug: attempt.testSlug,
    correct,
    total,
    answered,
    percent: total === 0 ? 0 : correct / total,
    topics,
    weakestTopics,
    skills,
    medianSeconds: Math.round(median(times)),
    totalSeconds,
  };
}

/**
 * Сколько вопросов теста человек потерял на теме. Формулировка «здесь ты
 * теряешь примерно N из 15» понятнее школьнику, чем проценты.
 */
export function questionsLost(topic: TopicResult): number {
  return topic.total - topic.correct;
}
