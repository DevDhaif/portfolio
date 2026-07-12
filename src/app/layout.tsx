import { Inter, JetBrains_Mono, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from '@/lib/utils';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Toaster } from '@/components/ui/toaster';
import { ConditionalLayout } from '@/components/ConditionalLayout';
import { ThemeSwitcherPill } from '@/components/ThemeSwitcherPill';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { WEBSITE_SCHEMA, PERSON_SCHEMA } from '@/lib/schemas';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export function generateMetadata() {
  return {
    metadataBase: new URL('https://devdhaif.vercel.app'),
    title: {
      default: 'Dhaifallah Alfarawi | Front End Developer | React, Next.js',
      template: '%s | Dhaifallah Alfarawi',
    },
    description:
      'Dhaifallah Alfarawi — ضيف الله أحمد الفروي — Front End Developer specializing in React, Next.js, TypeScript, and Laravel. Building modern, responsive web applications with exceptional UI/UX. Available for freelance projects.',
    authors: [
      { name: 'Dhaifallah Alfarawi', url: 'https://devdhaif.vercel.app' },
    ],
    creator: 'Dhaifallah Alfarawi',
    publisher: 'Dhaifallah Alfarawi',
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
      title:
        'Dhaifallah Alfarawi | Front End Developer | React, Next.js & Laravel Expert',
      description:
        'Expert Front End Developer specializing in React, Next.js, TypeScript, and Laravel. Building modern, responsive web applications with exceptional UI/UX.',
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
      description:
        'Expert Front End Developer specializing in React, Next.js, TypeScript, and Laravel.',
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
        JSON.stringify(PERSON_SCHEMA),
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
        'dark',
        inter.variable,
        display.variable,
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-paper font-sans text-ink antialiased [overflow-x:clip]">
        <SmoothScroll>
          <ConditionalLayout>{children}</ConditionalLayout>

          {/* Persistent picker entry — hidden on the landing picker (/) */}
          <ThemeSwitcherPill />

          {/* UI Components */}
          <ScrollToTop />
          <Toaster />
          <AnalyticsProvider />
          <Analytics />
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  );
}
