// components/ui/animated-background.tsx
'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Create fixed positions for particles
const createParticlePositions = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        initialX: `${(i * 25) % 100}%`,
        initialY: `${Math.floor(i / 4) * 25}%`,
        targetX: `${((i + 2) * 25) % 100}%`,
        targetY: `${(Math.floor((i + 2) / 4) * 25) % 100}%`,
        delay: i * 0.2,
        duration: 20 + (i % 3) * 5
    }))
}

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const particles = createParticlePositions(20)

    return (
        <div className="absolute inset-0 -z-10">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                        initial={{
                            x: particle.initialX,
                            y: particle.initialY,
                            opacity: 0.2,
                            scale: 1
                        }}
                        animate={{
                            x: [particle.initialX, particle.targetX, particle.initialX],
                            y: [particle.initialY, particle.targetY, particle.initialY],
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}