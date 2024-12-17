"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BriefcaseIcon, CalendarIcon, ExternalLinkIcon } from "lucide-react"
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
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <section
            ref={containerRef}
            className="py-24 sm:py-32 relative overflow-hidden"
        >


            <motion.div
                className="container relative"
                style={{ opacity, y }}
            >
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
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
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                    type: "spring",
                                    damping: 15
                                }}
                                className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                            >
                                <div className="w-1/2 pr-8 pl-8">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="relative group"
                                    >
                                        {/* Card glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

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

                                            {/* Skills */}
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

                                            {/* Achievements */}
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
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
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
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2,
                                type: "spring",
                                damping: 15
                            }}
                            className="relative pl-12"
                        >
                            {/* Timeline dot for mobile */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                className="absolute left-0 top-5 z-10"
                            >
                                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl" />
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                                    <div className="w-3 h-3 rounded-full bg-white" />
                                </div>
                            </motion.div>

                            {/* Mobile card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative p-6 rounded-xl border border-blue-500/20 bg-blue-950/40 backdrop-blur-sm">
                                    {/* Same content structure as desktop */}
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