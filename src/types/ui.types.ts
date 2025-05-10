import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import React from "react";

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