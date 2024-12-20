// components/ui/grid-items-wrapper.tsx
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GridItemsWrapperProps {
    children: ReactNode
    className?: string
    columnClassName?: string
}

export function GridItemsWrapper({ children, className = "", columnClassName = "sm:grid-cols-2 lg:grid-cols-3" }: GridItemsWrapperProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
            className={`grid gap-8 ${columnClassName} relative ${className}`}
        >
            {children}
        </motion.div>
    )
}