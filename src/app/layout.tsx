import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Noise } from "@/components/ui/noise";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { WEBSITE_SCHEMA, PERSON_SCHEMA } from '@/lib/schemas';
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

export function generateMetadata() {
    return {
        metadataBase: new URL('https://devdhaif.vercel.app'),
        title: {
            default: "Dhaifallah Alfarawi | Front End Developer | React, Next.js",
            template: "%s | Dhaifallah Alfarawi",
        },
        description:
            "Expert Front End Developer specializing in React, Next.js, TypeScript, and Laravel. Building modern, responsive web applications with exceptional UI/UX. Available for freelance projects.",
        keywords: [
            "Dhaifallah Alfarawi",
            "Devdhaif",
            "Front End Developer",
            "Next.js Developer",
            "React Developer",
            "Laravel Developer",
            "Saudi Arabia Developer",
            "Yemen Developer",
            "Web Developer",
            "JavaScript Developer",
            "TypeScript Developer",
            "Tailwind CSS",
            "Full Stack Developer",
            "UI/UX Developer",
            "Responsive Web Design",
            "Freelance Web Developer",
            "Modern Web Applications",
            "Web Development Saudi Arabia",
            "Software Engineer",
            "Portfolio Website",
            "مطور واجهات أمامية",
            "مطور ويب",
            "مطور جافا سكريبت",
            "مطور تايلويند",
            "مطور رياكت",
            "مطور لارافيل",
            "مطور نكست جي اس",
            "مطور ويب السعودية",
            "مطور ويب سعودي",
            "مطور ويب الرياض",
            "مطور واجهات أمامية الرياض",
            "مطور واجهات أمامية السعودية",
            "مطور واجهات أمامية اليمن",
            "مطور ويب اليمن",
            "مطور ويب صنعاء",
            "مطور واجهات أمامية صنعاء",
            "مطور واجهات أمامية البيضاء",
            "ضيف الله الفروي",
            "ضيف الله أحمد الفروي",
        ],
        authors: [{ name: "Dhaifallah Alfarawi", url: "https://devdhaif.vercel.app" }],
        creator: "Dhaifallah Alfarawi",
        publisher: "Dhaifallah Alfarawi",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            alternateLocale: ['ar_SA'],
            url: 'https://devdhaif.vercel.app',
            title: 'Dhaifallah Alfarawi | Front End Developer | React, Next.js & Laravel Expert',
            description: 'Expert Front End Developer specializing in React, Next.js, TypeScript, and Laravel. Building modern, responsive web applications with exceptional UI/UX.',
            siteName: 'Dhaifallah Alfarawi Portfolio',
            images: [
                {
                    url: 'https://devdhaif.vercel.app/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'Dhaifallah Alfarawi - Front End Developer',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Dhaifallah Alfarawi | Front End Developer',
            description: 'Expert Front End Developer specializing in React, Next.js, TypeScript, and Laravel.',
            images: ['https://devdhaif.vercel.app/og-image.png'],
            creator: '@devdhaif',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: 'https://devdhaif.vercel.app',
        },
        verification: {
            google: 'c9f852b7a2b6e0f6',
        },
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