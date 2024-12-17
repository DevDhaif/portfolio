// hooks/useScrollAnimation.ts
import { useTransform, useScroll, type MotionValue } from "framer-motion"

interface ScrollAnimationConfig {
    yOffset?: string // How far the element should move (e.g., "20%")
    opacityThreshold?: {
        start: number // When to start fading in (0-1)
        end: number   // When to start fading out (0-1)
    }
}

export function useScrollAnimation(config: ScrollAnimationConfig = {}) {
    const {
        yOffset = "10%",
        opacityThreshold = { start: 0.5, end: 0.9 }
    } = config

    const { scrollYProgress } = useScroll()

    // More conservative y transform
    const y = useTransform(
        scrollYProgress,
        [0.5, 1],
        ["0%", yOffset]
    )

    // Wider opacity window with smoother transitions
    const opacity = useTransform(
        scrollYProgress,
        [0, opacityThreshold.start, opacityThreshold.end, 1],
        [0.8, 1, 1, 0.8]  // Start and end at 0.3 instead of 0 for better visibility
    )

    return { y, opacity, scrollYProgress }
}