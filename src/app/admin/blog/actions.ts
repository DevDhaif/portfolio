
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
    try {
        const supabase = await createClient()


        const tags = JSON.parse(formData.get('tags') as string)

        const { error: insertError } = await supabase
            .from('posts')
            .insert([{
                title: formData.get('title'),
                description: formData.get('description'),
                content: JSON.parse(formData.get('content') as string),
                cover_image: formData.get('coverImage'),
                tags,
                slug: formData.get('title')?.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, ''),
                published: true
            }])

        if (insertError) throw insertError

        revalidatePath('/blog')
        redirect('/admin/blog')
    } catch (error) {
        console.error('Error:', error)
        return { error: 'Failed to create post' }
    }
}
export async function deletePost(postId: string) {
    try {
        const supabase = await createClient()

        const { data: post, error: fetchError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single()

        if (fetchError) {
            console.error('Error fetching post:', fetchError)
            throw new Error('Failed to find post')
        }

        if (post) {
             
            if (post.cover_image) {
                const { error: storageError } = await supabase.storage
                    .from('blog-content')
                    .remove([post.cover_image])

                if (storageError) {
                    console.error('Error deleting cover image:', storageError)
                }
            }

             
            try {
                const content = JSON.parse(post.content)
                 
                 
            } catch (e) {
                console.error('Error parsing content:', e)
            }

             
            const { error: deleteError } = await supabase
                .from('posts')
                .delete()
                .match({ id: postId })   

            if (deleteError) {
                console.error('Error deleting post:', deleteError)
                throw new Error('Failed to delete post data')
            }

            revalidatePath('/admin/blog')
            revalidatePath('/blog')
        }
    } catch (error) {
        console.error('Delete operation error:', error)
        throw new Error('Failed to delete post')
    }
}