import type { Metadata, Viewport } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
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
        <footer className="border-t border-rule px-5 py-6 text-center text-[11px] leading-relaxed text-ink-mute">
          AP® and Advanced Placement® are trademarks registered by the College Board, which is not
          affiliated with, and does not endorse, this website.
        </footer>
      </body>
    </html>
  );
}
