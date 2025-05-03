"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, LayoutGrid, Search, FileCode, ChevronRight, Github, ArrowRight, Linkedin } from "lucide-react";
import Link from "next/link";
import { CVButton } from "../home/cv-button";

export function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);

    // Services
    const services = [
        {
            icon: <LayoutGrid className="h-5 w-5" />,
            title: "UI/UX Design",
            description: "Creating intuitive, beautiful interfaces focused on user experience"
        },
        {
            icon: <Code className="h-5 w-5" />,
            title: "Front-End Development",
            description: "Building responsive web applications with React & Next.js"
        },
        {
            icon: <Search className="h-5 w-5" />,
            title: "SEO Optimization",
            description: "Improving website visibility for better search rankings"
        },
        {
            icon: <FileCode className="h-5 w-5" />,
            title: "System Design",
            description: "UML, requirements engineering, and software architecture"
        }
    ];


    return (
        <section
            id="about"
            ref={containerRef}
            className="py-20 md:py-32 relative overflow-hidden bg-black"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Gradient elements */}
                <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/5 blur-3xl opacity-50" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-500/10 to-pink-500/5 blur-3xl opacity-30" />

                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[size:30px_30px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Left column - Terminal */}
                    <div>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
                            Specializing in modern web development with React, Next.js, Tailwindcss. Building exceptional digital experiences with clean,
                            maintainable code.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            {/* Primary button */}
                            <Link
                                href="#projects"
                                className="w-full sm:w-auto px-8 py-3 rounded-full bg-blue-600 text-white font-medium 
                                     hover:bg-blue-500 transition-all duration-300 flex items-center justify-center gap-2
                                     shadow-lg shadow-blue-600/20"
                            >
                                View Projects
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            {/* Outline button */}
                            <CVButton className="w-full text-lg  sm:w-auto px-8 py-6 rounded-full border border-cyan-600 text-cyan-600 font-medium
                                     hover:bg-cyan-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2
                                     shadow-lg shadow-cyan-600/20"/>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-6 pt-2">
                            <Link
                                href="https://github.com/devdhaif"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors p-2"
                                aria-label="GitHub"
                            >
                                <Github className="h-6 w-6" />
                            </Link>
                            <Link
                                href="https://linkedin.com/in/devdhaif"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors p-2"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>


                    {/* Right column - About text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Crafting exceptional front-end experiences
                        </h2>

                        <p className="text-lg text-gray-300/90 leading-relaxed">
                            I specialize in building beautiful, responsive interfaces and
                            optimized front-end solutions that deliver exceptional user experiences
                            with clean, maintainable code.
                        </p>

                        <div className="pt-4">
                            <Link href="#contact">
                                <Button
                                    size="lg"
                                    className="group text-base px-6 py-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-md shadow-blue-900/20"
                                >
                                    <span>Get In Touch</span>
                                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                >
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                    >
                        My Services
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-200 group shadow-md hover:shadow-blue-900/10"
                            >
                                {/* Icon container */}
                                <div className="p-3 rounded-lg bg-gray-800/80 text-blue-400 w-fit mb-5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200">
                                    {service.title}
                                </h4>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}