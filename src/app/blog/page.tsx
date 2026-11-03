import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDate } from '@/components/ArticleLayout';
import Reg from '@/components/Reg';
import { ARTICLES } from '@/config/articles';
import { TEACHER } from '@/config/teacher';
import { pageMetadata } from '@/lib/seo';

/**
 * /blog — список статей.
 *
 * Новые сверху: дата публикации — единственный порядок, который не нужно
 * поддерживать руками. Без рубрик и пагинации, пока статей мало: страница со
 * списком из одной статьи и фильтром над ним выглядела бы заброшенной.
 */

const LEAD = `Articles by ${TEACHER.name} on the questions families ask about economics courses, exams and tutoring.`;

export const metadata: Metadata = pageMetadata({
  title: 'Economics Answers for Parents and Students',
  description: LEAD,
  path: '/blog',
  image: '/og/blog.png',
});

export default function Blog() {
  const articles = [...ARTICLES].sort((a, b) => b.published.localeCompare(a.published));

  return (
    <main className="mx-auto flex w-full max-w-reading flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-soft">Blog</p>
        <h1 className="text-balance font-serif text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem]">
          Economics answers for parents and students
        </h1>
        <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft">{LEAD}</p>
      </header>

      <ul className="flex flex-col gap-6 border-t border-rule pt-8">
        {articles.map((article) => (
          <li
            key={article.slug}
            className="flex flex-col gap-2 border-t border-rule pt-6 first:border-0 first:pt-0"
          >
            <h2 className="text-balance font-serif text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
              <Link
                href={article.href}
                className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ochre"
              >
                <Reg>{article.title}</Reg>
              </Link>
            </h2>
            <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
              <Reg>{article.description}</Reg>
            </p>
            <p className="text-[13px] text-ink-soft">
              <time dateTime={article.published}>{formatDate(article.published)}</time>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
