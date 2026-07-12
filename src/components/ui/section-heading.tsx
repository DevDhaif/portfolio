"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { SectionHeadingProps } from "@/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props extends SectionHeadingProps {
    index?: string;
    eyebrow?: string;
    align?: "left" | "center";
}

export function SectionHeading({
    title,
    subtitle,
    badge,
    index,
    eyebrow,
    alignment,
    align,
    className,
}: Props) {
    const sectionNumber = index ?? "";
    const sectionEyebrow = eyebrow ?? badge ?? "";
    const a = align ?? alignment ?? "left";
    const ref = useRef<HTMLElement>(null);

    // Wipe the signal underline(s) in from the start edge as the heading
    // scrolls into view. Only runs with motion allowed, so the underline is
    // fully visible for reduced-motion / no-JS.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const bars = ref.current?.querySelectorAll<HTMLElement>(
                    "h2 span[aria-hidden]",
                );
                if (bars?.length) {
                    gsap.fromTo(
                        bars,
                        { scaleX: 0, transformOrigin: "left center" },
                        {
                            scaleX: 1,
                            duration: 0.7,
                            ease: "power3.inOut",
                            stagger: 0.1,
                            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
                        },
                    );
                }

                // Depth: drift the oversized outline numeral against the scroll.
                const numeral = ref.current?.querySelector<HTMLElement>(".section-numeral");
                if (numeral) {
                    gsap.to(numeral, {
                        yPercent: -30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top bottom",
                            end: "bottom top",
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
        <motion.header
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className={cn(
                "relative",
                a === "center" ? "text-center" : "text-left",
                className
            )}
        >
            {/* Oversized stencil numeral ,  the typographic anchor */}
            {sectionNumber && (
                <div
                    aria-hidden="true"
                    className={cn(
                        "section-numeral select-none",
                        a === "center" ? "mx-auto inline-block" : ""
                    )}
                >
                    {sectionNumber}
                </div>
            )}

            {/* Compact meta row */}
            <div
                className={cn(
                    "mt-2 flex items-baseline gap-3",
                    a === "center" ? "justify-center" : ""
                )}
            >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    {sectionEyebrow ? `// ${sectionEyebrow}` : ""}
                </span>
                <span className="h-px flex-1 bg-rule" />
            </div>

            {/* Title */}
            <h2
                className={cn(
                    "stencil mt-7 text-balance text-4xl leading-[0.95] text-ink",
                    "sm:text-5xl md:text-6xl lg:text-7xl"
                )}
            >
                {title}
            </h2>

            {subtitle && (
                <p
                    className={cn(
                        "mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted md:text-lg",
                        a === "center" && "mx-auto"
                    )}
                >
                    {subtitle}
                </p>
            )}
        </motion.header>
    );
}
