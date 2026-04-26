"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDownRight, Github, MapPin, Eye } from "lucide-react";
import { Terminal } from "../ui/terminal";
import { Magnetic } from "../ui/magnetic";

const terminalCommands = [
    "whoami",
    "cat ~/now.txt",
    "ls ./projects | wc -l",
    "echo \"available\"",
];

type JsonValue = string | readonly string[];
const userJson: ReadonlyArray<{ key: string; value: JsonValue }> = [
    { key: "role", value: "front-end engineer" },
    { key: "owns", value: ["ui", "api", "product"] },
    { key: "loc", value: "Riyadh, KSA" },
    { key: "status", value: "available" },
];

export function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const glowY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

    return (
        <section
            id="home"
            ref={ref}
            className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
        >
            {/* Faded grid + scanline */}
            <div className="pointer-events-none absolute inset-0 bg-grid-dev-fade" />
            <div className="pointer-events-none absolute inset-0 bg-scanline" />

            {/* Parallax signal glow */}
            <motion.div
                style={{ y: glowY, opacity: glowOpacity }}
                className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-signal/10 blur-3xl"
            />
            <motion.div
                style={{ y: glowY, opacity: glowOpacity }}
                className="pointer-events-none absolute top-32 -right-40 h-[420px] w-[420px] rounded-full bg-signal/8 blur-3xl"
            />

            <div className="container-dev relative">
                {/* Status row */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
                >
                    <span className="inline-flex items-center gap-2 text-signal">
                        <span className="relative inline-flex h-1.5 w-1.5">
                            <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                        </span>
                        available
                    </span>
                    <span className="text-ink-faint">／</span>
                    <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        riyadh, ksa
                    </span>
                    <span className="text-ink-faint">／</span>
                    <span>v.{new Date().getFullYear()}</span>
                </motion.div>

                {/* Headline + terminal split */}
                <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="stencil text-[clamp(3rem,9vw,8rem)] leading-[0.86] text-ink"
                        >
                            <span className="block">Front-end</span>
                            <span className="block">
                                <span className="relative inline-block">
                                    engineer
                                    <span
                                        aria-hidden="true"
                                        className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80"
                                    />
                                </span>
                            </span>
                            <span className="mt-4 block text-[clamp(1.25rem,2.4vw,2rem)] font-medium leading-tight tracking-tight text-ink-muted">
                                building <span className="font-mono text-ink">{`<`}fast{`/>`}</span>,
                                accessible, durable web applications with React,
                                Next.js & TypeScript.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            lang="ar"
                            dir="rtl"
                            className="mt-5 font-mono text-sm text-ink-muted"
                        >
                            <span className="text-ink">ضيف الله أحمد الفروي</span>
                            {" — "}
                            مطور واجهات أمامية
                        </motion.p>

                        {/* CTA row */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-10 flex flex-wrap items-center gap-3"
                        >
                            <Magnetic>
                                <Link href="#projects" className="btn-signal press">
                                    <Eye className="h-3.5 w-3.5" />
                                    view work
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="#contact" className="btn-ghost press">
                                    <ArrowDownRight className="h-3.5 w-3.5" />
                                    get in touch
                                </Link>
                            </Magnetic>
                            <Link
                                href="https://github.com/devdhaif"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-ghost press"
                            >
                                <Github className="h-3.5 w-3.5" />
                                github
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right column: terminal + code-snippet stack */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="lg:col-span-5 space-y-5"
                    >
                        <Terminal
                            commands={terminalCommands}
                            typingSpeed={60}
                            delayBetweenCommands={1400}
                            title="dhaif@portfolio: ~"
                            height="h-[260px]"
                            className="shadow-card"
                        />

                        {/* Code-snippet card */}
                        <div className="code-window">
                            <div className="code-window-header">
                                <span className="dot-light bg-rule-strong" />
                                <span className="dot-light bg-rule-strong" />
                                <span className="dot-light bg-rule-strong" />
                                <span className="ml-2 font-mono text-xs text-ink-muted">
                                    ~/user.json
                                </span>
                                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                                    json
                                </span>
                            </div>
                            <pre className="overflow-x-auto p-3 font-mono text-[11.5px] leading-[1.55] text-ink">
                                <code>
                                    <div>
                                        <Gutter n={1} />
                                        <Bracket>{"{"}</Bracket>
                                    </div>
                                    {userJson.map((row, i) => (
                                        <div key={row.key}>
                                            <Gutter n={i + 2} />
                                            <span className="pl-3">
                                                <Key>{row.key}</Key>
                                                <Punc>: </Punc>
                                                {Array.isArray(row.value) ? (
                                                    <>
                                                        <Bracket>[</Bracket>
                                                        {row.value.map((v, j, arr) => (
                                                            <span key={v}>
                                                                <Str>{v}</Str>
                                                                {j < arr.length - 1 && <Punc>, </Punc>}
                                                            </span>
                                                        ))}
                                                        <Bracket>]</Bracket>
                                                    </>
                                                ) : (
                                                    <Str>{row.value as string}</Str>
                                                )}
                                                {i < userJson.length - 1 && <Punc>,</Punc>}
                                            </span>
                                        </div>
                                    ))}
                                    <div>
                                        <Gutter n={userJson.length + 2} />
                                        <Bracket>{"}"}</Bracket>
                                    </div>
                                </code>
                            </pre>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom meta strip */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4"
                >
                    {[
                        { k: "scroll", v: "↓ explore" },
                        { k: "section", v: "00 / hero" },
                        { k: "build", v: "production" },
                        { k: "uptime", v: "online" },
                    ].map((c) => (
                        <div key={c.k} className="bg-paper-raised px-4 py-3">
                            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                                {`// ${c.k}`}
                            </p>
                            <p className="mt-1 font-mono text-xs text-ink">{c.v}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// JSON syntax tokens — colorize ~/user.json like a real editor.
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
