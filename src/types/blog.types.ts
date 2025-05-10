export interface Post {
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
export interface ProjectImage {
    id: string;
    url: string;
    alt: string;
    projectId: string;
}
export interface Project {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    mainImage: string;
    images?: ProjectImage[];
    video?: string,
    skills: string[];
    githubUrl?: string;
    liveUrl?: string;
    highlights: string[];
    createdAt: string;
    updatedAt: string;
}
export interface ProcessedPost {
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
}
export interface BlogPageProps {
    params?: any;
    searchParams: Promise<{ tag?: string; search?: string }>;
}