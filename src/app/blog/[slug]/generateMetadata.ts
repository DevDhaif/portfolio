import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const supabase = createClient()

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found'
        }
    }

    const coverImage = post.cover_image ?
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-content/${post.cover_image}`
        : undefined

    return {
        title: post.title,
        description: post.description,
        keywords: [...(post.tags || []), 'Dhaifallah Alfarawi', 'Devdhaif', 'Blog'],
        authors: [{ name: 'Dhaifallah Alfarawi' }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.created_at,
            modifiedTime: post.created_at,
            authors: ['Dhaifallah Alfarawi'],
            tags: post.tags,
            images: coverImage ? [
                {
                    url: coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title
                }
            ] : undefined
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: coverImage ? [coverImage] : undefined,
            creator: '@devdhaif'
        },
        alternates: {
            canonical: `https://devdhaif.vercel.app/blog/${post.slug}`
        }
    }
}