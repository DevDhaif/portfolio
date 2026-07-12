"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, ExternalLink, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createClient } from "@/utils/supabase/client";
import { Project } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TECH_MAPPINGS: Record<string, string[]> = {
    "react.js": ["React.js", "React", "ReactJS"],
    "next.js": ["Next.js", "Next", "NextJS"],
    "vue.js": ["Vue.js", "Vue", "Vue 3"],
    tailwindcss: ["Tailwind CSS", "Tailwindcss", "TailwindCSS"],
};

const FILTERS = [
    { value: "all", label: "all" },
    { value: "React.js", label: "react" },
    { value: "Vue.js", label: "vue" },
    { value: "Next.js", label: "next" },
    { value: "Tailwindcss", label: "tailwind" },
];

const PAGE = 12;

/**
 * Projects as scroll-on-scroll: the section pins and vertical scroll drives
 * the card rail sideways (GSAP pin + scrub) — on mobile AND desktop. The
 * filter bar is INSIDE the pinned area so it stays visible the whole time.
 * Reduced-motion falls back to a native swipe rail (no pin/hijack).
 */
export function ProjectsShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [visible, setVisible] = useState(PAGE);

    const scope = useRef<HTMLElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            try {
                const supabase = createClient();
                const { data } = await supabase
                    .from("projects")
                    .select(`*, project_images (*)`)
                    .order("created_at", { ascending: true });
                if (data) {
                    const mapped: Project[] = data
                        .map((project: any) => ({
                            id: project.id,
                            name: project.name,
                            description: project.description,
                            longDescription: project.long_description,
                            mainImage: project.main_image
                                ? supabase.storage.from("projects-images").getPublicUrl(project.main_image).data.publicUrl
                                : "",
                            skills: project.skills || [],
                            githubUrl: project.github_url,
                            liveUrl: project.live_url,
                            highlights: project.highlights || [],
                            createdAt: project.created_at,
                            updatedAt: project.updated_at,
                            importance: project.importance,
                        }))
                        .sort((a, b) => (a.importance ?? 99) - (b.importance ?? 99));
                    setProjects(mapped);
                }
            } catch (e) {
                console.error("Error loading projects:", e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = projects.filter((p) => {
        if (activeTab === "all") return true;
        const techs = TECH_MAPPINGS[activeTab.toLowerCase()] || [activeTab];
        return p.skills.some((s) => techs.some((t) => s.toLowerCase().includes(t.toLowerCase())));
    });
    const shown = filtered.slice(0, visible);
    const hasMore = visible < filtered.length;

    // Reset scroll to the section start before re-laying the rail, so the pin
    // re-engages cleanly (no mid-scrub jump).
    const resetToSection = () => {
        const y = scope.current ? scope.current.getBoundingClientRect().top + window.scrollY - 8 : 0;
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: any) => void } }).__lenis;
        if (lenis) lenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
    };

    const onFilter = (value: string) => {
        resetToSection();
        setActiveTab(value);
        setVisible(PAGE);
    };
    const showMore = () => {
        setVisible((v) => v + PAGE);
    };

    useGSAP(
        () => {
            if (!shown.length) return;
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const track = trackRef.current;
                const vp = viewportRef.current;
                const sticky = stickyRef.current;
                const spacer = spacerRef.current;
                if (!track || !vp || !sticky || !spacer) return;

                // Pin via CSS position:sticky (Lenis-proof); GSAP only scrubs
                // the rail horizontally over a tall spacer that provides the
                // vertical scroll distance.
                vp.style.overflowX = "hidden";
                const amount = () => Math.max(0, track.scrollWidth - vp.clientWidth + 32);
                const amt = amount();
                if (amt <= 0) {
                    vp.style.overflowX = "";
                    return;
                }
                spacer.style.height = sticky.offsetHeight + amt + "px";

                gsap.to(track, {
                    x: () => -amount(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: spacer,
                        start: "top 80px",
                        end: () => "+=" + amount(),
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });

                return () => {
                    vp.style.overflowX = "";
                    spacer.style.height = "";
                    gsap.set(track, { x: 0 });
                };
            });
            return () => mm.revert();
        },
        { scope, dependencies: [activeTab, visible, shown.length], revertOnUpdate: true },
    );

    if (loading) {
        return (
            <section id="projects" className="relative py-24 md:py-32">
                <div className="container-dev">
                    <div className="h-4 w-40 animate-pulse rounded bg-rule" />
                    <div className="mt-6 h-14 w-2/3 max-w-xl animate-pulse rounded-lg bg-rule" />
                    <div className="mt-12 flex gap-6 overflow-hidden">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-[82vw] shrink-0 overflow-hidden rounded-xl border border-rule bg-paper-raised sm:w-[46vw] lg:w-[30vw]">
                                <div className="aspect-[16/10] animate-pulse bg-rule" />
                                <div className="space-y-3 p-6">
                                    <div className="h-6 w-3/4 animate-pulse rounded bg-rule" />
                                    <div className="h-4 w-full animate-pulse rounded bg-rule" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
    if (!projects.length) return null;

    return (
        <section id="projects" ref={scope} className="relative py-24 md:py-28">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
            <div className="container-dev relative">
                <SectionHeading
                    index="02"
                    eyebrow="selected_work"
                    title={
                        <>
                            Things I&apos;ve{" "}
                            <span className="relative inline-block">
                                shipped
                                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                            </span>
                            .
                        </>
                    }
                    subtitle="Keep scrolling — the work slides sideways. Filter by stack."
                />
            </div>

            {/* Tall spacer provides the vertical scroll distance; the inner
                block is CSS-sticky so the filters + rail stay on screen while
                the rail scrubs sideways. */}
            <div ref={spacerRef} className="relative mt-8">
              <div ref={stickyRef} className="sticky top-20">
                <div className="container-dev">
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-rule bg-paper-raised p-1.5">
                        <span className="ml-2 mr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">filter:</span>
                        {FILTERS.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => onFilter(f.value)}
                                className={cn(
                                    "rounded-md px-3 py-1.5 font-mono text-xs transition-all",
                                    activeTab === f.value
                                        ? "bg-signal font-semibold text-ink-inverse"
                                        : "text-ink-muted hover:bg-paper hover:text-ink",
                                )}
                            >
                                {f.label}
                            </button>
                        ))}
                        <span className="ml-auto mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                            {String(filtered.length).padStart(2, "0")} {filtered.length === 1 ? "entry" : "entries"}
                        </span>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="container-dev">
                        <p className="mt-10 text-ink-muted">No projects under this filter.</p>
                    </div>
                ) : (
                    <div
                        ref={viewportRef}
                        className="mt-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        <div
                            ref={trackRef}
                            className="flex gap-6 px-5 md:px-8 lg:px-[max(2rem,calc((100vw-1320px)/2+3rem))]"
                        >
                            {shown.map((p, i) => (
                                <article
                                    key={p.id}
                                    className="group relative flex w-[80vw] shrink-0 flex-col overflow-hidden rounded-xl border border-rule bg-paper-raised transition-colors hover:border-signal/50 sm:w-[54vw] md:w-[42vw] lg:w-[31vw] xl:w-[26vw]"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-paper-sunken">
                                        {p.mainImage ? (
                                            <Image
                                                src={p.mainImage}
                                                alt={p.name}
                                                fill
                                                draggable={false}
                                                sizes="30vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <span className="grid h-full w-full place-items-center font-display text-5xl font-bold text-ink-faint">
                                                {p.name.slice(0, 2).toUpperCase()}
                                            </span>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-paper-raised via-transparent to-transparent" />
                                        <span className="absolute left-4 top-4 rounded-md border border-rule bg-paper/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted backdrop-blur-md">
                                            {String(i + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-signal">
                                            {p.name}
                                        </h3>
                                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">{p.description}</p>
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {(p.skills ?? []).slice(0, 4).map((s) => (
                                                <span key={s} className="chip">{s}</span>
                                            ))}
                                        </div>
                                        <div className="mt-auto flex items-center gap-3 border-t border-rule pt-4">
                                            <Link
                                                href={`/projects/${p.id}`}
                                                className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted transition-colors hover:text-signal"
                                            >
                                                case study <ArrowUpRight className="h-3.5 w-3.5" />
                                            </Link>
                                            {p.githubUrl && (
                                                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="ml-auto text-ink-faint transition-colors hover:text-signal" aria-label="GitHub">
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                            {p.liveUrl && (
                                                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-ink-faint transition-colors hover:text-signal" aria-label="Live site">
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}

                            {hasMore ? (
                                <button
                                    type="button"
                                    onClick={showMore}
                                    className="group grid w-[68vw] shrink-0 place-items-center rounded-xl border border-dashed border-rule-strong bg-paper-raised/40 transition-colors hover:border-signal/60 sm:w-[38vw] md:w-[26vw] lg:w-[18vw]"
                                >
                                    <div className="p-8 text-center">
                                        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-rule bg-paper text-ink-muted transition-colors group-hover:border-signal group-hover:text-signal">
                                            <Plus className="h-5 w-5" />
                                        </span>
                                        <p className="mt-4 font-display text-xl font-bold text-ink">Show more</p>
                                        <p className="mt-1 font-mono text-xs text-ink-faint">+{filtered.length - visible} more</p>
                                    </div>
                                </button>
                            ) : (
                                <Link
                                    href="https://github.com/devdhaif"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group grid w-[68vw] shrink-0 place-items-center rounded-xl border border-dashed border-rule-strong bg-paper-raised/40 sm:w-[38vw] md:w-[26vw] lg:w-[18vw]"
                                >
                                    <div className="p-8 text-center">
                                        <Github className="mx-auto h-8 w-8 text-ink-muted transition-colors group-hover:text-signal" />
                                        <p className="mt-4 font-display text-xl font-bold text-ink">Full archive</p>
                                        <p className="mt-1 font-mono text-xs text-ink-faint">github.com/devdhaif →</p>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
              </div>
            </div>
        </section>
    );
}

export default ProjectsShowcase;
