import { Fragment } from 'react';

/**
 * Знак ® в крупном серифном заголовке набирается в полный кегль и выглядит
 * громоздко, ломая строку. Здесь он уменьшается и поднимается — как принято
 * в типографике. Убрать его нельзя: правила College Board требуют символ
 * при каждом упоминании знака.
 */
export default function Reg({ children }: { children: string }) {
  const parts = children.split('®');

  return (
    <>
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1;
        if (isLast) return <Fragment key={i}>{part}</Fragment>;

        // Знак привязывается к последнему слову неразрывной группой, иначе
        // строка может порваться между «AP» и «®».
        const cut = part.lastIndexOf(' ');
        const head = cut === -1 ? '' : part.slice(0, cut + 1);
        const word = cut === -1 ? part : part.slice(cut + 1);

        return (
          <Fragment key={i}>
            {head}
            <span className="whitespace-nowrap">
              {word}
              <span className="align-super text-[0.48em] font-normal tracking-normal">®</span>
            </span>
          </Fragment>
        );
      })}
    </>
  );
}
