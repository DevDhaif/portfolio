// src/components/home/skills.tsx
"use client"

import { motion } from "framer-motion";
import { SkillCard } from "./skill-card";
import { skillsData } from "@/lib/skills-data";

export function Skills() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <div className="container relative">
                {/* Enhanced header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-16 max-w-2xl text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4"
                    >
                        Technical Expertise
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"
                    >
                        Skills & Technologies
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg"
                    >
                        Core competencies and specialized skills across the full stack development spectrum.
                    </motion.p>
                </motion.div>

                {/* Skills grid with gap decoration */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative">
                    {/* Grid background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent blur-3xl" />

                    {skillsData.map((skill, index) => (
                        <SkillCard
                            key={skill.title}
                            title={skill.title}
                            items={skill.items}
                            icon={skill.icon}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}