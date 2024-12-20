// components/ui/particle-background.tsx
"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

const createParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 22,
        duration: 2020,
        position: {
            left: `${100}%`,
            top: `${100}%`
        },
        delay: 5
    }))
}

export function ParticleBackground() {
    const particles = useMemo(() => createParticles(30), [])

    return (
        <div className="absolute inset-0">
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: particle.position.left,
                        top: particle.position.top
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 1, 0],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: particle.delay
                    }}
                />
            ))}

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            />
        </div>
    )
}