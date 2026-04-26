"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award, Calendar } from "lucide-react";
import { CertificateCardProps } from "@/types";

export function CertificateCard({
    title,
    description,
    certificateImageUrl,
    source,
    issue_date,
    skills,
    urlLink,
    index,
}: CertificateCardProps) {
    const formattedDate = new Date(issue_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
    const num = String(index + 1).padStart(2, "0");

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-signal/50 hover:shadow-card-hover frame-brackets">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-rule bg-paper-sunken px-4 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    CERT_{num}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    <Award className="h-3 w-3" />
                    {source}
                </span>
            </div>

            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-paper-sunken">
                <Image
                    src={certificateImageUrl || "/api/placeholder/800/600"}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper-raised/70 via-transparent to-transparent" />

                {/* Hover overlay with description */}
                <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="rounded-md border border-rule bg-paper/90 p-3 text-xs leading-relaxed text-ink backdrop-blur-md">
                        {description}
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    <Calendar className="h-3 w-3" />
                    {formattedDate}
                </div>
                <h3 className="mt-2.5 font-display text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-signal">
                    {title}
                </h3>

                <div className="mt-auto pt-4">
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {skills.slice(0, 4).map((s) => (
                            <span key={s} className="chip">
                                {s}
                            </span>
                        ))}
                    </div>

                    {urlLink && (
                        <Link
                            href={urlLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-signal"
                        >
                            view certificate
                            <ArrowUpRight className="h-3 w-3" />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
