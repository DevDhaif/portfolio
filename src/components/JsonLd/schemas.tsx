// src/components/JsonLd/schemas.tsx
import { JsonLd } from './JsonLd';
import { Project, Post } from '@/lib/types';
import { WEBSITE_SCHEMA, PERSON_SCHEMA } from '@/lib/schemas';

// Website schema
export function WebsiteJsonLd() {
    return <JsonLd schema={WEBSITE_SCHEMA} />;
}

// Blog post schema
export function BlogPostJsonLd({ post }: { post: Post }) {
    const schema = {
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
    };

    return <JsonLd schema={schema} />;
}

// Project schema
export function ProjectJsonLd({ project }: { project: Project }) {
    const schema = {
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
        "keywords": project.skills.join(", ")
    };

    return <JsonLd schema={schema} />;
}

// Projects list schema
export function ProjectsListJsonLd({ projects }: { projects: Project[] }) {
    const schema = {
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
                }
            }
        }))
    };

    return <JsonLd schema={schema} />;
}

// Author/Person schema
export function HeroJsonLd({ author }: { author: any }) {
    const schema = {
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
        "skills": author.skills
    };

    return <JsonLd schema={schema} />;
}

// Root schemas
export function RootSchema() {
    return (
        <>
            <JsonLd schema={WEBSITE_SCHEMA} />
            <JsonLd schema={PERSON_SCHEMA} />
        </>
    );
}