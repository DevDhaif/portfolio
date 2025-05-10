import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Noise } from "@/components/ui/noise";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { WEBSITE_SCHEMA, PERSON_SCHEMA } from '@/lib/schemas';
import { JsonLd } from '@/components/JsonLd/JsonLd';
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

// Use Cabinet Grotesk for headings
// const cabinetGrotesk = localFont({
//     src: "../fonts/CabinetGrotesk-Variable.woff2",
//     variable: "--font-cabinet-grotesk",
//     display: "swap",
// });

export const metadata: Metadata = {
    title: {
        default: "Dhaifallah Alfarawi | Front end Developer",
        template: "%s | Dhaifallah Alfarawi",
    },
    description:
        "Front end Developer specializing in React, Next.js, and Laravel, creating modern web applications.",
    keywords: [
        "Dhaifallah Alfarawi",
        "Devdhaif",
        "Front End Developer",
        "Next.js",
        "React",
        "Laravel",
        "Saudi Arabia",
        "Web Developer",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "Web Design",
        "UI/UX",
        "Responsive Design",
        "Freelance Developer",
        "Laravel Developer",
        "Web Applications",
        "Web Development",
        "Software Engineer",
        "مطور واجهات أمامية",
        "مطور ويب",
        "مطور جافا سكريبت",
        "مطور تايلويند",
        "مطور رياكت",
        "مطور لارافيل",
        "مطور ويب السعودية",
        "مطور ويب في السعودية",
        "مطور ويب سعودي",
        "مطور ويب في الرياض",
        "مطور واجهات أمامية في الرياض",
        "مطور واجهات أمامية في السعودية",
        // اليمن
        "مطور واجهات أمامية في اليمن",
        "مطور ويب في اليمن",
        "مطور ويب في صنعاء",
        "مطور واجهات أمامية في صنعاء",
        "مطور واجهات أمامية في البيضاء",
        "مطور ويب في صنعاء",
        "مطور ويب في البيضاء",
    ],
};
export function generateMetadata() {
    return {
        other: {
            'structured-data': [
                JSON.stringify(WEBSITE_SCHEMA),
                JSON.stringify(PERSON_SCHEMA)
            ],
        },
    };
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={cn(
                "dark",
                inter.variable,
                jetbrainsMono.variable,
                // cabinetGrotesk.variable
            )}
            suppressHydrationWarning
        >
            <body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:  selection:text-base">
                <>
                    {/* Background Elements */}
                    <div className="fixed inset-0 -z-10">
                        <div className="absolute inset-0 bg-background" />
                        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
                        <Noise />

                        {/* Gradient blob */}
                        <div className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] animate-[spin_100s_linear_infinite] bg-[radial-gradient(var(--accent)/4%,transparent_70%)]" />

                        {/* Background glow spots */}
                        <div className="absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full  /10 blur-3xl" />
                        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                    </div>

                    {/* Main Content */}
                    <div className="relative flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>

                    {/* UI Components */}
                    <ScrollToTop />
                    <Toaster />

                    <Analytics />
                    <SpeedInsights />
                </>
            </body>
        </html>
    );
}