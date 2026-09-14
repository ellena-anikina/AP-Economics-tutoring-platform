import BookButton from '@/components/BookButton';
import ContactForm from '@/components/ContactForm';
import TeacherCard from '@/components/TeacherCard';
import { CTA } from '@/config/cta';
import { TEACHER } from '@/config/teacher';
import type { ResultSummary } from '@/lib/contact-schema';
import { studentMailto, whatsappResult } from '@/lib/contact-links';
import type { TestDefinition, TestResult } from '@/types';

function topicNumbers(result: TestResult, n: number): string[] {
  return result.weakestTopics.slice(0, n).map((t) => t.title.replace(/^([\d.]+)\s.*/, '$1'));
}

function summarise(test: TestDefinition, result: TestResult): ResultSummary {
  return {
    testTitle: test.title,
    correct: result.correct,
    total: result.total,
    weakestTopics: result.weakestTopics.map((t) => t.title),
  };
}

/**
 * Призыв к действию на экране результатов — ровно одно действие.
 *
 * Здесь раньше жили пять кликабельных элементов: WhatsApp, письмо, Instagram,
 * адрес с кнопкой «скопировать» и ссылка «отправить родителю». Называть это
 * одним призывом было самообманом. Instagram убран: это второй мессенджер для
 * того же намерения «написать ей», а два мессенджера рядом заставляют
 * выбирать приложение вместо того, чтобы написать. Адрес с кнопкой копирования
 * убран тоже — он делал ровно то же, что ссылка «Email my results», третьим
 * способом.
 *
 * Осталось: кто это, что предлагается, зелёная кнопка и одна тихая строка на
 * случай, если человек не пользуется WhatsApp.
 *
 * Путь к родителю отсюда вынесен — он адресован другому человеку и живёт
 * отдельным блоком ниже (`ShareResults`). Внутри чужого призыва он и мешал
 * записи, и сам не работал.
 */
export default function ResultsCta({
  test,
  result,
}: {
  test: TestDefinition;
  result: TestResult;
}) {
  const weak = topicNumbers(result, 2);
  const summary = summarise(test, result);

  // Первое лицо, а не «with Dr. Shalamai»: её фотография, имя и регалии
  // стоят строкой выше, представлять её ещё раз в третьем лице незачем.
  // «together» вдобавок снимает у подростка ощущение, что его собираются
  // экзаменовать ещё раз. Третье лицо на сайте осталось только в подписях.
  const headline =
    weak.length > 0
      ? `Let’s work through ${weak.join(' and ')} together`
      : 'Let’s talk through this test together';

  return (
    <section className="flex flex-col gap-5 rounded border border-ochre-soft bg-surface-alt p-5 sm:p-7">
      <TeacherCard />

      <div className="flex flex-col gap-2 border-t border-rule pt-5">
        <h2 className="text-balance font-serif text-2xl font-semibold leading-snug tracking-[-0.01em]">
          {headline}
        </h2>
        <p className="max-w-measure text-pretty text-[15px] leading-relaxed text-ink-soft">
          {TEACHER.sessionOffer}
        </p>
      </div>

      {CTA.mode === 'form' ? (
        <ContactForm
          kind="booking"
          result={summary}
          submitLabel="Book the free 15-minute session"
          noteLabel="Anything you want covered? (optional)"
          notePlaceholder="I keep mixing up comparative and absolute advantage…"
          successTitle="Sent."
          successBody="I have your results and will reply to arrange a time."
          mailtoFallback={studentMailto(test, result)}
          disclosure="Your score and the flagged topics are included so I can prepare before the call."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {/* В сообщение уже подставлены счёт и слабые темы: преподавателю
              есть с чего начать, а ученику нечего сочинять. Отправляет
              сообщение он сам — wa.me только заполняет поле ввода. */}
          <BookButton href={whatsappResult(test, result)} size="lg" full />

          <p className="text-[13px] leading-relaxed text-ink-mute">
            Not on WhatsApp?{' '}
            <a
              href={studentMailto(test, result)}
              className="font-medium text-ochre underline underline-offset-2"
            >
              Email these results to {TEACHER.shortName}
            </a>{' '}
            instead.
          </p>
        </div>
      )}
    </section>
  );
}
