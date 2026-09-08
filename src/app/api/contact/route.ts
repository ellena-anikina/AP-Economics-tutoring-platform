import { NextResponse } from 'next/server';
import { CTA } from '@/config/cta';
import { TEACHER } from '@/config/teacher';
import {
  hasErrors,
  validateContact,
  type ContactPayload,
  type ResultSummary,
} from '@/lib/contact-schema';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

/** Грубое ограничение частоты в памяти процесса. Формы публичные и без
 *  капчи, так что дешёвый барьер против шума нужен уже сейчас. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function summarise(result: ResultSummary): string {
  const lines = [`Score: ${result.correct} out of ${result.total} on ${result.testTitle}.`];
  if (result.weakestTopics.length > 0) {
    lines.push('', 'Topics the test flagged:');
    for (const topic of result.weakestTopics) lines.push(`  • ${topic}`);
  }
  return lines.join('\n');
}

function bookingEmail(input: ContactPayload): { subject: string; text: string } {
  // Пустые строки здесь — это абзацные отступы письма. Их нельзя отсеивать
  // вместе с необязательными блоками, иначе письмо склеивается в стену текста.
  const lines: string[] = [
    `${input.studentName} has asked to book the free 15-minute session.`,
    '',
    summarise(input.result),
    '',
    `Reply to: ${input.studentEmail}`,
    ...(input.note ? ['', 'Their message:', input.note] : []),
    '',
    '— sent from the AP® Economics practice test',
  ];
  return {
    subject: `Free session request — ${input.studentName} (${input.result.correct}/${input.result.total})`,
    text: lines.join('\n'),
  };
}

function parentEmail(input: ContactPayload): { subject: string; text: string } {
  const lines: string[] = [
      `${input.studentName} has just taken a free AP® Microeconomics practice test and asked for these results to be sent to you.`,
      '',
      summarise(input.result),
      '',
      ...(input.note ? ['Their note:', input.note, ''] : []),
      TEACHER.parentHeadline.toUpperCase(),
      '',
      TEACHER.parentPitch,
      '',
      `The test was written by ${TEACHER.name}, who has spent more than ten years teaching economics and preparing students for the AP® exams.`,
      '',
      'She offers a free 15-minute session to go through results like these — what the weak topics mean, and what to do about them before the exam. There is no cost for that first conversation.',
      '',
      'What her students typically leave with:',
      ...TEACHER.outcomes.slice(0, 4).map((o) => `  • ${o}`),
      '',
      `Reply to this email to reach her, or write to ${CTA.email}`,
      ...(TEACHER.siteUrl ? [`More about her work: ${TEACHER.siteUrl}`] : []),
      '',
      `You can reach ${input.studentName} at ${input.studentEmail}.`,
  ];
  return {
    subject: `${input.studentName}’s AP® Microeconomics practice test results`,
    text: lines.join('\n'),
  };
}

function teacherNotice(input: ContactPayload): { subject: string; text: string } {
  return {
    subject: `Results sent to a parent — ${input.studentName} (${input.result.correct}/${input.result.total})`,
    text: [
      `${input.studentName} sent their practice test results to ${input.parentEmail}.`,
      '',
      summarise(input.result),
      '',
      `Student: ${input.studentEmail}`,
      'The parent has your reply-to address, so expect a reply from them.',
    ].join('\n'),
  };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited', message: 'Too many messages just now. Please try again later.' },
      { status: 429 },
    );
  }

  let input: ContactPayload;
  try {
    input = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Ловушка для ботов: отвечаем успехом, чтобы не подсказывать им правило.
  if (input.website) return NextResponse.json({ ok: true });

  if (input.kind !== 'booking' && input.kind !== 'parent') {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, error: 'invalid', errors }, { status: 400 });
  }

  if (input.kind === 'booking') {
    const { subject, text } = bookingEmail(input);
    const sent = await sendEmail({
      to: CTA.email,
      subject,
      text,
      replyTo: input.studentEmail.trim(),
    });
    return sent.ok
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ ok: false, error: sent.reason }, { status: 502 });
  }

  const { subject, text } = parentEmail(input);
  const sent = await sendEmail({
    to: input.parentEmail!.trim(),
    subject,
    text,
    replyTo: CTA.email,
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: sent.reason }, { status: 502 });
  }

  // Преподаватель должна знать, что появился тёплый контакт. Об этом
  // сказано в форме прямым текстом — тихо копировать письма нельзя.
  const notice = teacherNotice(input);
  await sendEmail({ to: CTA.email, subject: notice.subject, text: notice.text });

  return NextResponse.json({ ok: true });
}
