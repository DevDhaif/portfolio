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


export type SkillLevel = 'essential' | 'advanced' | 'additional';

export interface SkillItem {
    name: string;
    level: SkillLevel;
    icon: string; // Only string for image paths
}

export interface SkillCategory {
    title: string;
    subtitle: string;
    items: SkillItem[];
    icon: JSX.Element; // Category icons are always JSX.Element
}

export interface SkillCardProps extends SkillCategory {
    index: number;
}
export interface StaticProjectImage {
    url: string;
    alt: string;
}

export interface StaticProject {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    mainImage: string;
    images?: { url: string; alt: string; }[];
    video?: string;
    skills: string[];
    githubUrl?: string;
    liveUrl?: string;
    highlights: string[];
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


