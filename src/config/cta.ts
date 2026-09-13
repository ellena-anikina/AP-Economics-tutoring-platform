/**
 * Как человек связывается с преподавателем с экрана результатов.
 *
 * 'contact' — без форм: письмо с подставленным результатом и Instagram.
 *             Ничего не требует и работает всегда. Текущий режим, пока не
 *             настроена отправка писем.
 * 'form'     — формы записи и отправки родителю через /api/contact. Включать
 *             только когда в окружении есть SMTP или Resend (см. .env.example),
 *             иначе форма будет молча упираться в запасной путь.
 * 'booking'  — прямая ссылка на Calendly или другой сервис записи.
 */
export type CtaMode = 'contact' | 'form' | 'booking';

export const CTA: {
  mode: CtaMode;
  email: string;
  bookingUrl: string;
  /** Только цифры, со страновым кодом и без «+» — так требует wa.me.
   *  962 — Иордания, где WhatsApp основной способ связи для бизнеса. */
  whatsapp: string;
  /** Текст на кнопке. Формулировка преподавателя. */
  bookLabel: string;
} = {
  mode: 'contact',
  email: 'olgashalamaiwba@gmail.com',
  bookingUrl: '',
  whatsapp: '962791655454',
  bookLabel: 'Book your free consultation',
};
