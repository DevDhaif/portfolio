// components/home/certificate-card.tsx
"use client"
import { motion } from "framer-motion"
import type { Certificate } from "@/lib/types"
import Link from 'next/link'
import { ExternalLink, Calendar, Medal } from "lucide-react"
import { BaseCard } from "./BaseCard"
import { ImageContainer } from "./ImageContainer"

interface CertificateCardProps extends Certificate {
    index: number
}

export function CertificateCard({
    title,
    description,
    certificateImageUrl,
    source,
    issue_date,
    skills,
    urlLink,
    index
}: CertificateCardProps) {

    return (
        <BaseCard index={index}>
            <ImageContainer
                src={certificateImageUrl || "/api/placeholder/800/600"}
                alt={title}
                priority={index < 2}
            />
            <div className="z-50 flex flex-col flex-grow p-6 space-y-4">
                <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                        {title}
                    </h3>
                    <p className="text-gray-300/80 line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Info */}
                <div className="flex-grow">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Medal className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-300">{source}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-300">
                                {new Date(issue_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Skills */}
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

                {/* Action buttons */}
                {urlLink && (
                    <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/5">
                        <Link
                            href={urlLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-w-fit flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                                    bg-white/5 text-gray-300 text-sm hover:bg-white/10 
                                    transition-colors border border-white/10"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Certificate
                        </Link>
                    </div>
                )}
            </div>
        </BaseCard>
    )
}