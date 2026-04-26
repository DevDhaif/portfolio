"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectCardProps } from "@/types";

// Map tag names to icon paths from /public/icons.
const ICON_MAP: Record<string, string> = {
    "react.js": "/icons/react.svg",
    react: "/icons/react.svg",
    "next.js": "/icons/next.svg",
    next: "/icons/next.svg",
    "vue.js": "/icons/vue.svg",
    vue: "/icons/vue.svg",
    typescript: "/icons/typescript.svg",
    javascript: "/icons/js.svg",
    "tailwind css": "/icons/tailwind.svg",
    tailwindcss: "/icons/tailwind.svg",
    tailwind: "/icons/tailwind.svg",
    laravel: "/icons/laravel.svg",
    php: "/icons/php.svg",
    mysql: "/icons/sql.svg",
    sql: "/icons/sql.svg",
    firebase: "/icons/firebase.svg",
    supabase: "/icons/supabase.svg",
    redux: "/icons/redux.svg",
    zustand: "/icons/zustand.svg",
    git: "/icons/git.svg",
    github: "/icons/github.svg",
    html: "/icons/html.svg",
    css: "/icons/css.svg",
    npm: "/icons/npm.svg",
    vite: "/icons/vite.svg",
    vercel: "/icons/vercel.svg",
};

const iconFor = (tag: string): string | null => ICON_MAP[tag.toLowerCase()] || null;

export function ProjectCard({
    id,
    title,
    description,
    image,
    tags,
    githubUrl,
    liveUrl,
    index,
}: ProjectCardProps) {
    const num = String(index + 1).padStart(2, "0");
    const visibleTags = tags.slice(0, 5);

    return (
        <article
            className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-signal/50 hover:shadow-card-hover frame-brackets"
        >
            {/* Card header bar */}
            <div className="flex items-center justify-between border-b border-rule bg-paper-sunken px-4 py-2.5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                    <span className="text-ink-muted">PROJ_{num}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="dot-light bg-rule-strong group-hover:bg-signal transition-colors" />
                    <span className="dot-light bg-rule-strong" />
                    <span className="dot-light bg-rule-strong" />
                </div>
            </div>

            {/* Image */}
            <div
                className="relative block aspect-[16/10] overflow-hidden bg-paper-sunken"
                data-cursor="on"
            >
                {image && (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority={index < 3}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-paper-raised/70 via-transparent to-transparent" />

                {/* Floating actions */}
                <div className="absolute right-3 top-3 z-10 flex gap-2">
                    {githubUrl && (
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="grid h-8 w-8 place-items-center rounded-md border border-rule bg-paper/85 text-ink backdrop-blur-md transition-all hover:border-signal hover:text-signal"
                            aria-label={`${title} on GitHub`}
                        >
                            <Github className="h-3.5 w-3.5" />
                        </Link>
                    )}
                    {liveUrl && (
                        <Link
                            href={liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="grid h-8 w-8 place-items-center rounded-md border border-rule bg-paper/85 text-ink backdrop-blur-md transition-all hover:border-signal hover:text-signal"
                            aria-label={`${title} live site`}
                        >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-signal">
                    <Link
                        href={`/projects/${id}`}
                        className="before:absolute before:inset-0 before:z-0 before:content-['']"
                    >
                        {title}
                    </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                    {description}
                </p>

                {/* Tech stack tile row */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <div className="flex items-center gap-1.5">
                        {visibleTags.map((tag, i) => {
                            const icon = iconFor(tag);
                            return icon ? (
                                <span
                                    key={`${tag}-${i}`}
                                    title={tag}
                                    className="grid h-7 w-7 place-items-center rounded-md border border-rule bg-paper-sunken transition-colors group-hover:border-rule-strong"
                                >
                                    <Image
                                        src={icon}
                                        alt={tag}
                                        width={14}
                                        height={14}
                                        className="h-3.5 w-3.5 object-contain"
                                    />
                                </span>
                            ) : (
                                <span
                                    key={`${tag}-${i}`}
                                    className="grid h-7 px-1.5 place-items-center rounded-md border border-rule bg-paper-sunken font-mono text-[9px] uppercase tracking-wider text-ink-faint"
                                >
                                    {tag.slice(0, 3)}
                                </span>
                            );
                        })}
                        {tags.length > visibleTags.length && (
                            <span className="font-mono text-[10px] text-ink-faint">
                                +{tags.length - visibleTags.length}
                            </span>
                        )}
                    </div>

                    <span
                        aria-hidden="true"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint transition-colors group-hover:text-signal"
                    >
                        view →
                    </span>
                </div>
            </div>
        </article>
    );
}
