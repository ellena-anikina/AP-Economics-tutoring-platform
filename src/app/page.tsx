import Link from 'next/link';
import { TeacherByline } from '@/components/TeacherCard';
import { TESTS } from '@/config/tests';

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-14">
      <header className="flex flex-col gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
          Free practice tests
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
          Find out which topics are costing you marks.
        </h1>
        <p className="max-w-measure text-[17px] leading-relaxed text-ink-soft">
          Exam-style questions written by an economics instructor, with a breakdown of every topic
          and an explanation of every answer. No account, no payment.
        </p>
        <div className="pt-1">
          <TeacherByline />
        </div>
      </header>

      <ul className="flex flex-col gap-3">
        {TESTS.map((test) => (
          <li key={test.slug}>
            <Link
              href={test.href}
              className="flex flex-col gap-2 rounded border border-rule bg-surface p-5 transition-colors hover:border-ochre-soft"
            >
              <span className="font-serif text-xl font-semibold">{test.shortTitle}</span>
              <span className="text-[15px] leading-relaxed text-ink-soft">{test.blurb}</span>
              <span className="mt-1 font-mono text-[12px] text-ink-mute">
                {test.questionCount} questions · ~{test.estimatedMinutes} min
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
