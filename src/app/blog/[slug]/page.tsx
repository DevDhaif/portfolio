'use client'

import { use, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ContentRenderer } from '@/components/blog/ContentReader'

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

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params); // Unwrap `params`
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function fetchPost() {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
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
            } catch (error) {
                console.error('Error fetching post:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [slug, supabase, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Post not found</div>
            </div>
        )
    }

    return (
        <div className="container py-10 mx-auto">
            <motion.div
                className="space-y-8 p-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold">{post.title}</h1>
                <p className="text-xl text-muted-foreground">{post.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Main Image */}
                {coverImageUrl && (
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                        <Image
                            src={coverImageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <ContentRenderer content={post.content} />
                </div>
            </motion.div>
        </div>
    )
}
