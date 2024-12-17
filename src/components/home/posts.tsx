"use client"

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Loader2, ChevronRight, Calendar, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

interface Post {
    id: string
    title: string
    description: string
    cover_image: string
    slug: string
    created_at: string
    tags: string[]
}

export function Posts() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [visiblePosts, setVisiblePosts] = useState(3)

    useEffect(() => {
        async function fetchPosts() {
            const supabase = createClient()
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false })
                .limit(6)

            if (!error && data) {
                const postsWithUrls = data.map(post => {
                    let coverImageUrl = post.cover_image
                    if (post.cover_image && !post.cover_image.startsWith('http')) {
                        coverImageUrl = supabase.storage
                            .from('blog-content')
                            .getPublicUrl(post.cover_image)
                            .data.publicUrl
                    }
                    return { ...post, cover_image: coverImageUrl }
                })
                setPosts(postsWithUrls)
            }
            setLoading(false)
        }

        fetchPosts()
    }, [])

    const loadMore = () => {
        setVisiblePosts(prev => Math.min(prev + 3, posts.length))
    }

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-blue-200/70 text-sm">Loading latest posts...</p>
            </div>
        )
    }

    return (
        <section className="py-24 relative overflow-hidden">


            <div className="container mx-auto px-4 relative">
                <div className="flex justify-between items-center mb-12">
                    <div className="space-y-2">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                        >
                            Latest Posts
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-blue-200/70"
                        >
                            Explore my latest thoughts and tutorials
                        </motion.p>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
                    >
                        See all posts
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {posts.slice(0, visiblePosts).map((post) => (
                        <motion.div
                            key={post.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }
                                }
                            }}
                        >
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="group relative bg-blue-950/40 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden hover:border-blue-500/40 transition-colors">
                                    {/* Image container */}
                                    <div className="relative h-48">
                                        {post.cover_image && (
                                            <Image
                                                src={post.cover_image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-sm text-blue-300/70 mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <time>{new Date(post.created_at).toLocaleDateString()}</time>
                                        </div>

                                        {/* Title and description */}
                                        <h3 className="text-xl font-semibold mb-2 text-blue-100 group-hover:text-blue-200 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-blue-200/70 mb-4 line-clamp-2">
                                            {post.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags?.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="flex items-center gap-1 bg-blue-500/10 text-blue-200/80 px-2 py-1 rounded-full text-sm border border-blue-500/20"
                                                >
                                                    <Tag className="w-3 h-3" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hover effect */}
                                    <div className="absolute inset-0 border-2 border-blue-500/0 rounded-xl group-hover:border-blue-500/20 transition-colors" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Load more button */}
                {visiblePosts < posts.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center mt-12"
                    >
                        <button
                            onClick={loadMore}
                            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-200 transition-all"
                        >
                            Load more posts
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}