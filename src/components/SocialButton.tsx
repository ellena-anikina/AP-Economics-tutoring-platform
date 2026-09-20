import { FacebookIcon, InstagramIcon, MailIcon, WhatsAppIcon } from '@/components/icons';

/**
 * Кнопка-ссылка на канал Ольги: соцсеть, WhatsApp-канал или почта.
 *
 * Одна на весь сайт: ей пользуются экран результатов («Keep AP® Economics in
 * your feed») и блок «About» на главной. Раньше в About были охряные
 * текстовые ссылки, а на экране результатов — эти кнопки, и одна и та же
 * дверь в Instagram выглядела на двух страницах по-разному. Отдельный
 * компонент — чтобы при следующей правке они не разъехались снова.
 *
 * Что написано на кнопке, решает место, где она стоит, а не компонент:
 * на экране результатов глагол («Follow on Instagram»), в About — название
 * канала и адрес. Почему так — в комментариях там и там.
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
 * Сама кнопка остаётся на фоне страницы.
 */

/* Фирменные цвета — только для плитки значка. Классы записаны литералами:
   Tailwind ищет их в тексте файла и не увидит собранную из кусков строку. */
const TILE = {
  instagram:
    'bg-[linear-gradient(135deg,#FEDA75_0%,#FA7E1E_28%,#D62976_58%,#962FBF_80%,#4F5BD5_100%)] text-white',
  facebook: 'bg-[#1877F2] text-white',
  // Наш затемнённый зелёный, а не фирменный #25D366: иначе на одном экране
  // окажутся два разных зелёных — здесь и на кнопке записи.
  whatsapp: 'bg-wa text-white',
  // У почты фирменного цвета нет, поэтому плитка в главном цвете сайта —
  // чернильно-синем. В тёмной теме токены меняются местами, и плитка
  // становится светлой со значком цвета фона: контраст 14 в обеих темах.
  email: 'bg-ink text-ground',
} as const;

export type SocialKind = keyof typeof TILE;

const ICON: Record<SocialKind, React.ReactNode> = {
  instagram: <InstagramIcon className="h-[18px] w-[18px]" />,
  facebook: <FacebookIcon className="h-[18px] w-[18px]" />,
  whatsapp: <WhatsAppIcon className="h-[18px] w-[18px]" />,
  email: <MailIcon className="h-[18px] w-[18px]" />,
};

export default function SocialButton({
  kind,
  href,
  label,
  note,
}: {
  kind: SocialKind;
  href: string;
  /** Главная строка кнопки. */
  label: string;
  /** Вторая строка: адрес или подпись. Пусто — не выводится. */
  note?: string;
}) {
  // Почта открывает почтовую программу, а не вкладку: target=_blank для
  // mailto в части браузеров оставляет после себя пустую вкладку.
  const external = !href.startsWith('mailto:');

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex w-full items-center gap-3 rounded-lg border border-rule-strong bg-ground px-4 py-3 transition-colors hover:border-ink-mute hover:bg-surface sm:w-auto"
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${TILE[kind]}`}
      >
        {ICON[kind]}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[15px] font-semibold leading-tight">{label}</span>
        {/* ink-soft, а не ink-mute: во второй строке бывает адрес почты, его
            читают и переписывают. ink-mute на светлом фоне даёт 3,64 при
            норме 4,5 для текста такого размера, ink-soft — 7,42. */}
        {note ? (
          <span className="break-words text-[13px] leading-snug text-ink-soft">{note}</span>
        ) : null}
      </span>
      {/* Стрелка — тот же знак «ведёт наружу», что на карточках тестов.
          Охряной она становится под курсором: в покое цвет бренда уже занят
          плиткой, и третий акцент был бы лишним. */}
      <span
        aria-hidden
        className="ml-auto shrink-0 pl-3 text-[15px] font-semibold text-ink-mute transition-colors group-hover:text-ochre sm:ml-2 sm:pl-0"
      >
        →
      </span>
    </a>
  );
}
