/**
 * Форма контакта: типы и проверка. Один модуль на клиент и сервер, чтобы
 * правила не разъезжались. Серверу доверять клиентской валидации нельзя,
 * поэтому она вызывается с обеих сторон.
 */

export type ContactKind = 'booking' | 'parent';

export interface ResultSummary {
  testTitle: string;
  correct: number;
  total: number;
  weakestTopics: string[];
}

export interface ContactPayload {
  kind: ContactKind;
  studentName: string;
  studentEmail: string;
  /** Только для kind === 'parent'. */
  parentEmail?: string;
  note?: string;
  /** Ловушка для ботов: люди это поле не видят и не заполняют. */
  website?: string;
  result: ResultSummary;
}

export const LIMITS = { name: 80, email: 254, note: 1000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string): boolean {
  return value.length <= LIMITS.email && EMAIL_RE.test(value.trim());
}

export type FieldErrors = Partial<Record<'studentName' | 'studentEmail' | 'parentEmail' | 'note', string>>;

export function validateContact(input: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};

  const name = input.studentName?.trim() ?? '';
  if (name.length < 2) errors.studentName = 'Please enter your name.';
  else if (name.length > LIMITS.name) errors.studentName = 'That name is too long.';

  const email = input.studentEmail?.trim() ?? '';
  if (!email) errors.studentEmail = 'Please enter your email so you can be reached.';
  else if (!isEmail(email)) errors.studentEmail = 'That does not look like an email address.';

  if (input.kind === 'parent') {
    const parent = input.parentEmail?.trim() ?? '';
    if (!parent) errors.parentEmail = 'Please enter the address to send this to.';
    else if (!isEmail(parent)) errors.parentEmail = 'That does not look like an email address.';
  }

  if ((input.note?.length ?? 0) > LIMITS.note) errors.note = 'Please keep this under 1000 characters.';

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
