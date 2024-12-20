"use client"
import { Hero } from "@/components/home/hero"
import { Projects } from "@/components/home/projects"
import { Skills } from "@/components/home/skills"
import { Experience } from "@/components/home/experience"
import { Stats } from "@/components/home/stats"
import { Contact } from "@/components/home/contact"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { SectionTransition } from "@/components/ui/section-transition"
import { Certificates } from "@/components/Certificates"
import { Posts } from "@/components/home/posts"
import dynamic from "next/dynamic"
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 -z-10 bg-[#000010]" />
})
export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, {
        damping: 15,
        stiffness: 30
    })

    const heroY = useTransform(smoothProgress, [0, 0.2], ["0%", "20%"])
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95])
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.8])

    const statsY = useTransform(smoothProgress, [0.1, 0.3], ["0%", "10%"])
    const skillsY = useTransform(smoothProgress, [0.2, 0.4], ["0%", "5%"])

    return (
        <>
            <div className="relative">
                <AnimatedBackground />
                <ScrollProgress />
                <div ref={containerRef} className="flex flex-col">
                    <motion.div
                        style={{
                            y: heroY,
                            scale: heroScale,
                            opacity: heroOpacity
                        }}
                    >
                        <SectionTransition>
                            <Hero />
                        </SectionTransition>
                    </motion.div>


                    <motion.div className="mt-40" style={{ y: statsY }}>
                        <SectionTransition>
                            <Stats />
                        </SectionTransition>
                    </motion.div>

                    <motion.div style={{ y: skillsY }}>
                        <SectionTransition>
                            <Skills />
                        </SectionTransition>
                    </motion.div>

                    <SectionTransition>
                        <Projects />
                    </SectionTransition>

                    <SectionTransition>
                        <Experience />
                    </SectionTransition>
                    <SectionTransition>
                        <Posts />
                    </SectionTransition>
                    <SectionTransition>
                        <Certificates />
                    </SectionTransition>
                    <SectionTransition>
                        <Contact />
                    </SectionTransition>
                </div>

            </div>
        </>
    )
}
