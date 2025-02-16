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

    const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`

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
            modifiedTime: post.updated_at,
            authors: ['Dhaifallah Alfarawi'],
            tags: post.tags,
            images: [ogImage]
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [ogImage]
        }
    }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single()

    if (!post) {
        return <div>Post not found</div>
    }

    // Add JSON-LD schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        author: {
            '@type': 'Person',
            name: 'Dhaifallah Alfarawi',
            url: 'https://devdhaif.vercel.app'
        },
        datePublished: post.created_at,
        dateModified: post.updated_at,
        image: post.cover_image,
        keywords: post.tags?.join(', ')
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ClientBlogPost initialPost={post} />
        </>
    )
}