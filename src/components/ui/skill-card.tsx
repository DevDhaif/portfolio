"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SkillCardProps {
    name: string;
    icon: string;
    category?: string;
}

export function SkillCard({ name, icon, category }: SkillCardProps) {
    // Define category colors
    const categoryColors = {
        frontend: "bg-accent-primary/10 border-accent-primary/20 text-accent-primary group-hover:border-accent-primary/50",
        backend: "bg-accent-secondary/10 border-accent-secondary/20 text-accent-secondary group-hover:border-accent-secondary/50",
        tools: "bg-accent-tertiary/10 border-accent-tertiary/20 text-accent-tertiary group-hover:border-accent-tertiary/50",
    };

    const categoryColor = category ? categoryColors[category as keyof typeof categoryColors] : "";

    return ( 
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="group flex items-center w-full h-full rounded-xl bg-card border border-border hover:shadow-glow transition-all duration-300"
        >
            <div className="flex items-center w-full p-4 flex-wrap">
                {/* Icon with category color */}
                <div className={cn(
                    "flex-shrink-0 p-3 rounded-lg mr-3 transition-colors",
                    categoryColor || "bg-background border border-border"
                )}>
                    <Image
                        src={icon}
                        alt={name}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                    />
                </div>

                {/* Name */}
                <h3 className="font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                    {name}
                </h3>
            </div>
        </motion.div>
    );
}