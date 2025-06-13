
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogCardProps } from "@/types";

export function BlogCard({
    title,
    description,
    date,
    coverImage,
    slug,
    tags,
}: BlogCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Estimate read time
    const estimateReadTime = (text: string) => {
        const wordsPerMinute = 200;
        const words = text.split(' ').length;
        return Math.ceil(words / wordsPerMinute);
    };

    return (
        <Link
            href={`/blog/${slug}`}
            className="group block h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <article className="relative h-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 hover:border-accent-primary/40 hover:shadow-glow hover:shadow-accent-primary/20 transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent z-20" />

                    {/* Hover overlay */}
                    <div className={cn(
                        "absolute inset-0 bg-accent-primary/10 z-30 transition-opacity duration-300",
                        isHovered ? "opacity-100" : "opacity-0"
                    )} />

                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            priority={true}
                            className={cn(
                                "object-cover w-full h-full transition-all duration-700",
                                imageLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-110",
                                "group-hover:scale-105"
                            )}
                            onLoad={() => setImageLoaded(true)}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20" />
                    )}

                    {/* Date badge */}
                    <div className="absolute top-4 left-4 z-40">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border/50 text-xs font-medium text-text-primary">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={date}>{formatDate(date)}</time>
                        </div>
                    </div>

                    {/* Read time badge */}
                    <div className="absolute top-4 right-4 z-40">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-primary/90 backdrop-blur-md text-xs font-medium text-white">
                            <Clock className="h-3 w-3" />
                            {estimateReadTime(description)} min read
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-6 h-[calc(100%-12rem)]">
                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 rounded-full bg-accent-subtle px-2.5 py-1 text-xs font-medium text-accent-primary border border-accent-primary/20"
                                >
                                    <Tag className="h-2.5 w-2.5" />
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 2 && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-border/50 text-text-secondary">
                                    +{tags.length - 2}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2 mb-3 leading-tight">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary line-clamp-3 flex-grow leading-relaxed mb-4">
                        {description}
                    </p>

                    {/* Read more */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className={cn(
                            "flex items-center gap-2 text-sm font-medium text-accent-primary transition-all duration-300",
                            isHovered ? "translate-x-1" : "translate-x-0"
                        )}>
                            <span>Read article</span>
                            <ArrowRight className="h-4 w-4" />
                        </div>
                        {/* if date is in the last 7 days */}
                        {new Date(date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                            <div className="flex items-center gap-1 text-xs text-text-secondary">
                                <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                                <span>New</span>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
