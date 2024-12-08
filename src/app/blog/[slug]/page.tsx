
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ContentRenderer } from '@/components/blog/ContentReader'
import { CalendarIcon, EyeIcon, HeartIcon } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    description: string;
    content: {
        type: string;
        content: any[];
    };
    cover_image: string;
    tags: string[];
    created_at: string;
    slug: string;
    views_count: number,
    likes_count: number
}
interface PageProps {
    params: {
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}
export default async function BlogPost({ params, searchParams }: PageProps) {
    const supabase = await createClient()

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single()

    console.log(post)

    if (error || !post) {
        notFound()
    }

    const typedPost = post as Post


    let coverImageUrl = typedPost.cover_image
    if (typedPost.cover_image && !typedPost.cover_image.startsWith('http')) {
        coverImageUrl = supabase.storage
            .from('blog-content')
            .getPublicUrl(typedPost.cover_image)
            .data.publicUrl
    }


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <article className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        {typedPost.tags?.map((tag: string) => (
                            <span
                                key={tag}
                                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                        {typedPost.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                        {typedPost.description}
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={typedPost.created_at} className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {new Date(typedPost.created_at).toLocaleDateString()}
                        </time>
                        <span className="flex items-center gap-1">
                            <EyeIcon className="h-4 w-4" />
                            {typedPost.views_count || 0} views
                        </span>
                        <span className="flex items-center gap-1">
                            <HeartIcon className="h-4 w-4" />
                            {typedPost.likes_count || 0} likes
                        </span>
                    </div>
                </header>

                {coverImageUrl && (
                    <div className="relative h-[500px] mb-12 rounded-lg overflow-hidden">
                        <Image
                            src={coverImageUrl}
                            alt={typedPost.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <ContentRenderer content={typedPost.content} />
                </div>

                {/* Add sharing buttons */}
                <div className="mt-12 flex justify-center gap-4">
                    {/* <ShareButton type="twitter" url={`/blog/${typedPost.slug}`} title={typedPost.title} /> */}
                    {/* <ShareButton type="linkedin" url={`/blog/${typedPost.slug}`} title={typedPost.title} /> */}
                    {/* Add more share buttons as needed */}
                </div>
            </article>
        </div>
    )
}