'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import QuestionView from '@/components/QuestionView';
import Reg from '@/components/Reg';
import { TeacherByline } from '@/components/TeacherCard';
import Results from '@/components/Results';
import { scoreAttempt } from '@/lib/scoring';
import { SHARE_HASH, decodeAttempt, encodeAttempt } from '@/lib/share-link';
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

  /**
   * Первое, что делаем на клиенте, — смотрим, не результат ли у нас в адресе.
   *
   * Сервер отдаёт разметку заставки теста и знать про хэш не может (после «#»
   * браузер серверу ничего не отправляет), поэтому разбор возможен только
   * здесь. Атрибут data-shared ставит крошечный скрипт в layout: пока
   * страница не ожила, он прячет заставку, чтобы пришедший по ссылке родитель
   * не увидел на долю секунды «Start the test». Снимаем его в любом случае —
   * иначе заставка останется скрытой и для того, кто захочет пройти тест.
   */
  useEffect(() => {
    document.documentElement.removeAttribute('data-shared');

    const hash = window.location.hash;
    if (hash.startsWith(SHARE_HASH)) {
      const incoming = decodeAttempt(hash.slice(SHARE_HASH.length), questions, test.slug);
      if (incoming) {
        // Показываем тот же экран результатов, что и после своего теста:
        // по адресу нельзя отличить родителя от школьника, открывшего
        // собственный результат из закладки или после обновления страницы.
        setAttempt(incoming);
        setPhase('done');
        return;
      }
      // Ссылка испорчена при пересылке или ведёт на другой юнит. Показывать
      // выдуманный результат нельзя, поэтому просто убираем мусор из адреса
      // и открываем страницу как обычно.
      window.history.replaceState(null, '', window.location.pathname);
    }

    visitorId();
    const saved = loadAttempt(test.slug);
    if (saved && !saved.finishedAt && Object.keys(saved.answers).length > 0) {
      setResumable(saved);
    }
  }, [questions, test.slug]);

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
    const updated: Attempt = { ...commitTime(attempt, q.id), finishedAt: Date.now() };
    setAttempt(updated);
    saveAttempt(updated);

    // Результат уезжает в адрес страницы сразу, а не по нажатию «поделиться».
    // Тогда ссылка в адресной строке уже верная: её можно скопировать оттуда,
    // положить в закладки или просто обновить страницу и снова увидеть разбор.
    window.history.replaceState(
      null,
      '',
      window.location.pathname + SHARE_HASH + encodeAttempt(updated, questions),
    );

    setPhase('done');
    window.scrollTo({ top: 0 });
  }

  function retake() {
    clearAttempt(test.slug);
    // Без этого обновление страницы вернуло бы старый результат из адреса.
    window.history.replaceState(null, '', window.location.pathname);
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
      <div className="flex flex-col gap-8" data-test-idle>
        <header className="flex flex-col gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
            Free practice test · no account needed
          </p>
          <h1 className="text-balance font-serif text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem]">
            <Reg>{test.title}</Reg>
          </h1>
          <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft">
            {test.blurb}
          </p>
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
            {/* Без числа: тем шесть в Unit 1 и девять в Unit 2, а обещание
                на входе обязано совпадать с тем, что человек увидит на выходе.
                Вшитое «six» на втором тесте уже врало. */}
            <li>— Your score, broken down across every topic in the unit</li>
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
      {/* Полоса прогресса и панель навигации выходят за колонку ровно на её
          отступы, поэтому эти значения обязаны совпадать с padding страницы:
          px-5 на телефоне, px-8 от sm. */}
      <div className="sticky top-0 z-10 -mx-5 flex flex-col gap-2 border-b border-rule bg-ground px-5 py-3 sm:-mx-8 sm:px-8">
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

      <div className="sticky bottom-0 -mx-5 flex items-center justify-between gap-3 border-t border-rule bg-ground px-5 py-3 sm:-mx-8 sm:px-8">
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
