'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ContentRenderer } from '@/components/blog/ContentReader'
import { incrementViews, toggleLike } from '@/app/admin/blog/actions'
import { EyeIcon, HeartIcon } from 'lucide-react'
import { hasLikedPost, hasViewedPost, markPostAsLiked, markPostAsViewed } from '@/utils/cookies'

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

interface Props {
    initialPost: Post
    params: { slug: string }
}

export default function ClientBlogPost({ initialPost, params }: Props) {
    const [post, setPost] = useState<Post>(initialPost)
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
    const [isLiking, setIsLiking] = useState(false)
    const [hasLiked, setHasLiked] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        if (!hasViewedPost(post.id)) {
            incrementViews(post.id).then(viewed => {
                if (viewed) {
                    markPostAsViewed(post.id)
                }
            })
        }

        setHasLiked(hasLikedPost(post.id))

        if (post.cover_image && !post.cover_image.startsWith('http')) {
            const { data: { publicUrl } } = supabase.storage
                .from('blog-content')
                .getPublicUrl(post.cover_image)
            setCoverImageUrl(publicUrl)
        }
    }, [post.id, post.cover_image, supabase])

    const handleLike = async () => {
        if (!post || isLiking || hasLiked) return

        setIsLiking(true)
        try {
            const result = await toggleLike(post.id)

            if (result.success) {
                setPost(prev => ({
                    ...prev,
                    likes_count: result.likes
                }))
                setHasLiked(true)
                markPostAsLiked(post.id)
            }
        } catch (error) {
            console.error('Like error:', error)
        } finally {
            setIsLiking(false)
        }
    }

    return (
        <div className="py-10 mx-auto text-white">
            <motion.div
                className="space-y-8 bg-gradient-to-b from-[#000020]/5 to-[#000040]/5 backdrop-blur-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">{post?.title}</h1>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-muted-foreground">
                            <EyeIcon className="w-4 h-4" />
                            {post?.views_count || 0}
                        </span>
                        <button
                            onClick={handleLike}
                            disabled={isLiking || hasLiked}
                            className={`flex items-center gap-1 transition-colors ${hasLiked ? 'text-red-500' : 'hover:text-red-500'
                                } ${isLiking ? 'opacity-50' : ''}`}
                        >
                            <HeartIcon
                                className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`}
                            />
                            {post?.likes_count || 0}
                        </button>
                    </div>
                </div>

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