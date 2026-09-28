/**
 * data/questions-micro-unit3.ts
 *
 * AP® Microeconomics · Unit 3 «Production, Cost, and the Perfect Competition
 * Model» — 20 MCQ.
 *
 * ПРОИСХОЖДЕНИЕ. Все вопросы написаны с нуля. Материалы College Board
 * (Test Booklets, AP Classroom) НЕ использовались и использоваться не могут:
 * их условия запрещают распространение и прогон через генеративные системы.
 * Использована только официальная сетка тем CED (3.1–3.7) — она публична.
 *
 * ПОЧЕМУ 20. Юнит весит 22–25% экзамена — это самый тяжёлый юнит курса, и тем
 * в нём семь. Двадцать вопросов дают минимум по два на тему, а на счётные
 * темы (издержки, максимизация прибыли) — по три-четыре. Меньше нельзя:
 * механизм «что тебе стоит баллов» считает priority = (1 − доля верных) × вес
 * темы, и при одном вопросе доля бывает только 0% или 100%.
 *
 * ПОКРЫТИЕ ТЕМ:
 *   3.1 The Production Function .................... 2
 *   3.2 Short-Run Production Costs ................. 4
 *   3.3 Long-Run Production Costs .................. 2
 *   3.4 Types of Profit ............................ 2
 *   3.5 Profit Maximization ........................ 3
 *   3.6 Short-Run and Long-Run Decisions ........... 3
 *   3.7 Perfect Competition ........................ 4
 *
 * ОДНА ФИРМА НА ВСЕ ТАБЛИЦЫ И ОДНА НА ВСЕ СХЕМЫ. Шесть вопросов считают по
 * одной и той же таблице издержек, три читают одну и ту же схему с разной
 * ценой. Ученик разбирается в условии один раз, а дальше отвечает на вопрос,
 * а не заново читает данные. Числа подобраны так, чтобы всё сходилось точно:
 * минимум AVC и минимум ATC попадают в целые значения, а MC пересекает обе
 * кривые ровно в их минимумах.
 *
 * УРОВЕНЬ. Как в Unit 1 и Unit 2, набор смещён в верхнюю часть сложности.
 * Ключи распределены по 4 на каждую букву A–E.
 */

import type { Question } from '@/types';

/* ── Общая таблица издержек ────────────────────────────────────────────────
 * TFC = 60 при любом выпуске. Проверено счётом:
 *   Q      1    2    3    4    5    6
 *   TC     90  110  126  144  175  228
 *   TVC    30   50   66   84  115  168
 *   AVC    30   25   22   21   23   28   ← минимум 21 при Q = 4
 *   ATC    90   55   42   36   35   38   ← минимум 35 при Q = 5
 *   MC     30   20   16   18   31   53
 * MC ниже AVC, пока AVC падает, и выше — когда растёт; то же с ATC. */
const COST_TABLE = {
  kind: 'table' as const,
  caption: 'Total cost of production (total fixed cost is $60 at every output)',
  headers: ['Output (units)', 'Total cost ($)'],
  rows: [
    ['1', '90'],
    ['2', '110'],
    ['3', '126'],
    ['4', '144'],
    ['5', '175'],
    ['6', '228'],
  ],
};

/* ── Общая схема кривых издержек ───────────────────────────────────────────
 * Непрерывная фирма, подобранная так, что ключевые точки — круглые:
 *   AVC минимальна и равна 20 при q = 30;
 *   ATC минимальна и равна 30 при q = 50;
 *   MC проходит ровно через оба минимума и равна 50 при q = 70.
 * Постоянные издержки (≈417) на схеме не показываются — они нужны только
 * для того, чтобы ATC получилась такой, как описано. */
const A = 1 / 240;
const FIXED = 100000 * A;
const avc = (q: number) => 20 + A * (q - 30) ** 2;
const atc = (q: number) => avc(q) + FIXED / q;
const mc = (q: number) => 20 + ((q - 30) * (q - 10)) / 80;

/** Точки кривой через каждые две единицы выпуска: излома не видно. */
function plot(f: (q: number) => number, from: number, to: number) {
  const out: { x: number; y: number }[] = [];
  for (let x = from; x <= to; x += 2) out.push({ x, y: Math.round(f(x) * 100) / 100 });
  return out;
}

/* Подписи разведены по вертикали руками: ATC уходит под свою кривую, AVC —
 * ещё ниже. Иначе «ATC» прижимается к подписи ценовой линии у правого края,
 * и правый угол схемы читается как каша. */
const FIRM_CURVES = [
  { id: 'mc', label: 'MC', points: plot(mc, 12, 88) },
  { id: 'atc', label: 'ATC', points: plot(atc, 12, 96), labelDy: 14 },
  { id: 'avc', label: 'AVC', points: plot(avc, 12, 88), labelDy: 15 },
];

const FIRM_AXIS_VALUES = [
  { axis: 'y' as const, at: 20, text: '20' },
  { axis: 'y' as const, at: 30, text: '30' },
  { axis: 'y' as const, at: 50, text: '50' },
  { axis: 'x' as const, at: 30, text: '30' },
  { axis: 'x' as const, at: 50, text: '50' },
  { axis: 'x' as const, at: 70, text: '70' },
];

const FIRM_DESC =
  'Three cost curves for one firm. Average variable cost is U-shaped and reaches its lowest value of 20 dollars at ' +
  '30 units. Average total cost is U-shaped and reaches its lowest value of 30 dollars at 50 units. Marginal cost ' +
  'rises steeply and passes through the lowest point of average variable cost at 30 units and through the lowest ' +
  'point of average total cost at 50 units; it equals 50 dollars at 70 units.';

function firmDiagram(price: number, label: string) {
  return {
    kind: 'diagram' as const,
    component: 'CostCurves' as const,
    props: {
      curves: FIRM_CURVES,
      priceLines: [{ at: price, label }],
      axisValues: FIRM_AXIS_VALUES,
      description: `${FIRM_DESC} A horizontal line marks the market price of ${price} dollars.`,
    },
  };
}

export const microUnit3Questions: Question[] = [
  // ── 3.1 The Production Function ──────────────────────────────────────────
  {
    id: 'micro-u3-01',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-production',
    skill: 'analysis',
    difficulty: 2,
    targetSeconds: 80,
    stem:
      'A bakery has one oven and adds workers one at a time. Total output per day is shown below. With which worker ' +
      'does the bakery first experience diminishing marginal returns?',
    stimulus: {
      kind: 'table',
      caption: 'Workers and total output per day',
      headers: ['Workers', 'Total output (loaves)'],
      rows: [
        ['1', '12'],
        ['2', '26'],
        ['3', '36'],
        ['4', '42'],
        ['5', '44'],
      ],
    },
    choices: [
      { id: 'A', text: 'The first worker' },
      { id: 'B', text: 'The second worker' },
      { id: 'C', text: 'The third worker' },
      { id: 'D', text: 'The fourth worker' },
      { id: 'E', text: 'The fifth worker, because that is where total output stops rising much' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Work out the marginal product of each worker: 12, 14, 10, 6, 2. Diminishing marginal returns begin with the ' +
      'first worker whose marginal product is smaller than the previous one — the third worker, whose 10 loaves are ' +
      'less than the second worker’s 14. Note that total output is still rising; it is the addition to output ' +
      'that has started to shrink.',
    distractorNotes: {
      A: 'The first worker has nothing to be compared with, so diminishing returns cannot start here.',
      B: 'The second worker raises output by 14 against the first worker’s 12 — marginal product is still rising.',
      D: 'The fourth worker adds 6 instead of 10, so marginal product is falling — but it had already started to fall one worker earlier.',
      E: 'Diminishing marginal returns are about the addition to output shrinking, not about total output stopping. Total output is still rising here.',
    },
  },
  {
    id: 'micro-u3-02',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-production',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 75,
    stem:
      'A firm hires workers at a fixed wage and has already entered the range of diminishing marginal returns. ' +
      'As it hires one more worker, what happens to the marginal cost of its output?',
    choices: [
      { id: 'A', text: 'Marginal cost rises, because each extra worker adds less output than the one before.' },
      { id: 'B', text: 'Marginal cost falls, because the fixed cost is spread over more output.' },
      { id: 'C', text: 'Marginal cost is unchanged, because the wage is the same for every worker.' },
      { id: 'D', text: 'Marginal cost falls, because total output is still rising.' },
      { id: 'E', text: 'Marginal cost rises only if the firm also has to pay a higher wage.' },
    ],
    correctChoiceId: 'A',
    explanation:
      'With labour the only variable input, the marginal cost of an extra unit of output is the wage divided by the ' +
      'marginal product of labour. The wage does not change, so when marginal product falls, marginal cost rises. ' +
      'Diminishing marginal returns are exactly why the marginal cost curve slopes upward.',
    distractorNotes: {
      B: 'Spreading fixed cost over more output lowers average fixed cost and average total cost, not marginal cost. Marginal cost contains no fixed cost at all.',
      C: 'The wage per worker is the same, but each worker now produces fewer extra units, so the cost per extra unit rises.',
      D: 'Total output rising says nothing about cost per extra unit. What matters is how much output the extra worker adds.',
      E: 'A rising wage would raise marginal cost too, but it is not needed: falling marginal product alone does it.',
    },
  },

  // ── 3.2 Short-Run Production Costs ───────────────────────────────────────
  {
    id: 'micro-u3-03',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-short-run-costs',
    skill: 'calculation',
    difficulty: 2,
    targetSeconds: 70,
    stem: 'Using the table, what is the marginal cost of the fifth unit?',
    stimulus: COST_TABLE,
    choices: [
      { id: 'A', text: '$23' },
      { id: 'B', text: '$31' },
      { id: 'C', text: '$35' },
      { id: 'D', text: '$53' },
      { id: 'E', text: '$115' },
    ],
    correctChoiceId: 'B',
    explanation:
      'Marginal cost is the change in total cost from one more unit: 175 − 144 = $31. Fixed cost cancels out in the ' +
      'subtraction, which is why marginal cost can be read straight from total cost.',
    distractorNotes: {
      A: '$23 is average variable cost at five units: (175 − 60) ÷ 5. That is the average cost of every variable unit, not the cost of the fifth one.',
      C: '$35 is average total cost at five units: 175 ÷ 5.',
      D: '$53 is the marginal cost of the sixth unit: 228 − 175.',
      E: '$115 is total variable cost at five units: 175 − 60.',
    },
  },
  {
    id: 'micro-u3-04',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-short-run-costs',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 95,
    stem: 'Using the table, at which output is average variable cost at its lowest?',
    stimulus: COST_TABLE,
    choices: [
      { id: 'A', text: '2 units' },
      { id: 'B', text: '3 units' },
      { id: 'C', text: '4 units' },
      { id: 'D', text: '5 units' },
      { id: 'E', text: '6 units' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Subtract the $60 of fixed cost from total cost to get total variable cost — 30, 50, 66, 84, 115, 168 — then ' +
      'divide by output: 30, 25, 22, 21, 23, 28. The lowest average variable cost is $21 at four units.',
    distractorNotes: {
      A: 'At two units average variable cost is $25 and still falling.',
      B: 'At three units it is $22 — close, but it falls once more before it turns.',
      D: 'At five units average variable cost is back up to $23. Five units is where average *total* cost is lowest, at $35.',
      E: 'At six units average variable cost is $28 and rising fast.',
    },
  },
  {
    id: 'micro-u3-05',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-short-run-costs',
    skill: 'calculation',
    difficulty: 2,
    targetSeconds: 70,
    stem: 'Using the table, what is average fixed cost when the firm produces four units?',
    stimulus: COST_TABLE,
    choices: [
      { id: 'A', text: '$15' },
      { id: 'B', text: '$21' },
      { id: 'C', text: '$36' },
      { id: 'D', text: '$60' },
      { id: 'E', text: 'It cannot be found without knowing the price of the product.' },
    ],
    correctChoiceId: 'A',
    explanation:
      'Fixed cost is $60 at every output, so average fixed cost at four units is 60 ÷ 4 = $15. The same answer comes ' +
      'out of the table the long way: average total cost is 144 ÷ 4 = $36, average variable cost is (144 − 60) ÷ 4 = ' +
      '$21, and $36 − $21 = $15.',
    distractorNotes: {
      B: '$21 is average variable cost at four units.',
      C: '$36 is average total cost at four units — the two averages added together.',
      D: '$60 is total fixed cost, not fixed cost per unit.',
      E: 'Costs do not depend on the selling price. The price matters for profit, not for cost.',
    },
  },
  {
    id: 'micro-u3-06',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-short-run-costs',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 75,
    stem:
      'As a firm increases output in the short run, what happens to the vertical distance between its average total ' +
      'cost curve and its average variable cost curve?',
    choices: [
      { id: 'A', text: 'It stays the same, because fixed cost does not change.' },
      { id: 'B', text: 'It widens, because total fixed cost is spread over more units.' },
      { id: 'C', text: 'It narrows and keeps narrowing, but the two curves never meet.' },
      { id: 'D', text: 'It narrows until the two curves meet at the minimum of average total cost.' },
      { id: 'E', text: 'It first narrows and then widens, like the curves themselves.' },
    ],
    correctChoiceId: 'C',
    explanation:
      'The gap between the two curves is average fixed cost: ATC = AVC + AFC. Total fixed cost is unchanged, so ' +
      'dividing it by a larger and larger output makes average fixed cost smaller and smaller. It gets closer and ' +
      'closer to zero without ever reaching it, so the curves converge but never touch.',
    distractorNotes: {
      A: 'Total fixed cost does not change, but fixed cost *per unit* falls as output rises — and it is the per-unit figure that sets the gap.',
      B: 'Spreading a fixed amount over more units makes the per-unit amount smaller, not larger.',
      D: 'The curves converge, but average fixed cost is never exactly zero, so they never meet — at any output, not just at the minimum of ATC.',
      E: 'Average fixed cost falls at every output without exception. It is average variable and average total cost that turn upward.',
    },
  },

  // ── 3.3 Long-Run Production Costs ────────────────────────────────────────
  {
    id: 'micro-u3-07',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-long-run-costs',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 70,
    stem: 'A firm is enjoying economies of scale. Which statement describes its situation?',
    choices: [
      { id: 'A', text: 'Output is rising and marginal cost is falling, because marginal product is rising.' },
      { id: 'B', text: 'The firm has increased every input and long-run average total cost has fallen.' },
      { id: 'C', text: 'The firm has hired more workers for a fixed plant and average cost has fallen.' },
      { id: 'D', text: 'Average fixed cost is falling as the firm produces more with the plant it has.' },
      { id: 'E', text: 'The firm is producing at the minimum of its short-run average total cost curve.' },
    ],
    correctChoiceId: 'B',
    explanation:
      'Economies of scale are a long-run idea: every input, including plant size, can change. They exist when ' +
      'scaling the whole firm up leaves each unit cheaper to make, which is the downward-sloping part of the ' +
      'long-run average total cost curve.',
    distractorNotes: {
      A: 'Rising marginal product with a fixed plant is a short-run story — increasing marginal returns, not economies of scale.',
      C: 'A fixed plant means the short run by definition. In the long run there is no fixed input.',
      D: 'Falling average fixed cost is the short-run effect of spreading fixed cost. In the long run there is no fixed cost to spread.',
      E: 'Being at the bottom of a short-run curve says nothing about whether a larger plant would be cheaper per unit.',
    },
  },
  {
    id: 'micro-u3-08',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-long-run-costs',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 85,
    stem:
      'A firm doubles every input it uses and finds that its output exactly doubles and its input prices are ' +
      'unchanged. What does this tell you about its long-run average total cost over this range of output?',
    choices: [
      { id: 'A', text: 'It is falling, because the firm is now larger.' },
      { id: 'B', text: 'It is rising, because the firm has become harder to manage.' },
      { id: 'C', text: 'It is falling, because fixed cost is spread over twice the output.' },
      { id: 'D', text: 'It is constant, and the long-run average total cost curve is flat over this range.' },
      { id: 'E', text: 'Nothing can be said without knowing the market price.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Doubling every input at unchanged input prices doubles total cost. If output also doubles, total cost per ' +
      'unit is unchanged. That is constant returns to scale, and it shows up as the flat stretch of the long-run ' +
      'average total cost curve — the range of output at which the firm is at its most efficient scale.',
    distractorNotes: {
      A: 'Size alone does not lower unit cost. It falls only when output rises by *more* than inputs do.',
      B: 'Diseconomies of scale would mean output rose by less than double. Here it rose exactly in step.',
      C: 'In the long run there is no fixed cost: every input, plant included, has been doubled.',
      E: 'Cost per unit is worked out from inputs and output alone. Price determines profit, not cost.',
    },
  },

  // ── 3.4 Types of Profit ──────────────────────────────────────────────────
  {
    id: 'micro-u3-09',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-profit-types',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 100,
    stem:
      'To open her studio, a designer left a job paying $65,000 a year and put in $200,000 of her own savings, which ' +
      'had been earning $10,000 a year in interest. The studio takes in $200,000 a year and pays $120,000 a year for ' +
      'rent, materials and an assistant. What is her economic profit for the year?',
    choices: [
      { id: 'A', text: '−$5,000' },
      { id: 'B', text: '$5,000' },
      { id: 'C', text: '$15,000' },
      { id: 'D', text: '$70,000' },
      { id: 'E', text: '$80,000' },
    ],
    correctChoiceId: 'B',
    explanation:
      'Economic profit subtracts implicit costs as well as explicit ones. Explicit costs are $120,000; implicit ' +
      'costs are the $65,000 salary and the $10,000 of interest she gave up, or $75,000. So economic profit is ' +
      '200,000 − 120,000 − 75,000 = $5,000. Her accounting profit, which ignores the implicit costs, is $80,000.',
    distractorNotes: {
      A: 'The sign is wrong — revenue covers every cost, explicit and implicit, with $5,000 to spare.',
      C: '$15,000 comes from subtracting the forgone salary but forgetting the $10,000 of forgone interest.',
      D: '$70,000 comes from subtracting the forgone interest but forgetting the $65,000 salary.',
      E: '$80,000 is accounting profit: revenue minus explicit costs only. It ignores both implicit costs.',
    },
  },
  {
    id: 'micro-u3-10',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-profit-types',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 70,
    stem: 'A firm is earning zero economic profit. Which statement about the firm is correct?',
    choices: [
      { id: 'A', text: 'It is covering its explicit costs but not its implicit costs.' },
      { id: 'B', text: 'Its revenue exactly equals its explicit costs, so its accounting profit is zero too.' },
      { id: 'C', text: 'It is losing money and will shut down as soon as it can.' },
      { id: 'D', text: 'It is earning a normal profit: the owner is doing exactly as well as in the next best alternative.' },
      { id: 'E', text: 'It is earning less than a firm with zero accounting profit.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Zero economic profit means revenue covers every cost, explicit and implicit — including what the owner could ' +
      'have earned elsewhere. Economists call that normal profit. There is no reason to leave the industry, because ' +
      'no alternative pays better, and no reason for outsiders to rush in.',
    distractorNotes: {
      A: 'If implicit costs were not covered, economic profit would be negative, not zero.',
      B: 'Accounting profit is positive here: it equals the implicit costs the firm is covering.',
      C: 'Zero economic profit is not a loss. The owner is doing exactly as well as in the best alternative.',
      E: 'It is the other way round. Zero accounting profit means implicit costs are not covered at all, so economic profit is negative.',
    },
  },

  // ── 3.5 Profit Maximization ──────────────────────────────────────────────
  {
    id: 'micro-u3-11',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-profit-max',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 100,
    stem:
      'The firm in the table sells in a perfectly competitive market at a price of $38 per unit. How many units ' +
      'should it produce to maximise profit?',
    stimulus: COST_TABLE,
    choices: [
      { id: 'A', text: '3 units' },
      { id: 'B', text: '4 units' },
      { id: 'C', text: '5 units' },
      { id: 'D', text: '6 units' },
      { id: 'E', text: 'None — at this price the firm should shut down.' },
    ],
    correctChoiceId: 'C',
    explanation:
      'For a price taker, marginal revenue equals the price, $38. Marginal costs are 30, 20, 16, 18, 31, 53. Produce ' +
      'every unit whose marginal cost is below $38 and stop before the first one that is above it: the fifth unit ' +
      'costs $31 and is worth making, the sixth costs $53 and is not. So the firm produces five units.',
    distractorNotes: {
      A: 'Stopping at three leaves two profitable units unmade: the fourth costs $18 and the fifth $31, both below the $38 price.',
      B: 'The fifth unit adds $38 of revenue and only $31 of cost, so stopping at four gives up $7 of profit.',
      D: 'The sixth unit costs $53 to make and brings in $38 — it would cut profit by $15.',
      E: 'Shutting down would mean losing the whole $60 of fixed cost. At $38 the firm actually makes a profit.',
    },
  },
  {
    id: 'micro-u3-12',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-profit-max',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 90,
    stem:
      'The same firm sells at $38 per unit and produces the profit-maximising quantity. What is its economic profit?',
    stimulus: COST_TABLE,
    choices: [
      { id: 'A', text: '$7' },
      { id: 'B', text: '$15' },
      { id: 'C', text: '$20' },
      { id: 'D', text: '$75' },
      { id: 'E', text: 'Zero' },
    ],
    correctChoiceId: 'B',
    explanation:
      'The firm produces five units, so total revenue is 5 × 38 = $190 and total cost is $175. Profit is $15. The ' +
      'same answer comes from the per-unit route: price minus average total cost is 38 − 35 = $3, times five units.',
    distractorNotes: {
      A: '$7 is the profit on the fifth unit alone (38 − 31), not the profit on all five.',
      C: '$20 would be the loss if the firm sold at $31 instead: 5 × 31 − 175.',
      D: '$75 comes from multiplying five units by the $15 of average fixed cost at four units — two different outputs mixed together.',
      E: 'Economic profit is zero only where price equals the minimum of average total cost, which is $35 here.',
    },
  },
  {
    id: 'micro-u3-13',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-profit-max',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 70,
    stem:
      'A firm is producing an output at which marginal revenue is greater than marginal cost. What should it do, and ' +
      'why?',
    choices: [
      { id: 'A', text: 'Produce less: costs are rising faster than revenue at this output.' },
      { id: 'B', text: 'Produce more, but only if price is above average total cost.' },
      { id: 'C', text: 'Keep output unchanged: it is already maximising profit.' },
      { id: 'D', text: 'Produce more: each extra unit adds more to revenue than to cost.' },
      { id: 'E', text: 'Raise the price until marginal revenue and marginal cost are equal.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Every unit for which marginal revenue exceeds marginal cost adds something to profit, so the firm has not ' +
      'finished. It should keep expanding until the two are equal — that is where the last profitable unit has been ' +
      'made and the next one would cost more than it brings in.',
    distractorNotes: {
      A: 'Cutting output would throw away units that add more revenue than cost. That is the right move in the opposite case, when marginal cost exceeds marginal revenue.',
      C: 'Profit is at its maximum where marginal revenue equals marginal cost, not where it exceeds it.',
      B: 'Whether price covers average total cost decides how large the profit or loss is, not whether one more unit is worth making. Even a firm making a loss expands while MR exceeds MC.',
      E: 'A perfectly competitive firm has no power to set its price. Raising it would leave the firm with no buyers at all.',
    },
  },

  // ── 3.6 Short-Run and Long-Run Decisions ─────────────────────────────────
  {
    id: 'micro-u3-14',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-entry-exit',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 105,
    stem:
      'The price falls to $20 per unit. Using the table, what should the firm do in the short run, and what is the ' +
      'result?',
    stimulus: COST_TABLE,
    choices: [
      { id: 'A', text: 'Produce four units and lose $20.' },
      { id: 'B', text: 'Produce five units and lose $75.' },
      { id: 'C', text: 'Shut down and lose nothing, since it produces nothing.' },
      { id: 'D', text: 'Shut down and lose $60.' },
      { id: 'E', text: 'Leave the industry immediately.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Compare the price with the lowest average variable cost, which is $21 at four units. At $20 the price does ' +
      'not cover the variable cost of even the cheapest unit to make, so every unit produced would add to the loss. ' +
      'The firm shuts down and loses its fixed cost of $60 — the smallest loss available to it.',
    distractorNotes: {
      A: 'At four units revenue is 4 × 20 = $80 against a total cost of $144, a loss of $64 — worse than shutting down.',
      B: 'At five units revenue is $100 against a total cost of $175, a loss of $75 — worse still.',
      C: 'Shutting down stops the variable costs, not the fixed ones. Rent on the premises still has to be paid.',
      E: 'Leaving the industry is a long-run decision. In the short run the fixed input cannot be given up, which is why the loss is exactly $60.',
    },
  },
  {
    id: 'micro-u3-15',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-entry-exit',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 105,
    stem:
      'Now the price is $33 per unit. Using the table, what should the firm do in the short run?',
    stimulus: COST_TABLE,
    choices: [
      { id: 'A', text: 'Shut down, because the price is below average total cost at every output.' },
      { id: 'B', text: 'Produce six units, because the price is above average variable cost there.' },
      { id: 'C', text: 'Produce five units and break even.' },
      { id: 'D', text: 'Produce four units, because average variable cost is lowest there.' },
      { id: 'E', text: 'Produce five units, making a loss of $10 — smaller than the loss from shutting down.' },
    ],
    correctChoiceId: 'E',
    explanation:
      'The price is below the lowest average total cost of $35, so a loss is unavoidable. But it is above the lowest ' +
      'average variable cost of $21, so producing beats not producing. The firm makes every unit whose marginal cost ' +
      'is below $33 — five of them — and loses 175 − 5 × 33 = $10, against the $60 it would lose by shutting down. ' +
      'Revenue covers all of the variable cost and part of the fixed cost.',
    distractorNotes: {
      A: 'The price is indeed below average total cost everywhere, but that is the test for making a loss, not the test for shutting down. Shutting down is right only when price is below *average variable* cost.',
      C: 'Breaking even would need a price of $35, the lowest average total cost.',
      D: 'The firm picks its output by comparing marginal cost with price, not by looking for the lowest average variable cost. Stopping at four units gives up a fifth unit that brings in $33 and costs $31, so the loss would be $12 instead of $10.',
      B: 'The sixth unit costs $53 to make and sells for $33, which would deepen the loss to $30.',
    },
  },
  {
    id: 'micro-u3-16',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-entry-exit',
    skill: 'analysis',
    difficulty: 2,
    targetSeconds: 85,
    stem:
      'Firms in a perfectly competitive industry are earning positive economic profit. What happens as the industry ' +
      'moves to its long-run equilibrium?',
    choices: [
      { id: 'A', text: 'New firms enter, market supply increases, and the price falls until economic profit is zero.' },
      { id: 'B', text: 'Existing firms raise their prices until the extra profit is competed away.' },
      { id: 'C', text: 'Some firms leave, market supply falls, and the price rises until profit is zero.' },
      { id: 'D', text: 'Nothing changes, because each firm is too small to affect the market.' },
      { id: 'E', text: 'Market demand falls, because buyers refuse to pay prices that give firms a profit.' },
    ],
    correctChoiceId: 'A',
    explanation:
      'Profit is a signal, and in perfect competition there is nothing to stop outsiders acting on it. Entry shifts ' +
      'the market supply curve to the right, the market price falls, and it keeps falling until price equals the ' +
      'minimum of average total cost and economic profit is zero. Each firm ends up producing at the bottom of its ' +
      'average total cost curve.',
    distractorNotes: {
      B: 'A perfectly competitive firm has no price-setting power: raise the price and buyers go to the identical product next door.',
      C: 'Exit is what happens when firms are making losses. Here they are making profits, which attracts firms rather than driving them out.',
      D: 'One firm is too small to matter, but entry by many firms shifts market supply and moves the price for everyone.',
      E: 'Demand shifts with income, tastes and the prices of other goods — not with how well sellers are doing.',
    },
  },

  // ── 3.7 Perfect Competition ──────────────────────────────────────────────
  {
    id: 'micro-u3-17',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-perfect-competition',
    skill: 'graphing',
    difficulty: 2,
    targetSeconds: 85,
    stem:
      'The diagram shows the cost curves of a perfectly competitive firm facing a market price of $50. How many ' +
      'units does it produce to maximise profit, and is it making an economic profit?',
    stimulus: firmDiagram(50, 'P = MR = $50'),
    choices: [
      { id: 'A', text: '30 units, and it makes zero economic profit.' },
      { id: 'B', text: '50 units, and it makes zero economic profit.' },
      { id: 'C', text: '50 units, and it makes a positive economic profit.' },
      { id: 'D', text: '70 units, and it makes a loss.' },
      { id: 'E', text: '70 units, and it makes a positive economic profit.' },
    ],
    correctChoiceId: 'E',
    explanation:
      'For a price taker the horizontal price line is also the marginal revenue curve, so profit is greatest where ' +
      'marginal cost meets it — at 70 units. At that output the price of $50 is well above average total cost, which ' +
      'is a little over $32 there, so the firm earns a positive economic profit on every unit.',
    distractorNotes: {
      A: '30 units is where marginal cost crosses the *minimum of average variable cost* — the shutdown point, which matters only at much lower prices.',
      B: '50 units is where average total cost is at its lowest. That is the break-even output for a price of $30, not the profit-maximising output at $50.',
      D: 'The output is right, but at 70 units average total cost is far below the $50 price, so this is a profit, not a loss.',
      C: 'Profit is positive, but 50 units is not the profit-maximising output: between 50 and 70 units marginal cost is still below the $50 price, so those units add to profit.',
    },
  },
  {
    id: 'micro-u3-18',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-perfect-competition',
    skill: 'graphing',
    difficulty: 3,
    targetSeconds: 95,
    stem:
      'The market price is now $30, as shown. Which statement best describes this firm?',
    stimulus: firmDiagram(30, 'P = MR = $30'),
    choices: [
      { id: 'A', text: 'It produces 50 units and earns zero economic profit — the long-run equilibrium.' },
      { id: 'B', text: 'It produces 50 units and earns a positive economic profit, since price is above average variable cost.' },
      { id: 'C', text: 'It produces 30 units and just covers its variable costs.' },
      { id: 'D', text: 'It shuts down, because price is below average total cost at every other output.' },
      { id: 'E', text: 'It produces 70 units and makes a loss.' },
    ],
    correctChoiceId: 'A',
    explanation:
      'Marginal cost meets the $30 price line at 50 units, and 50 units is exactly where average total cost is at ' +
      'its lowest, also $30. Price equals average total cost, so economic profit is zero — the firm earns a normal ' +
      'profit. This is where a perfectly competitive industry settles in the long run: no reason to enter, no reason ' +
      'to leave.',
    distractorNotes: {
      B: 'Price being above average variable cost only tells you the firm should keep producing. Profit is decided by price against average *total* cost, and here they are equal.',
      C: 'At 30 units marginal cost is only $20, well below the price — those extra units between 30 and 50 are worth making.',
      D: 'Price is below average total cost nowhere here: it touches it at 50 units. And the shutdown test is price against average variable cost, which is $20 at its lowest.',
      E: 'At 70 units marginal cost is $50, far above the $30 price; making those units would turn a break-even firm into a loss-making one.',
    },
  },
  {
    id: 'micro-u3-19',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-perfect-competition',
    skill: 'graphing',
    difficulty: 3,
    targetSeconds: 95,
    stem: 'The market price falls to $20, as shown. What is true of this firm in the short run?',
    stimulus: firmDiagram(20, 'P = MR = $20'),
    choices: [
      { id: 'A', text: 'It produces 30 units and makes zero economic profit.' },
      { id: 'B', text: 'It produces 50 units and loses an amount equal to its fixed cost.' },
      { id: 'C', text: 'It produces 30 units and makes a loss smaller than its fixed cost.' },
      { id: 'D', text: 'It must shut down immediately, because price is below average total cost.' },
      { id: 'E', text: 'It produces 30 units, covers its variable costs exactly, and loses its fixed cost.' },
    ],
    correctChoiceId: 'E',
    explanation:
      'At $20 the price line touches average variable cost at its lowest point, 30 units — the shutdown point. ' +
      'Revenue covers the variable costs exactly and contributes nothing towards the fixed costs, so the loss equals ' +
      'fixed cost whether the firm produces those 30 units or produces nothing at all. Below this price, producing ' +
      'would make the loss larger than shutting down.',
    distractorNotes: {
      A: 'Zero *economic* profit needs price to equal average total cost, which is about $34 at 30 units. The firm is making a loss.',
      B: 'At 50 units marginal cost is $30, above the $20 price, so those units would add to the loss.',
      D: 'Price below average total cost means a loss, not a shutdown. The shutdown test is price against average variable cost — and here the price is exactly at its minimum.',
      C: 'A loss smaller than fixed cost would need the price to be above the minimum of average variable cost, so that revenue covered some of the fixed cost. Here it is exactly at that minimum.',
    },
  },
  {
    id: 'micro-u3-20',
    subject: 'micro',
    unitId: 'micro-3',
    topicId: 'micro-3-perfect-competition',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 70,
    stem:
      'Why is the demand curve facing a single firm in a perfectly competitive market horizontal, while the market ' +
      'demand curve slopes downward?',
    choices: [
      { id: 'A', text: 'Because the firm produces a unique product that buyers cannot get elsewhere.' },
      { id: 'B', text: 'Because the firm always produces at the minimum of its average total cost curve.' },
      { id: 'C', text: 'Because the firm has no fixed costs in the short run.' },
      { id: 'D', text: 'Because buyers in the market are unaware of the prices other sellers charge.' },
      { id: 'E', text: 'Because the firm is one of many sellers of an identical product, so at a higher price it would sell nothing.' },
    ],
    correctChoiceId: 'E',
    explanation:
      'In perfect competition the product is identical across sellers and buyers know the going price, so a firm ' +
      'that asked for even a cent more would lose every customer. It can sell as much as it likes at the market ' +
      'price and nothing above it — a horizontal demand curve, which also makes price equal to marginal revenue and ' +
      'to average revenue. The market as a whole still faces a downward-sloping demand curve, because buyers as a ' +
      'group do buy more when the price is lower.',
    distractorNotes: {
      A: 'A unique product is the opposite of perfect competition; it is what gives a firm the power to set its own price.',
      C: 'Fixed costs exist in the short run here as in any industry. They affect profit, not the shape of the demand curve the firm faces.',
      D: 'Perfect competition assumes buyers are well informed. Their knowledge is exactly why the firm cannot charge more.',
      B: 'That happens only in long-run equilibrium, and it is a consequence of free entry rather than the reason the firm is a price taker.',
    },
  },
];

export const microUnit3TopicTitles: Record<string, string> = {
  'micro-3-production': '3.1 The Production Function',
  'micro-3-short-run-costs': '3.2 Short-Run Production Costs',
  'micro-3-long-run-costs': '3.3 Long-Run Production Costs',
  'micro-3-profit-types': '3.4 Types of Profit',
  'micro-3-profit-max': '3.5 Profit Maximization',
  'micro-3-entry-exit': '3.6 Short-Run and Long-Run Decisions',
  'micro-3-perfect-competition': '3.7 Perfect Competition',
};
