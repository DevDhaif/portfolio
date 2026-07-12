'use client';

import { useEffect, useState } from 'react';

export function RiyadhClockNotebook() {
  const [time, setTime] = useState<string>('');

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
    <span style={{ fontFamily: 'var(--nb-hand)', fontSize: 22, color: 'var(--ink-blue)', fontWeight: 700 }}>
      {time || '—'}
    </span>
  );
}
