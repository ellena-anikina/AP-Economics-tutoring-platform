import type { ExamId, TestDefinition } from '@/types';

/**
 * Каталог тестов. Добавление полного экзамена в мае — новая запись здесь
 * плюс вопросы в банк, без переписывания экранов.
 */
export const TESTS: TestDefinition[] = [
  {
    slug: 'ap-microeconomics-unit-1',
    href: '/practice-test/ap-microeconomics/unit-1',
    scope: { kind: 'unit', exam: 'ap-microeconomics', unitId: 'micro-1' },
    title: 'AP® Microeconomics · Unit 1',
    shortTitle: 'Unit 1 · Basic Economic Concepts',
    unitLabel: 'Unit 1',
    blurb:
      'Fifteen exam-style questions on scarcity, the production possibilities curve, comparative advantage, cost-benefit and marginal analysis.',
    questionCount: 15,
    estimatedMinutes: 25,
    timeLimitSeconds: null,
  },
  {
    slug: 'ap-microeconomics-unit-2',
    href: '/practice-test/ap-microeconomics/unit-2',
    scope: { kind: 'unit', exam: 'ap-microeconomics', unitId: 'micro-2' },
    title: 'AP® Microeconomics · Unit 2',
    shortTitle: 'Unit 2 · Supply and Demand',
    unitLabel: 'Unit 2',
    blurb:
      'Twenty exam-style questions on demand and supply, all four elasticities, consumer and producer surplus, ' +
      'price controls, taxes and international trade.',
    questionCount: 20,
    estimatedMinutes: 30,
    timeLimitSeconds: null,
  },
];

export function getTest(slug: string): TestDefinition | undefined {
  return TESTS.find((t) => t.slug === slug);
}

/** Тесты одного экзамена, в порядке юнитов. Страница экзамена не должна
 *  знать, какие ещё экзамены лежат в каталоге. */
export function getTestsByExam(exam: ExamId): TestDefinition[] {
  return TESTS.filter((t) => t.scope.exam === exam);
}
