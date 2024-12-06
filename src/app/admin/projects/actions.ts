// app/admin/projects/actions.ts
'use server'

import { projectsData } from '@/lib/projects-data'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const projectData = {
        name: formData.get('name'),
        description: formData.get('description'),
        long_description: formData.get('longDescription'),
        main_image: formData.get('mainImage'),
        skills: (formData.get('skills') as string)?.split(',').map(s => s.trim()) || [],
        github_url: formData.get('githubUrl'),
        live_url: formData.get('liveUrl'),
        highlights: (formData.get('highlights') as string)?.split('\n').filter(Boolean) || []
    }
    console.log(projectsData)
    const { data: project, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single()

    if (error) {
        console.error('Error creating project:', error)
        redirect('/error')
    }

    // Handle additional project images
    const projectImages = JSON.parse(formData.get('projectImages') as string || '[]')
    if (projectImages.length > 0 && project) {
        const { error: imagesError } = await supabase
            .from('project_images')
            .insert(
                projectImages.map((url: string) => ({
                    project_id: project.id,
                    url,
                    alt: project.name
                }))
            )

        if (imagesError) {
            console.error('Error adding project images:', imagesError)
        }
    }

    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}