import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/lib/types"
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, ArrowUpRight, Code, Eye } from "lucide-react"

interface ProjectCardProps extends Project {
    index: number
}

export function ProjectCard({
    id,
    name,
    description,
    skills,
    githubUrl,
    liveUrl,
    mainImage,
    video,
    images = [],
    index
}: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
            }}
            className="relative group h-full rounded-xl"
        >
            <motion.div
                whileHover={{ y: -8 }}
                className="relative h-full flex flex-col bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5"
            >
                {/* Animated border gradient */}
                <div className="z-10 absolute inset-px rounded-xl overflow-hidden">
                    <div className="z-10 absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Image container */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.4 }}
                        className="h-full transform-gpu"
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <Image
                            src={mainImage || "/api/placeholder/800/600"}
                            alt={name}
                            width={800}
                            height={600}
                            className="object-cover w-full h-full brightness-90 group-hover:brightness-100 transition-all duration-300"
                            priority={index < 2}
                        />
                        <div className="z-10 absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                    </motion.div>
                </div>

                {/* Content */}
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
                                    animate={{ opacity: 1, y: 0 }}
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
            </motion.div>
        </motion.div>
    )
}