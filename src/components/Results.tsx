'use client';

import { useState } from 'react';
import ParentHandoff from '@/components/ParentHandoff';
import ResultsCta from '@/components/ResultsCta';
import Stimulus from '@/components/Stimulus';
import { questionsLost } from '@/lib/scoring';
import type { Attempt, ChoiceId, Question, TestDefinition, TestResult, TopicResult } from '@/types';

const SKILL_LABELS: Record<string, string> = {
  conceptual: 'Concepts',
  calculation: 'Calculation',
  graphing: 'Graphs',
  analysis: 'Analysis',
};

function pct(n: number): string {
  return `${Math.round(n * 100)}%`;
}

function Bar({ value, tone }: { value: number; tone: 'ochre' | 'ink' }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-alt">
      <div
        className={`h-full rounded-full ${tone === 'ochre' ? 'bg-ochre' : 'bg-ink-soft'}`}
        style={{ width: `${Math.max(2, Math.round(value * 100))}%` }}
      />
    </div>
  );
}

function TopicRow({ topic }: { topic: TopicResult }) {
  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[15px]">{topic.title}</span>
        <span className="whitespace-nowrap font-mono text-[13px] tabular-nums text-ink-mute">
          {topic.correct}/{topic.total} · {pct(topic.percent)}
        </span>
      </div>
      <Bar value={topic.percent} tone="ochre" />
    </li>
  );
}

function ReviewItem({
  question,
  index,
  picked,
}: {
  question: Question;
  index: number;
  picked: ChoiceId | null;
}) {
  const isCorrect = picked === question.correctChoiceId;
  const [open, setOpen] = useState(!isCorrect);

  return (
    <li className="border-t border-rule py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 text-left"
      >
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
            isCorrect ? 'bg-good-bg text-good' : 'bg-bad-bg text-bad'
          }`}
        >
          {isCorrect ? '✓' : '✕'}
        </span>
        <span className="flex flex-col gap-1">
          <span className="font-mono text-[12px] text-ink-mute">Question {index + 1}</span>
          <span className="text-[15px] leading-relaxed">{question.stem}</span>
        </span>
      </button>

      {open ? (
        <div className="mt-3 flex flex-col gap-4 border-l-2 border-rule-strong pl-4">
          {question.stimulus ? <Stimulus stimulus={question.stimulus} /> : null}

          <ul className="flex flex-col gap-1.5">
            {question.choices.map((c) => {
              const isKey = c.id === question.correctChoiceId;
              const isPicked = c.id === picked;
              return (
                <li
                  key={c.id}
                  className={`flex items-start gap-2.5 rounded px-2 py-1.5 text-[14px] ${
                    isKey ? 'bg-good-bg text-good' : isPicked ? 'bg-bad-bg text-bad' : ''
                  }`}
                >
                  <span className="font-mono text-[12px]">{c.id}</span>
                  <span className="leading-relaxed">{c.text}</span>
                  {isPicked && !isKey ? (
                    <span className="ml-auto shrink-0 text-[11px] uppercase tracking-wide">
                      your answer
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
              Why {question.correctChoiceId} is right
            </p>
            <p className="text-[14px] leading-relaxed text-ink-soft">{question.explanation}</p>
          </div>

          {picked && picked !== question.correctChoiceId && question.distractorNotes[picked] ? (
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
                Why {picked} looked right
              </p>
              <p className="text-[14px] leading-relaxed text-ink-soft">
                {question.distractorNotes[picked]}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export default function Results({
  test,
  result,
  attempt,
  questions,
  onRetake,
}: {
  test: TestDefinition;
  result: TestResult;
  attempt: Attempt;
  questions: Question[];
  onRetake: () => void;
}) {
  const skipped = result.total - result.answered;

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
          {test.title}
        </p>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-serif text-6xl font-semibold leading-none tabular-nums text-ochre">
            {result.correct}
          </span>
          <span className="font-serif text-2xl text-ink-soft">out of {result.total} correct</span>
        </div>
        <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
          This test covers {test.unitLabel} only, so it is not a prediction of your AP® score — it
          shows which topics in this unit are costing you points right now.
          {skipped > 0 ? ` You left ${skipped} ${skipped === 1 ? 'question' : 'questions'} blank.` : ''}
        </p>
      </header>

      {result.weakestTopics.length > 0 ? (
        <section className="flex flex-col gap-4">
          <h2 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">What is costing you the most</h2>
          <ol className="flex flex-col gap-3">
            {result.weakestTopics.map((topic, i) => (
              <li
                key={topic.topicId}
                className="flex gap-4 rounded border border-rule bg-surface p-4"
              >
                <span className="font-serif text-2xl font-semibold leading-none text-ochre">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-[15px] font-medium">{topic.title}</p>
                  <p className="text-[14px] leading-relaxed text-ink-soft">
                    {topic.correct} of {topic.total} correct — you are losing about{' '}
                    {questionsLost(topic)} {questionsLost(topic) === 1 ? 'mark' : 'marks'} out of{' '}
                    {result.total} here.
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="flex flex-col gap-4">
        <h2 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">Every topic in this unit</h2>
        <ul className="flex flex-col gap-4">
          {result.topics.map((t) => (
            <TopicRow key={t.topicId} topic={t} />
          ))}
        </ul>
      </section>

      {result.skills.length > 1 ? (
        <section className="flex flex-col gap-4">
          <h2 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">By skill</h2>
          <ul className="flex flex-col gap-4">
            {result.skills.map((s) => (
              <li key={s.skill} className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-[15px]">{SKILL_LABELS[s.skill] ?? s.skill}</span>
                  <span className="font-mono text-[13px] tabular-nums text-ink-mute">
                    {s.correct}/{s.total}
                  </span>
                </div>
                <Bar value={s.total === 0 ? 0 : s.correct / s.total} tone="ink" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ResultsCta test={test} result={result} />

      <ParentHandoff test={test} result={result} />

      <section className="flex flex-col gap-2">
        <h2 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">Every question explained</h2>
        <p className="text-[14px] text-ink-soft">
          Questions you missed are open by default. Tap any question to expand it.
        </p>
        <ul className="mt-2 flex flex-col">
          {questions.map((q, i) => (
            <ReviewItem
              key={q.id}
              question={q}
              index={i}
              picked={attempt.answers[q.id]?.choiceId ?? null}
            />
          ))}
        </ul>
      </section>

      <div className="border-t border-rule pt-6">
        <button
          type="button"
          onClick={onRetake}
          className="rounded border border-rule-strong px-4 py-2.5 text-sm font-medium hover:bg-surface"
        >
          Take the test again
        </button>
      </div>
    </div>
  );
}
