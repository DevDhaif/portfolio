'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Global "Switch theme" pill.
 * Fixed bottom-(start) on every page except /select itself.
 * Reads pf_lang cookie client-side to label in EN or AR.
 *
 * Tiny client component — required because we need usePathname
 * to know when to hide on /select.
 */
export function ThemeSwitcherPill() {
  const pathname = usePathname() || '';
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const m = document.cookie.match(/(?:^|;\s*)pf_lang=(en|ar)/);
    if (m) setLang(m[1] as 'en' | 'ar');
  }, []);

  if (pathname.startsWith('/select')) return null;

  const isAr = lang === 'ar';
  const label = isAr ? 'غيّر الثيم' : 'Switch theme';

  return (
    <Link
      href="/select"
      aria-label={label}
      dir={isAr ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        bottom: '18px',
        insetInlineStart: '18px',
        zIndex: 9999,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '999px',
        background: '#1a1408',
        color: '#ffd23a',
        border: '2px solid #ffd23a',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textDecoration: 'none',
        boxShadow:
          '0 6px 20px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.4)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <span aria-hidden style={{ fontSize: '11px' }}>◆</span>
      <span>{label}</span>
    </Link>
  );
}
