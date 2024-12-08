
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useGlobal } from "@/context/global-context";
import { Code2, Hammer } from "lucide-react";

export function Hero() {
    const { author } = useGlobal();
    return (
        <section className="relative h-[calc(100vh-4rem)] flex items-center">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        easings: ["easeInOut"],
                    }}
                />
            </div>

            {/* Main content */}
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-8 justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex gap-4 my-4 items-center  relative pr-6 font-bold bg-green-100 border text-red-800 border-red-500 p-2 rounded-full  bg-muted px-3 py-2">
                            <span className="text-xl ">Work In Progress</span>
                            <Hammer size={30} />
                            <Code2 size={30} />
                        </div>
                        <div className="relative pr-6 max-w-fit flex mx-auto items-center font-bold bg-green-100 border text-green-800 border-green-500 p-2 rounded-full  bg-muted px-3 py-1 text-sm">
                            <span className="absolute right-2 animate-pulse w-2 h-2 bg-green-700  rounded-full"></span>
                            Available for work
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                            Hey, I&apos;m <span className="text-primary">{author.name}</span> 👋
                        </h1>
                        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                            I craft modern web experiences with{" "}
                            <span className="text-primary">React</span>,{" "}
                            <span className="text-primary">Next.js</span>, and{" "}
                            <span className="text-primary">Node.js</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Button size="lg" className="gap-2">
                            View Projects
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Button>
                        <Button variant="outline" size="lg" className="gap-2 hidden lg:block">
                            Let&apos;s Talk
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m5 11 4-7" />
                                <path d="m19 11-4-7" />
                                <path d="M2 11h20" />
                                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                <path d="m9 11 1 9" />
                                <path d="m15 11-1 9" />
                            </svg>
                        </Button>
                    </motion.div>

                    {/* Tech stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <p className="text-sm text-muted-foreground">Tech Stack</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["React", "Next.js", "TypeScript", "Laravel", "Tailwind"].map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.4 + i * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    className="rounded-full border px-3 py-1 text-sm"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-sm text-muted-foreground">Scroll to explore</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}