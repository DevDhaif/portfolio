"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DEFAULT_WORDS = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "LARAVEL",
    "NODE", "GSAP", "SUPABASE", "ACCESSIBILITY", "PERFORMANCE", "RTL",
];

/**
 * Infinite marquee that reacts to scroll: it runs continuously, but your
 * scroll velocity skews the type and momentarily speeds it up, then it eases
 * back. Reduced-motion visitors get a static, readable strip.
 */
export function MarqueeStrip({ words = DEFAULT_WORDS }: { words?: string[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const track = trackRef.current!;
                const loop = gsap.to(track, {
                    xPercent: -50,
                    duration: 24,
                    ease: "none",
                    repeat: -1,
                });
                const skewTo = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" });

                ScrollTrigger.create({
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) => {
                        const v = gsap.utils.clamp(-28, 28, self.getVelocity() / 90);
                        skewTo(v * -0.22);
                        loop.timeScale(1 + Math.min(2.5, Math.abs(v) * 0.12));
                        gsap.to(loop, { timeScale: 1, duration: 0.7, overwrite: "auto", ease: "power2.out" });
                    },
                });
            });
            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <div
            ref={ref}
            className="relative overflow-hidden border-y border-rule bg-paper-panel py-5 md:py-7"
        >
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper-panel to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper-panel to-transparent" />
            <div ref={trackRef} className="flex w-max flex-nowrap whitespace-nowrap will-change-transform">
                {[...words, ...words].map((w, i) => (
                    <span
                        key={i}
                        className="mx-6 inline-flex items-center gap-6 font-display text-4xl font-bold tracking-tight text-ink-muted md:text-6xl"
                    >
                        {w}
                        <span className="text-signal">◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
