import Reg from '@/components/Reg';

/**
 * Раздел с заголовком в боковой колонке.
 *
 * На широком экране заголовок уходит влево, содержимое занимает остальное
 * место. Так строка прозы остаётся читаемой (около 70 знаков), но страница
 * перестаёт быть узкой полосой посреди монитора: слева теперь заголовок,
 * а не воздух. Ниже 1024px колонки схлопываются в привычный порядок —
 * заголовок сверху, содержимое под ним.
 *
 * Ширина боковой колонки (18rem) подобрана по самому длинному заголовку в
 * реальном шрифте: «About Dr. Olga Shalamai» должен помещаться в одну строку.
 */
export default function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-x-10 gap-y-4 border-t border-rule pt-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:pt-12 xl:gap-x-12">
      <div className="flex flex-col gap-1.5">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-balance font-serif text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
          <Reg>{title}</Reg>
        </h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
