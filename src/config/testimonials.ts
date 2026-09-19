/**
 * Отзывы бывших учеников — дословно, с её прежнего сайта на Wix.
 *
 * ОТКУДА ТЕКСТ. Страница «About Olganomics» → блок «Students Results»:
 * четыре карточки-картинки. Текст с них переписан слово в слово, включая
 * пунктуацию, тире без пробелов и эмодзи. Отзыв Гаклин дополнительно сверен с
 * исходным сообщением из Instagram, скриншот которого стоит на странице
 * «Students Results» — совпадает до знака.
 *
 * ЧЕГО ЗДЕСЬ НЕТ И НЕ ДОЛЖНО БЫТЬ.
 *
 * — Отзывов со страницы «Students Results» из блока «Testimonials»: David Lee,
 *   Jane Smith, Maria Garcia, Sophia Patel. Это заглушки шаблона Wix про
 *   некую «Leadsult Consulting», к Ольге отношения не имеют.
 *
 * — Коротких цитат из левой колонки карточек («Every concept became easier to
 *   understand», «Great foundation for university and beyond»). Это пересказ
 *   того, кто верстал карточки, а не слова учеников: у Монтасера — «made every
 *   concept much easier», у Базеля «and beyond» нет вовсе. В кавычках на сайте
 *   стоят только настоящие слова.
 *
 * — Звёзд и «Highly Recommended». На карточках это украшение, а не оценка с
 *   какой-то площадки; пять звёзд без площадки обещают рейтинг, которого нет.
 *
 * — Фотографий. Две из четырёх — мультяшные аватары, одна — снимок двух
 *   маленьких детей; вперемешку с настоящим фото это выглядит случайно, а
 *   имя с тем, где человек сейчас, доверие даёт лучше лица.
 *
 * ПРАВКИ ТЕКСТА — ровно одна. У Базеля первое предложение оборвано на самой
 * карточке: «Miss Olga is a wonderful economics.» Дописывать за него слово
 * нельзя, поэтому цитата начинается со второго предложения. Выброшена
 * похвала, а не критика — смысл отзыва не меняется.
 *
 * ЗНАК ® В ЦИТАТАХ НЕ СТАВИМ. Везде на сайте он стоит при каждом упоминании
 * AP, но внутри цитаты это правка чужих слов. Атрибуцию товарного знака
 * несёт дисклеймер в подвале каждой страницы; в наших подписях к цитатам
 * (строка «что он сейчас делает») знак стоит, как везде.
 *
 * ПРЕЖДЕ ЧЕМ ПУБЛИКОВАТЬ: имена стоят полностью, как на её сайте. Ольга
 * должна подтвердить, что ученики не против появиться на новом сайте, —
 * особенно те, кто ещё учится в школе.
 */

export interface Testimonial {
  name: string;
  /** Где человек сейчас — наша подпись, не цитата. */
  now: string;
  /** Первое предложение цитаты — крупно, засечками. */
  lead: string;
  /** Остальной текст по абзацам, как на карточке. */
  body: string[];
}

/**
 * Порядок не случайный. Первыми — три коротких отзыва про то, куда ученики
 * пошли дальше (университет, медицина, экономика в вузе): раздел для
 * родителей обещает «path to top universities», и это его доказательство.
 * Последним — длинный отзыв Монтасера: он единственный подробно описывает,
 * как устроены занятия, и получает широкую карточку, где длина читается
 * легко.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Tawfiq Al Khoury',
    // Одна строка, как у остальных: две строки у одного из трёх сдвигали
    // линию над именем, и подписи в ряду переставали стоять вровень.
    now: 'Georgetown University in Qatar',
    lead: 'Dr. Olga’s AP Economics class made me genuinely fall in love with economics.',
    body: [
      'Her passion for the subject was inspiring, and she had a way of making every topic engaging, relevant, and easy to understand.',
      'Beyond helping me succeed academically, her class sparked my interest in pursuing economics in the future. I’m truly grateful for her support, encouragement, and the lasting impact she has had on my educational journey.',
    ],
  },
  {
    name: 'Gaklin Ammari',
    now: 'Fourth-year medical student',
    lead: 'Taking your AP Microeconomics class was one of the best experiences I had in high school.',
    body: [
      'You made complex concepts easy to understand and encouraged us to think critically rather than just memorize. Even though I’m now a fourth year medical student, I still appreciate the analytical skills and discipline I developed in your class.',
      'Thank you for being such an inspiring teacher and for the positive impact you had on my academic journey. Wishing you the best! 🌟',
    ],
  },
  {
    name: 'Basel Zurub',
    now: 'Future economics major',
    lead: 'Her help was invaluable when it came to the AP tests.',
    body: [
      'The material is hard, and you definitely need to put in a lot of effort, but Miss Olga was able to help us prepare as best as possible. Her class provided me with a great foundation for further economics classes I’m taking in university!',
    ],
  },
  {
    name: 'Montaser Oran KA',
    now: 'AP® Economics student',
    lead: 'A very ambitious and dedicated teacher.',
    body: [
      'I had never had the opportunity to learn AP Economics this way before. At first, I thought the pace would be difficult since we were taking both Micro and Macro in the same year, but surprisingly, it wasn’t. The worksheets after every class, followed by solving them together, made every concept much easier to understand.',
      'The quizzes after each lesson were a great way to check our understanding, and the topic-specific MCQs and FRQs for every unit helped us prepare really well. The board notes were always an amazing reference for all the graphs and concepts we needed. There was always support whenever anyone had a question or needed help. I genuinely recommend this class to anyone considering taking AP Economics—I really think everyone should take a class with her. I’m truly grateful for everything I learned this year and for all the effort that went into making the class so enjoyable and effective.',
    ],
  },
];
