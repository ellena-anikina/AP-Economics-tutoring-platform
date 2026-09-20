import type { TestDefinition } from '@/types';

/**
 * Публичные страницы сайта — то, что попадает в sitemap.xml.
 *
 * Тесты и страницы экзаменов берутся из каталога тестов, поэтому новый тест
 * попадёт в карту сайта сам. Остальные страницы перечислены здесь руками:
 * их немного, а угадывать их по файлам ненадёжно — так в карту попали бы
 * редиректы. Забыть новую страницу не получится: site-pages.test.ts
 * сверяет этот список с папкой src/app и падает, если что-то не сходится.
 */
export const STATIC_PATHS: string[] = ['/', '/book-a-free-consultation'];

/**
 * Страницы, которых в карте сайта быть не должно, — с причиной.
 * В sitemap идут только адреса, которые сами отвечают 200: адрес
 * с редиректом поисковик считает ошибкой карты.
 */
export const NOT_IN_SITEMAP: Record<string, string> = {
  '/practice-test': 'редирект на страницу экзамена',
};

export function publicPaths(tests: TestDefinition[]): string[] {
  // Страница экзамена лежит по адресу /practice-test/<экзамен> —
  // так устроена папка src/app. Для нового экзамена её нужно создать
  // вместе с первым тестом, иначе тест в site-pages.test.ts упадёт.
  const exams = [...new Set(tests.map((t) => `/practice-test/${t.scope.exam}`))];
  const units = tests.map((t) => t.href);
  return [...new Set([...STATIC_PATHS, ...exams, ...units])];
}
