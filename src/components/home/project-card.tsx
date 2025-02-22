// components/project-card.tsx
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { Project } from "@/lib/types"
import Link from 'next/link'
import { ExternalLink, Github, Eye } from "lucide-react"
import { BaseCard } from "../BaseCard"
import { ImageContainer } from "../ImageContainer"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/ui/hover-card";

interface ProjectCardProps extends Project {
    index: number
    className?: string
}

export function ProjectCard({
    id,
    name,
    description,
    skills,
    githubUrl,
    liveUrl,
    mainImage,
    index,
    className
}: ProjectCardProps) {
    return (
        <BaseCard
            index={index}
            className={cn("h-full", className)} // Ensure full height
        >
            <div className="relative w-full aspect-video">
                <ImageContainer
                    src={mainImage || "/api/placeholder/800/600"}
                    alt={name}
                    priority={index < 2}
                    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="flex flex-col h-full flex-1 p-6"> {/* Flex container for content */}
                <div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover/card:text-white/90 transition-colors">
                        {name}
                    </h3>
                    <p className="text-gray-300/80 line-clamp-2 group-hover/card:text-gray-300/90">
                        {description}
                    </p>
                </div>

                <div className="flex-1 mt-4"> {/* Flex-grow to push buttons to bottom */}
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                    "px-2.5 py-1 text-xs font-medium rounded-md",
                                    "bg-white/5 text-gray-300 border border-white/10",
                                    "hover:bg-white/10 hover:border-white/20",
                                    "transition-all duration-300"
                                )}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-white/5">
                    <Link
                        href={`/projects/${id}`}
                        className={cn(
                            "col-span-1 flex items-center gap-2 text-sm p-2 rounded-lg",
                            "bg-white/10 text-white",
                            "hover:bg-white/20 hover:scale-105",
                            "transition-all duration-300 ease-out"
                        )}
                    >
                        <Eye className="w-4 h-4" />
                        Details
                    </Link>
                    {githubUrl && (
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "col-span-1 flex items-center justify-center gap-2 p-2 rounded-lg",
                                "bg-white/5 text-gray-300 text-sm border border-white/10",
                                "hover:bg-white/10 hover:border-white/20 hover:scale-105",
                                "transition-all duration-300 ease-out"
                            )}
                        >
                            <Github className="w-4 h-4" />
                            Code
                        </Link>
                    )}
                    {liveUrl && (
                        <Link
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "col-span-1 flex items-center justify-center gap-2 p-2 rounded-lg",
                                "bg-white/5 text-gray-300 text-sm border border-white/10",
                                "hover:bg-white/10 hover:border-white/20 hover:scale-105",
                                "transition-all duration-300 ease-out"
                            )}
                        >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                        </Link>
                    )}
                </div>
            </div>
        </BaseCard>
    )
}