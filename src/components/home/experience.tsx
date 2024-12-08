"use client"
import { motion } from "framer-motion"

const experiences = [
    {
        title: "Senior Frontend Developer",
        company: "Tech Company",
        period: "2022 - Present",
        description: "Leading the frontend development team, implementing modern web applications using Next.js and TypeScript.",
    },
    {
        title: "Full Stack Developer",
        company: "Startup Inc",
        period: "2020 - 2022",
        description: "Developed full-stack applications using React, Next js , Vue js , Tailwindcss Laravel, and MongoDB. Implemented real-time features and payment integrations.",
    },

]

export function Experience() {
    return (
        <section className="py-12 sm:py-20">
            <div className="container px-4 mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl mb-8 sm:mb-16 text-center"
                >
                    Work Experience
                </motion.h2>

                {/* Desktop Timeline */}
                <div className="hidden md:block relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />
                    <div className="space-y-12">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                            >
                                <div className="w-1/2 pr-8 pl-8">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-card p-6 rounded-lg border shadow-sm"
                                    >
                                        <h3 className="font-semibold text-lg">{experience.title}</h3>
                                        <p className="text-sm text-primary">{experience.company}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{experience.period}</p>
                                        <p className="mt-2 text-sm">{experience.description}</p>
                                    </motion.div>
                                </div>
                                <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                                    <div className="w-3 h-3 rounded-full bg-background" />
                                </div>
                                <div className="w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                    <div className="space-y-8">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative pl-12"
                            >
                                <div className="absolute left-0 top-5 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                                    <div className="w-3 h-3 rounded-full bg-background" />
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-card p-6 rounded-lg border shadow-sm"
                                >
                                    <h3 className="font-semibold text-lg">{experience.title}</h3>
                                    <p className="text-sm text-primary">{experience.company}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{experience.period}</p>
                                    <p className="mt-2 text-sm">{experience.description}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}