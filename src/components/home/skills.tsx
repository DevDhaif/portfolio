"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { SkillCard } from "./skill-card"
import { skillsData } from "@/lib/skills-data"
import { useRef } from "react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
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

const createParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 10
    }))
}

export function Skills() {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const particles = createParticles(30)

    return (
        <section
            ref={containerRef}
            className="py-32 relative overflow-hidden bg-transparent"
            id="skills"
        >
            {/* Enhanced background elements */}
            <div className="absolute inset-0">
                {/* <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" /> */}

                {/* Animated particles */}
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full a blur-3xl"
                />
            </div>

            <motion.div
                className="container relative"
                style={{ opacity, y }}
            >
                {/* Enhanced Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                    className="mx-auto mb-20 max-w-2xl text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative inline-block group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:opacity-75 transition-opacity duration-500" />
                        <div className="relative rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm px-6 py-2 text-base text-blue-300 mb-6">
                            Technical Expertise
                        </div>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="relative text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl mb-6"
                    >
                        <span className="absolute blur-2xl opacity-50 bg-gradient-to-b from-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                            Skills & Technologies
                        </span>
                        <span className="relative bg-gradient-to-b from-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                            Skills & Technologies
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-blue-100/70 text-lg sm:text-xl leading-relaxed"
                    >
                        Core competencies and specialized skills across the full stack development spectrum.
                    </motion.p>
                </motion.div>

                {/* Enhanced Skills Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative"
                >
                    {/* Enhanced grid decorative elements */}
                    <div className="absolute inset-0 bg-gradient-to-b  blur-3xl" />
                    <motion.div
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r  to-transparent"
                        animate={{ scaleX: [0, 1] }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-px "
                        animate={{ scaleX: [0, 1] }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Skill Cards with enhanced animations */}
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            variants={{
                                hidden: { opacity: 0, y: 20, scale: 0.9 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 10,
                                        delay: index * 0.1
                                    }
                                }
                            }}
                            whileHover={{ y: -5 }}
                            className="relative group"
                        >
                            {/* Enhanced card glow effect */}
                            <motion.div
                                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 blur"
                                initial={{ scale: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                            />

                            <SkillCard
                                title={skill.title}
                                items={skill.items}
                                icon={skill.icon}
                                index={index}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}