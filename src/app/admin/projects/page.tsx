// app/admin/projects/page.tsx
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function ProjectsPage() {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            *,
            project_images (*)
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects:', error)
    }

    const projectsWithUrls = projects?.map(project => {
        // Get public URL for main image
        const { data: { publicUrl: mainImageUrl } } = supabase.storage
            .from('projects-images')
            .getPublicUrl(project.main_image)

        // Get public URLs for project images
        const projectImages = project.project_images?.map((image: any) => {
            const { data: { publicUrl } } = supabase.storage
                .from('projects-images')
                .getPublicUrl(image.url)
            return {
                ...image,
                publicUrl
            }
        })

        return {
            ...project,
            mainImageUrl,
            projectImages
        }
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Project
                </Link>
            </div>

            <div className="grid gap-6">
                {projectsWithUrls?.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-start gap-4">
                            {project.mainImageUrl && (
                                <Image
                                    src={project.mainImageUrl}
                                    alt={project.name}
                                    width={200}
                                    height={200}
                                    className="w-48 h-32 object-cover rounded"
                                />
                            )}

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold">{project.name}</h2>
                                        <p className="text-gray-600 mt-1">{project.description}</p>

                                        {/* Show project images if any */}
                                        {project.projectImages && project.projectImages.length > 0 && (
                                            <div className="mt-4 flex gap-2">
                                                {project.projectImages.map((image: any, index: number) => (
                                                    <Image
                                                        key={image.id}
                                                        src={image.publicUrl}
                                                        alt={`${project.name} image ${index + 1}`}
                                                        width={200}
                                                        height={200}
                                                        className="w-20 h-20 object-cover rounded"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/projects/${project.id}/edit`}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}