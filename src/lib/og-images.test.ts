import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { test } from 'node:test';
import { TESTS } from '../config/tests.ts';

/**
 * Карточки превью существуют и имеют нужный размер.
 *
 * Зачем тест. Картинки не видно ни на одной странице сайта: они живут только
 * в теге og:image и показываются в чужом мессенджере. Сломанную ссылку на
 * картинку не заметит ни сборка, ни человек, открывший сайт, — заметит
 * родитель, которому пришла карточка без превью. Поэтому проверяем здесь.
 *
 * Нового юнита это касается в первую очередь: страница теста подставляет
 * имя файла из слага, и забыть перерисовать карточки (`npm run og`) проще
 * всего именно тогда.
 */

const SRC_DIR = join(import.meta.dirname, '..');
const OG_DIR = join(SRC_DIR, '..', 'public', 'og');

const cards = new Set(readdirSync(OG_DIR).filter((f) => f.endsWith('.png')));

/** Все пути вида `/og/…png`, написанные в коде строкой. */
function referencedCards(dir: string = SRC_DIR): { file: string; card: string }[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return referencedCards(full);
    if (!/\.tsx?$/.test(entry.name)) return [];
    const src = readFileSync(full, 'utf8');
    return [...src.matchAll(/'\/og\/([a-z0-9-]+\.png)'/g)].map((m) => ({
      file: relative(SRC_DIR, full).split(sep).join('/'),
      card: m[1],
    }));
  });
}

test('каждая карточка, на которую ссылается код, есть в public/og', () => {
  const refs = referencedCards();
  assert.ok(refs.length > 0, 'ни одной ссылки на /og/…png — тест ничего не проверяет');
  for (const { file, card } of refs) {
    assert.ok(cards.has(card), `src/${file} ссылается на /og/${card}, а файла нет: npm run og`);
  }
});

test('у каждого теста есть своя карточка', () => {
  // Страницы юнитов собирают имя файла из слага (`/og/${SLUG}.png`), поэтому
  // строкой оно в коде не встречается и предыдущий тест его не увидит.
  for (const t of TESTS) {
    assert.ok(
      cards.has(`${t.slug}.png`),
      `у теста ${t.slug} нет карточки public/og/${t.slug}.png: npm run og`,
    );
  }
});

test('все карточки 1200×630', () => {
  // Размер лежит в заголовке PNG: после 8 байт подписи идёт блок IHDR,
  // ширина и высота — два 32-битных числа со смещения 16.
  for (const card of cards) {
    const head = readFileSync(join(OG_DIR, card)).subarray(0, 24);
    const width = head.readUInt32BE(16);
    const height = head.readUInt32BE(20);
    assert.deepEqual(
      [width, height],
      [1200, 630],
      `${card}: ${width}×${height}, а мессенджеры ждут 1200×630`,
    );
  }
});
