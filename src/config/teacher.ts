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

  /** Файл в public/. Если его нет, карточка сама покажет монограмму. */
  photo: '/olga.jpg',
  photoAlt: 'Dr. Olga Shalamai',
  siteUrl: 'https://olgashalamaiwba.wixsite.com/my-site-1',

  credentialLine: 'More than 10 years teaching economics · AP® Micro and AP® Macro',

  bio:
    'I have spent more than ten years teaching economics and preparing students for AP® Microeconomics and ' +
    'AP® Macroeconomics, and have helped hundreds of students build real economic thinking rather than memorised answers.',

  /** Её собственная формулировка подхода. */
  approach:
    'My teaching combines clear explanations, structured preparation, continuous support and proven exam strategies — ' +
    'understanding rather than memorisation.',

  /** Что получает человек на бесплатном звонке. Конкретика вместо «обсудим». */
  consultationPromise: [
    'We go through the topics this test flagged, one by one',
    'You get a plain-English explanation of what went wrong and why',
    'You leave with a specific plan for the next two weeks',
  ],

  /** Для родительского блока — её язык с её сайта. */
  parentHeadline: 'Strengthen your child’s path to top universities',
  parentPitch:
    'Poor AP® preparation can quietly cost a strong student university opportunities. The pattern is familiar: ' +
    '“I’ll start tomorrow”, preparation postponed to the final weeks, then energy drinks and last-minute cramming.',

  /** Её список результатов, дословно с её сайта. */
  outcomes: [
    'Higher AP® Economics scores',
    'Stronger university applications',
    'A clear study plan',
    'Deep understanding of economics concepts instead of memorisation',
    'Reduced stress for both students and parents',
  ],
} as const;
