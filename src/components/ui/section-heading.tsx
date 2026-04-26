"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeadingProps } from "@/types";

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

    return (
        <motion.header
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
