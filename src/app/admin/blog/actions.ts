
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
    try {
        const supabase = await createClient()

        const content = JSON.parse(formData.get('content') as string)
        const tags = JSON.parse(formData.get('tags') as string)

        const { data, error: insertError } = await supabase
            .from('posts')
            .insert([{
                title: formData.get('title'),
                description: formData.get('description'),
                content,
                cover_image: formData.get('coverImage'),
                tags,
                slug: formData.get('title')?.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, ''),
                published: true
            }])
            .select()
            .single()

        if (insertError) {
            console.error('Insert error:', insertError)
            return { error: 'Failed to create post', details: insertError }
        }

        revalidatePath('/blog')
        // Instead of redirect, return success
        return { success: true }

    } catch (error) {
        console.error('Error in createPost:', error)
        return { error: 'Failed to create post', details: error }
    }
}
export async function deletePost(postId: string) {
    try {
        const supabase = await createClient()

        // Fetch the post
        const { data: post, error: fetchError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single()

        if (fetchError) throw fetchError

        if (post) {
            console.log('Found post:', post)
            console.log('Raw content:', post.content)

            // Delete cover image if exists
            if (post.cover_image) {
                console.log('Deleting cover image:', post.cover_image)
                const { error: coverImageError } = await supabase.storage
                    .from('blog-content')
                    .remove([post.cover_image])

                if (coverImageError) {
                    console.error('Error deleting cover image:', coverImageError)
                } else {
                    console.log('Successfully deleted cover image')
                }
            }

            // Delete content images
            try {
                // Make sure content is parsed properly
                const content = typeof post.content === 'string'
                    ? JSON.parse(post.content)
                    : post.content

                console.log('Parsed content:', content)

                const imagesToDelete: string[] = []

                // Modified findImages function
                function findImages(node: any) {
                    console.log('Processing node:', node)

                    // Check if it's an image node
                    if (node.type === 'image') {
                        const src = node.attrs.src
                        console.log('Found image src:', src)

                        // If it's a filename from our storage
                        if (typeof src === 'string' && !src.startsWith('http')) {
                            imagesToDelete.push(src)
                            console.log('Added to delete list:', src)
                        }
                    }

                    // Process child nodes
                    if (node.content && Array.isArray(node.content)) {
                        node.content.forEach(findImages)
                    }
                }

                // Start the recursive search
                findImages(content)

                console.log('Final list of images to delete:', imagesToDelete)

                // Delete the images if we found any
                if (imagesToDelete.length > 0) {
                    console.log('Attempting to delete images:', imagesToDelete)
                    const { data, error: deleteImagesError } = await supabase.storage
                        .from('blog-content')
                        .remove(imagesToDelete)

                    if (deleteImagesError) {
                        console.error('Error deleting content images:', deleteImagesError)
                    } else {
                        console.log('Successfully deleted images. Result:', data)
                    }
                } else {
                    console.log('No content images to delete')
                }

            } catch (e) {
                console.error('Error handling content images:', e)
                console.error('Error details:', {
                    message: e.message,
                    stack: e.stack
                })
            }

            // Delete the post
            console.log('Deleting post from database')
            const { error: deleteError } = await supabase
                .from('posts')
                .delete()
                .match({ id: postId })

            if (deleteError) {
                console.error('Error deleting post:', deleteError)
                throw deleteError
            }

            console.log('Post deleted successfully')
            revalidatePath('/admin/blog')
            revalidatePath('/blog')
        }
    } catch (error) {
        console.error('Delete operation error:', error)
        throw new Error('Failed to delete post')
    }
}
export async function incrementViews(postId: string) {
    const cookieStore = await cookies()
    const viewedPosts = cookieStore.get('viewed_posts')?.value || ''

    if (!viewedPosts.includes(postId)) {
        const supabase = await createClient()

        const { error } = await supabase.rpc('increment_views', { post_id: postId })
        if (error) console.error('Error incrementing views:', error)

        const newViewedPosts = viewedPosts ? `${viewedPosts},${postId}` : postId;
        cookieStore.set('viewed_posts', newViewedPosts, {
            maxAge: 60 * 60
        })

        revalidatePath('/blog/[slug]')
        return true
    }
    return false
}

export async function toggleLike(postId: string) {
    try {
        const cookieStore = await cookies()
        const likedPosts = cookieStore.get('liked_posts')?.value || ''

        if (!likedPosts.includes(postId)) {
            const supabase = await createClient()

            const { error: rpcError } = await supabase.rpc('increment_likes', {
                post_id: postId
            })

            if (rpcError) {
                console.error('RPC Error:', rpcError)
                return { error: rpcError.message }
            }

            const { data: post, error: fetchError } = await supabase
                .from('posts')
                .select('likes_count')
                .eq('id', postId)
                .single()

            if (fetchError) {
                console.error('Fetch Error:', fetchError)
                return { error: fetchError.message }
            }

            const newLikedPosts = likedPosts ? `${likedPosts},${postId}` : postId
            cookieStore.set('liked_posts', newLikedPosts, {
                maxAge: 60 * 60 * 24 * 365
            })

            revalidatePath('/blog/[slug]')
            return { success: true, likes: post.likes_count }
        }

        return { error: 'Already liked' }
    } catch (error) {
        console.error('Toggle Like Error:', error)
        return { error: 'Failed to toggle like' }
    }
}