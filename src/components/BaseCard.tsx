// components/ui/base-card.tsx
"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BaseCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode
    index: number
    className?: string
    onHoverStart?: () => void
    onHoverEnd?: () => void
    gradient?: boolean
}

export function BaseCard({
    children,
    index,
    className = "",
    onHoverStart,
    onHoverEnd,
    gradient = true,
    ...props
}: BaseCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
            }
        }
    }

    const hoverVariants = {
        idle: { y: 0 },
        hover: {
            y: -8,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            className="relative group !h-full" // This ensures the card takes full height
            {...props}
        >
            <motion.div
                variants={hoverVariants}
                initial="idle"
                whileHover="hover"
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                className={cn(
                    "relative h-full flex flex-col", // Full height flex container
                    "bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden",
                    "border border-white/5 transition-colors duration-300",
                    "group-hover:border-white/10 group-hover:bg-black/50",
                    className
                )}
            >
                {gradient && (
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                        animate={{
                            background: [
                                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.05) 0%, transparent 50%)",
                                "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.05) 0%, transparent 50%)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                )}

                {children}

                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/5 via-white/3 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 via-white/3 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
        </motion.div>
    )
}