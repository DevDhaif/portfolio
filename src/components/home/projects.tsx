"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
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

const springConfig = {
    stiffness: 100,
    damping: 15,
    mass: 0.5
}

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })

    // Smoother scroll-based animations using springs
    const smoothProgress = useSpring(scrollYProgress, springConfig)

    const opacity = useTransform(smoothProgress,
        [0, 0.1, 0.9, 1],
        [0, 1, 1, 0.8]
    )

    const y = useTransform(smoothProgress,
        [0, 0.8],
        ["2%", "0%"]
    )

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0,
                duration: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 0.8,
                duration: 0.1
            }
        }
    }

    if (loading) {
        return <Loading text="Loading projects..." />
    }

    return (
        <>
            <ProjectsListJsonLd projects={projects} />
            <section
                ref={containerRef}
                id="projects"
                className="relative py-20 sm:py-28 overflow-hidden"
            >
                <motion.div
                    className="container relative"
                    style={{ opacity, y }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <SectionHeader
                        title="Projects"
                        description="Here are some of my featured projects. Each one is built with care and attention to detail."
                    />

                    <GridItemsWrapper>
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                custom={index}
                            >
                                <GridItem index={index}>
                                    <ProjectCard {...project} index={index} />
                                </GridItem>
                            </motion.div>
                        ))}
                    </GridItemsWrapper>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 100 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    duration: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-14 text-center"
                    >
                        <p className="text-blue-100/70 mb-5">
                            Interested in more projects?
                        </p>
                        <Link
                            href="https://github.com/devdhaif"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-blue-500 text-white transition-all duration-200 hover:bg-blue-600"
                        >
                            <motion.span
                                className="relative z-10"
                                whileHover={{ x: -4 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                View More on GitHub
                            </motion.span>
                            <motion.div
                                className="relative z-10"
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <Github className="w-5 h-5" />
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </>
    )
}