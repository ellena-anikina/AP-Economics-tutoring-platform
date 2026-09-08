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
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: { measure: '42rem' },
    },
  },
  plugins: [],
} satisfies Config;
