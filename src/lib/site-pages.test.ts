import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { test } from 'node:test';
import { TESTS } from '../config/tests.ts';
import { NOT_IN_SITEMAP, publicPaths } from './site-pages.ts';

const APP_DIR = join(import.meta.dirname, '..', 'app');

/** Адреса всех страниц сайта по файлам page.tsx в src/app. */
function routesFromFiles(dir: string = APP_DIR): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return routesFromFiles(full);
    if (entry.name !== 'page.tsx') return [];
    const route = relative(APP_DIR, dir).split(sep).join('/');
    return [route ? `/${route}` : '/'];
  });
}

test('в sitemap только существующие страницы', () => {
  const routes = new Set(routesFromFiles());
  for (const path of publicPaths(TESTS)) {
    assert.ok(routes.has(path), `${path} есть в sitemap, но страницы src/app${path}/page.tsx нет`);
  }
});

test('каждая страница либо в sitemap, либо исключена с причиной', () => {
  const listed = new Set(publicPaths(TESTS));
  for (const route of routesFromFiles()) {
    assert.ok(
      listed.has(route) || route in NOT_IN_SITEMAP,
      `страница ${route} не попала в sitemap: добавь её в STATIC_PATHS или в NOT_IN_SITEMAP с причиной (src/lib/site-pages.ts)`,
    );
  }
});

test('адреса в sitemap записаны единообразно', () => {
  for (const path of publicPaths(TESTS)) {
    assert.match(path, /^\/([a-z0-9-]+(\/[a-z0-9-]+)*)?$/, `${path}: строчные буквы, цифры и дефисы, без слеша в конце`);
  }
});
