"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 220,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-signal"
            aria-hidden="true"
        />
    );
}
