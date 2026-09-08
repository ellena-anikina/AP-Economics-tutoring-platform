import { useId } from 'react';
import {
  Axes,
  AxisValue,
  DiagramFrame,
  Guides,
  PointMarker,
  STROKE,
  sx,
  sy,
} from './primitives';

export interface PPFPoint {
  id: string;
  label: string;
  /** Координаты в единицах данных: x 0–110, y 0–90. */
  x: number;
  y: number;
  /** Пунктир к осям. По умолчанию выключен, чтобы не засорять схему. */
  guides?: boolean;
  labelDx?: number;
  labelDy?: number;
}

export interface PPFProps {
  /** Выгнутая кривая — растущие издержки замещения; прямая — постоянные. */
  bowed?: boolean;
  points?: PPFPoint[];
  xLabel?: string;
  yLabel?: string;
  xIntercept?: number;
  yIntercept?: number;
  /** Подписать пересечения с осями их значениями. */
  showIntercepts?: boolean;
}

function bowedPath(xIntercept: number, yIntercept: number): string {
  const steps = 64;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * (Math.PI / 2);
    pts.push(
      `${sx(xIntercept * Math.cos(t)).toFixed(2)},${sy(yIntercept * Math.sin(t)).toFixed(2)}`,
    );
  }
  return `M ${pts.join(' L ')}`;
}

function describe(points: PPFPoint[], bowed: boolean): string {
  const shape = bowed
    ? 'The curve bows outward from the origin, showing increasing opportunity cost.'
    : 'The curve is a straight line, showing constant opportunity cost.';
  if (points.length === 0) return shape;
  const where = points
    .map((p) => {
      const onCurve = Math.abs(Math.hypot(p.x / 100, p.y / 80) - 1) < 0.04;
      const outside = Math.hypot(p.x / 100, p.y / 80) > 1;
      return `${p.label} lies ${onCurve ? 'on' : outside ? 'outside' : 'inside'} the curve`;
    })
    .join('; ');
  return `${shape} ${where}.`;
}

/**
 * Кривая производственных возможностей.
 */
export default function PPF({
  bowed = true,
  points = [],
  xLabel = 'Consumer goods',
  yLabel = 'Capital goods',
  xIntercept = 100,
  yIntercept = 80,
  showIntercepts = false,
}: PPFProps) {
  const uid = useId().replace(/:/g, '');
  const curve = bowed
    ? bowedPath(xIntercept, yIntercept)
    : `M ${sx(0)},${sy(yIntercept)} L ${sx(xIntercept)},${sy(0)}`;

  return (
    <DiagramFrame
      titleId={`${uid}-t`}
      descId={`${uid}-d`}
      title={`Production possibilities curve: ${xLabel} against ${yLabel}`}
      description={describe(points, bowed)}
    >
      <Axes xLabel={xLabel} yLabel={yLabel} />

      {points.filter((p) => p.guides).map((p) => (
        <Guides key={`g-${p.id}`} x={p.x} y={p.y} />
      ))}

      <path
        d={curve}
        fill="none"
        className="text-ink"
        stroke="currentColor"
        strokeWidth={STROKE.curve}
        strokeLinecap="round"
      />

      {showIntercepts ? (
        <>
          <AxisValue axis="y" at={yIntercept} text={String(yIntercept)} />
          <AxisValue axis="x" at={xIntercept} text={String(xIntercept)} />
        </>
      ) : null}

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
