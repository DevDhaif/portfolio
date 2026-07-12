import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import type { Metadata } from 'next';

/* Arabic display + body — one durable, editorial Arabic sans. */
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ar',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ضيف الله الفروي | مهندس واجهات أمامية',
  description:
    'ضيف الله أحمد الفروي — مهندس واجهات أمامية (React، Next.js، TypeScript) في الرياض، السعودية. نفس أعمال النسخة الإنجليزية، بواجهة عربية RTL. متاح للعمل.',
  alternates: {
    canonical: 'https://devdhaif.vercel.app/pro/ar',
    languages: {
      en: 'https://devdhaif.vercel.app/pro',
      ar: 'https://devdhaif.vercel.app/pro/ar',
    },
  },
  openGraph: {
    locale: 'ar_SA',
    url: 'https://devdhaif.vercel.app/pro/ar',
    title: 'ضيف الله الفروي | مهندس واجهات أمامية',
    description:
      'ضيف الله أحمد الفروي — مهندس واجهات أمامية متخصص في React و Next.js و TypeScript و Laravel.',
  },
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      lang="ar"
      className={arabic.variable}
      style={{ fontFamily: 'var(--font-ar), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
