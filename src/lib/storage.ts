import type { Attempt } from '@/types';

const ATTEMPT_PREFIX = 'attempt:';
const VISITOR_KEY = 'visitorId';

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Анонимный идентификатор посетителя. Ничего не стоит сейчас, а позже
 * позволяет показать «твои прошлые результаты по другим юнитам» — картину
 * прогресса за курс — без регистрации и личных кабинетов.
 */
export function visitorId(): string {
  return safe(() => {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const id = newId();
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  }, 'anonymous');
}

export function saveAttempt(attempt: Attempt): void {
  safe(() => {
    localStorage.setItem(`${ATTEMPT_PREFIX}${attempt.testSlug}`, JSON.stringify(attempt));
    return true;
  }, false);
}

export function loadAttempt(testSlug: string): Attempt | null {
  return safe<Attempt | null>(() => {
    const raw = localStorage.getItem(`${ATTEMPT_PREFIX}${testSlug}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attempt;
    return parsed && typeof parsed.id === 'string' ? parsed : null;
  }, null);
}

export function clearAttempt(testSlug: string): void {
  safe(() => {
    localStorage.removeItem(`${ATTEMPT_PREFIX}${testSlug}`);
    return true;
  }, false);
}
