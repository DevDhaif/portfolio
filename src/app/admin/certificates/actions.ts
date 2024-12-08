
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCertificate(formData: FormData) {
    const supabase = await createClient()

    try {
        const { error } = await supabase
            .from('certificates')
            .insert([{
                title: formData.get('title'),
                description: formData.get('description'),
                skills: formData.get('skills')?.toString().split(',').map(s => s.trim()) || [],
                credential_id: formData.get('credentialId'),
                issue_date: formData.get('issueDate'),
                source: formData.get('source'),
                source_icon: formData.get('sourceIcon'),
                url_link: formData.get('urlLink'),
                image: formData.get('certificateImage')
            }])

        if (error) throw error

        revalidatePath('/admin/certificates')
        redirect('/admin/certificates')
    } catch (error) {
        console.error('Error:', error)
        return { error: 'Failed to create certificate' }
    }
}