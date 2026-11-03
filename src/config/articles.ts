/**
 * Каталог статей блога — /blog/<slug>.
 *
 * Здесь то, что нужно не самой статье, а остальному сайту: список на /blog,
 * sitemap с настоящей датой, метаданные, разметка и карточка превью. Сам текст
 * лежит в странице статьи, src/app/blog/<slug>/page.tsx: в нём заголовки,
 * списки и ссылки, и как данные он читался бы хуже, чем как разметка.
 *
 * Новая статья — запись здесь, страница и `npm run og`. Забыть не получится:
 * site-pages.test.ts и og-images.test.ts сверяют каталог со страницами и
 * карточками.
 *
 * ПОЧЕМУ /blog, А НЕ /faq/… КАК В ПЛАНЕ (TODO.md, раздел 5). Раздел и адрес
 * задала Ольга 03.11. Её стратегия — не общие статьи об экономике, а
 * библиотека ответов на вопросы тех, кто может стать клиентом.
 */
export interface Article {
  slug: string;
  href: string;
  /** Заголовок статьи — её H1 и заголовок в мессенджере. */
  title: string;
  /** Заголовок для поиска, без бренда: «| Olganomics» дописывает layout. */
  seoTitle: string;
  description: string;
  /** Карточка превью: полный заголовок статьи на неё не помещается. */
  card: { eyebrow: string; title: string; facts: string };
  /** Якорь её короткого ответа в questions.ts: на /faq под ним будет ссылка сюда. */
  answerId?: string;
  /**
   * Даты в формате ГГГГ-ММ-ДД. `modified` идёт в sitemap, поэтому менять его
   * только когда правился текст: Google верит этой дате, пока она не врёт.
   */
  published: string;
  modified: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'does-my-child-need-ap-economics-tutor',
    href: '/blog/does-my-child-need-ap-economics-tutor',
    // Неразрывный пробел: иначе «7» повисает в конце строки, отдельно от «Signs».
    title: 'Does My Child Need an AP® Economics Tutor? 7 Signs Parents Should Know',
    // Заголовок Ольги. С брендом 601px при лимите около 600 и 580 на телефоне
    // (как мерить — в site.ts): обрезаться может только «| Olganomics».
    seoTitle: 'AP® Economics Tutor: 7 Signs Your Teen Needs Help',
    description:
      'Is your teen struggling with AP® Microeconomics or Macroeconomics? Discover 7 signs they need support and how ' +
      'to help them succeed.',
    card: {
      eyebrow: 'For parents',
      title: 'Does My Child Need an AP® Economics Tutor?',
      facts: '7 signs parents should know',
    },
    answerId: 'child-need-ap-economics-tutor',
    published: '2026-11-03',
    modified: '2026-11-03',
  },
];

/** Статья по слагу. Нет такой — падает сборка, а не страница у читателя. */
export function getArticle(slug: string): Article {
  const found = ARTICLES.find((a) => a.slug === slug);
  if (!found) throw new Error(`В articles.ts нет статьи «${slug}»`);
  return found;
}
