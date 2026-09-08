/**
 * Общие примитивы для экономических диаграмм.
 *
 * Почему инлайновый SVG, а не библиотека графиков: это не график данных, а
 * схема. Здесь нет рядов, легенды и значений — есть именованные кривые,
 * подписанные оси, точки равновесия, стрелки сдвига и заштрихованные области.
 * Recharts, Chart.js и D3 приспособлены под первое и мешают второму.
 *
 * Иерархия штрихов: кривая — главная, оси — рецессивные, направляющие —
 * самые лёгкие. Все цвета берутся из токенов темы, поэтому диаграмма
 * одинаково читается в светлой и тёмной.
 */

export const VIEW = { w: 360, h: 262 };
export const PAD = { top: 28, right: 36, bottom: 46, left: 54 };
export const PLOT_W = VIEW.w - PAD.left - PAD.right;
export const PLOT_H = VIEW.h - PAD.top - PAD.bottom;

export const DOMAIN = { x: 110, y: 90 };

export const sx = (x: number) => PAD.left + (x / DOMAIN.x) * PLOT_W;
export const sy = (y: number) => PAD.top + PLOT_H - (y / DOMAIN.y) * PLOT_H;

export const STROKE = { curve: 2.4, axis: 1.4, guide: 1 };
export const TYPE = { axis: 12, value: 12, point: 15 };

/** Оси со стрелками — конвенция экономических диаграмм. */
export function Axes({ xLabel, yLabel }: { xLabel: string; yLabel: string }) {
  const x0 = sx(0);
  const y0 = sy(0);
  const xEnd = sx(DOMAIN.x) + 4;
  const yEnd = sy(DOMAIN.y) - 4;
  const a = 4.5;

  return (
    <g className="text-ink-soft">
      <path
        d={`M ${x0},${yEnd} L ${x0},${y0} L ${xEnd},${y0}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE.axis}
        strokeLinejoin="round"
      />
      {/* наконечники */}
      <path d={`M ${xEnd},${y0} l ${-a * 1.6},${-a} l 0,${a * 2} z`} fill="currentColor" />
      <path d={`M ${x0},${yEnd} l ${-a},${a * 1.6} l ${a * 2},0 z`} fill="currentColor" />

      <text
        x={x0 - 8}
        y={PAD.top - 12}
        textAnchor="start"
        fontSize={TYPE.axis}
        className="fill-ink-soft"
      >
        {yLabel}
      </text>
      <text
        x={VIEW.w - PAD.right + 4}
        y={VIEW.h - 16}
        textAnchor="end"
        fontSize={TYPE.axis}
        className="fill-ink-soft"
      >
        {xLabel}
      </text>
    </g>
  );
}

/** Пунктирные направляющие от точки к обеим осям. */
export function Guides({ x, y }: { x: number; y: number }) {
  return (
    <g className="text-ink-mute">
      <path
        d={`M ${sx(0)},${sy(y)} L ${sx(x)},${sy(y)} L ${sx(x)},${sy(0)}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE.guide}
        strokeDasharray="3 3"
      />
    </g>
  );
}

/**
 * Точка с гало цвета фона: маркер читается, даже когда лежит прямо на кривой.
 */
export function PointMarker({
  x,
  y,
  label,
  labelDx = 9,
  labelDy = -9,
}: {
  x: number;
  y: number;
  label?: string;
  labelDx?: number;
  labelDy?: number;
}) {
  return (
    <g>
      <circle cx={sx(x)} cy={sy(y)} r={6.5} className="fill-ground" />
      <circle cx={sx(x)} cy={sy(y)} r={4.2} className="fill-ink" />
      {label ? (
        <text
          x={sx(x) + labelDx}
          y={sy(y) + labelDy}
          fontSize={TYPE.point}
          fontWeight={600}
          className="fill-ink"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

/** Подпись значения на оси. */
export function AxisValue({
  axis,
  at,
  text,
}: {
  axis: 'x' | 'y';
  at: number;
  text: string;
}) {
  if (axis === 'y') {
    return (
      <text
        x={sx(0) - 9}
        y={sy(at) + 4}
        textAnchor="end"
        fontSize={TYPE.value}
        className="fill-ink-soft tabular-nums"
      >
        {text}
      </text>
    );
  }
  return (
    <text
      x={sx(at)}
      y={sy(0) + 18}
      textAnchor="middle"
      fontSize={TYPE.value}
      className="fill-ink-soft tabular-nums"
    >
      {text}
    </text>
  );
}

export function DiagramFrame({
  titleId,
  descId,
  title,
  description,
  children,
}: {
  titleId: string;
  descId: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-1 flex w-full justify-center">
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="h-auto w-full max-w-[420px]"
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>{description}</desc>
        {children}
      </svg>
    </figure>
  );
}
