"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    badge?: string;
    alignment?: "left" | "center";
    className?: string;
}

export function SectionHeading({
    title,
    subtitle,
    badge,
    alignment = "center",
    className,
}: SectionHeadingProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className={cn(
                "relative space-y-8",
                alignment === "center" ? "text-center mx-auto" : "text-left",
                alignment === "center" ? "max-w-2xl" : "max-w-none",
                className
            )}
        >
            {badge && (
                <motion.div
                    variants={itemVariants}
                    className={cn(
                        "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium",
                        "bg-card text-text-primary border border-accent-primary",
                        alignment === "center" ? "mx-auto" : ""
                    )}
                >
                    {badge}
                </motion.div>
            )}

            <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
                <span className="relative">
                    <span className="bg-gradient-to-r from-gray-100 via-cyan-200 to-gray-200 bg-clip-text text-transparent">
                        {title}
                    </span>
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-accent-primary to-primary/0" />
                </span>
            </motion.h2>

            {subtitle && (
                <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg  text-gray-300 max-w-prose"
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    );
}