import type { Metadata } from 'next';
import TestRunner from '@/components/TestRunner';
import { getTest } from '@/config/tests';
import { microUnit1Questions, microUnit1TopicTitles } from '@/data/questions-micro-unit1';
import { pageMetadata } from '@/lib/seo';

const SLUG = 'ap-microeconomics-unit-1';

/* Метаданные собраны через pageMetadata, а не руками: страницам тестов
   нужнее всего Open Graph, потому что именно их ссылку школьник отправляет
   родителю с экрана результатов. Имя файла карточки совпадает со слагом
   теста — их рисует scripts/og-images.mjs из того же каталога, так что
   новый юнит не может остаться без картинки незаметно. */
export const metadata: Metadata = pageMetadata({
  title: 'Free AP® Microeconomics Unit 1 Practice Test',
  description:
    'Fifteen exam-style questions on Unit 1: scarcity, the production possibilities curve, comparative advantage, cost-benefit and marginal analysis. Free, no account needed.',
  path: '/practice-test/ap-microeconomics/unit-1',
  image: `/og/${SLUG}.png`,
});

export default function Page() {
  const test = getTest(SLUG);
  if (!test) throw new Error(`Test definition missing: ${SLUG}`);

  return (
    <main className="mx-auto flex w-full max-w-reading flex-col px-5 py-10 sm:px-8 sm:py-14">
      <TestRunner
        test={test}
        questions={microUnit1Questions}
        topicTitles={microUnit1TopicTitles}
      />
    </main>
  );
}
