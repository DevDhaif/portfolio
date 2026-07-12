'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, SplitText);

/**
 * GSAP life for the notebook hero: the composition-book cover gets a
 * gentle idle float and a magnetic 3D tilt that leans toward the cursor.
 * Reduced-motion visitors get a still book (the branch simply never runs).
 */
export function NotebookMotion() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero name: reveal word-by-word (word split is RTL/Arabic-safe —
        // it never breaks intra-word letter joining the way chars would).
        const title = document.querySelector<HTMLElement>('[data-nb-title]');
        let titleSplit: SplitText | null = null;
        if (title) {
          titleSplit = SplitText.create(title, { type: 'words', aria: 'auto' });
          gsap.from(titleSplit.words, {
            yPercent: 60,
            opacity: 0,
            rotate: -4,
            stagger: 0.09,
            duration: 0.7,
            ease: 'back.out(1.6)',
          });
        }

        const cover = document.querySelector<HTMLElement>('[data-nb-cover]');
        if (!cover) {
          return () => titleSplit?.revert();
        }

        gsap.set(cover, { transformPerspective: 800, transformOrigin: 'center' });

        // Idle breathing wobble around the book's resting tilt.
        const idle = gsap.to(cover, {
          rotation: '+=2.4',
          y: -6,
          duration: 2.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Magnetic tilt on hover.
        const rotY = gsap.quickTo(cover, 'rotationY', { duration: 0.6, ease: 'power3' });
        const rotX = gsap.quickTo(cover, 'rotationX', { duration: 0.6, ease: 'power3' });
        const move = contextSafe!((e: PointerEvent) => {
          const r = cover.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          idle.pause();
          rotY(px * 14);
          rotX(-py * 14);
        });
        const leave = contextSafe!(() => {
          rotY(0);
          rotX(0);
          idle.play();
        });
        cover.addEventListener('pointermove', move);
        cover.addEventListener('pointerleave', leave);

        return () => {
          cover.removeEventListener('pointermove', move);
          cover.removeEventListener('pointerleave', leave);
          titleSplit?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope} aria-hidden style={{ display: 'contents' }} />;
}
