// components/home/certificates.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, useRef } from "react"
import { Certificate } from "@/lib/types"
import { Award } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { GridItemsWrapper } from "@/components/grid-items-wrapper"
import { GridItem } from "@/components/grid-item"
import { Loading } from "@/components/loading"
import { CertificateCard } from "./certificate-card"

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
                <SectionHeader
                    badge={<Award className="w-5 h-5" />}
                    title="Certificates"
                    description="Showcasing my skills and achievements through recognized certifications."
                />

                <GridItemsWrapper>
                    {certificates.map((cert, index) => (
                        <GridItem key={cert.id} index={index}>
                            <CertificateCard {...cert} index={index} />
                        </GridItem>
                    ))}
                </GridItemsWrapper>
            </motion.div>
        </section>
    )
}