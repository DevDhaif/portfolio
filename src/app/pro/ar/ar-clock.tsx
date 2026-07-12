'use client';

import { useEffect, useState } from 'react';

export function ArClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Riyadh',
        hour12: true,
      });
      setTime(fmt.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-display text-2xl font-bold tracking-tight text-ink tabular-nums md:text-3xl">
      {time || '—'}
    </span>
  );
}
