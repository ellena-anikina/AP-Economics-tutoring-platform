import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

/**
 * /robots.txt — по плану продвижения (§10): сайт открыт всем поисковикам.
 *
 * OAI-SearchBot — робот поиска ChatGPT. Он и так попадает под правило «*»,
 * но план просит назвать его явно: так видно, что его пускают сознательно.
 * Подвох: робот со своей группой правил читает только её, а группу «*»
 * пропускает. Если здесь появится запрет (Disallow), его нужно дописать
 * в обе группы, иначе OAI-SearchBot его не увидит.
 *
 * GPTBot (сбор текстов для обучения моделей OpenAI) пропускается правилом «*»
 * сознательно: Ольга согласна, чтобы её тексты шли на обучение (19.09).
 * Передумает — добавить группу { userAgent: 'GPTBot', disallow: '/' }.
 * На показ сайта в поиске ChatGPT это не влияет: за него отвечает OAI-SearchBot.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
