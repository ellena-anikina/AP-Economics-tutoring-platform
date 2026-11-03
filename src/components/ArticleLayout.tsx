import type { Metadata } from 'next';
import Link from 'next/link';
import Portrait from '@/components/Portrait';
import Reg from '@/components/Reg';
import type { Article } from '@/config/articles';
import { SITE_URL } from '@/config/site';
import { TEACHER } from '@/config/teacher';
import { pageMetadata } from '@/lib/seo';

/**
 * Каркас статьи блога: заголовок, подпись автора с датой, разметка и колонка
 * текста. Страница статьи приносит только сам текст.
 *
 * Одна колонка, а не Section с заголовком сбоку, как на страницах услуг: те
 * просматривают по разделам, а статью читают подряд, и боковая колонка только
 * сузила бы строку. Ширина — max-w-measure (принцип 7).
 */

export const LINK = 'font-medium text-ink underline decoration-ochre underline-offset-2';

/** Абзац статьи — для текста со ссылками внутри, где не подходит P. */
export const PROSE = 'text-pretty text-[17px] leading-relaxed text-ink-soft';

/* Имя файла карточки совпадает со слагом, как у тестов: og-images.test.ts
   проверяет, что карточка есть у каждой статьи. */
const cardOf = (article: Article) => `/og/${article.slug}.png`;

export function articleMetadata(article: Article): Metadata {
  return pageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: article.href,
    // Поисковый заголовок написан под запрос, а человеку в мессенджере
    // понятнее вопрос, который стоит на самой статье.
    ogTitle: article.title,
    image: cardOf(article),
  });
}

/** Дата для читателя: November 3, 2026. Пояс задан, чтобы сборка не сдвинула день. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(iso),
  );
}

export function P({ children }: { children: string }) {
  return (
    <p className={PROSE}>
      <Reg>{children}</Reg>
    </p>
  );
}

export function ArticleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-balance font-serif text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
        <Reg>{title}</Reg>
      </h2>
      {children}
    </section>
  );
}

/**
 * Совет родителю — блок, ради которого статью дочитывают и пересылают.
 * Выделен плашкой, чтобы его было видно при беглом просмотре. Цвет текста
 * ink-soft: на surface контраст 6,81 и 8,14 в светлой и тёмной теме.
 */
export function ParentsCanDo({ first, children }: { first: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-rule bg-surface px-5 py-4">
      <p className={PROSE}>
        <strong className="font-semibold text-ink">What parents can do:</strong>{' '}
        <Reg>{first}</Reg>
      </p>
      {children}
    </div>
  );
}

export default function ArticleLayout({
  article,
  children,
}: {
  article: Article;
  children: React.ReactNode;
}) {
  const url = new URL(article.href, SITE_URL).toString();

  /* @id автора и бренда — общие для всего сайта: Google склеивает их в одного
     человека со страницей «Об Ольге» и страницей услуги. */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: article.title,
    description: article.description,
    image: new URL(cardOf(article), SITE_URL).toString(),
    inLanguage: 'en',
    datePublished: article.published,
    dateModified: article.modified,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#olga-shalamai`,
      name: TEACHER.name,
      url: new URL('/about-olga-shalamai', SITE_URL).toString(),
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#olganomics`,
      name: TEACHER.brand,
      url: `${SITE_URL}/`,
    },
    isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: TEACHER.brand },
  };

  return (
    <main className="mx-auto flex w-full max-w-reading flex-col px-5 py-10 sm:px-8 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto flex w-full max-w-measure flex-col gap-10">
        <header className="flex flex-col gap-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-soft">
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
          </p>
          <h1 className="text-balance font-serif text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem]">
            <Reg>{article.title}</Reg>
          </h1>
          <div className="flex items-center gap-3">
            <Portrait size="xs" />
            <p className="text-[14px] leading-snug text-ink-soft">
              By{' '}
              <Link href="/about-olga-shalamai" className={LINK}>
                {TEACHER.name}
              </Link>
              <br />
              <span className="text-[13px]">
                <Reg>{TEACHER.articleRole}</Reg>
                <br />
                <time dateTime={article.published}>{formatDate(article.published)}</time>
                {article.modified !== article.published ? (
                  <>
                    {' · Updated '}
                    <time dateTime={article.modified}>{formatDate(article.modified)}</time>
                  </>
                ) : null}
              </span>
            </p>
          </div>
        </header>
        {children}
      </article>
    </main>
  );
}
