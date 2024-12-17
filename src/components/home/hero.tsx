"use client"

import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useGlobal } from "@/context/global-context"
import {
    Code2,
    Hammer,
    ArrowRight,
    MessageCircle,
    ChevronDown,
    Github,
    Linkedin,
    Code,
    ExternalLink
} from "lucide-react"
import { HeroJsonLd } from "@/components/JsonLd/HeroJsonLd"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function Hero() {
    const { author, social } = useGlobal()
    const containerRef = useRef<HTMLElement>(null)
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3  // Instead of threshold
    })

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [controls, isInView])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const techStack = [
        {
            name: "React",
            icon: "⚛️",
            gradient: "from-cyan-400 via-blue-400 to-blue-600",
            shadowColor: "shadow-cyan-500/20",
            description: "Frontend Library"
        },
        {
            name: "Next.js",
            icon: "▲",
            gradient: "from-white via-gray-200 to-gray-400",
            shadowColor: "shadow-white/20",
            description: "React Framework"
        },
        {
            name: "TypeScript",
            icon: "TS",
            gradient: "from-blue-400 via-blue-500 to-blue-700",
            shadowColor: "shadow-blue-500/20",
            description: "Type-Safe JavaScript"
        },
        {
            name: "Laravel",
            icon: "🔥",
            gradient: "from-red-400 via-red-500 to-red-600",
            shadowColor: "shadow-red-500/20",
            description: "PHP Framework"
        },
        {
            name: "Tailwind",
            icon: "🎨",
            gradient: "from-cyan-300 via-cyan-400 to-cyan-500",
            shadowColor: "shadow-cyan-500/20",
            description: "CSS Framework"
        }
    ]

    const floatingAnimation = {
        initial: { y: 0 },
        animate: {
            y: 0,
            transition: {
                y: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    values: [-5, 5, -5]
                }
            }
        }
    } as const

    return (
        <>
            <HeroJsonLd author={author} />
            <section
                ref={containerRef}
                className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            opacity
                        }}
                    />

                    {/* Floating particles */}
                    <motion.div className="absolute inset-0 overflow-hidden">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                                animate={{
                                    x: ["0%", "100%"],
                                    y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                                    opacity: [0.2, 0.5, 0.2],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 20,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                                style={{
                                    left: Math.random() * 100 + "%",
                                    top: Math.random() * 100 + "%"
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="relative container px-4 md:px-6 pt-24 pb-32"
                // style={{ y, opacity }}
                >
                    <div className="flex flex-col items-center gap-16 text-center">
                        {/* Main heading group */}
                        <motion.div
                            initial={{ opacity: 0.3, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Status badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-medium text-blue-100">Available for Projects</span>
                            </motion.div>

                            {/* Name and title */}
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                                <motion.span
                                    className="block text-2xl md:text-3xl text-blue-200/80 mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Hi, I&apos;m
                                </motion.span>
                                <motion.span
                                    className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent pb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {author.name}
                                </motion.span>
                                <motion.span
                                    className="block text-3xl md:text-4xl bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Full Stack Developer
                                </motion.span>
                            </h1>

                            <motion.p
                                className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100/70 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Crafting exceptional digital experiences through clean code
                                and innovative solutions.
                            </motion.p>
                        </motion.div>

                        {/* Actions group */}
                        <motion.div
                            className="flex flex-col items-center gap-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {/* Primary actions */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="relative group bg-blue-800 hover:bg-blue-600 text-white gap-2 px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10">View Projects</span>
                                    <ArrowRight className="w-5 h-5 relative z-10" />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500"
                                        initial={{ x: "100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="relative group border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-100 gap-2 px-8 py-6 text-lg rounded-full backdrop-blur-sm"
                                >
                                    <span className="relative z-10">Contact Me</span>
                                    <MessageCircle className="w-5 h-5 relative z-10" />
                                </Button>
                            </div>

                            {/* Social links */}
                            <div className="flex gap-4">
                                {[
                                    { href: social.GITHUB, icon: Github, label: "GitHub" },
                                    { href: social.LINKEDIN, icon: Linkedin, label: "LinkedIn" }
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
                            </div>
                        </motion.div>

                        {/* Tech stack */}
                        <motion.div
                            className="flex flex-col items-center gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {/* Tech stack header */}
                            <div className="flex items-center gap-2 text-blue-100/90">
                                <Code className="w-5 h-5" />
                                <h3 className="text-lg font-semibold">Tech Stack</h3>
                                <Code className="w-5 h-5" />
                            </div>

                            {/* Tech stack grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl">
                                {techStack.map((tech, i) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                duration: 0.3,
                                                delay: 0.1 * i
                                            }
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        className="relative group cursor-pointer"
                                    >
                                        {/* Gradient background */}
                                        <div className={`
            absolute inset-0 rounded-xl bg-gradient-to-br ${tech.gradient}
            opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur
        `} />

                                        {/* Card content with floating animation */}
                                        <motion.div
                                            animate={{
                                                y: [-2, 2, -2],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                ease: "easeInOut",
                                            }}
                                            className={`
                flex flex-col items-center gap-2 p-4 rounded-xl
                bg-blue-900/10 backdrop-blur-sm
                border border-blue-500/20
                group-hover:border-blue-500/40
                transition-all duration-300
                ${tech.shadowColor} hover:shadow-lg
            `}
                                        >
                                            <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                                                {tech.icon}
                                            </span>
                                            <div className="space-y-1">
                                                <span className="text-sm font-medium text-blue-100/90 group-hover:text-blue-100">
                                                    {tech.name}
                                                </span>
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    whileHover={{ opacity: 1, height: "auto" }}
                                                    className="text-xs text-blue-200/60 overflow-hidden"
                                                >
                                                    {tech.description}
                                                </motion.p>
                                            </div>
                                        </motion.div>

                                        {/* Hover glow effect */}
                                        <motion.div
                                            className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"
                                            style={{ zIndex: -1 }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </section>
        </>
    )
}