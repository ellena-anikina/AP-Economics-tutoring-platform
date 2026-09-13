import { parentMailto } from '@/lib/contact-links';
import type { TestDefinition, TestResult } from '@/types';

/**
 * Передача результатов родителю — отдельный блок, а не строчка в чужом призыве.
 *
 * ПОЧЕМУ ОН ВООБЩЕ ЕСТЬ. Тест проходит школьник, а занятия оплачивает
 * родитель. Шестнадцатилетний, которого тест убедил, всё равно не может
 * купить — и если у него нет способа показать результат тому, кто может,
 * заявка исчезает молча. Это самое узкое место воронки, а не украшение.
 * Письмо уже написано целиком: счёт, отмеченные темы, кто преподаватель и
 * что первый разговор бесплатный. Приходит оно от собственного ребёнка —
 * убедительнее отправителя не бывает.
 *
 * ПОЧЕМУ ОТДЕЛЬНО. Внутри блока записи он и мешал, и не работал: пять
 * кликабельных элементов в одном «призыве» — это не призыв, а меню, а
 * тринадцатый кегль подчёркнутой ссылкой снизу слишком слаб, чтобы быть
 * настоящим путём. Разные адресаты — разные блоки, по одному действию в
 * каждом. Надпись сверху прямо говорит, к кому обращён этот.
 */
export default function ParentHandoff({
  test,
  result,
}: {
  test: TestDefinition;
  result: TestResult;
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-rule pt-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
        For your parents
      </p>
      <h2 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">
        Show them what the test found
      </h2>
      <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
        The email is already written — your score, the topics the test flagged, and what the free
        session covers. All you choose is who to send it to.
      </p>
      <div className="pt-1">
        <a
          href={parentMailto(test, result)}
          className="inline-flex w-full items-center justify-center rounded border border-ink px-5 py-3 text-center text-[15px] font-semibold transition-colors hover:bg-surface sm:w-fit"
        >
          Send these results to a parent
        </a>
      </div>
    </section>
  );
}
