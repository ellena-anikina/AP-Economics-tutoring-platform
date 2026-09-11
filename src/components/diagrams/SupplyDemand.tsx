import { useId } from 'react';
import {
  Axes,
  AxisValue,
  DiagramFrame,
  Guides,
  PointMarker,
  STROKE,
  TYPE,
  sx,
  sy,
  DOMAIN,
} from './primitives';

/**
 * Рынок: спрос, предложение, равновесие, ценовые линии и разрывы.
 *
 * Прямые, а не кривые, и это не упрощение: на AP спрос и предложение почти
 * всегда линейны, а вопрос проверяет чтение схемы — где пересечение, какая
 * сторона короткая, какой треугольник чей. Линия задаётся как p = intercept +
 * slope · q, в тех же единицах данных, что и оси (q 0–110, p 0–90). Так
 * автор вопроса считает пересечения на бумаге теми же числами, которые
 * видит ученик, и расхождение между картинкой и разбором невозможно.
 *
 * Компонент ничего не вычисляет сам: точки, ценовые линии и подписи значений
 * приходят из данных вопроса. Диаграмма, которая сама «находит» равновесие,
 * рано или поздно найдёт его не там, где написано в объяснении.
 */

export interface SDLine {
  id: string;
  label: string;
  /** p при q = 0. */
  intercept: number;
  /** Наклон: отрицательный у спроса, положительный у предложения. */
  slope: number;
  /** Отрезок по q. По умолчанию — от 0 до края области или до p = 0. */
  from?: number;
  to?: number;
  /** Пунктир — для сдвинутой кривой: «было» и «стало» на одной схеме. */
  dashed?: boolean;
  labelDx?: number;
  labelDy?: number;
}

export interface SDPoint {
  id: string;
  x: number;
  y: number;
  label?: string;
  guides?: boolean;
  labelDx?: number;
  labelDy?: number;
}

export interface SupplyDemandProps {
  lines: SDLine[];
  points?: SDPoint[];
  /** Горизонталь: потолок, пол, мировая цена. */
  priceLines?: { at: number; label: string; dashed?: boolean }[];
  /** Скобка по горизонтали между двумя количествами — дефицит или избыток. */
  gap?: { at: number; from: number; to: number; label: string };
  axisValues?: { axis: 'x' | 'y'; at: number; text: string }[];
  xLabel?: string;
  yLabel?: string;
  /** Текст для читающих с экрана. Схема без него — картинка без содержания. */
  description: string;
}

/** Отрезок линии внутри области построения. */
function segment(line: SDLine): { x1: number; y1: number; x2: number; y2: number } {
  const priceAt = (q: number) => line.intercept + line.slope * q;
  // Правый край: где линия упирается в p = 0 (спрос) или в край области.
  const zeroAt = line.slope === 0 ? DOMAIN.x : -line.intercept / line.slope;
  const defaultTo = line.slope < 0 ? Math.min(zeroAt, DOMAIN.x) : DOMAIN.x;
  const from = line.from ?? 0;
  const to = line.to ?? defaultTo;
  return { x1: from, y1: priceAt(from), x2: to, y2: priceAt(to) };
}

export default function SupplyDemand({
  lines,
  points = [],
  priceLines = [],
  gap,
  axisValues = [],
  xLabel = 'Quantity',
  yLabel = 'Price',
  description,
}: SupplyDemandProps) {
  const uid = useId().replace(/:/g, '');

  return (
    <DiagramFrame
      titleId={`${uid}-t`}
      descId={`${uid}-d`}
      title={`Supply and demand: ${yLabel} against ${xLabel}`}
      description={description}
    >
      <Axes xLabel={xLabel} yLabel={yLabel} />

      {points.filter((p) => p.guides).map((p) => (
        <Guides key={`g-${p.id}`} x={p.x} y={p.y} />
      ))}

      {/* Ценовые линии идут под кривыми: это фон решения, а не его предмет. */}
      {priceLines.map((pl) => (
        <g key={`pl-${pl.label}`} className="text-ochre">
          <line
            x1={sx(0)}
            y1={sy(pl.at)}
            x2={sx(DOMAIN.x)}
            y2={sy(pl.at)}
            stroke="currentColor"
            strokeWidth={STROKE.axis}
            strokeDasharray={pl.dashed === false ? undefined : '5 3'}
          />
          <text
            x={sx(DOMAIN.x)}
            y={sy(pl.at) - 6}
            textAnchor="end"
            fontSize={TYPE.axis}
            fontWeight={600}
            className="fill-ochre"
          >
            {pl.label}
          </text>
        </g>
      ))}

      {lines.map((line) => {
        const s = segment(line);
        return (
          <g key={line.id} className="text-ink">
            <line
              x1={sx(s.x1)}
              y1={sy(s.y1)}
              x2={sx(s.x2)}
              y2={sy(s.y2)}
              stroke="currentColor"
              strokeWidth={STROKE.curve}
              strokeLinecap="round"
              strokeDasharray={line.dashed ? '6 4' : undefined}
            />
            <text
              x={sx(s.x2) + (line.labelDx ?? 6)}
              y={sy(s.y2) + (line.labelDy ?? 4)}
              fontSize={TYPE.point}
              fontWeight={600}
              className="fill-ink"
            >
              {line.label}
            </text>
          </g>
        );
      })}

      {/* Скобка дефицита или избытка: два усика и подпись по центру. */}
      {gap ? (
        <g className="text-bad">
          <line
            x1={sx(gap.from)}
            y1={sy(gap.at)}
            x2={sx(gap.to)}
            y2={sy(gap.at)}
            stroke="currentColor"
            strokeWidth={STROKE.curve}
          />
          {[gap.from, gap.to].map((q) => (
            <line
              key={`tick-${q}`}
              x1={sx(q)}
              y1={sy(gap.at) - 5}
              x2={sx(q)}
              y2={sy(gap.at) + 5}
              stroke="currentColor"
              strokeWidth={STROKE.axis}
            />
          ))}
          <text
            x={sx((gap.from + gap.to) / 2)}
            y={sy(gap.at) + 18}
            textAnchor="middle"
            fontSize={TYPE.axis}
            fontWeight={600}
            className="fill-bad"
          >
            {gap.label}
          </text>
        </g>
      ) : null}

      {axisValues.map((v) => (
        <AxisValue key={`${v.axis}-${v.at}`} axis={v.axis} at={v.at} text={v.text} />
      ))}

      {points.map((p) => (
        <PointMarker
          key={p.id}
          x={p.x}
          y={p.y}
          label={p.label}
          labelDx={p.labelDx}
          labelDy={p.labelDy}
        />
      ))}
    </DiagramFrame>
  );
}
