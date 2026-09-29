import type { Metadata } from 'next';
import Link from 'next/link';
import BookButton from '@/components/BookButton';
import Reg from '@/components/Reg';
import Section from '@/components/Section';
import StudyPlan from '@/components/StudyPlan';
import { TeacherByline } from '@/components/TeacherCard';
import { MICRO_UNITS } from '@/config/exam-units';
import { pageMetadata } from '@/lib/seo';
import { whatsappGeneral } from '@/lib/contact-links';

/**
 * /ap-microeconomics-study-plan — сколько осталось недель, столько и плана.
 *
 * ЗАЧЕМ. «AP study plan» и «AP exam study schedule» ищут круглый год, а не
 * только весной, и больших сайтов на этом запросе заметно меньше, чем на
 * калькуляторе баллов. Для нас у страницы есть второе дно: её результат —
 * это список наших же диагностик, расставленных по неделям. То есть страница
 * не просто отвечает на запрос, а сама ведёт в воронку.
 *
 * ПОЧЕМУ ПЛАН ЧЕСТНО НАЗВАН ШАБЛОНОМ. Он не знает, что уже пройдено в школе и
 * сколько у человека времени в день. Обещать «персональный план» значит
 * обещать то, чего страница не делает.
 */

const PATH = '/ap-microeconomics-study-plan';

export const metadata: Metadata = pageMetadata({
  title: 'AP® Microeconomics Study Plan',
  description:
    'An AP® Microeconomics study plan for however long you have left — from a full 30 weeks down to two. ' +
    'Units weighted by how much of the exam they carry, with a free diagnostic for each.',
  path: PATH,
  image: '/og/study-plan.png',
  ogTitle: 'AP® Microeconomics Study Plan',
});

export default function StudyPlanPage() {
  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:gap-12 lg:py-20">
      <header className="flex flex-col gap-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ochre">
          Free · no account needed
        </p>
        <h1 className="text-balance font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.015em] sm:text-[2.75rem] lg:text-[3.25rem]">
          <Reg>AP® Microeconomics study plan</Reg>
        </h1>
        <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
          Say how long you have left. A month out, the plan is a week-by-week sprint. A term out,
          it is something better: catching each gap in the week it appears, while there is still
          time to fix it properly.
        </p>
        <div className="pt-1">
          <TeacherByline />
        </div>
      </header>

      <StudyPlan />

      <Section eyebrow="Why it changes shape" title="Starting early is not more revision">
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          The exam is in May. Someone starting in the autumn has not been taught half the course
          yet, so there is nothing for them to revise — and a plan that hands them five weeks on
          Unit 1 is inventing work. What an early start actually buys is different: every gap gets
          found in the week the class creates it, when fixing it costs an evening rather than a
          weekend of April you needed for something else.
        </p>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          So the plan has two shapes. From thirteen weeks out it is one block of work alongside the
          course, and then the last nine weeks turn into week-by-week revision. Twelve weeks or
          fewer, it is week-by-week from the start.
        </p>
      </Section>

      <Section eyebrow="How it is built" title="Time goes where the marks are">
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          The six units do not carry equal weight on the exam, so they do not get equal time here.
          Supply and demand, and production and costs, are worth roughly a quarter of the
          multiple-choice section each; factor markets and market failure together are worth about
          as much as either of them alone. The plan hands out weeks in those proportions.
        </p>
        <ul className="flex flex-col">
          {MICRO_UNITS.map((unit) => (
            <li
              key={unit.number}
              className="flex items-baseline justify-between gap-6 border-t border-rule py-2.5 text-[15px]"
            >
              <span>
                Unit {unit.number} · {unit.title}
              </span>
              <span className="whitespace-nowrap font-mono text-[14px] tabular-nums text-ink-mute">
                {unit.weightMin}–{unit.weightMax}%
              </span>
            </li>
          ))}
        </ul>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          Weightings are College Board’s own, for the multiple-choice section. This is a template,
          not a personal schedule: it does not know what your class has already covered or how many
          hours a day you have. Shift the weeks around to fit.
        </p>
      </Section>

      <Section eyebrow="Next" title="Start where the marks are leaking">
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          Whatever the plan says, the first useful move is finding out which topics are actually
          costing you marks. Each diagnostic takes under half an hour and ends with that list — and
          an explanation of every question, including why the answer you picked looked right.
        </p>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
          <Link
            href="/practice-test/ap-microeconomics"
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
