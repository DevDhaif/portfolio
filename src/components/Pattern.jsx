"use client"
import React from 'react'
import { motion } from "framer-motion"


export const Pattern = () => {
    return (
        <>
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                />
            </div>
        </>
    )
}