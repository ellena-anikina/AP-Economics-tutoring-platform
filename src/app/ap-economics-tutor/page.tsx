import type { Metadata } from 'next';
import Link from 'next/link';
import BookButton from '@/components/BookButton';
import Portrait from '@/components/Portrait';
import Reg from '@/components/Reg';
import Section from '@/components/Section';
import Testimonials from '@/components/Testimonials';
import { CTA } from '@/config/cta';
import { ALL_ANSWERS } from '@/config/questions';
import { SITE_URL } from '@/config/site';
import { TEACHER } from '@/config/teacher';
import { whatsappGeneral } from '@/lib/contact-links';
import { pageMetadata } from '@/lib/seo';

/**
 * Страница услуги — /ap-economics-tutor.
 *
 * ЗАЧЕМ ОНА. Платит за уроки родитель, и ищет он репетитора, а не тест
 * (принцип 14). Выдача по «AP economics tutor» 12.10 — сплошь агрегаторы:
 * Wyzant, Varsity Tutors, Preply, TutorChase, TutorsPlus. По «AP economics
 * tutor Jordan» живого преподавателя из Иордании там нет вообще: анкеты
 * Varsity Tutors и курсы SAT. Страница отвечает на этот запрос человеком,
 * а не каталогом.
 *
 * ОДНА ФРАЗА — ОДНА СТРАНИЦА. Главная держит широкое «Online Economics
 * Tutor» на оба экзамена, эта страница — узкое «AP® Economics Tutor». Слово
 * «Online» в заголовок нарочно не добавлено: тогда две страницы целились бы
 * в одну фразу. «Online» стоит в надзаголовке и в тексте, где это правда.
 *
 * ВСЕ СЛОВА О НЕЙ — ЕЁ (принцип 2). Тексты разделов — её ответы из раздела
 * вопросов, которые она одобрила, и строки из teacher.ts. Ответы берутся
 * из questions.ts по якорю, а не копируются сюда: исправит Ольга ответ —
 * он исправится на обеих страницах. Наши здесь только заголовки разделов.
 * Цен, длительности урока, расписания и платформы нет: она их не давала
 * (TODO.md, вопрос к ней под пунктом «Для /faq»).
 *
 * ЗАГОЛОВКИ РАЗДЕЛОВ — шаги решения родителя, а не копии вопросов из FAQ:
 * за главную фразу этой страницы, «AP® Economics Tutor», FAQ не спорит, и
 * так должно остаться. Исключение — ответ, который без своего вопроса не
 * понять: «Yes, you can.» или «It depends on how you think.» под чужим
 * заголовком читаются как ответ невпопад. Там вопрос остаётся вопросом.
 *
 * РАЗМЕТКИ FAQPage ЗДЕСЬ НЕТ по той же причине: она стоит на /faq, и Google
 * показывает такие ответы только с одной страницы. Здесь — Service.
 *
 * ПОРЯДОК — путь родителя: кто и где → какие уроки → что говорят ученики →
 * нужен ли репетитор вообще → какой формат → какой курс → если вы не в
 * Иордании → первый шаг. Честный ответ «может, и не нужен» (её ответы 5 и
 * 7) стоит после отзывов: сначала доказательство, потом сомнение, которое
 * она снимает сама.
 *
 * ОДНО ДЕЙСТВИЕ НА БЛОК (принцип 1). Зелёная кнопка — в первом экране и в
 * последнем разделе; всё остальное — ссылки текстом.
 */

const PATH = '/ap-economics-tutor';
const URL_ABS = new URL(PATH, SITE_URL).toString();

const DESCRIPTION =
  `Live online AP® Microeconomics and Macroeconomics tutoring with ${TEACHER.name}, ` +
  'for students worldwide. The first 15-minute session is free.';

export const metadata: Metadata = pageMetadata({
  title: 'AP® Economics Tutor for Micro and Macro',
  description: DESCRIPTION,
  path: PATH,
  image: '/og/ap-economics-tutor.png',
});

/** Её ответ из раздела вопросов — по якорю. Нет такого якоря — падает сборка. */
function answer(id: string): string {
  const found = ALL_ANSWERS.find((a) => a.id === id);
  if (!found) throw new Error(`В questions.ts нет ответа с якорем «${id}»`);
  return found.a;
}

/** Абзац тела раздела — одинаковый на всей странице. */
function Para({ children }: { children: string }) {
  return (
    <p className="max-w-reading text-pretty text-[16px] leading-relaxed text-ink-soft">
      <Reg>{children}</Reg>
    </p>
  );
}

const LINK = 'font-medium text-ink underline decoration-ochre underline-offset-2';

export default function ApEconomicsTutor() {
  const wa = whatsappGeneral();

  /* Разметка: услуга и тот, кто её оказывает. @id человека — общий для
     всего сайта (страница записи, «Об Ольге»): Google склеивает их в одного
     человека. В разметке только то, что написано на странице текстом. */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${URL_ABS}#service`,
    url: URL_ABS,
    name: 'AP Economics tutoring',
    serviceType: 'AP Economics tutoring',
    description: DESCRIPTION,
    inLanguage: 'en',
    provider: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#olga-shalamai`,
      name: TEACHER.name,
      url: new URL('/about-olga-shalamai', SITE_URL).toString(),
    },
    brand: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#olganomics`,
      name: TEACHER.brand,
      url: `${SITE_URL}/`,
    },
    about: [
      { '@type': 'Thing', name: 'AP Microeconomics' },
      { '@type': 'Thing', name: 'AP Macroeconomics' },
    ],
  };

  return (
    <main className="mx-auto flex w-full max-w-content flex-col px-5 py-10 sm:px-8 sm:py-14">
      <script
        type="application/ld+json"
        // Экранирование «<» — рекомендация Next.js: строка из конфига не
        // должна иметь возможности закрыть тег script.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Первый экран как на «Об Ольге»: ответ слева, портрет справа, на
          телефоне портрет под текстом. Из поиска сюда приходят выбирать
          человека — лицо нужно сразу, но после ответа на вопрос «кто это». */}
      <header className="flex flex-col gap-8 pb-10 lg:flex-row lg:items-start lg:gap-12 lg:pb-12">
        <div className="flex flex-col gap-5">
          {/* ink-soft, а не охра, как на главной: охра мелким текстом даёт
              3,94 при норме 4,5 (TODO, «Контраст охры»). Новых мест с этой
              ошибкой не добавляем. */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-soft">
            <Reg>Online AP® Economics tutor</Reg>
          </p>
          <h1 className="text-balance font-serif text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem]">
            <Reg>AP® Economics Tutoring for Microeconomics and Macroeconomics</Reg>
          </h1>
          <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft">
            <Reg>{TEACHER.aboutLead}</Reg> {TEACHER.lessonsFormat}
          </p>
          <div className="flex flex-col gap-3 pt-1">
            <BookButton href={wa} size="lg" full />
            {/* Та же формулировка, что на странице записи: там она собрана
                из двух её фраз — для ученика и для родителя. */}
            <p className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
              The first 15-minute session is free — for a student, a parent, or both of you
              together.{' '}
              <Link href="/about-olga-shalamai" className={`${LINK} whitespace-nowrap`}>
                More about my background
              </Link>
            </p>
          </div>
        </div>
        <div className="shrink-0 lg:w-[19rem]">
          <Portrait size="lg" />
        </div>
      </header>

      <div className="flex flex-col gap-10 lg:gap-12">
        <Section eyebrow="Lessons" title="What a lesson with me is like">
          <Para>{answer('economics-lessons-like')}</Para>
          <Para>{answer('online-economics-lessons-work')}</Para>
        </Section>

        {/* Отзывы сразу за описанием уроков: сначала она говорит, как учит,
            потом ученики — как это было. Длинный отзыв Монтасера как раз
            про устройство занятий. */}
        <Testimonials />

        <Section eyebrow="Before you book" title="Does your child need a tutor at all?">
          <Para>{answer('child-need-ap-economics-tutor')}</Para>
          {/* Её ответ 5 начинается с «Yes, you can.» — без вопроса над ним
              это ответ ни на что. Он здесь ради последней фразы: «A 5 is a
              goal to work towards, never something anyone should guarantee».
              Родителю, который выбирает репетитора, это говорит больше любой
              похвалы. */}
          <h3 className="pt-2 font-serif text-[1.125rem] font-semibold leading-snug text-ink">
            <Reg>Can I get a 5 in AP® Economics without a tutor?</Reg>
          </h3>
          <Para>{answer('get-5-ap-economics-without-tutor')}</Para>
          {/* Тест — самый дешёвый способ ответить на вопрос раздела, поэтому
              ссылка здесь. Тестов по Macro пока нет — и обещать их нельзя. */}
          <p className="max-w-reading text-pretty text-[16px] leading-relaxed text-ink-soft">
            One way to find out before we talk: the{' '}
            <Link href="/practice-test/ap-microeconomics" className={LINK}>
              <Reg>free AP® Microeconomics unit tests</Reg>
            </Link>{' '}
            show which topics are costing marks.
          </p>
        </Section>

        <Section eyebrow="Formats" title="One-to-one, a group or a live session">
          <Para>{answer('choose-individual-lessons-group-lessons-or')}</Para>
        </Section>

        <Section eyebrow="The course" title="Micro or Macro: which is harder?">
          <Para>{answer('which-harder-ap-micro-or-ap')}</Para>
        </Section>

        <Section eyebrow="Outside Jordan" title="Lessons from any country">
          <Para>{answer('take-lessons-if-dont-live-jordan')}</Para>
        </Section>

        <Section eyebrow="Get started" title="Start with a free consultation">
          <Para>{answer('happens-first-economics-consultation')}</Para>
          <div className="pt-1">
            <BookButton href={wa} full />
          </div>
          <p className="max-w-reading text-pretty text-[15px] leading-relaxed text-ink-soft">
            Prefer email? Write to me at{' '}
            <a href={`mailto:${CTA.email}`} className={LINK}>
              {CTA.email}
            </a>
            . More about lessons, the course and the exam:{' '}
            <Link href="/faq" className={LINK}>
              questions and answers
            </Link>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}
