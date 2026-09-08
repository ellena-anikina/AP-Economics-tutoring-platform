'use client';

import { useState } from 'react';
import { TEACHER } from '@/config/teacher';

/**
 * Фото подключается само, как только файл появится в public/. Если файла нет
 * или он не загрузился — показывается монограмма. Битой картинки не будет
 * ни при каком раскладе.
 */
function Avatar({ size }: { size: 'sm' | 'lg' }) {
  const [failed, setFailed] = useState(false);
  const box = size === 'lg' ? 'h-24 w-24 text-2xl' : 'h-11 w-11 text-sm';

  if (TEACHER.photo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={TEACHER.photo}
        alt={TEACHER.photoAlt}
        onError={() => setFailed(true)}
        className={`${box} shrink-0 rounded-full border border-rule object-cover object-top`}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`${box} flex shrink-0 items-center justify-center rounded-full border border-ochre-soft bg-surface font-serif font-semibold text-ochre`}
    >
      {TEACHER.initials}
    </span>
  );
}

/** Одна строка авторства — для экрана до начала теста и для главной. */
export function TeacherByline() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm" />
      <p className="text-[14px] leading-snug text-ink-soft">
        Written by <span className="font-medium text-ink">{TEACHER.name}</span>
        <br />
        <span className="text-[13px] text-ink-mute">{TEACHER.credentialLine}</span>
      </p>
    </div>
  );
}

/** Полная карточка — рядом с предложением записаться. */
export default function TeacherCard() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
      <Avatar size="lg" />
      <div className="flex flex-col gap-2">
        <div>
          <p className="font-serif text-lg font-semibold">{TEACHER.name}</p>
          <p className="text-[13px] text-ink-mute">{TEACHER.credentialLine}</p>
        </div>
        <p className="max-w-measure text-[14px] leading-relaxed text-ink-soft">{TEACHER.bio}</p>
        <p className="max-w-measure text-[14px] leading-relaxed text-ink-soft">{TEACHER.approach}</p>
      </div>
    </div>
  );
}
