import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import ClientBlogPost from './ClientBlogPost'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const supabase = createClient()
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found'
        }
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            authors: ['Dhaifallah Alfarawi']
        }
    }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!post) {
        return <div>Post not found</div>
    }

    return <ClientBlogPost initialPost={post} params={params} />
}