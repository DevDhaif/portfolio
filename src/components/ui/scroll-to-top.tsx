"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className={cn(
                        "fixed bottom-8 right-8 z-40 p-3 rounded-full",
                        "bg-primary/80 backdrop-blur-sm text-primarygray-500 hover:bg-primary",
                        "shadow-lg hover:shadow-glow transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    )}
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}