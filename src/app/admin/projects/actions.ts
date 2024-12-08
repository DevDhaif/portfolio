
'use server'


import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    try {
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .insert([{
                name: formData.get('name'),
                description: formData.get('description'),
                long_description: formData.get('longDescription'),
                main_image: formData.get('mainImage'),
                skills: formData.get('skills')?.toString().split(',').map(s => s.trim()) || [],
                github_url: formData.get('githubUrl'),
                live_url: formData.get('liveUrl'),
                highlights: formData.get('highlights')?.toString().split('\n').filter(Boolean) || []
            }])
            .select()
            .single()

        if (projectError) throw projectError


        const projectImageUrls = JSON.parse(formData.get('projectImages') as string || '[]')
        if (projectImageUrls.length > 0) {
            const { error: imagesError } = await supabase
                .from('project_images')
                .insert(
                    projectImageUrls.map((url: string) => ({
                        project_id: project.id,
                        url,
                        alt: project.name
                    }))
                )

            if (imagesError) throw imagesError
        }

        revalidatePath('/admin/projects')
        redirect('/admin/projects')

    } catch (error) {
        console.error('Error:', error)
        return { error: 'Failed to create project' }
    }
}

export async function deleteProject(projectId: string) {
    const supabase = await createClient()

    try {

        const { data: project } = await supabase
            .from('projects')
            .select('main_image, project_images(url)')
            .eq('id', projectId)
            .single()

        if (project) {

            await supabase.storage
                .from('projects-images')
                .remove([project.main_image])


            const imagePaths = project.project_images?.map((img: any) => img.url) || []
            if (imagePaths.length > 0) {
                await supabase.storage
                    .from('projects-images')
                    .remove(imagePaths)
            }


            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', projectId)

            if (error) throw error


            revalidatePath('/admin/projects')
        }
    } catch (error) {
        console.error('Error deleting project:', error)
        throw error
    }
}