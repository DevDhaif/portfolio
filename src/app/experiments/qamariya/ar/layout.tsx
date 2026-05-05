import { Amiri, Reem_Kufi, Cairo } from 'next/font/google';
import type { Metadata } from 'next';

const display = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--qm-display',
  display: 'swap',
});

const body = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--qm-body',
  display: 'swap',
});

const arabicHeadline = Reem_Kufi({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--qm-arabic',
  display: 'swap',
});

const mono = Reem_Kufi({
  subsets: ['arabic'],
  weight: ['400', '500'],
  variable: '--qm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'تجربة ب — قمرية',
  description: 'تجربة بورتفوليو: هوية يمنية بزجاج ملوّن وأناقة الأنمي التسعيناتي.',
};

export default function QamariyaArLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className={`${display.variable} ${body.variable} ${arabicHeadline.variable} ${mono.variable}`}
      style={{ fontFamily: 'var(--qm-body), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
