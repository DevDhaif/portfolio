// components/JsonLd/ProjectsJsonLd.tsx
interface ProjectJsonLdProps {
    project: {
        id: string
        name: string
        description: string
        longDescription?: string
        skills: string[]
        githubUrl?: string
        liveUrl?: string
        mainImage: string
        createdAt: string
        updatedAt: string
    }
}

export function ProjectJsonLd({ project }: ProjectJsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareSourceCode",
                    "name": project.name,
                    "description": project.longDescription || project.description,
                    "programmingLanguage": project.skills,
                    "codeRepository": project.githubUrl,
                    "url": project.liveUrl,
                    "image": project.mainImage,
                    "dateCreated": project.createdAt,
                    "dateModified": project.updatedAt,
                    "author": {
                        "@type": "Person",
                        "name": "Dhaifallah Alfarawi",
                        "url": "https://devdhaif.vercel.app/"
                    },
                    "thumbnailUrl": project.mainImage,
                    "keywords": project.skills.join(", "),
                })
            }}
        />
    )
}