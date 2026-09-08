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
} = {
  mode: 'contact',
  email: 'olgashalamaiwba@gmail.com',
  bookingUrl: '',
};
