'use client';

import { useState } from 'react';
import {
  BANDS,
  COMPOSITE_MAX,
  FRQ_PARTS,
  MCQ_COUNT,
  bandFor,
  composite,
  borderlinePair,
  toNextScore,
} from '@/config/exam-scoring';

/**
 * Калькулятор оценки: сырые баллы за пробник → предполагаемая оценка 1–5.
 *
 * ПОЧЕМУ ПОЛЗУНКИ, А НЕ ПОЛЯ ВВОДА. Числа заранее ограничены (0–60, 0–10,
 * 0–5), и ползунок делает границы видимыми: нельзя ввести 75 из 60 и
 * получить бессмысленный ответ. На телефоне, откуда придёт большая часть
 * трафика, тянуть ползунок быстрее, чем вызывать цифровую клавиатуру. Рядом
 * стоит поле с числом — для тех, кто знает точное значение.
 *
 * ПОЧЕМУ РЕЗУЛЬТАТ ПЕРЕСЧИТЫВАЕТСЯ СРАЗУ. Кнопки «посчитать» нет намеренно:
 * человек двигает ползунок и сразу видит, где проходит граница пятёрки. Это
 * и есть главная ценность страницы — не число, а расстояние до следующей
 * оценки.
 *
 * ПОЧЕМУ У ГРАНИЦЫ МЫ НЕ НАЗЫВАЕМ ОЦЕНКУ. Пороги неизвестны точно (см.
 * config/exam-scoring.ts), и у самой границы ошибка порога больше, чем
 * разница между оценками. Сказать «у тебя 4», когда на самом деле может быть
 * и 5, — это соврать в обе стороны сразу: одного расстроить, другого
 * успокоить. Поэтому в полосе ±3 балла страница говорит «на границе».
 */
export default function ScoreCalculator() {
  const [mcq, setMcq] = useState(40);
  const [frq, setFrq] = useState<number[]>(FRQ_PARTS.map((p) => Math.round(p.max * 0.6)));

  const total = composite(mcq, frq);
  const band = bandFor(total);
  const next = toNextScore(total);
  const borderline = borderlinePair(total);
  const percent = Math.round((total / COMPOSITE_MAX) * 100);

  const setPart = (i: number, value: number) =>
    setFrq((prev) => prev.map((p, j) => (j === i ? value : p)));

  return (
    <div className="flex flex-col gap-5 rounded border border-rule-strong bg-surface p-5 sm:p-6">
      <Row
        id="mcq"
        label="Multiple choice: questions right"
        max={MCQ_COUNT}
        value={mcq}
        onChange={setMcq}
      />

      <div className="flex flex-col gap-4 border-t border-rule pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
          Free response
        </p>
        {FRQ_PARTS.map((part, i) => (
          <Row
            key={part.id}
            id={part.id}
            label={`${part.label}: points`}
            max={part.max}
            value={frq[i]}
            onChange={(v) => setPart(i, v)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-rule pt-5">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span
            className="font-serif text-6xl font-semibold leading-none tabular-nums text-ochre"
            aria-live="polite"
          >
            {borderline ? `${borderline[0]}\u2013${borderline[1]}` : band.score}
          </span>
          <span className="font-serif text-xl text-ink-soft">
            {borderline ? 'on the borderline' : 'estimated score'}
          </span>
        </div>

        <p className="text-[15px] leading-relaxed text-ink-soft">
          Composite {total} out of {COMPOSITE_MAX} ({percent}% of the maximum).{' '}
          {next
            ? `A ${next.score} starts at ${BANDS.find((b) => b.score === next.score)?.min}: ` +
              `${next.mcq} more question${next.mcq === 1 ? '' : 's'} right, or ${next.frq} more ` +
              `free-response point${next.frq === 1 ? '' : 's'}.`
            : 'That is the top band — nothing above it to reach.'}
        </p>

        {/* Оговорка стоит прямо под числом, а не в конце страницы: человек,
            получивший «3», должен прочитать её раньше, чем расстроится. */}
        <p className="text-[13px] leading-relaxed text-ink-mute">
          An estimate. College Board does not publish the raw-score cut-offs, and they shift a
          little with each year’s paper.
        </p>
      </div>
    </div>
  );
}

function Row({
  id,
  label,
  max,
  value,
  onChange,
}: {
  id: string;
  label: string;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const clamp = (v: number) => Math.max(0, Math.min(max, Math.round(v)));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-medium">
          {label}
        </label>
        <span className="flex items-baseline gap-1 text-[15px] text-ink-mute">
          <input
            // Поле для тех, кто знает точное число: ползунком его ловить долго.
            type="number"
            inputMode="numeric"
            min={0}
            max={max}
            value={value}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            aria-label={label}
            className="w-14 rounded border border-rule-strong bg-ground px-2 py-1 text-right font-mono text-[14px] tabular-nums"
          />
          <span className="font-mono text-[13px] tabular-nums">/ {max}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-alt accent-ochre"
      />
    </div>
  );
}
