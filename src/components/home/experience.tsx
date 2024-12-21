"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BriefcaseIcon, CalendarIcon } from "lucide-react"
import { useRef } from "react"

const experiences = [
    {
        title: "Senior Frontend Developer",
        company: "Tech Company",
        period: "2022 - Present",
        description: "Leading the frontend development team, implementing modern web applications using Next.js and TypeScript.",
        skills: ["Next.js", "React", "TypeScript", "TailwindCSS"],
        achievements: [
            "Led team of 5 developers",
            "Improved performance by 40%",
            "Implemented CI/CD pipeline"
        ]
    },
    {
        title: "Full Stack Developer",
        company: "Startup Inc",
        period: "2020 - 2022",
        description: "Developed full-stack applications using React, Next.js, Vue.js, TailwindCSS, Laravel, and MongoDB. Implemented real-time features and payment integrations.",
        skills: ["React", "Vue.js", "Laravel", "MongoDB"],
        achievements: [
            "Built 20+ features",
            "Reduced loading time by 60%",
            "Implemented payment system"
        ]
    },
]

export function Experience() {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 20%"]
    })

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.9, 1],
        [0.3, 1, 1, 0.3]
    )

    const y = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["0%", "3%", "6%"]
    )

    return (
        <section
            ref={containerRef}
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            <motion.div
                className="container relative"
                style={{ opacity, y }}
                initial={{ opacity: 0, y: "5%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50%" }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent"
                >
                    Work Experience
                </motion.h2>

                {/* Desktop Timeline */}
                <div className="hidden md:block relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />
                    <div className="space-y-16">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{
                                    once: true,
                                    margin: "-25%",
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.3,
                                }}
                                className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                            >
                                <div className="w-1/2 pr-8 pl-8">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                        className="relative group"
                                    >
                                        {/* Card glow effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-50"
                                            transition={{ duration: 0.8 }}
                                        />

                                        {/* Card content */}
                                        <div className="relative p-6 rounded-xl border border-blue-500/20 bg-blue-950/40 backdrop-blur-sm">
                                            <div className="flex items-center gap-2 mb-4">
                                                <BriefcaseIcon className="w-5 h-5 text-blue-400" />
                                                <h3 className="font-semibold text-lg text-blue-100">
                                                    {experience.title}
                                                </h3>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-blue-300 mb-2">
                                                <CalendarIcon className="w-4 h-4" />
                                                <p>{experience.period}</p>
                                            </div>

                                            <p className="text-sm text-blue-200 mb-4">
                                                {experience.company}
                                            </p>

                                            <p className="text-sm text-blue-100/70 mb-4">
                                                {experience.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {experience.skills.map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 text-xs rounded-full 
                                                        bg-blue-500/10 border border-blue-500/20 
                                                        text-blue-200"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <ul className="space-y-2">
                                                {experience.achievements.map((achievement, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-center gap-2 text-sm text-blue-100/70"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Timeline dot */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{
                                        once: true,
                                        margin: "-25%"
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.3 + 0.2,
                                    }}
                                    className="z-10 relative"
                                >
                                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl" />
                                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                                        <div className="w-3 h-3 rounded-full bg-white" />
                                    </div>
                                </motion.div>

                                <div className="w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden relative space-y-12">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />
                    {experiences.map((experience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{
                                once: true,
                                margin: "-30%",
                            }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.4,
                            }}
                            className="relative pl-12"
                        >
                            {/* Mobile timeline dot */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{
                                    once: true,
                                    margin: "-1%"
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.4 + 0.2,
                                }}
                                // Updated positioning and z-index
                                className="absolute left-1 top-2 z-50"
                            >
                                {/* Glow effect with adjusted size */}
                                <div
                                    className="absolute -inset-1 bg-blue-500/20 rounded-full blur-lg"
                                    style={{ transform: 'translateZ(0)' }}
                                />
                                {/* Dot container with fixed size */}
                                <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                                    {/* Inner dot */}
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                </div>
                            </motion.div>

                            {/* Mobile card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                                className="relative group"
                            >
                                {/* Card glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Card content */}
                                <div className="relative p-6 rounded-xl border border-blue-500/20 bg-blue-950/40 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <BriefcaseIcon className="w-5 h-5 text-blue-400" />
                                        <h3 className="font-semibold text-lg text-blue-100">
                                            {experience.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-blue-300 mb-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        <p>{experience.period}</p>
                                    </div>

                                    <p className="text-sm text-blue-200 mb-4">
                                        {experience.company}
                                    </p>

                                    <p className="text-sm text-blue-100/70 mb-4">
                                        {experience.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {experience.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs rounded-full 
                                                bg-blue-500/10 border border-blue-500/20 
                                                text-blue-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <ul className="space-y-2">
                                        {experience.achievements.map((achievement, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2 text-sm text-blue-100/70"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}