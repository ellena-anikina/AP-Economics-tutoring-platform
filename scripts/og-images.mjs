/**
 * Рисует картинки для превью ссылок — те, что видно в мессенджере.
 *
 * ЗАЧЕМ. На позиции в поиске Open Graph не влияет: Google эти теги для
 * ранжирования не использует. Ценность в другом и на этом сайте она больше
 * любого SEO. Со страницы результатов теста школьник отправляет ссылку
 * родителю — и первое, что родитель видит, это карточка превью, а не сайт.
 * Без картинки в WhatsApp приходит голая строка адреса, и открывать её
 * незачем. Карточка — единственное, что стоит между тестом и родителем.
 *
 * ПОЧЕМУ ГОТОВЫЕ PNG, А НЕ ГЕНЕРАЦИЯ НА ЛЕТУ. У Next есть ImageResponse:
 * картинка собирается в момент запроса. Он умеет только ttf/otf/woff, а наши
 * шрифты вендорены в woff2 — пришлось бы класть в репозиторий вторую копию
 * тех же шрифтов в другом формате ради одних картинок. Плюс функция на краю
 * на каждый запрос робота. Здесь карточек девять и меняются они раз в
 * полгода, так что дешевле нарисовать их заранее.
 *
 * ПОЧЕМУ СКРИПТ, А НЕ НАРИСОВАННЫЕ РУКАМИ ФАЙЛЫ. Тексты берутся из тех же
 * конфигов, что и сайт: число вопросов, время, названия юнитов, количество
 * ответов в разделе вопросов. Руками нарисованная карточка разойдётся с
 * сайтом в первый же раз, когда в тест добавят вопрос, и никто этого не
 * заметит — картинку не видно ни на одной странице сайта.
 *
 * КОГДА ПЕРЕЗАПУСКАТЬ: после правок `src/config/tests.ts`,
 * `src/config/questions.ts`, палитры в `globals.css` и при добавлении теста.
 *
 *   npm run og
 *
 * Нужен установленный chromium для Playwright: `npx playwright install chromium`.
 * PW_CHROMIUM=/путь/к/chrome — если он лежит не там, где Playwright ищет.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'og');

/** Размер, который ждут WhatsApp, Telegram, Facebook и X. */
const WIDTH = 1200;
const HEIGHT = 630;

// Конфиги сайта читаются как есть: тексты карточек не должны расходиться
// с тем, что человек увидит, открыв ссылку.
const { TESTS } = await import('../src/config/tests.ts');
const { ALL_ANSWERS } = await import('../src/config/questions.ts');

const totalQuestions = TESTS.reduce((sum, t) => sum + t.questionCount, 0);

/**
 * Карточки. `kicker` — мелкая строка над заголовком, для юнитов в ней
 * название экзамена: «Unit 3 · Costs and Perfect Competition» само по себе
 * не говорит, какого предмета этот юнит.
 */
const CARDS = [
  {
    file: 'default',
    eyebrow: 'Exam preparation',
    title: 'AP® Economics, IGCSE Economics and Business',
    facts: 'Diagnostics, exam tools and online lessons',
    // Не «Free · no account needed»: на карточке главной рядом со словом
    // lessons это читается как «уроки бесплатные». Бесплатны тесты.
    tag: 'Free practice tests',
  },
  {
    file: 'practice-tests',
    eyebrow: 'Free practice tests',
    title: 'AP® Microeconomics Practice Tests',
    facts: `${totalQuestions} questions across ${TESTS.length} units · no account needed`,
  },
  ...TESTS.map((t) => ({
    file: t.slug,
    eyebrow: 'Free practice test',
    kicker: 'AP® Microeconomics',
    title: t.shortTitle,
    facts: `${t.questionCount} questions · ~${t.estimatedMinutes} min · every answer explained`,
  })),
  {
    file: 'faq',
    eyebrow: 'Questions and answers',
    title: 'AP® and IGCSE Economics FAQ',
    facts: `${ALL_ANSWERS.length} short answers from an economics teacher`,
  },
  {
    file: 'consultation',
    eyebrow: 'Free consultation',
    // Не «Book a free 15-minute session»: перенос ложился на дефис, и
    // получалось «Book a free 15- / minute session».
    title: 'Book a free consultation',
    facts: 'Fifteen minutes · for a student, a parent, or both',
    tag: 'Free · on WhatsApp',
  },
  {
    file: 'score-calculator',
    eyebrow: 'Exam tool',
    title: 'AP® Microeconomics Score Calculator',
    facts: 'A raw score, and the 1–5 it points to',
  },
  {
    file: 'study-plan',
    eyebrow: 'Exam tool',
    title: 'AP® Microeconomics Study Plan',
    facts: 'From thirty weeks down to two, week by week',
  },
];

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** ® надстрочным и вплотную к «AP» — как Reg делает это на сайте. */
const withReg = (s) => escapeHtml(s).replace(/®/g, '<sup>®</sup>');

async function fontFace(family, file, weightRange) {
  const data = await readFile(join(ROOT, 'src', 'fonts', file));
  return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${data.toString(
    'base64',
  )}) format('woff2');font-weight:${weightRange};font-style:normal;font-display:block}`;
}

function cardHtml(card, fonts) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
${fonts}
/* Светлая тема, и только она: картинка одна для всех, а подстроиться под
   тему читателя она не может — мессенджер показывает файл, а не страницу. */
:root{
  --ground:#fbfaf7; --ink:#12203a; --ink-soft:#46536b;
  --ochre:#a9721e; --rule:#dfdacf; --rule-strong:#c8c1b2;
}
*{margin:0;padding:0;box-sizing:border-box}
body{
  width:${WIDTH}px; height:${HEIGHT}px; background:var(--ground); color:var(--ink);
  font-family:'InterOG',sans-serif; -webkit-font-smoothing:antialiased;
  display:flex; flex-direction:column; justify-content:space-between;
  padding:72px; position:relative; overflow:hidden;
}
sup{font-size:.5em; vertical-align:super; line-height:0; margin-left:.04em}

/* Охряная засечка вместо логотипа: на сайте охра закреплена за кнопкой
   записи, но здесь нет ни одной кнопки — дилютить нечего, а карточку она
   делает узнаваемой с первого взгляда. 4px на светлом фоне дают 3,94 при
   норме 3:1 для графики. */
.mark{width:64px; height:5px; background:var(--ochre); border-radius:2px}

.eyebrow{
  margin-top:26px; font-size:23px; font-weight:600; letter-spacing:.14em;
  text-transform:uppercase; color:var(--ink-soft);
}
.kicker{margin-top:34px; font-size:28px; font-weight:500; color:var(--ink-soft)}
h1{
  margin-top:${card.kicker ? 10 : 34}px; max-width:800px;
  font-family:'SourceSerifOG',Georgia,serif; font-size:66px; font-weight:600;
  line-height:1.08; letter-spacing:-.02em; text-wrap:balance;
}
.facts{margin-top:30px; font-size:28px; color:var(--ink-soft)}

footer{
  display:flex; align-items:flex-end; justify-content:space-between;
  border-top:1px solid var(--rule); padding-top:26px;
}
.brand{font-family:'SourceSerifOG',Georgia,serif; font-size:34px; font-weight:600; letter-spacing:-.01em}
.tag{font-size:23px; color:var(--ink-soft)}

/* Оси со спросом и предложением. Единственная картинка, которую узнают все,
   кто когда-либо открывал учебник экономики, — и она читается даже в
   превью шириной в палец, где любая мелкая графика превратилась бы в кашу.
   Наклоны настоящие: спрос вниз, предложение вверх. */
.graph{position:absolute; right:62px; top:150px; opacity:.55}
/* График начинается на 878px, заголовок обязан кончиться раньше: max-width
   у h1 не украшение, а единственное, что мешает длинному названию юнита
   въехать в него. */
</style></head>
<body>
  <svg class="graph" width="260" height="260" viewBox="0 0 260 260" fill="none">
    <path d="M18 8 V242 H252" stroke="var(--rule-strong)" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 42 L232 216" stroke="var(--ink-soft)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M44 216 L232 42" stroke="var(--ochre)" stroke-width="3.5" stroke-linecap="round"/>
  </svg>

  <div>
    <div class="mark"></div>
    <p class="eyebrow">${withReg(card.eyebrow)}</p>
    ${card.kicker ? `<p class="kicker">${withReg(card.kicker)}</p>` : ''}
    <h1>${withReg(card.title)}</h1>
    <p class="facts">${withReg(card.facts)}</p>
  </div>

  <footer>
    <span class="brand">Olganomics</span>
    <span class="tag">${withReg(card.tag ?? 'Free · no account needed')}</span>
  </footer>
</body></html>`;
}

const fonts = [
  await fontFace('InterOG', 'inter-latin-wght-normal.woff2', '100 900'),
  await fontFace('SourceSerifOG', 'source-serif-4-latin-wght-normal.woff2', '200 900'),
].join('\n');

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined });
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});

for (const card of CARDS) {
  await page.setContent(cardHtml(card, fonts), { waitUntil: 'load' });
  // Без этого шрифт может не успеть примениться, и карточка уедет на
  // запасной — заметить это можно только глазами, уже после выката.
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  await writeFile(join(OUT_DIR, `${card.file}.png`), png);
  console.log(`${card.file}.png — ${(png.length / 1024).toFixed(0)} KB`);
}

await browser.close();
console.log(`\n${CARDS.length} картинок в public/og/`);
