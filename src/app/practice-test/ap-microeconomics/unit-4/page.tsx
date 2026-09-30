import type { Metadata } from 'next';
import TestRunner from '@/components/TestRunner';
import { getTest } from '@/config/tests';
import { microUnit4Questions, microUnit4TopicTitles } from '@/data/questions-micro-unit4';
import { pageMetadata } from '@/lib/seo';

const SLUG = 'ap-microeconomics-unit-4';

export const metadata: Metadata = pageMetadata({
  title: 'Free AP® Microeconomics Unit 4 Practice Test',
  description:
    'Twenty exam-style questions on monopoly, price discrimination, monopolistic competition, oligopoly and game ' +
    'theory: profit maximisation, deadweight loss, excess capacity and dominant strategies. Free, no account needed.',
  path: '/practice-test/ap-microeconomics/unit-4',
  image: `/og/${SLUG}.png`,
});

export default function Page() {
  const test = getTest(SLUG);
  if (!test) throw new Error(`Test definition missing: ${SLUG}`);

  return (
    <main className="mx-auto flex w-full max-w-reading flex-col px-5 py-10 sm:px-8 sm:py-14">
      <TestRunner
        test={test}
        questions={microUnit4Questions}
        topicTitles={microUnit4TopicTitles}
      />
    </main>
  );
}
