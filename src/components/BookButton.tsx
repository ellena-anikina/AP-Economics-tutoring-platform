import { WhatsAppIcon } from '@/components/icons';
import { CTA } from '@/config/cta';

/**
 * Единственное действие для записи на бесплатную консультацию — WhatsApp.
 *
 * ПОЧЕМУ WHATSAPP И ТОЛЬКО ОН. Раньше на экране результатов стояли три
 * равноправные кнопки: письмо, Instagram, Facebook. Три равных варианта — это
 * не забота, а необходимость выбирать, и часть людей не выбирает ничего.
 * WhatsApp выбран не наугад: номер иорданский, а в регионе это основной
 * канал деловой переписки (65–90% проникновения в соседних странах). Почта и
 * соцсети остались, но тихими ссылками — как справка, а не как развилка.
 *
 * ПОЧЕМУ ЗЕЛЁНЫЙ ИМЕННО ТАКОЙ. Фирменный #25D366 с белым текстом даёт
 * контраст 1,98 при норме 4,5 — его нельзя использовать, каким бы узнаваемым
 * он ни был. И на нашем кремовом фоне он почти не виден: 1,9. Оттенок
 * #078854 подобран расчётом: белый текст 4,51, кнопка на светлом фоне 4,32,
 * на тёмном 3,96 — проходит везде. Узнаваемость несёт значок, а не заливка.
 */
const SIZES = {
  sm: 'gap-2 px-3.5 py-2 text-[13px]',
  md: 'gap-2.5 px-5 py-3 text-[15px]',
  lg: 'gap-2.5 px-6 py-4 text-base',
} as const;

export default function BookButton({
  href,
  size = 'md',
  full = false,
  label = CTA.bookLabel,
}: {
  /** Ссылка wa.me — обычно из whatsappGeneral() или whatsappResult(). */
  href: string;
  size?: keyof typeof SIZES;
  /** Во всю ширину на телефоне: палец попадает куда угодно. */
  full?: boolean;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded bg-wa font-semibold text-white transition-opacity hover:opacity-90 ${
        SIZES[size]
      } ${full ? 'w-full sm:w-fit' : 'w-fit'}`}
    >
      <WhatsAppIcon className={size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'} />
      {label}
    </a>
  );
}
