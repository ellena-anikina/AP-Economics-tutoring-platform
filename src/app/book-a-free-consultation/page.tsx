import type { Metadata } from 'next';
import BookButton from '@/components/BookButton';
import Section from '@/components/Section';
import TeacherCard from '@/components/TeacherCard';
import WhatsAppQr from '@/components/WhatsAppQr';
import { CTA } from '@/config/cta';
import { SITE_URL } from '@/config/site';
import { TEACHER } from '@/config/teacher';
import { displayPhone, whatsappGeneral } from '@/lib/contact-links';

/**
 * Страница записи на бесплатную консультацию — /book-a-free-consultation.
 *
 * ЗАЧЕМ ОТДЕЛЬНАЯ СТРАНИЦА, если кнопки WhatsApp и так стоят в шапке, на
 * главной и на экране результатов. Кнопка — это действие, а не ответ. На
 * вопрос «как записаться к Olga Shalamai» — в Google, в ChatGPT, в
 * Perplexity — поисковику нужна страница, где ответ написан текстом: первые
 * 15 минут бесплатно, запись через WhatsApp, вот номер, вот что будет на
 * встрече. Кнопок поисковики не нажимают. Сюда же будут вести призывы из
 * будущих статей (TODO.md, раздел 5).
 *
 * ОТВЕТ — В ПЕРВЫХ СТРОКАХ. Заголовок и первый абзац отвечают на вопрос
 * целиком, без вступлений: нейросети цитируют страницу кусками, и кусок,
 * взятый сверху, должен быть самодостаточным. Номер стоит текстом по той же
 * причине.
 *
 * ОДНО ДЕЙСТВИЕ (принцип 1). Зелёная кнопка WhatsApp — единственная кнопка
 * на странице, почта — тихой ссылкой рядом с номером. Сервиса записи нет
 * намеренно: WhatsApp в Иордании — основной канал деловой переписки
 * (см. BookButton.tsx), а время удобнее согласовать в чате, чем держать
 * календарь в актуальном состоянии.
 *
 * ССЫЛКИ НА ТЕСТ ЗДЕСЬ НЕТ НАМЕРЕННО. Была строка «No results yet? Take the
 * free diagnostic», и её убрали по двум причинам. Она читалась как условие:
 * будто без результатов писать рано, — и человек, пришедший записаться,
 * уходил на 25-минутный тест вместо сообщения. И сюда приходят те, кто уже
 * хочет записаться: из поиска «как записаться к Ольге» и по ссылке «Free
 * consultation» в подвале. Для них тест — крюк; тем, кто ещё не готов, он
 * доступен из подвала и с главной. Её фраза про результаты в «What happens
 * in the session» остаётся как есть: там они полезное дополнение, а не
 * требование.
 *
 * ШАПКА ПО-ПРЕЖНЕМУ ВЕДЁТ ПРЯМО В WHATSAPP. Эта страница не встаёт
 * промежуточным шагом в работающую воронку: кто уже решил написать, пишет
 * в один клик. Страница — для тех, кто пришёл из поиска, по ссылке из
 * подвала или захочет сначала узнать, как всё устроено.
 */

const PATH = '/book-a-free-consultation';
const URL_ABS = new URL(PATH, SITE_URL).toString();
const TITLE = 'Book a Free Economics Consultation | Olganomics';
const DESCRIPTION =
  `The first 15-minute session with ${TEACHER.name} is free — for a student, a parent, or both. ` +
  'Book it on WhatsApp. AP® Economics exam preparation.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_ABS },
  // Превью ссылки в WhatsApp и соцсетях: этой страницей Ольга будет
  // делиться сама, и без Open Graph мессенджер покажет голый адрес.
  openGraph: {
    type: 'website',
    url: URL_ABS,
    siteName: TEACHER.brand,
    title: 'Book a free 15-minute consultation',
    description: DESCRIPTION,
  },
};

export default function BookConsultation() {
  const wa = whatsappGeneral();
  const phone = displayPhone();

  /* Разметка для поисковиков: страница контактов и человек, с которым
     связываются. Только то, что написано на странице текстом, — Google
     требует, чтобы разметка совпадала с видимым содержимым, а иначе она
     теряет доверие. @id совпадает с тем, что план продвижения даёт для
     разметки главной (§10), чтобы Google склеил обе в одного человека. */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${URL_ABS}#page`,
    url: URL_ABS,
    name: 'Book a free 15-minute consultation',
    description: DESCRIPTION,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: TEACHER.brand },
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#olga-shalamai`,
      name: TEACHER.name,
      description: TEACHER.credentialLine,
      image: new URL(TEACHER.photo, SITE_URL).toString(),
      telephone: `+${CTA.whatsapp}`,
      email: CTA.email,
      sameAs: [TEACHER.instagramUrl, TEACHER.facebookUrl],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Free 15-minute consultation',
        telephone: `+${CTA.whatsapp}`,
        email: CTA.email,
        url: `https://wa.me/${CTA.whatsapp}`,
      },
    },
  };

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:gap-12 lg:py-20">
      <script
        type="application/ld+json"
        // Экранирование «<» — рекомендация Next.js: строка из конфига не
        // должна иметь возможности закрыть тег script.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Первый экран: ответ и действие слева, QR-код справа. На телефоне
          кода нет — кнопка сама открывает приложение. */}
      <header className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_14rem] md:items-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-soft">
            {TEACHER.brand} · Free consultation
          </p>
          <h1 className="text-balance font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.015em] sm:text-[2.75rem] lg:text-[3.25rem]">
            {/* Без nowrap заголовок рвётся по дефису: «15-» в конце строки. */}
            Book a free <span className="whitespace-nowrap">15-minute</span> consultation
          </h1>
          {/* Собрано из двух её фраз: «the first 15-minute session is free —
              just you, or with a parent» (для ученика) и «with you, with your
              child, or with both of you» (для родителя). Страница у них общая,
              поэтому фраза без «your child». */}
          <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
            The first 15-minute session is free — for a student, a parent, or both of you together.
            To book it, send me a message on WhatsApp.
          </p>

          <div className="flex flex-col gap-3 pt-1">
            <BookButton href={wa} size="lg" full />
            {/* Ссылки — тёмный текст с охряным подчёркиванием, а не охряный
                текст: охра текстом даёт 3,94 при норме 4,5 (TODO.md), а как
                линия проходит норму 3:1 для графики. Подчёркивание нужно,
                чтобы ссылку было видно не только по цвету. */}
            <p className="text-[14px] leading-relaxed text-ink-soft">
              WhatsApp{' '}
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-ochre underline-offset-2"
              >
                {phone}
              </a>{' '}
              · or email{' '}
              <a
                href={`mailto:${CTA.email}`}
                className="font-medium text-ink underline decoration-ochre underline-offset-2"
              >
                {CTA.email}
              </a>
            </p>
          </div>
        </div>

        <figure className="hidden flex-col items-center gap-3 md:flex">
          <div className="w-full rounded-lg border border-rule bg-white p-2 shadow-sm">
            <WhatsAppQr href={wa} label={`QR code: WhatsApp chat with ${TEACHER.name}`} />
          </div>
          <figcaption className="text-balance text-center text-[13px] leading-snug text-ink-soft">
            On a computer? Point your phone’s camera here to open the chat.
          </figcaption>
        </figure>
      </header>

      <Section title="What happens in the session">
        <TeacherCard />
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          {TEACHER.consultationWhatHappens}
        </p>
        {/* Та же кнопка, что наверху, — не второй призыв, а то же действие там,
            где человек дочитал, что будет на встрече. Без неё страница
            кончается текстом, и на телефоне до кнопки надо листать экран
            назад. Размер меньше, чем наверху: главная — первая. */}
        <div className="pt-1">
          <BookButton href={wa} size="md" full />
        </div>
      </Section>
    </main>
  );
}
