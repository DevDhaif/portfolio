import { Lalezar, Tajawal, Reem_Kufi, Cairo } from 'next/font/google';
import type { Metadata } from 'next';

const display = Lalezar({
  subsets: ['arabic'],
  weight: '400',
  variable: '--st-display',
  display: 'swap',
});

const fat = Cairo({
  subsets: ['arabic'],
  weight: ['700', '900'],
  variable: '--st-fat',
  display: 'swap',
});

const body = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--st-body',
  display: 'swap',
});

const mono = Reem_Kufi({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--st-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'تجربة أ — تلفزيون سبيس تون',
  description: 'تجربة بورتفوليو: تكريم تلفزيوني عربي تسعيناتي.',
};

export default function SpacetoonArLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className={`${display.variable} ${fat.variable} ${body.variable} ${mono.variable}`}
      style={{ fontFamily: 'var(--st-body), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
