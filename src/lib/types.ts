export interface ProjectImage {
    url: string;
    alt: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    mainImage: string;
    images?: ProjectImage[];
    video?: string;
    skills: string[];
    githubUrl?: string;
    liveUrl?: string;
    highlights?: string[];
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