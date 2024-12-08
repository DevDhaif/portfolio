
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
    id: string;
    title: string;
    description: string;
    content: {
        type: string;
        content: any[];
    };
    cover_image: string;
    tags: string[] | string;
    created_at: string;
    slug: string;
}

export default async function BlogPage() {
    const supabase = await createClient()

    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return <div>Error loading posts</div>
    }

    const postsWithUrls = posts.map((post: Post) => {
        let coverImageUrl = post.cover_image
        if (post.cover_image && !post.cover_image.startsWith('http')) {
            coverImageUrl = supabase.storage
                .from('blog-content')
                .getPublicUrl(post.cover_image)
                .data.publicUrl
        }


        let processedTags: string[] = []
        if (typeof post.tags === 'string') {
            try {

                const parsedTags = JSON.parse(post.tags)
                processedTags = Array.isArray(parsedTags) ? parsedTags : [parsedTags]
            } catch {

                processedTags = post.tags.replace(/[\[\]"]/g, '').split(',').map(tag => tag.trim())
            }
        } else if (Array.isArray(post.tags)) {
            processedTags = post.tags
        }

        return {
            ...post,
            cover_image: coverImageUrl,
            tags: processedTags.filter(tag => tag)
        }
    })

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-12">Blog Posts</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postsWithUrls.map((post) => (
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
                                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map((tag: string, index: number) => (
                                            <span
                                                key={`${tag}-${index}`}
                                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                                            >
                                                {tag.trim()} {/* Ensure no extra whitespace */}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}