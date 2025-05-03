'use client'

import { useEffect, useState, use, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Project } from '@/lib/types'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProjectJsonLd } from '@/components/JsonLd/ProjectJsonLd'
import { ImagePreviewDialog } from '@/components/ImagePreviewDialog'

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
    const allImages = useMemo(() => {
        if (!project) return []
        return [
            project.mainImage,
            ...(project.images?.map(img => img.url) || [])
        ]
    }, [project])

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index)
    }
    useEffect(() => {
        async function loadProject() {
            const supabase = createClient()

            const { data } = await supabase
                .from('projects')
                .select(`
                    *,
                    project_images (*)
                `)
                .eq('id', id)
                .single()

            if (data) {
                const mainImageUrl = supabase.storage
                    .from('projects-images')
                    .getPublicUrl(data.main_image).data.publicUrl

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
        <>
            <ProjectJsonLd project={project} />
            <div className="relative container py-10 mx-auto">
                <motion.div
                    className="space-y-8 p-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    <h1 className="text-4xl font-bold text-white">{project.name}</h1>
                    <p className="text-xl text-gray-500">{project.longDescription}</p>

                    {/* Skills/Tags */}
                    <div className="flex flex-wrap gap-2 text-gray-300">
                        {project.skills.map((skill) => (
                            <span
                                key={skill}
                                className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div
                        className="aspect-video relative overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => handleImageClick(0)} >
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
                            {project.images?.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="aspect-video relative overflow-hidden rounded-lg cursor-pointer"
                                    onClick={() => handleImageClick(index + 1)} >
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
                            <h2 className="text-2xl font-bold mb-4 text-gray-50">Highlights</h2>
                            <ul className="list-disc text-gray-300 list-inside space-y-2">
                                {project.highlights.map((highlight, index) => (
                                    <li key={index}>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>

                {/* Image Preview Dialog */}
                <ImagePreviewDialog
                    isOpen={selectedImageIndex !== null}
                    onClose={() => setSelectedImageIndex(null)}
                    imageUrl={selectedImageIndex !== null ? allImages[selectedImageIndex] : ''}
                    altText={project?.name || 'Project image'}
                    onNext={() => setSelectedImageIndex(prev =>
                        prev !== null && prev < allImages.length - 1 ? prev + 1 : prev
                    )}
                    onPrevious={() => setSelectedImageIndex(prev =>
                        prev !== null && prev > 0 ? prev - 1 : prev
                    )}
                    hasNext={selectedImageIndex !== null && selectedImageIndex < allImages.length - 1}
                    hasPrevious={selectedImageIndex !== null && selectedImageIndex > 0}
                />
            </div>
        </>
    )
}