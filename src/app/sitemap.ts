import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/config/articles';
import { SITE_URL } from '@/config/site';
import { TESTS } from '@/config/tests';
import { publicPaths } from '@/lib/site-pages';

/**
 * /sitemap.xml — список страниц для поисковиков. Какие страницы в него
 * попадают, решает src/lib/site-pages.ts.
 *
 * Даты изменения (lastModified) есть только у статей: там дату ставит человек,
 * когда правит текст (config/articles.ts). У остальных страниц её нет намеренно.
 * Google берёт дату в расчёт, только пока ей можно верить, а дата сборки менялась
 * бы на всех страницах при каждом деплое, даже если текст не менялся.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const modified = new Map(ARTICLES.map((a) => [a.href, a.modified]));
  return publicPaths(TESTS, ARTICLES).map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: modified.get(path),
  }));
}
