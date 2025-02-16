import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import ClientBlogPost from './ClientBlogPost'
import { createBlogPostSchema } from '@/lib/schemas/blog'

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
        }
    }
}

export default async function BlogPost({ params }: Props) {
    const supabase = createClient()
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!post) {
        return <div>Post not found</div>
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(createBlogPostSchema(post))
                }}
            />
            <ClientBlogPost initialPost={post} params={params} />
        </>
    )
}