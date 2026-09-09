'use client';

import { useState } from 'react';
import { TEACHER } from '@/config/teacher';

type Size = 'lg' | 'sm' | 'xs';

/**
 * Портрет преподавателя — один компонент на все три места, где он появляется:
 * главная (крупно), экран результатов (карточка), строка авторства (мелко).
 *
 * Фон самой фотографии — светлый кабинет, почти в тон нашему тёплому белому,
 * поэтому без оправы она растворялась в странице. Решение — паспарту: снимок
 * лежит на поверхности `surface` и отделён от неё тонкой линией. Приём из
 * печатной вёрстки, работает в обеих темах.
 *
 * Размер меняет масштаб, но не язык: везде вертикальный кадр 3:4 в тонкой
 * рамке. Круглый аватар из первой версии убран — из-за него экран результатов
 * говорил о преподавателе иначе, чем главная, и фотография читалась там как
 * иконка, а не как человек.
 *
 * Если файла нет или он не загрузился — показывается монограмма. Битой
 * картинки не будет ни при каком раскладе.
 */
const SIZES: Record<Size, { box: string; mat: string; initials: string }> = {
  lg: { box: 'w-full max-w-[19rem]', mat: 'rounded-lg p-2.5', initials: 'text-5xl' },
  sm: { box: 'w-[6.5rem] shrink-0 sm:w-[8rem]', mat: 'rounded-md p-1.5', initials: 'text-2xl' },
  xs: { box: 'w-11 shrink-0', mat: '', initials: 'text-sm' },
};

export default function Portrait({
  size = 'lg',
  caption = size === 'lg',
}: {
  size?: Size;
  caption?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const s = SIZES[size];
  // На 44 пикселях паспарту превращается в шум: там просто кадр в рамке.
  const matted = size !== 'xs';
  const corner = matted ? 'rounded-sm' : 'rounded';
  // В строке авторства кадр квадратный: вертикальный портрет на 44 пикселях
  // превращается в человека посреди комнаты, лица там уже не разобрать.
  // Квадратный кроп для этого и лежит в public отдельным файлом.
  const src = matted ? TEACHER.photoPortrait : TEACHER.photo;
  const ratio = matted ? 'aspect-[3/4]' : 'aspect-square';

  const image =
    src && !failed ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={TEACHER.photoAlt}
        width={matted ? 600 : 512}
        height={matted ? 800 : 512}
        onError={() => setFailed(true)}
        className={`${ratio} w-full border border-rule object-cover object-top ${corner}`}
      />
    ) : (
      <div
        aria-hidden
        className={`${ratio} flex w-full items-center justify-center border border-rule bg-surface-alt font-serif font-semibold text-ochre ${s.initials} ${corner}`}
      >
        {TEACHER.initials}
      </div>
    );

  if (!matted) return <div className={s.box}>{image}</div>;

  return (
    <figure className={`${s.box} flex flex-col`}>
      <div
        className={`border border-rule-strong bg-surface shadow-[0_1px_0_0_var(--rule-strong)] ${s.mat}`}
      >
        {image}
        {caption ? (
          <figcaption className="flex flex-col gap-0.5 px-1 pb-0.5 pt-3">
            <span className="font-serif text-[17px] font-semibold leading-tight">
              {TEACHER.name}
            </span>
            {/* Регалии разбиваются по разделителю, а не по ширине колонки:
                иначе «·» оказывается первым знаком строки. */}
            {TEACHER.credentialLine.split(' · ').map((line) => (
              <span key={line} className="text-[12.5px] leading-snug text-ink-mute">
                {line}
              </span>
            ))}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
