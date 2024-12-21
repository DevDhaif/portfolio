"use client"
import { Hero } from "@/components/home/hero"
import { Projects } from "@/components/home/projects"
import { Skills } from "@/components/home/skills"
import { Experience } from "@/components/home/experience"
import { Stats } from "@/components/home/stats"
import { Contact } from "@/components/home/contact"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { useRef } from "react"
import { Certificates } from "@/components/Certificates"
import { Posts } from "@/components/home/posts"
import dynamic from "next/dynamic"
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 -z-10 bg-[#000010]" />
})
export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <div className="relative">
                <AnimatedBackground />
                <ScrollProgress />
                <div ref={containerRef} className="flex flex-col">
                    <Hero />
                    <Stats />
                    <Skills />
                    <Projects />
                    <Experience />
                    <Posts />
                    <Certificates />
                    <Contact />
                </div>
            </div >
        </>
    )
}
