import { createClient } from '@/utils/supabase/client';
import { Metadata } from 'next';

export async function generatePostMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const supabase = await createClient()

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.description,
        keywords: [...post.tags, 'blog', 'Dhaifallah Alfarawi', 'DevDhaif'],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.created_at,
            authors: ['Dhaifallah Alfarawi'],
            tags: post.tags,
            images: [
                {
                    url: post.cover_image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
    }
}