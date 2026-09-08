import nodemailer from 'nodemailer';

/**
 * Отправка писем. Провайдер выбирается по переменным окружения, а весь
 * остальной код о нём не знает — сменить его значит переписать этот файл.
 *
 * Порядок выбора:
 *   1. SMTP (SMTP_HOST + SMTP_USER + SMTP_PASS) — например ящик Gmail с
 *      паролем приложения. Домен не нужен, письма уходят с её реального
 *      адреса. Это бесплатный путь на время разработки.
 *   2. Resend (RESEND_API_KEY + EMAIL_FROM) — когда появится свой домен.
 *   3. Ничего не настроено — письмо печатается в консоль сервера, а форма
 *      честно показывает запасную ссылку mailto. Молча терять заявки нельзя.
 */

export type SendResult =
  | { ok: true; via: 'smtp' | 'resend' }
  | { ok: false; reason: 'not_configured' | 'send_failed'; detail?: string };

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

type Provider = 'smtp' | 'resend' | 'none';

export function activeProvider(): Provider {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) return 'smtp';
  if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) return 'resend';
  return 'none';
}

export function isEmailConfigured(): boolean {
  return activeProvider() !== 'none';
}

async function sendViaSmtp(message: EmailMessage): Promise<SendResult> {
  const host = process.env.SMTP_HOST!;
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const port = Number(process.env.SMTP_PORT ?? 465);

  // Gmail и большинство провайдеров переписывают From на аутентифицированный
  // ящик, поэтому по умолчанию отправляем именно с него.
  const from = process.env.EMAIL_FROM || user;

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transport.sendMail({
      from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      ...(message.replyTo ? { replyTo: message.replyTo } : {}),
    });

    return { ok: true, via: 'smtp' };
  } catch (error) {
    console.error('[email] smtp send failed', error);
    return { ok: false, reason: 'send_failed', detail: 'smtp' };
  }
}

async function sendViaResend(message: EmailMessage): Promise<SendResult> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [message.to],
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('[email] resend rejected the message', response.status, detail);
      return { ok: false, reason: 'send_failed', detail: `HTTP ${response.status}` };
    }

    return { ok: true, via: 'resend' };
  } catch (error) {
    console.error('[email] resend request failed', error);
    return { ok: false, reason: 'send_failed', detail: 'network' };
  }
}

export async function sendEmail(message: EmailMessage): Promise<SendResult> {
  switch (activeProvider()) {
    case 'smtp':
      return sendViaSmtp(message);
    case 'resend':
      return sendViaResend(message);
    default:
      // В разработке письмо видно целиком в консоли сервера — так форму
      // можно проверить от начала до конца, ничего не подключая.
      console.info('[email] no provider configured, message not sent:\n', {
        to: message.to,
        subject: message.subject,
        text: message.text,
      });
      return { ok: false, reason: 'not_configured' };
  }
}
