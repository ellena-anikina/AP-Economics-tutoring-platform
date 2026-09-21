import type { Metadata } from 'next';
import Link from 'next/link';
import BookButton from '@/components/BookButton';
import Reg from '@/components/Reg';
import { TeacherByline } from '@/components/TeacherCard';
import { ALL_ANSWERS, ANSWER_SECTIONS, type Answer } from '@/config/questions';
import { SITE_URL } from '@/config/site';
import { TEACHER } from '@/config/teacher';
import { TESTS } from '@/config/tests';
import { pageMetadata } from '@/lib/seo';
import { whatsappGeneral } from '@/lib/contact-links';

/**
 * /faq — все вопросы и ответы на одной странице.
 *
 * ПОЧЕМУ /faq, А НЕ /answers ИЛИ /resources. Слово выбрано не по вкусу:
 * «faq» набирают в поиске вместе с названием бренда, остальные — нет. Одно
 * привычное слово в подвале, в адресе и в заголовке понятнее, чем два разных
 * раздела рядом. В плане продвижения раздел назван /resources (§4) — это
 * осознанное отступление, сделано до публикации, редиректы не нужны.
 *
 * ПОЧЕМУ ВСЁ НА ОДНОЙ СТРАНИЦЕ. Ответы были разложены по пяти страницам, по
 * курсам, а /faq оставался указателем: человек заходил в раздел вопросов и
 * не находил ни одного ответа. Плохо и для него, и для поиска — странице без
 * собственного текста нечем отвечать на запрос. К тому же домен новый: одна
 * страница, на которую ведут все ссылки, набирает вес быстрее, чем пять
 * страниц по шестьсот слов, а Google умеет открывать длинную страницу сразу
 * на нужном абзаце. Делить обратно стоит тогда, когда у темы наберётся
 * несколько полных статей.
 *
 * СВЕРХУ — УКАЗАТЕЛИ. Шесть ссылок на разделы: за один взгляд видно, о чём
 * здесь вообще есть ответы, и можно прыгнуть в свой. Списка из пятидесяти
 * ссылок наверху нет намеренно — на телефоне он был бы длиннее половины
 * страницы.
 *
 * У КАЖДОГО ВОПРОСА СВОЙ ЯКОРЬ (/faq#scarce-mean-rare-economics). По нему
 * ссылаются на конкретный ответ — из переписки, из будущей статьи, из ответа
 * нейросети. Разметка FAQPage повторяет ровно то, что видно на странице:
 * особых мест в выдаче за неё давно не дают, но машина получает вопросы и
 * ответы уже разобранными.
 */

const PATH = '/faq';

export const metadata: Metadata = pageMetadata({
  title: 'AP® and IGCSE Economics FAQ | Olganomics',
  description:
    'Fifty answers from Olga Shalamai: lessons and the free 15-minute consultation, AP® Economics and exam ' +
    'strategy, AP® Microeconomics concepts and graphs, IGCSE Economics and IGCSE Business.',
  path: PATH,
  ogTitle: 'AP® and IGCSE Economics FAQ',
});

function QuestionItem({ answer }: { answer: Answer }) {
  return (
    <li className="flex flex-col gap-2 border-t border-rule pt-6 first:border-0 first:pt-0">
      {/* scroll-mt: при переходе по якорю заголовок не должен прилипать
          к самому краю окна — над ним остаётся воздух. */}
      <h3
        id={answer.id}
        className="scroll-mt-6 text-balance font-serif text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] sm:text-[1.375rem]"
      >
        <Reg>{answer.q}</Reg>
      </h3>
      <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
        <Reg>{answer.a}</Reg>
      </p>
    </li>
  );
}

export default function Faq() {
  const url = new URL(PATH, SITE_URL).toString();
  const exam = TESTS[0];

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    inLanguage: 'en',
    mainEntity: ALL_ANSWERS.map((a) => ({
      '@type': 'Question',
      '@id': `${url}#${a.id}`,
      name: a.q,
      acceptedAnswer: { '@type': 'Answer', text: a.a },
    })),
    author: { '@type': 'Person', '@id': `${SITE_URL}/#olga-shalamai`, name: TEACHER.name },
  };

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:gap-12 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, '\\u003c') }}
      />

      <header className="flex flex-col gap-5">
        <h1 className="text-balance font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.015em] sm:text-[2.75rem] lg:text-[3.25rem]">
          <Reg>AP® and IGCSE Economics FAQ</Reg>
        </h1>
        <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
          {ALL_ANSWERS.length} questions that students and parents actually ask — about lessons, the
          exams, and the marks in between. Answered briefly and without textbook language.
        </p>
        <div className="pt-1">
          <TeacherByline />
        </div>

        {/* Указатели по разделам: ссылки на якоря, а не на другие страницы. */}
        <nav aria-label="Sections on this page" className="flex flex-wrap gap-2 pt-2">
          {ANSWER_SECTIONS.map((section) => (
            // inline-block, а не inline-flex: во flex пробел после значка ®
            // съедается, и получается «AP®Economics».
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-block rounded-full border border-rule bg-surface px-3.5 py-1.5 text-[14px] font-medium transition-colors hover:border-ochre-soft"
            >
              <Reg>{section.title}</Reg>
            </a>
          ))}
        </nav>
      </header>

      {ANSWER_SECTIONS.map((section) => (
        <section
          key={section.id}
          className="grid gap-x-10 gap-y-6 border-t border-rule pt-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:pt-12 xl:gap-x-12"
        >
          {/* scroll-mt тот же, что у вопросов: прыжок по указателю не должен
              упирать заголовок раздела в край экрана. */}
          <h2
            id={section.id}
            className="scroll-mt-6 text-balance font-serif text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] sm:text-2xl"
          >
            <Reg>{section.title}</Reg>
          </h2>
          <div className="flex flex-col gap-6">
            <ul className="flex flex-col gap-6">
              {section.items.map((a) => (
                <QuestionItem key={a.id} answer={a} />
              ))}
            </ul>
            {/* Тихая ссылка на тест — только в разделе про понятия и графики
                AP®: там человек как раз проверил себя на словах и готов
                проверить на вопросах. Главное действие страницы одно, оно
                внизу. */}
            {section.id === 'ap-concepts' ? (
              <p className="text-[15px] leading-relaxed text-ink-soft">
                <Link
                  href={`/practice-test/${exam.scope.exam}`}
                  className="font-medium text-ink underline decoration-ochre underline-offset-2"
                >
                  <Reg>Check yourself with the free AP® Microeconomics diagnostic</Reg>
                </Link>{' '}
                — exam-style questions with a breakdown of the topics to work on.
              </p>
            ) : null}
          </div>
        </section>
      ))}

      {/* Одно действие на странице (принцип 1). Тест здесь не предлагаем:
          он есть только по AP® Micro, а сюда приходят и с IGCSE. */}
      <section className="flex flex-col gap-4 border-t border-rule pt-10 lg:pt-12">
        <h2 className="text-balance font-serif text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
          Still have a question?
        </h2>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          The first 15-minute session is free — for a student, a parent, or both of you together.
          Ask me on WhatsApp, or{' '}
          <Link
            href="/book-a-free-consultation"
            className="font-medium text-ink underline decoration-ochre underline-offset-2"
          >
            see what happens in the session
          </Link>
          .
        </p>
        <BookButton href={whatsappGeneral()} size="lg" full />
      </section>
    </main>
  );
}
