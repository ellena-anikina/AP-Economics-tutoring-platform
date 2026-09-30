/**
 * Матрица выигрышей для вопросов по теории игр.
 *
 * ПОЧЕМУ ОТДЕЛЬНЫЙ КОМПОНЕНТ, А НЕ ОБЫЧНАЯ ТАБЛИЦА. Обычная таблица у нас уже
 * есть, и матрицу в неё можно втиснуть — строкой вида «A: 8, B: 8». Но игра
 * читается не так: у неё два игрока, у каждого свой набор стратегий, и в
 * каждой клетке два числа, принадлежащие разным игрокам. Свалить это в плоскую
 * таблицу значит сделать вопрос про чтение вёрстки, а не про доминирующую
 * стратегию. Поэтому здесь настоящая таблица с двумя уровнями заголовков:
 * столбцы принадлежат одному игроку, строки — другому, и это сказано словами,
 * а не подразумевается.
 *
 * ПОЧЕМУ HTML, А НЕ SVG, КАК ОСТАЛЬНЫЕ СХЕМЫ. Остальные схемы — это линии на
 * осях, там нужен SVG. Матрица же и есть таблица: в HTML она сама переносится
 * на узком экране, масштабируется вместе со шрифтом и читается голосом по
 * заголовкам строк и столбцов. В SVG всё это пришлось бы изобретать заново.
 *
 * ВЫИГРЫШИ ПОДПИСАНЫ ИМЕНАМИ, А НЕ ПОРЯДКОМ. Общепринятая запись «(8, 8)»
 * требует помнить, что первое число — строке, второе — столбцу. Это ровно та
 * деталь, на которой теряют балл, не перепутав при этом экономику. Здесь в
 * каждой клетке две строки с короткими именами игроков, и путать нечего.
 */

export interface GamePlayer {
  /** Полное имя: «Firm A», «Station North». */
  name: string;
  /** Короткое — для клеток матрицы. Обычно буква. */
  short: string;
  strategies: string[];
}

export interface GameMatrixProps {
  caption: string;
  /** Игрок, которому принадлежат строки. */
  rowPlayer: GamePlayer;
  /** Игрок, которому принадлежат столбцы. */
  colPlayer: GamePlayer;
  /** payoffs[строка][столбец] = [выигрыш строчного, выигрыш столбцового]. */
  payoffs: [number, number][][];
  /** Единица измерения, одной строкой под подписью. */
  unit?: string;
  /** Текст для читающих с экрана: схема без него — картинка без содержания. */
  description: string;
}

export default function GameMatrix({
  caption,
  rowPlayer,
  colPlayer,
  payoffs,
  unit,
  description,
}: GameMatrixProps) {
  return (
    <figure className="my-1 flex flex-col gap-1.5">
      <figcaption className="text-xs italic text-ink-mute">
        {caption}
        {unit ? <span className="not-italic"> · {unit}</span> : null}
      </figcaption>

      <div className="overflow-x-auto">
        <table className="border-collapse text-sm">
          {/* Описание для скринридера. Заголовки строк и столбцов он прочтёт
              сам, а вот что именно за игра — нет. */}
          <caption className="sr-only">{description}</caption>
          <thead>
            <tr>
              <td className="border-b border-rule-strong" />
              <th
                scope="colgroup"
                colSpan={colPlayer.strategies.length}
                className="border-b border-rule-strong px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-ink-mute"
              >
                {colPlayer.name}
              </th>
            </tr>
            <tr>
              {/* Угловая клетка называет владельца строк — иначе о нём можно
                  догадаться только по клеткам. */}
              <th
                scope="col"
                className="border-b border-rule-strong px-3 py-1.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-mute"
              >
                {rowPlayer.name}
              </th>
              {colPlayer.strategies.map((s) => (
                <th
                  key={s}
                  scope="col"
                  className="border-b border-rule-strong px-3 py-1.5 text-center text-[13px] font-medium"
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rowPlayer.strategies.map((rowStrategy, i) => (
              <tr key={rowStrategy}>
                <th
                  scope="row"
                  className="border-b border-rule px-3 py-2.5 text-left text-[13px] font-medium"
                >
                  {rowStrategy}
                </th>
                {colPlayer.strategies.map((colStrategy, j) => {
                  const [rowPayoff, colPayoff] = payoffs[i][j];
                  return (
                    <td
                      key={colStrategy}
                      className="border-b border-l border-rule px-3 py-2.5 text-center tabular-nums"
                    >
                      <span className="flex flex-col items-center gap-0.5 leading-tight">
                        <span>
                          <span className="text-ink-mute">{rowPlayer.short} </span>
                          {rowPayoff}
                        </span>
                        <span>
                          <span className="text-ink-mute">{colPlayer.short} </span>
                          {colPayoff}
                        </span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
