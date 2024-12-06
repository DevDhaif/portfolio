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
import { SessionProvider } from "@/components/SessionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "DevDhaif",
    description: "Full Stack Developer Portfolio",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
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
                            <SessionProvider>

                                <GlobalProvider>
                                    {children}
                                </GlobalProvider>
                            </SessionProvider>

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
