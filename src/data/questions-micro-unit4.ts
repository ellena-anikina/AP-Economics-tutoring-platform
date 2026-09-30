/**
 * data/questions-micro-unit4.ts
 *
 * AP® Microeconomics · Unit 4 «Imperfect Competition» — 20 MCQ.
 *
 * ПРОИСХОЖДЕНИЕ. Все вопросы написаны с нуля. Материалы College Board
 * (Test Booklets, AP Classroom) НЕ использовались и использоваться не могут:
 * их условия запрещают распространение и прогон через генеративные системы.
 * Использована только официальная сетка тем CED (4.1–4.5) — она публична.
 * Сетка сверена 30.09.2026 по «Course at a Glance» и по CED, действующему
 * с осени 2026: состав юнитов и веса не менялись с версии 2019 года.
 *
 * ПОЧЕМУ 20. Юнит весит 15–22% экзамена — третий по тяжести. Тем пять, и они
 * очень разного размера: монополия тянет на треть юнита, а «введение» — это
 * полстраницы определений. Отсюда перекос в разбивке ниже.
 *
 * ПОКРЫТИЕ ТЕМ:
 *   4.1 Introduction to Imperfectly Competitive Markets ... 2
 *   4.2 Monopoly .......................................... 7
 *   4.3 Price Discrimination .............................. 3
 *   4.4 Monopolistic Competition .......................... 4
 *   4.5 Oligopoly and Game Theory ......................... 4
 *
 * ОДНА ФИРМА НА ДЕСЯТЬ ВОПРОСОВ. Семь вопросов про монополию и три про
 * ценовую дискриминацию считают по одной и той же схеме, четыре вопроса по
 * монополистической конкуренции — по второй, три вопроса по теории игр — по
 * одной матрице. Приём тот же, что в Unit 3: ученик разбирается в условии
 * один раз, а дальше отвечает на вопросы, а не перечитывает данные.
 *
 * ЧИСЛА ПОДОБРАНЫ ТАК, ЧТОБЫ ВСЁ СХОДИЛОСЬ ТОЧНО, и пересчитаны независимо.
 * Монополия: P = 90 − Q, MC = 30 при любом выпуске, TC = 300 + 30Q.
 *   MR = 90 − 2Q, MR = MC → Q = 30, P = 60; ATC(30) = 40; прибыль 600.
 *   Совершенная конкуренция с теми же издержками: Q = 60, P = 30.
 *   Потери благосостояния = ½ × 30 × 30 = 450.
 *   Регулирование по P = MC: ATC(60) = 35, убыток 300 — ровно постоянные
 *   издержки, как и должно быть при постоянных MC.
 *   Совершенная дискриминация: Q = 60, TR = 3600, TC = 2100, прибыль 1500.
 * Монополистическая конкуренция, длинный период: P = 70 − q,
 *   TC = 500 + 20q + 0,25q². MR = MC → q = 20, P = 50 = ATC(20) → прибыль 0,
 *   а минимум ATC приходится на q ≈ 44,7 — отсюда избыточная мощность.
 *   Тройное условие (MR = MC, P = ATC, касание) выполняется не случайно:
 *   постоянные издержки выведены из него, F = (a−c)²/(4(b+d)) = 500.
 *
 * УРОВЕНЬ. Как в Unit 1–3, набор смещён в верхнюю часть сложности.
 * Ключи распределены по 4 на каждую букву A–E.
 */

import type { Question } from "@/types";

/* ── Общая схема монополии ─────────────────────────────────────────────────
 * Спрос P = 90 − Q, MR = 90 − 2Q, MC = 30 (постоянны), ATC = 300/Q + 30.
 * ATC падает на всём протяжении — это не случайность, а следствие постоянных
 * MC и ненулевых постоянных издержек, и один из вопросов на этом построен.
 * Точки ATC посчитаны формулой, не подобраны на глаз. */
const MONOPOLY_DIAGRAM = {
  kind: "diagram" as const,
  component: "CostCurves" as const,
  props: {
    xLabel: "Quantity",
    yLabel: "Price and cost, $",
    curves: [
      {
        id: "d",
        label: "D",
        points: [
          { x: 0, y: 90 },
          { x: 88, y: 2 },
        ],
        labelDx: 6,
        labelDy: 4,
      },
      {
        id: "mr",
        label: "MR",
        points: [
          { x: 0, y: 90 },
          { x: 45, y: 0 },
        ],
        dashed: true,
        labelDx: 8,
        labelDy: -7,
      },
      {
        id: "mc",
        label: "MC",
        points: [
          { x: 0, y: 30 },
          { x: 105, y: 30 },
        ],
        labelDx: 5,
        labelDy: 4,
      },
      {
        id: "atc",
        label: "ATC",
        points: [
          { x: 5, y: 90 },
          { x: 6, y: 80 },
          { x: 8, y: 67.5 },
          { x: 10, y: 60 },
          { x: 12, y: 55 },
          { x: 15, y: 50 },
          { x: 20, y: 45 },
          { x: 25, y: 42 },
          { x: 30, y: 40 },
          { x: 40, y: 37.5 },
          { x: 50, y: 36 },
          { x: 60, y: 35 },
          { x: 70, y: 34.29 },
          { x: 85, y: 33.53 },
        ],
        labelDx: 5,
        labelDy: -7,
      },
    ],
    points: [
      { id: "m", x: 30, y: 60, guides: true },
      { id: "c", x: 60, y: 30, guides: true },
    ],
    axisValues: [
      { axis: "x" as const, at: 30, text: "30" },
      { axis: "x" as const, at: 60, text: "60" },
      { axis: "y" as const, at: 30, text: "30" },
      { axis: "y" as const, at: 40, text: "40" },
      { axis: "y" as const, at: 60, text: "60" },
    ],
    description:
      "A monopolist. Demand falls from $90 at zero output to zero at 90 units. Marginal revenue falls twice as " +
      "steeply and reaches zero at 45 units. Marginal cost is constant at $30. Average total cost starts high and " +
      "falls towards $30 as output rises, staying above marginal cost at every output. Marginal revenue crosses " +
      "marginal cost at 30 units, where demand gives a price of $60 and average total cost is $40. Demand crosses " +
      "marginal cost at 60 units and a price of $30.",
  },
};

/* ── Общая схема монополистической конкуренции ─────────────────────────────
 * Длинный период: спрос P = 70 − q касается ATC ровно в точке, где MR = MC.
 * TC = 500 + 20q + 0,25q². Касание не нарисовано «примерно»: постоянные
 * издержки 500 вычислены из условия касания, поэтому q = 20, P = 50 и
 * ATC(20) = 50 сходятся точно. Минимум ATC при q ≈ 44,7 — на схеме он виден,
 * но числом нигде не спрашивается, потому что нецелый. */
const MONOPOLISTIC_DIAGRAM = {
  kind: "diagram" as const,
  component: "CostCurves" as const,
  props: {
    xLabel: "Quantity",
    yLabel: "Price and cost, $",
    curves: [
      {
        id: "d",
        label: "D",
        points: [
          { x: 0, y: 70 },
          { x: 68, y: 2 },
        ],
        labelDx: 6,
        labelDy: 4,
      },
      {
        id: "mr",
        label: "MR",
        points: [
          { x: 0, y: 70 },
          { x: 35, y: 0 },
        ],
        dashed: true,
        labelDx: 8,
        labelDy: -7,
      },
      {
        id: "mc",
        label: "MC",
        points: [
          { x: 0, y: 20 },
          { x: 105, y: 72.5 },
        ],
        labelDx: 5,
        labelDy: 4,
      },
      {
        id: "atc",
        label: "ATC",
        points: [
          { x: 8, y: 84.5 },
          { x: 10, y: 72.5 },
          { x: 12, y: 64.67 },
          { x: 15, y: 57.08 },
          { x: 20, y: 50 },
          { x: 25, y: 46.25 },
          { x: 30, y: 44.17 },
          { x: 35, y: 43.04 },
          { x: 40, y: 42.5 },
          { x: 45, y: 42.36 },
          { x: 50, y: 42.5 },
          { x: 60, y: 43.33 },
          { x: 70, y: 44.64 },
          { x: 85, y: 47.13 },
          { x: 100, y: 50 },
        ],
        labelDx: 5,
        labelDy: 14,
      },
    ],
    points: [{ id: "lr", x: 20, y: 50, guides: true }],
    axisValues: [
      { axis: "x" as const, at: 20, text: "20" },
      { axis: "y" as const, at: 50, text: "50" },
      { axis: "y" as const, at: 30, text: "30" },
    ],
    description:
      "A monopolistically competitive firm in long-run equilibrium. Demand falls from $70 at zero output to zero " +
      "at 70 units, and marginal revenue falls twice as steeply. Marginal cost rises steadily from $20. Average " +
      "total cost is U-shaped, at its lowest of about $42 near 45 units. Demand just touches average total cost " +
      "at 20 units, where both equal $50; marginal revenue crosses marginal cost at that same output, at $30.",
  },
};

/* ── Общая матрица выигрышей ───────────────────────────────────────────────
 * Классическая дилемма заключённого в оболочке рынка авиаперевозок.
 * Проверено перебором: у обеих компаний доминирующая стратегия — низкий
 * тариф; единственное равновесие Нэша (Low, Low) с выигрышем 5 каждому;
 * совместный максимум (High, High) с выигрышем 10 каждому. */
const FARE_GAME = {
  kind: "diagram" as const,
  component: "GameMatrix" as const,
  props: {
    caption: "Annual profit of each airline on the route",
    unit: "$ millions",
    rowPlayer: {
      name: "Airline A",
      short: "A",
      strategies: ["High fare", "Low fare"],
    },
    colPlayer: {
      name: "Airline B",
      short: "B",
      strategies: ["High fare", "Low fare"],
    },
    payoffs: [
      [
        [10, 10],
        [2, 14],
      ],
      [
        [14, 2],
        [5, 5],
      ],
    ],
    description:
      "A two-by-two payoff matrix for two airlines choosing a high or a low fare. If both choose the high fare, " +
      "each earns 10. If A chooses high and B low, A earns 2 and B earns 14. If A chooses low and B high, A earns " +
      "14 and B earns 2. If both choose the low fare, each earns 5.",
  },
};

export const microUnit4Questions: Question[] = [
  // ── 4.1 Introduction to Imperfectly Competitive Markets ──────────────────
  {
    id: "micro-u4-01",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-intro",
    skill: "conceptual",
    difficulty: 1,
    targetSeconds: 55,
    stem:
      "Which of the following is true of a firm in an imperfectly competitive market but is not true of a firm in " +
      "a perfectly competitive market?",
    choices: [
      {
        id: "A",
        text: "It chooses the output at which marginal revenue equals marginal cost.",
      },
      { id: "B", text: "It can earn economic profit in the short run." },
      { id: "C", text: "It aims to maximise profit rather than revenue." },
      { id: "D", text: "Its average total cost curve is U-shaped." },
      {
        id: "E",
        text: "It faces a downward-sloping demand curve for its own output.",
      },
    ],
    correctChoiceId: "E",
    explanation:
      "The dividing line is the demand curve the individual firm faces. A perfectly competitive firm is small " +
      "enough that it can sell as much as it likes at the market price, so its own demand curve is horizontal and " +
      "price equals marginal revenue. Every imperfectly competitive firm — monopoly, monopolistic competition, " +
      "oligopoly — faces a demand curve that slopes down, which is what makes it a price maker.",
    distractorNotes: {
      A: "Every profit-maximising firm produces where marginal revenue equals marginal cost. That rule is shared, not distinguishing.",
      B: "A perfectly competitive firm can also earn economic profit in the short run; what it cannot do is keep it in the long run.",
      C: "Profit maximisation is assumed for both. It says nothing about how much market power the firm has.",
      D: "Cost curves come from the technology of production, not from the market structure. Both kinds of firm can have U-shaped average total cost.",
    },
  },
  {
    id: "micro-u4-02",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-intro",
    skill: "analysis",
    difficulty: 2,
    targetSeconds: 75,
    stem:
      "A firm must lower its price on every unit it sells in order to sell one more unit. For this firm, marginal " +
      "revenue is",
    choices: [
      {
        id: "A",
        text: "equal to price, because the extra unit is sold at the going price.",
      },
      {
        id: "B",
        text: "less than price, because the lower price also applies to the units the firm was already selling.",
      },
      {
        id: "C",
        text: "greater than price, because total revenue rises when output rises.",
      },
      {
        id: "D",
        text: "equal to average total cost at every level of output.",
      },
      { id: "E", text: "negative at every level of output." },
    ],
    correctChoiceId: "B",
    explanation:
      "Selling one more unit brings in the price of that unit, but it also costs the firm the price cut on all the " +
      "units it could previously sell at the higher price. Marginal revenue is the first effect minus the second, " +
      "so it lies below the demand curve at every output above the first unit. This is the single fact that drives " +
      "the whole unit: it is why an imperfectly competitive firm restricts output.",
    distractorNotes: {
      A: "That is the perfectly competitive case, where the firm can sell more without moving the price at all.",
      C: "Total revenue can indeed rise, but marginal revenue measures how much of that rise the extra unit is responsible for after the price cut on earlier units — which is less than the price.",
      D: "Marginal revenue is about revenue and average total cost is about cost. They meet only by coincidence at particular outputs.",
      E: "Marginal revenue is positive while demand is elastic and only turns negative once the price cut outweighs the extra sales.",
    },
  },

  // ── 4.2 Monopoly ─────────────────────────────────────────────────────────
  {
    id: "micro-u4-03",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopoly",
    skill: "graphing",
    difficulty: 2,
    targetSeconds: 80,
    stem: "The diagram shows a single-price monopolist. What output will it produce, and what price will it charge?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      { id: "A", text: "30 units at a price of $30" },
      { id: "B", text: "30 units at a price of $40" },
      { id: "C", text: "30 units at a price of $60" },
      { id: "D", text: "45 units at a price of $45" },
      { id: "E", text: "60 units at a price of $30" },
    ],
    correctChoiceId: "C",
    explanation:
      "Profit is largest where marginal revenue equals marginal cost, which happens at 30 units. The price comes " +
      "from the demand curve, not from the point where the two curves met: go up from 30 units to the demand curve " +
      "and read $60. Choosing output on marginal revenue and price on demand is the whole method, and the two " +
      "steps use different curves.",
    distractorNotes: {
      A: "The output is right, but $30 is the height of marginal cost, not the price buyers are willing to pay for 30 units.",
      B: "The output is right, but $40 is average total cost at 30 units. That number is needed for profit, not for price.",
      D: "At 45 units marginal revenue is zero. That maximises revenue, not profit — the extra units still cost $30 each to make.",
      E: "60 units at $30 is what a perfectly competitive industry with these costs would produce. A monopolist restricts output below that.",
    },
  },
  {
    id: "micro-u4-04",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopoly",
    skill: "calculation",
    difficulty: 2,
    targetSeconds: 90,
    stem: "Using the same diagram, what economic profit does the monopolist earn?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      { id: "A", text: "$20" },
      { id: "B", text: "$600" },
      { id: "C", text: "$900" },
      { id: "D", text: "$1,200" },
      { id: "E", text: "$1,800" },
    ],
    correctChoiceId: "B",
    explanation:
      "Profit is (price − average total cost) × quantity. At 30 units the price is $60 and average total cost is " +
      "$40, so profit per unit is $20 and total profit is $20 × 30 = $600. Equivalently, total revenue is " +
      "$60 × 30 = $1,800 and total cost is $40 × 30 = $1,200.",
    distractorNotes: {
      A: "$20 is the profit on one unit. It still has to be multiplied by the 30 units sold.",
      C: "This uses marginal cost ($30) in place of average total cost: ($60 − $30) × 30. Marginal cost tells you what the last unit cost, not what the average unit cost.",
      D: "$1,200 is total cost, not profit.",
      E: "$1,800 is total revenue. Costs still have to come out of it.",
    },
  },
  {
    id: "micro-u4-05",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopoly",
    skill: "calculation",
    difficulty: 3,
    targetSeconds: 110,
    stem:
      "Using the same diagram, what is the deadweight loss caused by this monopoly compared with the allocatively " +
      "efficient outcome?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      { id: "A", text: "$0" },
      { id: "B", text: "$225" },
      { id: "C", text: "$450" },
      { id: "D", text: "$600" },
      { id: "E", text: "$900" },
    ],
    correctChoiceId: "C",
    explanation:
      "The efficient output is where demand meets marginal cost: 60 units. The monopolist stops at 30. On every " +
      "unit between the two, buyers value the good more than it costs to make, and that surplus is lost. The lost " +
      "area is a triangle with base 60 − 30 = 30 units and height $60 − $30 = $30, so the deadweight loss is " +
      "½ × 30 × 30 = $450.",
    distractorNotes: {
      A: "A monopoly is productively capable but allocatively inefficient: it stops while buyers still value extra units above marginal cost. The loss is not zero.",
      B: "This halves the triangle twice. Take half of base × height once only.",
      D: "$600 is the monopolist’s profit. Profit is a transfer from buyers to the firm, not a loss to society; the deadweight loss is the surplus nobody gets.",
      E: "$900 is base × height without the half. The lost area is a triangle, not a rectangle.",
    },
  },
  {
    id: "micro-u4-06",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopoly",
    skill: "analysis",
    difficulty: 3,
    targetSeconds: 90,
    stem:
      "A monopolist facing this demand curve would never choose to produce more than 45 units, whatever its costs " +
      "were. Why not?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      {
        id: "A",
        text: "Beyond 45 units marginal revenue is negative, so selling more would reduce total revenue while total cost still rises.",
      },
      {
        id: "B",
        text: "Beyond 45 units demand becomes elastic, and an elastic demand makes price cuts unprofitable.",
      },
      {
        id: "C",
        text: "Beyond 45 units marginal cost begins to rise, so the extra units cost more than they used to.",
      },
      {
        id: "D",
        text: "Beyond 45 units average total cost falls below price, which would attract new entrants.",
      },
      {
        id: "E",
        text: "Beyond 45 units the firm would be producing more than the market demands at any price.",
      },
    ],
    correctChoiceId: "A",
    explanation:
      "Marginal revenue reaches zero at 45 units — the midpoint of a straight-line demand curve — and is negative " +
      "beyond it. Producing an extra unit there would shrink total revenue and add to total cost, so profit falls " +
      "twice over. This is the same statement as the more familiar one that a monopolist always produces where " +
      "demand is elastic: the elastic stretch is exactly the stretch where marginal revenue is positive.",
    distractorNotes: {
      B: "It is the other way round. Demand is elastic to the left of the midpoint and inelastic to the right, so beyond 45 units demand is inelastic — and that is the region the firm avoids.",
      C: "Marginal cost is constant at $30 in this diagram, so it does not change at 45 units. The argument holds whatever costs are, which is the point of the question.",
      D: "Barriers to entry are what define a monopoly; entry is not the reason the firm stops at 45.",
      E: "Demand only reaches zero at 90 units. Between 45 and 90 the firm could sell the output — it just would not want to.",
    },
  },
  {
    id: "micro-u4-07",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopoly",
    skill: "conceptual",
    difficulty: 2,
    targetSeconds: 85,
    stem:
      "In the diagram, average total cost falls at every level of output shown. Which of the following does this " +
      "imply about the market?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      { id: "A", text: "The firm has no fixed costs." },
      {
        id: "B",
        text: "Marginal cost lies above average total cost throughout.",
      },
      {
        id: "C",
        text: "The firm is producing at the allocatively efficient output.",
      },
      {
        id: "D",
        text: "One firm can supply the whole market at a lower total cost than two firms could.",
      },
      { id: "E", text: "The firm’s demand curve must be perfectly elastic." },
    ],
    correctChoiceId: "D",
    explanation:
      "Average total cost that keeps falling as output grows means economies of scale over the whole relevant " +
      "range — the definition of a natural monopoly. Splitting the output between two firms would move each of " +
      "them back up its average cost curve, so total cost would be higher. This is why utilities such as water " +
      "networks are usually left as single suppliers and regulated instead of being broken up.",
    distractorNotes: {
      A: "The opposite. Average total cost falls precisely because a fixed cost is being spread over more and more units; with no fixed cost and constant marginal cost, average total cost would be flat.",
      B: "Average total cost falls only while marginal cost is below it. Here marginal cost is $30 and average total cost is above $30 at every output shown.",
      C: "Allocative efficiency means price equals marginal cost. The shape of the cost curve says nothing about whether the firm chooses that output — and this one does not.",
      E: "The demand curve in the diagram clearly slopes down. Cost conditions and demand conditions are separate things.",
    },
  },
  {
    id: "micro-u4-08",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopoly",
    skill: "calculation",
    difficulty: 3,
    targetSeconds: 110,
    stem:
      "A regulator orders the firm in the diagram to charge a price equal to marginal cost. What happens to the " +
      "firm at that price?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      {
        id: "A",
        text: "It breaks even, because the price covers the cost of producing each unit.",
      },
      { id: "B", text: "It earns a profit of $600, the same as before." },
      {
        id: "C",
        text: "It shuts down at once, because price is below average variable cost.",
      },
      { id: "D", text: "It makes a loss of $450." },
      { id: "E", text: "It makes a loss of $300." },
    ],
    correctChoiceId: "E",
    explanation:
      "Marginal cost pricing sets the price at $30, where demand meets marginal cost, so output is 60 units. " +
      "Average total cost at 60 units is $35, so the firm loses $5 on each of 60 units — a loss of $300. That is " +
      "exactly its fixed cost, and it always will be when marginal cost is constant: the price covers the variable " +
      "cost of every unit and contributes nothing towards the fixed cost. This is the standard dilemma of " +
      "regulating a natural monopoly — the efficient price does not let the firm survive without a subsidy.",
    distractorNotes: {
      A: "Price covers marginal cost, but marginal cost is not the whole cost of a unit. Average total cost also carries a share of the fixed cost, and here it is $35 against a price of $30.",
      B: "$600 was the profit at the unregulated price of $60. Forcing the price down to $30 cannot leave profit unchanged.",
      C: "Average variable cost equals marginal cost at $30 here, so the price covers variable cost exactly. A firm shuts down only when price falls below average variable cost.",
      D: "$450 is the deadweight loss the regulation removes, not the loss the firm makes.",
    },
  },
  {
    id: "micro-u4-09",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopoly",
    skill: "analysis",
    difficulty: 2,
    targetSeconds: 85,
    stem:
      "Suppose this market were perfectly competitive instead, with many firms sharing exactly the same cost " +
      "curves. What would the industry’s output and price be?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      {
        id: "A",
        text: "30 units at $60, unchanged, because costs have not changed",
      },
      { id: "B", text: "45 units at $45" },
      { id: "C", text: "60 units at $30" },
      { id: "D", text: "60 units at $35" },
      { id: "E", text: "90 units at $0" },
    ],
    correctChoiceId: "C",
    explanation:
      "Competitive firms are price takers, so each produces until price equals marginal cost, and the industry " +
      "settles where the demand curve crosses marginal cost: 60 units at $30. Compared with the monopoly outcome " +
      "of 30 units at $60, output doubles and the price halves. That gap is the whole case against monopoly.",
    distractorNotes: {
      A: "Costs are the same, but conduct is not. A price taker does not restrict output to hold the price up, because it cannot move the price anyway.",
      B: "45 units is where marginal revenue is zero — a monopoly idea. Marginal revenue does not enter a competitive firm’s decision, because for it price and marginal revenue are the same thing.",
      D: "$35 is average total cost at 60 units. In long-run competitive equilibrium price equals average total cost, but with these falling cost curves the short-run competitive condition is price equals marginal cost, which gives $30.",
      E: "90 units is where demand hits zero. Nobody produces at a price of zero when marginal cost is $30.",
    },
  },

  // ── 4.3 Price Discrimination ─────────────────────────────────────────────
  {
    id: "micro-u4-10",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-price-discrimination",
    skill: "conceptual",
    difficulty: 2,
    targetSeconds: 75,
    stem:
      "A cinema charges students less than it charges other adults for the same seat at the same showing. For this " +
      "to raise the cinema’s profit, which of the following must be true?",
    choices: [
      {
        id: "A",
        text: "Students must have more elastic demand than other adults, and resale of tickets between the groups must be impossible.",
      },
      {
        id: "B",
        text: "Students must have more inelastic demand than other adults.",
      },
      {
        id: "C",
        text: "The cinema must be a natural monopoly with falling average total cost.",
      },
      {
        id: "D",
        text: "The cinema’s marginal cost of seating a student must be lower than for other adults.",
      },
      {
        id: "E",
        text: "The two groups must have the same elasticity of demand, so the price difference is fair.",
      },
    ],
    correctChoiceId: "A",
    explanation:
      "Price discrimination needs three things: some market power, groups whose elasticities differ, and no " +
      "resale. The group with the more elastic demand gets the lower price, because it is the group that would " +
      "walk away — students here. Without the resale barrier, students would simply buy tickets and sell them on " +
      "to everyone else, and the single price would reappear.",
    distractorNotes: {
      B: "The relationship runs the other way: the lower price goes to the more elastic group. Charging the price-sensitive group more would just lose their custom.",
      C: "Price discrimination requires market power, but a natural monopoly is a much stronger condition than that. Cinemas, airlines and train operators all discriminate without being natural monopolies.",
      D: "Cost differences would justify different prices without any discrimination at all. Price discrimination means charging different prices for the same product at the same cost.",
      E: "If the elasticities were identical, the profit-maximising price would be identical too, and there would be nothing to gain.",
    },
  },
  {
    id: "micro-u4-11",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-price-discrimination",
    skill: "calculation",
    difficulty: 3,
    targetSeconds: 110,
    stem:
      "The monopolist from the earlier diagram can now charge each buyer exactly what that buyer is willing to pay " +
      "— perfect price discrimination. What output does it produce, and what profit does it earn?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      { id: "A", text: "30 units, earning $600" },
      { id: "B", text: "30 units, earning $1,500" },
      { id: "C", text: "60 units, earning $1,500" },
      { id: "D", text: "60 units, earning $1,800" },
      { id: "E", text: "60 units, earning $3,600" },
    ],
    correctChoiceId: "C",
    explanation:
      "When every unit is sold at its own price, the firm no longer has to cut the price on earlier units to sell " +
      "one more. Marginal revenue therefore equals the demand curve, and the firm keeps producing until demand " +
      "meets marginal cost, at 60 units. Its revenue is the whole area under the demand curve up to 60 units: " +
      "½ × (90 + 30) × 60 = $3,600. Total cost is $300 of fixed cost plus $30 × 60 = $2,100, so profit is $1,500.",
    distractorNotes: {
      A: "$600 at 30 units is the single-price outcome. The point of discriminating is that the firm no longer stops there.",
      B: "The profit figure is right but the output is not. The extra profit comes precisely from the extra 30 units the firm now finds worth making.",
      D: "$1,800 is the revenue a single-price monopolist collects at 30 units, not the discriminating firm’s profit.",
      E: "$3,600 is total revenue under perfect discrimination. The $2,100 of cost still has to be taken off.",
    },
  },
  {
    id: "micro-u4-12",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-price-discrimination",
    skill: "analysis",
    difficulty: 3,
    targetSeconds: 95,
    stem:
      "Compared with charging a single price, perfect price discrimination by this monopolist would have which " +
      "effect on output and on consumer surplus?",
    stimulus: MONOPOLY_DIAGRAM,
    choices: [
      { id: "A", text: "Output falls and consumer surplus falls." },
      {
        id: "B",
        text: "Output is unchanged and consumer surplus is transferred to the firm.",
      },
      {
        id: "C",
        text: "Output rises and consumer surplus rises, because more people are served.",
      },
      {
        id: "D",
        text: "Output rises to the allocatively efficient level and consumer surplus falls to zero.",
      },
      {
        id: "E",
        text: "Output rises and the firm’s economic profit falls to zero.",
      },
    ],
    correctChoiceId: "D",
    explanation:
      "This is the uncomfortable result of the topic. Perfect price discrimination removes the deadweight loss " +
      "entirely — output rises from 30 to 60 units, exactly where price equals marginal cost — so the outcome is " +
      "allocatively efficient. But every buyer pays the most they would have paid, so none of the surplus stays " +
      "with consumers: all of it, $1,500, becomes profit. Efficient and fair are not the same question.",
    distractorNotes: {
      A: "Output rises rather than falls. The firm serves the buyers between 30 and 60 units whom the single price had priced out.",
      B: "Surplus is indeed transferred, but output does not stay put. Missing the output change misses why economists call the result efficient.",
      C: "More people are served, but each of them pays exactly what the good is worth to them, so they gain nothing from the transaction. Consumer surplus is zero, not higher.",
      E: "Profit rises from $600 to $1,500. Zero profit is the long-run outcome under free entry, which a monopoly by definition does not face.",
    },
  },

  // ── 4.4 Monopolistic Competition ─────────────────────────────────────────
  {
    id: "micro-u4-13",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopolistic-competition",
    skill: "graphing",
    difficulty: 2,
    targetSeconds: 85,
    stem:
      "The diagram shows a monopolistically competitive firm in long-run equilibrium. What output does it produce, " +
      "and at what price?",
    stimulus: MONOPOLISTIC_DIAGRAM,
    choices: [
      { id: "A", text: "20 units at $30" },
      { id: "B", text: "20 units at $50" },
      { id: "C", text: "20 units at $70" },
      { id: "D", text: "35 units at $35" },
      { id: "E", text: "45 units at $25" },
    ],
    correctChoiceId: "B",
    explanation:
      "The method is the same as for a monopoly: find the output where marginal revenue meets marginal cost — 20 " +
      "units — then go up to the demand curve for the price, $50. What makes this the long run is that the demand " +
      "curve just touches average total cost at that output, so price equals average total cost and economic " +
      "profit is zero.",
    distractorNotes: {
      A: "$30 is the height at which marginal revenue crosses marginal cost. Price always comes from the demand curve, which is higher.",
      C: "$70 is where the demand curve meets the vertical axis — the price at which the firm would sell nothing at all.",
      D: "35 units is where marginal revenue reaches zero. That would maximise revenue, not profit.",
      E: "About 45 units is where average total cost is lowest. A monopolistically competitive firm does not produce there, and that gap is the point of the next question.",
    },
  },
  {
    id: "micro-u4-14",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopolistic-competition",
    skill: "analysis",
    difficulty: 2,
    targetSeconds: 80,
    stem: "Why does the firm in this diagram earn zero economic profit in the long run?",
    stimulus: MONOPOLISTIC_DIAGRAM,
    choices: [
      {
        id: "A",
        text: "Because it produces where price equals marginal cost.",
      },
      {
        id: "B",
        text: "Because entry by firms selling close substitutes shrinks the demand each firm faces until price only just covers average total cost.",
      },
      {
        id: "C",
        text: "Because its demand curve is perfectly elastic, as in perfect competition.",
      },
      {
        id: "D",
        text: "Because a regulator caps its price at average total cost.",
      },
      {
        id: "E",
        text: "Because it produces at the minimum of its average total cost curve.",
      },
    ],
    correctChoiceId: "B",
    explanation:
      "Monopolistic competition has free entry, and that is what drives profit away. While existing firms are " +
      "making money, new ones open with similar products; each firm’s share of the market shrinks, so its demand " +
      "curve shifts left until it is just tangent to average total cost. At the tangency price equals average " +
      "total cost by construction, and profit is zero.",
    distractorNotes: {
      A: "Price is $50 and marginal cost is $30 at 20 units, so they are not equal. Price above marginal cost is exactly why this outcome is not allocatively efficient.",
      C: 'The demand curve in the diagram slopes down. Differentiated products give each firm some pricing power, which is the "monopolistic" half of the name.',
      D: "No regulator is involved. Entry does the job on its own.",
      E: "It does not: average total cost is lowest near 45 units and the firm produces 20. Zero profit comes from tangency, and tangency happens on the falling part of the curve.",
    },
  },
  {
    id: "micro-u4-15",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopolistic-competition",
    skill: "analysis",
    difficulty: 3,
    targetSeconds: 95,
    stem:
      "The firm produces 20 units, while its average total cost would be lowest at about 45 units. Economists call " +
      "the difference between these two outputs",
    stimulus: MONOPOLISTIC_DIAGRAM,
    choices: [
      { id: "A", text: "deadweight loss." },
      { id: "B", text: "diminishing marginal returns." },
      { id: "C", text: "productive efficiency." },
      { id: "D", text: "economies of scale." },
      { id: "E", text: "excess capacity." },
    ],
    correctChoiceId: "E",
    explanation:
      "Excess capacity is the gap between the output a monopolistically competitive firm actually produces and the " +
      "output that would minimise its average total cost. It is unavoidable here: a downward-sloping demand curve " +
      "can only be tangent to a U-shaped average cost curve on the falling part of that curve. In everyday terms " +
      "it is the half-empty restaurant that could serve more people at a lower cost per meal but has no way to " +
      "fill the tables at the price it charges.",
    distractorNotes: {
      A: "Deadweight loss is surplus that nobody receives, measured against the allocatively efficient output. This firm does produce a deadweight loss, but the gap named in the question is about cost per unit, not about lost surplus.",
      B: "Diminishing marginal returns are about output rising more slowly as a variable input is added in the short run. They explain the shape of the cost curves, not where on them the firm sits.",
      C: "Productive efficiency means producing at minimum average total cost — which is precisely what this firm fails to do.",
      D: "Economies of scale describe why average total cost falls as output rises. The firm is on that falling stretch, but the term for the gap itself is excess capacity.",
    },
  },
  {
    id: "micro-u4-16",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-monopolistic-competition",
    skill: "conceptual",
    difficulty: 2,
    targetSeconds: 85,
    stem:
      "Compared with a perfectly competitive firm in long-run equilibrium, a monopolistically competitive firm in " +
      "long-run equilibrium",
    choices: [
      { id: "A", text: "earns higher economic profit." },
      { id: "B", text: "faces a perfectly elastic demand curve." },
      {
        id: "C",
        text: "produces at the minimum of its average total cost curve.",
      },
      {
        id: "D",
        text: "charges a price above marginal cost and produces less than the output that minimises average total cost.",
      },
      {
        id: "E",
        text: "is allocatively efficient but not productively efficient.",
      },
    ],
    correctChoiceId: "D",
    explanation:
      "Both firms end up with zero economic profit, because both face free entry. The differences are the other " +
      "two efficiency conditions. A perfectly competitive firm charges price equal to marginal cost and sits at " +
      "the bottom of its average total cost curve. A monopolistically competitive firm does neither: price stays " +
      "above marginal cost, so it is not allocatively efficient, and output falls short of minimum average total " +
      "cost, so it is not productively efficient either. What buyers get in exchange is variety.",
    distractorNotes: {
      A: "Both earn zero economic profit in the long run. Free entry is the feature the two structures share.",
      B: "Perfectly elastic demand is what the perfectly competitive firm faces. Product differentiation is what gives this firm a downward-sloping curve.",
      C: "That is the perfectly competitive outcome. Tangency with a downward-sloping demand curve can only happen where average total cost is still falling.",
      E: "It fails both tests, not just one. Price above marginal cost rules out allocative efficiency.",
    },
  },

  // ── 4.5 Oligopoly and Game Theory ────────────────────────────────────────
  {
    id: "micro-u4-17",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-oligopoly",
    skill: "analysis",
    difficulty: 2,
    targetSeconds: 90,
    stem:
      "Two airlines are the only operators on a route and must each choose a high or a low fare, without knowing " +
      "the other’s choice. Does Airline A have a dominant strategy?",
    stimulus: FARE_GAME,
    choices: [
      {
        id: "A",
        text: "Yes — the low fare, because it gives A more profit whichever fare B chooses.",
      },
      {
        id: "B",
        text: "Yes — the high fare, because both airlines earn 10 that way.",
      },
      {
        id: "C",
        text: "Yes — the high fare, because 14 is the largest payoff anywhere in the table.",
      },
      { id: "D", text: "No — A’s best choice depends on what B does." },
      {
        id: "E",
        text: "No — dominant strategies can only exist in games that are played repeatedly.",
      },
    ],
    correctChoiceId: "A",
    explanation:
      "A dominant strategy is one that is better for a player no matter what the other does, so check A’s two " +
      "options against each of B’s. If B charges the high fare, A earns 14 with the low fare against 10 with the " +
      "high one. If B charges the low fare, A earns 5 with the low fare against 2 with the high one. The low fare " +
      "wins in both cases, so it is dominant for A — and by the symmetry of the table, for B as well.",
    distractorNotes: {
      B: "Both earning 10 is the best joint outcome, but a dominant strategy is judged one player at a time. A can always do better for itself by switching to the low fare.",
      C: "The 14 is what A earns with the *low* fare while B charges the high one. Picking the row with the biggest number in it is not the test; the test is row-by-row comparison against each of B’s choices.",
      D: "That would be true if A’s best reply changed with B’s choice. Here it does not — the low fare wins against both.",
      E: "Repetition changes whether cooperation can be sustained, not whether a dominant strategy exists. This one exists in a single play.",
    },
  },
  {
    id: "micro-u4-18",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-oligopoly",
    skill: "analysis",
    difficulty: 3,
    targetSeconds: 95,
    stem: "What is the Nash equilibrium of this game?",
    stimulus: FARE_GAME,
    choices: [
      { id: "A", text: "Both airlines charge the low fare, earning 5 each." },
      { id: "B", text: "Both airlines charge the high fare, earning 10 each." },
      {
        id: "C",
        text: "Airline A charges the low fare and Airline B the high fare.",
      },
      { id: "D", text: "There are two equilibria: both high and both low." },
      { id: "E", text: "There is no Nash equilibrium in this game." },
    ],
    correctChoiceId: "A",
    explanation:
      "A Nash equilibrium is a pair of choices from which neither player can gain by changing its own choice " +
      "alone. Test each cell. At both-low, A switching to the high fare drops it from 5 to 2, and the same for B, " +
      "so nobody moves — this is the equilibrium. At both-high, either airline could switch and go from 10 to 14, " +
      "so it is not stable. The two off-diagonal cells fail too. Note the result: both airlines end up with 5 when " +
      "they could have had 10, and no one acted irrationally.",
    distractorNotes: {
      B: "Both-high is the best outcome for the pair, but it is not stable: each airline has a private incentive to undercut. Best and stable are different tests.",
      C: "From this cell B would switch to the low fare and go from 2 to 5, so it does not hold.",
      D: "Both-high is not an equilibrium, for the reason given above. A game can have several equilibria, but this one does not.",
      E: "Every finite game of this kind has at least one Nash equilibrium, and here it is easy to find by checking the four cells.",
    },
  },
  {
    id: "micro-u4-19",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-oligopoly",
    skill: "analysis",
    difficulty: 3,
    targetSeconds: 100,
    stem: "The two airlines meet and agree to charge the high fare. Why is such an agreement hard to hold together?",
    stimulus: FARE_GAME,
    choices: [
      {
        id: "A",
        text: "Because under the agreement each airline earns less than it would by both charging the low fare.",
      },
      {
        id: "B",
        text: "Because marginal revenue is negative at the high fare.",
      },
      {
        id: "C",
        text: "Because charging the high fare is a dominant strategy for both airlines.",
      },
      {
        id: "D",
        text: "Because the high-fare outcome is already a Nash equilibrium, so no agreement is needed.",
      },
      {
        id: "E",
        text: "Because each airline can raise its own profit from 10 to 14 by breaking the agreement while the other keeps to it.",
      },
    ],
    correctChoiceId: "E",
    explanation:
      "Collusion is fragile because the collusive outcome is not a Nash equilibrium. Sitting at both-high, each " +
      "airline looks at its own row and sees 14 available by undercutting while the other holds the price up. Both " +
      "reason that way, both cut, and they land on 5 each. The incentive is strongest precisely when the " +
      "agreement is working, which is why cartels need a way to detect and punish cheating to survive at all.",
    distractorNotes: {
      A: "Both-high pays 10 each and both-low pays 5 each, so the agreement is the better outcome for both. That is what makes its instability interesting.",
      B: "Nothing in the table is about marginal revenue. The payoffs are profits, and the problem is strategic, not a matter of where the firm sits on its demand curve.",
      C: "The dominant strategy is the low fare, not the high one. If the high fare were dominant, there would be no need for an agreement and no temptation to break it.",
      D: "It is not a Nash equilibrium — either airline gains by deviating. The agreement is needed precisely because the stable outcome is the worse one.",
    },
  },
  {
    id: "micro-u4-20",
    subject: "micro",
    unitId: "micro-4",
    topicId: "micro-4-oligopoly",
    skill: "conceptual",
    difficulty: 1,
    targetSeconds: 60,
    stem: "Which feature separates an oligopoly from monopolistic competition?",
    choices: [
      {
        id: "A",
        text: "Firms in an oligopoly face a downward-sloping demand curve.",
      },
      {
        id: "B",
        text: "Firms in an oligopoly earn zero economic profit in the long run.",
      },
      {
        id: "C",
        text: "Firms in an oligopoly always sell an identical product.",
      },
      {
        id: "D",
        text: "An oligopoly has so few firms that each one must take its rivals’ likely reactions into account.",
      },
      { id: "E", text: "An oligopoly has no barriers to entry." },
    ],
    correctChoiceId: "D",
    explanation:
      "The distinguishing feature is mutual interdependence, and it follows from the number of firms. With only a " +
      "handful of sellers, one firm’s price cut is big enough to be felt by the others, so each has to predict " +
      "what the rest will do — which is why oligopoly is the one market structure analysed with game theory. In " +
      "monopolistic competition there are too many firms for any one of them to matter to the others.",
    distractorNotes: {
      A: "Both structures give firms a downward-sloping demand curve. That is shared by every imperfectly competitive market.",
      B: "Zero long-run profit belongs to monopolistic competition, where entry is free. Barriers to entry let oligopolists keep profit in the long run.",
      C: "Oligopolists may sell identical products (steel) or differentiated ones (cars, phones). The number of firms is what defines the structure, not the product.",
      E: "Oligopolies normally have significant barriers to entry. It is monopolistic competition that has easy entry.",
    },
  },
];

export const microUnit4TopicTitles: Record<string, string> = {
  "micro-4-intro": "4.1 Introduction to Imperfectly Competitive Markets",
  "micro-4-monopoly": "4.2 Monopoly",
  "micro-4-price-discrimination": "4.3 Price Discrimination",
  "micro-4-monopolistic-competition": "4.4 Monopolistic Competition",
  "micro-4-oligopoly": "4.5 Oligopoly and Game Theory",
};
