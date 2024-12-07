"use client";

import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Certificate } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

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
                const certificatesWithUrls = certificates.map(cert => ({
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
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        );
    }

    return (
        <section id="certificates" className="container py-24 sm:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 text-center"
            >
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6 text-gray-800">
                    Certificates
                </h2>
                <p className="text-lg text-gray-600">
                    Showcasing my skills and achievements through recognized certifications.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden flex flex-col"
                    >
                        {/* Certificate Image */}
                        {cert.certificateImageUrl && (
                            <Image
                                src={cert.certificateImageUrl}
                                alt={cert.title}
                                width={400}
                                height={300}
                                className="w-full h-72 object-cover "
                            />
                        )}

                        <div className="flex flex-col justify-between flex-grow p-6">
                            {/* Title */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex-wrap">
                                {cert.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                {cert.description || "No description available."}
                            </p>

                            {/* Issuer */}
                            <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-700">Issuer:</span> {cert.source}
                            </p>

                            {/* Issue Date */}
                            <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-700">Issued On:</span>{" "}
                                {new Date(cert.issue_date).toLocaleDateString()}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {cert.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full"
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
                                    className="mt-6 inline-block bg-blue-500 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                                >
                                    View Certificate
                                </Link>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
