import {
  Caveat,
  Patrick_Hand,
  Bowlby_One_SC,
  Karla,
  Reem_Kufi,
} from 'next/font/google';
import type { Metadata } from 'next';

const handwriting = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--nb-hand',
  display: 'swap',
});

const handwritingNeat = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--nb-hand-neat',
  display: 'swap',
});

const sticker = Bowlby_One_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--nb-sticker',
  display: 'swap',
});

const body = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--nb-body',
  display: 'swap',
});

const arabic = Reem_Kufi({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--nb-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Experiment C — Notebook',
  description: 'Portfolio experiment: 90s school notebook + anime sticker book.',
};

export default function NotebookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${handwriting.variable} ${handwritingNeat.variable} ${sticker.variable} ${body.variable} ${arabic.variable}`}
      style={{ fontFamily: 'var(--nb-body), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
