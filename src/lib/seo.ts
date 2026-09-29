import type { Metadata } from 'next';
import { SITE_URL } from '@/config/site';
import { TEACHER } from '@/config/teacher';

/**
 * Метаданные страницы: заголовок, описание, canonical, Open Graph и картинка
 * превью.
 *
 * Собраны в одном месте, потому что расходятся они незаметно. Canonical
 * говорит поисковику «вот настоящий адрес этой страницы» — без него
 * страница, открытая с «?utm_source=…» или со слешем в конце, считается
 * другой, и вес делится между копиями. Open Graph нужен мессенджерам:
 * ссылкой на ответы делятся в WhatsApp, и без него там будет голый адрес.
 */

/** Карточка превью для страницы без своей. Файлы рисует `npm run og`. */
export const OG_DEFAULT = '/og/default.png';

/** Размер, который ждут WhatsApp, Telegram, Facebook и X. */
const OG_SIZE = { width: 1200, height: 630 };

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  titleHasBrand = false,
  image = OG_DEFAULT,
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
  /**
   * Картинка превью, путь от корня. Своя есть у каждой самостоятельной
   * страницы: карточка с названием теста убеждает открыть ссылку сильнее,
   * чем общая заставка сайта.
   */
  image?: string;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const socialTitle = ogTitle ?? title;
  return {
    title: titleHasBrand ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: TEACHER.brand,
      title: socialTitle,
      description,
      /* Размеры проставлены нарочно. Без них WhatsApp и Facebook сначала
         качают саму картинку, чтобы узнать её размер, и при первой отправке
         нередко успевают показать карточку без превью — а второго шанса у
         ссылки, отправленной родителю, нет. Alt — то же, что крупно
         написано на самой карточке. */
      images: [{ url: image, ...OG_SIZE, alt: socialTitle }],
    },
    /* X (и часть клиентов, читающих его теги) без этого рисует крошечную
       картинку сбоку вместо широкой карточки. Остальное он берёт из Open
       Graph сам, поэтому дублируется только необходимое. */
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [image] },
  };
}
