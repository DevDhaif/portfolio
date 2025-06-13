import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";
import { Experience } from "@/components/home/experience";
import { Certificates } from "@/components/Certificates";

export const metadata: Metadata = {
    title: "Dhaifallah Alfarawi | Front End Developer",
    description: "Front End Developer specializing in React, Next.js, Tailwindcss, creating modern web applications.",
};

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <BlogSection />
            <Experience />
            <Certificates />
            <ContactSection />
        </>
    );
}