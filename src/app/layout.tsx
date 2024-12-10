import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MouseFollower } from "@/components/ui/mouse-follower"
import { GlobalProvider } from "@/context/global-context"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { RootSchema } from '@/components/JsonLd/RootSchema'

const inter = Inter({ subsets: ["latin"] })

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
        <html lang="en" suppressHydrationWarning>
            <head>
                <RootSchema />
            </head>

            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.className
                )}
            >
                <MouseFollower />
                <div className="relative flex min-h-screen flex-col">
                    {/* Sticky header wrapper */}
                    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <Navbar />
                        </div>
                    </div>

                    {/* Main content */}
                    <main className="flex-1">
                        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <NextSSRPlugin
                                routerConfig={extractRouterConfig(ourFileRouter)}
                            />
                            {/* <SessionProvider> */}

                            <GlobalProvider>
                                {children}
                                <Analytics />
                                <SpeedInsights />
                            </GlobalProvider>
                            {/* </SessionProvider> */}

                        </div>
                    </main>

                    {/* Footer */}
                    <div className="w-full border-t bg-background">
                        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <Footer />
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
