import type { Metadata } from 'next';
import TestRunner from '@/components/TestRunner';
import { getTest } from '@/config/tests';
import { microUnit2Questions, microUnit2TopicTitles } from '@/data/questions-micro-unit2';

const SLUG = 'ap-microeconomics-unit-2';

export const metadata: Metadata = {
  title: 'Free AP® Microeconomics Unit 2 Practice Test',
  description:
    'Twenty exam-style questions on supply and demand: shifts, elasticity, consumer and producer surplus, price ' +
    'controls, taxes and international trade. Free, no account needed.',
};

export default function Page() {
  const test = getTest(SLUG);
  if (!test) throw new Error(`Test definition missing: ${SLUG}`);

  return (
    <main className="mx-auto flex w-full max-w-reading flex-col px-5 py-10 sm:px-8 sm:py-14">
      <TestRunner
        test={test}
        questions={microUnit2Questions}
        topicTitles={microUnit2TopicTitles}
      />
    </main>
  );
}
