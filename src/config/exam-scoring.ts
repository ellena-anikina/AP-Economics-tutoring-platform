/**
 * Как балл за экзамен AP® Microeconomics превращается в оценку от 1 до 5.
 *
 * ЧТО ЗДЕСЬ ТОЧНО, А ЧТО ОЦЕНКА — это главное различие в файле.
 *
 * ТОЧНО (apcentral.collegeboard.org, страница экзамена):
 *   Section I — 60 вопросов с выбором ответа, 1 ч 10 мин, 66% оценки;
 *   Section II — 3 задачи, 1 час вместе с 10 минутами на чтение, 33% оценки;
 *   внутри Section II длинная задача весит 50%, две короткие — по 25%.
 *   Отсюда шкала: 60 баллов за тест и 20 за задачи (10 + 5 + 5), но задачи
 *   должны весить вдвое меньше теста, поэтому каждый их балл умножается на
 *   1,5. Итог — 90 баллов, из них 60 (две трети) за тест.
 *
 * ТОЧНО (apstudents.collegeboard.org, официальное распределение за 2025 год):
 *   пятёрку получили 21,6% сдававших, 3 и выше — 68,2%.
 *
 * ОЦЕНКА — пороги. College Board не публикует таблицу перевода: она своя для
 * каждого года и зависит от сложности варианта. Все калькуляторы в сети
 * показывают именно оценку, и почти все об этом умалчивают.
 *
 * Мы нашли два публичных набора, посчитанных по той же 90-балльной шкале:
 * apscorehub.com (5 с 75, 4 с 58, 3 с 44) и num8ers.com (5 с 75, 4 с 62,
 * 3 с 50). Пятёрку оба дают с 75; ниже они расходятся. Взят второй, более
 * строгий: пообещать ученику оценку выше настоящей хуже, чем ниже, — он
 * перестанет готовиться. Пороги ждут подтверждения преподавателя: она видела
 * достаточно результатов, чтобы поправить их по опыту, и меняются они одной
 * строкой в BANDS.
 *
 * ПОЭТОМУ ЖЕ ЕСТЬ ПОЛОСА BORDERLINE. У самой границы разница между оценками
 * меньше, чем неопределённость самих порогов, и говорить «у тебя 4» там
 * нечестно. В этой полосе страница говорит «на границе».
 */

export interface ScoreBand {
  score: 1 | 2 | 3 | 4 | 5;
  /** Нижняя граница композитного балла, включительно. */
  min: number;
}

export interface FrqPart {
  id: string;
  label: string;
  max: number;
}

export const MCQ_COUNT = 60;

export const FRQ_PARTS: FrqPart[] = [
  { id: 'long', label: 'Long question', max: 10 },
  { id: 'short1', label: 'Short question 1', max: 5 },
  { id: 'short2', label: 'Short question 2', max: 5 },
];

/** Балл за задачу стоит полтора балла теста: 20 × 1,5 = 30 против 60. */
export const FRQ_WEIGHT = 1.5;

export const COMPOSITE_MAX = MCQ_COUNT + FRQ_PARTS.reduce((s, p) => s + p.max, 0) * FRQ_WEIGHT;

export const BANDS: ScoreBand[] = [
  { score: 5, min: 75 },
  { score: 4, min: 62 },
  { score: 3, min: 50 },
  { score: 2, min: 39 },
  { score: 1, min: 0 },
];

/** Насколько близко к порогу мы отказываемся называть оценку точно. */
export const BORDERLINE = 3;

/** Официальное распределение оценок за 2025 год, College Board. */
export const DISTRIBUTION = {
  year: 2025,
  students: 117548,
  mean: 3.24,
  passRate: 68.2,
  shares: [
    { score: 5, share: 21.6 },
    { score: 4, share: 24.0 },
    { score: 3, share: 22.6 },
    { score: 2, share: 20.3 },
    { score: 1, share: 11.5 },
  ],
} as const;

/**
 * Композитный балл округляется до целого ДО сравнения с порогом, а не после.
 * Иначе на экране можно увидеть «75 баллов» и рядом «оценка 4»: половинка
 * балла, полученная из нечётного числа баллов за задачи, округлилась вверх
 * для показа, но не для сравнения.
 */
export function composite(mcqCorrect: number, frqPoints: number[]): number {
  const frq = frqPoints.reduce((s, p) => s + p, 0);
  return Math.round(mcqCorrect + frq * FRQ_WEIGHT);
}

export function bandFor(compositeScore: number): ScoreBand {
  return BANDS.find((b) => compositeScore >= b.min) ?? BANDS[BANDS.length - 1];
}

/**
 * У самой границы честнее назвать две оценки, а не одну. Возвращается пара
 * «ниже — выше» для ближайшего порога: 74 и 75 одинаково дают «4–5».
 * Пороги разведены больше чем на две полосы, поэтому пара всегда одна.
 */
export function borderlinePair(compositeScore: number): [number, number] | null {
  const edge = BANDS.find((b) => b.min > 0 && Math.abs(compositeScore - b.min) < BORDERLINE);
  return edge ? [edge.score - 1, edge.score] : null;
}

/**
 * Сколько не хватает до следующей оценки — в баллах композита, в правильных
 * ответах теста и в баллах за задачи. Для верхней оценки — null.
 */
export function toNextScore(
  compositeScore: number,
): { score: number; points: number; mcq: number; frq: number } | null {
  const higher = [...BANDS].reverse().find((b) => b.min > compositeScore);
  if (!higher) return null;
  const points = higher.min - compositeScore;
  return {
    score: higher.score,
    points,
    // Балл теста — единица композита, балл задачи — полтора.
    mcq: Math.ceil(points),
    frq: Math.ceil(points / FRQ_WEIGHT),
  };
}
