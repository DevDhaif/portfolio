// components/home/projects.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ProjectCard } from "./project-card"
import { createClient } from '@/utils/supabase/client'
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Project } from "@/lib/types"
import { ProjectsListJsonLd } from "../JsonLd/ProjectsListJsonLd"
import { Github } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { GridItemsWrapper } from "@/components/grid-items-wrapper"
import { GridItem } from "@/components/grid-item"
import { Loading } from "@/components/loading"
import { AnimatedGrid } from "../AnimatedGrid"

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })

    const opacity = useTransform(scrollYProgress,
        [0, 0.1, 0.9, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress,
        [0, 0.8], ["0%", "5%"])

    useEffect(() => {
        async function loadProjects() {
            const supabase = createClient()

            const { data: projects } = await supabase
                .from('projects')
                .select(`*, project_images (*)`)
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
        return <Loading text="Loading projects..." />
    }

    return (
        <>
            <ProjectsListJsonLd projects={projects} />
            <section
                ref={containerRef}
                id="projects"
                className="relative py-24 sm:py-32 overflow-hidden"
            >
                <motion.div
                    className="container relative"
                    style={{ opacity, y }}
                >
                    <SectionHeader
                        title="Projects"
                        description="Here are some of my featured projects. Each one is built with care and attention to detail."
                    />

                    <GridItemsWrapper>
                        {projects.map((project, index) => (
                            <GridItem key={project.id} index={index}>
                                <ProjectCard {...project} index={index} />
                            </GridItem>
                        ))}
                    </GridItemsWrapper>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-blue-100/70 mb-6">
                            Interested in more projects?
                        </p>
                        <Link
                            href="https://github.com/devdhaif"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-blue-500 text-white transition-all hover:bg-blue-600"
                        >
                            <span className="relative z-10">View More on GitHub</span>
                            <Github className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </>
    )
}