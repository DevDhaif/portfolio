"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ProjectCard } from "./project-card"
import { createClient } from '@/utils/supabase/client'
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Project } from "@/lib/types"
import { ProjectsListJsonLd } from "../JsonLd/ProjectsListJsonLd"
import { Github, Loader2 } from "lucide-react"

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    {/* <div className="absolute inset-0 blur-xl animate-pulse bg-blue-500/20 rounded-full" /> */}
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-blue-100/70 text-sm"
                >
                    Loading projects...
                </motion.p>
            </div>
        )
    }

    return (
        <>
            <ProjectsListJsonLd projects={projects} />
            <section
                ref={containerRef}
                id="projects"
                className="relative py-24 sm:py-32 overflow-hidden"
            >
                {/* Background effects */}
                {/* <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-grid-white/[0.02]" />
                    <div className="absolute h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                </div> */}

                <motion.div
                    className="container relative"
                    style={{ y, opacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative mb-16 text-center"
                    >
                        {/* Section header with glow effect */}
                        <motion.div
                            animate={{
                                opacity: [1, 0.8, 1],
                                scale: [1, 1.02, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 blur-3xl  rounded-full"
                        />

                         <motion.h2
                        className="relative text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl mb-6"
                    >
                        <span className="absolute blur-2xl opacity-50 bg-gradient-to-b from-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                            Projects
                        </span>
                        <span className="relative bg-gradient-to-b from-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </motion.h2>
                        <p className="relative text-blue-100/70">
                            Here are some of my featured projects. Each one is built with care and attention to detail.
                        </p>
                    </motion.div>

                    {/* Projects grid with stagger animation */}
                    <motion.div
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 15
                                        }
                                    }
                                }}
                            >
                                <ProjectCard {...project} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Enhanced GitHub link section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
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
                            {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity blur" /> */}
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </>
    )
}