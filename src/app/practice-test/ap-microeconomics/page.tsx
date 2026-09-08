import { redirect } from 'next/navigation';
import { TESTS } from '@/config/tests';

/** Хаб экзамена. Пока по AP Micro доступен один юнит-тест — ведём на него. */
export default function ExamIndex() {
  const first = TESTS.find((t) => t.scope.exam === 'ap-microeconomics') ?? TESTS[0];
  redirect(first.href);
}
