import { redirect } from 'next/navigation';
import { TESTS } from '@/config/tests';

/**
 * Хаб тестов. Пока тест один, отдельная страница выбора — лишний клик на
 * пути к конверсии, поэтому редирект. Когда тестов станет три и больше,
 * здесь появится список: люди обрезают URL руками, и 404 на родительском
 * пути выглядит неряшливо.
 */
export default function PracticeTestIndex() {
  redirect(TESTS[0].href);
}
