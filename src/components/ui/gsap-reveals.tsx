'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Drop-in scroll reveals. Any element in the page tagged with
 * `data-reveal` fades + rises into view once, batched with a stagger.
 *
 * Safety: elements are only hidden inside the `no-preference` matchMedia
 * branch, so with reduced-motion (or if JS never runs) the content stays
 * visible — the animation is pure enhancement, never a gate on content.
 */
export function GsapReveals({
  scopeId,
  y = 26,
  stagger = 0.08,
  start = 'top 86%',
  duration = 0.65,
}: {
  scopeId?: string;
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const root: ParentNode = scopeId
          ? document.getElementById(scopeId) ?? document
          : document;
        const els = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll('[data-reveal]'),
        );
        if (!els.length) return;

        gsap.set(els, { autoAlpha: 0, y, scale: 0.965 });
        ScrollTrigger.batch(els, {
          start,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration,
              ease: 'power3.out',
              stagger,
              overwrite: true,
              // Hand control of `transform` back to CSS once revealed, so
              // elements that carry their own rotate()/:hover transforms
              // (e.g. the notebook's tilted cards) aren't flattened.
              clearProps: 'transform',
            }),
        });
        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref} aria-hidden style={{ display: 'contents' }} />;
}
