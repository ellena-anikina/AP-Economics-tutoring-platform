'use client';

import { pageview } from '@vercel/analytics';
import { useEffect } from 'react';

/**
 * Счётчик переходов в WhatsApp: сколько людей нажали кнопку записи и с какой
 * страницы. Ничего не рисует.
 *
 * ПОЧЕМУ ПРОСМОТР СТРАНИЦЫ, А НЕ СОБЫТИЕ. Настоящие события (`track`) у Vercel
 * есть только на тарифе Pro, на бесплатном они не записываются. GA4 бесплатен,
 * но ставит cookie, а выбор между ними не сделан (TODO.md, «Аналитика»). Просмотры
 * же считаются на любом тарифе и без cookie, поэтому клик отправляется как
 * просмотр выдуманного адреса /whatsapp-click/<страница, где нажали>.
 *
 * ГДЕ СМОТРЕТЬ. Vercel → Analytics: на вкладке Routes строка /whatsapp-click —
 * всего нажатий, на вкладке Pages те же адреса с разбивкой по страницам.
 *
 * ЦЕНА. Нажатие прибавляется к общему числу просмотров и чуть снижает показатель
 * отказов. Когда появятся события, заменить вызов на `track` здесь, в одном месте.
 *
 * ОДИН СЛУШАТЕЛЬ НА ВЕСЬ ДОКУМЕНТ, а не обработчик в BookButton: так учитываются
 * все ссылки wa.me, в том числе в серверных компонентах, и новая кнопка не
 * останется без подсчёта. Ссылки wa.me на сайте ведут только к Ольге
 * (contact-links.ts): «поделиться результатом» идёт через системное меню.
 * Сканирование QR-кода на странице записи здесь не видно: это не клик.
 */
export default function WhatsAppClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest('a[href^="https://wa.me/"]')) return;
      pageview({ route: '/whatsapp-click', path: `/whatsapp-click${window.location.pathname}` });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
