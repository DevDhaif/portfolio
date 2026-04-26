"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

// Featured (large tiles) + secondary (small tiles).
const featured = [
    { name: "React", icon: "/icons/react.svg", note: "primary frontend lib" },
    { name: "Next.js", icon: "/icons/next.svg", note: "app router, RSC" },
    { name: "TypeScript", icon: "/icons/typescript.svg", note: "default language" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.svg", note: "design system" },
];

const groups: { label: string; items: { name: string; icon: string }[] }[] = [
    {
        label: "frontend",
        items: [
            { name: "HTML", icon: "/icons/html.svg" },
            { name: "CSS", icon: "/icons/css.svg" },
            { name: "JavaScript", icon: "/icons/js.svg" },
            { name: "Vue.js", icon: "/icons/vue.svg" },
            { name: "React Query", icon: "/icons/react-query.svg" },
            { name: "Zustand", icon: "/icons/zustand.svg" },
        ],
    },
    {
        label: "backend",
        items: [
            { name: "PHP", icon: "/icons/php.svg" },
            { name: "Laravel", icon: "/icons/laravel.svg" },
            { name: "MySQL", icon: "/icons/sql.svg" },
            { name: "Firebase", icon: "/icons/firebase.svg" },
            { name: "Supabase", icon: "/icons/supabase.svg" },
        ],
    },
    {
        label: "tools",
        items: [
            { name: "Git", icon: "/icons/git.svg" },
            { name: "GitHub", icon: "/icons/github.svg" },
            { name: "VS Code", icon: "/icons/vscode.svg" },
            { name: "Postman", icon: "/icons/postman.svg" },
            { name: "Vercel", icon: "/icons/vercel.svg" },
            { name: "npm", icon: "/icons/npm.svg" },
            { name: "Vite", icon: "/icons/vite.svg" },
        ],
    },
];

export function SkillsSection() {
    const allSkills = [
        ...featured.map((f) => ({ name: f.name, icon: f.icon })),
        ...groups.flatMap((g) => g.items),
    ];

    return (
        <section id="skills" className="relative py-24 md:py-32">
            <div className="container-dev">
                <SectionHeading
                    index="03"
                    eyebrow="tech_stack"
                    title={
                        <>
                            The tools I <span className="relative inline-block">
                                reach for
                                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                            </span>.
                        </>
                    }
                    subtitle="Featured day-to-day, plus the rest of the kit."
                />

                {/* Featured row ,  large tiles */}
                <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {featured.map((s) => (
                        <article
                            key={s.name}
                            className="group relative flex flex-col justify-between rounded-lg border border-rule bg-paper-raised p-5 transition-colors hover:border-signal/50 frame-brackets aspect-[5/4]"
                        >
                            <Image
                                src={s.icon}
                                alt={s.name}
                                width={36}
                                height={36}
                                className="h-9 w-9 object-contain transition-transform group-hover:scale-110"
                            />
                            <div>
                                <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-signal">
                                    {s.name}
                                </h3>
                                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                                    {s.note}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Grouped list */}
                <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule lg:grid-cols-3">
                    {groups.map((group) => (
                        <div key={group.label} className="bg-paper-raised p-5">
                            <div className="flex items-baseline justify-between border-b border-rule pb-3">
                                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                                    {`// ${group.label}`}
                                </p>
                                <span className="font-mono text-[10px] text-ink-faint">
                                    {String(group.items.length).padStart(2, "0")}
                                </span>
                            </div>
                            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                                {group.items.map((skill) => (
                                    <li
                                        key={skill.name}
                                        className="group/tile flex items-center gap-2 rounded-md border border-rule bg-paper-sunken p-2.5 transition-colors hover:border-signal/40"
                                    >
                                        <Image
                                            src={skill.icon}
                                            alt=""
                                            width={18}
                                            height={18}
                                            className="h-[18px] w-[18px] object-contain"
                                        />
                                        <span className="text-sm text-ink">{skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Marquee */}
                <div className="relative mt-12 overflow-hidden border-y border-rule bg-paper-panel py-5">
                    <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
                        {[...allSkills, ...allSkills].map((s, i) => (
                            <span
                                key={`${s.name}-${i}`}
                                className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-ink-muted md:text-3xl"
                            >
                                <Image
                                    src={s.icon}
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="h-6 w-6 object-contain opacity-80"
                                />
                                {s.name}
                                <span className="text-ink-faint text-base">●</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
