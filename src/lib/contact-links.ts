import { CTA } from '@/config/cta';
import { TEACHER } from '@/config/teacher';
import type { TestDefinition, TestResult } from '@/types';

/**
 * Подготовленные письма для режима без форм. Тексты те же, что уходят через
 * /api/contact, — чтобы при переключении режима человек получал одно и то же.
 */

/**
 * Ссылка на WhatsApp с заготовленным сообщением.
 *
 * Формат wa.me официальный: номер цифрами без «+», текст в `?text=`
 * закодированный. Сообщение только подставляется в поле ввода — отправляет
 * его человек сам, автоматически ничего не уходит.
 *
 * Текст намеренно короткий: длинный URL часть браузеров и сам WhatsApp
 * обрезают, и тогда собеседник получит оборванную фразу. Поэтому в
 * сообщение с результатом идут счёт и номера тем, а не весь разбор.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${CTA.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Номер WhatsApp так, как его пишут люди: +962 79 165 5454.
 *
 * В конфиге номер хранится цифрами — так требует wa.me. На странице записи
 * его показывают текстом: его сохраняют в контакты и переписывают, а
 * поисковики и нейросети берут номер из текста страницы, а не из ссылки.
 * Иорданский мобильный делится 2-3-4; любой другой номер выводится
 * цифрами с плюсом, без догадок о чужом формате.
 */
export function displayPhone(digits: string = CTA.whatsapp): string {
  const jo = digits.match(/^962(\d{2})(\d{3})(\d{4})$/);
  return jo ? `+962 ${jo[1]} ${jo[2]} ${jo[3]}` : `+${digits}`;
}

/** Общее сообщение — из шапки и с главной, где результата ещё нет. */
export function whatsappGeneral(): string {
  return whatsappLink(
    `Hi ${TEACHER.shortName}! I would like to book the free 15-minute consultation.`,
  );
}

/** Сообщение с экрана результатов: счёт и слабые темы — то, с чего
 *  преподавателю есть что начать разговор. */
export function whatsappResult(test: TestDefinition, result: TestResult): string {
  const weak = result.weakestTopics
    .slice(0, 2)
    .map((t) => t.title.replace(/^([\d.]+)\s.*/, '$1'))
    .join(' and ');
  const topics = weak ? ` Weakest topics: ${weak}.` : '';
  // Средняя точка из заголовка («AP® Microeconomics · Unit 2») в переписке
  // читается как опечатка — в сообщении она ни к чему.
  const testName = test.title.replace(' · ', ' ');
  return whatsappLink(
    `Hi ${TEACHER.shortName}! I scored ${result.correct}/${result.total} on your ${testName} ` +
      `practice test.${topics} Could I book the free 15-minute session?`,
  );
}

function scoreLines(test: TestDefinition, result: TestResult): string[] {
  const lines = [`Score: ${result.correct} out of ${result.total} on ${test.title}.`];
  if (result.weakestTopics.length > 0) {
    lines.push('', 'Topics the test flagged:');
    for (const topic of result.weakestTopics) lines.push(`  • ${topic.title}`);
  }
  return lines;
}

/** Письмо преподавателю: школьник просит бесплатный разбор. */
export function studentMailto(test: TestDefinition, result: TestResult): string {
  const subject = `Free session request — ${result.correct}/${result.total} on ${test.title}`;
  const body = [
    `Hi ${TEACHER.shortName},`,
    '',
    `I just took your practice test.`,
    '',
    ...scoreLines(test, result),
    '',
    'Could I book the free 15-minute session to go through these?',
    '',
    'Thanks!',
  ].join('\n');
  return `mailto:${CTA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
