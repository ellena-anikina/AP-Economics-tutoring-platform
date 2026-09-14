import type { Attempt, ChoiceId, Question } from '@/types';

/**
 * Ссылка на результат — сам результат, упакованный в адрес страницы.
 *
 * ЗАЧЕМ. Тест проходит школьник, а занятия оплачивает родитель. Раньше мост
 * между ними был письмом: кнопка открывала почтовый клиент с готовым текстом.
 * Подростки не пишут родителям писем — они пишут в мессенджере, и почтовый
 * клиент на телефоне часто вообще не настроен. Ссылку же можно бросить куда
 * угодно: в WhatsApp, в Telegram, в Instagram, в школьный чат. Куда именно,
 * подросток разберётся сам лучше нас.
 *
 * ПОЧЕМУ БЕЗ СЕРВЕРА. Сайт статический: страницы отдаются файлами, базы нет.
 * Чтобы «сохранить результат и дать на него ссылку», обычно заводят хранилище
 * — а это сервер, база, чужие данные на нём, сроки хранения и согласия. Здесь
 * всё это не нужно: ответов двадцать, каждый из шести состояний (пусто и
 * A–E), и весь результат помещается в десять символов.
 *
 * ПОЧЕМУ БАЗА 36. Шесть состояний на вопрос: 6 × 6 = 36 — ровно алфавит
 * base36. Пара вопросов укладывается в один символ без остатка, без битовых
 * сдвигов и без BigInt. Двадцать вопросов — десять символов.
 *
 * ПОЧЕМУ ХЭШ, А НЕ ПАРАМЕТР ЗАПРОСА. Всё после «#» браузер серверу не
 * отправляет: результат не попадёт ни в логи хостинга, ни в Referer при
 * переходе по ссылке со страницы. Для чужого результата, который человек
 * пересылает или публикует, это правильное поведение по умолчанию.
 *
 * ЧТО В ССЫЛКЕ ЕСТЬ И ЧЕГО В НЕЙ НЕТ. Есть номера выбранных вариантов. Нет
 * имени, почты, телефона, времени прохождения и идентификатора посетителя.
 * Открывший ссылку видит тот же разбор и не узнаёт, кто её прислал.
 *
 * СОВМЕСТИМОСТЬ. Первый символ — версия формата. Если однажды упаковка
 * изменится, старые ссылки можно будет разобрать по-старому, а не сломать.
 * Какой это тест, сказано адресом страницы, поэтому в полезной нагрузке его
 * нет; длина строки сверяется с числом вопросов, и чужая ссылка на другой
 * юнит не развернётся.
 */

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
const CHOICES: ChoiceId[] = ['A', 'B', 'C', 'D', 'E'];
const VERSION = '1';

/** Префикс адреса: `#r=` и дальше полезная нагрузка. */
export const SHARE_HASH = '#r=';

export function encodeAttempt(attempt: Attempt, questions: Question[]): string {
  // 0 — вопрос без ответа, 1..5 — варианты A..E.
  const codes = questions.map((q) => {
    const picked = attempt.answers[q.id]?.choiceId ?? null;
    const i = picked === null ? -1 : CHOICES.indexOf(picked);
    return i === -1 ? 0 : i + 1;
  });

  let out = '';
  for (let i = 0; i < codes.length; i += 2) {
    out += ALPHABET[codes[i] * 6 + (codes[i + 1] ?? 0)];
  }
  return VERSION + out;
}

/**
 * Разбирает полезную нагрузку обратно в попытку. null — если строка не наша:
 * другая версия, другой тест, испорченный при пересылке адрес. Тогда
 * страница просто откроется как обычно, а не покажет выдуманный результат.
 */
export function decodeAttempt(
  payload: string,
  questions: Question[],
  testSlug: string,
): Attempt | null {
  if (!payload.startsWith(VERSION)) return null;
  const body = payload.slice(VERSION.length);
  if (body.length !== Math.ceil(questions.length / 2)) return null;

  const codes: number[] = [];
  for (const ch of body) {
    const v = ALPHABET.indexOf(ch);
    if (v < 0) return null;
    codes.push(Math.floor(v / 6), v % 6);
  }

  const answers: Attempt['answers'] = {};
  questions.forEach((q, i) => {
    const code = codes[i];
    // Время и число заходов в ссылку не попадают: на экране результатов они
    // не показываются, а тащить их значит удлинять адрес ради ничего.
    answers[q.id] = {
      choiceId: code === 0 ? null : CHOICES[code - 1],
      seconds: 0,
      visits: 1,
    };
  });

  return { id: 'shared', testSlug, startedAt: 0, finishedAt: 0, answers };
}

/** Полный адрес для пересылки. Пустая строка на сервере — там окна нет. */
export function shareUrl(payload: string): string {
  if (typeof window === 'undefined') return '';
  const { origin, pathname } = window.location;
  return `${origin}${pathname}${SHARE_HASH}${payload}`;
}
