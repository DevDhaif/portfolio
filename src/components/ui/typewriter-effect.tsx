"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = words[currentIndex]?.text || "";

        const timeout = setTimeout(() => {
            // Deleting phase
            if (isDeleting) {
                setCurrentText(current.substring(0, currentText.length - 1));

                // If all characters are deleted, move to the next word
                if (currentText.length === 0) {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % words.length);
                }
            }
            // Typing phase
            else {
                setCurrentText(current.substring(0, currentText.length + 1));

                // If all characters are typed, prepare to delete
                if (currentText.length === current.length) {
                    // Pause at the end of typing
                    setTimeout(() => {
                        setIsDeleting(true);
                    }, 1500);
                }
            }
        }, isDeleting ? 50 : 150); // Slower typing, faster deleting

        return () => clearTimeout(timeout);
    }, [currentIndex, currentText, isDeleting, words]);

    return (
        <div className={cn("inline-flex", className)}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn("", words[currentIndex]?.className)}
                >
                    {currentText}
                </motion.span>
            </AnimatePresence>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn("inline-block ml-1 h-full w-[2px] bg-primary", cursorClassName)}
            />
        </div>
    );
};