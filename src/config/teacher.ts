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

  /** Предложение звонка. И/или родитель: решение о занятиях принимают вместе. */
  sessionOffer:
    'Free 15-minute session to go through these results — on your own, with a parent, or both together.',

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
