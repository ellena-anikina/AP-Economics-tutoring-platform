import Reg from '@/components/Reg';
import ReviewBody from '@/components/ReviewBody';
import { TESTIMONIALS, type Testimonial } from '@/config/testimonials';

/**
 * Отзывы бывших учеников на главной.
 *
 * ГДЕ СТОИТ И ПОЧЕМУ ИМЕННО ТАМ. Между списком «What students achieve» и
 * разделом для родителей. Порядок страницы получается таким: обещание →
 * доказательство → просьба. Список результатов — это слова преподавателя о
 * себе; отзывы сразу за ним — те же результаты словами учеников; и только
 * потом родителю предлагают записаться. Отзыв, поставленный после кнопки
 * записи, доказывает то, о чём уже попросили, — это поздно. Поставленный
 * над блоком тестов — отодвигает главное действие страницы вниз.
 *
 * ПОЧЕМУ БЕЗ БОКОВОЙ КОЛОНКИ. Остальные разделы главной — заголовок слева,
 * текст справа. Здесь заголовок сверху, а карточки занимают всю ширину: так
 * раздел отличается от соседей формой (как блок подписок на экране
 * результатов), и в ширину помещаются три отзыва рядом. В колонке справа
 * их осталось бы по 230 пикселей — узкий столбик в пятнадцать строк.
 *
 * ТРИ РЯДОМ И ОДИН ШИРОКИЙ. Три коротких отзыва почти равны по длине
 * (60–75 слов) и встают ровным рядом. Четвёртый втрое длиннее: в том же
 * ряду он растянул бы соседей пустотой, а обрезать его жалко — он
 * единственный, кто описывает сами занятия. Поэтому он получает всю ширину:
 * первое предложение крупно слева, остальной текст справа.
 *
 * СЕМАНТИКА. figure → blockquote + figcaption: так цитата и её автор
 * связаны и для экранных читалок, и для поисковиков.
 */
export default function Testimonials() {
  const short = TESTIMONIALS.slice(0, 3);
  const wide = TESTIMONIALS[3];

  return (
    <section className="flex flex-col gap-6 border-t border-rule pt-10 lg:pt-12">
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-mute">
          Reviews
        </p>
        <h2 className="text-balance font-serif text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
          What former students say
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {short.map((t) => (
          <Card key={t.name} t={t} />
        ))}
        {wide ? <Card t={wide} wide /> : null}
      </div>
    </section>
  );
}

function Card({ t, wide = false }: { t: Testimonial; wide?: boolean }) {
  /*
   * Широкая карточка на большом экране — сетка из двух колонок: слева первое
   * предложение и подпись, справа остальной текст. Первое предложение и
   * остальной текст — одна цитата, поэтому они оба внутри blockquote, а
   * подпись — снаружи (так требует разметка figure). Чтобы подпись всё равно
   * встала в левую колонку под первым предложением, blockquote сделан
   * подсеткой (subgrid): его строки и колонки — это строки и колонки
   * карточки, и подпись занимает свободную ячейку слева внизу. Место
   * blockquote задано явно (col-start-1 / row-start-1): без этого сетка,
   * раскладывая элементы автоматически, обходит занятую подписью ячейку и
   * уводит цитату ниже подписи — имя оказывается над словами. Иначе под
   * крупной фразой оставалась бы пустота в триста пикселей, а имя уезжало
   * вниз через всю ширину, далеко от слов, которые ему принадлежат.
   */
  return (
    <figure
      className={`flex flex-col gap-5 rounded border border-rule bg-surface p-6 ${
        wide
          ? 'lg:col-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-6 lg:p-8'
          : ''
      }`}
    >
      <blockquote
        className={`flex flex-col gap-3 ${
          wide
            ? 'lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:grid lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-y-6'
            : ''
        }`}
      >
        <div className={`flex flex-col gap-2 ${wide ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
          {/* Кавычка — украшение, текст цитаты от неё не зависит. */}
          <span aria-hidden className="block h-7 font-serif text-[3.25rem] leading-none text-ochre">
            “
          </span>
          <p
            className={`text-pretty font-serif font-medium leading-snug text-ink ${
              wide ? 'text-[19px] lg:text-[1.625rem] lg:leading-tight' : 'text-[19px]'
            }`}
          >
            {t.lead}
          </p>
        </div>
        <ReviewBody
          paragraphs={t.body}
          className={wide ? 'lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-9' : ''}
        />
      </blockquote>

      {/* mt-auto прижимает подпись к низу: в ряду из трёх карточек разной
          длины имена стоят на одной линии. */}
      <figcaption
        className={`mt-auto flex flex-col gap-0.5 border-t border-rule pt-4 ${
          wide ? 'lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-end' : ''
        }`}
      >
        <span className="text-[15px] font-semibold leading-tight">{t.name}</span>
        <span className="text-[13px] leading-snug text-ink-mute">
          <Reg>{t.now}</Reg>
        </span>
      </figcaption>
    </figure>
  );
}
