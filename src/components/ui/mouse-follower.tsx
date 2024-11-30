// src/components/ui/mouse-follower.tsx
"use client"

import React from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

export function MouseFollower() {
    // Use motion values for better performance
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isClicking, setIsClicking] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(false)

    // Smoother spring configuration
    const springConfig = {
        damping: 35,
        stiffness: 400,
        mass: 0.1
    }

    // Create springs for smoother movement
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    // Scale spring for smoother transitions
    const scale = useSpring(1, {
        damping: 25,
        stiffness: 300,
        mass: 0.1
    })

    // Update scale based on state
    React.useEffect(() => {
        scale.set(isClicking ? 0.9 : isHovered ? 1.5 : 1)
    }, [isClicking, isHovered, scale])

    React.useEffect(() => {
        let timeout: NodeJS.Timeout

        const handleMouseMove = (e: MouseEvent) => {
            // If cursor isn't visible yet, make it visible
            if (!isVisible) {
                setIsVisible(true)
            }

            // Update position
            mouseX.set(e.clientX - 16)
            mouseY.set(e.clientY - 16)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA'

            setIsHovered(Boolean(isClickable))
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        // Throttled event listeners for better performance
        const throttledMouseMove = (e: MouseEvent) => {
            if (timeout) return
            timeout = setTimeout(() => {
                handleMouseMove(e)
                timeout = null as any
            }, 10) // 10ms throttle
        }

        window.addEventListener("mousemove", throttledMouseMove, { passive: true })
        window.addEventListener("mouseover", handleMouseOver, { passive: true })
        window.addEventListener("mousedown", handleMouseDown, { passive: true })
        window.addEventListener("mouseup", handleMouseUp, { passive: true })
        window.addEventListener("mouseleave", handleMouseLeave, { passive: true })
        window.addEventListener("mouseenter", handleMouseEnter, { passive: true })

        return () => {
            if (timeout) clearTimeout(timeout)
            window.removeEventListener("mousemove", throttledMouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
            window.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [isVisible, mouseX, mouseY])

    // Transform opacity based on visibility
    const opacity = useTransform(
        scale,
        value => isVisible ? value * 1 : 0
    )

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999] left-10 top-10"
            style={{
                x: cursorX,
                y: cursorY,
                scale,
                opacity,
            }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{
                opacity: { duration: 0.2 }
            }}
        >
            <div className="relative w-8 h-8">
                {/* Main cursor */}
                <div className="absolute inset-0 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50" />
                <div className="absolute inset-2 rounded-full bg-primary/30 backdrop-blur-sm" />

                {/* Hover effect */}
                {isHovered && (
                    <motion.div
                        className="absolute -inset-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <div className="w-full h-full rounded-full border border-primary/50 border-dashed animate-spin-slow" />
                    </motion.div>
                )}

                {/* Click ripple */}
                {isClicking && (
                    <motion.div
                        className="absolute -inset-4"
                        initial={{ opacity: 0.5, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="w-full h-full rounded-full border-2 border-primary" />
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}