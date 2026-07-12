'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowDownToLine, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#about', label: 'عني', index: '01' },
  { href: '#projects', label: 'الأعمال', index: '02' },
  { href: '#skills', label: 'الأدوات', index: '03' },
  { href: '#blog', label: 'المدونة', index: '04' },
  { href: '#experience', label: 'الخبرات', index: '05' },
  { href: '#certs', label: 'الشهادات', index: '06' },
  { href: '#contact', label: 'تواصل', index: '07' },
];

function Monogram() {
  return (
    <span
      aria-hidden="true"
      className="grid h-9 w-9 place-items-center rounded-md border border-rule bg-paper-raised transition-all group-hover:border-signal"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-ink transition-colors group-hover:text-signal">
        <path d="M3 6 L9 12 L3 18" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M13 6 H21 V18 H13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M13 12 H18" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </span>
  );
}

function ArCvButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const download = async () => {
    try {
      setLoading(true);
      const res = await fetch('/cv/Dhaifallah_Ahmed_Resume Feb 2026.docx-3.pdf');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Dhaifallah-Alfarawi-CV.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Error downloading CV:', e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button type="button" onClick={download} disabled={loading} className={cn('btn-signal', className)}>
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowDownToLine className="h-3.5 w-3.5" />}
      {loading ? 'جارٍ التنزيل' : 'السيرة الذاتية'}
    </button>
  );
}

export function ArHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
      const offset = window.innerHeight * 0.25;
      let current = 'home';
      let bestTop = -Infinity;
      let maxVisible = 0;
      let mostVisible = 'home';
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        const visible = Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top));
        if (visible > maxVisible) {
          maxVisible = visible;
          mostVisible = s.id;
        }
        if (r.top - offset <= 0 && r.top > bestTop) {
          bestTop = r.top;
          current = s.id;
        }
      });
      setActiveId(bestTop === -Infinity ? mostVisible : current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => activeId === href.slice(1);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-200',
        scrolled ? 'bg-paper/80 backdrop-blur-md border-b border-rule' : 'bg-transparent',
      )}
    >
      <div className="container-dev">
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          <Link href="#home" className="group flex items-center gap-2.5">
            <Monogram />
            <span className="hidden font-mono text-sm tracking-tight text-ink sm:inline">
              devdhaif<span className="text-signal animate-blink">_</span>
            </span>
          </Link>

          <nav aria-label="التنقل" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group relative inline-flex items-baseline gap-1.5 rounded-md px-3 py-2 transition-colors duration-150',
                        active ? 'text-signal' : 'text-ink-muted hover:text-ink',
                      )}
                    >
                      <span className="font-mono text-[10px] tracking-[0.18em] text-ink-faint group-hover:text-signal transition-colors">
                        {item.index}
                      </span>
                      <span className="text-sm">{item.label}</span>
                      {active && (
                        <motion.span
                          layoutId="ar-nav-active"
                          className="absolute inset-x-3 -bottom-px h-px bg-signal"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
              <li className="ms-3 flex items-center gap-2">
                <Link
                  href="/pro"
                  className="rounded-md border border-rule px-2.5 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-signal hover:text-signal"
                  aria-label="English version"
                >
                  EN
                </Link>
                <ArCvButton />
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="md:hidden -ms-2 inline-flex h-10 w-10 items-center justify-center text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-paper border-t border-rule"
          >
            <div className="container-dev py-10">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="border-b border-rule"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 group"
                    >
                      <span className="text-3xl font-bold tracking-tight text-ink group-hover:text-signal transition-colors">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-ink-faint">{item.index}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 flex items-center gap-3">
                <ArCvButton className="flex-1" />
                <Link
                  href="/pro"
                  onClick={() => setOpen(false)}
                  className="btn-ghost"
                >
                  English
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
