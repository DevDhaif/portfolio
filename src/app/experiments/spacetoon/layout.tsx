import { Bungee, Rubik, VT323, Bowlby_One } from 'next/font/google';
import type { Metadata } from 'next';

const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  variable: '--st-display',
  display: 'swap',
});

const bowlby = Bowlby_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--st-fat',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--st-body',
  display: 'swap',
});

const vt = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--st-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Experiment A — Spacetoon Channel Switcher',
  description: 'Portfolio experiment: 90s Arabic-TV CRT homage.',
};

export default function SpacetoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bungee.variable} ${bowlby.variable} ${rubik.variable} ${vt.variable}`}
      style={{ fontFamily: 'var(--st-body), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
