"use client"

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Loader2, ChevronRight, Calendar, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { PostCard } from './PostCard'

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
                    viewport={{ once: false }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {posts.slice(0, visiblePosts).map((post, index) => (
                        <PostCard key={post.id} {...post} index={index} />
                    ))}
                </motion.div>

                {/* Load more button */}
                {visiblePosts < posts.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="mt-12 text-center"
                    >
                        <button
                            onClick={() => setVisiblePosts(prev => prev + 6)}
                            className="px-6 py-2 rounded-full bg-white/5 text-white hover:bg-white/10 
                            transition-colors border border-white/10"
                        >
                            Load More Posts
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}