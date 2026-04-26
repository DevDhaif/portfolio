"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle ring cursor overlay ,  desktop only.
 * Grows when hovering interactive elements (a, button, [data-cursor=on]).
 * Hidden on touch devices via the `coarse` pointer media query.
 */
export function CursorRing() {
    const ringRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);
    const [hot, setHot] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const fine = window.matchMedia("(pointer: fine)").matches;
        if (!fine) return;
        setEnabled(true);

        let raf = 0;
        let tx = 0;
        let ty = 0;
        let cx = 0;
        let cy = 0;

        const tick = () => {
            cx += (tx - cx) * 0.18;
            cy += (ty - cy) * 0.18;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${cx - 14}px, ${cy - 14}px, 0)`;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
        };

        const isInteractive = (el: EventTarget | null) => {
            if (!(el instanceof Element)) return false;
            return !!el.closest('a, button, [role="button"], [data-cursor="on"], input, textarea, select');
        };

        const onOver = (e: MouseEvent) => setHot(isInteractive(e.target));

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
        };
    }, []);

    if (!enabled) return null;

    return (
        <div
            ref={ringRef}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-7 w-7 rounded-full border md:block transition-[width,height,border-color,opacity] duration-200"
            style={{
                width: hot ? 44 : 28,
                height: hot ? 44 : 28,
                borderColor: hot ? "hsl(144 100% 50%)" : "hsl(0 0% 100% / 0.35)",
                opacity: hot ? 1 : 0.7,
                marginLeft: hot ? -8 : 0,
                marginTop: hot ? -8 : 0,
                mixBlendMode: "difference",
            }}
        />
    );
}
