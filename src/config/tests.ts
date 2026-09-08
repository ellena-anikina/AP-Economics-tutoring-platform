import type { TestDefinition } from '@/types';

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
    blurb:
      'Fifteen exam-style questions on scarcity, the production possibilities curve, comparative advantage, cost-benefit and marginal analysis.',
    questionCount: 15,
    estimatedMinutes: 25,
    timeLimitSeconds: null,
  },
];

export function getTest(slug: string): TestDefinition | undefined {
  return TESTS.find((t) => t.slug === slug);
}
