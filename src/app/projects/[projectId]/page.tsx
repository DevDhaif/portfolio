"use client"
import { use } from "react"
import { projectsData } from "@/lib/projects-data"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import ImageSlider from "@/components/ImageSlider"
import Link from "next/link"

type ProjectPageProps = {
    params: Promise<{ projectId: string }>
}


export default function ProjectPage({ params }: ProjectPageProps) {
    const resolvedParams = use(params)
    const project = projectsData.find(p => p.id === resolvedParams.projectId)

    if (!project) {
        notFound()
    }

    return (
        <div className="container py-10 mx-auto">
            <motion.div className="space-y-8 p-2 ">
                <h1 className="text-4xl font-bold">{project.name}</h1>
                <p className="text-xl text-muted-foreground">{project.longDescription}</p>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                        <span key={skill} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Image Gallery */}
                <div className="grid ">
                    <ImageSlider images={project.images?.map(img => ({
                        url: img.url,
                        alt: img.alt
                    })) || []} />
                </div>

                {/* Video if exists */}
                {project.video && (
                    <video controls className="w-full rounded-lg aspect-video">
                        <source src={project.video} />
                    </video>
                )}

                {/* Project Links */}
                <div className="flex gap-4">
                    {project.githubUrl && (
                        <Button asChild>
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                View Code
                            </Link>
                        </Button>
                    )}
                    {project.liveUrl && (
                        <Button asChild>
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                Live Demo
                            </Link>
                        </Button>
                    )}
                </div>
            </motion.div>
        </div>
    )
}