"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const experiences = [
    {
        title: "Front-End Engineer",
        company: "ADX ,  Riyadh",
        period: "11/2024 ,  Present",
        current: true,
        description:
            "Building a digital signage platform end-to-end ,  campaign simulator, drag-and-drop playlist tool, and a multi-tenant management dashboard.",
        skills: ["React", "Next.js", "TypeScript", "Zustand", "React Query", "Tailwind CSS", "dnd-kit", "i18next"],
        achievements: [
            "Architected the 'Try ADx' virtual campaign simulator with client-side aspect-ratio detection for instant media preview on custom illustrations.",
            "Built a drag-and-drop playlist and media-creation tool with in-browser image editing and a template maker using dnd-kit.",
            "Established Arabic RTL / English LTR support with i18next, following WCAG and semantic HTML across the platform.",
            "Integrated the web-based signage player with 6 microservices APIs (content, scheduling, analytics, devices, users, media) with sync + recovery.",
            "Constructed the core management dashboard with multi-tenant support and an 8+ role RBAC system with location-based permissions.",
        ],
    },
    {
        title: "Full-Stack Freelance Developer",
        company: "Independent",
        period: "01/2018 ,  Present",
        current: true,
        description:
            "End-to-end web apps across diverse domains ,  frontend-led with full-stack reach, deployed on Vercel and Digital Ocean.",
        skills: ["React", "Next.js", "TypeScript", "Laravel", "MySQL", "Supabase", "Framer Motion", "GSAP"],
        achievements: [
            "Delivered 5+ complete web applications from concept to deployment.",
            "Achieved 90+ Lighthouse scores (e.g. Miyar Capital) via dynamic imports, code splitting, next-gen image optimization, and DevTools profiling.",
            "Cut page load times 30,40% through Core Web Vitals work, lifting search rankings.",
            "Built RESTful APIs with Laravel and MySQL with 99.5% uptime.",
            "Shipped polished motion and micro-interactions with CSS animations, Framer Motion, and GSAP.",
        ],
    },
    {
        title: "Front-End Developer",
        company: "Meraki UI Lab",
        period: "05/2020 ,  11/2024",
        current: false,
        description:
            "Crafted reusable, accessible component systems with consistent brand identity for cross-functional product teams.",
        skills: ["React.js", "TailwindCSS", "JavaScript", "HTML5", "CSS3", "WCAG"],
        achievements: [
            "Increased website traffic by 20% within six months by optimizing page load speed and content clarity.",
            "Shipped 150+ reusable components with consistent brand identity, cutting development time by 35%.",
            "Applied RTL support for 100% of components with semantic HTML and ARIA, lifting Arabic-speaking engagement by 27%.",
            "Delivered interfaces with 95% client satisfaction inside a 4-person cross-functional team.",
        ],
    },
];

export function Experience() {
    return (
        <section id="experience" className="relative bg-paper-panel py-24 md:py-32">
            <div className="container-dev">
                <SectionHeading
                    index="05"
                    eyebrow="experience"
                    title={
                        <>
                            Where the <span className="relative inline-block">
                                hours
                                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                            </span> went.
                        </>
                    }
                />

                <div className="relative mt-16">
                    {/* Spine line */}
                    <div className="absolute left-3 top-2 bottom-2 w-px bg-rule md:left-4" />

                    <ol className="space-y-12">
                        {experiences.map((exp, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="relative pl-12 md:pl-16"
                            >
                                {/* Dot */}
                                <div className="absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-full border border-signal bg-paper md:h-9 md:w-9">
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full bg-signal ${exp.current ? "animate-pulse" : ""}`}
                                    />
                                </div>

                                <article className="overflow-hidden rounded-lg border border-rule bg-paper-raised">
                                    {/* Header bar */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-paper-sunken px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-3.5 w-3.5 text-ink-muted" />
                                            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                                                {exp.company}
                                            </span>
                                        </div>
                                        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                                            {exp.period}
                                            {exp.current && (
                                                <span className="ml-2 rounded-sm bg-signal/15 px-1.5 py-0.5 text-[10px] text-signal">
                                                    current
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="p-5 md:p-6">
                                        <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                                            {exp.title}
                                        </h3>
                                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
                                            {exp.description}
                                        </p>

                                        <ul className="mt-5 space-y-2.5">
                                            {exp.achievements.map((a, j) => (
                                                <li
                                                    key={j}
                                                    className="flex items-start gap-2.5 text-sm text-ink"
                                                >
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
                                                    <span className="leading-snug">{a}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {exp.skills.map((s) => (
                                                <span key={s} className="chip">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
