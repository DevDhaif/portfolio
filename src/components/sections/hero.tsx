"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="section min-h-screen flex items-center">
            <div className="container">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Dhaifallah Alfarawi
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-8"
                    >
                        Front End Developer
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button asChild className="btn btn-primary">
                            <Link href="#projects">View Work</Link>
                        </Button>
                        <Button asChild variant="outline" className="btn btn-outline">
                            <Link href="#contact">Get in Touch</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}