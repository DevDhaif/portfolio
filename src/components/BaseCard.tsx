// components/base-card.tsx
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface BaseCardProps {
    children: ReactNode
    index: number
    className?: string
    onHoverStart?: () => void
    onHoverEnd?: () => void
}

export function BaseCard({
    children,
    index,
    className = "",
    onHoverStart,
    onHoverEnd
}: BaseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
            }}
            viewport={{ once: false }}
            className="relative group h-full rounded-xl"
        >
            <motion.div
                whileHover={{ y: -8 }}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                className={`
                    relative h-full flex flex-col 
                    bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden 
                    border border-white/5
                    ${className}
                `}
            >
                {/* Animated border gradient */}
                <div className="z-10 absolute inset-px rounded-xl overflow-hidden">
                    <div className="z-10 absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {children}

                {/* Decorative corner gradients */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
        </motion.div>
    )
}