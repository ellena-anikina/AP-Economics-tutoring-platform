import { CTA } from '@/config/cta';
import { TEACHER } from '@/config/teacher';
import type { TestDefinition, TestResult } from '@/types';

/**
 * Подготовленные письма для режима без форм. Тексты те же, что уходят через
 * /api/contact, — чтобы при переключении режима человек получал одно и то же.
 */

/**
 * Адрес этого сайта. Раньше в письме стояла ссылка на её старый сайт на Wix —
 * но сайт преподавателя теперь этот, и вести родителя на второй, более
 * слабый, значит терять его на полпути. Origin берётся из браузера, а не из
 * конфига: захардкоженный адрес разойдётся с реальностью при первом переезде
 * домена, а тихо неверная ссылка в письме хуже, чем её отсутствие.
 */
function siteOrigin(): string {
  return typeof window === 'undefined' ? '' : window.location.origin;
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

/**
 * Письмо родителю. Адресат пустой — почтовый клиент спросит, кому.
 * Написано так, чтобы взрослый понял всё без контекста: что за тест, какой
 * результат, кто преподаватель и что первый разговор бесплатный.
 */
export function parentMailto(test: TestDefinition, result: TestResult): string {
  const subject = 'My AP® Microeconomics practice test results';
  const body = [
    'I took a free AP® Microeconomics practice test and wanted to show you how it went.',
    '',
    ...scoreLines(test, result),
    '',
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
    `Her email: ${CTA.email}`,
    `Facebook: ${TEACHER.facebookUrl}`,
    ...(siteOrigin() ? [`The test and more about her work: ${siteOrigin()}`] : []),
  ].join('\n');
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
