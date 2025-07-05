
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, LayoutGrid, Search, FileCode, ChevronRight, Github, ArrowRight, Linkedin, Sparkles, Target, Users, Timer, Book } from "lucide-react";
import Link from "next/link";
import { CVButton } from "../home/cv-button";
import { PostsResponse } from "@/types";

export function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [postsCount, setPostsCount] = useState("0")
    const [isLoadingPosts, setIsLoadingPosts] = useState(true)

    const services = [
        {
            icon: <LayoutGrid className="h-6 w-6" />,
            title: "UI/UX Design",
            description: "Creating intuitive, beautiful interfaces focused on user experience",
            color: "from-blue-500/20 to-cyan-500/20",
            iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-400"
        },
        {
            icon: <Code className="h-6 w-6" />,
            title: "Front-End Development",
            description: "Building responsive web applications with React & Next.js",
            color: "from-emerald-500/20 to-green-500/20",
            iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
        },
        {
            icon: <Search className="h-6 w-6" />,
            title: "SEO Optimization",
            description: "Improving website visibility for better search rankings",
            color: "from-purple-500/20 to-violet-500/20",
            iconBg: "bg-purple-500/10 border-purple-500/20 text-purple-400"
        },
        {
            icon: <FileCode className="h-6 w-6" />,
            title: "System Design",
            description: "UML, requirements engineering, and software architecture",
            color: "from-orange-500/20 to-red-500/20",
            iconBg: "bg-orange-500/10 border-orange-500/20 text-orange-400"
        }
    ];
    useEffect(() => {


        async function fetchPostsCount() {
            try {
                const response = await fetch('/api/posts/count')
                if (!response.ok) throw new Error('Failed to fetch posts count')

                const data: PostsResponse = await response.json()
                setPostsCount(`${data.count}`)
            } catch (error) {
                console.error('Error fetching posts count:', error)
                setPostsCount("0")
            } finally {
                setIsLoadingPosts(false)
            }
        }

        fetchPostsCount()
    }, [])
    const stats = [
        { icon: <Timer className="h-5 w-5" />, label: "Years Experience", value: "5+" },
        { icon: <Target className="h-5 w-5" />, label: "Projects Completed", value: "12+" },
        { icon: <Users className="h-5 w-5" />, label: "Happy Clients", value: "30+" },
        { icon: <Book className="h-5 w-5" />, label: "Blog Posts", value: postsCount, isLoading: isLoadingPosts },
    ];

    return (
        <section
            id="about"
            ref={containerRef}
            className="py-20 md:py-32 relative overflow-hidden"
        >
            {/* Enhanced background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-accent-primary/10 to-accent-secondary/5 blur-3xl opacity-50" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-accent-tertiary/10 to-accent-primary/5 blur-3xl opacity-30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 blur-3xl opacity-20" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-subtle border border-accent-primary/20 text-accent-primary text-sm font-medium mb-6"
                    >
                        <Sparkles className="h-4 w-4" />
                        About Me
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-text-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
                            Crafting Digital
                        </span>
                        <br />
                        <span className="text-text-primary">Experiences</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-3xl mx-auto text-xl text-text-secondary leading-relaxed mb-8"
                    >
                        Specializing in modern web development with React, Next.js, and Tailwind CSS.
                        Building exceptional digital experiences with clean, maintainable code and user-centered design.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Link href="#projects">
                            <Button
                                size="lg"
                                className="group px-8 py-6 text-lg rounded-2xl bg-accent-subtle border border-accent-primary text-white font-medium transition-all duration-300 shadow-lg  hover:bg-accent-primary  "
                            >
                                <span>View My Work</span>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <CVButton className="px-8 py-6 text-lg rounded-2xl border-2 border-accent-primary text-accent-primary font-medium hover:bg-accent-primary hover:text-white transition-all duration-300" />
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center justify-center gap-6"
                    >
                        <Link
                            href="https://github.com/devdhaif"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-3 rounded-full bg-card border border-border hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300"
                        >
                            <Github className="h-6 w-6 text-text-secondary group-hover:text-accent-primary transition-colors" />
                        </Link>
                        <Link
                            href="https://linkedin.com/in/devdhaif"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-3 rounded-full bg-card border border-border hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300"
                        >
                            <Linkedin className="h-6 w-6 text-text-secondary group-hover:text-accent-primary transition-colors" />
                        </Link>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-6 rounded-2xl bg-card/50 border border-border hover:border-accent-primary/30 hover:bg-card transition-all duration-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-subtle border border-accent-primary/20 text-accent-primary mb-4">
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold text-text-primary mb-1">
                                {stat.isLoading ? (
                                    <div className="animate-pulse w-8 h-8 bg-gray-200/20 mx-auto rounded-full" />
                                ) : (
                                    stat.value
                                )}
                            </div>
                            <div className="text-sm text-text-secondary">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Services Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-text-primary to-text-primary/80 bg-clip-text text-transparent">
                            What I Do Best
                        </h3>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            Transforming ideas into beautiful, functional, and user-friendly digital solutions
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative p-8 rounded-3xl bg-gradient-to-br from-card to-card/80 border border-border hover:border-accent-primary/30 hover:shadow-glow hover:shadow-accent-primary/10 transition-all duration-500"
                            >
                                {/* Background gradient */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Content */}
                                <div className="relative">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border ${service.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>

                                    <h4 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-accent-primary transition-colors duration-300">
                                        {service.title}
                                    </h4>

                                    <p className="text-text-secondary leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-20 pt-16 border-t border-border/50"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                        Ready to bring your ideas to life?
                    </h3>
                    <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                        Let&apos;s collaborate and create something amazing together. I&apos;m always excited to work on new projects and challenges.
                    </p>
                    <Link href="#contact">
                        <Button
                            size="lg"
                            className="group px-8 py-6 text-lg rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/90 hover:to-accent-secondary/90 text-white font-medium transition-all duration-300 shadow-lg shadow-accent-primary/20"
                        >
                            <span>Get In Touch</span>
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
