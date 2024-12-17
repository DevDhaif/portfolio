"use client"

import React from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

export function MouseFollower() {
    // All hooks need to be at the top, before any conditionals
    const [isMounted, setIsMounted] = React.useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isClicking, setIsClicking] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(false)

    const springConfig = {
        damping: 35,
        stiffness: 400,
        mass: 0.1
    }

    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)
    const scale = useSpring(1, {
        damping: 25,
        stiffness: 300,
        mass: 0.1
    })

    const opacity = useTransform(
        scale,
        value => isVisible ? value * 1 : 0
    )

    React.useEffect(() => {
        const checkDevice = () => {
            const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches
            setIsMounted(isLargeScreen)
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    React.useEffect(() => {
        scale.set(isClicking ? 0.9 : isHovered ? 1.5 : 1)
    }, [isClicking, isHovered, scale])

    React.useEffect(() => {
        if (!isMounted) return

        let timeout: ReturnType<typeof setTimeout>

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) {
                setIsVisible(true)
            }
            mouseX.set(e.clientX - 16)
            mouseY.set(e.clientY - 16)
        }

        const throttledMouseMove = (e: MouseEvent) => {
            if (timeout) return
            timeout = setTimeout(() => {
                handleMouseMove(e)
                //@ts-expect-error : I do not need it for now 
                timeout = undefined
            }, 10)
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
    }, [isMounted, isVisible, mouseX, mouseY])

    if (!isMounted) return null

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999] will-change-transform hidden lg:block"
            style={{
                x: cursorX,
                y: cursorY,
                scale,
                opacity,
            }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ opacity: { duration: 0.2 } }}
        >
            <div className="relative w-8 h-8">
                {/* Outer glow effect */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-sm" />

                {/* Main cursor */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-[2px] border border-white/20" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 backdrop-blur-[1px]" />
                </div>

                {/* Hover effect with improved animation */}
                {isHovered && (
                    <motion.div
                        className="absolute -inset-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="relative w-full h-full">
                            {/* Spinning border */}
                            <div className="absolute inset-0 rounded-full border border-white/40 border-dashed animate-spin-slow" />
                            {/* Glowing ring */}
                            <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-pulse" />
                        </div>
                    </motion.div>
                )}

                {/* Enhanced click ripple */}
                {isClicking && (
                    <motion.div
                        className="absolute -inset-4"
                        initial={{ opacity: 0.5, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="w-full h-full">
                            {/* Multiple ripple layers for depth */}
                            <div className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping" />
                            <div className="absolute inset-0 rounded-full border border-blue-400/40 animate-pulse" />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}