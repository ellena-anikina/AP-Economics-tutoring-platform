import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { activeProvider, isEmailConfigured, sendEmail } from './email.ts';

const KEYS = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'RESEND_API_KEY', 'EMAIL_FROM'] as const;

function clear() {
  for (const key of KEYS) delete process.env[key];
}

afterEach(clear);

test('без переменных окружения провайдера нет', () => {
  clear();
  assert.equal(activeProvider(), 'none');
  assert.equal(isEmailConfigured(), false);
});

test('неполный набор SMTP не включает провайдера', () => {
  clear();
  process.env.SMTP_HOST = 'smtp.gmail.com';
  process.env.SMTP_USER = 'her@gmail.com';
  // SMTP_PASS отсутствует
  assert.equal(activeProvider(), 'none');
});

test('полный набор SMTP выбирает smtp', () => {
  clear();
  process.env.SMTP_HOST = 'smtp.gmail.com';
  process.env.SMTP_USER = 'her@gmail.com';
  process.env.SMTP_PASS = 'app-password';
  assert.equal(activeProvider(), 'smtp');
});

test('Resend требует и ключ, и адрес отправителя', () => {
  clear();
  process.env.RESEND_API_KEY = 'key';
  assert.equal(activeProvider(), 'none', 'без EMAIL_FROM отправлять некому');
  process.env.EMAIL_FROM = 'hello@example.com';
  assert.equal(activeProvider(), 'resend');
});

test('при обоих настроенных провайдерах приоритет у SMTP', () => {
  clear();
  process.env.SMTP_HOST = 'smtp.gmail.com';
  process.env.SMTP_USER = 'her@gmail.com';
  process.env.SMTP_PASS = 'app-password';
  process.env.RESEND_API_KEY = 'key';
  process.env.EMAIL_FROM = 'hello@example.com';
  assert.equal(activeProvider(), 'smtp');
});

test('без провайдера отправка честно сообщает not_configured, а не притворяется успешной', async () => {
  clear();
  const result = await sendEmail({ to: 'a@b.com', subject: 's', text: 't' });
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.reason, 'not_configured');
});
