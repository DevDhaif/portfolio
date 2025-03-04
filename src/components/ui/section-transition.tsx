"use client"
import { motion } from "framer-motion"

interface SectionTransitionProps {
    children: React.ReactNode;
    className?: string;
}

export function SectionTransition({ children, className = "" }: SectionTransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}