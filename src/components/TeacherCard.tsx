import Portrait from '@/components/Portrait';
import { TEACHER } from '@/config/teacher';

/** Одна строка авторства — экран до начала теста. */
export function TeacherByline() {
  return (
    <div className="flex items-center gap-3">
      <Portrait size="xs" />
      <p className="text-[14px] leading-snug text-ink-soft">
        Written by <span className="font-medium text-ink">{TEACHER.name}</span>
        <br />
        <span className="text-[13px] text-ink-mute">{TEACHER.credentialLine}</span>
      </p>
    </div>
  );
}

/** Карточка рядом с предложением записаться: кто это и одна фраза.
 *  Подробности живут на её сайте — здесь они только уводят от контактов. */
export default function TeacherCard() {
  return (
    // На телефоне фраза уходит под фотографию во всю ширину: рядом с портретом
    // ей остаётся сантиметр текста и она рассыпается на семь строк.
    // grid-rows-[auto_1fr]: портрет выше двух строк текста, и без этого лишняя
    // высота делится между строками — под регалиями появляется дыра.
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-2.5 sm:grid-rows-[auto_1fr] sm:gap-x-5">
      <div className="sm:row-span-2">
        <Portrait size="sm" />
      </div>
      <div className="flex flex-col gap-1 self-center sm:self-start sm:pt-0.5">
        <p className="font-serif text-lg font-semibold leading-tight sm:text-xl">{TEACHER.name}</p>
        <p className="text-[13px] leading-snug text-ink-mute">{TEACHER.credentialLine}</p>
      </div>
      <p className="col-span-2 max-w-measure text-pretty text-[14px] leading-relaxed text-ink-soft sm:col-span-1 sm:col-start-2">
        {TEACHER.bio}
      </p>
    </div>
  );
}
