"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useGlobal } from "@/context/global-context"

export function Contact() {
    const { social } = useGlobal()

    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 -z-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.08),rgba(0,0,0,0))]" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="container relative z-10"
            >
                {/* Heading Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent pb-4">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-blue-100/70 text-lg">
                        Have a project in mind? Let&apos;s discuss how we can help your business grow.
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl transform" />

                        <div className="relative bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-8">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-100/90">Name</label>
                                        <input
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-blue-100 placeholder:text-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-100/90">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-blue-100 placeholder:text-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-100/90">Message</label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-blue-100 placeholder:text-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[150px]"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>
                                <Button
                                    size="lg"
                                    className="w-full relative group bg-blue-800 hover:bg-blue-600 text-white gap-2 px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10">Send Message</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500"
                                        initial={{ x: "100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </Button>
                            </form>
                        </div>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex justify-center gap-4"
                >
                    {[
                        { href: social.GITHUB, icon: Github, label: "GitHub" },
                        { href: social.LINKEDIN, icon: Linkedin, label: "LinkedIn" },
                        { href: `mailto:${social.EMAIL}`, icon: Mail, label: "Email" }
                    ].map(({ href, icon: Icon, label }) => (
                        <Link
                            key={label}
                            href={href}
                            target="_blank"
                            className="group relative p-3 rounded-full bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/20 text-blue-300 transition-all duration-300"
                        >
                            <Icon size={20} />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-500/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {label}
                            </span>
                        </Link>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}