'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth momentum scrolling via Lenis — lightweight, RAF-based, driven off
 * the normal document scroll (no transform wrapper), so it doesn't fight
 * ScrollTrigger pins, framer-motion, or `position: fixed`. Synced to GSAP's
 * ticker so ScrollTrigger stays in lockstep.
 *
 * - Native scroll on touch (mobile momentum is already good there).
 * - Disabled entirely for `prefers-reduced-motion`.
 * - In-page anchor links are eased through Lenis.
 * Renders children untouched — it only wires up the effect.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false, // native scroll on touch devices
    });

    lenis.on('scroll', ScrollTrigger.update);
    // expose for programmatic scroll (e.g. reset a pinned rail on filter change)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank') return;
      const href = a.getAttribute('href') || '';
      const idx = href.indexOf('#');
      if (idx < 0) return;
      const hash = href.slice(idx);
      if (hash.length < 2) return;
      let target: Element | null = null;
      try {
        target = document.querySelector(hash);
      } catch {
        return;
      }
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.1 });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
