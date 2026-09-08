/**
 * data/questions-micro-unit1.ts
 *
 * AP® Microeconomics · Unit 1 «Basic Economic Concepts» — 15 MCQ + 1 FRQ.
 *
 * ПРОИСХОЖДЕНИЕ. Все вопросы написаны с нуля. Материалы College Board
 * (Test Booklets, AP Classroom) НЕ использовались и использоваться не могут:
 * их условия запрещают распространение и прогон через генеративные системы.
 * Использована только официальная сетка тем CED (1.1–1.6) — она публична.
 *
 * УРОВЕНЬ. По запросу преподавателя набор смещён в верхнюю часть сложности:
 * 11 вопросов сложности 3 и 4 сложности 2. Это заметно труднее, чем базовый
 * набор из questions.ts — там на этот же юнит есть micro-001 (PPC, difficulty 1)
 * и micro-002 (sunk cost, difficulty 2), которые годятся как разминочные.
 *
 * ПОКРЫТИЕ ТЕМ:
 *   1.1 Scarcity ................................... 2
 *   1.2 Resource Allocation and Economic Systems ... 2
 *   1.3 Production Possibilities Curve ............. 4
 *   1.4 Comparative Advantage and Gains from Trade . 3
 *   1.5 Cost-Benefit Analysis ...................... 2
 *   1.6 Marginal Analysis and Consumer Choice ...... 2
 *
 * Ключи распределены по 3 на каждую букву A–E.
 * Каждый ключ и каждое объяснение подтверждает преподаватель до публикации.
 */

import type { Question } from '@/types';

export const microUnit1Questions: Question[] = [
  // ── 1.1 Scarcity ─────────────────────────────────────────────────────────
  {
    id: 'micro-u1-01',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-scarcity',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 85,
    stem:
      'A remote island has far more fresh spring water than its inhabitants could ever consume, but the water must be ' +
      'carried by hand from the spring to the village. Which of the following is true?',
    choices: [
      { id: 'A', text: 'The water is a free good, because the available quantity exceeds any possible demand for it.' },
      { id: 'B', text: 'The water is not scarce, but the island experiences a shortage of it at a price of zero.' },
      {
        id: 'C',
        text: 'The water is scarce, because obtaining it requires labor that has alternative uses.',
      },
      { id: 'D', text: 'The water becomes scarce only once the islanders begin to sell it to outsiders.' },
      { id: 'E', text: 'Scarcity of the water would be eliminated if the islanders wanted less of it.' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Scarcity is not about physical quantity — it is about whether obtaining a good requires giving something up. ' +
      'Carrying the water uses labor time that could have produced something else, so every bucket has an opportunity ' +
      'cost. A good is free in the economic sense only when more of it can be obtained at zero opportunity cost.',
    distractorNotes: {
      A: 'Confuses abundance with the absence of opportunity cost. The quantity at the spring is irrelevant if getting it costs labor.',
      B: 'A shortage is a market condition at a particular price; scarcity is a condition of the good itself. Different concepts.',
      D: 'Scarcity does not depend on whether a market exists. Selling reveals value; it does not create the opportunity cost.',
      E:
        'Reducing wants for water would not eliminate the alternative uses of the labor spent carrying it. This option ' +
        'applies the "unlimited wants" half of the definition and drops the "limited resources" half.',
    },
  },
  {
    id: 'micro-u1-02',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-scarcity',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 80,
    stem: 'Which of the following is NOT scarce in the economic sense?',
    choices: [
      { id: 'A', text: 'Diamonds, because their market price is very high' },
      { id: 'B', text: 'Sand on a public beach that a construction firm hauls away to make concrete' },
      { id: 'C', text: 'Seawater used as an input by a coastal desalination plant' },
      { id: 'D', text: 'Sunlight falling on an open field, which no one gives up anything to obtain' },
      { id: 'E', text: 'Space on a public park bench on a busy Saturday afternoon' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Sunlight on an open field is non-rival and available at zero opportunity cost: one person using it does not ' +
      'reduce what is available to anyone else, and no resources must be diverted to obtain it. That makes it a free ' +
      'good. Every other option involves either rivalry in use or resources given up to obtain the good.',
    distractorNotes: {
      A: 'A high price is evidence of scarcity, not a counterexample to it. This option inverts the relationship.',
      B: 'Hauling sand uses trucks, fuel and labor, and the hauled sand is no longer on the beach — rival and costly.',
      C: 'Seawater is abundant, but desalination consumes capital and energy, so the usable water has a real opportunity cost.',
      E: 'A bench seat is rival: one person sitting there prevents another from doing so. Free of charge is not the same as free of scarcity.',
    },
  },

  // ── 1.2 Resource Allocation and Economic Systems ─────────────────────────
  {
    id: 'micro-u1-03',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-economic-systems',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 75,
    stem:
      'Which of the following statements about how economic systems answer the three fundamental economic questions is ' +
      'correct?',
    choices: [
      {
        id: 'A',
        text:
          'A command economy avoids opportunity costs, because a central authority allocates resources directly.',
      },
      {
        id: 'B',
        text:
          'A market economy answers "for whom to produce" primarily through prices and the distribution of income.',
      },
      {
        id: 'C',
        text:
          'In a market economy, "what to produce" is decided by producers alone, independently of consumers.',
      },
      { id: 'D', text: 'A mixed economy eliminates scarcity by combining public and private provision.' },
      {
        id: 'E',
        text:
          'A traditional economy answers "how to produce" by comparing marginal benefit with marginal cost.',
      },
    ],
    correctChoiceId: 'B',
    explanation:
      'Every system must answer what, how, and for whom. In a market economy the "for whom" question is settled by who ' +
      'is willing and able to pay: prices ration output, and the distribution of income determines who can meet those prices.',
    distractorNotes: {
      A: 'No system escapes opportunity cost. Central planning changes *who* decides, not whether alternatives are given up.',
      C: 'Producers respond to consumer demand signalled through prices — this is consumer sovereignty.',
      D: 'Scarcity is a condition of resources, not of institutions. No arrangement of ownership can eliminate it.',
      E: 'A traditional economy answers by custom and inheritance. Explicit marginal comparison is characteristic of market decision making.',
    },
  },
  {
    id: 'micro-u1-04',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-economic-systems',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 95,
    stem:
      'A country replaces collective ownership of farmland with private ownership, allowing farmers to keep and sell any ' +
      'output above a fixed quota. Total agricultural output rises sharply within one year, with no change in the amount ' +
      'of land, labor, or equipment. Economic theory best explains this by which of the following?',
    choices: [
      { id: 'A', text: "The country's production possibilities curve shifted outward as more land became available." },
      { id: 'B', text: 'Scarcity was reduced by the reassignment of ownership rights.' },
      { id: 'C', text: 'Opportunity cost fell to zero for farmers producing above the quota.' },
      {
        id: 'D',
        text: 'Incentives changed, moving production from a point inside the curve toward a point on the curve.',
      },
      { id: 'E', text: 'The reform created a comparative advantage in agriculture that did not previously exist.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Nothing was added to the resource base, so productive capacity — the curve itself — did not move. What changed is ' +
      'how fully and how well the existing resources were used. Weak incentives had left the economy producing inside its ' +
      'curve; stronger incentives moved it toward the frontier. This distinction between moving *to* the curve and moving ' +
      'the curve is one of the highest-value ideas in Unit 1.',
    distractorNotes: {
      A: 'The question states that land, labor and equipment were unchanged. Nothing shifted the frontier.',
      B: 'Institutions can change how efficiently scarce resources are used, but they cannot make resources less scarce.',
      C: 'Producing above the quota still uses land and labor with alternative uses. Opportunity cost is never zero for a resource in use.',
      E: 'Comparative advantage follows from relative opportunity costs, which depend on productivity — not on who holds title to the land.',
    },
  },

  // ── 1.3 Production Possibilities Curve ───────────────────────────────────
  {
    id: 'micro-u1-05',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-ppc',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 100,
    stem:
      'The table shows five attainable and efficient combinations of wheat and steel for a country. Which of the ' +
      'following is correct?',
    stimulus: {
      kind: 'table',
      caption: 'Production possibilities (units per period)',
      headers: ['Combination', 'Wheat', 'Steel'],
      rows: [
        ['A', '0', '30'],
        ['B', '10', '28'],
        ['C', '20', '22'],
        ['D', '30', '12'],
        ['E', '40', '0'],
      ],
    },
    choices: [
      { id: 'A', text: 'The opportunity cost of wheat is constant, so the curve is a straight line.' },
      {
        id: 'B',
        text:
          'Moving from B to C costs 6 units of steel per 10 units of wheat, and the opportunity cost of wheat rises as ' +
          'more wheat is produced.',
      },
      { id: 'C', text: 'Moving from D to E costs 22 units of steel.' },
      { id: 'D', text: 'The curve is bowed toward the origin, because resources are perfectly adaptable between uses.' },
      { id: 'E', text: 'Producing 20 units of wheat together with 25 units of steel is attainable but inefficient.' },
    ],
    correctChoiceId: 'B',
    explanation:
      'Each additional 10 units of wheat costs 2, then 6, then 10, then 12 units of steel. The rising cost per unit is ' +
      'the law of increasing opportunity cost, which arises because resources are not equally suited to both goods, and ' +
      'it is what makes the curve bowed *away* from the origin.',
    distractorNotes: {
      A: 'Constant opportunity cost would give equal steel sacrifices between every pair of rows. The sacrifices are 2, 6, 10, 12.',
      C: 'From D to E steel falls from 12 to 0 — a cost of 12, not 22.',
      D: 'Bowed toward the origin would mean *decreasing* opportunity cost, and perfectly adaptable resources give a straight line, not a curve.',
      E:
        'At 20 units of wheat the maximum attainable steel is 22. The combination 20 wheat and 25 steel lies outside the ' +
        'curve, so it is unattainable rather than merely inefficient.',
    },
  },
  {
    id: 'micro-u1-06',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-ppc',
    skill: 'graphing',
    difficulty: 3,
    targetSeconds: 95,
    stem:
      "The graph shows a country's production possibilities curve together with points X, Y, and Z. Which of the " +
      'following is true?',
    stimulus: {
      kind: 'diagram',
      component: 'PPF',
      props: {
        bowed: true,
        points: [
          { id: 'X', label: 'X', x: 70.7, y: 56.6 },
          { id: 'Y', label: 'Y', x: 38, y: 30 },
          { id: 'Z', label: 'Z', x: 88, y: 62 },
        ],
      },
    },
    choices: [
      { id: 'A', text: 'Moving from Y to X requires giving up some quantity of one of the two goods.' },
      { id: 'B', text: 'Point Z can be reached through more efficient use of currently available resources.' },
      { id: 'C', text: 'Point X is preferable to point Z for society.' },
      { id: 'D', text: 'At point X the country has eliminated scarcity, since no resources are idle.' },
      {
        id: 'E',
        text: 'Moving from Y to X is possible with no opportunity cost, because resources are currently underemployed.',
      },
    ],
    correctChoiceId: 'E',
    explanation:
      'Point Y lies inside the curve, so some resources are unemployed or misallocated. Moving to the frontier increases ' +
      'output of both goods at once — nothing has to be given up. Opportunity cost between two goods appears only once the ' +
      'economy is *on* the curve, which is exactly why the trade-off is drawn as a frontier rather than as a region.',
    distractorNotes: {
      A: 'True only for movements along the curve. From an interior point, both goods can rise together.',
      B: 'Z lies beyond the frontier. Efficiency gains can reach the curve but never pass it; that requires growth in resources or technology.',
      C: 'Z is unattainable, so a preference between X and Z is not an economic choice. The curve also says nothing about which attainable point society should prefer.',
      D: 'Being on the curve means resources are used efficiently, not that they are unlimited. Scarcity is precisely why the curve is finite.',
    },
  },
  {
    id: 'micro-u1-07',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-ppc',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 75,
    stem:
      'Which of the following would shift a country’s production possibilities curve outward along the capital-goods ' +
      'axis only, leaving the consumer-goods intercept unchanged?',
    choices: [
      { id: 'A', text: 'A technological advance that raises productivity only in the capital-goods industry' },
      { id: 'B', text: 'A general increase in the size of the labor force' },
      { id: 'C', text: 'A fall in the unemployment rate' },
      { id: 'D', text: 'An increase in consumer demand for capital goods' },
      { id: 'E', text: 'A general rise in the price level' },
    ],
    correctChoiceId: 'A',
    explanation:
      'A curve pivots when something raises the maximum output of one good but not the other. A technology that applies ' +
      'only to capital goods raises that intercept and leaves the consumer-goods intercept where it was.',
    distractorNotes: {
      B: 'More labor can be used in either industry, so both intercepts rise — the whole curve shifts out.',
      C: 'Falling unemployment moves the economy from inside the curve toward it. The curve itself does not move.',
      D: 'Demand determines which point on the curve is chosen, not where the curve lies.',
      E: 'The PPC is drawn in physical units of output. The price level does not appear on either axis.',
    },
  },
  {
    id: 'micro-u1-08',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-ppc',
    skill: 'analysis',
    difficulty: 2,
    targetSeconds: 85,
    stem:
      'Two countries have identical production possibilities curves for capital goods and consumer goods today. Country A ' +
      'chooses a point with more capital goods and fewer consumer goods than Country B. Assuming no other differences, ' +
      'which of the following is most likely?',
    choices: [
      { id: 'A', text: "Country B's curve will shift outward faster, because higher consumption stimulates production." },
      { id: 'B', text: 'Both curves will shift outward at the same rate, since the curves are identical today.' },
      { id: 'C', text: "Country A's curve will shift inward, because it consumes less." },
      { id: 'D', text: 'Country A will enjoy both higher consumption today and faster growth in the future.' },
      {
        id: 'E',
        text: 'Country A gives up consumption today and will have a curve farther out than Country B in the future.',
      },
    ],
    correctChoiceId: 'E',
    explanation:
      'Capital goods are the tools, machines and structures used to produce future output. Choosing more of them means ' +
      'less consumption now in exchange for greater productive capacity later. This is the same trade-off as any other ' +
      'opportunity cost, but measured across time rather than across goods.',
    distractorNotes: {
      A: 'Growth in capacity comes from accumulating productive resources, not from consuming output.',
      B: 'Identical curves today say nothing about future capacity; the composition of today’s output is what drives growth.',
      C: 'Lower consumption does not destroy productive capacity. The curve does not move inward unless resources are lost.',
      D: 'This denies the trade-off entirely. More capital today necessarily means less consumption today.',
    },
  },

  // ── 1.4 Comparative Advantage and Gains from Trade ───────────────────────
  {
    id: 'micro-u1-09',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-comparative-advantage',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 110,
    stem:
      'The table shows the number of labor hours each country needs to produce one ton of each good. Which of the ' +
      'following is correct?',
    stimulus: {
      kind: 'table',
      caption: 'Labor hours required per ton of output',
      headers: ['Country', 'Cotton', 'Rice'],
      rows: [
        ['Nordia', '4', '2'],
        ['Sudia', '10', '8'],
      ],
    },
    choices: [
      { id: 'A', text: 'Nordia has a comparative advantage in cotton, because it needs fewer hours to produce a ton of it.' },
      { id: 'B', text: 'Trade at 1 ton of rice per ton of cotton would benefit both countries.' },
      {
        id: 'C',
        text: 'Sudia has a comparative advantage in cotton, and trade at 1.5 tons of rice per ton of cotton benefits both.',
      },
      { id: 'D', text: 'Sudia has a comparative advantage in both goods, because it is less productive overall.' },
      { id: 'E', text: 'No mutually beneficial trade is possible, because Nordia produces both goods with fewer hours.' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Convert hours into opportunity costs. For Nordia, one ton of cotton takes 4 hours, which could instead have made ' +
      '2 tons of rice, so cotton costs 2 rice. For Sudia, 10 hours of cotton could instead have made 1.25 tons of rice, ' +
      'so cotton costs 1.25 rice. Sudia gives up less rice per ton of cotton and therefore holds the comparative ' +
      'advantage in cotton. Mutually beneficial terms must lie strictly between the two opportunity costs — between 1.25 ' +
      'and 2 tons of rice per ton of cotton — and 1.5 falls inside that range.',
    distractorNotes: {
      A:
        'Fewer hours is absolute advantage. With an input table the trap is sharper than usual, because the smaller ' +
        'number looks like the better position while comparative advantage depends on the ratio between the two goods.',
      B:
        'Sudia exports cotton and can obtain 1.25 tons of rice per ton of cotton domestically. It would never accept ' +
        'only 1 ton, so the terms lie outside the mutually beneficial range.',
      D: 'No country can hold the comparative advantage in both goods — the opportunity costs are reciprocals of each other.',
      E: 'Absolute superiority in both goods does not remove the gains from specialization. This is precisely what the theory refutes.',
    },
  },
  {
    id: 'micro-u1-10',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-comparative-advantage',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 75,
    stem:
      'Two countries specialize according to comparative advantage and then trade with each other. Which of the following ' +
      'best describes the result?',
    choices: [
      { id: 'A', text: "Both countries' production possibilities curves shift outward." },
      { id: 'B', text: 'Each country produces at a point inside its curve, leaving room for imports.' },
      { id: 'C', text: 'Total world output is unchanged; only its distribution between the countries changes.' },
      { id: 'D', text: 'Both countries can consume at combinations that lie outside their own production possibilities curves.' },
      { id: 'E', text: 'The country with the absolute advantage in both goods gains nothing from the exchange.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Specialization and trade expand *consumption* possibilities without changing *production* possibilities. Each ' +
      'country still produces on its own curve, but by exchanging output it can end up consuming a combination that its ' +
      'own resources could never have produced. Keeping these two curves distinct is what the question is testing.',
    distractorNotes: {
      A:
        'The production curve depends on a country’s own resources and technology, and trade changes neither. This is the ' +
        'single most common error on this topic.',
      B: 'Specialization means producing more of one good, on the curve — not producing less overall.',
      C: 'Specialization according to comparative advantage raises total world output; that increase is the source of the gains.',
      E: 'Both countries gain whenever the terms of trade fall between their opportunity costs, regardless of absolute advantage.',
    },
  },
  {
    id: 'micro-u1-11',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-comparative-advantage',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 105,
    stem:
      'Using all of its resources, Ferra can produce either 6 bolts of cloth or 3 barrels of oil per day, and Terran can ' +
      'produce either 8 bolts of cloth or 2 barrels of oil per day. Which range of terms of trade would make exchange ' +
      'mutually beneficial?',
    choices: [
      { id: 'A', text: 'Between 4 and 6 bolts of cloth per barrel of oil' },
      { id: 'B', text: 'Between 2 and 4 bolts of cloth per barrel of oil' },
      { id: 'C', text: 'Between 1 and 2 bolts of cloth per barrel of oil' },
      { id: 'D', text: 'Exactly 3 bolts of cloth per barrel of oil, the average of the two countries’ costs' },
      { id: 'E', text: 'Any rate at all, since specialization makes both countries better off' },
    ],
    correctChoiceId: 'B',
    explanation:
      'For Ferra, one barrel of oil costs 2 bolts of cloth; for Terran it costs 4. Ferra therefore has the comparative ' +
      'advantage in oil and exports it, and will only sell for more than 2 bolts. Terran imports oil and will only pay ' +
      'less than the 4 bolts it costs to make its own. Any rate strictly between 2 and 4 leaves both better off.',
    distractorNotes: {
      A: 'Above 4 bolts, Terran would do better producing its own oil.',
      C: 'Below 2 bolts, Ferra would do better keeping its oil rather than trading it away.',
      D:
        '3 bolts does lie inside the beneficial range, but it is not the only rate that works — and the midpoint has no ' +
        'special status. The question asks for the range.',
      E: 'Terms outside the two opportunity costs leave one country worse off than not trading at all.',
    },
  },

  // ── 1.5 Cost-Benefit Analysis ────────────────────────────────────────────
  {
    id: 'micro-u1-12',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-cost-benefit',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 95,
    stem:
      'A firm has already spent $4 million developing a product. Completing it will require an additional $3 million, and ' +
      'the finished product is expected to generate $5 million in revenue. There are no other uses for the work completed ' +
      'so far. A rational firm should',
    choices: [
      { id: 'A', text: 'complete the project, because the additional $3 million yields $5 million in revenue' },
      { id: 'B', text: 'abandon the project, because total costs of $7 million exceed revenue of $5 million' },
      { id: 'C', text: 'complete the project, in order to recover the $4 million already spent' },
      { id: 'D', text: 'abandon the project, because the $4 million already spent is an opportunity cost of completing it' },
      { id: 'E', text: 'be indifferent, because the expected economic profit on the project is zero' },
    ],
    correctChoiceId: 'A',
    explanation:
      'The $4 million is sunk: it is gone whether the firm continues or stops. The only relevant comparison is between ' +
      'the additional $3 million and the $5 million it brings in, which leaves the firm $2 million better off than ' +
      'abandoning. The project was a bad investment overall, but that verdict cannot be changed now — only made worse by ' +
      'walking away from $2 million.',
    distractorNotes: {
      B:
        'The most tempting option, and the reason this question is hard. Total cost including the sunk $4 million is the ' +
        'right way to judge whether the project *should have been started*, and the wrong way to decide what to do now.',
      C:
        'Right action, wrong reasoning — and reasoning is what is being tested. Completing does not recover the $4 million; ' +
        'that money is gone under either choice.',
      D: 'A sunk cost cannot be an opportunity cost, because it is not forgone by the decision. Nothing about it changes either way.',
      E: 'Going forward the firm gains $2 million by completing. Indifference would require the additional cost to equal the additional revenue.',
    },
  },
  {
    id: 'micro-u1-13',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-cost-benefit',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 95,
    stem:
      'A student can spend Saturday either working a shift that pays $90 or attending a concert. A ticket to the concert ' +
      'costs $50, and the student values the concert experience at $200. What is the opportunity cost of attending the ' +
      'concert, and what should the student do?',
    choices: [
      { id: 'A', text: '$140; attend, because $200 exceeds $140' },
      { id: 'B', text: '$90; attend, because $200 exceeds $90' },
      { id: 'C', text: '$200; do not attend, because the value of the concert is the highest figure given' },
      { id: 'D', text: '$50; attend, because the ticket costs far less than the value of the experience' },
      { id: 'E', text: '$140; do not attend, because $140 exceeds the $90 the student could have earned' },
    ],
    correctChoiceId: 'A',
    explanation:
      'Opportunity cost combines the explicit cost of the ticket ($50) with the implicit cost of the forgone wage ($90), ' +
      'giving $140. Since the student values the concert at $200, attending produces a net gain of $60. Leaving out the ' +
      'implicit cost is the error that this question is built around.',
    distractorNotes: {
      B: 'Counts only the implicit cost and ignores the ticket price.',
      C: 'The $200 is the benefit of attending, not its cost.',
      D: 'Counts only the explicit cost and ignores the wage given up — the classic omission of implicit cost.',
      E: 'The cost is right, but the comparison is wrong: the relevant benchmark is the $200 value of the concert, not the $90 wage.',
    },
  },

  // ── 1.6 Marginal Analysis and Consumer Choice ────────────────────────────
  {
    id: 'micro-u1-14',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-marginal-analysis',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 130,
    stem:
      'The table shows a consumer’s marginal utility from goods X and Y. The price of X is $2 per unit, the price of Y is ' +
      '$3 per unit, and the consumer has $18 to spend. Which combination maximizes total utility?',
    stimulus: {
      kind: 'table',
      caption: 'Marginal utility per unit consumed',
      headers: ['Unit', 'MU of X', 'MU of Y'],
      rows: [
        ['1', '20', '36'],
        ['2', '16', '30'],
        ['3', '12', '24'],
        ['4', '8', '18'],
        ['5', '6', '12'],
      ],
    },
    choices: [
      { id: 'A', text: '2 units of X and 4 units of Y' },
      { id: 'B', text: '5 units of X and 2 units of Y' },
      { id: 'C', text: '4 units of X and 3 units of Y' },
      { id: 'D', text: '3 units of X and 3 units of Y' },
      { id: 'E', text: '3 units of X and 4 units of Y' },
    ],
    correctChoiceId: 'E',
    explanation:
      'Utility is maximized where marginal utility per dollar is equal across goods and the entire budget is spent. ' +
      'MU per dollar for X is 10, 8, 6, 4, 3; for Y it is 12, 10, 8, 6, 4. Buying in descending order of MU per dollar ' +
      'gives 3 units of X and 4 units of Y, costing exactly $6 + $12 = $18, with the last unit of each delivering 6 utils ' +
      'per dollar.',
    distractorNotes: {
      A: 'Costs $16 and leaves $2 unspent, which could buy a third unit of X worth 6 utils per dollar.',
      B: 'Costs $16, and the fourth and fifth units of X deliver only 4 and 3 utils per dollar — far less than a fourth unit of Y.',
      C: 'Costs $17 and leaves money unspent; the fourth unit of X yields 4 utils per dollar while a fourth unit of Y yields 6.',
      D: 'Costs $15. Equal quantities is not the rule; equal marginal utility *per dollar* is, and here $3 remains unspent.',
    },
  },
  {
    id: 'micro-u1-15',
    subject: 'micro',
    unitId: 'micro-1',
    topicId: 'micro-1-marginal-analysis',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 115,
    stem:
      'A city is choosing how many hours per week to keep a public library open. The table shows the total benefit and ' +
      'total cost of each level of service. Which level should the city choose?',
    stimulus: {
      kind: 'table',
      caption: 'Weekly library hours (dollars)',
      headers: ['Hours open', 'Total benefit', 'Total cost'],
      rows: [
        ['20', '1,000', '400'],
        ['30', '1,500', '700'],
        ['40', '1,850', '1,000'],
        ['50', '2,050', '1,300'],
        ['60', '2,150', '1,600'],
      ],
    },
    choices: [
      { id: 'A', text: '20 hours, because net benefit per hour of service is highest at that level' },
      { id: 'B', text: '30 hours, because marginal benefit begins to fall after that point' },
      { id: 'C', text: '40 hours, the largest level at which marginal benefit still exceeds marginal cost' },
      { id: 'D', text: '50 hours, because total benefit continues to exceed total cost' },
      { id: 'E', text: '60 hours, because total benefit is greatest at that level' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Each additional 10 hours costs $300. The successive marginal benefits are $500, $350, $200 and $100. Expansion is ' +
      'worthwhile while marginal benefit exceeds marginal cost, which holds up to 40 hours and fails beyond it. Net ' +
      'benefit confirms this: $600, $800, $850, $750, $550 — a maximum at 40 hours.',
    distractorNotes: {
      A:
        'Net benefit per hour really is highest at 20 hours ($30 per hour), which makes this the sharpest distractor here. ' +
        'But maximizing a ratio is not the decision rule; expanding to 40 hours adds $850 − $600 = $250 of net benefit.',
      B: 'Marginal benefit falls from the very first expansion. Diminishing marginal benefit does not by itself mean stop.',
      D: 'Total benefit exceeds total cost at every listed level, so this test cannot identify the best one.',
      E: 'Maximizing total benefit ignores cost entirely. The last 10 hours add $100 of benefit for $300 of cost.',
    },
  },
];

export const microUnit1TopicTitles: Record<string, string> = {
  'micro-1-scarcity': '1.1 Scarcity',
  'micro-1-economic-systems': '1.2 Resource Allocation and Economic Systems',
  'micro-1-ppc': '1.3 Production Possibilities Curve',
  'micro-1-comparative-advantage': '1.4 Comparative Advantage and Gains from Trade',
  'micro-1-cost-benefit': '1.5 Cost-Benefit Analysis',
  'micro-1-marginal-analysis': '1.6 Marginal Analysis and Consumer Choice',
};
