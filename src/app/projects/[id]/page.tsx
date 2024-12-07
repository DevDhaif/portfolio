'use client'

import { useEffect, useState, use } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Project } from '@/lib/types'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params) // Properly unwrap the params promise
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProject() {
            const supabase = createClient()

            const { data } = await supabase
                .from('projects')
                .select(`
                    *,
                    project_images (*)
                `)
                .eq('id', id)  // Using unwrapped id
                .single()

            if (data) {
                // Get main image URL
                const mainImageUrl = supabase.storage
                    .from('projects-images')
                    .getPublicUrl(data.main_image).data.publicUrl

                // Get project images URLs
                const images = data.project_images?.map((img: any) => ({
                    id: img.id,
                    url: supabase.storage
                        .from('projects-images')
                        .getPublicUrl(img.url).data.publicUrl,
                    alt: img.alt,
                    projectId: img.project_id
                }))

                setProject({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    longDescription: data.long_description,
                    mainImage: mainImageUrl,
                    images: images,
                    skills: data.skills,
                    githubUrl: data.github_url,
                    liveUrl: data.live_url,
                    highlights: data.highlights,
                    createdAt: data.created_at,
                    updatedAt: data.updated_at
                })
            }
            setLoading(false)
        }

        loadProject()
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        )
    }

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Project not found</div>
            </div>
        )
    }

    return (
        <div className="container py-10 mx-auto">
            <motion.div
                className="space-y-8 p-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold">{project.name}</h1>
                <p className="text-xl text-muted-foreground">{project.longDescription}</p>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Main Image */}
                <div className="aspect-video relative overflow-hidden rounded-lg">
                    <Image
                        src={project.mainImage}
                        alt={project.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Gallery */}
                {project.images && project.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.images.map((image) => (
                            <div key={image.id} className="aspect-video relative overflow-hidden rounded-lg">
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
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

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {project.highlights.map((highlight, index) => (
                                <li key={index}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>
        </div>
    )
}