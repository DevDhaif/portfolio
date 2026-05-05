import { Cormorant_Garamond, Outfit, JetBrains_Mono, Amiri } from 'next/font/google';
import type { Metadata } from 'next';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--qm-display',
  display: 'swap',
});

const body = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--qm-body',
  display: 'swap',
});

const arabic = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--qm-arabic',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--qm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Experiment B — Qamariya',
  description: 'Portfolio experiment: Yemeni stained-glass identity meets 90s anime cel-shading.',
};

export default function QamariyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} ${arabic.variable} ${mono.variable}`}
      style={{ fontFamily: 'var(--qm-body), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
