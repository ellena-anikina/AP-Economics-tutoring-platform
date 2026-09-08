'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import QuestionView from '@/components/QuestionView';
import { TeacherByline } from '@/components/TeacherCard';
import Results from '@/components/Results';
import { scoreAttempt } from '@/lib/scoring';
import { clearAttempt, loadAttempt, newId, saveAttempt, visitorId } from '@/lib/storage';
import type { Attempt, ChoiceId, Question, TestDefinition } from '@/types';

type Phase = 'idle' | 'running' | 'done';

function emptyAttempt(testSlug: string): Attempt {
  return {
    id: newId(),
    testSlug,
    startedAt: Date.now(),
    finishedAt: null,
    answers: {},
  };
}

export default function TestRunner({
  test,
  questions,
  topicTitles,
}: {
  test: TestDefinition;
  questions: Question[];
  topicTitles: Record<string, string>;
}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [attempt, setAttempt] = useState<Attempt>(() => emptyAttempt(test.slug));
  const [index, setIndex] = useState(0);
  const [resumable, setResumable] = useState<Attempt | null>(null);

  // Время на текущем вопросе. Таймер не показываем, но пишем с первого
  // запуска — иначе на следующей итерации нечем будет считать тайминг.
  const enteredAt = useRef<number>(Date.now());

  useEffect(() => {
    visitorId();
    const saved = loadAttempt(test.slug);
    if (saved && !saved.finishedAt && Object.keys(saved.answers).length > 0) {
      setResumable(saved);
    }
  }, [test.slug]);

  const commitTime = useCallback(
    (draft: Attempt, questionId: string): Attempt => {
      const spent = Math.round((Date.now() - enteredAt.current) / 1000);
      const prev = draft.answers[questionId] ?? { choiceId: null, seconds: 0, visits: 0 };
      return {
        ...draft,
        answers: {
          ...draft.answers,
          [questionId]: { ...prev, seconds: prev.seconds + Math.max(0, spent) },
        },
      };
    },
    [],
  );

  const goTo = useCallback(
    (next: number) => {
      const current = questions[index];
      setAttempt((prev) => {
        const updated = commitTime(prev, current.id);
        const target = questions[next];
        const targetPrev = updated.answers[target.id] ?? { choiceId: null, seconds: 0, visits: 0 };
        const withVisit: Attempt = {
          ...updated,
          answers: {
            ...updated.answers,
            [target.id]: { ...targetPrev, visits: targetPrev.visits + 1 },
          },
        };
        saveAttempt(withVisit);
        return withVisit;
      });
      enteredAt.current = Date.now();
      setIndex(next);
      if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
    },
    [commitTime, index, questions],
  );

  function start(fresh: Attempt) {
    setAttempt(fresh);
    setIndex(0);
    setResumable(null);
    enteredAt.current = Date.now();
    setPhase('running');
  }

  function select(choiceId: ChoiceId) {
    const q = questions[index];
    setAttempt((prev) => {
      const prevRecord = prev.answers[q.id] ?? { choiceId: null, seconds: 0, visits: 1 };
      const updated: Attempt = {
        ...prev,
        answers: { ...prev.answers, [q.id]: { ...prevRecord, choiceId } },
      };
      saveAttempt(updated);
      return updated;
    });
  }

  function finish() {
    const q = questions[index];
    setAttempt((prev) => {
      const updated = { ...commitTime(prev, q.id), finishedAt: Date.now() };
      saveAttempt(updated);
      return updated;
    });
    setPhase('done');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  }

  function retake() {
    clearAttempt(test.slug);
    start(emptyAttempt(test.slug));
  }

  const result = useMemo(
    () => scoreAttempt(attempt, questions, topicTitles),
    [attempt, questions, topicTitles],
  );

  if (phase === 'done') {
    return (
      <Results
        test={test}
        result={result}
        attempt={attempt}
        questions={questions}
        onRetake={retake}
      />
    );
  }

  if (phase === 'idle') {
    const answeredCount = resumable ? Object.values(resumable.answers).filter((a) => a.choiceId).length : 0;
    return (
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
            Free practice test · no account needed
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {test.title}
          </h1>
          <p className="max-w-measure text-[17px] leading-relaxed text-ink-soft">{test.blurb}</p>
          <div className="pt-1">
            <TeacherByline />
          </div>
        </header>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded border border-rule bg-rule sm:grid-cols-3">
          {[
            ['Questions', String(test.questionCount)],
            ['Time', `~${test.estimatedMinutes} min`],
            ['Format', 'Exam style'],
          ].map(([term, value]) => (
            <div key={term} className="flex flex-col gap-1 bg-surface px-4 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
                {term}
              </dt>
              <dd className="text-[15px] font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-xl font-semibold">What you get at the end</h2>
          <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-ink-soft">
            <li>— Your score, broken down across all six topics in the unit</li>
            <li>— The topics costing you the most marks, named specifically</li>
            <li>— Every question explained, including why the answer you picked looked right</li>
          </ul>
        </section>

        <div className="flex flex-col gap-3">
          {resumable && answeredCount > 0 ? (
            <div className="flex flex-col gap-3 rounded border border-rule bg-surface p-4">
              <p className="text-[14px] text-ink-soft">
                You have an unfinished attempt with {answeredCount} of {questions.length} answered.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const firstUnanswered = questions.findIndex(
                      (q) => !resumable.answers[q.id]?.choiceId,
                    );
                    setAttempt(resumable);
                    setIndex(firstUnanswered === -1 ? 0 : firstUnanswered);
                    setResumable(null);
                    enteredAt.current = Date.now();
                    setPhase('running');
                  }}
                  className="rounded bg-ink px-5 py-3 text-sm font-semibold text-ground hover:opacity-90"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => start(emptyAttempt(test.slug))}
                  className="rounded border border-rule-strong px-5 py-3 text-sm font-medium hover:bg-surface-alt"
                >
                  Start over
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => start(emptyAttempt(test.slug))}
              className="w-full rounded bg-ink px-6 py-4 text-base font-semibold text-ground hover:opacity-90 sm:w-fit"
            >
              Start the test
            </button>
          )}
        </div>
      </div>
    );
  }

  const question = questions[index];
  const selected = attempt.answers[question.id]?.choiceId ?? null;
  const answeredCount = Object.values(attempt.answers).filter((a) => a.choiceId).length;
  const isLast = index === questions.length - 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-10 -mx-5 flex flex-col gap-2 border-b border-rule bg-ground px-5 py-3">
        <div className="flex items-baseline justify-between gap-4 text-[13px]">
          <span className="font-medium">
            Question {index + 1} of {questions.length}
          </span>
          <span className="text-ink-mute">{answeredCount} answered</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-surface-alt"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-label="Test progress"
        >
          <div
            className="h-full rounded-full bg-ochre transition-[width] duration-200"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <QuestionView question={question} selected={selected} onSelect={select} />

      <div className="sticky bottom-0 -mx-5 flex items-center justify-between gap-3 border-t border-rule bg-ground px-5 py-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="rounded border border-rule-strong px-4 py-2.5 text-sm font-medium disabled:opacity-40 enabled:hover:bg-surface"
        >
          Back
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={finish}
            className="rounded bg-ochre px-6 py-2.5 text-sm font-semibold text-ground hover:opacity-90"
          >
            See my results
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="rounded bg-ink px-6 py-2.5 text-sm font-semibold text-ground hover:opacity-90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
