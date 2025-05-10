// components/home/certificate-card.tsx
"use client"

import { motion } from "framer-motion"
import Link from 'next/link'
import Image from "next/image"
import { ExternalLink, Calendar, Medal } from "lucide-react"
import { CertificateCardProps } from "@/types"



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
    // Format date nicely
    const formattedDate = new Date(issue_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <div className="h-full rounded-xl border border-blue-500/30 bg-slate-950 overflow-hidden shadow-md  transition-all duration-300">
                {/* Image section */}
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={certificateImageUrl || "/api/placeholder/800/600"}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-50" />

                    {/* Certificate source badge */}
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500 backdrop-blur-md border border-blue-400/30">
                            <Medal className="w-3.5 h-3.5 text-blue-50" />
                            <p className="text-xs font-medium text-blue-50">{source}</p>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="p-5 space-y-3">
                    {/* Title and description */}
                    <div>
                        <h3 className="text-lg font-bold mb-1 text-blue-100">
                            {title}
                        </h3>
                        <p className="text-blue-100/70 text-sm line-clamp-2">
                            {description}
                        </p>
                    </div>

                    {/* Issue date */}
                    <div className="flex items-center gap-2 text-sm text-blue-300">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <p>{formattedDate}</p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-2 py-1 text-xs rounded-full 
                                bg-blue-500/10 border border-blue-500/20 
                                text-blue-200"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* View certificate link */}
                    {urlLink && (
                        <div className="pt-3 mt-3 border-t border-blue-500/20">
                            <Link
                                href={urlLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                        bg-blue-500/10 text-blue-200 text-sm 
                                        transition-colors border border-blue-500/30"
                            >
                                View Certificate
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}