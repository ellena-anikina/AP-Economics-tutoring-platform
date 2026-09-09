/**
 * Данные преподавателя.
 *
 * Всё взято с её собственного сайта olgashalamaiwba.wixsite.com — ничего не
 * додумано. Степеней и университетов там не указано, поэтому их нет и здесь:
 * выдуманные регалии обесценивают настоящие.
 *
 * Заметьте разницу в адресатах: её сайт написан для РОДИТЕЛЕЙ («You paid
 * thousands of dollars in your child's education»), а наш тест проходит
 * ШКОЛЬНИК. Поэтому её формулировки живут в родительской части экрана
 * результатов, а не в той, что видит ученик сразу после теста.
 */
export const TEACHER = {
  name: 'Dr. Olga Shalamai',
  shortName: 'Dr. Shalamai',
  initials: 'OS',
  role: 'AP® Economics instructor',
  brand: 'Olganomics',
  program: 'Econ5',

  /** Квадратный кадр для круглого аватара. Если файла нет — монограмма. */
  photo: '/olga.jpg',
  /** Вертикальный портрет 3:4 для главной, где фото должно быть крупным. */
  photoPortrait: '/olga-portrait.jpg',
  photoAlt: 'Dr. Olga Shalamai',
  siteUrl: 'https://olgashalamaiwba.wixsite.com/my-site-1',
  // Instagram — для школьников, Facebook — для родителей. Разные аудитории
  // сидят в разных местах, и на экране результатов они разведены так же.
  instagram: '@olganomics5',
  instagramUrl: 'https://www.instagram.com/olganomics5/',
  facebookUrl: 'https://www.facebook.com/um.naji.37',

  credentialLine: 'More than 10 years teaching economics · AP® Micro and AP® Macro',

  /** Одно предложение. Длинная биография на экране результатов только мешает
   *  добраться до контактов — подробности живут на её сайте. */
  bio:
    'Hundreds of students prepared for the AP® exams — built on understanding rather than memorisation.',

  /** Её собственная формулировка подхода — для главной. */
  approach:
    'My teaching combines clear explanations, structured preparation, continuous support and proven exam strategies — ' +
    'understanding rather than memorisation.',

  /** Заголовок главной. Её фраза с сайта, только «AP» приведено к правилам знака. */
  homeHeadline: 'Find out how to reach a 5 in AP® Economics',
  homeSubhead:
    'Start with a free diagnostic. Fifteen exam-style questions show exactly which topics are costing you marks — ' +
    'then we go through them together.',

  /** Предложение звонка. И/или родитель: решение о занятиях принимают вместе. */
  sessionOffer:
    'Free 15-minute session to go through these results — on your own, with a parent, or both together.',

  /** Для родительского блока — её язык с её сайта. */
  parentHeadline: 'Strengthen your child’s path to top universities',
  parentPitch:
    'Poor AP® preparation can quietly cost a strong student university opportunities. The pattern is familiar: ' +
    '“I’ll start tomorrow”, preparation postponed to the final weeks, then energy drinks and last-minute cramming.',

  outcomesHeading: 'What students achieve with Olganomics',

  /** Её список результатов, дословно с её сайта. */
  outcomes: [
    'Higher AP® Economics scores',
    'Stronger university applications',
    'A clear study plan',
    'Deep understanding of economics concepts instead of memorisation',
    'Reduced stress for both students and parents',
    'Confidence going into the exam',
  ],
} as const;
