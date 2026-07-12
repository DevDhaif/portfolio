"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Certificate } from "@/types";
import { CertificateCard } from "./certificate-card";
import { SectionHeading } from "./ui/section-heading";

export function Certificates() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCertificates() {
            const supabase = createClient();
            const { data: certificates } = await supabase
                .from("certificates")
                .select("*")
                .order("created_at", { ascending: false });

            if (certificates) {
                const certificatesWithUrls = certificates.map((cert) => ({
                    ...cert,
                    sourceIconUrl: cert.source_icon || "",
                    certificateImageUrl: cert.image || "",
                    urlLink: cert.url_link || "",
                }));
                setCertificates(certificatesWithUrls);
            }
            setLoading(false);
        }

        loadCertificates();
    }, []);

    if (loading) {
        return (
            <section id="certificates" className="relative py-24 md:py-32">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
                <div className="container-dev relative">
                    <div className="h-4 w-44 animate-pulse rounded bg-rule" />
                    <div className="mt-6 h-12 w-2/3 max-w-lg animate-pulse rounded-lg bg-rule" />
                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-3 rounded-lg border border-rule bg-paper-raised p-5">
                                <div className="h-3 w-24 animate-pulse rounded bg-rule" />
                                <div className="h-6 w-3/4 animate-pulse rounded bg-rule" />
                                <div className="flex gap-2 pt-2">
                                    <div className="h-6 w-16 animate-pulse rounded-md bg-rule" />
                                    <div className="h-6 w-16 animate-pulse rounded-md bg-rule" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
    if (!certificates.length) return null;

    return (
        <section id="certificates" className="relative py-24 md:py-32">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
            <div className="container-dev relative">
                <SectionHeading
                    index="06"
                    eyebrow="awards_certifications"
                    title={
                        <>
                            Recognition <span className="relative inline-block">
                                in passing
                                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                            </span>.
                        </>
                    }
                />

                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((cert, index) => (
                        <CertificateCard key={cert.id} {...cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
