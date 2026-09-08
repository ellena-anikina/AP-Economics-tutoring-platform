import Link from 'next/link';
import { TESTS } from '@/config/tests';

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-20">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[13px] text-ink-mute">404</p>
        <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          That page isn’t here.
        </h1>
        <p className="max-w-measure text-[16px] leading-relaxed text-ink-soft">
          The link may be out of date, or the page may not exist yet. Everything that does exist is
          below.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {TESTS.map((test) => (
          <li key={test.slug}>
            <Link
              href={test.href}
              className="flex flex-col gap-1.5 rounded border border-rule bg-surface p-5 transition-colors hover:border-ochre-soft"
            >
              <span className="font-serif text-lg font-semibold">{test.shortTitle}</span>
              <span className="font-mono text-[12px] text-ink-mute">
                {test.questionCount} questions · ~{test.estimatedMinutes} min · free
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/" className="w-fit text-[15px] font-medium text-ochre underline underline-offset-4">
        Back to the start
      </Link>
    </main>
  );
}
