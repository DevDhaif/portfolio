// components/home/certificates.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, useRef } from "react"
import { Certificate } from "@/types"
import { Award } from "lucide-react"
import { Loading } from "@/components/loading"
import { CertificateCard } from "./certificate-card"
import { SectionHeading } from "./ui/section-heading"

export function Certificates() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })

    const opacity = useTransform(scrollYProgress,
        [0, 0.9, 0.9, 1], [0.8, 1, 1, 1])
    const y = useTransform(scrollYProgress,
        [0, 0.8], ["0%", "0%"])

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
        return <Loading text="Loading certificates..." />
    }

    return (
        <section
            ref={containerRef}
            id="certificates"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            <motion.div
                className="container relative"
                style={{ opacity, y }}
            >
                <SectionHeading
                    title="Certificates"
                    subtitle="Showcasing my skills and achievements through recognized certifications."
                    badge={"Awards & Certifications"}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <div key={cert.id}>
                            <CertificateCard {...cert} index={index} />
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}