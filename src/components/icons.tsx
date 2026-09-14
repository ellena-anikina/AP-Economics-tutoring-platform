/**
 * Значки интерфейса. Один файл на весь проект: раньше WhatsApp жил внутри
 * кнопки записи, а Instagram и Facebook — внутри экрана результатов, и при
 * первой же правке они разъехались бы.
 *
 * Все нарисованы в одной сетке 24×24 одной толщиной штриха, чтобы рядом
 * читались как набор, а не как случайные картинки.
 */
const BOX = 'shrink-0';

/**
 * «Поделиться» — стрелка, выходящая вверх из лотка.
 *
 * Общепринятых значка два: этот (iOS, а вслед за ним почти весь веб) и три
 * кружка на ветках (Android). Берём первый: он узнаётся на обеих системах, а
 * второй за пределами Android читается как «схема» или «граф». Значок здесь
 * помогает найти кнопку взглядом — что она делает, сказано словами рядом.
 */
export function ShareIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${className} ${BOX}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.6 10.4H6.8A1.8 1.8 0 0 0 5 12.2v6.5a1.8 1.8 0 0 0 1.8 1.8h10.4a1.8 1.8 0 0 0 1.8-1.8v-6.5a1.8 1.8 0 0 0-1.8-1.8h-1.8" />
      <path d="M12 3.6v10.8" />
      <path d="M8.4 7.2 12 3.6l3.6 3.6" />
    </svg>
  );
}

export function WhatsAppIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${className} ${BOX}`} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.83c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.08-8.09 8.08a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.05 8.05 0 0 1-1.24-4.31c0-4.46 3.63-8.09 8.09-8.09Z" />
      <path d="M8.9 7.28c-.18-.4-.36-.41-.53-.42l-.45-.01c-.16 0-.41.06-.63.29-.21.24-.82.8-.82 1.96s.84 2.27.96 2.43c.12.16 1.63 2.6 4.02 3.54 1.99.78 2.39.63 2.82.59.43-.04 1.39-.57 1.58-1.11.2-.55.2-1.01.14-1.11-.06-.1-.22-.16-.45-.28-.24-.12-1.39-.69-1.61-.77-.21-.08-.37-.12-.53.12-.16.24-.6.77-.74.93-.14.16-.27.18-.51.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.52-1.29-.72-1.76Z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${className} ${BOX}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Ножка «f» нарисована с отступом от рамки: в 16 пикселей она иначе
 *  сливается с краем и значок читается как пустой квадрат. */
export function FacebookIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${className} ${BOX}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M15.8 7.7h-1c-1 0-1.7.7-1.7 1.7v8.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.9 12.3h4.5" strokeLinecap="round" />
    </svg>
  );
}
