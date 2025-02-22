"use client"

import React from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

export function MouseFollower() {
    // State and motion values
    const [isMounted, setIsMounted] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isClicking, setIsClicking] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(false)

    // Cursor position
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Offset values for hover
    const offsetX = useMotionValue(0)
    const offsetY = useMotionValue(0)

    // Smooth cursor position
    const springConfig = { damping: 20, stiffness: 120 }
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    const scale = useSpring(1.2, { damping: 25, stiffness: 300 })
    const opacity = useTransform(scale, (value) => (isVisible ? value : 0))

    // Resize check for large screens
    React.useEffect(() => {
        const checkDevice = () => {
            setIsMounted(window.matchMedia('(min-width: 1024px)').matches)
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    // Throttle mouse movement with requestAnimationFrame
    React.useEffect(() => {
        if (!isMounted) return

        let animationFrameId: number

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true)

            cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(() => {
                mouseX.set(e.clientX + offsetX.get())
                mouseY.set(e.clientY + offsetY.get())
            })
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA"

            setIsHovered(Boolean(isClickable))

            // Smoothly update offsets
            if (isClickable) {
                offsetX.set(10)
                offsetY.set(-25)
            } else {
                offsetX.set(10)
                offsetY.set(10)
            }
        }

        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        window.addEventListener("mouseover", handleMouseOver, { passive: true })

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [isMounted, mouseX, mouseY, offsetX, offsetY, isVisible])

    if (!isMounted) return null

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999] will-change-transform hidden lg:block mix-blend-difference"
            style={{
                x: cursorX,
                y: cursorY,
                scale,
                opacity,
            }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ opacity: { duration: 0.2 } }}
        >
            <div className={`relative w-8 h-8 p-1`}>
                {/* Outer glow */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-sm" />

                {/* Main cursor */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-[2px] border border-white/20" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 backdrop-blur-[1px]" />

                {/* Dashed Spinning Border */}
                {isHovered && (
                    <motion.div
                        className="absolute -inset-2 rounded-full border-2 border-dashed border-blue-500/50 animate-spin-slow"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                )}

                {/* Hover effect */}
                {isHovered && (
                    <motion.div
                        className="absolute -inset-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.9 }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className="absolute inset-0 rounded-full border border-blue-400/40 animate-pulse" />
                    </motion.div>
                )}

                {/* Click ripple */}
                {isClicking && (
                    <motion.div
                        className="absolute -inset-4 pointer-events-none"
                        initial={{ opacity: 0.9, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 4 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                        <div className="absolute inset-0 rounded-full border-2  border-white/60 animate-ping" />
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
