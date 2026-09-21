import Link from 'next/link';
import BookButton from '@/components/BookButton';
import { MailIcon } from '@/components/icons';
import Portrait from '@/components/Portrait';
import Reg from '@/components/Reg';
import Section from '@/components/Section';
import SocialButton from '@/components/SocialButton';
import Testimonials from '@/components/Testimonials';
import { CTA } from '@/config/cta';
import { TEACHER } from '@/config/teacher';
import { TESTS } from '@/config/tests';
import { whatsappGeneral } from '@/lib/contact-links';

export default function Home() {
  const firstTest = TESTS[0];
  // Время — из определений тестов, чтобы обещание не разошлось с тем, что
  // человек получит, когда тестов станет больше.
  const mins = TESTS.map((t) => t.estimatedMinutes);
  const qs = TESTS.map((t) => t.questionCount);
  const range = (v: number[]) =>
    Math.min(...v) === Math.max(...v) ? `${v[0]}` : `${Math.min(...v)}\u2013${Math.max(...v)}`;
  const examHref = `/practice-test/${firstTest.scope.exam}`;

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:gap-12 lg:py-20">
      {/* Портрет и заголовок — в одной строке на широком экране, портрет
          сверху на узком: доверие к преподавателю начинается с лица. */}
      <header className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_13rem] md:items-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-14">
        <div className="flex justify-center md:col-start-2 md:row-start-1 md:justify-end">
          <Portrait />
        </div>

        <div className="flex flex-col gap-5 md:col-start-1 md:row-start-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ochre">
            {TEACHER.brand} · <Reg>AP® Economics</Reg>
          </p>
          {/* text-balance выравнивает строки заголовка по длине — иначе
              последнее слово повисает в одиночестве на своей строке. */}
          <h1 className="text-balance font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.015em] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]">
            <Reg>{TEACHER.homeHeadline}</Reg>
          </h1>
          <p className="max-w-measure text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
            {TEACHER.homeSubhead}
          </p>
          <div className="flex flex-col gap-2 pt-1">
            {/* КНОПКА ВЕДЁТ НА СПИСОК ТЕСТОВ, А НЕ В ПЕРВЫЙ ЮНИТ.
                Раньше она открывала сразу Unit 1. Пока юнит один, это было
                короче на шаг; с двумя и дальше — ошибка: ученик, который
                проходит Unit 2, попадал не в свой тест, а на странице теста
                выбора юнита нет. Страница экзамена — тот самый выбор, плюс
                формат экзамена и подпись преподавателя. Её же должен
                находить поиск по запросу «AP Microeconomics practice test»,
                и ссылка с главной работает на неё. */}
            <Link
              href={examHref}
              className="w-full rounded bg-ink px-6 py-4 text-center text-base font-semibold text-ground hover:opacity-90 sm:w-fit"
            >
              Start a free test
            </Link>
            <p className="text-[13px] text-ink-mute">
              {TESTS.length > 1
                ? `Pick your unit · ${range(qs)} questions · no account needed`
                : `${firstTest.questionCount} questions · about ${firstTest.estimatedMinutes} minutes · no account needed`}
            </p>
          </div>
        </div>
      </header>

      <Section title={TEACHER.outcomesHeading}>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {TEACHER.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" />
              <span>
                <Reg>{outcome}</Reg>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Отзывы — между обещанием (список выше) и просьбой (раздел для
          родителей с кнопкой записи). Почему здесь — в Testimonials.tsx. */}
      <Testimonials />

      {/* Раздел адресован родителю прямо и назван так же прямо: подросток не
          должен читать про «своего ребёнка». Построен как разговор, а не как
          призыв: узнаваемая картина (её текст с её сайта) → почему её не
          видно по школьным оценкам → бесплатный способ проверить → и только
          потом разговор. Главное действие здесь — тест: он ничего не стоит
          родителю, не требует решения и сам создаёт повод для звонка. */}
      <Section eyebrow="For parents" title={TEACHER.parentHeadline}>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          <Reg>{TEACHER.parentPitch}</Reg>
        </p>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          <Reg>{TEACHER.parentBlindSpot}</Reg>
        </p>
        {/* Числа берутся из определения теста, чтобы обещание в тексте не
            разошлось с тем, что человек получит, когда тестов станет больше. */}
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          The free diagnostic answers that in about {range(mins)} minutes: exam-style questions on
          the unit your child is studying, then a breakdown of exactly which topics are costing
          marks. No account, nothing to pay, and no call unless you ask for one.
        </p>

        {/* Две кнопки — две степени готовности. Тест ничего не стоит и не
            требует решения, поэтому он идёт первым и контурной кнопкой.
            Запись — для родителя, который уже понял, что хочет поговорить;
            зелёная заливка отделяет её от всего остального на сайте. */}
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <Link
              href={examHref}
              className="w-full rounded border border-ink px-5 py-3.5 text-center text-[15px] font-semibold transition-colors hover:bg-surface sm:w-fit"
            >
              Send the free test to your child
            </Link>
            <BookButton href={whatsappGeneral()} size="md" full />
          </div>
          <p className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
            {TEACHER.parentSessionOffer} You can also write to me at{' '}
            <a
              href={`mailto:${CTA.email}`}
              className="font-medium text-ochre underline underline-offset-2"
            >
              {CTA.email}
            </a>
            .
          </p>
        </div>
      </Section>

      <Section title={`About ${TEACHER.name}`}>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          I have spent more than ten years teaching economics and preparing students for{' '}
          <Reg>AP® Microeconomics</Reg> and <Reg>AP® Macroeconomics</Reg>, and have helped hundreds
          of students build real economic thinking, achieve high <Reg>AP®</Reg> scores, and
          strengthen their university applications.
        </p>
        <p className="max-w-measure text-pretty text-[16px] leading-relaxed text-ink-soft">
          {TEACHER.approach}
        </p>

        {/* Те же кнопки, что в блоке «Keep AP® Economics in your feed» на экране
            результатов: одна и та же дверь в Instagram не должна выглядеть на
            двух страницах по-разному. Раньше здесь были охряные текстовые
            ссылки, а на телефоне «Facebook» падал на отдельную строку.

            Надписи другие, и это намеренно. На экране результатов блок просит
            подписаться, поэтому там глагол «Follow». Здесь человек ещё не прошёл
            тест и читает, кто такая Ольга, — ему нужна справка, а не призыв
            уйти в ленту. Поэтому название канала и адрес: @olganomics5 можно
            найти в Instagram с телефона родителя.

            У Facebook второй строки нет: в адресе профиля служебное имя, а
            придумывать подпись за Ольгу нельзя (принцип 2 в CONTEXT.md).
            Чтобы кнопки в ряд были одной высоты, li — flex: кнопка
            растягивается по самой высокой соседке. */}
        <ul className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:flex-wrap">
          <li className="flex">
            <SocialButton
              kind="instagram"
              href={TEACHER.instagramUrl}
              label="Instagram"
              note={TEACHER.instagram}
            />
          </li>
          <li className="flex">
            <SocialButton kind="facebook" href={TEACHER.facebookUrl} label="Facebook" />
          </li>
        </ul>
        {/* Почта — строкой, а не третьей кнопкой. Она не соцсеть, фирменной
            плитки у неё нет, и третья кнопка с адресом не помещается в ряд:
            на широком экране не хватает 8 пикселей, ряд рвётся на 2 + 1.
            Стиль — как у той же ссылки в блоке для родителей выше: на одной
            странице одна ссылка выглядит одинаково. */}
        <p className="flex items-center gap-2 text-[14px]">
          <MailIcon className="h-4 w-4 text-ink-mute" />
          <a
            href={`mailto:${CTA.email}`}
            className="font-medium text-ochre underline underline-offset-2"
          >
            {CTA.email}
          </a>
        </p>
      </Section>
    </main>
  );
}
