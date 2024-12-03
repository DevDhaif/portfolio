 
"use client"

import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { projectsData } from "@/lib/projects-data";
import Link from "next/link";
export function Projects() {
    return (
        <section id="projects" className="container py-24 sm:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 text-center"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
                    Projects
                </h2>
                <p className="text-muted-foreground">
                    Here are some of my featured projects. Each one is built with care and attention to detail.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projectsData.map((project, index) => (
                    <ProjectCard key={project.id} {...project} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 text-center"
            >
                <p className="text-muted-foreground mb-4">
                    Interested in more projects?
                </p>
                <Link
                    href="https://github.com/devdhaif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    View More on GitHub
                </Link>
            </motion.div>
        </section>
    );
}