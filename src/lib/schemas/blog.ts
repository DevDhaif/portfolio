import { Post } from "@/types";

export const createBlogPostSchema = (post: Post) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://devdhaif.vercel.app/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.description,
    "author": {
        "@type": "Person",
        "name": "Dhaifallah Alfarawi",
        "alternateName": ["ضيف الله الفروي", "Devdhaif"],
        "url": "https://devdhaif.vercel.app"
    },
    "datePublished": post.created_at,
    "dateModified": post.created_at,
    "image": post.cover_image ?
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-content/${post.cover_image}`
        : undefined,
    "keywords": post.tags?.join(', '),
    "url": `https://devdhaif.vercel.app/blog/${post.slug}`,
    "publisher": {
        "@type": "Person",
        "name": "Dhaifallah Alfarawi",
        "url": "https://devdhaif.vercel.app"
    },
    "inLanguage": ["en", "ar"]
});