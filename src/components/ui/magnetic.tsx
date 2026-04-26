"use client";

import { useRef } from "react";

/**
 * Subtle magnetic translation on hover for desktop.
 * Wraps any inline-block element.
 */
export function Magnetic({
    children,
    strength = 0.18,
    className,
}: {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    };

    const handleLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate3d(0, 0, 0)";
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={className}
            style={{ transition: "transform 250ms cubic-bezier(0.22, 0.61, 0.36, 1)" }}
        >
            {children}
        </div>
    );
}
