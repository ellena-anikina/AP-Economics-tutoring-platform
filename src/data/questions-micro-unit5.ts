/**
 * data/questions-micro-unit5.ts
 *
 * AP® Microeconomics · Unit 5 «Factor Markets» — 15 MCQ.
 *
 * ПРОИСХОЖДЕНИЕ. Все вопросы написаны с нуля. Материалы College Board
 * (Test Booklets, AP Classroom) НЕ использовались и использоваться не могут:
 * их условия запрещают распространение и прогон через генеративные системы.
 * Использована только официальная сетка тем CED (5.1–5.4) — она публична.
 * Состав юнитов и веса сверены 30.09.2026 вместе с Unit 4; названия тем
 * 07.11 сверены по открытым конспектам курса, сам PDF CED заново не открывали.
 *
 * ПОЧЕМУ 15. Юнит весит 10–13% экзамена, и тем в нём четыре — меньше, чем в
 * любом другом юните. Пятнадцать вопросов дают три-четыре на тему: этого
 * хватает, чтобы priority = (1 − доля верных) × вес темы различал «не знаю»
 * и «ошибся один раз».
 *
 * ПОКРЫТИЕ ТЕМ:
 *   5.1 Introduction to Factor Markets ............................. 4
 *   5.2 Changes in Factor Demand and Factor Supply ................. 4
 *   5.3 Profit-Maximizing Behavior in Perfectly Competitive
 *       Factor Markets ............................................. 3
 *   5.4 Monopsonistic Markets ...................................... 4
 *
 * ОДНА ФЕРМА НА ЧЕТЫРЕ ВОПРОСА, ОДИН РЫНОК НА ТРИ. Четыре вопроса считают по
 * одной таблице выпуска, три читают одну и ту же схему монопсонии (третий —
 * с добавленной минимальной ставкой). Приём тот же, что в Unit 3 и Unit 4:
 * ученик разбирается в условии один раз, а дальше отвечает на вопросы.
 *
 * ЧИСЛА ПОДОБРАНЫ ТАК, ЧТОБЫ ВСЁ СХОДИЛОСЬ ТОЧНО, и пересчитаны независимым
 * скриптом, включая каждый неверный вариант.
 * Ферма (совершенная конкуренция на обоих рынках): выпуск 0, 30, 56, 78, 96,
 *   110, 120 при 0–6 сборщиках, MP = 30, 26, 22, 18, 14, 10.
 *   При $4 за ящик MRP = 120, 104, 88, 72, 56, 40; при $5 — 150 … 50.
 *   Ставки в вопросах ($60 и $80) нигде не совпадают с MRP, поэтому ответ
 *   «сколько нанять» однозначен: при $60 и $4 — 4, при $5 — 5; при $80 — 3.
 * Фирма-монополист на рынке продукта: выручка 200, 324, 384, 420, поэтому
 *   MRP третьего работника = $60, а не MP × P = $96 — разница ровно в
 *   $36 потери на 18 прежних единицах.
 * Монопсония: MRP: w = 85 − 0,5L; предложение: w = 10 + L; MFC = 10 + 2L.
 *   MRP = MFC → L = 30, MFC = 70, ставка по предложению $40.
 *   Конкурентный рынок: L = 50, w = 60.
 *   Минимальная ставка $50: предложение даёт 40 работников, MRP(40) = 65 >
 *   50, дальше MFC скачком выше MRP → наём 40 (проверено перебором).
 * Рынок электриков: D: w = 70 − 0,5L, S1: w = 10 + 0,5L, S2 на $20 выше;
 *   равновесие (60; $40) → (40; $50).
 *
 * ОРФОГРАФИЯ американская — labor, maximize: так названы темы CED, а они
 * выводятся на экран результатов дословно.
 *
 * УРОВЕНЬ. Как в Unit 1–4, набор смещён в верхнюю часть сложности.
 * Ключи распределены по 3 на каждую букву A–E.
 */

import type { Question } from '@/types';

/* ── Общая таблица фермы ───────────────────────────────────────────────────
 * Ферма продаёт клубнику на совершенно конкурентном рынке и нанимает
 * сборщиков на совершенно конкурентном рынке труда. Строка с нулём нужна:
 * без неё предельный продукт первого сборщика пришлось бы угадывать. */
const FARM_TABLE = {
  kind: 'table' as const,
  caption: 'A strawberry farm’s daily output (every box sells for $4 in a perfectly competitive market)',
  headers: ['Pickers', 'Output (boxes per day)'],
  rows: [
    ['0', '0'],
    ['1', '30'],
    ['2', '56'],
    ['3', '78'],
    ['4', '96'],
    ['5', '110'],
    ['6', '120'],
  ],
};

/* ── Фирма, которая сама назначает цену ────────────────────────────────────
 * Единственный продавец своего товара: чтобы продать больше, снижает цену.
 * Выручка 200, 324, 384, 420; MRP падает 200, 124, 60, 36 — быстрее, чем
 * предельный продукт, потому что MR ниже цены.
 * Заголовки короткие не ради стиля: ячейки таблицы не переносятся, и с
 * «Price per unit ($)» на экране 390px колонка цен уезжала за край — а без
 * цен вопрос не решить. Единицы сказаны в подписи. */
const PRICE_MAKER_TABLE = {
  kind: 'table' as const,
  caption: 'A firm that is the only seller of its product (output in units, price per unit in dollars)',
  headers: ['Workers', 'Output', 'Price ($)'],
  rows: [
    ['1', '10', '20'],
    ['2', '18', '18'],
    ['3', '24', '16'],
    ['4', '28', '15'],
  ],
};

/* ── Рынок электриков: предложение сдвигается влево ─────────────────────────
 * Новая кривая пунктиром, как сдвинутая кривая на всех схемах сайта.
 * Подписи S1 и S2 без подстрочных цифр: в латинском наборе шрифта Inter их
 * нет, и браузер подставил бы цифры из чужого шрифта.
 * Подпись оси — одно слово: «Number of electricians» начиналась прямо под
 * отметкой 60, и они читались как одна строка. То же на схемах монопсонии. */
const ELECTRICIANS_DIAGRAM = {
  kind: 'diagram' as const,
  component: 'SupplyDemand' as const,
  props: {
    xLabel: 'Electricians',
    yLabel: 'Wage, $',
    lines: [
      { id: 'd', label: 'D', intercept: 70, slope: -0.5, to: 100 },
      { id: 's1', label: 'S1', intercept: 10, slope: 0.5, to: 100 },
      { id: 's2', label: 'S2', intercept: 30, slope: 0.5, to: 100, dashed: true },
    ],
    points: [
      { id: 'e1', x: 60, y: 40, guides: true },
      { id: 'e2', x: 40, y: 50, guides: true },
    ],
    axisValues: [
      { axis: 'x' as const, at: 40, text: '40' },
      { axis: 'x' as const, at: 60, text: '60' },
      { axis: 'y' as const, at: 40, text: '40' },
      { axis: 'y' as const, at: 50, text: '50' },
    ],
    description:
      'The labor market for electricians. Demand for electricians, D, slopes down from a wage of $70. The ' +
      'original supply curve, S1, slopes up from $10 and crosses demand at 60 electricians and a wage of $40. ' +
      'The new supply curve, S2, is drawn dashed: it runs parallel to S1 but $20 higher, so at every wage fewer ' +
      'electricians offer to work. It crosses demand at 40 electricians and a wage of $50.',
  },
};

/* ── Общая схема монопсонии ────────────────────────────────────────────────
 * Все три кривые — прямые, поэтому схема собрана на SupplyDemand: он
 * рисует прямую по точке пересечения с осью и наклону, и разойтись с
 * формулами из шапки ей нечем. MFC пунктиром — так же, как MR на схемах
 * Unit 4: предельная кривая, выведенная из средней.
 * MFC обрезана на 38 работниках, предложение на 78: дальше они уходят за
 * верх схемы. */
const MONOPSONY_LINES = [
  { id: 'mrp', label: 'MRP', intercept: 85, slope: -0.5, to: 100 },
  { id: 's', label: 'S', intercept: 10, slope: 1, to: 78 },
  { id: 'mfc', label: 'MFC', intercept: 10, slope: 2, to: 38, dashed: true },
];

const MONOPSONY_POINTS = [
  { id: 'mfc-mrp', x: 30, y: 70, guides: true },
  { id: 'wage', x: 30, y: 40, guides: true },
  { id: 'competitive', x: 50, y: 60, guides: true },
];

const MONOPSONY_DIAGRAM = {
  kind: 'diagram' as const,
  component: 'SupplyDemand' as const,
  props: {
    xLabel: 'Workers',
    yLabel: 'Wage, $',
    lines: MONOPSONY_LINES,
    points: MONOPSONY_POINTS,
    axisValues: [
      { axis: 'x' as const, at: 30, text: '30' },
      { axis: 'x' as const, at: 50, text: '50' },
      { axis: 'y' as const, at: 40, text: '40' },
      { axis: 'y' as const, at: 60, text: '60' },
      { axis: 'y' as const, at: 70, text: '70' },
    ],
    description:
      'A labor market with a single employer. The labor supply curve, S, rises from a wage of $10 with no ' +
      'workers by one dollar for each extra worker. The marginal factor cost curve, MFC, drawn dashed, starts at ' +
      'the same point and rises twice as steeply. Marginal revenue product, MRP, falls from $85 with no workers ' +
      'to $35 at 100 workers. Marginal factor cost crosses marginal revenue product at 30 workers and $70; at 30 ' +
      'workers the supply curve is at $40. Supply crosses marginal revenue product at 50 workers and $60.',
  },
};

/* ── Та же монопсония с минимальной ставкой $50 ────────────────────────────
 * Ставка — охряная горизонталь, тем же приёмом, что потолок и пол цены в
 * Unit 2. Отмечены обе её точки: с предложением (40 — ответ) и с MRP
 * (70 — сколько фирма хотела бы нанять). Выбор между ними и есть вопрос. */
const MINIMUM_WAGE_DIAGRAM = {
  kind: 'diagram' as const,
  component: 'SupplyDemand' as const,
  props: {
    xLabel: 'Workers',
    yLabel: 'Wage, $',
    lines: MONOPSONY_LINES,
    priceLines: [{ at: 50, label: 'Minimum wage' }],
    points: [
      ...MONOPSONY_POINTS,
      { id: 'min-s', x: 40, y: 50, guides: true },
      { id: 'min-mrp', x: 70, y: 50, guides: true },
    ],
    axisValues: [
      { axis: 'x' as const, at: 30, text: '30' },
      { axis: 'x' as const, at: 40, text: '40' },
      { axis: 'x' as const, at: 50, text: '50' },
      { axis: 'x' as const, at: 70, text: '70' },
      { axis: 'y' as const, at: 40, text: '40' },
      { axis: 'y' as const, at: 50, text: '50' },
      { axis: 'y' as const, at: 60, text: '60' },
      { axis: 'y' as const, at: 70, text: '70' },
    ],
    description:
      'The same labor market with a minimum wage of $50, drawn as a horizontal line. Supply rises from $10 by ' +
      'one dollar per worker, marginal factor cost rises twice as steeply from the same point, and marginal ' +
      'revenue product falls from $85 to $35 at 100 workers. The minimum wage line meets the supply curve at 40 ' +
      'workers and the marginal revenue product curve at 70 workers. Without the minimum wage, marginal factor ' +
      'cost crosses marginal revenue product at 30 workers and $70, the supply curve is at $40 at 30 workers, ' +
      'and supply crosses marginal revenue product at 50 workers and $60.',
  },
};

export const microUnit5Questions: Question[] = [
  // ── 5.1 Introduction to Factor Markets ───────────────────────────────────
  {
    id: 'micro-u5-01',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-intro',
    skill: 'conceptual',
    difficulty: 1,
    targetSeconds: 55,
    stem:
      'Sales of electric cars rise sharply, and car makers start hiring more battery engineers, although the ' +
      'engineers’ wage and skills have not changed. This is an example of',
    choices: [
      { id: 'A', text: 'an increase in the supply of battery engineers.' },
      { id: 'B', text: 'diminishing marginal returns to battery engineers.' },
      { id: 'C', text: 'monopsony power in the market for engineers.' },
      {
        id: 'D',
        text: 'an increase in the quantity of engineers demanded along an unchanged demand curve.',
      },
      {
        id: 'E',
        text: 'derived demand: firms want engineers because consumers want the cars they help to build.',
      },
    ],
    correctChoiceId: 'E',
    explanation:
      'Firms do not hire workers for their own sake; they hire them for what they produce. The demand for any ' +
      'factor of production is therefore derived from the demand for the product it helps to make. When more ' +
      'people want electric cars, each battery engineer adds more to a car maker’s revenue, so the demand curve ' +
      'for engineers shifts right even though nothing about the engineers themselves has changed.',
    distractorNotes: {
      A: 'Nothing in the story changes how many engineers are willing to work. The change starts with car buyers, which puts it on the demand side of the labor market.',
      B: 'Diminishing marginal returns describe what happens as more workers share the same equipment. They explain why the demand curve for labor slopes down, not why it moves.',
      C: 'Monopsony means a single employer. Many car makers are hiring here, and none of them sets the wage.',
      D: 'A movement along the demand curve needs a change in the wage, and the wage has not changed. More engineers hired at the same wage means the whole curve has shifted.',
    },
  },
  {
    id: 'micro-u5-02',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-intro',
    skill: 'calculation',
    difficulty: 2,
    targetSeconds: 80,
    stem:
      'The table shows the daily output of a strawberry farm, which sells every box for $4 in a perfectly ' +
      'competitive market. What is the marginal revenue product of the third picker?',
    stimulus: FARM_TABLE,
    choices: [
      { id: 'A', text: '$22' },
      { id: 'B', text: '$72' },
      { id: 'C', text: '$88' },
      { id: 'D', text: '$104' },
      { id: 'E', text: '$312' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Marginal revenue product is the extra revenue one more worker brings in: the extra output times the ' +
      'revenue from each unit of it. The third picker raises output from 56 to 78 boxes, a marginal product of ' +
      '22 boxes, and each box sells for $4, so the marginal revenue product is 22 × $4 = $88. A firm selling in a ' +
      'perfectly competitive market gets the same price for every unit, so its marginal revenue is the price and ' +
      'MRP = MP × P.',
    distractorNotes: {
      A: '22 is the marginal product, counted in boxes. The marginal revenue product is what those boxes are worth: 22 × $4.',
      B: 'That is the fourth picker, who raises output from 78 to 96 boxes: 18 × $4 = $72. The third picker’s contribution is the step from 56 to 78.',
      D: '$104 is the revenue from three pickers, $312, divided by three — what the average picker brings in, not what the third one adds.',
      E: '$312 is the total revenue from the 78 boxes that three pickers produce. Marginal revenue product counts only what the third picker adds.',
    },
  },
  {
    id: 'micro-u5-03',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-intro',
    skill: 'analysis',
    difficulty: 2,
    targetSeconds: 75,
    stem: 'In the table, each additional picker adds less to the farm’s revenue than the one before. Why?',
    stimulus: FARM_TABLE,
    choices: [
      { id: 'A', text: 'The farm must lower its price to sell the extra boxes.' },
      {
        id: 'B',
        text: 'Each extra picker adds fewer boxes than the one before, because the pickers share the same fields and equipment; every box still sells for $4.',
      },
      { id: 'C', text: 'The farm must pay a higher wage to attract each extra picker.' },
      { id: 'D', text: 'Total output falls as more pickers are hired.' },
      { id: 'E', text: 'Pickers hired later are less skilled than those hired first.' },
    ],
    correctChoiceId: 'B',
    explanation:
      'Marginal revenue product is marginal product times price, and the price here is fixed at $4, so the ' +
      'whole fall comes from the marginal product: 30, 26, 22, 18, 14 and then 10 boxes. That is diminishing ' +
      'marginal returns. The fields and equipment are fixed in the short run, so each extra picker has less of ' +
      'them to work with and adds less output than the one before. This is why a firm’s demand curve for labor ' +
      'slopes down.',
    distractorNotes: {
      A: 'That is a second reason for a firm with market power in its product market. This farm sells at $4 however many boxes it produces.',
      C: 'The wage is a cost, so it cannot change revenue. And in a perfectly competitive labor market the farm can hire as many pickers as it wants at the going wage.',
      D: 'Total output keeps rising, from 30 boxes to 120. It rises more slowly with each picker, which is what a falling marginal product means.',
      E: 'The model assumes every picker is equally skilled. Returns diminish because more pickers share the same fixed land and equipment, not because the later ones are worse at the job.',
    },
  },
  {
    id: 'micro-u5-04',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-intro',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 110,
    stem:
      'The table shows a different firm. It is the only seller of its product, so to sell more units it must ' +
      'lower its price. What is the marginal revenue product of the third worker?',
    stimulus: PRICE_MAKER_TABLE,
    choices: [
      { id: 'A', text: '$60' },
      { id: 'B', text: '$96' },
      { id: 'C', text: '$108' },
      { id: 'D', text: '$128' },
      { id: 'E', text: '$384' },
    ],
    correctChoiceId: 'A',
    explanation:
      'Marginal revenue product is the change in total revenue when one more worker is hired. With two workers ' +
      'the firm sells 18 units at $18, a revenue of $324. With three it sells 24 units at $16, a revenue of $384. ' +
      'The third worker therefore adds $384 − $324 = $60. The six extra units bring in 6 × $16 = $96, but the 18 ' +
      'units the firm was already selling now go for $2 less each, which costs it $36. For a firm with market ' +
      'power MRP = MP × MR, and marginal revenue is below the price, so its marginal revenue product falls faster ' +
      'than that of a price taker.',
    distractorNotes: {
      B: '6 × $16 values the extra units at the new price but ignores the price cut on the 18 units sold before: 18 × $2 = $36 of lost revenue. MRP = MP × P holds only when the price does not change.',
      C: '6 × $18 values the extra output at the old price, which the firm can no longer charge once it sells 24 units.',
      D: '$128 is the revenue from three workers divided by three — what the average worker brings in, not what the third one adds.',
      E: '$384 is the total revenue with three workers, not the change in revenue that the third one causes.',
    },
  },

  // ── 5.2 Changes in Factor Demand and Factor Supply ───────────────────────
  {
    id: 'micro-u5-05',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-changes',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 110,
    stem:
      'Return to the strawberry farm. The market wage for pickers is $60 a day, and the price of a box rises ' +
      'from $4 to $5. How many pickers does the farm hire after the price rise, and what has happened to its ' +
      'demand for labor?',
    stimulus: FARM_TABLE,
    choices: [
      {
        id: 'A',
        text: '3 pickers; at the higher price it needs fewer boxes, and so fewer pickers, to earn the same revenue',
      },
      {
        id: 'B',
        text: '4 pickers; its demand for labor has not changed, because the wage has not changed',
      },
      {
        id: 'C',
        text: '5 pickers; it has moved down along an unchanged demand curve for labor',
      },
      { id: 'D', text: '5 pickers; its demand curve for labor has shifted to the right' },
      { id: 'E', text: '6 pickers; its demand curve for labor has shifted to the right' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Each picker’s marginal revenue product is the boxes they add times the price of a box. At $5 the marginal ' +
      'revenue products are $150, $130, $110, $90, $70 and $50. The fifth picker now adds $70 against a wage of ' +
      '$60, so the farm hires five — one more than at $4, when the fifth picker added only $56. Because the ' +
      'marginal revenue product curve is the farm’s demand curve for labor, a higher product price raises it at ' +
      'every number of workers: the whole curve shifts right. A change in the market for strawberries shows up ' +
      'in the market for pickers, which is derived demand at work.',
    distractorNotes: {
      A: 'The farm is not aiming at a fixed revenue. It hires every picker who adds more to revenue than to cost, and a higher price makes every picker worth more, so it hires more of them, not fewer.',
      B: 'The wage has not changed, but marginal revenue product has: the same boxes are now worth $5 each. A change in the product price shifts the demand for labor even when the wage stays put.',
      C: 'A movement along the demand curve for labor comes from a change in the wage. Here the wage is the same, and the curve itself has moved.',
      E: 'The sixth picker’s marginal revenue product rises only to 10 × $5 = $50, still below the $60 wage.',
    },
  },
  {
    id: 'micro-u5-06',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-changes',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 75,
    stem: 'Which of the following would increase the demand for workers at a car factory?',
    choices: [
      {
        id: 'A',
        text: 'A fall in the price of robots that can do the same jobs as the workers',
      },
      { id: 'B', text: 'A fall in the price of the machines the workers operate' },
      { id: 'C', text: 'A rise in the wage of car factory workers' },
      { id: 'D', text: 'A fall in consumer demand for cars' },
      {
        id: 'E',
        text: 'An increase in the number of people trained to work in car factories',
      },
    ],
    correctChoiceId: 'B',
    explanation:
      'Workers and the machines they operate are complements: they are used together. When those machines get ' +
      'cheaper, the factory uses more of them, each worker has more equipment to work with and produces more, ' +
      'and the workers’ marginal revenue product rises — the demand for labor shifts right. Robots that do the ' +
      'workers’ jobs are the opposite case. They are substitutes for labor, and when they get cheaper the ' +
      'factory uses them in place of workers.',
    distractorNotes: {
      A: 'Robots that do the same jobs are substitutes for workers. A fall in their price leads the factory to replace workers with robots, which reduces the demand for workers.',
      C: 'A change in the wage is a movement along the factory’s demand curve for workers, not a shift of it — and a higher wage means fewer workers hired, not more.',
      D: 'The demand for labor is derived from the demand for the product. Fewer car sales lower the revenue each worker brings in, so the demand for workers falls.',
      E: 'More trained people increase the supply of labor. That lowers the wage and raises the number hired, but along an unchanged demand curve.',
    },
  },
  {
    id: 'micro-u5-07',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-changes',
    skill: 'graphing',
    difficulty: 2,
    targetSeconds: 80,
    stem:
      'The diagram shows the labor market for electricians. The supply of electricians moves from S1 to S2. ' +
      'Which of the following could have caused this shift?',
    stimulus: ELECTRICIANS_DIAGRAM,
    choices: [
      {
        id: 'A',
        text: 'A rise in house building, which increases the need for electrical wiring',
      },
      { id: 'B', text: 'An increase in the wage paid to electricians' },
      {
        id: 'C',
        text: 'New tools that let each electrician wire more homes in a week',
      },
      {
        id: 'D',
        text: 'A new law requiring electricians to pass a longer and more expensive licensing exam',
      },
      { id: 'E', text: 'The arrival of qualified electricians from abroad' },
    ],
    correctChoiceId: 'D',
    explanation:
      'S2 lies to the left of S1: at every wage, fewer electricians are willing and able to work. A tougher ' +
      'licensing exam does exactly that — it raises the cost of entering the trade and keeps some people out of ' +
      'it. The wage rises from $40 to $50 and employment falls from 60 to 40 electricians, a movement up along ' +
      'the unchanged demand curve.',
    distractorNotes: {
      A: 'More house building raises the demand for electricians. It would shift D to the right and leave supply where it is.',
      B: 'A change in the wage is a movement along the supply curve, not a shift of it. In the diagram the wage rises because supply shifted, not the other way round.',
      C: 'More output per electrician raises their marginal revenue product, which shifts demand to the right. Supply is not affected.',
      E: 'More qualified electricians would shift supply to the right — the opposite of the move from S1 to S2.',
    },
  },
  {
    id: 'micro-u5-08',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-changes',
    skill: 'analysis',
    difficulty: 2,
    targetSeconds: 85,
    stem:
      'Strawberry pickers are hired in a perfectly competitive labor market. Many new workers enter this market, ' +
      'and the market wage falls. What happens at an individual farm?',
    choices: [
      {
        id: 'A',
        text: 'Its marginal revenue product curve shifts to the right, so it hires more pickers.',
      },
      {
        id: 'B',
        text: 'Its marginal factor cost falls to the new wage, and it hires more pickers, moving down along its marginal revenue product curve.',
      },
      {
        id: 'C',
        text: 'Nothing changes, because a single farm is too small to affect the wage.',
      },
      {
        id: 'D',
        text: 'It hires fewer pickers, because a lower wage makes fewer people willing to work.',
      },
      {
        id: 'E',
        text: 'Its marginal factor cost now rises with every picker it hires, because it must compete with other farms for workers.',
      },
    ],
    correctChoiceId: 'B',
    explanation:
      'The wage is set in the market for pickers as a whole, where the new workers shift supply to the right and ' +
      'push the wage down. Each farm is a wage taker: it can hire as many pickers as it wants at the market wage, ' +
      'so its marginal factor cost is simply that wage, a horizontal line. When the wage falls, the line drops, ' +
      'and the farm keeps hiring until the marginal revenue product of the last picker is down to the new, lower ' +
      'wage. Its marginal revenue product curve has not moved; the farm has moved along it.',
    distractorNotes: {
      A: 'The pickers are no more productive and strawberries are no more valuable, so marginal revenue product is unchanged. The farm hires more because each picker now costs less.',
      C: 'Too small to affect the wage, yes — but not too small to be affected by it. The farm takes the new wage as given and hires more at it.',
      D: 'That describes a movement along the market supply curve. Here the wage fell because supply increased — more people want to work, not fewer — and for the farm a lower wage simply means each picker costs less.',
      E: 'A marginal factor cost that rises with every worker belongs to a monopsony, the only employer in its market. A wage taker pays the same market wage to every worker, however many it hires.',
    },
  },

  // ── 5.3 Profit-Maximizing Behavior in Perfectly Competitive Factor Markets ─
  {
    id: 'micro-u5-09',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-profit-max',
    skill: 'calculation',
    difficulty: 2,
    targetSeconds: 95,
    stem:
      'The farm in the table hires pickers in a perfectly competitive labor market at a wage of $80 a day, and a ' +
      'box still sells for $4. It already employs three pickers. What is its marginal factor cost of a fourth ' +
      'picker, and should it hire one?',
    stimulus: FARM_TABLE,
    choices: [
      {
        id: 'A',
        text: 'More than $80, because hiring a fourth picker means paying every picker more; it should not hire one.',
      },
      {
        id: 'B',
        text: '$80; it should hire the fourth picker, because that picker still adds 18 boxes to output.',
      },
      {
        id: 'C',
        text: '$80; it should hire the fourth picker, because with four pickers total revenue of $384 is still above the wage bill of $320.',
      },
      {
        id: 'D',
        text: '$320, the wage bill for four pickers; it should not hire the fourth picker, because that is more than the fourth picker brings in.',
      },
      {
        id: 'E',
        text: '$80; it should not hire the fourth picker, because that picker adds $72 to revenue and $80 to cost.',
      },
    ],
    correctChoiceId: 'E',
    explanation:
      'In a perfectly competitive labor market the farm pays the market wage to every picker it hires, so one ' +
      'more picker raises its costs by exactly that wage: the marginal factor cost is $80. The fourth picker ' +
      'adds 18 boxes, worth 18 × $4 = $72. Hiring that picker would add $80 to cost and $72 to revenue, so profit ' +
      'would fall by $8. The rule is to hire up to the point where marginal revenue product equals marginal ' +
      'factor cost, and here that means three pickers, the last of whom adds $88.',
    distractorNotes: {
      A: 'Rising marginal factor cost belongs to a monopsony. In a competitive labor market the farm can hire a fourth picker at $80 without raising anyone else’s pay.',
      B: 'Adding output is not enough: the 18 boxes are worth $72, and the picker costs $80.',
      C: 'Comparing totals shows that four pickers are better than none, not that the fourth is worth hiring. Total revenue minus the wage bill is $72 with three pickers and only $64 with four.',
      D: '$320 is what four pickers cost in total. The marginal factor cost is what one more picker adds to cost — the wage of $80.',
    },
  },
  {
    id: 'micro-u5-10',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-profit-max',
    skill: 'calculation',
    difficulty: 2,
    targetSeconds: 90,
    stem:
      'A bakery uses labor and ovens. The wage is $20 an hour, and renting an oven costs $50 an hour. At its ' +
      'current mix of inputs, the last hour of labor adds 40 loaves and the last oven-hour adds 80 loaves. To ' +
      'produce the same output at the lowest possible cost, the bakery should',
    choices: [
      { id: 'A', text: 'use more labor and fewer oven-hours.' },
      {
        id: 'B',
        text: 'use more oven-hours and less labor, because an oven-hour adds twice as many loaves as an hour of labor.',
      },
      {
        id: 'C',
        text: 'keep its current mix, because it is already producing at the lowest cost.',
      },
      { id: 'D', text: 'use more of both inputs, because both add to output.' },
      { id: 'E', text: 'make no change until it knows the price of a loaf.' },
    ],
    correctChoiceId: 'A',
    explanation:
      'The least-cost rule compares what each input adds per dollar spent on it. An hour of labor adds 40 loaves ' +
      'for $20, which is 2 loaves per dollar. An oven-hour adds 80 loaves for $50, which is 1.6 loaves per ' +
      'dollar. A dollar moved from ovens to labor therefore buys more bread than it gives up, so the same output ' +
      'can be made more cheaply with more labor and fewer oven-hours. As the bakery shifts, labor’s marginal ' +
      'product falls and that of ovens rises, until the last dollar spent on each input adds the same output.',
    distractorNotes: {
      B: 'An oven-hour does add twice as much, but it costs two and a half times as much. Per dollar, labor gives more bread: 2 loaves against 1.6.',
      C: 'Cost is at its lowest only when the last dollar spent on each input adds the same output. Here a dollar of labor adds 2 loaves and a dollar of oven time 1.6.',
      D: 'The question fixes output. Using more of both inputs would raise output and cost together; the least-cost rule is about the mix of inputs, not the scale of production.',
      E: 'The price of a loaf matters for how much to produce, not for the cheapest way to produce a given amount. The least-cost rule needs only marginal products and input prices.',
    },
  },
  {
    id: 'micro-u5-11',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-profit-max',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 110,
    stem:
      'A firm sells its output and hires both its inputs in perfectly competitive markets. For the last unit of ' +
      'each input it uses, the marginal revenue product of labor is $30 at a wage of $20, and the marginal ' +
      'revenue product of capital is $90 at a rental price of $60. Which of the following is true?',
    choices: [
      {
        id: 'A',
        text: 'It is maximizing profit, because each input brings in $1.50 for every dollar spent on it.',
      },
      {
        id: 'B',
        text: 'It should use more capital and less labor, because capital brings in $30 more than its price and labor only $10 more.',
      },
      {
        id: 'C',
        text: 'It is producing its current output at the lowest cost, but it should use more labor and more capital.',
      },
      {
        id: 'D',
        text: 'It should use less labor and less capital, because each input’s marginal revenue product is above its price.',
      },
      {
        id: 'E',
        text: 'It should use more labor and less capital, because labor is the cheaper input.',
      },
    ],
    correctChoiceId: 'C',
    explanation:
      'Two different rules are at work. The least-cost rule asks whether each input brings in the same amount ' +
      'per dollar spent on it: $30/$20 = 1.5 for labor and $90/$60 = 1.5 for capital. They match, so the firm’s ' +
      'current output is being made as cheaply as possible. The profit-maximizing rule asks for more: each input ' +
      'should be used until its marginal revenue product equals its price, so that both ratios equal 1. At 1.5, ' +
      'every extra dollar spent on either input still brings back $1.50, so the firm should use more of both. ' +
      'Producing at the lowest cost is necessary for maximum profit but not sufficient: a firm can make the ' +
      'wrong amount of output at the lowest possible cost.',
    distractorNotes: {
      A: 'Equal ratios mean the inputs are in the right proportion to each other — that is the least-cost rule. Profit is at its maximum only when both ratios equal 1; at 1.5 an extra dollar on either input still returns $1.50.',
      B: 'Both inputs bring in more than they cost, so both should expand; a bigger gap on one does not mean the other should be cut. Cutting labor would also break the equal-ratio condition that already holds.',
      D: 'This runs the wrong way. An input whose marginal revenue product is above its price adds more to revenue than to cost, so the firm should use more of it, not less.',
      E: 'An input’s price on its own says nothing about whether to use more of it. What matters is what it brings in per dollar, and here that is $1.50 for both inputs.',
    },
  },

  // ── 5.4 Monopsonistic Markets ────────────────────────────────────────────
  {
    id: 'micro-u5-12',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-monopsony',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 75,
    stem:
      'A monopsonist is the only employer in its labor market and pays the same wage to all its workers. Why ' +
      'does its marginal factor cost curve lie above the labor supply curve?',
    choices: [
      { id: 'A', text: 'Each additional worker is less productive than the one before.' },
      {
        id: 'B',
        text: 'It must pay each worker more than the value of what that worker produces.',
      },
      { id: 'C', text: 'The supply of labor to a monopsonist is perfectly elastic.' },
      {
        id: 'D',
        text: 'To hire one more worker it must raise the wage, and the higher wage goes to every worker it already employs.',
      },
      { id: 'E', text: 'It is required by law to pay more than the market wage.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'As the only employer, the monopsonist faces the whole upward-sloping supply curve of labor: to attract ' +
      'more workers it has to offer a higher wage. Because everyone is paid the same, the higher wage goes not ' +
      'only to the new worker but to all the workers it already has. The extra cost of one more worker is ' +
      'therefore that worker’s wage plus the raise for everyone else, which is more than the wage. That is why ' +
      'marginal factor cost lies above supply at every number of workers after the first.',
    distractorNotes: {
      A: 'Falling productivity is about revenue: it explains why the marginal revenue product curve slopes down. Marginal factor cost is about what the next worker costs.',
      B: 'It is the reverse. A monopsonist pays a wage below the marginal revenue product of the last worker it hires.',
      C: 'Perfectly elastic supply is the wage-taker case, and there marginal factor cost equals the wage. A monopsonist faces an upward-sloping supply curve, and that is what pushes marginal factor cost above it.',
      E: 'No law is involved. The gap comes from being the only buyer of labor: the firm has to raise everyone’s wage to hire one more worker.',
    },
  },
  {
    id: 'micro-u5-13',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-monopsony',
    skill: 'graphing',
    difficulty: 2,
    targetSeconds: 85,
    stem:
      'The diagram shows a labor market with a single employer, a monopsonist. How many workers does it hire, ' +
      'and what wage does it pay?',
    stimulus: MONOPSONY_DIAGRAM,
    choices: [
      { id: 'A', text: '30 workers at a wage of $40' },
      { id: 'B', text: '30 workers at a wage of $60' },
      { id: 'C', text: '30 workers at a wage of $70' },
      { id: 'D', text: '50 workers at a wage of $40' },
      { id: 'E', text: '50 workers at a wage of $60' },
    ],
    correctChoiceId: 'A',
    explanation:
      'A monopsonist hires up to the point where the marginal revenue product of the last worker equals the ' +
      'marginal factor cost: 30 workers, where the two curves cross at $70. But it does not pay $70. It pays the ' +
      'lowest wage that attracts 30 workers, and that is read off the supply curve: $40. Choosing the number of ' +
      'workers where MRP = MFC and the wage on the supply curve mirrors the monopolist, which chooses output ' +
      'where MR = MC and the price on the demand curve.',
    distractorNotes: {
      B: '$60 is the competitive wage, where supply meets marginal revenue product. The monopsonist has no reason to pay it: 30 workers are willing to work for $40.',
      C: '$70 is where marginal factor cost meets marginal revenue product — what the 30th worker costs the firm once everyone’s raise is counted. The wage itself comes from the supply curve, at $40.',
      D: 'At $40 only 30 people are willing to work. A wage and a number of workers have to lie on the supply curve together.',
      E: 'That is where supply meets marginal revenue product — the outcome of a perfectly competitive labor market. The monopsonist stops earlier, because each extra worker costs it more than the wage.',
    },
  },
  {
    id: 'micro-u5-14',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-monopsony',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 95,
    stem:
      'From society’s point of view, what is wrong with the number of workers the monopsonist in the diagram ' +
      'hires?',
    stimulus: MONOPSONY_DIAGRAM,
    choices: [
      {
        id: 'A',
        text: 'Nothing: the firm is maximizing profit, so the outcome is efficient.',
      },
      {
        id: 'B',
        text: 'It is too high: workers are paid more than the value of what they produce.',
      },
      {
        id: 'C',
        text: 'It is too high: the firm makes a loss on the last worker it hires.',
      },
      {
        id: 'D',
        text: 'It is too low, and the firm could raise its profit by hiring more workers.',
      },
      {
        id: 'E',
        text: 'It is too low: some workers who would add more to the value of output than the wage needed to attract them are not hired.',
      },
    ],
    correctChoiceId: 'E',
    explanation:
      'The supply curve shows the wage needed to attract each additional worker, and the marginal revenue ' +
      'product curve shows what that worker would add to the value of output. At 30 workers the next one would ' +
      'add about $70 and would work for about $40, so hiring that worker would make society better off. The ' +
      'monopsonist still does not, because to hire one more it would have to raise the wage of all 30, so the ' +
      'worker would cost it more than $70 rather than about $40. Employment stops short of the 50 workers at ' +
      'which supply meets marginal revenue product, and the gains from those 20 missing jobs are a deadweight ' +
      'loss.',
    distractorNotes: {
      A: 'Maximizing profit and being efficient are different tests. The firm does maximize its profit, but it does so by leaving unhired workers whose output would be worth more than they need to be paid.',
      B: 'It is the other way round: the wage, $40, is below the $70 that the last worker hired adds to revenue.',
      C: 'On the last worker hired, marginal revenue product equals marginal factor cost, so the firm neither gains nor loses on that worker. It earns its profit on the workers before.',
      D: 'Too low, yes — but not from the firm’s point of view. A 31st worker would add about $72 to its costs once everyone’s raise is counted, and less than $70 to its revenue.',
    },
  },
  {
    id: 'micro-u5-15',
    subject: 'micro',
    unitId: 'micro-5',
    topicId: 'micro-5-monopsony',
    skill: 'graphing',
    difficulty: 3,
    targetSeconds: 110,
    stem:
      'The government sets a minimum wage of $50 in the same labor market. How many workers does the ' +
      'monopsonist hire now?',
    stimulus: MINIMUM_WAGE_DIAGRAM,
    choices: [
      {
        id: 'A',
        text: 'Fewer than before, because a minimum wage above the current wage always reduces employment',
      },
      {
        id: 'B',
        text: 'The same number as before, because the minimum wage changes the wage but not the number hired',
      },
      {
        id: 'C',
        text: '40 workers, because it can now hire everyone willing to work for $50 at a cost of $50 each',
      },
      {
        id: 'D',
        text: '50 workers, the number a perfectly competitive labor market would employ',
      },
      {
        id: 'E',
        text: '70 workers, because that many workers have a marginal revenue product of at least $50',
      },
    ],
    correctChoiceId: 'C',
    explanation:
      'A minimum wage changes the monopsonist’s marginal factor cost. At $50 the firm can hire anyone willing to ' +
      'work for $50 without raising anyone else’s pay, so up to the supply curve each extra worker costs exactly ' +
      '$50. The supply curve reaches $50 at 40 workers, and every one of those 40 adds more than $50 to revenue ' +
      '— the 40th adds $65 — so the firm hires all of them. To go beyond 40 it would have to pay more than $50 to ' +
      'everyone, and its marginal factor cost jumps back above marginal revenue product. Employment rises from ' +
      '30 to 40 and the wage from $40 to $50. In a competitive labor market a minimum wage above equilibrium ' +
      'reduces employment; in a monopsony, a minimum wage between the monopsony wage and the competitive wage ' +
      'raises it.',
    distractorNotes: {
      A: 'That is the result in a competitive labor market. Here the minimum wage removes the reason the firm was holding employment down: it no longer has to raise everyone’s pay to hire one more worker.',
      B: 'The firm stopped at 30 only because each extra worker raised everyone’s wage. At a flat $50 that extra cost disappears, and workers 31 to 40 each add more than $50.',
      D: 'Reaching 50 workers takes a wage of $60, the competitive wage. At $50 only 40 people are willing to work.',
      E: 'At $50 the firm would like to hire 70 workers, but only 40 are willing to work for that wage. It cannot hire people who do not offer themselves.',
    },
  },
];

export const microUnit5TopicTitles: Record<string, string> = {
  'micro-5-intro': '5.1 Introduction to Factor Markets',
  'micro-5-changes': '5.2 Changes in Factor Demand and Factor Supply',
  'micro-5-profit-max': '5.3 Profit-Maximizing Behavior in Perfectly Competitive Factor Markets',
  'micro-5-monopsony': '5.4 Monopsonistic Markets',
};
