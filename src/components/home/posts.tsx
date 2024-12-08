
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

    useEffect(() => {
        async function fetchPosts() {
            const supabase = createClient()
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false })
                .limit(3)

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

    if (loading) {
        return <div className="h-96 flex items-center justify-center">Loading...</div>
    }

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold">Latest Posts</h2>
                    <Link
                        href="/blog"
                        className="text-primary hover:underline"
                    >
                        See all posts →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                            <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48">
                                    {post.cover_image && (
                                        <Image
                                            src={post.cover_image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags?.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
