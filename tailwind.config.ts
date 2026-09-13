import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)',
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-mute': 'var(--ink-mute)',
        ochre: 'var(--ochre)',
        'ochre-soft': 'var(--ochre-soft)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        good: 'var(--good)',
        'good-bg': 'var(--good-bg)',
        bad: 'var(--bad)',
        'bad-bg': 'var(--bad-bg)',
        warn: 'var(--warn)',
        wa: 'var(--wa)',
      },
      fontFamily: {
        /* Фолбэк стоит ВНУТРИ var(): если переменной нет, подставится
           ui-serif и остаток списка сохранится. Без него объявление
           целиком становится невалидным и браузер уходит в Times. */
        serif: ['var(--font-serif, ui-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans, ui-sans-serif)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: {
        /* Ширины по роли, а не на глаз.
           measure — комфортная строка прозы, около 68 знаков.
           reading — колонка теста и разбора: вопрос и варианты ответа.
           content — страницы с двухколоночной вёрсткой и карточками. */
        measure: '42rem',
        reading: '48rem',
        content: '68rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
