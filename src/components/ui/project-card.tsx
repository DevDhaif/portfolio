
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProjectCardProps } from "@/types";

export function ProjectCard({ id, title, description, image, tags, githubUrl, liveUrl, index }: ProjectCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border hover:border-accent-primary/40 transition-all duration-500 hover:shadow-glow hover:shadow-accent-primary/20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container with Overlay */}
            <div className="relative w-full h-52 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent z-20" />

                {/* Hover overlay */}
                <div className={cn(
                    "absolute inset-0 bg-accent-primary/10 z-30 transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0"
                )} />

                {image && (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority={index < 6}
                        className={cn(
                            "object-cover w-full h-full transition-all duration-700",
                            imageLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-110",
                            "group-hover:scale-105"
                        )}
                        onLoad={() => setImageLoaded(true)}
                    />
                )}

                {/* Floating action buttons */}
                <div className={cn(
                    "absolute top-4 right-4 z-40 flex gap-2 transition-all duration-300",
                )}>
                    {githubUrl && (
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-md border-border/50 hover:bg-accent-primary hover:border-accent-primary text-white"
                        >
                            <Link href={githubUrl} target="_blank" rel="noreferrer">
                                <Github className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                    {liveUrl && (
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-md border-border/50 hover:bg-accent-primary hover:border-accent-primary text-white"
                        >
                            <Link href={liveUrl} target="_blank" rel="noreferrer">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-6 h-[calc(100%-13rem)]">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
                        {title}
                    </h3>

                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-subtle border border-accent-primary/30 text-accent-primary hover:bg-accent-primary/20 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action Button */}
                <Button
                    asChild
                    className="w-full bg-teal-700 text-white font-medium rounded-xl h-11 transition-all duration-300"
                >
                    <Link href={`/projects/${id}`} className="flex items-center justify-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                    </Link>
                </Button>
            </div>
        </div>
    );
}
