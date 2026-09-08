import type { Metadata } from 'next';
import TestRunner from '@/components/TestRunner';
import { getTest } from '@/config/tests';
import { microUnit1Questions, microUnit1TopicTitles } from '@/data/questions-micro-unit1';

const SLUG = 'ap-microeconomics-unit-1';

export const metadata: Metadata = {
  title: 'Free AP® Microeconomics Unit 1 Practice Test',
  description:
    'Fifteen exam-style questions on Unit 1: scarcity, the production possibilities curve, comparative advantage, cost-benefit and marginal analysis. Free, no account needed.',
};

export default function Page() {
  const test = getTest(SLUG);
  if (!test) throw new Error(`Test definition missing: ${SLUG}`);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-5 py-10 sm:py-14">
      <TestRunner
        test={test}
        questions={microUnit1Questions}
        topicTitles={microUnit1TopicTitles}
      />
    </main>
  );
}
