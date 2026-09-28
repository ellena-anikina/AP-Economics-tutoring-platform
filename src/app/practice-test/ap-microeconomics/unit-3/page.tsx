import type { Metadata } from 'next';
import TestRunner from '@/components/TestRunner';
import { getTest } from '@/config/tests';
import { microUnit3Questions, microUnit3TopicTitles } from '@/data/questions-micro-unit3';

const SLUG = 'ap-microeconomics-unit-3';

export const metadata: Metadata = {
  title: 'Free AP® Microeconomics Unit 3 Practice Test',
  description:
    'Twenty exam-style questions on production and costs, accounting and economic profit, profit maximisation, ' +
    'the shutdown rule and perfect competition. Free, no account needed.',
  alternates: { canonical: '/practice-test/ap-microeconomics/unit-3' },
};

export default function Page() {
  const test = getTest(SLUG);
  if (!test) throw new Error(`Test definition missing: ${SLUG}`);

  return (
    <main className="mx-auto flex w-full max-w-reading flex-col px-5 py-10 sm:px-8 sm:py-14">
      <TestRunner
        test={test}
        questions={microUnit3Questions}
        topicTitles={microUnit3TopicTitles}
      />
    </main>
  );
}
