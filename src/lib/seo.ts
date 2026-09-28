import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { TEACHER } from '@/config/teacher';

/**
 * Метаданные страницы: заголовок, описание, canonical и Open Graph.
 *
 * Собраны в одном месте, потому что расходятся они незаметно. Canonical
 * говорит поисковику «вот настоящий адрес этой страницы» — без него
 * страница, открытая с «?utm_source=…» или со слешем в конце, считается
 * другой, и вес делится между копиями. Open Graph нужен мессенджерам:
 * ссылкой на ответы делятся в WhatsApp, и без него там будет голый адрес.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  titleHasBrand = false,
}: {
  /** Заголовок вкладки и ссылки в поиске — с названием бренда. */
  title: string;
  description: string;
  /** Путь от корня, со слешем в начале. */
  path: string;
  /** Заголовок для превью в мессенджерах, если бренд в нём лишний. */
  ogTitle?: string;
  /**
   * Заголовок уже содержит «| Olganomics» целиком — шаблон из layout
   * применять не нужно. Нужно ровно одной странице, главной: её заголовок
   * и есть SITE_TITLE. Без этого вышло бы «… | Olganomics | Olganomics».
   */
  titleHasBrand?: boolean;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title: titleHasBrand ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: TEACHER.brand,
      title: ogTitle ?? title,
      description,
    },
  };
}
