import Link from 'next/link';
import type { TestDefinition } from '@/types';

/**
 * Карточка теста — одна на главную и на страницу экзамена.
 *
 * Вынесена в компонент не ради экономии строк, а чтобы два списка тестов
 * совпадали по построению, а не по внимательности. Скопированная карточка
 * расходится с оригиналом на первой же правке.
 */
export default function TestCard({ test }: { test: TestDefinition }) {
  return (
    <Link
      href={test.href}
      className="flex flex-col gap-2 rounded border border-rule bg-surface p-5 transition-colors hover:border-ochre-soft sm:flex-row sm:items-center sm:gap-6 sm:p-6"
    >
      <span className="flex min-w-0 flex-col gap-1.5">
        <span className="font-serif text-xl font-semibold">{test.shortTitle}</span>
        <span className="max-w-measure text-[15px] leading-relaxed text-ink-soft">{test.blurb}</span>
        <span className="mt-1 font-mono text-[12px] text-ink-mute">
          {test.questionCount} questions · ~{test.estimatedMinutes} min
        </span>
      </span>
      {/* Стрелка держит правый край карточки: на широком экране иначе
          остаётся пустая половина без назначения. */}
      <span className="shrink-0 whitespace-nowrap text-[14px] font-semibold text-ochre sm:ml-auto">
        Start →
      </span>
    </Link>
  );
}
