'use client'

import { useEffect, useRef, useCallback } from 'react'

// Define strict types
interface Particle {
    readonly id: number
    x: number
    y: number
    readonly radius: number
    speedX: number
    speedY: number
    readonly opacity: number
}

interface CanvasSize {
    width: number
    height: number
}

interface CanvasConfig {
    readonly particleCount: number
    readonly connectionDistance: number
    readonly particleMinRadius: number
    readonly particleMaxRadius: number
    readonly particleMinSpeed: number
    readonly particleMaxSpeed: number
    readonly particleMinOpacity: number
    readonly particleMaxOpacity: number
}

const DEFAULT_CONFIG: CanvasConfig = {
    particleCount: 80,
    connectionDistance: 80,
    particleMinRadius: 1,
    particleMaxRadius: 3,
    particleMinSpeed: -0.5,
    particleMaxSpeed: 0.5,
    particleMinOpacity: 0.5,
    particleMaxOpacity: 0.9,
} as const

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameRef = useRef<number>()
    const particlesRef = useRef<Particle[]>([])

    // Helper functions
    const random = (min: number, max: number): number =>
        Math.random() * (max - min) + min

    const createParticle = (id: number, canvasSize: CanvasSize): Particle => ({
        id,
        x: random(0, canvasSize.width),
        y: random(0, canvasSize.height),
        radius: random(DEFAULT_CONFIG.particleMinRadius, DEFAULT_CONFIG.particleMaxRadius),
        speedX: random(DEFAULT_CONFIG.particleMinSpeed, DEFAULT_CONFIG.particleMaxSpeed),
        speedY: random(DEFAULT_CONFIG.particleMinSpeed, DEFAULT_CONFIG.particleMaxSpeed),
        opacity: random(DEFAULT_CONFIG.particleMinOpacity, DEFAULT_CONFIG.particleMaxOpacity),
    })

    // Initialize particles
    const initParticles = useCallback((canvasSize: CanvasSize) => {
        particlesRef.current = Array.from(
            { length: DEFAULT_CONFIG.particleCount },
            (_, i) => createParticle(i, canvasSize)
        )
    }, [])

    // Update particle position
    const updateParticle = (particle: Particle, canvasSize: CanvasSize): void => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvasSize.width) {
            particle.speedX *= -1
        }
        if (particle.y <= 0 || particle.y >= canvasSize.height) {
            particle.speedY *= -1
        }
    }

    // Draw functions
    const drawBackground = (
        ctx: CanvasRenderingContext2D,
        canvasSize: CanvasSize
    ): void => {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvasSize.height)
        gradient.addColorStop(0, '#000010')
        gradient.addColorStop(1, '#000030')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    }

    const drawParticle = (
        ctx: CanvasRenderingContext2D,
        particle: Particle
    ): void => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 1)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()
    }

    const drawConnection = (
        ctx: CanvasRenderingContext2D,
        p1: Particle,
        p2: Particle
    ): void => {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < DEFAULT_CONFIG.connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const opacity = 0.1 * (1 - distance / DEFAULT_CONFIG.connectionDistance)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.stroke()
        }
    }

    // Main animation function
    const animate = useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        const canvasSize: CanvasSize = {
            width: canvas.width,
            height: canvas.height
        }

        drawBackground(ctx, canvasSize)

        particlesRef.current.forEach(particle => {
            updateParticle(particle, canvasSize)
            drawParticle(ctx, particle)

            // Draw connections
            particlesRef.current.forEach(otherParticle => {
                if (particle.id < otherParticle.id) {
                    drawConnection(ctx, particle, otherParticle)
                }
            })
        })

        animationFrameRef.current = requestAnimationFrame(animate)
    }, [])

    // Setup effect
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initParticles({ width: canvas.width, height: canvas.height })
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        animationFrameRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [animate, initParticles])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{ backgroundColor: '#000010' }}
            aria-hidden="true"
        />
    )
}

export default AnimatedBackground