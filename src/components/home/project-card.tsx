import { motion } from "framer-motion"
import type { Project } from "@/lib/types"
import Link from 'next/link'
import { ExternalLink, Github, Eye } from "lucide-react"
import { BaseCard } from "../BaseCard"
import { ImageContainer } from "../ImageContainer"
interface ProjectCardProps extends Project {
    index: number
}
export function ProjectCard({ id, name, description, skills, githubUrl, liveUrl, mainImage, index }: ProjectCardProps) {
    return (
        <BaseCard index={index}>
            <ImageContainer
                src={mainImage || "/api/placeholder/800/600"}
                alt={name}
                priority={index < 2}
            />
            <div className="z-50 flex flex-col flex-grow p-6 space-y-4">
                <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                        {name}
                    </h3>
                    <p className="text-gray-300/80 line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Skills */}
                <div className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: idx * 0.05 }}
                                className="px-2.5 py-1 text-xs font-medium rounded-md 
                            bg-white/5 text-gray-300 border border-white/10
                            hover:bg-white/10 transition-colors"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
                {/* Action buttons */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                    <Link
                        href={`/projects/${id}`}
                        className="max-w-fit col-span-1 flex items-center gap-2 text-sm p-2 rounded-lg 
                            bg-white/10 text-white hover:bg-white/20 
                            transition-all duration-200"
                    >
                        <Eye className="w-4 h-4" />
                        Details
                    </Link>
                    {githubUrl && (
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-w-fit col-span-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                                bg-white/5 text-gray-300 text-sm hover:bg-white/10 
                                transition-colors border border-white/10"
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
                            className="max-w-fit col-span-1 text-sm flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                                bg-white/5 text-gray-300 hover:bg-white/10 
                                transition-colors border border-white/10"
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