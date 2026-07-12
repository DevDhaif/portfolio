"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Magnetic } from "../ui/magnetic";

const channels = [
    { label: "email", value: "devdhaif@gmail.com", href: "mailto:devdhaif@gmail.com", icon: Mail },
    { label: "github", value: "/devdhaif", href: "https://github.com/devdhaif", icon: Github },
    { label: "linkedin", value: "/in/devdhaif", href: "https://linkedin.com/in/devdhaif", icon: Linkedin },
];

const sitemap = [
    { label: "about", href: "/pro#about" },
    { label: "work", href: "/pro#projects" },
    { label: "stack", href: "/pro#skills" },
    { label: "blog", href: "/blog" },
    { label: "contact", href: "/pro#contact" },
];

const buildHash = "main";
const lastDeploy = new Date().toISOString().slice(0, 10);

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-24 overflow-hidden border-t border-rule bg-paper-sunken">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-scanline opacity-50" />

            <div className="container-dev relative py-20">
                {/* Big CTA */}
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-signal">
                            <span className="relative inline-flex h-2 w-2">
                                <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                            </span>
                            currently online ／ riyadh
                        </div>
                        <h2 className="display mt-6 text-balance text-5xl font-bold leading-[0.95] text-ink md:text-7xl lg:text-[5.25rem]">
                            Have a project?<br />
                            <span className="relative inline-block">
                                Let&apos;s build it
                                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                            </span>.
                        </h2>
                        <Magnetic>
                            <Link
                                href="mailto:devdhaif@gmail.com"
                                className="group mt-10 inline-flex items-center gap-3 font-mono text-base text-ink hover:text-signal transition-colors press"
                            >
                                <span className="text-signal">$</span>
                                <span>echo &quot;hello&quot; | mail devdhaif@gmail.com</span>
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </Magnetic>
                    </div>

                    <div className="lg:col-span-5 lg:pl-10">
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                                    {`// index`}
                                </p>
                                <ul className="mt-5 space-y-3">
                                    {sitemap.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                className="font-mono text-sm text-ink-muted hover:text-signal transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                                    {`// channels`}
                                </p>
                                <ul className="mt-5 space-y-3">
                                    {channels.map((c) => (
                                        <li key={c.label}>
                                            <a
                                                href={c.href}
                                                target={c.href.startsWith("http") ? "_blank" : undefined}
                                                rel="noreferrer"
                                                className="group inline-flex items-center gap-2 font-mono text-sm text-ink-muted hover:text-signal transition-colors"
                                            >
                                                <c.icon className="h-3.5 w-3.5 text-ink-faint group-hover:text-signal transition-colors" />
                                                {c.value}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ASCII signature ,  giant logotype */}
                <div className="mt-20 select-none overflow-hidden">
                    <h3
                        aria-label="Dhaifallah"
                        className="stencil text-ink/[0.07] text-[clamp(4rem,16vw,16rem)] leading-[0.85]"
                    >
                        DHAIFALLAH
                    </h3>
                </div>

                {/* Build info row */}
                <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4">
                    {[
                        { k: "build", v: buildHash },
                        { k: "deploy", v: lastDeploy },
                        { k: "region", v: "iad1" },
                        { k: "©", v: `${year} dhaif` },
                    ].map((c) => (
                        <div key={c.k} className="bg-paper-sunken px-4 py-3">
                            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                                {`// ${c.k}`}
                            </p>
                            <p className="mt-1 font-mono text-xs text-ink">{c.v}</p>
                        </div>
                    ))}
                </div>

                {/* Final mini-row */}
                <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-mono text-xs text-ink-faint">
                        <span className="text-signal">$</span> echo &quot;© {year} dhaifallah alfarawi · ضيف الله أحمد الفروي&quot;
                    </p>
                    <Link
                        href="https://github.com/devdhaif/portfolio"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-baseline gap-1 font-mono text-xs text-ink-faint hover:text-signal transition-colors"
                    >
                        view source
                        <ArrowUpRight className="h-3 w-3 self-center" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
