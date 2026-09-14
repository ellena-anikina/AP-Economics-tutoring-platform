'use client';

import { useState } from 'react';
import { ShareIcon } from '@/components/icons';
import { encodeAttempt, shareUrl } from '@/lib/share-link';
import type { Attempt, Question, TestDefinition } from '@/types';

/**
 * Мост от школьника к родителю — ссылка на эту же страницу с результатом.
 *
 * ПОЧЕМУ НЕ ПИСЬМО. Здесь стояла кнопка «Send these results to a parent»:
 * она открывала почтовый клиент с готовым текстом. Текст был хороший, а
 * канал — неверный. Подростки не пишут родителям писем; и те и другие живут
 * в мессенджерах, а почтовый клиент на телефоне часто просто не настроен, и
 * кнопка тогда не делает ничего. Ссылка ложится в любой канал, и в какой
 * именно — подросток решит лучше нас. Её же можно выложить в соцсети, чего
 * письмо не умеет в принципе.
 *
 * ОДНА КНОПКА, РАЗНОЕ ПОВЕДЕНИЕ. На телефоне открывается системное окно
 * «поделиться» — оттуда результат уходит в WhatsApp, Telegram, куда угодно.
 * На десктопе, где такого окна нет, ссылка копируется в буфер. Надпись одна
 * и та же и в обоих случаях правда. Если оба способа недоступны, показываем
 * адрес целиком, чтобы его можно было выделить руками: молчащая кнопка хуже
 * некрасивой.
 *
 * ЧЕГО ЗДЕСЬ НАРОЧНО НЕТ. Стояли две подписи, и обе убраны.
 *
 * «Send it however you two normally talk» объясняла словами то, что уже
 * сказано значком «поделиться» на кнопке: канал выбирает человек.
 *
 * «The link carries your answers and nothing else — no name, no email»
 * успокаивала на счёт того, о чём никто не тревожился. Названный риск
 * создаёт сомнение, которого до этой строки не было: раз пишут — значит,
 * есть о чём думать. На странице нигде нет ни имени, ни почты, и в ссылке
 * взяться им неоткуда — это видно и без объяснений.
 *
 * БЛОК ОДИН И ТОТ ЖЕ ВСЕГДА — И ЭТО ВАЖНЕЕ, ЧЕМ КАЖЕТСЯ. Недолго здесь жил
 * второй вид блока: если страницу открыли по присланной ссылке, вместо
 * пересылки показывалось «что это за страница», рассчитанное на родителя.
 * Определялось это по адресу — а по адресу человека не различить: свой же
 * результат, открытый после обновления страницы или из закладки, выглядит
 * ровно так же, как чужой. Школьник обновлял страницу и получал экран для
 * родителя. Чинить это догадками (сверять ответы с сохранёнными в браузере)
 * значит менять явную ошибку на редкую и незаметную. Режима больше нет:
 * содержимое страницы не зависит от того, кто и откуда на неё пришёл.
 *
 * ПОЧЕМУ БЛОК СТАЛ ПЛАШКОЙ, НО НЕ ЗАЛИТОЙ. Раньше он отделялся от соседей
 * тонкой линией сверху — тем же приёмом, что и все секции вокруг, — и на
 * длинной странице сливался с ними. Рамка и поля делают из него предмет, а
 * не очередной абзац.
 *
 * Заливки при этом нет нарочно. Прямо над ним стоит призыв к записи —
 * залитая плашка с охряной рамкой; две залитые плашки подряд одного
 * бежевого тона глаз читает как одну длинную. Контур на фоне страницы даёт
 * третью форму: залитая — громкая, контурная — тихая, обычные секции — без
 * рамки вовсе. Порядок важности при этом сохраняется: запись важнее
 * пересылки.
 */
export default function ShareResults({
  test,
  attempt,
  questions,
}: {
  test: TestDefinition;
  attempt: Attempt;
  questions: Question[];
}) {
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState('');

  async function send() {
    const url = shareUrl(encodeAttempt(attempt, questions));
    const title = `${test.shortTitle} — practice test results`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err) {
        // Человек закрыл окно «поделиться» — это не ошибка, и подсовывать
        // ему вместо этого буфер обмена не нужно.
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setManual(url);
    }
  }

  return (
    <section className="flex flex-col gap-3 rounded border border-rule-strong bg-ground p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
        For your parents
      </p>
      <h2 className="text-balance font-serif text-xl font-semibold tracking-[-0.01em]">
        Show them what the test found
      </h2>
      <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
        The link opens exactly what you are looking at — the score, the topics the test flagged, and
        how to book the free session.
      </p>

      <div className="flex flex-col gap-2 pt-1">
        {/* Надпись на кнопке и есть подтверждение: она меняется там, куда
            человек только что нажал и куда смотрит. Отдельная строка «ссылка
            скопирована, вставьте её в чат» рядом была бы тем же самым во
            второй раз. */}
        <button
          type="button"
          onClick={send}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded border border-ink px-5 py-3 text-center text-[15px] font-semibold transition-colors hover:bg-surface sm:w-fit"
        >
          <ShareIcon />
          {copied ? 'Link copied' : 'Share this page'}
        </button>

        {manual ? (
          <p className="select-all break-all rounded border border-rule-strong bg-surface px-3 py-2 font-mono text-[12px] leading-relaxed">
            {manual}
          </p>
        ) : null}
      </div>
    </section>
  );
}
