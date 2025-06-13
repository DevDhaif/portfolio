import React from "react";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import type { LucideIcon } from 'lucide-react'

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

export interface BlogCardProps {
    id: string;
    title: string;
    description: string;
    date: string;
    coverImage: string;
    slug: string;
    tags: string[];
    created_at: string;
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
export interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    index: number;
}
export interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    badge?: string;
    alignment?: "left" | "center";
    className?: string;
}
export interface SkillCardProps {
    name: string;
    icon: string;
    category?: string;
}
export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    children: React.ReactNode;
}
export interface TerminalProps {
    commands: string[];
    typingSpeed?: number;
    delayBetweenCommands?: number;
    className?: string;
    prompt?: string;
    title?: string;
    showTitle?: boolean;
    height?: string;
    stopAfterCycle?: boolean;
}
export interface ImagePreviewDialogProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string
    altText?: string
    onNext?: () => void
    onPrevious?: () => void
    hasNext?: boolean
    hasPrevious?: boolean
}
export interface LoadingProps {
    text?: string
}
export interface NavLinkProps {
    href: string;
    Icon: LucideIcon;
    title: string;
}
export interface ScrollAnimationConfig {
    yOffset?: string
    opacityThreshold?: {
        start: number
        end: number
    }
}
export interface DeletePostButtonProps {
    postId: string
    onDelete: (id: string) => Promise<void>
}
export interface DeleteProjectButtonProps {
    projectId: string
    onDelete: (id: string) => Promise<void>
}
export interface TagSelectorProps {
    selectedTags: string[];
    onChange: (tags: string[]) => void;
    className?: string;
}