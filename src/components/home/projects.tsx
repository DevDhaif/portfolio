
"use client"

import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { createClient } from '@/utils/supabase/client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { Project } from "@/lib/types";

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            const supabase = createClient()

            const { data: projects } = await supabase
                .from('projects')
                .select(`
                    *,
                    project_images (*)
                `)
                .order('created_at', { ascending: false })

            if (projects) {
                const projectsWithUrls = projects.map(project => {

                    const mainImageUrl = supabase.storage
                        .from('projects-images')
                        .getPublicUrl(project.main_image).data.publicUrl


                    const images = project.project_images?.map((img: any) => ({
                        id: img.id,
                        url: supabase.storage
                            .from('projects-images')
                            .getPublicUrl(img.url).data.publicUrl,
                        alt: img.alt,
                        projectId: img.project_id
                    }))


                    return {
                        id: project.id,
                        name: project.name,
                        description: project.description,
                        longDescription: project.long_description,
                        mainImage: mainImageUrl,
                        images: images,
                        skills: project.skills,
                        githubUrl: project.github_url,
                        liveUrl: project.live_url,
                        highlights: project.highlights,
                        createdAt: project.created_at,
                        updatedAt: project.updated_at
                    }
                })

                setProjects(projectsWithUrls)
            }
            setLoading(false)
        }

        loadProjects()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        )
    }

    return (
        <section id="projects" className="container py-24 sm:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 text-center"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
                    Projects
                </h2>
                <p className="text-muted-foreground">
                    Here are some of my featured projects. Each one is built with care and attention to detail.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        {...project}
                        index={index}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 text-center"
            >
                <p className="text-muted-foreground mb-4">
                    Interested in more projects?
                </p>
                <Link
                    href="https://github.com/devdhaif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    View More on GitHub
                </Link>
            </motion.div>
        </section>
    );
}