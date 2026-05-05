import { Aref_Ruqaa, Tajawal, Lalezar, Cairo } from 'next/font/google';
import type { Metadata } from 'next';

const handwriting = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--nb-hand',
  display: 'swap',
});

const handwritingNeat = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--nb-hand-neat',
  display: 'swap',
});

const sticker = Lalezar({
  subsets: ['arabic'],
  weight: '400',
  variable: '--nb-sticker',
  display: 'swap',
});

const body = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--nb-body',
  display: 'swap',
});

const arabic = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--nb-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'تجربة ج — الدفتر',
  description: 'تجربة بورتفوليو: دفتر مدرسي تسعيناتي + ألبوم ملصقات أنمي.',
};

export default function NotebookArLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className={`${handwriting.variable} ${handwritingNeat.variable} ${sticker.variable} ${body.variable} ${arabic.variable}`}
      style={{ fontFamily: 'var(--nb-body), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
