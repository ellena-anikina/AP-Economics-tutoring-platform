'use client';

import { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import TeacherCard from '@/components/TeacherCard';
import { CTA } from '@/config/cta';
import { TEACHER } from '@/config/teacher';
import type { ResultSummary } from '@/lib/contact-schema';
import { parentMailto, studentMailto } from '@/lib/contact-links';
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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const primaryButton =
  'inline-flex w-fit items-center gap-2 rounded bg-ink px-6 py-3.5 text-sm font-semibold text-ground hover:opacity-90';
const secondaryButton =
  'inline-flex w-fit items-center gap-2 rounded border border-rule-strong px-6 py-3.5 text-sm font-medium hover:bg-surface';

export default function ResultsCta({
  test,
  result,
}: {
  test: TestDefinition;
  result: TestResult;
}) {
  const [parentOpen, setParentOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const weak = topicNumbers(result, 2);
  const summary = summarise(test, result);

  const headline =
    weak.length > 0
      ? `Work through ${weak.join(' and ')} with ${TEACHER.shortName}`
      : `Talk through this test with ${TEACHER.shortName}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CTA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

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

      {CTA.mode === 'form' ? (
        <ContactForm
          kind="booking"
          result={summary}
          submitLabel="Book the free 15-minute session"
          noteLabel="Anything you want covered? (optional)"
          notePlaceholder="I keep mixing up comparative and absolute advantage…"
          successTitle="Sent."
          successBody={`${TEACHER.shortName} has your results and will reply to arrange a time.`}
          mailtoFallback={studentMailto(test, result)}
          disclosure={`Your score and the flagged topics are included so ${TEACHER.shortName} can prepare before the call.`}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {/* Инстаграм первым: подростку написать в директ проще, чем
                составить письмо, и порог здесь важнее формальности. */}
            <a
              href={TEACHER.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButton}
            >
              <InstagramIcon />
              Message on Instagram
            </a>
            <a href={studentMailto(test, result)} className={secondaryButton}>
              Email my results
            </a>
          </div>
          <p className="text-[13px] leading-relaxed text-ink-mute">
            The email comes with your score and flagged topics already filled in, so{' '}
            {TEACHER.shortName} can prepare before the call.
          </p>
        </div>
      )}

      {/* Тест проходит школьник, а решение о занятиях принимает родитель.
          Поэтому у родителя отдельный путь, а не приписка «покажи маме». */}
      <div className="flex flex-col gap-4 border-t border-rule pt-5">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-serif text-lg font-semibold">Need a parent on board?</h3>
          <p className="max-w-measure text-[14px] leading-relaxed text-ink-soft">
            Tutoring is usually a parent’s decision. Send them this and they get the whole picture in
            one email — your score, what to work on, and who wrote the test.
          </p>
        </div>

        {CTA.mode === 'form' ? (
          parentOpen ? (
            <ContactForm
              kind="parent"
              result={summary}
              submitLabel="Send the results"
              noteLabel="Add a note for them (optional)"
              notePlaceholder="Can we talk about getting some help before the exam?"
              successTitle="Sent."
              successBody={`They have your results and can reply straight to ${TEACHER.shortName}.`}
              mailtoFallback={parentMailto(test, result)}
              disclosure={`${TEACHER.shortName} is told that you sent this, so she knows to expect a reply.`}
            />
          ) : (
            <button type="button" onClick={() => setParentOpen(true)} className={secondaryButton}>
              Send these results to a parent
            </button>
          )
        ) : (
          <a href={parentMailto(test, result)} className={secondaryButton}>
            Send these results to a parent
          </a>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-4 text-[13px] text-ink-mute">
        <span className="flex flex-wrap items-center gap-2">
          <span>Or write to</span>
          <code className="font-mono text-ink-soft">{CTA.email}</code>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded border border-rule-strong px-2 py-1 text-[12px] font-medium hover:bg-surface"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </span>
        <a
          href={TEACHER.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-medium text-ochre underline underline-offset-2"
        >
          <InstagramIcon />
          {TEACHER.instagram}
        </a>
      </div>
    </section>
  );
}
