// src/components/home/skill-card.tsx
"use client"

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory, SkillItem } from "@/lib/types";

interface SkillCardProps extends SkillCategory {
    index: number;
}

export function SkillCard({ title, items, icon, index }: SkillCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
            }}
            viewport={{ once: true }}
        >
            <Card className="relative overflow-hidden group h-full">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-6 h-full"
                >
                    {/* Category icon with glow */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full transform  transition-transform duration-500" />
                    </div>

                    {/* Category title */}
                    <div className="mb-4 flex items-center ">
                        <div className="relative mr-2 flex h-14 w-14 items-center justify-center rounded-xl ring-primary/20">
                            {icon}
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                        <div className="ml-3 h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                    </div>

                    {/* Skills grid */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        {items.map((skill) => (
                            <motion.div
                                key={skill.name}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-2"
                            >
                                <Badge
                                    variant={skill.level === 'essential' ? 'default' : skill.level === 'advanced' ? 'secondary' : 'outline'}
                                    className={`
                    px-3 py-1.5 flex items-center gap-2
                    ${skill.level === 'essential' ? 'bg-primary/10 hover:bg-primary/20 text-primary' :
                                            skill.level === 'advanced' ? 'bg-secondary/10 hover:bg-secondary/20 text-secondary' :
                                                'hover:bg-muted'}
                  `}
                                >
                                    <span className="w-4 h-4">{skill.icon}</span>
                                    {skill.name}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Card>
        </motion.div>
    );
}