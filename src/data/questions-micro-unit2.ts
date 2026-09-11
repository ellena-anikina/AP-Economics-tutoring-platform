/**
 * data/questions-micro-unit2.ts
 *
 * AP® Microeconomics · Unit 2 «Supply and Demand» — 20 MCQ.
 *
 * ПРОИСХОЖДЕНИЕ. Все вопросы написаны с нуля. Материалы College Board
 * (Test Booklets, AP Classroom) НЕ использовались и использоваться не могут:
 * их условия запрещают распространение и прогон через генеративные системы.
 * Использована только официальная сетка тем CED (2.1–2.9) — она публична.
 *
 * ПОЧЕМУ 20, А НЕ 15. В Unit 1 шесть тем, здесь девять, и юнит весит 20–25%
 * экзамена против 12–15% у первого. На пятнадцати вопросах на треть тем
 * пришлось бы по одному, а механизм «что тебе стоит баллов» считает
 * priority = (1 − доля верных) × вес темы: при одном вопросе доля бывает
 * только 0% или 100%, и разбор по этим темам превращается в шум. Двадцать
 * дают минимум по два на каждую тему.
 *
 * ПОКРЫТИЕ ТЕМ:
 *   2.1 Demand ..................................... 2
 *   2.2 Supply ..................................... 2
 *   2.3 Price Elasticity of Demand ................. 3
 *   2.4 Price Elasticity of Supply ................. 2
 *   2.5 Other Elasticities ......................... 2
 *   2.6 Market Equilibrium, Consumer and Producer Surplus . 2
 *   2.7 Market Disequilibrium and Changes in Equilibrium .. 2
 *   2.8 The Effects of Government Intervention ..... 3
 *   2.9 International Trade and Public Policy ...... 2
 *
 * ОДИН РЫНОК НА ВСЕ СХЕМЫ. Четыре вопроса с диаграммами используют один и
 * тот же рынок: спрос p = 80 − q, предложение p = 20 + 0,5q, равновесие
 * (40; 40). Ученик разбирается в схеме один раз, а дальше отвечает на вопрос,
 * а не заново читает картинку. Все числа в объяснениях выведены из этих двух
 * уравнений и проверены счётом, а не на глаз.
 *
 * УРОВЕНЬ. Как и в Unit 1, набор смещён в верхнюю часть сложности.
 * Ключи распределены по 4 на каждую букву A–E.
 * Каждый ключ и каждое объяснение подтверждает преподаватель до публикации.
 */

import type { Question } from '@/types';

/** Общий рынок для схем: D: p = 80 − q, S: p = 20 + 0,5q, равновесие (40; 40). */
const MARKET_LINES = [
  { id: 'd', label: 'D', intercept: 80, slope: -1 },
  { id: 's', label: 'S', intercept: 20, slope: 0.5, labelDy: -6 },
];

const MARKET_DESC =
  'Demand slopes down from a price of 80 dollars at zero units to zero at 80 units. Supply slopes up from a price ' +
  'of 20 dollars at zero units. The two cross at 40 units and a price of 40 dollars.';

export const microUnit2Questions: Question[] = [
  // ── 2.1 Demand ───────────────────────────────────────────────────────────
  {
    id: 'micro-u2-01',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-demand',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 85,
    stem:
      'Buyers of a popular games console now widely expect its price to be much lower next month. Considering only ' +
      'this change, what happens in the market for consoles this month?',
    choices: [
      { id: 'A', text: 'Demand increases, because a lower price makes the console more affordable.' },
      {
        id: 'B',
        text: 'Quantity demanded falls as buyers move down along an unchanged demand curve.',
      },
      {
        id: 'C',
        text: 'Demand decreases, because buyers postpone purchases they can make more cheaply later.',
      },
      { id: 'D', text: 'Supply decreases, because sellers hold units back until the price is lower.' },
      { id: 'E', text: 'Neither curve moves, because the price has not actually changed yet.' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Expectations about future prices are a determinant of current demand. If buyers believe the console will be ' +
      'cheaper next month, some of them wait, so at every current price they want fewer units now — the whole demand ' +
      'curve shifts left. Nothing has happened to the current price, so there is no movement along the curve.',
    distractorNotes: {
      B:
        'Movement along the demand curve is caused by a change in the price of the good itself. Here the current price ' +
        'has not moved; what changed is what buyers believe about the future.',
      A:
        'Affordability reasoning applied to a price that has not fallen yet. It also points the wrong way: an expected ' +
        'future discount makes buying now less attractive, not more.',
      D:
        'Expectations do shift supply, but in the opposite direction: a seller who expects a lower price later wants to ' +
        'sell more now, not fewer. This option also moves the wrong curve.',
      E:
        'This treats expectations as irrelevant until the event happens. Expected future price is one of the standard ' +
        'demand shifters precisely because people act on beliefs before prices move.',
    },
  },
  {
    id: 'micro-u2-02',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-demand',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 95,
    stem:
      'Bus fares in a city rise sharply. Coffee sold at bus-station kiosks is a complement to bus travel, and ' +
      'ride-hailing is a substitute for it. Considering only these relationships, which pair of effects is correct?',
    choices: [
      { id: 'A', text: 'Demand for ride-hailing increases; demand for kiosk coffee decreases.' },
      { id: 'B', text: 'Demand for ride-hailing decreases; demand for kiosk coffee increases.' },
      {
        id: 'C',
        text: 'Quantity demanded of ride-hailing increases; demand for kiosk coffee decreases.',
      },
      {
        id: 'D',
        text: 'Demand for ride-hailing increases; quantity demanded of kiosk coffee decreases.',
      },
      { id: 'E', text: 'Demand for both increases, because both are related to bus travel.' },
    ],
    correctChoiceId: 'A',
    explanation:
      'A higher bus fare pushes riders towards substitutes, so demand for ride-hailing shifts right. It also means ' +
      'fewer bus trips, and therefore fewer trips past the kiosk, so demand for the complement shifts left. Both are ' +
      'shifts, because in each market it is the price of a *related* good that changed, not the price of the good itself.',
    distractorNotes: {
      B: 'Reverses both relationships — this is what you would predict if ride-hailing were the complement and coffee the substitute.',
      C:
        'Right direction, wrong language on the ride-hailing side. The price of ride-hailing has not changed, so its ' +
        'curve shifts; there is no movement along it.',
      D:
        'Right direction, wrong language on the coffee side. The price of coffee itself has not changed, so its curve ' +
        'shifts too — there is no movement along it.',
      E:
        'Being "related to bus travel" does not fix the direction. Substitutes and complements move opposite ways when ' +
        'the price of the linked good changes.',
    },
  },

  // ── 2.2 Supply ───────────────────────────────────────────────────────────
  {
    id: 'micro-u2-03',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-supply',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 85,
    stem: 'Which of the following would shift the supply curve for wheat to the right?',
    choices: [
      { id: 'A', text: 'A drought that destroys part of the harvest' },
      { id: 'B', text: 'A rise in the market price of wheat' },
      { id: 'C', text: 'A new per-unit tax collected from wheat sellers' },
      { id: 'D', text: 'An increase in household incomes, with wheat a normal good' },
      { id: 'E', text: 'A fall in the price of corn, which farmers grow on the same land' },
    ],
    correctChoiceId: 'E',
    explanation:
      'Corn is a substitute in production: the same land and machinery can make either crop. When corn becomes less ' +
      'profitable, farmers move resources into wheat, so at every wheat price they offer more — supply shifts right. ' +
      'Substitutes in production are the shifter students most often forget, because it involves a good that never ' +
      'appears on the axes.',
    distractorNotes: {
      B: 'A change in the price of the good itself moves you along the supply curve. It never shifts it.',
      C: 'A per-unit tax raises the cost of supplying each unit, shifting supply left, not right.',
      D: 'Income is a demand shifter. It moves the demand curve and leaves supply where it was.',
      A: 'A drought destroys inputs, so less is offered at every price: supply shifts left.',
    },
  },
  {
    id: 'micro-u2-04',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-supply',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 85,
    stem:
      'A hurricane forecast leads orange growers to expect much higher orange prices next season. Considering only ' +
      'this change, what happens in this season’s orange market?',
    choices: [
      { id: 'A', text: 'Supply increases this season, because growers rush to sell before conditions worsen.' },
      { id: 'B', text: 'Supply decreases this season, because growers hold fruit back to sell later.' },
      { id: 'C', text: 'Quantity supplied falls as growers move down along an unchanged supply curve.' },
      { id: 'D', text: 'Supply is unchanged this season; only next season’s supply is affected.' },
      { id: 'E', text: 'Neither curve shifts, because the hurricane has not actually happened yet.' },
    ],
    correctChoiceId: 'B',
    explanation:
      'Expected future price is a supply shifter. A grower who can store fruit and expects to sell it for more later ' +
      'offers less at every price today, so this season’s supply curve shifts left. The storable nature of the good is ' +
      'what makes the shifter bite.',
    distractorNotes: {
      A: 'Reverses the incentive. You rush to sell now when you expect prices to *fall*, not rise.',
      C: 'No movement along the curve can occur here, because the current price has not changed.',
      D:
        'This is the heart of the question. Expectations change behaviour now — that is exactly why expected future ' +
        'price belongs in the list of current supply shifters.',
      E:
        'Treats expectations as irrelevant until the event occurs. Markets move on forecasts; the storm does not have ' +
        'to arrive for supply to shift.',
    },
  },

  // ── 2.3 Price Elasticity of Demand ───────────────────────────────────────
  {
    id: 'micro-u2-05',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-ped',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 110,
    stem:
      'When the price of a monthly transit pass rises from $60 to $80, the number sold falls from 22,000 to 18,000. ' +
      'Using the midpoint method, the price elasticity of demand over this range is closest to:',
    choices: [
      { id: 'A', text: '1.43, so demand is elastic over this range' },
      { id: 'B', text: '0.20, so demand is inelastic over this range' },
      { id: 'C', text: '0.55, so demand is inelastic over this range' },
      { id: 'D', text: '0.70, so demand is inelastic over this range' },
      { id: 'E', text: '1.43, so demand is inelastic over this range' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Midpoint quantities: change of −4,000 over an average of 20,000 gives −20%. Midpoint prices: change of +$20 ' +
      'over an average of $70 gives +28.6%. Elasticity is 20 ÷ 28.6 ≈ 0.70 in absolute value. Below 1, so demand is ' +
      'inelastic here — a 1% price rise costs less than 1% of quantity, and the transit agency’s revenue rises.',
    distractorNotes: {
      B: 'This is the percentage change in quantity on its own. Elasticity is a ratio: it still has to be divided by the percentage change in price.',
      C:
        'This is what you get using the initial values as the base (−18.2% ÷ 33.3%) instead of the midpoints. A real ' +
        'method, but not the one the question asked for — and it gives a different number in every direction of travel.',
      A:
        'This is the reciprocal: 28.6 ÷ 20. Putting the price change on top answers a different question — how ' +
        'responsive price is to quantity.',
      E: 'Reciprocal error plus a classification error: whatever the number, anything above 1 is elastic, not inelastic.',
    },
  },
  {
    id: 'micro-u2-06',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-ped',
    skill: 'analysis',
    difficulty: 2,
    targetSeconds: 70,
    stem:
      'A cinema raises its ticket price by 10% and finds that its total revenue from tickets falls. Which of the ' +
      'following must be true over this price range?',
    choices: [
      { id: 'A', text: 'Demand for tickets is price elastic.' },
      { id: 'B', text: 'Demand for tickets is price inelastic.' },
      { id: 'C', text: 'Demand for tickets is unit elastic.' },
      { id: 'D', text: 'The number of tickets sold fell by exactly 10%.' },
      { id: 'E', text: 'The number of tickets sold rose by less than 10%.' },
    ],
    correctChoiceId: 'A',
    explanation:
      'Revenue is price times quantity. If a 10% price rise makes revenue fall, quantity must have fallen by more than ' +
      '10% — the quantity effect beat the price effect. That is the definition of elastic demand. This is the total ' +
      'revenue test, and it works without any numbers.',
    distractorNotes: {
      B: 'With inelastic demand a price rise *raises* revenue, because quantity falls by proportionally less.',
      C: 'With unit elastic demand revenue is unchanged by a small price change, not lower.',
      D: 'A fall of exactly 10% would be roughly unit elastic and would leave revenue about the same.',
      E: 'Quantity demanded falls when price rises; it cannot rise. This option also states the inelastic condition.',
    },
  },
  {
    id: 'micro-u2-07',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-ped',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 85,
    stem:
      'Demand for petrol is more price elastic over five years than over one month. Which of the following best ' +
      'explains why?',
    choices: [
      { id: 'A', text: 'More firms enter the petrol market over five years, which flattens demand.' },
      { id: 'B', text: 'Petrol takes up a larger share of household income over five years.' },
      {
        id: 'C',
        text: 'Over five years buyers can change vehicles, commuting habits and where they live.',
      },
      { id: 'D', text: 'The demand curve shifts to the right over five years as incomes grow.' },
      { id: 'E', text: 'Petrol is a necessity, and necessities become luxuries as time passes.' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Elasticity measures how easily buyers can substitute away, and time is what makes substitution possible. In a ' +
      'month you still own the same car and live the same distance from work, so you absorb the price. Over five years ' +
      'every one of those commitments can change, so the same price rise costs far more quantity.',
    distractorNotes: {
      B: 'Budget share is a genuine determinant of elasticity, but nothing here makes petrol a bigger share of income over time.',
      A: 'Entry by firms is a supply-side event. It affects the price, not how responsive buyers are to that price.',
      D:
        'The single most common confusion in this topic: a shift of the curve is not a change in its elasticity. ' +
        'Elasticity is about movement *along* a curve.',
      E: 'Necessity and luxury are categories of income elasticity, and goods do not migrate between them with the calendar.',
    },
  },

  // ── 2.4 Price Elasticity of Supply ───────────────────────────────────────
  {
    id: 'micro-u2-08',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-pes',
    skill: 'calculation',
    difficulty: 2,
    targetSeconds: 95,
    stem:
      'The price of a standard shipping pallet rises from $18 to $22, and the quantity supplied per week rises from ' +
      '9,000 to 11,000. Using the midpoint method, the price elasticity of supply over this range is closest to:',
    choices: [
      { id: 'A', text: '500, so supply is extremely elastic over this range' },
      { id: 'B', text: '0.20, so supply is inelastic over this range' },
      { id: 'C', text: '1.00, so supply is elastic over this range' },
      { id: 'D', text: '1.22, so supply is elastic over this range' },
      { id: 'E', text: '1.00, so supply is unit elastic over this range' },
    ],
    correctChoiceId: 'E',
    explanation:
      'Quantity: +2,000 over an average of 10,000 is +20%. Price: +$4 over an average of $20 is +20%. The ratio is ' +
      'exactly 1, so supply is unit elastic: quantity responds in the same proportion as price.',
    distractorNotes: {
      B: 'This is the percentage change in quantity alone, not divided by the percentage change in price.',
      C: 'The arithmetic is right and the label is wrong. Elastic means greater than 1; exactly 1 is the unit elastic boundary.',
      D: 'This is 22 ÷ 18 — a ratio of the two prices, not a percentage change, and the quantities never enter it.',
      A:
        'This is 2,000 units ÷ $4, the raw slope. Elasticity is built from percentages precisely so that it does not ' +
        'depend on whether you count pallets or dozens of pallets.',
    },
  },
  {
    id: 'micro-u2-09',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-pes',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 85,
    stem:
      'A factory runs at full capacity, has no idle equipment, and needs two years to build a new production line. ' +
      'Which statement about the supply of its output is best supported?',
    choices: [
      { id: 'A', text: 'Supply is more price elastic in the short run, because firms react to price immediately.' },
      { id: 'B', text: 'Supply is more price inelastic in the short run than in the long run.' },
      { id: 'C', text: 'Price elasticity of supply is zero, because output cannot be changed at all.' },
      { id: 'D', text: 'Supply is perfectly inelastic at every price.' },
      { id: 'E', text: 'Price elasticity of supply depends only on how many substitutes buyers have.' },
    ],
    correctChoiceId: 'B',
    explanation:
      'Elasticity of supply is about how quickly producers can change output, and that depends on how much they can ' +
      'change their inputs. In the short run the plant is fixed, so a higher price buys only overtime and extra shifts. ' +
      'Given two years, the firm can build the line — the same price rise then produces a much larger quantity response.',
    distractorNotes: {
      A: 'Reverses the time relationship. Reacting quickly is not the same as being able to expand quickly.',
      C:
        'Full capacity is not literally zero flexibility: extra shifts, overtime and deferred maintenance all raise ' +
        'output somewhat. Zero elasticity is a limiting case, not a description of a busy factory.',
      D: 'Overstates in two ways — "perfectly" and "at every price". A high enough price will eventually call forth more output.',
      E: 'Substitutes available to buyers determine elasticity of demand. Supply elasticity turns on the producer’s constraints.',
    },
  },

  // ── 2.5 Other Elasticities ───────────────────────────────────────────────
  {
    id: 'micro-u2-10',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-other-elasticities',
    skill: 'calculation',
    difficulty: 3,
    targetSeconds: 105,
    stem:
      'When average household income rises from $48,000 to $52,000, a supermarket’s weekly sales of own-brand instant ' +
      'noodles fall from 6,200 to 5,800 packs. Using the midpoint method, the income elasticity of demand is closest to:',
    choices: [
      { id: 'A', text: '−1.20, and the noodles are an inferior good' },
      { id: 'B', text: '−0.83, and the noodles are a normal good' },
      { id: 'C', text: '+0.83, and the noodles are a normal good' },
      { id: 'D', text: '−0.83, and the noodles are an inferior good' },
      { id: 'E', text: '−0.07, and the noodles are an inferior good' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Quantity: −400 over an average of 6,000 is −6.67%. Income: +$4,000 over an average of $50,000 is +8%. The ratio ' +
      'is −0.83. The sign is what classifies the good: buyers move away from these noodles as they get richer, which is ' +
      'exactly what "inferior" means. The size, below 1, says the move is modest.',
    distractorNotes: {
      B: 'The arithmetic is right, the label is not. A normal good has a positive income elasticity by definition.',
      C: 'Drops the minus sign. With income elasticity the sign is not a detail — it is the entire classification.',
      A: 'This is the reciprocal, 8 ÷ 6.67. The percentage change in income belongs on the bottom.',
      E: 'This is the percentage change in quantity alone, left undivided.',
    },
  },
  {
    id: 'micro-u2-11',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-other-elasticities',
    skill: 'calculation',
    difficulty: 2,
    targetSeconds: 80,
    stem:
      'The price of butter rises by 12%, and as a result the quantity of margarine demanded rises by 6%. The ' +
      'cross-price elasticity of demand for margarine with respect to the price of butter is:',
    choices: [
      { id: 'A', text: '+0.5, and the two goods are substitutes' },
      { id: 'B', text: '−0.5, and the two goods are complements' },
      { id: 'C', text: '+2.0, and the two goods are substitutes' },
      { id: 'D', text: '+0.5, and the two goods are complements' },
      { id: 'E', text: '+0.5, and margarine is a normal good' },
    ],
    correctChoiceId: 'A',
    explanation:
      'Cross-price elasticity is the percentage change in the quantity of one good divided by the percentage change in ' +
      'the price of another: +6 ÷ +12 = +0.5. A positive sign means the goods move together — when butter gets dearer ' +
      'people buy more margarine — and that is the definition of substitutes.',
    distractorNotes: {
      B: 'Both quantities moved in the same direction, so the ratio cannot be negative. Complements give a negative cross-price elasticity.',
      C: 'This is the reciprocal, 12 ÷ 6. The price change of the *other* good goes on the bottom.',
      D: 'The number is right and the label contradicts it: a positive cross-price elasticity means substitutes.',
      E: 'Normal and inferior are classifications from *income* elasticity. Nothing here says anything about income.',
    },
  },

  // ── 2.6 Market Equilibrium, Consumer and Producer Surplus ────────────────
  {
    id: 'micro-u2-12',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-equilibrium-surplus',
    skill: 'graphing',
    difficulty: 3,
    targetSeconds: 115,
    stem:
      'The diagram shows a competitive market, with price in dollars and quantity in units per day. What is consumer ' +
      'surplus at the market equilibrium?',
    stimulus: {
      kind: 'diagram',
      component: 'SupplyDemand',
      props: {
        lines: MARKET_LINES,
        points: [{ id: 'eq', x: 40, y: 40, label: 'E', guides: true, labelDx: 10, labelDy: -8 }],
        axisValues: [
          { axis: 'y', at: 80, text: '80' },
          { axis: 'y', at: 40, text: '40' },
          { axis: 'y', at: 20, text: '20' },
          { axis: 'x', at: 40, text: '40' },
        ],
        xLabel: 'Quantity',
        yLabel: 'Price ($)',
        description: MARKET_DESC,
      },
    },
    choices: [
      { id: 'A', text: '$1,200' },
      { id: 'B', text: '$400' },
      { id: 'C', text: '$800' },
      { id: 'D', text: '$1,600' },
      { id: 'E', text: '$2,400' },
    ],
    correctChoiceId: 'C',
    explanation:
      'Consumer surplus is the triangle between the demand curve and the price paid, out to the quantity traded. Its ' +
      'height is the demand intercept minus the equilibrium price, 80 − 40 = 40, and its base is the equilibrium ' +
      'quantity, 40. One half of 40 × 40 is $800.',
    distractorNotes: {
      B: 'This is producer surplus: the triangle *below* the price and above supply, ½ × 40 × (40 − 20) = $400.',
      A: 'This is total surplus, $800 + $400. The question asked for the buyers’ share of it.',
      D:
        'This is 40 × 40 — what buyers actually paid. Money that changes hands is not surplus; surplus is the value ' +
        'received over and above it.',
      E:
        'This is the whole area under the demand curve out to 40 units, the total value buyers place on those units. ' +
        'Subtract the $1,600 they paid and you get the $800 of surplus.',
    },
  },
  {
    id: 'micro-u2-13',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-equilibrium-surplus',
    skill: 'conceptual',
    difficulty: 3,
    targetSeconds: 90,
    stem:
      'In a competitive market with no externalities, total surplus is largest at the equilibrium quantity. Which of ' +
      'the following best explains why producing one unit *beyond* that quantity would reduce total surplus?',
    choices: [
      { id: 'A', text: 'Consumer surplus falls, because more units are being consumed.' },
      { id: 'B', text: 'The buyer of that unit values it less than the resources used to produce it.' },
      { id: 'C', text: 'Producers would have to cut the price, which reduces producer surplus.' },
      { id: 'D', text: 'The extra unit would create a shortage in the market.' },
      { id: 'E', text: 'Total revenue would fall, and total revenue is what total surplus measures.' },
    ],
    correctChoiceId: 'B',
    explanation:
      'Beyond the equilibrium quantity the demand curve lies below the supply curve: the value of the next unit to a ' +
      'buyer is less than its marginal cost. Making it converts resources worth more into a good worth less, and the ' +
      'gap is a loss of total surplus. Equilibrium is efficient exactly because it is where that gap closes.',
    distractorNotes: {
      A: 'Consuming more units does not by itself reduce consumer surplus — each unit a buyer values above its price adds to it.',
      C: 'A statement about the split of surplus between the two sides, not about the total. Transfers between them cancel out.',
      D: 'A shortage means buyers want more than is offered. Producing extra units is the opposite situation.',
      E: 'Total surplus is value received minus cost incurred, not revenue. Revenue is a payment from one side to the other.',
    },
  },

  // ── 2.7 Market Disequilibrium and Changes in Equilibrium ─────────────────
  {
    id: 'micro-u2-14',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-disequilibrium',
    skill: 'graphing',
    difficulty: 3,
    targetSeconds: 110,
    stem: 'In the market shown, the price is currently $55. Which of the following describes the situation?',
    stimulus: {
      kind: 'diagram',
      component: 'SupplyDemand',
      props: {
        lines: MARKET_LINES,
        points: [{ id: 'eq', x: 40, y: 40, label: 'E', guides: true, labelDx: 10, labelDy: -8 }],
        priceLines: [{ at: 55, label: 'P = 55' }],
        axisValues: [
          { axis: 'y', at: 80, text: '80' },
          { axis: 'y', at: 55, text: '55' },
          { axis: 'y', at: 40, text: '40' },
          { axis: 'y', at: 20, text: '20' },
          { axis: 'x', at: 40, text: '40' },
        ],
        xLabel: 'Quantity',
        yLabel: 'Price ($)',
        description: `${MARKET_DESC} A horizontal line marks a price of 55 dollars, above the crossing point.`,
      },
    },
    choices: [
      { id: 'A', text: 'Equilibrium, because both buyers and sellers are active at $55' },
      { id: 'B', text: 'A shortage of 45 units, and upward pressure on the price' },
      { id: 'C', text: 'A surplus of 70 units, and downward pressure on the price' },
      { id: 'D', text: 'A surplus of 25 units, and downward pressure on the price' },
      { id: 'E', text: 'A surplus of 45 units, and downward pressure on the price' },
    ],
    correctChoiceId: 'E',
    explanation:
      'Read both curves at $55. On demand, p = 80 − q gives q = 25. On supply, p = 20 + 0.5q gives q = 70. Sellers want ' +
      'to sell 70 and buyers want 25, so 45 units go unsold — a surplus. Unsold stock pushes sellers to cut the price, ' +
      'and it falls back towards $40.',
    distractorNotes: {
      B:
        'Right size, wrong direction. Above the equilibrium price the long side is supply, so the excess is a surplus, ' +
        'and the price is pushed down rather than up.',
      C: 'This is quantity supplied at $55, not the gap between the two sides.',
      D: 'This is quantity demanded at $55, again one side rather than the difference.',
      A: 'Trade happening is not equilibrium. Equilibrium is the single price at which the two quantities are equal.',
    },
  },
  {
    id: 'micro-u2-15',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-disequilibrium',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 100,
    stem:
      'In the market for domestic air travel, jet fuel becomes much cheaper and at the same time a recession reduces ' +
      'household incomes. Air travel is a normal good. Which of the following is certain?',
    choices: [
      { id: 'A', text: 'The equilibrium quantity falls.' },
      { id: 'B', text: 'The equilibrium price rises.' },
      { id: 'C', text: 'The equilibrium quantity rises.' },
      { id: 'D', text: 'The equilibrium price falls.' },
      { id: 'E', text: 'Both the equilibrium price and the equilibrium quantity fall.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'Cheaper fuel shifts supply right: price down, quantity up. Lower income shifts demand for a normal good left: ' +
      'price down, quantity down. The two shifts push price the same way, so price certainly falls. They push quantity ' +
      'in opposite directions, so quantity depends on which shift is larger — and nothing in the question says.',
    distractorNotes: {
      B: 'Both shifts push price down; neither pushes it up.',
      C: 'This is the outcome only if the supply shift dominates. The question gives no way to know.',
      A: 'This is the outcome only if the demand shift dominates. Nothing in the question says which shift is larger.',
      E:
        'Half right. The price part is certain, the quantity part is not, and "certain" has to cover the whole ' +
        'statement. When two shifts oppose each other, exactly one of price and quantity is determinate.',
    },
  },

  // ── 2.8 The Effects of Government Intervention in Markets ────────────────
  {
    id: 'micro-u2-16',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-intervention',
    skill: 'graphing',
    difficulty: 3,
    targetSeconds: 115,
    stem:
      'The government imposes a price ceiling of $30 in the market shown. Which of the following describes the result?',
    stimulus: {
      kind: 'diagram',
      component: 'SupplyDemand',
      props: {
        lines: MARKET_LINES,
        points: [{ id: 'eq', x: 40, y: 40, label: 'E', guides: true, labelDx: 10, labelDy: -8 }],
        priceLines: [{ at: 30, label: 'Ceiling = 30' }],
        axisValues: [
          { axis: 'y', at: 80, text: '80' },
          { axis: 'y', at: 40, text: '40' },
          { axis: 'y', at: 30, text: '30' },
          { axis: 'y', at: 20, text: '20' },
          { axis: 'x', at: 40, text: '40' },
        ],
        xLabel: 'Quantity',
        yLabel: 'Price ($)',
        description: `${MARKET_DESC} A horizontal line marks a price ceiling of 30 dollars, below the crossing point.`,
      },
    },
    choices: [
      { id: 'A', text: 'A shortage of 30 units, with 20 units actually traded' },
      { id: 'B', text: 'A shortage of 30 units, with 50 units actually traded' },
      { id: 'C', text: 'A shortage of 50 units, with 20 units actually traded' },
      { id: 'D', text: 'A surplus of 30 units, with 50 units actually traded' },
      { id: 'E', text: 'No effect, because $30 lies below the equilibrium price' },
    ],
    correctChoiceId: 'A',
    explanation:
      'At $30 buyers want 80 − 30 = 50 units and sellers offer (30 − 20) ÷ 0.5 = 20, so the shortage is 30. Only 20 ' +
      'change hands: nobody can be forced to sell, so the short side of the market determines the quantity traded. That ' +
      'is why a ceiling reduces the number of transactions even though it was meant to help buyers.',
    distractorNotes: {
      B:
        'The shortage is right, the quantity traded is not. 50 is what buyers *want*; sellers only bring 20 to market, ' +
        'and trade cannot exceed what is offered.',
      C: 'This reports quantity demanded as though it were the shortage. The shortage is the gap between the two sides.',
      D: 'A ceiling below equilibrium creates a shortage. Surpluses come from price floors set above equilibrium.',
      E:
        'Inverts the rule. A ceiling binds precisely when it is *below* the equilibrium price; one set above it would ' +
        'be the harmless case.',
    },
  },
  {
    id: 'micro-u2-17',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-intervention',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 95,
    stem:
      'A per-unit tax is imposed on the sellers of a good whose demand is much less elastic than its supply. Which of ' +
      'the following is true?',
    choices: [
      { id: 'A', text: 'The tax creates no deadweight loss, because demand is inelastic.' },
      { id: 'B', text: 'Sellers bear most of the burden, because the tax is collected from them.' },
      { id: 'C', text: 'The burden is shared equally, because the tax is the same on every unit.' },
      { id: 'D', text: 'The price buyers pay rises by the full amount of the tax.' },
      { id: 'E', text: 'Buyers bear most of the burden of the tax.' },
    ],
    correctChoiceId: 'E',
    explanation:
      'The side of the market that can least easily walk away pays most of the tax. Here that is buyers: with inelastic ' +
      'demand they keep buying as the price rises, while elastic supply means sellers would rather cut output than ' +
      'absorb the tax. Who hands the money to the government is irrelevant to who ends up poorer.',
    distractorNotes: {
      B:
        'Confuses legal incidence with economic incidence — the most tested idea in this topic. A tax on sellers and an ' +
        'identical tax on buyers produce exactly the same outcome.',
      C: 'The split is set by relative elasticities, not by the fact that the tax is a fixed amount per unit.',
      D: 'That happens only in the limiting case of perfectly inelastic demand or perfectly elastic supply. "Much less elastic" is not "perfectly".',
      A:
        'Inelastic demand makes deadweight loss *smaller*, because quantity falls less. It is zero only if quantity ' +
        'does not fall at all.',
    },
  },
  {
    id: 'micro-u2-18',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-intervention',
    skill: 'conceptual',
    difficulty: 2,
    targetSeconds: 75,
    stem:
      'A binding minimum wage is introduced in a competitive labour market. Which of the following is the most direct ' +
      'consequence?',
    choices: [
      { id: 'A', text: 'No change in employment, because the wage is set by law' },
      { id: 'B', text: 'A shortage of labour, because firms want to hire more at a higher wage' },
      { id: 'C', text: 'A surplus of labour — that is, unemployment — at the minimum wage' },
      { id: 'D', text: 'A leftward shift of the demand curve for labour' },
      { id: 'E', text: 'A rightward shift of the supply curve of labour' },
    ],
    correctChoiceId: 'C',
    explanation:
      'A binding minimum wage is a price floor above the market-clearing wage. Above that wage more people want to work ' +
      'and firms want to hire fewer, so quantity supplied exceeds quantity demanded. That gap is the surplus, and in a ' +
      'labour market a surplus has a name: unemployment.',
    distractorNotes: {
      B: 'Reverses the law of demand. A higher wage makes firms want to hire fewer workers, not more.',
      A: 'A price set by law still changes the quantities both sides choose. That is precisely the effect.',
      D:
        'A price control does not shift either curve. Both stay where they are; the market is simply held at a price ' +
        'off the intersection.',
      E: 'A price control does not shift supply either. More people wanting work at a higher wage is movement *along* it.',
    },
  },

  // ── 2.9 International Trade and Public Policy ────────────────────────────
  {
    id: 'micro-u2-19',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-trade',
    skill: 'graphing',
    difficulty: 3,
    targetSeconds: 115,
    stem:
      'The diagram shows a country’s domestic market for a good. The country now opens to free trade at a world price ' +
      'of $28. How many units are imported?',
    stimulus: {
      kind: 'diagram',
      component: 'SupplyDemand',
      props: {
        lines: MARKET_LINES,
        points: [{ id: 'eq', x: 40, y: 40, label: 'E', guides: true, labelDx: 10, labelDy: -8 }],
        priceLines: [{ at: 28, label: 'World price = 28' }],
        axisValues: [
          { axis: 'y', at: 80, text: '80' },
          { axis: 'y', at: 40, text: '40' },
          { axis: 'y', at: 28, text: '28' },
          { axis: 'y', at: 20, text: '20' },
          { axis: 'x', at: 40, text: '40' },
        ],
        xLabel: 'Quantity',
        yLabel: 'Price ($)',
        description: `${MARKET_DESC} A horizontal line marks a world price of 28 dollars, below the crossing point.`,
      },
    },
    choices: [
      { id: 'A', text: '16 units' },
      { id: 'B', text: '36 units' },
      { id: 'C', text: '52 units' },
      { id: 'D', text: '12 units' },
      { id: 'E', text: 'None, because the world price is below the domestic price' },
    ],
    correctChoiceId: 'B',
    explanation:
      'At the world price of $28, domestic buyers want 80 − 28 = 52 units and domestic sellers offer (28 − 20) ÷ 0.5 = ' +
      '16. Imports fill the gap between what the country consumes and what it produces: 52 − 16 = 36 units.',
    distractorNotes: {
      A: 'This is domestic quantity supplied at the world price — what the country still makes itself, not what it brings in.',
      C: 'This is domestic quantity demanded, which is total consumption. Part of it is met by domestic producers.',
      D: 'This is the increase in quantity demanded compared with the old equilibrium, 52 − 40. Imports are measured against domestic production, not against the old quantity.',
      E:
        'Inverts the condition for trade. A country imports precisely when the world price is *below* what it would cost ' +
        'to clear the market domestically.',
    },
  },
  {
    id: 'micro-u2-20',
    subject: 'micro',
    unitId: 'micro-2',
    topicId: 'micro-2-trade',
    skill: 'analysis',
    difficulty: 3,
    targetSeconds: 100,
    stem:
      'A country that imports a good imposes a tariff on it. Compared with free trade, which of the following occurs?',
    choices: [
      { id: 'A', text: 'Domestic production is unchanged; only government revenue changes.' },
      { id: 'B', text: 'Domestic production rises, imports fall, and total surplus rises.' },
      { id: 'C', text: 'Domestic production falls, imports rise, and consumer surplus rises.' },
      { id: 'D', text: 'Domestic production rises, imports fall, and consumer surplus falls.' },
      { id: 'E', text: 'Consumer surplus falls by exactly the amount of tariff revenue collected.' },
    ],
    correctChoiceId: 'D',
    explanation:
      'A tariff raises the price inside the country. Domestic producers respond by making more, domestic buyers by ' +
      'buying less, and imports — the gap between the two — shrink from both ends. Buyers pay more for less, so ' +
      'consumer surplus falls.',
    distractorNotes: {
      B:
        'Producers and the government do gain, but buyers lose more than both gains together. The difference is two ' +
        'deadweight loss triangles, so total surplus falls.',
      C: 'Reverses every effect. A higher domestic price cannot reduce domestic production or raise consumption.',
      A: 'Domestic producers face a higher price and move along their supply curve, so production certainly changes.',
      E:
        'Consumer surplus falls by more than the revenue collected. What buyers lose is split three ways: to producers, ' +
        'to the government, and to deadweight loss that goes to no one.',
    },
  },
];

export const microUnit2TopicTitles: Record<string, string> = {
  'micro-2-demand': '2.1 Demand',
  'micro-2-supply': '2.2 Supply',
  'micro-2-ped': '2.3 Price Elasticity of Demand',
  'micro-2-pes': '2.4 Price Elasticity of Supply',
  'micro-2-other-elasticities': '2.5 Other Elasticities',
  'micro-2-equilibrium-surplus': '2.6 Market Equilibrium and Surplus',
  'micro-2-disequilibrium': '2.7 Disequilibrium and Changes in Equilibrium',
  'micro-2-intervention': '2.8 Government Intervention in Markets',
  'micro-2-trade': '2.9 International Trade and Public Policy',
};
