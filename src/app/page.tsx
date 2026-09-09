import Link from 'next/link';
import Portrait from '@/components/Portrait';
import Reg from '@/components/Reg';
import { CTA } from '@/config/cta';
import { TEACHER } from '@/config/teacher';
import { TESTS } from '@/config/tests';

/**
 * Раздел с заголовком в боковой колонке.
 *
 * На широком экране заголовок уходит влево, содержимое занимает остальное
 * место. Так строка прозы остаётся читаемой (около 70 знаков), но страница
 * перестаёт быть узкой полосой посреди монитора: слева теперь заголовок,
 * а не воздух. Ниже 1024px колонки схлопываются в привычный порядок —
 * заголовок сверху, содержимое под ним.
 */
function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-x-10 gap-y-4 border-t border-rule pt-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:pt-12 xl:gap-x-12">
      <div className="flex flex-col gap-1.5">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-balance font-serif text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
          <Reg>{title}</Reg>
        </h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default function Home() {
  const firstTest = TESTS[0];

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:gap-12 lg:py-20">
      {/* Портрет и заголовок — в одной строке на широком экране, портрет
          сверху на узком: доверие к преподавателю начинается с лица. */}
      <header className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_13rem] md:items-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-14">
        <div className="flex justify-center md:col-start-2 md:row-start-1 md:justify-end">
          <Portrait />
        </div>

        <div className="flex flex-col gap-5 md:col-start-1 md:row-start-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ochre">
            {TEACHER.brand} · <Reg>AP® Economics</Reg>
          </p>
          {/* text-balance выравнивает строки заголовка по длине — иначе
              последнее слово повисает в одиночестве на своей строке. */}
          <h1 className="text-balance font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.015em] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]">
            <Reg>{TEACHER.homeHeadline}</Reg>
          </h1>
          <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
            {TEACHER.homeSubhead}
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <Link
              href={firstTest.href}
              className="w-full rounded bg-ink px-6 py-4 text-center text-base font-semibold text-ground hover:opacity-90 sm:w-fit"
            >
              Start the free test
            </Link>
            <p className="text-[13px] text-ink-mute">
              {firstTest.questionCount} questions · about {firstTest.estimatedMinutes} minutes · no
              account needed
            </p>
          </div>
        </div>
      </header>

      <Section eyebrow="Free, no account" title="Practice tests">
        <ul className="flex flex-col gap-3">
          {TESTS.map((test) => (
            <li key={test.slug}>
              <Link
                href={test.href}
                className="flex flex-col gap-2 rounded border border-rule bg-surface p-5 transition-colors hover:border-ochre-soft sm:flex-row sm:items-center sm:gap-6 sm:p-6"
              >
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="font-serif text-xl font-semibold">{test.shortTitle}</span>
                  <span className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
                    {test.blurb}
                  </span>
                  <span className="mt-1 font-mono text-[12px] text-ink-mute">
                    {test.questionCount} questions · ~{test.estimatedMinutes} min
                  </span>
                </span>
                {/* Стрелка держит правый край карточки: на широком экране
                    иначе остаётся пустая половина без назначения. */}
                <span className="shrink-0 whitespace-nowrap text-[14px] font-semibold text-ochre sm:ml-auto">
                  Start →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={TEACHER.outcomesHeading}>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {TEACHER.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" />
              <span>
                <Reg>{outcome}</Reg>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Раздел адресован родителю прямо и назван так же прямо: подросток не
          должен читать про «своего ребёнка». Построен как разговор, а не как
          призыв: узнаваемая картина (её текст с её сайта) → почему её не
          видно по школьным оценкам → бесплатный способ проверить → и только
          потом разговор. Главное действие здесь — тест: он ничего не стоит
          родителю, не требует решения и сам создаёт повод для звонка. */}
      <Section eyebrow="For parents" title={TEACHER.parentHeadline}>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          <Reg>{TEACHER.parentPitch}</Reg>
        </p>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          <Reg>{TEACHER.parentBlindSpot}</Reg>
        </p>
        {/* Числа берутся из определения теста, чтобы обещание в тексте не
            разошлось с тем, что человек получит, когда тестов станет больше. */}
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          The free diagnostic answers that in about {firstTest.estimatedMinutes} minutes:{' '}
          {firstTest.questionCount} exam-style questions, then a breakdown of exactly which topics
          are costing marks. No account, nothing to pay, and no call unless you ask for one.
        </p>

        <div className="flex flex-col gap-3 pt-1">
          {/* Контурная кнопка, а не сплошная: главное действие на странице
              одно, и оно в шапке. Здесь — тот же путь для того, кто дочитал
              досюда и не хочет возвращаться наверх. */}
          <Link
            href={firstTest.href}
            className="w-full rounded border border-ink px-5 py-3.5 text-center text-[15px] font-semibold transition-colors hover:bg-surface sm:w-fit"
          >
            Send the free test to your child
          </Link>
          <p className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
            {TEACHER.parentSessionOffer} Write to me at{' '}
            <a
              href={`mailto:${CTA.email}`}
              className="font-medium text-ochre underline underline-offset-2"
            >
              {CTA.email}
            </a>
            .
          </p>
        </div>
      </Section>

      <Section title={`About ${TEACHER.name}`}>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          I have spent more than ten years teaching economics and preparing students for{' '}
          <Reg>AP® Microeconomics</Reg> and <Reg>AP® Macroeconomics</Reg>, and have helped hundreds
          of students build real economic thinking, achieve high <Reg>AP®</Reg> scores, and
          strengthen their university applications.
        </p>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          {TEACHER.approach}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-[14px]">
          <a
            href={`mailto:${CTA.email}`}
            className="font-medium text-ochre underline underline-offset-2"
          >
            {CTA.email}
          </a>
          <a
            href={TEACHER.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ochre underline underline-offset-2"
          >
            Instagram
          </a>
          <a
            href={TEACHER.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ochre underline underline-offset-2"
          >
            Facebook
          </a>
        </div>
      </Section>
    </main>
  );
}
