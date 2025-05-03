"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    children: React.ReactNode;
}

export function Tab({ active, children, className, ...props }: TabProps) {
    return (
        <button
            className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                active
                    ? "text-base"
                    : "text-gray-500 hover:text-base/80",
                className
            )}
            {...props}
        >
            {children}
            {active && (
                <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                />
            )}
        </button>
    );
}