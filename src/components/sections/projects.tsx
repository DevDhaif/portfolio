"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { createClient } from '@/utils/supabase/client'
import Link from "next/link"
import { Github, ExternalLink, Code, Server, Wrench } from "lucide-react"
import { Project } from "@/types"
import { ProjectsListJsonLd } from "../JsonLd/schemas"
import { SectionHeading } from "@/components/ui/section-heading"
import { ProjectCard } from "@/components/ui/project-card"
import { Button } from "@/components/ui/button"
import { Loading } from "@/components/loading"

// Animation configurations
const SPRING_CONFIG = { stiffness: 100, damping: 15, mass: 0.5 }

// Define technology mappings
const TECH_MAPPINGS = {
    "react.js": ["React.js", "React", "ReactJS"],
    "next.js": ["Next.js", "Next", "NextJS"],
    "vue.js": ["Vue.js", "Vue", "Vue 3"],
    "tailwindcss": ["Tailwind CSS", "Tailwindcss", "TailwindCSS"],
}

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [visibleProjects, setVisibleProjects] = useState(6)
    const [activeTab, setActiveTab] = useState("all")
    const containerRef = useRef<HTMLElement>(null)

    // Scroll animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })
    const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG)
    const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8])
    const y = useTransform(smoothProgress, [0, 0.8], ["2%", "0%"])

    // Load projects from Supabase
    useEffect(() => {
        async function loadProjects() {
            try {
                const supabase = createClient()
                const { data: projects } = await supabase
                    .from('projects')
                    .select(`*, project_images (*)`)
                    .order('created_at', { ascending: true })

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
            } catch (error) {
                console.error("Error loading projects:", error)
            } finally {
                setLoading(false)
            }
        }

        loadProjects()
    }, [])

    // Filter projects based on the active tab
    const filteredProjects = projects.filter(project => {
        // Show all projects when "all" tab is active
        if (activeTab === "all") return true

        // Get the list of technologies to match against
        const technologiesToMatch = TECH_MAPPINGS[activeTab as keyof typeof TECH_MAPPINGS] || [activeTab]

        // Check if any project skill matches any of the technologies we're looking for
        return project.skills.some(skill =>
            technologiesToMatch.some(tech =>
                skill.toLowerCase().includes(tech.toLowerCase())
            )
        )
    })

    // Handle tab changes
    const handleTabChange = (value: string) => {
        console.log(`Tab changed to: ${value}. Found ${filteredProjects.length} matching projects.`)
        setActiveTab(value)
        setVisibleProjects(6)
    }

    // Handle loading more projects
    const handleLoadMore = () => {
        setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length))
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0, duration: 0.1 }
        }
    }

    if (loading) {
        return <Loading text="Loading projects..." />
    }

    return (
        <section id="projects" ref={containerRef} className="py-24 md:py-32 relative overflow-hidden">
            <ProjectsListJsonLd projects={projects} />
            <motion.div
                className="container max-w-6xl mx-auto px-4"
                style={{ opacity, y }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <SectionHeading
                    title="My Projects"
                    subtitle="A showcase of my recent work and side projects"
                    badge="Projects"
                />

                <div className="mt-8">
                    {/* Do not use the Tabs component, use direct rendering instead */}
                    <div className="w-full">
                        {/* Tab navigation */}
                        <div className="grid w-full max-w-3xl mx-auto grid-cols-3 sm:grid-cols-5 mb-10 bg-gray-800/50 p-1 rounded-lg">
                            {[
                                { value: "all", label: "All", mobileLabel: "All", icon: <Code className="h-4 w-4" /> },
                                { value: "React.js", label: "React.js", mobileLabel: "React", icon: <Code className="h-4 w-4" /> },
                                { value: "Vue.js", label: "Vue.js", mobileLabel: "Vue", icon: <Code className="h-4 w-4" /> },
                                { value: "Tailwindcss", label: "Tailwind", mobileLabel: "TW", icon: <Wrench className="h-4 w-4" /> },
                                { value: "Next.js", label: "Next.js", mobileLabel: "Next", icon: <Server className="h-4 w-4" /> }
                            ].map(tab => (
                                <button
                                    key={tab.value}
                                    onClick={() => handleTabChange(tab.value)}
                                    className={`flex items-center justify-center gap-2 text-accent-primary py-2 px-4 rounded-md transition-colors ${activeTab === tab.value
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700/50"
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    {tab.mobileLabel && <span className="sm:hidden">{tab.mobileLabel}</span>}
                                </button>
                            ))}
                        </div>

                        {/* Project grid */}
                        {filteredProjects.length > 0 ? (
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                    // variants={itemVariants}
                                    // custom={index}
                                    >
                                        <ProjectCard
                                            id={project.id}
                                            title={project.name}
                                            description={project.description}
                                            image={project.mainImage}
                                            tags={project.skills}
                                            githubUrl={project.githubUrl}
                                            liveUrl={project.liveUrl}
                                            index={index}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-400">No projects found with these skills.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Load More Button */}
                {visibleProjects < filteredProjects.length && (
                    <motion.div
                        className="mt-12 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button
                            onClick={handleLoadMore}
                            variant="outline"
                            className="bg-gray-800/50 text-gray-200 border-gray-700 hover:bg-gray-700"
                        >
                            Load More Projects
                        </Button>
                    </motion.div>
                )}

                {/* GitHub Link */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-gray-400 mb-4">
                        Want to see more of my work?
                    </p>
                    <Button asChild variant="outline" className="bg-gray-800/50 text-gray-200 border-gray-700 hover:bg-gray-700">
                        <Link
                            href="https://github.com/devdhaif"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                        >
                            <Github className="h-4 w-4" />
                            View All Projects on GitHub
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default ProjectsSection