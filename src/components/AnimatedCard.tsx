// components/animated-card.tsx
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedCardProps {
    children: ReactNode
    gradient?: string
    shadowColor?: string
    className?: string
}

export function AnimatedCard({
    children,
    gradient = "from-blue-500 to-cyan-500",
    shadowColor = "shadow-blue-500/20",
    className = ""
}: AnimatedCardProps) {
    return (
        <div className="relative group cursor-pointer">
            {/* Gradient background */}
            <div className={`
                absolute inset-0 rounded-xl bg-gradient-to-br ${gradient}
                opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur
            `} />

            {/* Card content with floating animation */}
            <motion.div
                animate={{
                    y: [-2, 2, -2],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className={`
                    flex  items-center gap-2 px-4 py-2  rounded-xl
                    bg-blue-900/10 backdrop-blur-sm
                    border border-blue-500/20
                    group-hover:border-blue-500/40
                    transition-all duration-300
                    ${shadowColor} hover:shadow-lg
                    ${className}
                `}
            >
                {children}
            </motion.div>

            {/* Hover glow effect */}
            <motion.div
                className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300`}
                style={{ zIndex: -1 }}
            />
        </div>
    )
}