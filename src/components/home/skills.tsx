// components/home/skills.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { SkillCard } from "./skill-card"
import { skillsData } from "@/lib/skills-data"
import { useRef } from "react"
import { GridItemsWrapper } from "@/components/grid-items-wrapper"
import { GridItem } from "@/components/grid-item"
import { ParticleBackground } from "@/components/particle-background"
import { SectionHeader } from "@/components/section-header"

export function Skills() {
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
            className="py-32 relative overflow-hidden bg-transparent"
            id="skills"
        >
            {/* Background elements */}
            {/* <ParticleBackground /> */}

            <motion.div
                className="container relative"
                style={{ opacity, y }}
            >
                <SectionHeader
                    badge="Technical Expertise"
                    title="Skills & Technologies"
                    description="Core competencies and specialized skills across the full stack development spectrum."
                />

                {/* Skill Cards */}
                <GridItemsWrapper>
                    {skillsData.map((skill, index) => (
                        <GridItem key={skill.title} index={index}>
                            <SkillCard
                                title={skill.title}
                                items={skill.items}
                                icon={skill.icon}
                                index={index}
                            />
                        </GridItem>
                    ))}
                </GridItemsWrapper>
            </motion.div>
        </section>
    )
}