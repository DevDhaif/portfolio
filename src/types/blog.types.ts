export interface Post {
    id: string
    title: string
    title_en?: string
    title_ar?: string
    description: string
    description_en?: string
    description_ar?: string
    content: {
        type: string
        content: any[]
    }
    content_en?: {
        type: string
        content: any[]
    }
    content_ar?: {
        type: string
        content: any[]
    }
    published: boolean
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
    importance?: number; // Importance from 1 to 5
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
export interface Certificate {
    id: string;
    title: string;
    description?: string;
    skills: string[];
    credentialId?: string;
    issueDate: string;
    source: string;
    sourceIcon?: string;
    urlLink?: string;
    certificateImageUrl?: string;
    issue_date: Date,
    createdAt: string;
    updatedAt: string;
}
export interface CertificateCardProps extends Certificate {
    index: number
}