// src/app/layout.tsx
<<<<<<< HEAD
import { Inter } from "next/font/google";
import type { Metadata } from "next";
// import { headers } from "next/headers";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Portfolio | Developer",
  description: "Personal portfolio and blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <p>this is footer</p>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
=======
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MouseFollower } from "@/components/ui/mouse-follower"
import { GlobalProvider } from "@/context/global-context"

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
                            <GlobalProvider>
                                {children}
                            </GlobalProvider>
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
>>>>>>> 31c9046 (wip)
