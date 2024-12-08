import { EyeIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
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

export function BlogCard({ post }: { post: Post }) {
    return (
        <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-48 overflow-hidden">
                {post.cover_image && (
                    <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                )}
                {/* Tags overlaid on image */}
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                    {post.tags?.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-1">
                    {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <EyeIcon className="h-4 w-4" />
                            {post.views_count || 0}
                        </span>
                        <span className="flex items-center gap-1">
                            <HeartIcon className="h-4 w-4" />
                            {post.likes_count || 0}
                        </span>
                    </div>
                    <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString()}
                    </time>
                </div>
            </div>
        </div>
    )
}