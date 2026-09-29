import type { Metadata } from 'next';
import Link from 'next/link';
import BookButton from '@/components/BookButton';
import Reg from '@/components/Reg';
import ScoreCalculator from '@/components/ScoreCalculator';
import Section from '@/components/Section';
import { TeacherByline } from '@/components/TeacherCard';
import { BANDS, COMPOSITE_MAX, DISTRIBUTION, MCQ_COUNT } from '@/config/exam-scoring';
import { TESTS } from '@/config/tests';
import { pageMetadata } from '@/lib/seo';
import { whatsappGeneral } from '@/lib/contact-links';

/**
 * /ap-microeconomics-score-calculator — сырые баллы за пробник в оценку 1–5.
 *
 * ЗАЧЕМ ЭТА СТРАНИЦА ЕСТЬ. «AP Microeconomics score calculator» — самый
 * частый запрос в нише, не связанный с самим предметом: отдельные страницы
 * под него держат Albert, Knowt, College Transitions и ещё несколько
 * сервисов. Намерение у запроса идеальное для нас: человек только что
 * прорешал пробник и хочет знать, тянет ли он на пятёрку. Это ровно то
 * обещание, которое стоит в заголовке главной.
 *
 * ЧЕМ ОНА ОТЛИЧАЕТСЯ ОТ ЧУЖИХ. Тремя вещами, и все три — честность.
 * Во-первых, шкала считается по официальным весам: тест — две трети оценки,
 * задачи — треть, поэтому композит 90, а не 100. У нескольких известных
 * калькуляторов шкала 100 и веса 60/40 — это расходится со страницей
 * экзамена на apcentral.
 * Во-вторых, мы прямо говорим, что пороги — оценка, а не официальная
 * таблица, и у границы не называем оценку одним числом.
 * В-третьих, показываем официальное распределение оценок: пятёрку получает
 * пятая часть сдающих, и это полезнее любого «ты молодец».
 *
 * ПОЧЕМУ АДРЕС В КОРНЕ, А НЕ ВНУТРИ /practice-test. Страницу ищут отдельно
 * от тестов, и короткий адрес со словами запроса читается и в выдаче, и в
 * переписке. Вложенность здесь не даёт ничего.
 */

const PATH = '/ap-microeconomics-score-calculator';

export const metadata: Metadata = pageMetadata({
  title: 'AP® Microeconomics Score Calculator',
  description:
    'Turn your practice-exam raw score into an estimated AP® Microeconomics score of 1–5. Official section ' +
    'weights, honest cut-offs, and what it would take to reach the next score.',
  path: PATH,
  image: '/og/score-calculator.png',
  ogTitle: 'AP® Microeconomics Score Calculator',
});

const FORMAT = [
  {
    section: 'Section I · Multiple choice',
    detail: `${MCQ_COUNT} questions · 1 hour 10 minutes`,
    weight: '66% of the exam score',
  },
  {
    section: 'Section II · Free response',
    detail: '3 questions · 1 hour, including a 10-minute reading period',
    weight: '33% of the exam score',
  },
];

export default function ScoreCalculatorPage() {
  const firstTest = TESTS[0];
  const examHref = `/practice-test/${firstTest.scope.exam}`;

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:gap-12 lg:py-20">
      <header className="flex flex-col gap-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ochre">
          Free · no account needed
        </p>
        <h1 className="text-balance font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.015em] sm:text-[2.75rem] lg:text-[3.25rem]">
          <Reg>AP® Microeconomics score calculator</Reg>
        </h1>
        <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
          Put in what you got on a practice exam and see the score it points to — and exactly how
          much further you would have to go for the next one.
        </p>
        <div className="pt-1">
          <TeacherByline />
        </div>
      </header>

      <ScoreCalculator />

      <Section eyebrow="Official" title="How the exam is scored">
        <ul className="flex flex-col">
          {FORMAT.map((row) => (
            <li
              key={row.section}
              className="flex flex-col gap-1 border-t border-rule py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="text-[15px] font-semibold">{row.section}</span>
              <span className="text-[15px] text-ink-soft sm:text-right">
                {row.detail}
                <span className="block text-[13px] text-ink-mute">{row.weight}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          Inside Section II the long question is worth half the section and the two short questions
          a quarter each, which is why this calculator scores them out of 10, 5 and 5. To keep the
          official two-to-one split between the sections, every free-response point counts for one
          and a half points of the {COMPOSITE_MAX}-point composite, and every right multiple-choice
          answer for one.
        </p>
      </Section>

      <Section eyebrow="Honest" title="Why the cut-offs are an estimate">
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          College Board does not publish the table that turns a raw score into a 1–5, and it is not
          the same table every year: papers differ in difficulty and the boundaries move with them.
          Every calculator you will find, including this one, is showing you an estimate.
        </p>
        <ul className="flex flex-col">
          {BANDS.map((b) => (
            <li
              key={b.score}
              className="flex items-baseline justify-between gap-6 border-t border-rule py-2.5 text-[15px]"
            >
              <span className="font-semibold">Score {b.score}</span>
              <span className="font-mono text-[14px] tabular-nums text-ink-soft">
                {b.min}
                {b.score === 5 ? `–${COMPOSITE_MAX}` : `–${(BANDS.find((x) => x.score === b.score + 1)?.min ?? 0) - 1}`}
              </span>
            </li>
          ))}
        </ul>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          Within three points of a boundary this page will not name a single score, because the
          boundary itself is not that precise. Treat the number as a direction, not a verdict.
        </p>
      </Section>

      <Section eyebrow={`College Board, ${DISTRIBUTION.year}`} title="What a 5 actually takes">
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          Of the {DISTRIBUTION.students.toLocaleString('en-US')} students who sat{' '}
          <Reg>AP® Microeconomics</Reg> in {DISTRIBUTION.year}, this is how the scores fell. The
          mean was {DISTRIBUTION.mean}, and {DISTRIBUTION.passRate}% scored 3 or higher.
        </p>
        <ul className="flex flex-col">
          {DISTRIBUTION.shares.map((row) => (
            <li key={row.score} className="flex flex-col gap-1.5 border-t border-rule py-3">
              <div className="flex items-baseline justify-between gap-4 text-[15px]">
                <span className="font-semibold">Score {row.score}</span>
                <span className="font-mono text-[14px] tabular-nums text-ink-mute">
                  {row.share}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-alt">
                <div
                  className={`h-full rounded-full ${row.score === 5 ? 'bg-ochre' : 'bg-ink-soft'}`}
                  style={{ width: `${row.share * 3}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Next" title="A 3 is a diagnosis, not a verdict">
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          A composite score tells you where you stand; it does not tell you which topics took the
          marks away. The free diagnostics do: {TESTS.length} unit tests, each ending with a
          breakdown of the topics costing you the most, and an explanation of every question —
          including why the answer you picked looked right.
        </p>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
          <Link
            href={examHref}
            className="w-full rounded border border-ink px-5 py-3.5 text-center text-[15px] font-semibold transition-colors hover:bg-surface sm:w-fit"
          >
            Take a free diagnostic
          </Link>
          <BookButton href={whatsappGeneral()} size="md" full />
        </div>
      </Section>
    </main>
  );
}
