import { redirect } from 'next/navigation';

/**
 * Верхний хаб тестов. Экзамен пока один, поэтому отдельная страница выбора
 * между одним пунктом — лишний клик; ведём на страницу экзамена, где список
 * юнитов уже есть. Когда появится AP Macro, здесь встанет выбор экзамена.
 */
export default function PracticeTestIndex() {
  redirect('/practice-test/ap-microeconomics');
}
