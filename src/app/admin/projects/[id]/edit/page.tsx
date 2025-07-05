'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ProjectForm } from '@/components/ProjectForm'
import { Project } from '@/types'

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProject() {
            try {
                const supabase = createClient()
                const { data } = await supabase
                    .from('projects')
                    .select(`*, project_images (*)`)
                    .eq('id', id)
                    .single()

                if (data) {
                    const mappedProject: Project = {
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        longDescription: data.long_description,
                        mainImage: data.main_image,
                        images: data.project_images?.map((img: any) => ({
                            id: img.id,
                            url: img.url,
                            alt: img.alt,
                            projectId: data.id
                        })),
                        skills: data.skills,
                        githubUrl: data.github_url,
                        liveUrl: data.live_url,
                        highlights: data.highlights,
                        createdAt: data.created_at,
                        updatedAt: data.updated_at
                    }
                    setProject(mappedProject)
                }
            } catch (error) {
                console.error('Error loading project:', error)
            } finally {
                setLoading(false)
            }
        }

        loadProject()
    }, [id])

    const handleSubmit = async (formData: FormData) => {
        const supabase = createClient()

        const updates: any = {
            name: formData.get('name'),
            description: formData.get('description'),
            long_description: formData.get('longDescription'),
            main_image: project?.mainImage,
            skills: formData.get('skills')?.toString().split(',').map(s => s.trim()) || [],
            github_url: formData.get('githubUrl'),
            live_url: formData.get('liveUrl'),
            highlights: formData.get('highlights')?.toString().split('\n').filter(Boolean) || [],
            importance: parseInt(formData.get('importance') as string) || 3
        }

        // Handle main image update
        const newMainImage = formData.get('mainImage')
        if (newMainImage) {
            if (project?.mainImage) {
                await supabase.storage.from('projects-images').remove([project.mainImage])
            }
            updates.main_image = newMainImage
        }

        // Handle project images update
        const newProjectImages = formData.get('projectImages')
        if (newProjectImages) {
            const oldImagePaths = project?.images?.map(img => img.url) || []
            if (oldImagePaths.length > 0) {
                await supabase.storage.from('projects-images').remove(oldImagePaths)
                await supabase.from('project_images').delete().eq('project_id', id)
            }

            const projectImagesData = JSON.parse(newProjectImages as string).map((url: string) => ({
                project_id: id,
                url,
                alt: formData.get('name') as string
            }))

            await supabase.from('project_images').insert(projectImagesData)
        }

        const { error } = await supabase.from('projects').update(updates).eq('id', id)
        if (error) throw error

        router.push('/admin/projects')
        router.refresh()
    }

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

    return <ProjectForm project={project} onSubmit={handleSubmit} isEditing />
}