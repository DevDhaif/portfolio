import type { Metadata } from "next"
import { Exo_2, Orbitron, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MouseFollower } from "@/components/ui/mouse-follower"
import { GlobalProvider } from "@/context/global-context"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { RootSchema } from '@/components/JsonLd/RootSchema'
import { Pattern } from '@/components/Pattern'
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider"

const exo2 = Exo_2({
    subsets: ["latin"],
    variable: '--font-exo',
    display: 'swap',
})

const orbitron = Orbitron({
    subsets: ["latin"],
    variable: '--font-orbitron',
    display: 'swap',
})

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-jetbrains',
    display: 'swap',
})
export const metadata: Metadata = {
    metadataBase: new URL('https://devdhaif.vercel.app'),
    title: {
        default: 'Dhaifallah Alfarawi | مطور ويب | ضيف الله الفروي',
        template: '%s | Dhaifallah Alfarawi | ضيف الله الفروي'
    },
    description: 'Dhaifallah Alfarawi (ضيف الله الفروي) - Full Stack Developer specializing in React, Next.js, and Laravel. مطور ويب متخصص في تطوير تطبيقات الويب والمواقع',
    keywords: [
        // Name variations
        'Dhaifallah',
        'Dhaifallah Alfarawi',
        'Dhaifallah Al-farawi',
        'Devdhaif',
        // Arabic variations
        'ضيف الله',
        'ضيف الله الفروي',
        'ضيف الله الفروي البيضاء',
        'ضيف الله الفروي اليمن',
        // Location keywords
        'Yemen developer',
        'Yemeni developer',
        'Al Bayda developer',
        'مطور يمني',
        'مبرمج يمني',
        // Professional keywords
        'Full Stack Developer',
        'React Developer',
        'Next.js Developer',
        'Laravel Developer',
        'Web Developer',
        'Web Engineer',
        'Software Developer',
        'Frontend Developer',
        'Front-end Developer',
        'Software Engineer',
        'مطور ويب',
        'مبرمج مواقع',
        'مطور تطبيقات',
        // Skills
        'React.js',
        'React',
        'React Developer',
        'React js',
        'Tailwind CSS',
        'Tailwind',
        'tailwindcss',
        'Next.js',
        'Laravel',
        'TypeScript',
        'JavaScript',
        'PHP',
        'Full Stack Development',
    ],
    authors: [
        {
            name: 'Dhaifallah Alfarawi',
            url: 'https://devdhaif.vercel.app'
        }
    ],
    creator: 'Dhaifallah Alfarawi',
    publisher: 'Dhaifallah Alfarawi',
    alternates: {
        canonical: 'https://devdhaif.vercel.app',
        languages: {
            'en-US': 'https://devdhaif.vercel.app',
            'ar-SA': 'https://devdhaif.vercel.app'
        }
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        alternateLocale: 'ar_SA',
        url: 'https://devdhaif.vercel.app/',
        siteName: 'Dhaifallah Alfarawi | ضيف الله الفروي',
        title: 'Dhaifallah Alfarawi | Full Stack Developer | ضيف الله الفروي',
        description: 'Dhaifallah Alfarawi (ضيف الله الفروي) - Full Stack Developer  specializing in React, Next.js, and Laravel. مطور ويب متخصص في تطوير تطبيقات الويب',
        images: [
            {
                url: 'https://devdhaif.vercel.app/_next/image?url=https%3A%2F%2Fwwocsjwfwdlmdibslxya.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcertificates-images%2F1733572471503-front-end-libraries.webp&w=640&q=75',
                width: 1200,
                height: 630,
                alt: 'Dhaifallah Alfarawi - ضيف الله الفروي'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dhaifallah Alfarawi | ضيف الله الفروي',
        description: 'Full Stack Developer  specializing in React, Next.js, and Laravel. مطور ويب متخصص في تطوير تطبيقات الويب',
        site: '@devdhaif',
        creator: '@devdhaif',
        images: ['https://devdhaif.vercel.app/_next/image?url=https%3A%2F%2Fwwocsjwfwdlmdibslxya.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcertificates-images%2F1733572471503-front-end-libraries.webp&w=640&q=75'],
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
            noimageindex: false,
        },
    },
    verification: {
        google: 'your-google-site-verification',
        yandex: 'your-yandex-verification',
        yahoo: 'your-yahoo-verification'
    },
    category: 'technology',
    classification: 'Portfolio',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <head>
                <RootSchema />
            </head>

            <body
                className={cn(
                    "min-h-screen antialiased font-plus-jakarta selection:bg-white/10 selection:text-white relative",
                    exo2.variable,
                    orbitron.variable,
                    jetbrains.variable,
                    "font-default"
                )}
            >
                {/* <Pattern /> */}
                {/* Primary Background Layer */}
                <div className="fixed inset-0 -z-50">
                    <div className="absolute inset-0 bg-slate-950" />
                    {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.08),rgba(0,0,0,0))]" /> */}
                </div>



                {/* Content Noise Overlay */}
                <div className="fixed inset-0 -z-30 opacity-[0.015] pointer-events-none bg-noise" />

                <MouseFollower />

                <div className="relative flex min-h-screen flex-col">
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-50 w-full border-b border-white/5">
                        <div className="absolute inset-0 bg-[#000010]/70 backdrop-blur-xl" />
                        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <Navbar />
                        </div>
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 relative">
                        {/* Content Wrapper */}
                        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <NextSSRPlugin
                                routerConfig={extractRouterConfig(ourFileRouter)}
                            />
                            <GlobalProvider>
                                {children}
                                <Analytics />
                                <AnalyticsProvider />
                                <SpeedInsights />
                            </GlobalProvider>
                        </div>

                        {/* Decorative Top Gradient */}
                        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                            <div
                                className="relative left-[calc(50%-20rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#000030] to-transparent opacity-30 sm:left-[calc(50%-30rem)] sm:w-[80rem]"
                                style={{
                                    clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                                }}
                            />
                        </div>
                    </main>

                    {/* Footer */}
                    <div className="relative w-full border-t border-white/5">
                        <div className="absolute inset-0 bg-[#000030]/80 backdrop-blur-sm" />
                        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <Footer />
                        </div>
                    </div>
                </div>

                {/* Decorative Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
                    <div
                        className="relative left-[calc(50%+20rem)] aspect-[1155/678] w-[40rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#000030] to-transparent opacity-30 sm:left-[calc(50%+30rem)] sm:w-[80rem]"
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                        }}
                    />
                </div>
            </body>
        </html>
    )
}