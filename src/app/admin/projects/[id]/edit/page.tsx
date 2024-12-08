'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import ImageUpload from '@/components/ImageUpload'
import { Project } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [mainImage, setMainImage] = useState<File[]>([])
    const [projectImages, setProjectImages] = useState<File[]>([])
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true

        async function loadProject() {
            try {
                const supabase = createClient()
                const { data } = await supabase
                    .from('projects')
                    .select(`
            *,
            project_images (*)
          `)
                    .eq('id', id)
                    .single()

                if (mounted) {
                    if (data) {
                        console.log(data)

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
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error loading project:', error)
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        loadProject()

        return () => {
            mounted = false
        }
    }, [id])

    async function handleSubmit(formData: FormData) {
        try {
            const supabase = createClient()
            const updates: any = {
                name: formData.get('name'),
                description: formData.get('description'),
                long_description: formData.get('longDescription'),
                main_image: project?.mainImage,
                skills: formData.get('skills')?.toString().split(',').map(s => s.trim()) || [],
                github_url: formData.get('githubUrl'),
                live_url: formData.get('liveUrl'),
                highlights: formData.get('highlights')?.toString().split('\n').filter(Boolean) || []
            }


            if (mainImage.length > 0) {

                if (project?.mainImage) {
                    await supabase.storage
                        .from('projects-images')
                        .remove([project.mainImage])
                }


                const mainImageName = `${Date.now()}-${mainImage[0].name}`
                const { error: mainImageError } = await supabase.storage
                    .from('projects-images')
                    .upload(mainImageName, mainImage[0])

                if (mainImageError) throw mainImageError
                updates.main_image = mainImageName
            }


            if (projectImages.length > 0) {

                const oldImagePaths = project?.images?.map(img => img.url) || []
                if (oldImagePaths.length > 0) {
                    await supabase.storage
                        .from('projects-images')
                        .remove(oldImagePaths)

                    await supabase
                        .from('project_images')
                        .delete()
                        .eq('project_id', id)
                }


                const projectImagesData = await Promise.all(
                    projectImages.map(async (file) => {
                        const fileName = `${Date.now()}-${file.name}`
                        const { error: uploadError } = await supabase.storage
                            .from('projects-images')
                            .upload(fileName, file)

                        if (uploadError) throw uploadError

                        return {
                            project_id: id,
                            url: fileName,
                            alt: formData.get('name') as string
                        }
                    })
                )

                await supabase
                    .from('project_images')
                    .insert(projectImagesData)
            }


            const { error: updateError } = await supabase
                .from('projects')
                .update(updates)
                .eq('id', id)

            if (updateError) throw updateError

            router.push('/admin/projects')
            router.refresh()

        } catch (error) {
            console.error('Error:', error)
            alert('Error updating project. Please try again.')
        }
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
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

            <form action={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Project Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        defaultValue={project.name}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Short Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        defaultValue={project.description}
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
                        Long Description
                    </label>
                    <textarea
                        id="longDescription"
                        name="longDescription"
                        defaultValue={project.longDescription || ''}
                        rows={6}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Current Main Image
                    </label>
                    {project.mainImage && (
                        <img
                            src={supabase.storage
                                .from('projects-images')
                                .getPublicUrl(project.mainImage).data.publicUrl}
                            alt={project.name}
                            className="w-48 h-32 object-cover rounded mt-2"
                        />
                    )}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload New Main Image (optional)
                        </label>
                        <ImageUpload
                            value={mainImage}
                            onChange={setMainImage}
                            maxFiles={1}
                            bucket="projects-images"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Current Project Images
                    </label>
                    <div className="flex gap-2 mt-2">
                        {project.images?.map((image, index) => (
                            <img
                                key={image.id}
                                src={supabase.storage
                                    .from('projects-images')
                                    .getPublicUrl(image.url).data.publicUrl}
                                alt={image.alt}
                                className="w-24 h-24 object-cover rounded"
                            />
                        ))}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload New Project Images (optional)
                        </label>
                        <ImageUpload
                            value={projectImages}
                            onChange={setProjectImages}
                            maxFiles={8}
                            multiple={true}
                            bucket="projects-images"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                        Skills (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        defaultValue={project.skills?.join(', ')}
                        placeholder="React, TypeScript, Tailwind"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                        GitHub URL
                    </label>
                    <input
                        type="url"
                        id="githubUrl"
                        name="githubUrl"
                        defaultValue={project.githubUrl || ''}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">
                        Live URL
                    </label>
                    <input
                        type="url"
                        id="liveUrl"
                        name="liveUrl"
                        defaultValue={project.liveUrl || ''}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="highlights" className="block text-sm font-medium text-gray-700">
                        Highlights (one per line)
                    </label>
                    <textarea
                        id="highlights"
                        name="highlights"
                        defaultValue={project.highlights?.join('\n')}
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/projects"
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update Project
                    </button>
                </div>
            </form>
        </div>
    )
}