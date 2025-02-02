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
    title: {
        default: 'Dhaifallah Alfarawi | Full Stack Developer',
        template: '%s | Dhaifallah Alfarawi'
    },
    description: 'Full Stack Developer specializing in React, Next.js, and Laravel',
    keywords: ['Dhaifallah', 'ضيف الله الفروي', 'Devdhaif', 'Full Stack Developer', 'React Developer', 'Next.js Developer'],
    authors: [{ name: 'Dhaifallah Alfarawi' }],
    creator: 'Dhaifallah Alfarawi',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://devdhaif.vercel.app/',
        siteName: 'Dhaifallah Alfarawi Portfolio',
        title: 'Dhaifallah Alfarawi | Full Stack Developer',
        description: 'Full Stack Developer specializing in React, Next.js, and Laravel',
        images: [
            {
                url: 'https://devdhaif.vercel.app/_next/image?url=https%3A%2F%2Fwwocsjwfwdlmdibslxya.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcertificates-images%2F1733572471503-front-end-libraries.webp&w=640&q=75',
                width: 1200,
                height: 630,
                alt: 'Dhaifallah Alfarawi'
            }
        ]
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
                <Pattern />
                {/* Primary Background Layer */}
                <div className="fixed inset-0 -z-50">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000030] via-[#00002f] to-[#000017]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.08),rgba(0,0,0,0))]" />
                </div>

                {/* Ambient Background Effects */}
                <div className="fixed inset-0 -z-40">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.05),transparent_50%)]" />
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(30,30,60,0.05),transparent_50%)]" />
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