export type Subject = 'macro' | 'micro';
export type ExamId = 'ap-microeconomics' | 'ap-macroeconomics';
export type SkillTag = 'conceptual' | 'graphing' | 'calculation' | 'analysis';
export type Difficulty = 1 | 2 | 3;
export type ChoiceId = 'A' | 'B' | 'C' | 'D' | 'E';

export type DiagramName =
  | 'PPF'
  | 'SupplyDemand'
  | 'ADAS'
  | 'PhillipsCurve'
  | 'MoneyMarket'
  | 'LoanableFunds'
  | 'ForexMarket'
  | 'CostCurves'
  | 'MarketStructure'
  | 'GameMatrix';

export type Stimulus =
  | { kind: 'diagram'; component: DiagramName; props: Record<string, unknown> }
  | { kind: 'table'; caption: string; headers: string[]; rows: string[][] }
  | { kind: 'text'; body: string };

export interface Question {
  id: string;
  subject: Subject;
  unitId: string;
  topicId: string;
  skill: SkillTag;
  difficulty: Difficulty;
  targetSeconds: number;
  stem: string;
  stimulus?: Stimulus;
  choices: { id: ChoiceId; text: string }[];
  correctChoiceId: ChoiceId;
  explanation: string;
  distractorNotes: Partial<Record<ChoiceId, string>>;
}

/**
 * Область теста. Юнит-тест и полный экзамен — две ветки одного экрана
 * результатов, а не два разных экрана: меняются только шапка и уровень
 * разбивки, всё остальное общее.
 */
export type TestScope =
  | { kind: 'unit'; exam: ExamId; unitId: string }
  | { kind: 'full'; exam: ExamId };

export interface TestDefinition {
  slug: string;
  href: string;
  scope: TestScope;
  title: string;
  shortTitle: string;
  /** «Unit 1», «Unit 2» — подставляется в оговорку на экране результатов.
   *  Раньше та оговорка была вписана в компонент словами «Unit 1» и на
   *  любом втором тесте начала бы врать. */
  unitLabel: string;
  blurb: string;
  questionCount: number;
  estimatedMinutes: number;
  /** Лимит времени в секундах. null — без таймера (первая итерация). */
  timeLimitSeconds: number | null;
}

export interface AnswerRecord {
  choiceId: ChoiceId | null;
  seconds: number;
  visits: number;
}

export interface Attempt {
  id: string;
  /** Каким определением теста пройдена попытка. Нужен, чтобы старые
   *  результаты продолжали корректно отрисовываться при появлении новых тестов. */
  testSlug: string;
  startedAt: number;
  finishedAt: number | null;
  answers: Record<string, AnswerRecord>;
}

export interface TopicResult {
  topicId: string;
  title: string;
  correct: number;
  total: number;
  percent: number;
  /** Сколько вопросов теста приходится на тему — вес внутри этого теста. */
  weight: number;
  /** (1 − percent) × weight. Наверх выходят слабые И весомые темы. */
  priority: number;
}

export interface SkillResult {
  skill: SkillTag;
  correct: number;
  total: number;
}

export interface TestResult {
  attemptId: string;
  testSlug: string;
  correct: number;
  total: number;
  answered: number;
  percent: number;
  topics: TopicResult[];
  weakestTopics: TopicResult[];
  skills: SkillResult[];
  medianSeconds: number;
  totalSeconds: number;
}
