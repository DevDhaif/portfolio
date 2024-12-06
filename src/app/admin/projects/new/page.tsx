// app/admin/projects/new/page.tsx
'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createClient } from '@/utils/supabase/client'
import ImageUpload from '@/components/ImageUpload'
import { createProject } from '../actions'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
            {pending ? 'Creating...' : 'Create Project'}
        </button>
    )
}

export default function NewProjectPage() {
    const [mainImage, setMainImage] = useState<File[]>([])
    const [projectImages, setProjectImages] = useState<File[]>([])

    async function handleSubmit(formData: FormData) {
        if (mainImage.length === 0) {
            alert('Please upload a main image')
            return
        }

        try {
            const supabase = createClient()

            // 1. Upload main image
            const mainImageName = `${Date.now()}-${mainImage[0].name}`
            const { error: mainImageError } = await supabase.storage
                .from('projects-images')
                .upload(mainImageName, mainImage[0])

            if (mainImageError) throw mainImageError

            // 2. Store project data
            const { data: project, error: projectError } = await supabase
                .from('projects')
                .insert([{
                    name: formData.get('name'),
                    description: formData.get('description'),
                    long_description: formData.get('longDescription'),
                    main_image: mainImageName, // Store just the filename
                    skills: formData.get('skills')?.toString().split(',').map(s => s.trim()) || [],
                    github_url: formData.get('githubUrl'),
                    live_url: formData.get('liveUrl'),
                    highlights: formData.get('highlights')?.toString().split('\n').filter(Boolean) || []
                }])
                .select()
                .single()

            if (projectError) throw projectError

            // 3. Upload and store project images
            if (projectImages.length > 0) {
                const projectImagesData = await Promise.all(
                    projectImages.map(async (file) => {
                        const fileName = `${Date.now()}-${file.name}`
                        const { error: uploadError } = await supabase.storage
                            .from('projects-images')
                            .upload(fileName, file)

                        if (uploadError) throw uploadError

                        return {
                            project_id: project.id,
                            url: fileName,
                            alt: project.name
                        }
                    })
                )

                const { error: imagesError } = await supabase
                    .from('project_images')
                    .insert(projectImagesData)

                if (imagesError) throw imagesError
            }


        } catch (error) {
            console.error('Error:', error)
            alert('Error creating project. Please try again.')
        }
    }
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

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
                        rows={6}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Main Image *
                    </label>
                    <ImageUpload
                        value={mainImage}
                        onChange={setMainImage}
                        maxFiles={1}
                        bucket="projects-images"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Project Images
                    </label>
                    <ImageUpload
                        value={projectImages}
                        onChange={setProjectImages}
                        maxFiles={4}
                        bucket="projects-images"
                    />
                </div>

                <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                        Skills (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
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
                        rows={4}
                        placeholder="Implemented responsive design&#10;Added dark mode support&#10;Improved performance"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-4">

                    <a href="/admin/projects"
                        className="px-4 py-2 text-gray-700 hover:text-gray-900">
                        Cancel
                    </a>
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}