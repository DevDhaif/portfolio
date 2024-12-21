// components/home/post-card.tsx
"use client"

import { motion } from "framer-motion"
import { Calendar, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BaseCard } from "../BaseCard"
import { ImageContainer } from "../ImageContainer"
interface Post {
    id: string
    title: string
    description: string
    cover_image: string
    slug: string
    created_at: string
    tags: string[]
}

interface PostCardProps extends Post {
    index: number
}

export function PostCard({ title, description, cover_image, created_at, tags, slug, index }: PostCardProps) {
    return (
        <BaseCard index={index}>
            <Link href={`/blog/${slug}`} className="block h-full">
                <div className="relative h-full flex flex-col">
                    <ImageContainer
                        src={cover_image || "/api/placeholder/800/600"}
                        alt={title}
                        priority={index < 2}
                    />

                    {/* Content */}
                    <div className="z-50 flex flex-col flex-grow p-6 space-y-4">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-gray-300/70">
                            <Calendar className="w-4 h-4" />
                            <time>{new Date(created_at).toLocaleDateString()}</time>
                        </div>

                        {/* Title and description */}
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gray-200 transition-colors">
                                {title}
                            </h3>
                            <p className="text-gray-300/80 line-clamp-2">
                                {description}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex-grow flex flex-wrap gap-2">
                            {tags?.map((tag, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md 
                                        bg-white/5 text-gray-300 border border-white/10
                                        hover:bg-white/10 transition-colors"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </BaseCard>
    )
}