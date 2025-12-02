"use client";

import { motion } from "framer-motion";
import { Terminal } from "../ui/terminal";
import { SplitText } from '../bits/SplitText'
const terminalCommands = [
    "Skills: React, Next.js, TypeScript, Tailwind CSS",
    "Expertise: UI/UX, Responsive Design, State Management",
    "Projects: 10+ web applications, 15+ landing pages",
    "Contact: devdhaif@gmail.com",
];

export function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-black px-4 py-20 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-600/10 blur-[120px]" />
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl z-10 relative">
                <div className="flex flex-col items-center text-center space-y-10">
                    {/* Available badge */}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-block rounded-full px-4 py-1.5 border border-green-500/20 bg-green-500/5">
                        <span className="text-sm font-medium text-green-300 flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                            Available for Freelance Work
                        </span>
                    </motion.div>

                    {/* Main content */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 text-center">
                        {/* Left column - Text */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col items-center md:items-start text-center md:text-left">
                            <SplitText
                                text="Hi, I&apos;m Dhaifallah"
                                className="text-5xl font-semibold text-center text-white"
                                delay={100}
                                duration={0.6}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-100px"
                                textAlign="center"
                                onLetterAnimationComplete={() => console.log("Animation complete")}
                            />
                            <span className="text-center leading-relaxed tracking-wide text-5xl font-bold  bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">Front End </span>
                            <span className="text-center leading-relaxed tracking-wide text-5xl font-bold  bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">Developer</span>

                            {/* Skills headline */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-2xl md:text-3xl font-bold mt-6">
                                {/* I can */}
                                <span className="text-gray-300">I </span>
                                <span className="text-blue-500">Build.</span>
                                <span className="text-purple-400">Design.</span>
                                <span className="text-green-400">Develop.</span>
                            </div>
                        </motion.div>

                        {/* Right column - Terminal */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex justify-center md:justify-end">
                            <div className="w-full md:w-[500px] relative">
                                <motion.div
                                    whileHover={{ y: 5, scale: 1.05, rotate: 1, x: 5, zIndex: 20, transition: { type: "spring", stiffness: 200, damping: 20 } }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="w-full relative z-10"
                                >
                                    <Terminal commands={terminalCommands} typingSpeed={50} delayBetweenCommands={1000} title="frontend_dev.sh" className="shadow-lg text-left border border-gray-800 shadow-cyan-500/20" height="h-64" />
                                </motion.div>

                                {/* Glow effect */}
                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full -z-10 blur-3xl opacity-50" />
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full -z-10 blur-3xl opacity-50" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}