
"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project, StaticProject } from "@/lib/types";
import Link from 'next/link'
import Image from 'next/image';

interface ProjectCardProps extends StaticProject {
    index: number;
}
export function ProjectCard({ id, name, description, skills, githubUrl, liveUrl, mainImage, video, images = [], index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Card className="group relative overflow-hidden border transition-colors hover:border-foreground/50">
                <div className="relative h-52 w-full overflow-hidden">
                    <Image
                        src={mainImage || "/api/placeholder/800/600"}
                        alt={name}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Media indicators */}
                </div>

                <CardHeader>
                    <CardTitle className="line-clamp-1">{name}</CardTitle>
                    <CardDescription className="line-clamp-2">{description}</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((tag) => (
                            <span key={tag} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors hover:bg-primary hover:text-primary-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="gap-2">
                    <Link href={`/projects/${id}`} className="block">
                        <Button>
                            See details
                        </Button>
                    </Link>
                    {githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    height="24"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                                Code
                            </a>
                        </Button>
                    )}


                    {liveUrl && (
                        <Button size="sm" asChild>
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                                {/* Live demo icon */}
                                Live Demo
                            </a>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </motion.div >
    );
}