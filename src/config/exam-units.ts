/**
 * Шесть юнитов AP® Microeconomics и их вес на экзамене.
 *
 * Названия и проценты — с apcentral.collegeboard.org, страница курса. Это
 * доля юнита в секции с выбором ответа; секция весит две трети экзамена.
 * Проверять заново перед каждым учебным годом: College Board иногда
 * пересобирает рамку курса.
 *
 * ВЕС НУЖЕН НЕ ДЛЯ УКРАШЕНИЯ. По нему план подготовки раздаёт недели: юнит,
 * который стоит четверти баллов, не может получить столько же времени,
 * сколько юнит на восемь процентов. Середина диапазона берётся как оценка
 * веса — точное число College Board не называет.
 */

export interface ExamUnit {
  number: number;
  title: string;
  /** Доля в секции с выбором ответа, в процентах. */
  weightMin: number;
  weightMax: number;
  /** Слаг теста, если диагностика по этому юниту уже написана. */
  testSlug?: string;
}

export const MICRO_UNITS: ExamUnit[] = [
  {
    number: 1,
    title: 'Basic Economic Concepts',
    weightMin: 12,
    weightMax: 15,
    testSlug: 'ap-microeconomics-unit-1',
  },
  {
    number: 2,
    title: 'Supply and Demand',
    weightMin: 20,
    weightMax: 25,
    testSlug: 'ap-microeconomics-unit-2',
  },
  {
    number: 3,
    title: 'Production, Cost, and the Perfect Competition Model',
    weightMin: 22,
    weightMax: 25,
    testSlug: 'ap-microeconomics-unit-3',
  },
  { number: 4, title: 'Imperfect Competition', weightMin: 15, weightMax: 22 },
  { number: 5, title: 'Factor Markets', weightMin: 10, weightMax: 13 },
  { number: 6, title: 'Market Failure and the Role of Government', weightMin: 8, weightMax: 13 },
];

export const unitWeight = (u: ExamUnit) => (u.weightMin + u.weightMax) / 2;
