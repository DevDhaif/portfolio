"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogCardProps } from "@/types";
export function BlogCard({
    id,
    title,
    description,
    date,
    coverImage,
    slug,
    tags,
}: BlogCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <Link
            href={`/blog/${slug}`}
            className="group block h-full"
        >
            <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card hover:border-accent-primary/30 hover:shadow-glow transition-all duration-300">
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10 opacity-60" />
                    <div className="absolute inset-0 bg-card/20 z-5" />
                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            priority={true}
                            className={cn(
                                "object-cover w-full h-full transform",
                                "transition-all duration-500 ease-out",
                                imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
                                "group-hover:scale-105"
                            )}
                            onLoad={() => setImageLoaded(true)}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-card" />
                    )}

                    {/* Tags overlay */}
                    {tags && tags.length > 0 && (
                        <div className="absolute top-3 right-3 z-20 flex flex-wrap gap-1.5 justify-end max-w-[70%]">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center rounded-full bg-accent-primary backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white border border-accent-primary/20"
                                >
                                    <Tag className="mr-1 h-3 w-3" />
                                    {tag}
                                </span>
                            ))}

                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col p-5 h-[calc(100%-13rem)]">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 mb-2 text-xs text-text-secondary">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={date}>{formatDate(date)}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2 mb-2">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary line-clamp-3 flex-grow">
                        {description}
                    </p>

                    {/* Read more indicator */}
                    <div className="mt-4 text-sm font-medium text-accent-primary flex items-center  transform translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                        Read article
                        <span className="ml-1 text-xs">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}