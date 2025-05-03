'use client'

import { use, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ContentRenderer } from '@/components/blog/ContentReader'
import { incrementViews, toggleLike } from '@/app/admin/blog/actions'
import { EyeIcon, HeartIcon } from 'lucide-react'
import { hasLikedPost, hasViewedPost, markPostAsLiked, markPostAsViewed } from '@/utils/cookies'
import { BlogPostJsonLd } from '@/components/JsonLd/JsonLd'
import { Post } from '@/lib/schemas/blog'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { trackBlogPost, trackBlogInteraction } = useAnalytics()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
    const [isLiking, setIsLiking] = useState(false)
    const [hasLiked, setHasLiked] = useState(false)
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

                if (!hasViewedPost(data.id)) {
                    const viewed = await incrementViews(data.id)
                    if (viewed) {
                        markPostAsViewed(data.id)
                    }
                }

                const likedPosts = document.cookie
                    .split(';')
                    .find(c => c.trim().startsWith('liked_posts='))

                if (likedPosts) {
                    const likedPostIds = likedPosts.split('=')[1].split(',')
                    setHasLiked(likedPostIds.includes(data.id))
                }

                setHasLiked(hasLikedPost(data.id))

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


    useEffect(() => {
        if (post) {
            trackBlogPost({
                title: post.title,
                slug: post.slug,
                tags: post.tags
            })
        }
    }, [post])

    const handleLike = async () => {
        if (!post || isLiking || hasLiked) return

        setIsLiking(true)
        try {
            const result = await toggleLike(post.id)

            if (result.error) {
                console.error('Like error:', result.error)
                return
            }

            if (result.success) {
                setPost(prev => prev ? {
                    ...prev,
                    likes_count: result.likes
                } : null)
                setHasLiked(true)
                trackBlogInteraction('like', post.slug)
            }
        } catch (error) {
            console.error('Like error:', error)
        } finally {
            setIsLiking(false)
        }
    }
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
        <div className=" py-10 mx-auto text-white">
            <BlogPostJsonLd post={post} />
            <div className="space-y-8 max-w-4xl p-8 mx-auto  bg-gradient-to-b from-[#000020]/5 to-[#000040]/5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">{post?.title}</h1>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-gray-500">
                            <EyeIcon className="w-4 h-4" />
                            {post?.views_count || 0}
                        </span>
                        <button onClick={handleLike} disabled={isLiking || hasLiked} className={`flex items-center gap-1 transition-colors ${hasLiked ? 'text-red-500' : 'hover:text-red-500'
                            } ${isLiking ? 'opacity-50' : ''}`}>
                            <HeartIcon className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                            {post?.likes_count || 0}
                        </button>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">{tag}</span>
                    ))}
                </div>

                {/* Main Image */}
                {coverImageUrl && (
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                        <Image src={coverImageUrl} alt={post.title} fill className="object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <ContentRenderer content={post.content} />
                </div>
            </div>
        </div>
    )
}
