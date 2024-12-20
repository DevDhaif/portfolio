// components/ui/section-wrapper.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, ReactNode } from "react"

interface SectionWrapperProps {
    children: ReactNode
    id?: string
    className?: string
    title: string
    subtitle?: string
    badge?: string
}

export function SectionWrapper({ children, id, className = "", title, subtitle, badge }: SectionWrapperProps) {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <section
            ref={containerRef}
            id={id}
            className={`py-24 sm:py-32 relative overflow-hidden ${className}`}
        >
            <motion.div
                className="container relative"
                style={{ opacity, y }}
            >
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
                            variants={{
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
                            }}
                            className="relative inline-block group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:opacity-75 transition-opacity duration-500" />
                            <div className="relative rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm px-6 py-2 text-base text-blue-300 mb-6">
                                {badge}
                            </div>
                        </motion.div>
                    )}

                    <motion.h2
                        variants={{
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
                        }}
                        className="relative text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl mb-6"
                    >
                        <span className="absolute blur-2xl opacity-50 bg-gradient-to-b from-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                            {title}
                        </span>
                        <span className="relative bg-gradient-to-b from-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </motion.h2>

                    {subtitle && (
                        <motion.p
                            variants={{
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
                            }}
                            className="text-blue-100/70 text-lg sm:text-xl leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </motion.div>

                {children}
            </motion.div>
        </section>
    )
}