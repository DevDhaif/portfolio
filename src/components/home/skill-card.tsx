'use client';

import { motion } from "framer-motion"
import type { SkillCategory } from "@/lib/types"
import { BaseCard } from "../BaseCard"
import Image from "next/image"

interface SkillCardProps extends SkillCategory {
    index: number
}

export function SkillCard({ title, subtitle, items, icon, index }: SkillCardProps) {
    return (
        <BaseCard index={index}>
            <div className="p-6 h-full flex flex-col">
                {/* Category header */}
                <div className="flex items-start gap-4 mb-6">
                    {/* Icon container with enhanced glow effect */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative flex h-16 w-16 items-center justify-center"
                    >
                        {/* Enhanced glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transform group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors duration-500" />
                        {/* Icon background with gradient */}
                        <div className="relative z-10 flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
                            {icon}
                        </div>
                    </motion.div>

                    {/* Title and subtitle */}
                    <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-white mb-1">
                            {title}
                        </h3>
                        <p className="text-sm text-blue-200/60">{subtitle}</p>
                        <div className="h-px w-full bg-gradient-to-r from-blue-500/20 to-transparent mt-3" />
                    </div>
                </div>

                {/* Skills grid with enhanced visual hierarchy */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {items.map((skill, idx) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                whileHover={{ y: -2, scale: 1.02 }}
                                className={`
                                    flex items-center flex-col text-center gap-2 px- py-2 rounded-xl
                                    backdrop-blur-sm transition-all duration-200
                                    ${skill.level === 'essential'
                                        ? 'bg-blue-500/10 border border-blue-500/20 text-white hover:bg-blue-500/20'
                                        : skill.level === 'advanced'
                                            ? 'bg-purple-500/10 border border-purple-500/20 text-blue-100 hover:bg-purple-500/20'
                                            : 'bg-white/5 border border-white/10 text-blue-200 hover:bg-white/10'
                                    }
                                `}
                            >
                                <div className="w-6 h-6 relative flex items-center justify-center">
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="w-full h-full"
                                    />
                                </div>
                                <span className="text-sm font-medium">{skill.name}</span>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </BaseCard>
    )
}