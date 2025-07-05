"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillCard } from "../ui/skill-card";
import { Code, Server, Wrench, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

// Skills data
const skillsData = {
    frontend: [
        { name: "HTML", icon: "/icons/html.svg" },
        { name: "CSS", icon: "/icons/css.svg" },
        { name: "JavaScript", icon: "/icons/js.svg" },
        { name: "TypeScript", icon: "/icons/typescript.svg" },
        { name: "React.js", icon: "/icons/react.svg" },
        { name: "Next.js", icon: "/icons/next.svg" },
        { name: "Vue.js", icon: "/icons/vue.svg" },
        { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
        { name: "Redux", icon: "/icons/redux.svg" },
        { name: "Zustand", icon: "/icons/zustand.svg" },
    ],
    backend: [
        { name: "PHP", icon: "/icons/php.svg" },
        { name: "Laravel", icon: "/icons/laravel.svg" },
        { name: "MySQL", icon: "/icons/sql.svg" },
        { name: "Firebase", icon: "/icons/firebase.svg" },
        { name: "Supabase", icon: "/icons/supabase.svg" },
    ],
    tools: [
        { name: "Git", icon: "/icons/git.svg" },
        { name: "GitHub", icon: "/icons/github.svg" },
        { name: "VS Code", icon: "/icons/vscode.svg" },
        { name: "Vercel", icon: "/icons/vercel.svg" },
        { name: "npm", icon: "/icons/npm.svg" },
        { name: "Vite", icon: "/icons/vite.svg" },
    ],
};

// Icons for each category
const categoryIcons = {
    all: <Layers className="h-4 w-4" />,
    frontend: <Code className="h-4 w-4" />,
    backend: <Server className="h-4 w-4" />,
    tools: <Wrench className="h-4 w-4" />,
};

export function SkillsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState("all");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

    const allSkills = [
        ...skillsData.frontend.map(skill => ({ ...skill, category: "frontend" })),
        ...skillsData.backend.map(skill => ({ ...skill, category: "backend" })),
        ...skillsData.tools.map(skill => ({ ...skill, category: "tools" })),
    ];

    const getFilteredSkills = () => {
        if (activeTab === "all") return allSkills;
        return skillsData[activeTab as keyof typeof skillsData].map(skill => ({
            ...skill,
            category: activeTab,
        }));
    };

    const filteredSkills = getFilteredSkills();

    return (
        <section
            id="skills"
            ref={containerRef}
            className="py-24 md:py-32 relative overflow-hidden bg-background"
        >
            <motion.div
                style={{ opacity, y }}
                className="container max-w-6xl mx-auto px-4"
            >
                <SectionHeading
                    title="Skills & Expertise"
                    subtitle="Technologies and tools I work with"
                    badge="Tech Stack"
                />

                <div className="mt-12">
                    {/* Custom Tabs */}
                    <div className="flex flex-wrap justify-center mb-12 gap-2">
                        {Object.keys(categoryIcons).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                                    "border text-text-primary",
                                    activeTab === category
                                        ? "bg-accent-subtle border-accent-primary/30 text-accent-primary"
                                        : "bg-card border-border hover:border-border-hover"
                                )}
                            >
                                {categoryIcons[category as keyof typeof categoryIcons]}
                                <span className="capitalize">{category}</span>
                            </button>
                        ))}
                    </div>

                    {/* Skills Grid with Animation Container */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} key={activeTab} className="relative overflow-hidden rounded-xl border border-border bg-card/50 p-6">
                        <SkillGrid skills={filteredSkills} />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

type Skill = {
    name: string;
    icon: string;
    category: string;
};

function SkillGrid({ skills }: { skills: Skill[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
                <motion.div
                    key={`${skill.category}-${skill.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex w-full"
                >
                    <SkillCard
                        name={skill.name}
                        icon={skill.icon}
                        category={skill.category}
                    />
                </motion.div>
            ))}
        </div>
    );
}