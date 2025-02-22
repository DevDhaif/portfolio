// components/animated-grid.tsx
"use client"

import { motion } from "framer-motion"
import React, { ReactNode } from "react"

interface AnimatedGridProps {
    children: ReactNode
    className?: string
    columnClassName?: string  // For customizing grid columns
    fadeInDelay?: number
}

export function AnimatedGrid({
    children,
    className = "",
    columnClassName = "grid-cols-1 sm:grid-cols-4",
    fadeInDelay = 0.6
}: AnimatedGridProps) {
    return (
        <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: fadeInDelay }}
        >
            <div className={`grid gap-4 ${columnClassName} ${className}`}>
                {React.Children.map(children, (child, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                duration: 0.3,
                                delay: 0.1 * i
                            }
                        }}
                        viewport={{ once: false }} // This makes it re-animate on scroll
                        whileHover={{ scale: 1.05 }}
                        className="relative group h-full"
                    >
                        {child}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}