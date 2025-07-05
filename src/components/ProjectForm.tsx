'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import ImageUpload from '@/components/ImageUpload'
import { ImagePreview } from '@/components/ImagePreview'
import { SkillSelector } from '@/components/SkillSelector'
import { Project } from '@/types'

interface ProjectFormProps {
    project?: Project
    onSubmit: (formData: FormData) => Promise<void>
    isEditing?: boolean
}

export function ProjectForm({ project, onSubmit, isEditing = false }: ProjectFormProps) {
    const [mainImage, setMainImage] = useState<File[]>([])
    const [projectImages, setProjectImages] = useState<File[]>([])
    const [selectedSkills, setSelectedSkills] = useState<string[]>(project?.skills || [])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const skillsInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const handleSkillsChange = (skills: string[]) => {
        setSelectedSkills(skills);
        // Update hidden input for form submission
        if (skillsInputRef.current) {
            skillsInputRef.current.value = skills.join(', ');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isEditing && mainImage.length === 0) {
            alert('Please upload a main image')
            return
        }

        setIsSubmitting(true)

        try {
            const formData = new FormData(e.currentTarget)

            // Handle main image upload
            if (mainImage.length > 0) {
                const mainImageName = `${Date.now()}-${mainImage[0].name}`
                const { error: mainImageError } = await supabase.storage
                    .from('projects-images')
                    .upload(mainImageName, mainImage[0])

                if (mainImageError) throw mainImageError
                formData.set('mainImage', mainImageName)
            }

            // Handle project images upload
            if (projectImages.length > 0) {
                const projectImageUrls = []
                for (const file of projectImages) {
                    const fileName = `${Date.now()}-${file.name}`
                    const { error: uploadError } = await supabase.storage
                        .from('projects-images')
                        .upload(fileName, file)

                    if (uploadError) throw uploadError
                    projectImageUrls.push(fileName)
                }
                formData.set('projectImages', JSON.stringify(projectImageUrls))
            }

            await onSubmit(formData)
        } catch (error) {
            console.error('Error:', error)
            alert(`Error ${isEditing ? 'updating' : 'creating'} project. Please try again.`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">
                {isEditing ? 'Edit Project' : 'Create New Project'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Project Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            defaultValue={project?.name}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="importance" className="block text-sm font-medium text-gray-700 mb-2">
                            Importance (1-5)
                        </label>
                        <input
                            type="number"
                            id="importance"
                            name="importance"
                            min={1}
                            max={5}
                            defaultValue={3}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Descriptions */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Short Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        defaultValue={project?.description}
                        rows={3}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-2">
                        Long Description
                    </label>
                    <textarea
                        id="longDescription"
                        name="longDescription"
                        defaultValue={project?.longDescription || ''}
                        rows={6}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Skills Section - NEW IMPROVED VERSION */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills & Technologies
                    </label>

                    {/* Hidden input for form submission */}
                    <input
                        ref={skillsInputRef}
                        type="hidden"
                        name="skills"
                        defaultValue={selectedSkills.join(', ')}
                    />

                    {/* Skill selector component */}
                    <SkillSelector
                        selectedSkills={selectedSkills}
                        onChange={handleSkillsChange}
                    />
                </div>

                {/* Images Section */}
                <div className="space-y-6">
                    {/* Main Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Main Image {!isEditing && '*'}
                        </label>

                        {isEditing && project?.mainImage && mainImage.length === 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Current main image:</p>
                                <ImagePreview
                                    src={supabase.storage
                                        .from('projects-images')
                                        .getPublicUrl(project.mainImage).data.publicUrl}
                                    alt={project.name}
                                    size="lg"
                                />
                            </div>
                        )}

                        <ImageUpload
                            value={mainImage}
                            onChange={setMainImage}
                            maxFiles={1}
                            bucket="projects-images"
                        />
                    </div>

                    {/* Project Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Images
                        </label>

                        {isEditing && project?.images && project.images.length > 0 && projectImages.length === 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Current project images:</p>
                                <div className="flex flex-wrap gap-3">
                                    {project.images.map((image) => (
                                        <ImagePreview
                                            key={image.id}
                                            src={supabase.storage
                                                .from('projects-images')
                                                .getPublicUrl(image.url).data.publicUrl}
                                            alt={image.alt}
                                            size="md"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <ImageUpload
                            value={projectImages}
                            onChange={setProjectImages}
                            maxFiles={8}
                            multiple={true}
                            bucket="projects-images"
                        />
                    </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            GitHub URL
                        </label>
                        <input
                            type="url"
                            id="githubUrl"
                            name="githubUrl"
                            defaultValue={project?.githubUrl || ''}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            Live URL
                        </label>
                        <input
                            type="url"
                            id="liveUrl"
                            name="liveUrl"
                            defaultValue={project?.liveUrl || ''}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="highlights" className="block text-sm font-medium text-gray-700 mb-2">
                        Highlights (one per line)
                    </label>
                    <textarea
                        id="highlights"
                        name="highlights"
                        defaultValue={project?.highlights?.join('\n')}
                        rows={4}
                        placeholder="Implemented responsive design&#10;Added dark mode support&#10;Improved performance by 40%"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <a
                        href="/admin/projects"
                        className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium"
                    >
                        Cancel
                    </a>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isSubmitting
                            ? `${isEditing ? 'Updating' : 'Creating'}...`
                            : `${isEditing ? 'Update' : 'Create'} Project`
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}