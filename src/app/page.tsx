"use client"

import { Hero } from "@/components/home/hero"
import { Projects } from "@/components/home/projects"
import { Skills } from "@/components/home/skills"
import { Experience } from "@/components/home/experience"
import { Stats } from "@/components/home/stats"
import { Contact } from "@/components/home/contact"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { BackgroundElements } from "@/components/ui/background-elements"
import { MouseFollower } from "@/components/ui/mouse-follower"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SectionTransition } from "@/components/ui/section-transition"
import { Certificates } from "@/components/Certificates"
import { Posts } from "@/components/home/posts"

export default function Home() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"])
    const statsY = useTransform(scrollYProgress, [0.1, 0.3], ["0%", "10%"])
    const skillsY = useTransform(scrollYProgress, [0.2, 0.4], ["0%", "5%"])

    return (
        <>
            <div className="relative">
                <ScrollProgress />
                <BackgroundElements />
                <div ref={containerRef} className="flex flex-col">
                    <motion.div style={{ y: heroY }}>
                        <SectionTransition>
                            <Hero />
                        </SectionTransition>
                    </motion.div>

                    <motion.div style={{ y: statsY }}>
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
