"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    index: number;
}

export function ProjectCard({ id, title, description, image, tags, githubUrl, liveUrl, index }: ProjectCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="group relative h-full rounded-xl overflow-hidden bg-card border border-border hover:border-accent-primary/30 transition-all duration-300 hover:shadow-glow">
            {/* Image Container with Fixed Height */}
            <div className="relative w-full h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-70" />
                <div className="absolute inset-0 bg-background/20 z-5" />
                {image && (
                    <Image src={image} alt={title} fill priority={index < 6}
                        className={cn(
                            "object-cover w-full h-full transform",
                            "transition-all duration-500 ease-out",
                            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
                            "group-hover:scale-105"
                        )}
                        onLoad={() => setImageLoaded(true)}
                    />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col p-4 h-[calc(100%-12rem)]">
                {/* Title */}
                <h3 className="text-lg font-display font-medium mb-2 text-text-primary group-hover:text-accent-primary transition-colors duration-300"> {title} </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-grow">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((tag) => (
                        <span key={tag} className="inline-block rounded-full bg-accent-subtle border border-accent-primary/20 px-2 py-0.5 text-xs font-medium text-accent-primary">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border/50">
                    <Button asChild variant="secondary" size="sm" className="flex-1 bg-accent-subtle hover:bg-accent-primary/20 text-accent-primary">
                        <Link href={`/projects/${id}`}>
                            <Info className="mr-1.5 h-3.5 w-3.5" />
                            Details
                        </Link>
                    </Button>

                    <div className="flex gap-1.5">
                        {githubUrl && (
                            <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-lg border-border hover:border-border-hover hover:bg-card-hover">
                                <Link href={githubUrl} target="_blank" rel="noreferrer">
                                    <Github className="h-4 w-4 text-text-secondary group-hover:text-text-primary" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                        )}
                        {liveUrl && (
                            <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-lg border-border hover:border-border-hover hover:bg-card-hover">
                                <Link href={liveUrl} target="_blank" rel="noreferrer">
                                    <ExternalLink className="h-4 w-4 text-text-secondary group-hover:text-text-primary" />
                                    <span className="sr-only">Live Demo</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}