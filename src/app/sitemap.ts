import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { TESTS } from '@/config/tests';
import { publicPaths } from '@/lib/site-pages';

/**
 * /sitemap.xml — список страниц для поисковиков. Какие страницы в него
 * попадают, решает src/lib/site-pages.ts.
 *
 * Даты изменения (lastModified) не указываем намеренно. Google берёт их в
 * расчёт, только пока им можно верить, а честной даты у нас нет: дата сборки
 * менялась бы на всех страницах при каждом деплое, даже если текст не менялся.
 * Появятся статьи с датой последней проверки — у них дата будет настоящей.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths(TESTS).map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}
