import type { Metadata } from 'next';
import TestRunner from '@/components/TestRunner';
import { getTest } from '@/config/tests';
import { microUnit5Questions, microUnit5TopicTitles } from '@/data/questions-micro-unit5';
import { pageMetadata } from '@/lib/seo';

const SLUG = 'ap-microeconomics-unit-5';

export const metadata: Metadata = pageMetadata({
  title: 'Free AP® Microeconomics Unit 5 Practice Test',
  description:
    'Fifteen exam-style questions on factor markets: derived demand, marginal revenue product, how many workers ' +
    'to hire, the least-cost mix of inputs, monopsony and the minimum wage. Free, no account needed.',
  path: '/practice-test/ap-microeconomics/unit-5',
  image: `/og/${SLUG}.png`,
});

export default function Page() {
  const test = getTest(SLUG);
  if (!test) throw new Error(`Test definition missing: ${SLUG}`);

  return (
    <main className="mx-auto flex w-full max-w-reading flex-col px-5 py-10 sm:px-8 sm:py-14">
      <TestRunner
        test={test}
        questions={microUnit5Questions}
        topicTitles={microUnit5TopicTitles}
      />
    </main>
  );
}
