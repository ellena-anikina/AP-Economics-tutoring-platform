import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
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
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">
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
          <p className="mx-auto max-w-content px-5 py-6 text-center text-[11.5px] leading-relaxed text-ink-mute sm:px-8">
            AP® and Advanced Placement® are trademarks registered by the College Board, which is
            not affiliated with, and does not endorse, this website.
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
