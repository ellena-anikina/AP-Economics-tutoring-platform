import type { Metadata } from 'next';
import Reg from '@/components/Reg';
import Section from '@/components/Section';
import { TeacherByline } from '@/components/TeacherCard';
import TestCard from '@/components/TestCard';
import { getTestsByExam } from '@/config/tests';

/**
 * Страница экзамена: все тесты по AP® Microeconomics.
 *
 * Раньше здесь стоял редирект на первый юнит. Пока тест был один, это было
 * честно; с двумя — уже нет: человек просил «все тесты по AP Micro», а
 * получал один, не узнав про второй. Люди к тому же обрезают URL руками.
 *
 * Вторая причина важнее первой. «AP Microeconomics practice test» ищут в разы
 * чаще, чем «AP Micro Unit 1 practice test», и редирект выбрасывал ровно ту
 * страницу, которая под этот запрос и нужна. Отсюда же блок про устройство
 * экзамена: он отвечает на вопрос, с которым сюда приходят из поиска.
 *
 * Цифры формата сверены по apcentral.collegeboard.org и должны сверяться
 * заново перед каждым учебным годом.
 */
export const metadata: Metadata = {
  title: 'Free AP® Microeconomics Practice Tests',
  description:
    'Free diagnostic tests for AP® Microeconomics, written by a college economics instructor. Each one covers a ' +
    'single unit and ends with a breakdown of which topics are costing you marks. No account needed.',
};

const EXAM_FORMAT = [
  {
    section: 'Section I · Multiple choice',
    detail: '60 questions · 1 hour 10 minutes',
    weight: '66% of the score',
  },
  {
    section: 'Section II · Free response',
    detail: '3 questions · 1 hour, including a 10-minute reading period',
    weight: '33% of the score',
  },
];

export default function ExamIndex() {
  const tests = getTestsByExam('ap-microeconomics');
  const totalQuestions = tests.reduce((sum, t) => sum + t.questionCount, 0);

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:gap-12 lg:py-20">
      <header className="flex flex-col gap-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ochre">
          Free · no account needed
        </p>
        <h1 className="text-balance font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.015em] sm:text-[2.75rem] lg:text-[3.25rem]">
          <Reg>AP® Microeconomics practice tests</Reg>
        </h1>
        <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
          {totalQuestions} exam-style questions across {tests.length} units. Each test ends with a
          breakdown of which topics are costing you marks — and an explanation of every question,
          including why the answer you picked looked right.
        </p>
        <div className="pt-1">
          <TeacherByline />
        </div>
      </header>

      <Section eyebrow="Start here" title="Choose a unit">
        <ul className="flex flex-col gap-3">
          {tests.map((test) => (
            <li key={test.slug}>
              <TestCard test={test} />
            </li>
          ))}
        </ul>
        {/* Сказано прямо, а не мелким шрифтом: тест по одному юниту не
            предсказывает балл, и обещать обратное было бы враньём. */}
        <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-mute">
          Each test covers one unit, so it shows where you stand in that unit rather than predicting
          an exam score. More units are being written.
        </p>
      </Section>

      <Section eyebrow="For reference" title="How the exam is built">
        <dl className="flex flex-col gap-px overflow-hidden rounded border border-rule bg-rule">
          {EXAM_FORMAT.map((row) => (
            <div
              key={row.section}
              className="flex flex-col gap-1 bg-surface px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <dt className="text-[15px] font-medium sm:w-56 sm:shrink-0">{row.section}</dt>
              <dd className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="text-[15px] leading-relaxed text-ink-soft">{row.detail}</span>
                <span className="whitespace-nowrap font-mono text-[12px] text-ink-mute">
                  {row.weight}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
          The free-response section is one long question, worth half of that section, and two short
          ones worth a quarter each. Those answers are handwritten in a paper booklet. The tests on
          this page are multiple choice — the section worth two thirds of the score.
        </p>
      </Section>
    </main>
  );
}
