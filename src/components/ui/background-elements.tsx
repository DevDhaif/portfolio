// src/components/ui/background-elements.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function BackgroundElements() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])

    return (
        <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

            {/* Animated grid */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Floating elements */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-20"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-20"
            />

            {/* Animated shapes */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.1 }}
                    animate={{
                        y: ["0vh", "100vh"],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        delay: i * 2,
                    }}
                    className="absolute w-8 h-8 border border-primary/20 rotate-45"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: "-5%",
                    }}
                />
            ))}

            {/* Subtle patterns */}
            <div className="absolute inset-0 opacity-[0.015]">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-primary/20 rounded-full" />
                <div className="absolute top-1/3 right-1/3 w-64 h-64 border border-primary/20 rounded-full" />
                <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-primary/20 rounded-full" />
            </div>

            {/* Light beams */}
            <motion.div
                animate={{
                    opacity: [0.03, 0.05, 0.03],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[100vh]"
                style={{
                    background: "conic-gradient(from 0deg, transparent, hsl(var(--primary)) 10deg, transparent 50deg)",
                }}
            />
        </div>
    )
}