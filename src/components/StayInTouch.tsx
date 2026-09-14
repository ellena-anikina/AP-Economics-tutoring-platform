import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components/icons';
import { CTA } from '@/config/cta';
import Reg from '@/components/Reg';
import { TEACHER } from '@/config/teacher';

/**
 * Последний блок экрана результатов — куда подписаться, чтобы предмет
 * остался перед глазами до экзамена.
 *
 * Про запись здесь не сказано ни слова, и это осознанно: человек уже прошёл
 * мимо двух просьб выше, и напоминать ему об этом значит назвать его
 * отказавшимся. Блок отвечает на другой вопрос — где меня потом найти.
 *
 * ФОРМА — КНОПКИ, А НЕ СПИСОК СТРОК. Раньше здесь был навигационный список
 * (строка на всю ширину, разделители, стрелка справа) — форма пунктов
 * настроек. Она честно говорила «это ссылки», но не говорила «нажми»: до
 * блока доходят после разбора двадцати вопросов, десятью тысячами пикселей
 * ниже начала, и тихая серая строка на этой глубине просто не заметна.
 * Кнопка — это обещание отклика, список — только оглавление.
 *
 * И ПОЭТОМУ ЖЕ НА НИХ ГЛАГОЛ. В навигационном списке пункты называются
 * существительными («Instagram»), на кнопках — глаголами («Follow on
 * Instagram»). Слово повторяется от кнопки к кнопке, и это нормально:
 * повтор — цена того, что каждая кнопка читается отдельно от соседей.
 * Раньше глагол стоял один раз во вводной фразе, теперь он на кнопках, и
 * из абзаца его нужно было убрать — иначе он звучал бы трижды подряд.
 *
 * ЦВЕТ ЖИВЁТ В ЗНАЧКЕ, А НЕ В ЗАЛИВКЕ КНОПКИ. Фирменная заливка с белой
 * надписью здесь невозможна по расчёту: белый на #1877F2 даёт контраст
 * 4,23 при норме 4,5, на зелёном #25D366 — 1,98, а на светлом конце
 * инстаграмного градиента (#FEDA75) — 1,35, то есть надпись физически не
 * читается. Затемнять фирменные цвета до нормы значит потерять именно то,
 * ради чего их берут, — узнавание.
 *
 * Поэтому цвет отдан плитке значка: она графика, а не текст, смысл несёт
 * подпись рядом, и на 32 пикселях фирменный градиент узнаётся мгновенно.
 * Сама кнопка остаётся на фоне страницы. Так блок стал заметно ярче, но
 * охряная рамка записи выше по-прежнему самая громкая на экране — а она и
 * должна быть главной.
 *
 * ПОДПИСИ К ССЫЛКАМ БЕРУТСЯ ИЗ КОНФИГА И ПО УМОЛЧАНИЮ ПУСТЫ. Здесь стояло
 * выдуманное «Where I post for students» и «for parents». Выросло это из
 * нашего же решения, какой канал кому показывать, и было принято за знание о
 * её аккаунтах — чего мы не знаем. Подпись действительно превращает серый
 * прямоугольник в дверь, но только если она правда; сочинённая подпись — это
 * обещание за преподавателя, которое некому сдержать.
 */

/* Фирменные цвета — только для плитки значка. Классы записаны литералами:
   Tailwind ищет их в тексте файла и не увидит собранную из кусков строку. */
const TILE: Record<string, string> = {
  instagram:
    'bg-[linear-gradient(135deg,#FEDA75_0%,#FA7E1E_28%,#D62976_58%,#962FBF_80%,#4F5BD5_100%)]',
  facebook: 'bg-[#1877F2]',
  // Наш затемнённый зелёный, а не фирменный #25D366: иначе на одном экране
  // окажутся два разных зелёных — здесь и на кнопке записи.
  whatsapp: 'bg-wa',
};

interface Door {
  id: keyof typeof TILE;
  href: string;
  /** Надпись на кнопке — с глаголом. */
  label: string;
  /** Чем полезна эта дверь — из конфига, её словами. Пусто — не выводится. */
  who: string;
  icon: React.ReactNode;
}

export default function StayInTouch() {
  const wa = CTA.whatsappFollow;

  const doors: Door[] = [
    // Ссылки нет — кнопки нет. Кнопка в никуда хуже, чем её отсутствие.
    ...(wa.url
      ? [
          {
            id: 'whatsapp' as const,
            href: wa.url,
            label: 'Follow on WhatsApp',
            who: '',
            icon: <WhatsAppIcon className="h-[18px] w-[18px]" />,
          },
        ]
      : []),
    {
      id: 'instagram' as const,
      href: TEACHER.instagramUrl,
      label: 'Follow on Instagram',
      who: TEACHER.instagramNote,
      icon: <InstagramIcon className="h-[18px] w-[18px]" />,
    },
    {
      id: 'facebook' as const,
      href: TEACHER.facebookUrl,
      label: 'Follow on Facebook',
      who: TEACHER.facebookNote,
      icon: <FacebookIcon className="h-[18px] w-[18px]" />,
    },
  ];

  return (
    <section className="flex flex-col gap-5 border-t border-rule pt-8">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
          Between now and the exam
        </p>
        {/* Знак ® обязателен при каждом упоминании AP (правила College
            Board). Reg делает его надстрочным и связывает с «AP» неразрывно,
            чтобы строка не порвалась между ними. */}
        <h2 className="text-balance font-serif text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
          <Reg>Keep AP® Economics in your feed</Reg>
        </h2>
        {/* Что публикуется в аккаунтах — словами преподавателя, из конфига.
            Пока строка пуста, обещаем только то, за что отвечаем сами:
            новые тесты по юнитам. Приглашение подписаться теперь стоит на
            кнопках, поэтому здесь его нет. */}
        <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
          <Reg>{TEACHER.socialBlurb || 'New unit tests go up as they are written.'}</Reg>
        </p>
      </div>

      {/* На телефоне кнопки во всю ширину и одна под другой — палец попадает
          куда угодно. На широком экране встают в ряд по содержимому. */}
      <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        {doors.map((door) => (
          <li key={door.id} className="sm:w-auto">
            <a
              href={door.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center gap-3 rounded-lg border border-rule-strong bg-ground px-4 py-3 transition-colors hover:border-ink-mute hover:bg-surface sm:w-auto"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white ${
                  TILE[door.id]
                }`}
              >
                {door.icon}
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[15px] font-semibold leading-tight">{door.label}</span>
                {door.who ? (
                  <span className="text-[13px] leading-snug text-ink-mute">{door.who}</span>
                ) : null}
              </span>
              {/* Стрелка — тот же знак «ведёт наружу», что на карточках
                  тестов. Охряной она становится под курсором: в покое цвет
                  бренда уже занят плиткой, и третий акцент был бы лишним. */}
              <span
                aria-hidden
                className="ml-auto shrink-0 pl-3 text-[15px] font-semibold text-ink-mute transition-colors group-hover:text-ochre sm:ml-2 sm:pl-0"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Про приватность канала мы знаем точно — это устройство WhatsApp, а
          не заявление о её контенте. В группе номер каждого участника виден
          всем, в канале — никому; сказать это нужно до нажатия. */}
      {wa.url && wa.kind === 'channel' ? (
        <p className="text-[13px] leading-snug text-ink-mute">
          The WhatsApp link is a channel, not a group — nobody sees your number.
        </p>
      ) : null}
    </section>
  );
}
