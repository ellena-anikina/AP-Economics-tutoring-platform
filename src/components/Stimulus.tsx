import PPF, { type PPFProps } from '@/components/diagrams/PPF';
import type { Stimulus as StimulusData } from '@/types';

function StimulusTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <figure className="my-1 flex flex-col gap-1.5">
      <figcaption className="text-xs italic text-ink-mute">{caption}</figcaption>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`whitespace-nowrap border-b border-rule-strong py-2 pr-6 text-[11px] font-semibold uppercase tracking-wider text-ink-mute ${
                    i === 0 ? 'text-left' : 'text-right pr-0 pl-6'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join('|')}>
                {row.map((cell, i) => (
                  <td
                    key={`${row[0]}-${i}`}
                    className={`whitespace-nowrap border-b border-rule py-2 pr-6 ${
                      i === 0 ? 'text-left' : 'text-right pr-0 pl-6 tabular-nums'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/** Диаграммы подключаются по имени из данных вопроса. */
const DIAGRAMS = {
  PPF: (props: Record<string, unknown>) => <PPF {...(props as PPFProps)} />,
} as const;

export default function Stimulus({ stimulus }: { stimulus: StimulusData }) {
  if (stimulus.kind === 'table') {
    return <StimulusTable caption={stimulus.caption} headers={stimulus.headers} rows={stimulus.rows} />;
  }

  if (stimulus.kind === 'text') {
    return (
      <p className="border-l-2 border-rule-strong pl-4 text-[15px] italic text-ink-soft">
        {stimulus.body}
      </p>
    );
  }

  const render = DIAGRAMS[stimulus.component as keyof typeof DIAGRAMS];
  if (!render) return null;
  return render(stimulus.props);
}
