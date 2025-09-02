"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export function ProjectCard({
    id,
    title,
    description,
    image,
    tags,
    githubUrl,
    liveUrl,
}: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="card group"
        >
            <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                />
            </div>

            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-muted rounded-md"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex gap-2">
                {githubUrl && (
                    <Button asChild size="sm" variant="outline">
                        <Link href={githubUrl} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                        </Link>
                    </Button>
                )}
                {liveUrl && (
                    <Button asChild size="sm">
                        <Link href={liveUrl} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                        </Link>
                    </Button>
                )}
            </div>
        </motion.div>
    );
}