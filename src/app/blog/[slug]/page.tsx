'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'  // Note: using client instead of server
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ContentRenderer } from '@/components/blog/ContentReader'
import { CalendarIcon, EyeIcon, HeartIcon } from 'lucide-react'

interface Post {
    id: string
    title: string
    description: string
    content: {
        type: string
        content: any[]
    }
    cover_image: string
    tags: string[]
    created_at: string
    slug: string
    views_count: number
    likes_count: number
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<Post | null>(null)
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function fetchPost() {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', params.slug)
                .eq('published', true)
                .single()

            if (error || !data) {
                router.push('/404')
                return
            }

            setPost(data as Post)

            if (data.cover_image && !data.cover_image.startsWith('http')) {
                const { data: { publicUrl } } = supabase.storage
                    .from('blog-content')
                    .getPublicUrl(data.cover_image)
                setCoverImageUrl(publicUrl)
            }
        }

        fetchPost()
    }, [params.slug])

    if (!post) return <div>Loading...</div>
    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <article className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        {post.tags?.map((tag: string) => (
                            <span
                                key={tag}
                                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                        {post.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                        {post.description}
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.created_at} className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {new Date(post.created_at).toLocaleDateString()}
                        </time>
                        <span className="flex items-center gap-1">
                            <EyeIcon className="h-4 w-4" />
                            {post.views_count || 0} views
                        </span>
                        <span className="flex items-center gap-1">
                            <HeartIcon className="h-4 w-4" />
                            {post.likes_count || 0} likes
                        </span>
                    </div>
                </header>

                {coverImageUrl && (
                    <div className="relative h-[500px] mb-12 rounded-lg overflow-hidden">
                        <Image
                            src={coverImageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <ContentRenderer content={post.content} />
                </div>

                {/* Add sharing buttons */}
                <div className="mt-12 flex justify-center gap-4">
                    {/* <ShareButton type="twitter" url={`/blog/${post.slug}`} title={post.title} /> */}
                    {/* <ShareButton type="linkedin" url={`/blog/${post.slug}`} title={post.title} /> */}
                    {/* Add more share buttons as needed */}
                </div>
            </article>
        </div>
    )
} 