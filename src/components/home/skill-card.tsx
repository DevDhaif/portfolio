import { motion } from "framer-motion"
import type { SkillCategory } from "@/lib/types"
import { BaseCard } from "../BaseCard"

interface SkillCardProps extends SkillCategory {
    index: number
}

export function SkillCard({ title, items, icon, index }: SkillCardProps) {
    return (
        <BaseCard index={index}>
            <div className="p-6 h-full flex flex-col">
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                    {/* Icon container with glow effect */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative flex h-14 w-14 items-center justify-center"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-white/5 rounded-xl blur-xl transform group-hover:bg-white/10 transition-colors duration-500" />
                        {/* Icon background */}
                        <div className="relative z-10 flex h-full w-full items-center justify-center rounded-xl bg-white/5 border border-white/10">
                            {icon}
                        </div>
                    </motion.div>

                    {/* Title and decorative line */}
                    <div className="flex-grow flex items-center gap-4">
                        <h3 className="text-xl font-semibold text-white">
                            {title}
                        </h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                </div>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-3">
                    {items.map((skill, idx) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                whileHover={{ y: -2 }}
                                className={`
                                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                                        border transition-colors duration-200
                                        ${skill.level === 'essential'
                                        ? 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                                        : skill.level === 'advanced'
                                            ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                    }
                                    `}
                            >
                                <span className="w-4 h-4">{skill.icon}</span>
                                <span>{skill.name}</span>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </BaseCard>
    )
}