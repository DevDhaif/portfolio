// components/JsonLd.tsx
export function WebsiteJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Dhaifallah Alfarawi Portfolio",
                    "url": "https://devdhaif.vercel.app/",
                    "author": {
                        "@type": "Person",
                        "name": "Dhaifallah Alfarawi",
                        "sameAs": [
                            "https://github.com/DevDhaif",
                            "https://linkedin.com/in/devdhaif"
                        ]
                    }
                })
            }}
        />
    )
}


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

export function BlogPostJsonLd({ post }: { post: Post }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.description,
                    "author": {
                        "@type": "Person",
                        "name": "Dhaifallah Alfarawi"
                    },
                    "datePublished": post.created_at,
                    "image": post.cover_image,
                    "keywords": post.tags.join(", ")
                })
            }}
        />
    )
}