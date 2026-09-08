'use client';

import Stimulus from '@/components/Stimulus';
import type { ChoiceId, Question } from '@/types';

export default function QuestionView({
  question,
  selected,
  onSelect,
}: {
  question: Question;
  selected: ChoiceId | null;
  onSelect: (choiceId: ChoiceId) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[17px] leading-relaxed">{question.stem}</p>

      {question.stimulus ? <Stimulus stimulus={question.stimulus} /> : null}

      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Answer choices</legend>
        {question.choices.map((choice) => {
          const isSelected = selected === choice.id;
          return (
            <label
              key={choice.id}
              className={`flex cursor-pointer items-start gap-3 rounded border px-3 py-3 transition-colors ${
                isSelected
                  ? 'border-ochre bg-surface-alt'
                  : 'border-rule bg-surface hover:border-rule-strong'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={choice.id}
                checked={isSelected}
                onChange={() => onSelect(choice.id as ChoiceId)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
                  isSelected
                    ? 'border-ochre bg-ochre text-ground'
                    : 'border-rule-strong text-ink-mute'
                }`}
              >
                {choice.id}
              </span>
              <span className="text-[15px] leading-relaxed">{choice.text}</span>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}
