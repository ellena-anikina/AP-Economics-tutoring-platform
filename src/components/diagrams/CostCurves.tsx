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
 * Кривые издержек фирмы: MC, ATC, AVC и горизонтальная цена.
 *
 * ПОЧЕМУ ЛОМАНАЯ, А НЕ СГЛАЖИВАНИЕ. Кривые здесь U-образные, и любое
 * сглаживание (Безье, Catmull-Rom) промахивается мимо минимума: контрольная
 * точка уводит линию ниже, чем считает формула, и минимум на картинке
 * оказывается не там, где он в объяснении. Поэтому кривая рисуется по точкам,
 * а точек берётся столько, что излом не виден. Диаграмма не считает ничего
 * сама — как и SupplyDemand: числа приходят из данных вопроса, и разойтись
 * с разбором им неоткуда.
 *
 * ПОЧЕМУ ЦЕНА — ОТДЕЛЬНОЕ ПОНЯТИЕ, А НЕ ЕЩЁ ОДНА КРИВАЯ. Для фирмы в
 * совершенной конкуренции горизонталь P = MR — не кривая издержек, а условие
 * рынка. Она рисуется охрой и под кривыми, тем же приёмом, что потолок и пол
 * цены на рыночной схеме: один язык на весь сайт.
 */

export interface CostCurve {
  id: string;
  /** Подпись у правого конца: MC, ATC, AVC. */
  label: string;
  /** Точки в тех же единицах, что и оси: q 0–110, $ 0–90. */
  points: { x: number; y: number }[];
  dashed?: boolean;
  labelDx?: number;
  labelDy?: number;
}

export interface CostCurvesProps {
  curves: CostCurve[];
  /** Горизонталь P = MR: цена, которую фирма принимает как данность. */
  priceLines?: { at: number; label: string; dashed?: boolean }[];
  points?: {
    id: string;
    x: number;
    y: number;
    label?: string;
    guides?: boolean;
    labelDx?: number;
    labelDy?: number;
  }[];
  axisValues?: { axis: 'x' | 'y'; at: number; text: string }[];
  xLabel?: string;
  yLabel?: string;
  /** Текст для читающих с экрана. Схема без него — картинка без содержания. */
  description: string;
}

function path(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x)},${sy(p.y)}`).join(' ');
}

export default function CostCurves({
  curves,
  priceLines = [],
  points = [],
  axisValues = [],
  xLabel = 'Quantity',
  yLabel = 'Cost, $',
  description,
}: CostCurvesProps) {
  const uid = useId().replace(/:/g, '');

  return (
    <DiagramFrame
      titleId={`${uid}-t`}
      descId={`${uid}-d`}
      title={`Cost curves: ${yLabel} against ${xLabel}`}
      description={description}
    >
      <Axes xLabel={xLabel} yLabel={yLabel} />

      {points.filter((p) => p.guides).map((p) => (
        <Guides key={`g-${p.id}`} x={p.x} y={p.y} />
      ))}

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

      {curves.map((curve) => {
        const last = curve.points[curve.points.length - 1];
        return (
          <g key={curve.id} className="text-ink">
            <path
              d={path(curve.points)}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE.curve}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={curve.dashed ? '6 4' : undefined}
            />
            <text
              x={sx(last.x) + (curve.labelDx ?? 6)}
              y={sy(last.y) + (curve.labelDy ?? 4)}
              fontSize={TYPE.point}
              fontWeight={600}
              className="fill-ink"
            >
              {curve.label}
            </text>
          </g>
        );
      })}

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
