// components/ui/grid-item.tsx
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GridItemProps {
    children: ReactNode
    index: number
}

export function GridItem({ children, index }: GridItemProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                        delay: index * 0.1
                    }
                }
            }}
            whileHover={{ y: -5 }}
            className="relative group"
        >
            <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 blur"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
            />
            {children}
        </motion.div>
    )
}