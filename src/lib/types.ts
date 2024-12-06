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




export type SkillLevel = 'essential' | 'advanced' | 'additional';

export interface SkillItem {
    name: string;
    level: SkillLevel;
    icon: JSX.Element;
}

export interface SkillCategory {
    title: string;
    items: SkillItem[];
    icon: JSX.Element;
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

// interface StaticProjectCardProps extends StaticProject {
//     index: number;
// }