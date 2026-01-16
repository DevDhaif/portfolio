import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { ConditionalLayout } from "@/components/ConditionalLayout";
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
                    <ConditionalLayout>{children}</ConditionalLayout>

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