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

    // Improved scroll animation configuration
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    // Adjusted opacity transform to keep content visible longer
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.9, 1], // Wider range for visibility
        [0, 1, 1, 0]
    )

    // Smoother and more subtle parallax effect
    const y = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["0%", "2.5%", "5%"] // More gradual movement
    )

    // Add scale transform for extra depth
    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.95, 1, 1, 0.95]
    )

    return (
        <section
            ref={containerRef}
            className="py-32 relative overflow-hidden bg-transparent"
            id="skills"
        >
            <motion.div
                className="container relative"
                style={{
                    opacity,
                    y,
                    scale,
                }}
                initial={{ opacity: 0, y: "2%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ duration: 0.1, ease: "easeOut" }}
            >
                <SectionHeader
                    badge="Technical Expertise"
                    title="Skills & Technologies"
                    description="Core competencies and specialized skills across the full stack development spectrum."
                />

                <GridItemsWrapper>
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                        >
                            <GridItem index={index}>
                                <SkillCard
                                    title={skill.title}
                                    items={skill.items}
                                    subtitle={skill.subtitle}
                                    icon={skill.icon}
                                    index={index}
                                />
                            </GridItem>
                        </motion.div>
                    ))}
                </GridItemsWrapper>
            </motion.div>
        </section>
    )
}