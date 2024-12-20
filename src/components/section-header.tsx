// components/ui/section-header.tsx
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionHeaderProps {
    badge?: ReactNode
    title: string
    description: string
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.1
                    }
                }
            }}
            className="mx-auto mb-20 max-w-2xl text-center"
        >
            {badge && (
                <motion.div
                    variants={itemVariants}
                    className="relative inline-block group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="relative rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm px-6 py-2 text-base text-blue-300 mb-6">
                        {badge}
                    </div>
                </motion.div>
            )}

            <motion.h2
                variants={itemVariants}
                className="relative text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl mb-6"
            >
                <span className="absolute blur-2xl opacity-50 bg-gradient-to-b from-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                    {title}
                </span>
                <span className="relative bg-gradient-to-b from-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                    {title}
                </span>
            </motion.h2>

            <motion.p
                variants={itemVariants}
                className="text-blue-100/70 text-lg sm:text-xl leading-relaxed"
            >
                {description}
            </motion.p>
        </motion.div>
    )
}