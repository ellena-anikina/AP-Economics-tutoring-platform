'use client';

import { useState } from 'react';

/**
 * Текст отзыва после первого предложения.
 *
 * На телефоне он свёрнут. Четыре отзыва целиком — это около 2400 пикселей,
 * три с половиной экрана между списком результатов и разделом для родителей,
 * где стоит кнопка записи. Родитель, пролистывающий отзывы, читает первое
 * предложение, имя и где человек сейчас, — всё это видно и в свёрнутом виде.
 * Кому нужно подробнее, откроет. С планшета и шире места хватает, и текст
 * показан всегда: кнопка там не нужна и не выводится.
 */
export default function ReviewBody({
  paragraphs,
  className = '',
}: {
  paragraphs: string[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`${open ? 'flex' : 'hidden'} flex-col gap-3 md:flex ${className}`}>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="text-pretty text-[15px] leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
      </div>
      {open ? null : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          className="w-fit text-[14px] font-semibold text-ochre underline underline-offset-4 md:hidden"
        >
          Read the full review
        </button>
      )}
    </>
  );
}
