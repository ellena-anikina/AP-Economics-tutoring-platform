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
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M15.8 7.7h-1c-1 0-1.7.7-1.7 1.7v8.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.9 12.3h4.5" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.8 6.8 12 12.6l8.2-5.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const contactLink =
  'flex items-center gap-2 rounded border border-rule-strong bg-ground px-3.5 py-2.5 text-[14px] font-medium hover:bg-surface';

export default function ResultsCta({
  test,
  result,
}: {
  test: TestDefinition;
  result: TestResult;
}) {
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
    <section className="flex flex-col gap-5 rounded border border-ochre-soft bg-surface-alt p-5 sm:p-7">
      <TeacherCard />

      <div className="flex flex-col gap-2 border-t border-rule pt-5">
        <h2 className="font-serif text-2xl font-semibold leading-snug">{headline}</h2>
        <p className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
          {TEACHER.sessionOffer}
        </p>
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
        <div className="flex flex-col gap-3.5">
          {/* Три равноправных контакта одной строкой. Раньше они повторялись
              трижды по всему блоку, и до сути приходилось листать. */}
          <div className="flex flex-wrap gap-2.5">
            <a href={studentMailto(test, result)} className={contactLink}>
              <MailIcon />
              Email my results
            </a>
            <a
              href={TEACHER.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={contactLink}
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href={TEACHER.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={contactLink}
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>

          <div className="flex flex-col gap-2 text-[13px] text-ink-mute">
            <p className="flex flex-wrap items-center gap-2">
              <code className="font-mono text-ink-soft">{CTA.email}</code>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded border border-rule-strong px-2 py-0.5 text-[12px] font-medium hover:bg-surface"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </p>
            {/* Решение о занятиях чаще принимает родитель, поэтому у него есть
                свой готовый текст письма — но одной строкой, а не блоком. */}
            <p>
              <a
                href={parentMailto(test, result)}
                className="font-medium text-ochre underline underline-offset-2"
              >
                Send these results to a parent
              </a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
