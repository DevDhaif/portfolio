'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, DrawSVGPlugin, MotionPathPlugin, ScrollTrigger);

/* ===========================================================
   Animated hero scene — a living "system diagram":
     · a node network whose links draw themselves in
     · signal dots that travel the wires (MotionPath)
     · concentric dashed rings that counter-rotate
     · a perspective grid floor that flows toward the viewer
   All GSAP-driven, scroll-parallaxed, reduced-motion aware.
   Deterministic geometry so SSR and client match.
   =========================================================== */

const NODES = [
  { x: 210, y: 150 }, { x: 470, y: 90 }, { x: 700, y: 210 }, { x: 940, y: 120 },
  { x: 1180, y: 210 }, { x: 1320, y: 380 }, { x: 1120, y: 430 }, { x: 880, y: 360 },
  { x: 610, y: 420 }, { x: 360, y: 340 }, { x: 150, y: 430 }, { x: 500, y: 560 },
  { x: 790, y: 560 }, { x: 1040, y: 600 }, { x: 260, y: 610 }, { x: 1290, y: 560 },
];

const LINKS: [number, number][] = [];
NODES.forEach((a, i) => {
  NODES.forEach((b, j) => {
    if (j <= i) return;
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < 320) LINKS.push([i, j]);
  });
});

// Two winding routes for the travelling signal dots.
const ROUTE_A = `M${NODES[0].x} ${NODES[0].y} L${NODES[2].x} ${NODES[2].y} L${NODES[7].x} ${NODES[7].y} L${NODES[12].x} ${NODES[12].y} L${NODES[13].x} ${NODES[13].y} L${NODES[15].x} ${NODES[15].y}`;
const ROUTE_B = `M${NODES[10].x} ${NODES[10].y} L${NODES[9].x} ${NODES[9].y} L${NODES[8].x} ${NODES[8].y} L${NODES[6].x} ${NODES[6].y} L${NODES[4].x} ${NODES[4].y} L${NODES[3].x} ${NODES[3].y}`;

export function HeroScene({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const root = ref.current!;
        const q = gsap.utils.selector(root);

        // Links draw themselves in, staggered.
        gsap.fromTo(
          q('.hs-link'),
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 1.6, stagger: 0.04, ease: 'power2.inOut' },
        );

        // Collect the continuous (infinite) tweens so we can pause them when
        // the hero scrolls off-screen — no wasted CPU/GPU while reading below.
        const loops: gsap.core.Tween[] = [];

        loops.push(
          gsap.to(q('.hs-node'), {
            opacity: 'random(0.35, 1)',
            duration: 'random(1.4, 3.4)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { each: 0.08, from: 'random' },
          }),
          gsap.to(q('.hs-ring-a'), { rotation: 360, transformOrigin: 'center', duration: 48, repeat: -1, ease: 'none' }),
          gsap.to(q('.hs-ring-b'), { rotation: -360, transformOrigin: 'center', duration: 74, repeat: -1, ease: 'none' }),
          gsap.to(q('.hs-ring-c'), { rotation: 360, transformOrigin: 'center', duration: 120, repeat: -1, ease: 'none' }),
          gsap.fromTo(q('.hs-grid'), { yPercent: 0 }, { yPercent: 6, duration: 3.4, repeat: -1, ease: 'none' }),
        );

        // Signal dots travel the routes.
        q('.hs-signal').forEach((dot, i) => {
          loops.push(
            gsap.to(dot, {
              motionPath: { path: i % 2 === 0 ? '#hs-route-a' : '#hs-route-b', align: i % 2 === 0 ? '#hs-route-a' : '#hs-route-b', alignOrigin: [0.5, 0.5] },
              duration: 5.5 + i * 0.7,
              repeat: -1,
              ease: 'none',
              delay: i * 1.4,
            }),
          );
        });

        // Pause the loops whenever the hero leaves the viewport.
        ScrollTrigger.create({
          trigger: root.closest('section') ?? root,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => loops.forEach((t) => (self.isActive ? t.play() : t.pause())),
        });

        // Scroll parallax — the whole scene drifts + scales as the hero exits.
        gsap.to(root, {
          yPercent: 14,
          scale: 1.12,
          transformOrigin: 'center 30%',
          ease: 'none',
          scrollTrigger: {
            trigger: root.closest('section') ?? root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hs-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(0,255,102,0.16)" />
          <stop offset="100%" stopColor="rgba(0,255,102,0)" />
        </radialGradient>
        <linearGradient id="hs-grid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,255,102,0)" />
          <stop offset="100%" stopColor="rgba(0,255,102,0.5)" />
        </linearGradient>
        <path id="hs-route-a" d={ROUTE_A} />
        <path id="hs-route-b" d={ROUTE_B} />
      </defs>

      {/* Soft glow */}
      <rect x="0" y="0" width="1440" height="900" fill="url(#hs-glow)" />

      {/* Perspective grid floor */}
      <g className="hs-grid" opacity="0.5">
        <g stroke="url(#hs-grid-fade)" strokeWidth="1">
          {/* horizontal lines receding to the horizon */}
          {Array.from({ length: 9 }, (_, i) => {
            const t = i / 8;
            const y = 640 + t * t * 260;
            return <line key={`h${i}`} x1="0" y1={y} x2="1440" y2={y} />;
          })}
          {/* vertical lines converging to a vanishing point */}
          {Array.from({ length: 19 }, (_, i) => {
            const x = (i / 18) * 1440;
            return <line key={`v${i}`} x1={x} y1="900" x2={720 + (x - 720) * 0.16} y2="640" />;
          })}
        </g>
      </g>

      {/* Concentric rings (behind the right column) */}
      <g transform="translate(1150 360)">
        <circle className="hs-ring-a" r="150" stroke="rgba(0,255,102,0.22)" strokeWidth="1.2" strokeDasharray="2 10" />
        <circle className="hs-ring-b" r="220" stroke="rgba(0,255,102,0.14)" strokeWidth="1" strokeDasharray="1 16" />
        <circle className="hs-ring-c" r="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="1 22" />
      </g>

      {/* Network links */}
      <g stroke="rgba(0,255,102,0.16)" strokeWidth="1">
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            className="hs-link"
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>

      {/* Network nodes */}
      <g fill="rgb(0,255,102)">
        {NODES.map((n, i) => (
          <circle key={i} className="hs-node" cx={n.x} cy={n.y} r={i % 4 === 0 ? 3.4 : 2.2} opacity="0.6" />
        ))}
      </g>

      {/* Travelling signals */}
      <g>
        <circle className="hs-signal" r="4" fill="rgb(0,255,102)" />
        <circle className="hs-signal" r="3" fill="#7DD3FC" />
        <circle className="hs-signal" r="4" fill="rgb(0,255,102)" />
      </g>
    </svg>
  );
}
