import type { ExamUnit } from '@/config/exam-units';

/**
 * План подготовки: сколько осталось недель → что делать в каждую.
 *
 * КАК ДЕЛЯТСЯ НЕДЕЛИ. Юниты выкладываются в линию длиной 100, и длина куска
 * равна весу юнита на экзамене. Линия режется на равные отрезки по числу
 * учебных недель, и в неделю попадают все юниты, на которые её отрезок лёг.
 * Поэтому тяжёлые юниты сами получают по две недели, а лёгкие делят одну, —
 * и ничего не надо раскладывать руками для каждого срока.
 *
 * ДИАГНОСТИКА — В ТУ НЕДЕЛЮ, ГДЕ ЮНИТ ЗАКАНЧИВАЕТСЯ. Тяжёлый юнит занимает
 * две недели подряд, и звать решать по нему тест дважды бессмысленно: в
 * первую неделю он ещё не пройден. Поэтому у каждой пары «неделя — юнит»
 * есть признак finishes, и приглашение показывается один раз.
 *
 * ПОСЛЕДНЯЯ НЕДЕЛЯ ВСЕГДА ОТДАНА ЦЕЛОМУ ПРОБНИКУ. Не потому, что так принято,
 * а потому, что это единственная неделя, которая проверяет то, чего не
 * проверяет ни одна тема по отдельности: способность выдержать час десять
 * на шестьдесят вопросов и не рассыпаться на задачах после.
 *
 * ПЛАН — ШАБЛОН, А НЕ РАСПИСАНИЕ. Он не знает, что уже пройдено в школе,
 * поэтому страница говорит об этом прямо, а не притворяется персональным.
 *
 * СПИСОК ЮНИТОВ ПЕРЕДАЁТСЯ ПАРАМЕТРОМ, А НЕ ИМПОРТИРУЕТСЯ. Файл гоняется
 * юнит-тестом через node --experimental-strip-types, а тот не понимает
 * псевдоним «@/». Тип импортируется — он стирается при компиляции и в
 * рантайме не ищется; значения приходят снаружи.
 */

export interface PlanUnit {
  unit: ExamUnit;
  /** Юнит заканчивается на этой неделе — значит, пора решать диагностику. */
  finishes: boolean;
}

export interface PlanWeek {
  /** Номер недели от начала подготовки. */
  number: number;
  /** Сколько недель до экзамена остаётся на конец этой недели. */
  weeksLeft: number;
  units: PlanUnit[];
  /** Последняя неделя: целый пробник вместо новых тем. */
  isFinal: boolean;
}

export const WEEK_OPTIONS = [2, 4, 8, 12, 20, 30] as const;

/**
 * Дольше этого срока недельного плана не бывает — и это не ограничение, а
 * содержание. Экзамен в мае; человек, который начинает осенью, ещё не прошёл
 * в школе половину курса, и «повторять» ему нечего. Расписать ему тридцать
 * недель по темам значит выдумать занятие: пять недель подряд на Unit 1.
 *
 * Поэтому длинный срок делится на два куска. Пока идёт курс — своя работа:
 * закрывать пробелы сразу, юнит за юнитом, по мере того как класс их
 * заканчивает. И только последние девять недель — обычное повторение.
 */
export const REVISION_WEEKS = 9;

/** Занятия по ходу курса: один кусок расписания вместо десятка недель. */
export interface CoursePhase {
  fromWeek: number;
  toWeek: number;
  units: ExamUnit[];
}

export interface Schedule {
  /** Есть только у длинных сроков: пока курс ещё идёт. */
  course: CoursePhase | null;
  weeks: PlanWeek[];
}

/**
 * Полное расписание: короткий срок — только недели, длинный — сначала работа
 * по ходу курса, потом те же девять недель повторения в конце.
 */
export function buildSchedule(totalWeeks: number, units: ExamUnit[]): Schedule {
  const weeks = Math.max(2, Math.round(totalWeeks));
  if (weeks <= 12) return { course: null, weeks: buildPlan(weeks, units) };

  const courseWeeks = weeks - REVISION_WEEKS;
  const offset = courseWeeks;
  return {
    course: { fromWeek: 1, toWeek: courseWeeks, units },
    // Недели повторения нумеруются подряд с концом курса, а не с единицы:
    // человек считает недели до экзамена, а не до начала подготовки.
    weeks: buildPlan(REVISION_WEEKS, units).map((w) => ({
      ...w,
      number: w.number + offset,
      weeksLeft: weeks - (w.number + offset) + 1,
    })),
  };
}

export function buildPlan(totalWeeks: number, units: ExamUnit[]): PlanWeek[] {
  const weeks = Math.max(2, Math.round(totalWeeks));
  const studyWeeks = weeks - 1;

  // Середина диапазона веса — оценка доли юнита на экзамене.
  const weight = (u: ExamUnit) => (u.weightMin + u.weightMax) / 2;
  const total = units.reduce((s, u) => s + weight(u), 0);
  let cursor = 0;
  const spans = units.map((unit) => {
    const start = cursor;
    cursor += (weight(unit) / total) * 100;
    return { unit, start, end: cursor };
  });

  const plan: PlanWeek[] = [];
  for (let i = 0; i < studyWeeks; i++) {
    const from = (i / studyWeeks) * 100;
    const to = ((i + 1) / studyWeeks) * 100;
    plan.push({
      number: i + 1,
      weeksLeft: weeks - i,
      // Юнит попадает в неделю, если его кусок линии пересекается с отрезком.
      units: spans
        .filter((s) => s.start < to - 1e-9 && s.end > from + 1e-9)
        // Последняя неделя юнита — та, за правый край которой он не выходит.
        .map((s) => ({ unit: s.unit, finishes: s.end <= to + 1e-9 })),
      isFinal: false,
    });
  }
  plan.push({ number: weeks, weeksLeft: 1, units: [], isFinal: true });
  return plan;
}
