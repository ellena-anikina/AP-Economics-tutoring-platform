import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import SiteHeader from '@/components/SiteHeader';
import './globals.css';

/**
 * Шрифты лежат в репозитории, а не тянутся с Google при сборке.
 *
 * Файлы — латинские переменные подмножества из пакетов
 * `@fontsource-variable/inter` и `@fontsource-variable/source-serif-4`
 * (те же самые шрифты, лицензия SIL OFL). Обновить: поставить пакет,
 * скопировать `files/*-latin-wght-normal.woff2` и удалить пакет.
 *
 * Почему так: сборка не должна зависеть от сети. `next/font/google`
 * скачивает шрифт в момент build, и в любом окружении без доступа к
 * fonts.gstatic.com — CI, контейнер, чужая машина — сборка падает или
 * молча уезжает на Times. Плюс это разные шрифты в разных средах, то есть
 * вёрстка, проверенная в одной, не проверена ни в одной.
 */
const sans = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-sans',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

const serif = localFont({
  src: '../fonts/source-serif-4-latin-wght-normal.woff2',
  weight: '200 900',
  variable: '--font-serif',
  display: 'swap',
  fallback: ['ui-serif', 'Georgia', 'serif'],
});

export const metadata: Metadata = {
  title: 'Free AP® Microeconomics Practice Test',
  description:
    'A free diagnostic test written by a college economics instructor. See exactly which topics are costing you points.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning нужен из-за скрипта ниже и только из-за него.
       Скрипт дописывает на <html> атрибут data-shared ДО того, как React
       оживит разметку, — а React сравнивает пришедшее с сервера с тем, что
       видит в браузере, и лишний атрибут считает расхождением. Ругань в
       консоли была честной: разметка правда разная. Подавление действует
       ровно на один элемент и только на его собственные атрибуты; на <html>
       их всего два, оба вычисляются на сервере и меняться не могут. Так же
       устроены все скрипты «не мигнуть темой при загрузке». */
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Результат теста ездит в адресе после «#». Сервер о нём не знает и
            отдаёт разметку заставки теста — поэтому пришедший по ссылке
            родитель увидел бы на долю секунды «Start the test» и только потом
            результат. Этот скрипт выполняется до первой отрисовки и помечает
            документ; правило в globals.css прячет заставку, а TestRunner
            снимает пометку, как только оживает. Пустой экран на время
            загрузки читается как «грузится», чужой — как «сломалось». */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(location.hash.slice(0,3)==='#r=')document.documentElement.setAttribute('data-shared','')",
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
        {/* Дисклеймер центрирован, а не прижат к левому краю колонки.
            Он обязан быть на каждой странице (требование College Board),
            поэтому живёт в корневом layout — и не может знать, какой ширины
            колонка у страницы под ним: 68rem на главной, 48rem на тесте.
            Выровнять его по левому краю можно было бы только передавая
            ширину из каждой страницы, а страницу легко забыть — и тогда
            дисклеймера не будет вовсе. Центр же совпадает всегда: обе
            колонки центрированы. */}
        <footer className="border-t border-rule">
          {/* Ссылки подвала. Пока их две — на страницы, которые есть; план
              продвижения (§5) расширит список, когда появятся остальные.
              Смысл не только в удобстве: ссылка с каждой страницы — главный
              для поисковиков сигнал, что страница важна, и путь, по которому
              их роботы её находят. Шапку не трогаем: там одно действие. */}
          <nav
            aria-label="Footer"
            className="mx-auto flex max-w-content flex-wrap justify-center gap-x-6 gap-y-2 px-5 pt-6 text-[13px] sm:px-8"
          >
            <Link href="/practice-test/ap-microeconomics" className="text-ink-soft hover:text-ink">
              Practice tests
            </Link>
            <Link href="/book-a-free-consultation" className="text-ink-soft hover:text-ink">
              Free consultation
            </Link>
          </nav>
          <p className="mx-auto max-w-content px-5 py-6 text-center text-[11.5px] leading-relaxed text-ink-mute sm:px-8">
            AP® and Advanced Placement® are trademarks registered by the College Board, which is
            not affiliated with, and does not endorse, this website.
          </p>
        </footer>
        {/* Vercel Analytics — просмотры и посетители без cookie. Поставлена
            Еленой 10.09 и случайно стёрта 13.09, когда этот файл
            перезаписывали из устаревшей копии. Не удалять при правках layout. */}
        <Analytics />
      </body>
    </html>
  );
}
