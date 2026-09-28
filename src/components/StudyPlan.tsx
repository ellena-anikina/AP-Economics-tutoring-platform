'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MICRO_UNITS } from '@/config/exam-units';
import { TESTS } from '@/config/tests';
import { WEEK_OPTIONS, buildSchedule } from '@/lib/study-plan';

/**
 * План подготовки: выбираешь, сколько осталось недель, — получаешь недели.
 *
 * ПОЧЕМУ ВЫБОР НЕДЕЛЬ, А НЕ ДАТА ЭКЗАМЕНА. Дату пришлось бы вшить в код и
 * обновлять каждый год; забытая дата врёт молча и круглый год. Сколько
 * недель осталось, человек знает и сам, а страница не устаревает.
 *
 * ДЛИННЫЙ СРОК ВЫГЛЯДИТ ИНАЧЕ, И ЭТО ГЛАВНОЕ В СТРАНИЦЕ. Сначала выбор
 * кончался на двенадцати неделях, и страница молча говорила осеннему
 * посетителю: приходи в феврале. Это неправда и вредно: экзамен в мае, и
 * тот, кто начинает осенью, выигрывает не лишние недели зубрёжки, а
 * возможность закрывать пробел в ту же неделю, когда он появился. Поэтому
 * на сроке длиннее двенадцати недель первым идёт кусок «пока идёт курс», а
 * понедельное повторение начинается за девять недель до экзамена.
 *
 * ПОЧЕМУ ПРИВЫЧКИ ВЫНЕСЕНЫ НАД ПЛАНОМ. Рисовать графики по памяти и решать
 * с таймером нужно каждую неделю, и если повторить это в карточке каждой
 * недели, читать перестанут обе строки.
 */
const HABITS = [
  'Draw every graph in the unit from memory before you look at it. The exam asks you to produce graphs, not to recognise them.',
  'Practise with a timer from the first week: 60 questions in 70 minutes is 70 seconds each.',
  'Write out the reasoning for at least one free-response question a week. Points there come from the explanation, not the answer.',
];

export default function StudyPlan() {
  // По умолчанию — самый длинный срок. Экзамен в мае, и человек, зашедший
  // осенью, должен увидеть не «приходите в феврале», а что делать сейчас.
  const [weeks, setWeeks] = useState<number>(30);
  const { course, weeks: plan } = buildSchedule(weeks, MICRO_UNITS);
  const testHref = (slug?: string) => TESTS.find((t) => t.slug === slug)?.href;

  return (
    <div className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-[15px] font-medium">How many weeks until the exam?</legend>
        <div className="flex flex-wrap gap-2">
          {WEEK_OPTIONS.map((option) => {
            const active = option === weeks;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setWeeks(option)}
                aria-pressed={active}
                className={`rounded border px-4 py-2.5 text-[15px] font-semibold transition-colors ${
                  active
                    ? 'border-ink bg-ink text-ground'
                    : 'border-rule-strong hover:bg-surface'
                }`}
              >
                {option} weeks
              </button>
            );
          })}
        </div>
      </fieldset>

      <ul className="flex flex-col gap-2.5">
        {HABITS.map((habit) => (
          <li key={habit} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" />
            <span>{habit}</span>
          </li>
        ))}
      </ul>

      {/* Залитая плашка, но без охряной рамки: охра на сайте закреплена за
          записью на консультацию, и занимать её содержательным блоком значит
          ломать язык. Отличие от карточек недель и так очевидно — те
          контурные на фоне страницы, эта залита. */}
      {course ? (
        <div className="flex flex-col gap-3 rounded border border-rule bg-surface-alt p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
              Weeks {course.fromWeek}–{course.toWeek}
            </p>
            <p className="font-mono text-[13px] tabular-nums text-ink-mute">
              while the course is still running
            </p>
          </div>
          <h3 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">
            Nothing to revise yet — but plenty to keep from breaking
          </h3>
          <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
            Your class has not reached the later units, so there is no revision to do. The work at
            this stage is making sure nothing is left broken behind you: in the week your class
            finishes a unit, take that unit’s diagnostic. It takes half an hour and names the
            topics that would otherwise resurface in April, when there is no time left to learn
            them properly.
          </p>
          <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
            Keep what it flags in one list and come back to that list once a month. A gap found in
            October costs an evening. The same gap found in April costs the revision time you
            needed for something else.
          </p>
          <ul className="flex flex-col gap-1.5 pt-1">
            {course.units.map((unit) => {
              const href = testHref(unit.testSlug);
              return (
                <li key={unit.number} className="text-[15px] leading-relaxed text-ink-soft">
                  <span className="font-medium text-ink">Unit {unit.number}</span> · {unit.title} —{' '}
                  {href ? (
                    <Link href={href} className="font-medium text-ochre underline underline-offset-2">
                      free diagnostic
                    </Link>
                  ) : (
                    'diagnostic not written yet'
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <ol className="flex flex-col gap-3">
        {plan.map((week) => (
          <li
            key={week.number}
            className="flex flex-col gap-3 rounded border border-rule-strong bg-ground p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
                Week {week.number}
                {course && week.number === course.toWeek + 1 ? ' · revision starts' : ''}
              </p>
              <p className="font-mono text-[13px] tabular-nums text-ink-mute">
                {week.weeksLeft} {week.weeksLeft === 1 ? 'week' : 'weeks'} to go
              </p>
            </div>

            {week.isFinal ? (
              <>
                <h3 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">
                  One full paper, then only your weak spots
                </h3>
                <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
                  Sit a whole exam in one go: 60 questions in 1 hour 10 minutes, then three
                  free-response questions in an hour. Nothing else that week tests whether you can
                  hold concentration for two hours — and that is what the exam measures as much as
                  the economics.
                </p>
                <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
                  Score it, then spend whatever is left of the week only on the topics that took
                  marks away. No new material this week.
                </p>
                <Link
                  href="/ap-microeconomics-score-calculator"
                  className="w-fit text-[15px] font-semibold text-ochre underline underline-offset-4"
                >
                  Score your paper →
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">
                  {week.units.map((u) => `Unit ${u.unit.number}`).join(' and ')}
                </h3>
                <ul className="flex flex-col gap-3">
                  {week.units.map(({ unit, finishes }) => {
                    const href = finishes ? testHref(unit.testSlug) : undefined;
                    return (
                      <li key={unit.number} className="flex flex-col gap-1">
                        <p className="text-[15px] font-medium">
                          Unit {unit.number} · {unit.title}{' '}
                          <span className="font-mono text-[13px] font-normal tabular-nums text-ink-mute">
                            {unit.weightMin}–{unit.weightMax}%
                          </span>
                        </p>
                        {href ? (
                          <p className="text-[15px] leading-relaxed text-ink-soft">
                            Work through the topics, then{' '}
                            <Link
                              href={href}
                              className="font-medium text-ochre underline underline-offset-2"
                            >
                              take the free Unit {unit.number} diagnostic
                            </Link>{' '}
                            and go back to whatever it flags.
                          </p>
                        ) : finishes ? (
                          <p className="text-[15px] leading-relaxed text-ink-soft">
                            Work through the topics and test yourself on them — a diagnostic for
                            this unit is not written yet.
                          </p>
                        ) : (
                          <p className="text-[15px] leading-relaxed text-ink-soft">
                            Start the unit; it carries on into next week.
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
