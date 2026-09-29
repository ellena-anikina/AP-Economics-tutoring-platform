/**
 * Проверка прохождения теста в настоящем браузере.
 *
 * ЗАЧЕМ ОТДЕЛЬНО ОТ `npm run test`. Юнит-тесты проверяют чистые функции:
 * подсчёт результата, раздачу недель, карточки превью. Здесь же проверяется
 * то, чего в функциях нет вовсе, — состояние экрана: что номера вопросов
 * показывают, где ответил, а где нет; что по номеру можно вернуться; что
 * кнопка на последнем вопросе переспрашивает, если остались пустые, и не
 * переспрашивает, если не остались. Ошибка здесь тихая: человек получит
 * заниженный балл и неверный разбор, а на странице всё будет выглядеть
 * нормально.
 *
 * КАК ЗАПУСТИТЬ. Нужен собранный и поднятый сайт — скрипт ходит по нему как
 * обычный посетитель:
 *
 *   npm run build && npm run start     # в одном окне
 *   npm run e2e                        # в другом
 *
 * PORT=3001 npm run e2e — если сайт поднят не на 3000.
 * Нужен chromium: `npx playwright install chromium`.
 */

import { chromium } from 'playwright';

const PORT = process.env.PORT || 3000;
const BASE = `http://localhost:${PORT}/practice-test/ap-microeconomics/unit-1`;
const TOTAL = 15; // вопросов в Unit 1

const fails = [];
function ok(cond, msg) {
  console.log(`  ${cond ? 'ok  ' : 'ПЛОХО'} ${msg}`);
  if (!cond) fails.push(msg);
}

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined });

async function startTest(options = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...options });
  const page = await ctx.newPage();
  await page.goto(BASE);
  await page.getByRole('button', { name: 'Start the test', exact: true }).click();
  return { ctx, page };
}

/** Вариант выбирается кликом по label: сам radio скрыт (sr-only). */
const pick = (page) => page.locator('main label').first().click();

/** Номер вопроса в верхней панели. */
const chip = (page, n, state) =>
  page.getByRole('button', { name: `Question ${n}, ${state}`, exact: true });

/** Пройти тест до последнего вопроса, отвечая только на указанные номера. */
async function walk(page, answerOn) {
  for (let q = 1; q <= TOTAL; q++) {
    if (answerOn.includes(q)) await pick(page);
    if (q < TOTAL) await page.getByRole('button', { name: 'Next', exact: true }).click();
  }
}

const all = Array.from({ length: TOTAL }, (_, i) => i + 1);
const text = (page) => page.locator('main').innerText();

// ─────────────────────────────────────────────────────────────────────────
console.log('\n1. Номера показывают, где отвечено, а где нет');
{
  const { ctx, page } = await startTest();
  await pick(page);
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click(); // второй пропущен

  ok(await chip(page, 1, 'answered').isVisible(), 'первый помечен как отвечённый');
  ok(await chip(page, 2, 'not answered').isVisible(), 'второй помечен как пустой');
  ok(
    (await chip(page, 3, 'not answered').getAttribute('aria-current')) === 'true',
    'текущий помечен aria-current',
  );
  ok((await text(page)).includes('1 answered'), 'счётчик показывает один ответ');
  await ctx.close();
}

console.log('\n2. По номеру можно вернуться к пропущенному');
{
  const { ctx, page } = await startTest();
  await walk(page, all.filter((q) => q !== 4));
  await chip(page, 4, 'not answered').click();
  ok((await text(page)).includes('Question 4 of 15'), 'открылся вопрос 4');
  await pick(page);
  ok(await chip(page, 4, 'answered').isVisible(), 'номер сразу стал отвечённым');
  await ctx.close();
}

console.log('\n3. Пропуски есть — кнопка переспрашивает, а не показывает результаты');
{
  const { ctx, page } = await startTest();
  await walk(page, all.filter((q) => ![4, 9, 15].includes(q)));
  await page.getByRole('button', { name: 'See my results', exact: true }).click();

  const anyway = page.getByRole('button', { name: 'Show results anyway', exact: true });
  ok(await anyway.isVisible(), 'появилось подтверждение');
  ok(!(await text(page)).includes('out of 15 correct'), 'результаты ещё не показаны');
  ok((await text(page)).includes('3 questions are still blank'), 'названо число пропусков');
  ok(await anyway.evaluate((el) => el === document.activeElement), 'фокус переехал на кнопку');
  ok(
    (await anyway.getAttribute('aria-describedby')) === 'blank-warning',
    'предупреждение привязано к кнопке описанием',
  );

  console.log('\n4. «Keep going» отменяет, Escape тоже');
  await page.getByRole('button', { name: 'Keep going', exact: true }).click();
  ok(
    await page.getByRole('button', { name: 'See my results', exact: true }).isVisible(),
    'вернулись к обычной панели',
  );
  await page.getByRole('button', { name: 'See my results', exact: true }).click();
  await page.keyboard.press('Escape');
  ok(
    await page.getByRole('button', { name: 'See my results', exact: true }).isVisible(),
    'Escape закрыл подтверждение',
  );

  console.log('\n5. Дозаполнить по номерам — и переспрашивать больше не о чем');
  for (const n of [4, 9, 15]) {
    await chip(page, n, 'not answered').click();
    await pick(page);
  }
  await chip(page, TOTAL, 'answered').click();
  await page.getByRole('button', { name: 'See my results', exact: true }).click();
  ok((await text(page)).includes('out of 15 correct'), 'результаты открылись сразу');
  await ctx.close();
}

console.log('\n6. Ответил на всё — подтверждения нет вовсе');
{
  const { ctx, page } = await startTest();
  await walk(page, all);
  await page.getByRole('button', { name: 'See my results', exact: true }).click();
  ok((await text(page)).includes('out of 15 correct'), 'сразу результаты');
  ok(
    (await page.getByRole('button', { name: 'Show results anyway', exact: true }).count()) === 0,
    'подтверждение не показывалось',
  );
  await ctx.close();
}

console.log('\n7. «Next» не заблокирован без ответа — это решение, а не недосмотр');
{
  const { ctx, page } = await startTest();
  const next = page.getByRole('button', { name: 'Next', exact: true });
  ok(await next.isEnabled(), 'кнопка активна на вопросе без ответа');
  await next.click();
  ok((await text(page)).includes('Question 2 of 15'), 'перешли дальше');
  await ctx.close();
}

console.log('\n8. В разборе пропуск отличается от неверного ответа');
{
  const { ctx, page } = await startTest();
  await walk(page, [1]);
  await page.getByRole('button', { name: 'See my results', exact: true }).click();
  await page.getByRole('button', { name: 'Show results anyway', exact: true }).click();
  const body = await text(page);
  ok(body.includes('You left this one blank'), 'у пропущенного вопроса своё пояснение');
  ok(body.includes('left blank'), 'состояние названо словами, не только значком');
  const badges = await page.locator('main li span[aria-hidden]').allInnerTexts();
  ok(badges.filter((b) => b === '—').length === TOTAL - 1, 'нейтральная пометка у всех пропусков');
  await ctx.close();
}

console.log('\n9. Телефон 390px и тёмная тема');
{
  const { ctx, page } = await startTest({
    viewport: { width: 390, height: 780 },
    colorScheme: 'dark',
  });
  await walk(page, [1, 2]);
  await page.getByRole('button', { name: 'See my results', exact: true }).click();
  ok(
    await page.getByRole('button', { name: 'Show results anyway', exact: true }).isVisible(),
    'подтверждение видно',
  );
  ok(
    await chip(page, 3, 'not answered').isVisible(),
    'номера на экране — предупреждение ссылается на них',
  );
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  ok(overflow <= 0, `горизонтальной прокрутки нет (перелив ${overflow}px)`);
  await ctx.close();
}

await browser.close();
console.log('\n' + (fails.length ? `ПРОВАЛОВ ${fails.length}:\n  ${fails.join('\n  ')}` : 'всё прошло'));
process.exit(fails.length ? 1 : 0);
