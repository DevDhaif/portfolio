// components/image-container.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

interface ImageContainerProps {
    src: string
    alt: string
    priority?: boolean
}

export function ImageContainer({ src, alt, priority = false }: ImageContainerProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className="relative h-52 overflow-hidden flex-shrink-0">
            <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.4 }}
                className="h-full transform-gpu"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full brightness-90 group-hover:brightness-100 transition-all duration-300"
                    priority={priority}
                />
                <div className="z-10 absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
            </motion.div>
        </div>
    )
}