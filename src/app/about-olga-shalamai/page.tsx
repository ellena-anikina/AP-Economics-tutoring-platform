import type { Metadata } from 'next';
import BookButton from '@/components/BookButton';
import Portrait from '@/components/Portrait';
import Reg from '@/components/Reg';
import Section from '@/components/Section';
import { CTA } from '@/config/cta';
import { SITE_URL } from '@/config/site';
import { TEACHER } from '@/config/teacher';
import { whatsappGeneral } from '@/lib/contact-links';
import { pageMetadata } from '@/lib/seo';

/**
 * Страница «Об Ольге» — /about-olga-shalamai.
 *
 * ЗАЧЕМ ОНА. На сайте пятьдесят ответов на вопросы по экономике, четыре
 * теста с разбором и калькулятор баллов — и нигде не сказано, кто за всем
 * этим стоит. Для Google это дыра в E-E-A-T, но куда важнее другое: ответы
 * без автора не цитируют нейросети. Ассистенту нужно знать, кого он
 * пересказывает, иначе он возьмёт ответ там, где подпись есть. Поэтому
 * страница — не вежливость, а условие попадания в ответы ChatGPT и Google.
 *
 * ПЕРВОЕ ЛИЦО. Текст — её прямая речь, как и везде на сайте (пояснение у
 * parentSessionOffer в teacher.ts). Третье лицо превратило бы страницу в
 * рассказ о ней и поставило дистанцию ровно там, где родитель выбирает
 * человека. Третье лицо остаётся в подписи и в разметке.
 *
 * ВСЕ СЛОВА — ЕЁ. Тексты взяты дословно со страницы «About Olganomics» её
 * сайта на Wix и лежат в teacher.ts. Мы здесь ничего не сочиняем про неё:
 * принцип 2 в CONTEXT.md. Отзывы и цифры с того же сайта НЕ переносятся —
 * часть из них шаблонные («500 Clients Served», «John Doe»), и отличить
 * настоящее от заготовки Wix можно только у неё.
 *
 * ЧЕГО НА СТРАНИЦЕ НЕТ И ПОЧЕМУ. Образования, университета, статуса
 * докторантуры, публикаций, подготовки как AP-преподавателя, языков и
 * географии учеников. Ничего этого нет и на её сайте, а выдумывать
 * регалии — худшее, что можно сделать со страницей, которая существует
 * ради доверия. Поля заведены пустыми в teacher.ts: как только она ответит,
 * блоки появятся сами, править разметку не придётся.
 *
 * ОДНО ДЕЙСТВИЕ (принцип 1). Зелёная кнопка WhatsApp внизу — единственная
 * кнопка на странице. Ссылки на тест нет намеренно: сюда приходят узнать про
 * человека, а не сдавать диагностику; тест доступен из подвала.
 */

const PATH = '/about-olga-shalamai';
const URL_ABS = new URL(PATH, SITE_URL).toString();

export const metadata: Metadata = pageMetadata({
  title: `About ${TEACHER.name}`,
  description:
    `${TEACHER.name} — ${TEACHER.credentialLine.replace(/·/g, 'and')}. More than 10 years preparing students for ` +
    'AP® Microeconomics and AP® Macroeconomics, built on understanding rather than memorisation. Book a free ' +
    '15-minute consultation.',
  path: PATH,
  image: '/og/about.png',
});

export default function AboutOlga() {
  const wa = whatsappGeneral();

  /* Разметка: страница о человеке плюс сам человек. @id у Person тот же,
     что на странице записи, — чтобы Google склеил обе в одного человека, а
     не в двух однофамильцев. В разметке только то, что видно текстом:
     Google требует совпадения, и выдуманное поле обесценивает остальные. */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${URL_ABS}#page`,
    url: URL_ABS,
    name: `About ${TEACHER.name}`,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: TEACHER.brand },
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#olga-shalamai`,
      name: TEACHER.name,
      jobTitle: TEACHER.role,
      description: TEACHER.aboutLead,
      image: new URL(TEACHER.photoPortrait, SITE_URL).toString(),
      email: CTA.email,
      telephone: `+${CTA.whatsapp}`,
      sameAs: [TEACHER.instagramUrl, TEACHER.facebookUrl],
      knowsAbout: [
        'AP Microeconomics',
        'AP Macroeconomics',
        'IGCSE Economics',
        'IGCSE Business',
      ],
      worksFor: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#olganomics`,
        name: TEACHER.brand,
        url: `${SITE_URL}/`,
      },
    },
  };

  return (
    <main className="mx-auto flex w-full max-w-content flex-col px-5 py-10 sm:px-8 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Портрет справа от текста на широком экране и под заголовком на
          телефоне. Ответ на вопрос «кто это» должен стоять выше портрета:
          из поиска сюда приходят читать, а не разглядывать. */}
      <header className="flex flex-col gap-8 pb-10 lg:flex-row lg:items-start lg:gap-12 lg:pb-12">
        <div className="flex flex-col gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
            About
          </p>
          <h1 className="text-balance font-serif text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem]">
            About <Reg>{TEACHER.name}</Reg>
          </h1>
          <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft">
            <Reg>{TEACHER.aboutLead}</Reg>
          </p>
          <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft">
            <Reg>{TEACHER.aboutStudents}</Reg>
          </p>
        </div>
        <div className="shrink-0 lg:w-[19rem]">
          <Portrait size="lg" />
        </div>
      </header>

      <div className="flex flex-col gap-10 lg:gap-12">
        <Section eyebrow="In her words" title="What I believe about AP® Economics">
          <p className="max-w-reading text-pretty text-[16px] leading-relaxed text-ink-soft">
            <Reg>{TEACHER.aboutBelief}</Reg>
          </p>
          <p className="max-w-reading text-pretty text-[16px] leading-relaxed text-ink-soft">
            <Reg>{TEACHER.aboutBeyondExam}</Reg>
          </p>
        </Section>

        <Section eyebrow="Method" title="How I teach">
          <p className="max-w-reading text-pretty text-[16px] leading-relaxed text-ink-soft">
            <Reg>{TEACHER.approach}</Reg>
          </p>
          {/* Ссылка, а не пересказ. Как устроен урок, Ольга уже ответила в
              разделе вопросов (46 и 47), и копировать ответ сюда значит
              завести две страницы, конкурирующие за один и тот же запрос.
              Ссылка заодно ведёт робота вглубь сайта. */}
          <p className="max-w-reading text-[16px] leading-relaxed text-ink-soft">
            <a
              href="/faq#economics-lessons-like"
              className="text-ink underline decoration-ochre underline-offset-4"
            >
              What a lesson actually looks like
            </a>{' '}
            — in my own words, in the questions and answers.
          </p>
        </Section>

        {/* Блоки ниже появятся сами, когда Ольга пришлёт материалы. Пустое
            поле — блока нет: пустой заголовок «Education» хуже отсутствия. */}
        {TEACHER.aboutEducation ? (
          <Section eyebrow="Background" title="Education">
            <p className="max-w-reading text-pretty text-[16px] leading-relaxed text-ink-soft">
              <Reg>{TEACHER.aboutEducation}</Reg>
            </p>
          </Section>
        ) : null}

        {TEACHER.aboutPublications.length > 0 ? (
          <Section eyebrow="Background" title="Published work">
            <ul className="flex flex-col gap-3">
              {TEACHER.aboutPublications.map((pub) => (
                <li key={pub.url} className="text-[16px] leading-relaxed text-ink-soft">
                  <a href={pub.url} className="text-ink underline decoration-ochre underline-offset-4">
                    {pub.title}
                  </a>
                  <span className="text-ink-mute"> · {pub.where}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {TEACHER.aboutReach ? (
          <Section eyebrow="Lessons" title="Where my students are">
            <p className="max-w-reading text-pretty text-[16px] leading-relaxed text-ink-soft">
              <Reg>{TEACHER.aboutReach}</Reg>
            </p>
          </Section>
        ) : null}

        <Section eyebrow="Get in touch" title="Talk to me before you decide">
          <p className="max-w-reading text-pretty text-[16px] leading-relaxed text-ink-soft">
            <Reg>{TEACHER.parentSessionOffer}</Reg>
          </p>
          <div className="pt-1">
            <BookButton href={wa} full />
          </div>
        </Section>
      </div>
    </main>
  );
}
