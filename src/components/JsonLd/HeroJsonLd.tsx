export function HeroJsonLd({ author }: { author: any }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": author.name,
                    "jobTitle": "Full Stack Developer",
                    "description": author.bio,
                    "url": "https://devdhaif.vercel.app/",
                    "image": author.avatar,
                    "sameAs": [
                        author.github,
                        author.linkedin
                    ],
                    "skills": author.skills,
                })
            }}
        />
    )
}