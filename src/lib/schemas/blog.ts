export const createBlogPostSchema = (post: any) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "author": {
        "@type": "Person",
        "name": "Dhaifallah Alfarawi",
        "alternateName": ["ضيف الله الفروي", "Devdhaif"],
        "url": "https://devdhaif.vercel.app"
    },
    "datePublished": post.created_at,
    "dateModified": post.updated_at,
    "image": post.cover_image,
    "keywords": post.tags?.join(', '),
    "url": `https://devdhaif.vercel.app/blog/${post.slug}`,
    "publisher": {
        "@type": "Person",
        "name": "Dhaifallah Alfarawi",
        "url": "https://devdhaif.vercel.app"
    }
});