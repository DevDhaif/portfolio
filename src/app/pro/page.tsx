import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { SkillsSection } from "@/components/sections/skills";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";
import { Experience } from "@/components/home/experience";
import { Certificates } from "@/components/Certificates";
import { GsapReveals } from "@/components/ui/gsap-reveals";

export const metadata: Metadata = {
    title: "Dhaifallah Alfarawi (ضيف الله الفروي) | Front End Developer",
    description: "Dhaifallah Alfarawi — ضيف الله أحمد الفروي — Front End Developer (React, Next.js, TypeScript) based in Riyadh, Saudi Arabia. Available for projects.",
    alternates: {
        canonical: "https://devdhaif.vercel.app/pro",
        languages: {
            en: "https://devdhaif.vercel.app/pro",
            ar: "https://devdhaif.vercel.app/pro/ar",
        },
    },
};

export default function ProfessionalHome() {
    return (
        <>
            <GsapReveals start="top 88%" />
            <HeroSection />
            <AboutSection />
            <ProjectsShowcase />
            <SkillsSection />
            <BlogSection />
            <Experience />
            <Certificates />
            <ContactSection />
        </>
    );
}
