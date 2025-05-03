"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com/devdhaif",
            icon: <Github className="h-5 w-5" />,
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/devdhaif",
            icon: <Linkedin className="h-5 w-5" />,
        },
        {
            name: "Email",
            href: "mailto:devdhaif@gmail.com",
            icon: <Mail className="h-5 w-5" />,
        },
    ];

    const footerLinks = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/#projects" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <footer className="border-t border-border text-white backdrop-blur-sm">
            <div className="container max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block ">
                            <span className="text-2xl font-display font-bold bg-gradient-to-l from-blue-200 via-indigo-200 to-cyan-200  bg-clip-text text-transparent">
                                DevDhaif
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm max-w-xs">
                            Full Stack Developer specializing in building exceptional digital
                            experiences with React, Next.js, and Laravel.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-base/80">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-500 hover:text-base transition-colors duration-200 text-sm inline-flex items-center"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-base/80">
                            Connect
                        </h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-base transition-colors duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © {currentYear} Dhaifallah Alfarawi. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0">
                        <a
                            href="https://github.com/devdhaif/portfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-500 hover:text-base inline-flex items-center space-x-1 transition-colors duration-200"
                        >
                            <span>View Source</span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}