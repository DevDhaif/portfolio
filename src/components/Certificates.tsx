"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, useRef } from "react"
import { Certificate } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Award, Calendar, ExternalLink, Medal } from "lucide-react"

export function Certificates() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    useEffect(() => {
        async function loadCertificates() {
            const supabase = createClient()

            const { data: certificates } = await supabase
                .from("certificates")
                .select("*")
                .order("created_at", { ascending: false })

            if (certificates) {
                const certificatesWithUrls = certificates.map(cert => ({
                    ...cert,
                    sourceIconUrl: cert.source_icon || "",
                    certificateImageUrl: cert.image || "",
                    urlLink: cert.url_link || "",
                }))
                setCertificates(certificatesWithUrls)
            }
            setLoading(false)
        }

        loadCertificates()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <div className="absolute inset-0 blur-xl animate-pulse bg-blue-500/20 rounded-full" />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-blue-100/70 text-sm"
                >
                    Loading certificates...
                </motion.p>
            </div>
        )
    }

    return (
        <section
            ref={containerRef}
            id="certificates"
            className="py-24 sm:py-32 relative overflow-hidden"
        >


            <motion.div
                className="container relative"
                style={{ y, opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-16 text-center space-y-4"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        // className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="relative space-y-2"
                    >
                        <div className="flex justify-center">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                                <Award className="w-5 h-5" />
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold sm:text-5xl bg-gradient-to-b from-white to-blue-200/80 bg-clip-text text-transparent">
                            Certificates
                        </h2>
                        <p className="text-lg text-blue-100/70 max-w-2xl mx-auto">
                            Showcasing my skills and achievements through recognized certifications.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }
                                }
                            }}
                            className="group relative"
                        >
                            <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur" />

                            <div className="relative flex flex-col bg-blue-950/40 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden group-hover:border-blue-500/40 transition-colors">
                                {/* Certificate Image with Overlay */}
                                <div className="relative h-48 overflow-hidden">
                                    {cert.certificateImageUrl && (
                                        <>
                                            <Image
                                                src={cert.certificateImageUrl}
                                                alt={cert.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow p-6 space-y-4">
                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-blue-100">
                                        {cert.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-blue-200/70 line-clamp-2">
                                        {cert.description || "No description available."}
                                    </p>

                                    {/* Issuer */}
                                    <div className="flex items-center gap-2">
                                        <Medal className="w-4 h-4 text-blue-400" />
                                        <p className="text-sm text-blue-200">
                                            {cert.source}
                                        </p>
                                    </div>

                                    {/* Issue Date */}
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <p className="text-sm text-blue-200">
                                            {new Date(cert.issue_date).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2">
                                        {cert.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 text-xs bg-blue-500/10 text-blue-200 rounded-full border border-blue-500/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View Certificate Button */}
                                    {cert.urlLink && (
                                        <Link
                                            href={cert.urlLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/link mt-2 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
                                        >
                                            View Certificate
                                            <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}