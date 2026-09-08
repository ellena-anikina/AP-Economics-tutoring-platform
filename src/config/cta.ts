/**
 * Куда ведёт кнопка на экране результатов.
 *
 * 'mailto'  — работает сегодня, ничего настраивать не нужно. Тема и текст
 *             письма подставляются из результата, преподаватель сразу видит,
 *             кто написал и с чем.
 * 'booking' — ссылка на Calendly или другой сервис записи.
 * 'form'    — форма с email. НЕ включать, пока адреса некуда складывать:
 *             форма, которая ничего не сохраняет, хуже, чем её отсутствие.
 */
export type CtaMode = 'mailto' | 'booking' | 'form';

export const CTA: {
  mode: CtaMode;
  email: string;
  bookingUrl: string;
  teacherName: string;
} = {
  mode: 'mailto',
  email: 'REPLACE_ME@example.com',
  bookingUrl: '',
  teacherName: 'your instructor',
};
