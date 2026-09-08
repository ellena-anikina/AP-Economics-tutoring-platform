'use client';

import { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import TeacherCard from '@/components/TeacherCard';
import { CTA } from '@/config/cta';
import { TEACHER } from '@/config/teacher';
import type { ResultSummary } from '@/lib/contact-schema';
import type { TestDefinition, TestResult } from '@/types';

function topicNumbers(result: TestResult, n: number): string[] {
  return result.weakestTopics.slice(0, n).map((t) => t.title.replace(/^([\d.]+)\s.*/, '$1'));
}

function summarise(test: TestDefinition, result: TestResult): ResultSummary {
  return {
    testTitle: test.title,
    correct: result.correct,
    total: result.total,
    weakestTopics: result.weakestTopics.map((t) => t.title),
  };
}

function fallbackMailto(test: TestDefinition, result: TestResult): string {
  const subject = `${test.title} — ${result.correct}/${result.total}`;
  return `mailto:${CTA.email}?subject=${encodeURIComponent(subject)}`;
}

export default function ResultsCta({
  test,
  result,
}: {
  test: TestDefinition;
  result: TestResult;
}) {
  const [parentOpen, setParentOpen] = useState(false);
  const weak = topicNumbers(result, 2);
  const summary = summarise(test, result);

  const headline =
    weak.length > 0
      ? `Work through ${weak.join(' and ')} with ${TEACHER.shortName}`
      : `Talk through this test with ${TEACHER.shortName}`;

  return (
    <section className="flex flex-col gap-6 rounded border border-ochre-soft bg-surface-alt p-5 sm:p-7">
      <TeacherCard />

      <div className="flex flex-col gap-3 border-t border-rule pt-5">
        <h2 className="font-serif text-2xl font-semibold leading-snug">{headline}</h2>
        <p className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
          The first session is free and takes fifteen minutes. In it:
        </p>
        <ul className="flex flex-col gap-1.5">
          {TEACHER.consultationPromise.map((line) => (
            <li key={line} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
              <span aria-hidden className="text-ochre">
                —
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <ContactForm
        kind="booking"
        result={summary}
        submitLabel="Book the free 15-minute session"
        noteLabel="Anything you want covered? (optional)"
        notePlaceholder="I keep mixing up comparative and absolute advantage…"
        successTitle="Sent."
        successBody={`${TEACHER.shortName} has your results and will reply to arrange a time. Check your inbox — and your spam folder, just in case.`}
        mailtoFallback={fallbackMailto(test, result)}
        disclosure={`Your score and the flagged topics are included so ${TEACHER.shortName} can prepare before the call.`}
      />

      {/* Тест проходит школьник, а решение о занятиях принимает родитель.
          Поэтому у родителя отдельный путь, а не приписка «покажи маме».
          Формулировки в этом блоке — её собственные, с её сайта: он и
          написан для родителей. */}
      <div className="flex flex-col gap-4 border-t border-rule pt-5">
        {!parentOpen ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-lg font-semibold">Need a parent on board?</h3>
              <p className="max-w-measure text-[14px] leading-relaxed text-ink-soft">
                Tutoring is usually a parent’s decision. Send them this and they get the whole
                picture in one email — your score, what to work on, and who wrote the test.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setParentOpen(true)}
              className="w-fit rounded border border-rule-strong px-6 py-3 text-sm font-medium hover:bg-surface"
            >
              Send these results to a parent
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-lg font-semibold">Send these results to a parent</h3>
              <p className="max-w-measure text-[14px] leading-relaxed text-ink-soft">
                They get your score, the topics to work on, and who wrote the test — written so it
                makes sense without any context.
              </p>
            </div>
            <ContactForm
              kind="parent"
              result={summary}
              submitLabel="Send the results"
              noteLabel="Add a note for them (optional)"
              notePlaceholder="Can we talk about getting some help before the exam?"
              successTitle="Sent."
              successBody="They have your results and can reply straight to Dr. Shalamai."
              mailtoFallback={fallbackMailto(test, result)}
              disclosure={`${TEACHER.shortName} is told that you sent this, so she knows to expect a reply.`}
            />
          </div>
        )}
      </div>

      <p className="border-t border-rule pt-4 text-[13px] text-ink-mute">
        Prefer email? Write to{' '}
        <a
          href={fallbackMailto(test, result)}
          className="font-medium text-ochre underline underline-offset-2"
        >
          {CTA.email}
        </a>
      </p>
    </section>
  );
}
