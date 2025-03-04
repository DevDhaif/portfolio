"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BriefcaseIcon, CalendarIcon } from "lucide-react"
import { useRef } from "react"

const experiences = [
    {
        title: "Front-End Web Developer",
        company: "Meraki UI Lab",
        period: "05/2020 - Present",
        description: "Lead frontend developer creating responsive UI components and improving website performance with modern web technologies.",
        skills: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vue.js", "React.js"],
        achievements: [
            "Enhanced front-end UX and increased website traffic by 20% in six months by optimizing page load speed and content clarity",
            "Collaborated effectively within a 4-person team to deliver a user-friendly and responsive website",
            "Designed and developed more than 150 reusable and responsive components",
            "Expanded website accessibility by implementing RTL support for 100% of components"
        ]
    },
    {
        title: "Software Developer",
        company: "Freelance & Projects",
        period: "2020 - Present",
        description: "Full stack developer with focus on Laravel backend development and modern frontend technologies.",
        skills: ["PHP", "Laravel", "MySQL", "Firebase", "Supabase", "RESTful APIs"],
        achievements: [
            "Developed and maintained dynamic web applications with Laravel and MySQL",
            "Designed and implemented efficient and scalable RESTful APIs",
            "Optimized database architecture using both SQL and NoSQL solutions",
            "Utilized version control effectively with Git and GitHub",
            "Applied strong problem-solving skills and data structure knowledge to improve application efficiency"
        ]
    },
    {
        title: "Front-End Developer",
        company: "Various Projects",
        period: "2018 - Present",
        description: "Frontend specialist creating responsive and interactive web applications.",
        skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Vue.js", "Bootstrap", "Tailwind CSS", "Redux", "Vuex"],
        achievements: [
            "Created responsive and interactive web pages emphasizing user experience and accessibility",
            "Styled applications using CSS frameworks ensuring consistency across devices",
            "Implemented effective state management with Redux and Vuex",
            "Utilized UI component libraries like Material UI and Vuetify",
            "Optimized applications for performance, including lazy loading and code splitting"
        ]
    }
];

export function Experience() {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 0%"]
    })

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.9, 1],
        [0.3, 1, 1, 0.3]
    )

    const y = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["0%", "3%", "0%"]
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
                transition={{ duration: 0.1, ease: "easeOut" }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50%" }}
                    transition={{ duration: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent"
                >
                    Work Experience
                </motion.h2>

                {/* Desktop Timeline */}
                <div className="hidden md:block relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-blue-500" />
                    <div className="space-y-16">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{
                                    once: true,
                                    margin: "-25%",
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                            >
                                <div className="w-1/2 pr-8 pl-8">
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                        className="relative group duration-200"
                                    >
                                        {/* Card glow effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-50"
                                            transition={{ duration: 0.1 }}
                                        />

                                        {/* Card content */}
                                        <div className="relative p-6 rounded-xl border border-blue-500/50 bg-slate-950 backdrop-blur-sm">
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
                                        delay: index * 0.1 + 0.1,
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
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-500" />
                    {experiences.map((experience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{
                                once: true,
                                margin: "-30%",
                            }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.05,
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
                                    delay: index * 0.2 + 0.1,
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
                                <div className="relative p-6 rounded-xl border border-blue-500/50 bg-slate-950/90 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <BriefcaseIcon className="min-w-5 min-h-5 text-blue-400" />
                                        <h3 className="font-semibold text-pretty text-lg text-blue-100">
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