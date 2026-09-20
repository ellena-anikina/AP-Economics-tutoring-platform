/**
 * Данные преподавателя.
 *
 * Всё взято с её собственного сайта olgashalamaiwba.wixsite.com — ничего не
 * додумано. Степеней и университетов там не указано, поэтому их нет и здесь:
 * выдуманные регалии обесценивают настоящие.
 *
 * Ссылки на тот сайт здесь нет и быть не должно: сайт преподавателя — этот.
 * Вести с него на второй, более слабый, значит уводить тёплого посетителя
 * ровно в тот момент, когда он готов написать. Адрес выше — только пометка
 * об источнике текстов, а не ссылка для читателя.
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
  // Instagram — для школьников, Facebook — для родителей. Разные аудитории
  // сидят в разных местах, и на экране результатов они разведены так же.
  instagram: '@olganomics5',
  instagramUrl: 'https://www.instagram.com/olganomics5/',
  facebookUrl: 'https://www.facebook.com/um.naji.37',

  /* ЧЕМ ПОЛЕЗЕН КАЖДЫЙ АККАУНТ — её словами, и только её.
   *
   * Пустая строка — подпись не выводится, остаётся одно название. Так и
   * должно быть по умолчанию: мы не знаем, что и где она публикует. Здесь
   * уже стояло выдуманное «Where I post for students» / «for parents» —
   * оно выросло из нашего же решения, какой канал кому показывать, и было
   * принято за знание о её аккаунтах. Обещание на сайте, которое некому
   * сдержать, хуже отсутствия подписи. */
  instagramNote: '',
  facebookNote: '',

  /** Что она выкладывает в соцсетях — одной фразой, её словами. Пусто —
   *  на экране результатов остаётся только то, за что отвечаем мы сами:
   *  новые тесты по юнитам.
   *
   *  Знак ® ставится прямо в строке: её пропускают через Reg, который сам
   *  сделает его надстрочным и привяжет к «AP» неразрывно. */
  socialBlurb:
    'AP® Economics tips, practice questions, exam advice, and useful resources to help you stay on track with your preparation.',

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

  /** Предложение звонка школьнику — на экране результатов. И/или родитель:
   *  решение о занятиях принимают вместе, но первый звонок бесплатный,
   *  поэтому школьник может записаться и один. */
  sessionOffer:
    'The first 15-minute session is free — just you, or with a parent if you would like.',

  /* Родительский блок. Тексты отдельные, а не общие с экраном результатов:
     там читает школьник, здесь — сам родитель. Из-за одной строки на двоих
     в родительском блоке стояло «go through these results with a parent» —
     родителю предлагали прийти с родителем, да ещё и обсудить результаты
     теста, которого он не проходил. */

  /** Её заголовок с её сайта. */
  parentHeadline: 'Strengthen your child’s path to top universities',

  /** Её же текст: узнаваемая картина, названная её словами. */
  parentPitch:
    'Poor AP® preparation can quietly cost a strong student university opportunities. The pattern is familiar: ' +
    '“I’ll start tomorrow”, preparation postponed to the final weeks, then energy drinks and last-minute cramming.',

  /** Возражение родителя — «а вдруг я зря волнуюсь». Без ответа на него
   *  предыдущий абзац остаётся тревогой без выхода. */
  parentBlindSpot:
    'School marks rarely show it in time. AP® questions are built differently from classroom tests, and a student ' +
    'who is comfortable in lessons can still be losing marks — without knowing on which topics.',

  /** Предложение звонка родителю. «С вами, с ребёнком или вместе» —
   *  решение о занятиях принимается вдвоём, и звать надо обоих.
   *
   *  ЛИЦО. Текст страниц — её прямая речь, первое лицо: «I have spent ten
   *  years…», «we go through them together», «write to me». Третье лицо
   *  («write to her») превращает сайт в рассказ о ней и ставит дистанцию
   *  там, где родитель как раз выбирает человека. Третье лицо остаётся
   *  только в подписях — «Written by Dr. Olga Shalamai» и имя в карточке:
   *  там это знак объективности, как подпись автора в журнале. */
  parentSessionOffer:
    'If you would rather talk first, the first 15-minute session is free — with you, with your child, or with both ' +
    'of you.',

  /** Что происходит на бесплатной консультации — для страницы записи.
   *
   *  Дословно её ответ на вопрос 49 из «50 Questions and Answers»
   *  (QUESTIONS.md). Вопросы 46–49 по тому документу публикуются только после
   *  её проверки — этот текст вместе со страницей записи она утвердила 20.09.
   *  Правится только с ней. */
  consultationWhatHappens:
    'We’ll talk about your course, what you’re finding difficult and what you want help with. If you have recent ' +
    'work or diagnostic results, those can make the conversation more useful. The aim is to identify a sensible ' +
    'next step, whether that’s focused practice or a suitable lesson option. You can also ask me about how the ' +
    'lessons work.',

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
