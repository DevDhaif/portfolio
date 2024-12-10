import { Project } from '@/lib/types'

export function ProjectsListJsonLd({ projects }: { projects: Project[] }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": projects.map((project, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "item": {
                            "@type": "SoftwareSourceCode",
                            "name": project.name,
                            "description": project.description,
                            "image": project.mainImage,
                            "programmingLanguage": project.skills,
                            "codeRepository": project.githubUrl,
                            "url": project.liveUrl,
                            "dateCreated": project.createdAt,
                            "dateModified": project.updatedAt,
                            "author": {
                                "@type": "Person",
                                "name": "Dhaifallah Alfarawi",
                                "url": "https://devdhaif.vercel.app/"
                            },
                        }
                    }))
                })
            }}
        />
    )
}