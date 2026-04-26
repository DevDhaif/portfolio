"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Layers, FileCode, Search, Briefcase, Server, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RiyadhClock } from "@/components/ui/riyadh-clock";
import { PostsResponse } from "@/types";
import CountUp from "../bits/CountUp";
import { Magnetic } from "../ui/magnetic";

const services = [
    { icon: Code2, title: "Front-end engineering", description: "React, Next.js, TypeScript, Tailwind." },
    { icon: Server, title: "Full-stack work", description: "Laravel, PHP, MySQL, Supabase." },
    { icon: FileCode, title: "Design implementation", description: "Pixel-true designs in clean code." },
    { icon: Layers, title: "System & UI architecture", description: "Component systems, render strategy." },
    { icon: Briefcase, title: "Product ownership", description: "Requirements, analysis, UML, scope." },
    { icon: Search, title: "SEO & performance", description: "Schemas, Core Web Vitals, ranking." },
];

const principlesLines = [
    { kw: "ship", val: "small · often · honest" },
    { kw: "owns", val: "ui · api · scope" },
    { kw: "values", val: "clarity · perf · a11y" },
    { kw: "rejects", val: "scope creep · magic · ceremony" },
    { kw: "tests", val: "real db · real users" },
    { kw: "writes", val: "diffs > docs" },
];

export function AboutSection() {
    const [postsCount, setPostsCount] = useState("0");
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

    useEffect(() => {
        async function fetchPostsCount() {
            try {
                const response = await fetch("/api/posts/count");
                if (!response.ok) throw new Error("Failed to fetch posts count");
                const data: PostsResponse = await response.json();
                setPostsCount(`${data.count}`);
            } catch (error) {
                console.error("Error fetching posts count:", error);
                setPostsCount("0");
            } finally {
                setIsLoadingPosts(false);
            }
        }
        fetchPostsCount();
    }, []);

    return (
        <section id="about" className="relative bg-paper-panel py-24 md:py-32">
            <div className="container-dev">
                <SectionHeading
                    index="01"
                    eyebrow="about_me"
                    title={
                        <>
                            I build interfaces<br />
                            that <span className="relative inline-block">
                                hold up
                                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                            </span>.
                        </>
                    }
                />

                {/* Bento — tighter on desktop, no oversize gaps */}
                <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-3 lg:auto-rows-[92px]">
                    {/* Tile A: bio + CTA — 4col x 4row (compact) */}
                    <BentoTile className="md:col-span-4 lg:row-span-4 p-6 md:p-7 flex flex-col">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                            {`// bio`}
                        </p>
                        <p className="mt-4 text-lg leading-relaxed text-ink md:text-xl">
                            Front-end engineer with 5+ years of React. I build
                            accessible bilingual RTL/LTR interfaces, ship 90+
                            Lighthouse scores, and reach for Laravel when the backend
                            needs me.
                        </p>
                        <p
                            lang="ar"
                            dir="rtl"
                            className="mt-3 text-sm leading-relaxed text-ink-muted"
                        >
                            ضيف الله أحمد الفروي — مطور واجهات أمامية،
                            متخصص في React و Next.js و TypeScript و Laravel.
                        </p>

                        <div className="mt-auto flex flex-wrap gap-3 pt-6">
                            <Magnetic>
                                <Link href="#projects" className="btn-signal press">
                                    view work
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="#contact" className="btn-ghost press">
                                    start a brief
                                </Link>
                            </Magnetic>
                        </div>
                    </BentoTile>

                    {/* Tile B: location — 2col x 2row */}
                    <BentoTile className="md:col-span-2 lg:row-span-2 p-5">
                        <div className="flex h-full flex-col justify-between">
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                                {`// location`}
                            </p>
                            <p className="inline-flex items-center gap-2 font-display text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
                                <MapPin className="h-5 w-5 shrink-0 text-ink-muted" />
                                Riyadh, Saudi Arabia
                            </p>
                        </div>
                    </BentoTile>

                    {/* Tile C: clock — 2col x 2row */}
                    <BentoTile className="md:col-span-2 lg:row-span-2 p-5">
                        <RiyadhClock />
                    </BentoTile>

                    {/* Stats — one full-width tile, 4 cells inside */}
                    <BentoTile className="md:col-span-6 lg:row-span-1 p-0 overflow-hidden">
                        <div className="grid h-full grid-cols-2 gap-px bg-rule sm:grid-cols-4">
                            <div className="bg-paper-raised p-5">
                                <Stat label="years" value="5+" small />
                            </div>
                            <div className="bg-paper-raised p-5">
                                <Stat label="projects" value="12+" small />
                            </div>
                            <div className="bg-paper-raised p-5">
                                <Stat label="clients" value="10+" small />
                            </div>
                            <div className="bg-paper-raised p-5">
                                <Stat
                                    label="posts"
                                    value={isLoadingPosts ? null : postsCount}
                                    small
                                />
                            </div>
                        </div>
                    </BentoTile>

                    {/* Tile H: principles code window — half width on lg */}
                    <BentoTile className="md:col-span-6 lg:col-span-3 lg:row-span-4 p-0 overflow-hidden">
                        <div className="code-window-header">
                            <span className="dot-light bg-rule-strong" />
                            <span className="dot-light bg-rule-strong" />
                            <span className="dot-light bg-rule-strong" />
                            <span className="ml-2 font-mono text-xs text-ink-muted">
                                ~/principles.json
                            </span>
                            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                                json
                            </span>
                        </div>
                        <pre className="overflow-x-auto p-4 font-mono text-[11.5px] leading-[1.6] text-ink">
                            <code>
                                <div>
                                    <Gutter n={1} />
                                    <Bracket>{"{"}</Bracket>
                                </div>
                                {principlesLines.map((line, i) => (
                                    <div key={line.kw}>
                                        <Gutter n={i + 2} />
                                        <span className="pl-3">
                                            <Key>{line.kw}</Key>
                                            <Punc>: </Punc>
                                            <Bracket>[</Bracket>
                                            {line.val.split(" · ").map((v, j, arr) => (
                                                <span key={v}>
                                                    <Str>{v}</Str>
                                                    {j < arr.length - 1 && <Punc>, </Punc>}
                                                </span>
                                            ))}
                                            <Bracket>]</Bracket>
                                            {i < principlesLines.length - 1 && <Punc>,</Punc>}
                                        </span>
                                    </div>
                                ))}
                                <div>
                                    <Gutter n={principlesLines.length + 2} />
                                    <Bracket>{"}"}</Bracket>
                                </div>
                            </code>
                        </pre>
                    </BentoTile>

                    {/* Services — half width on lg, sits next to principles.json */}
                    <BentoTile className="md:col-span-6 lg:col-span-3 lg:row-span-4 p-0 overflow-hidden flex flex-col">
                        <div className="border-b border-rule px-5 py-3">
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                                {`// services`}
                            </p>
                        </div>
                        <ul className="grid flex-1 grid-cols-1 gap-px bg-rule sm:grid-cols-2">
                            {services.map((s) => (
                                <li
                                    key={s.title}
                                    className="group bg-paper-raised p-4 transition-colors hover:bg-paper"
                                >
                                    <s.icon className="h-4 w-4 text-ink-muted transition-colors group-hover:text-signal" />
                                    <h3 className="mt-2.5 font-display text-sm font-bold tracking-tight text-ink">
                                        {s.title}
                                    </h3>
                                    <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                                        {s.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </BentoTile>
                </div>
            </div>
        </section>
    );
}

function BentoTile({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`group relative rounded-lg border border-rule bg-paper-raised transition-colors hover:border-rule-strong ${className}`}
        >
            {children}
        </div>
    );
}

// JSON syntax tokens — colorize ~/principles.json like a real editor.
function Key({ children }: { children: React.ReactNode }) {
    return <span className="text-[#7DD3FC]">&quot;{children}&quot;</span>;
}
function Str({ children }: { children: React.ReactNode }) {
    return <span className="text-[#A7F3A0]">&quot;{children}&quot;</span>;
}
function Punc({ children }: { children: React.ReactNode }) {
    return <span className="text-ink-faint">{children}</span>;
}
function Bracket({ children }: { children: React.ReactNode }) {
    return <span className="text-[#F0ABFC]">{children}</span>;
}
function Gutter({ n }: { n: number }) {
    return (
        <span className="select-none mr-3 inline-block w-5 text-right text-ink-faint/70">
            {n}
        </span>
    );
}

function Stat({
    label,
    value,
    small,
}: {
    label: string;
    value: string | null;
    small?: boolean;
}) {
    return (
        <div className="flex h-full flex-col justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                {`// ${label}`}
            </p>
            <p
                className={`font-display font-bold tracking-tight text-ink tabular-nums ${small ? "text-3xl md:text-4xl" : "text-5xl md:text-6xl"
                    }`}
            >
                {value === null ? (
                    <span className="inline-block h-8 w-12 animate-pulse rounded bg-rule" />
                ) : (
                    <CountUp
                        from={0}
                        to={value}
                        separator=","
                        direction="up"
                        duration={2}
                        className="count-up-text"
                        onStart={undefined}
                        onEnd={undefined}
                    />
                )}
            </p>
        </div>
    );
}
