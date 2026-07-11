"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Project } from "@/types";
import { ProjectsListJsonLd } from "../JsonLd/schemas";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { Loading } from "@/components/loading";
import { cn } from "@/lib/utils";

const TECH_MAPPINGS: Record<string, string[]> = {
    "react.js": ["React.js", "React", "ReactJS"],
    "next.js": ["Next.js", "Next", "NextJS"],
    "vue.js": ["Vue.js", "Vue", "Vue 3"],
    tailwindcss: ["Tailwind CSS", "Tailwindcss", "TailwindCSS"],
};

const filters = [
    { value: "all", label: "all" },
    { value: "React.js", label: "react" },
    { value: "Vue.js", label: "vue" },
    { value: "Next.js", label: "next" },
    { value: "Tailwindcss", label: "tailwind" },
];

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleProjects, setVisibleProjects] = useState(12);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        async function loadProjects() {
            try {
                const supabase = createClient();
                const { data: projects } = await supabase
                    .from("projects")
                    .select(`*, project_images (*)`)
                    .order("created_at", { ascending: true });

                if (projects) {
                    const projectsWithUrls = projects
                        .map((project) => {
                            const mainImageUrl = supabase.storage
                                .from("projects-images")
                                .getPublicUrl(project.main_image).data.publicUrl;

                            const images = project.project_images?.map((img: any) => ({
                                id: img.id,
                                url: supabase.storage
                                    .from("projects-images")
                                    .getPublicUrl(img.url).data.publicUrl,
                                alt: img.alt,
                                projectId: img.project_id,
                            }));

                            return {
                                id: project.id,
                                name: project.name,
                                description: project.description,
                                longDescription: project.long_description,
                                mainImage: mainImageUrl,
                                images,
                                skills: project.skills,
                                githubUrl: project.github_url,
                                liveUrl: project.live_url,
                                highlights: project.highlights,
                                createdAt: project.created_at,
                                updatedAt: project.updated_at,
                                importance: project.importance,
                            };
                        })
                        .sort((a, b) => (a.importance ?? 99) - (b.importance ?? 99));

                    setProjects(projectsWithUrls);
                }
            } catch (error) {
                console.error("Error loading projects:", error);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    const filteredProjects = projects.filter((project) => {
        if (activeTab === "all") return true;
        const technologiesToMatch = TECH_MAPPINGS[activeTab] || [activeTab];
        return project.skills.some((skill) =>
            technologiesToMatch.some((tech) =>
                skill.toLowerCase().includes(tech.toLowerCase())
            )
        );
    });

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        setVisibleProjects(12);
    };

    const handleLoadMore = () => {
        setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length));
    };

    if (loading) return <Loading text="Loading projects..." />;

    return (
        <section id="projects" className="relative py-24 md:py-32">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
            <ProjectsListJsonLd projects={projects} />
            <div className="container-dev relative">
                <SectionHeading
                    index="02"
                    eyebrow="selected_work"
                    title={
                        <>
                            Things I&apos;ve <span className="relative inline-block">
                                shipped
                                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                            </span>.
                        </>
                    }
                    subtitle="Production work ,  interface engineering and full-stack apps."
                />

                {/* Filters */}
                <div className="mt-12 flex flex-wrap items-center gap-2 rounded-lg border border-rule bg-paper-raised p-1.5">
                    <span className="ml-2 mr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                        filter:
                    </span>
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => handleTabChange(f.value)}
                            className={cn(
                                "rounded-md px-3 py-1.5 font-mono text-xs transition-all",
                                activeTab === f.value
                                    ? "bg-signal text-ink-inverse font-semibold"
                                    : "text-ink-muted hover:text-ink hover:bg-paper"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                    <span className="ml-auto mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                        {String(filteredProjects.length).padStart(2, "0")} {filteredProjects.length === 1 ? "entry" : "entries"}
                    </span>
                </div>

                {/* Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                title={project.name}
                                description={project.description}
                                image={project.mainImage}
                                tags={project.skills}
                                githubUrl={project.githubUrl}
                                liveUrl={project.liveUrl}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="mt-10 text-ink-muted">No projects under this filter.</p>
                )}

                <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
                    {visibleProjects < filteredProjects.length ? (
                        <button onClick={handleLoadMore} className="btn-ghost">
                            load more
                            <span className="font-mono text-[10px] text-ink-faint">
                                ({filteredProjects.length - visibleProjects} left)
                            </span>
                        </button>
                    ) : (
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                            {"// end of selection"}
                        </span>
                    )}

                    <Link
                        href="https://github.com/devdhaif"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost"
                    >
                        <Github className="h-3.5 w-3.5" />
                        full archive
                        <ArrowUpRight className="h-3 w-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ProjectsSection;
