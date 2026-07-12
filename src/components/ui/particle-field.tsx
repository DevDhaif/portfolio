'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Animated SVG constellation backdrop — drifting, twinkling dots joined by
 * faint lines, with optional scroll parallax. Purely decorative; positions
 * are deterministic (index-hashed) so SSR and client markup match, and all
 * motion lives inside a no-preference matchMedia branch.
 */
export function ParticleField({
  count = 40,
  className,
  parallax = true,
}: {
  count?: number;
  className?: string;
  parallax?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);

  // Deterministic pseudo-random positions in a 100×100 viewBox.
  const dots = Array.from({ length: count }, (_, i) => {
    const cx = ((i * 47 + 13) % 100) + (((i * 17) % 7) - 3) * 0.4;
    const cy = ((i * 31 + 7) % 100) + (((i * 13) % 5) - 2) * 0.5;
    const r = 0.35 + ((i * 7) % 5) * 0.14;
    return { cx, cy, r, o: 0.2 + ((i * 11) % 6) * 0.08 };
  });

  // Faint links between consecutive-ish dots (a light "network").
  const links = dots
    .map((d, i) => {
      const t = dots[(i + 5) % dots.length];
      const dist = Math.hypot(d.cx - t.cx, d.cy - t.cy);
      return dist < 34 ? { x1: d.cx, y1: d.cy, x2: t.cx, y2: t.cy } : null;
    })
    .filter(Boolean) as { x1: number; y1: number; x2: number; y2: number }[];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const circles = ref.current?.querySelectorAll('circle') ?? [];
        circles.forEach((c, i) => {
          gsap.to(c, {
            x: gsap.utils.random(-4, 4),
            y: gsap.utils.random(-4, 4),
            duration: gsap.utils.random(5, 11),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.04,
          });
          gsap.to(c, {
            opacity: gsap.utils.random(0.1, 0.85),
            duration: gsap.utils.random(1.6, 4.2),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.03,
          });
        });
        if (parallax && ref.current) {
          gsap.to(ref.current, {
            yPercent: 16,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current.parentElement ?? ref.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="rgba(0,255,102,0.14)" strokeWidth="0.15">
        {links.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>
      <g fill="rgb(0,255,102)">
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} opacity={d.o} />
        ))}
      </g>
    </svg>
  );
}
