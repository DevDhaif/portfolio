import {
  Marhey,
  Baloo_Bhaijaan_2,
  Tajawal,
  Lalezar,
  Caveat,
  Patrick_Hand,
  Bowlby_One_SC,
} from 'next/font/google';
import type { Metadata } from 'next';

/* ===========================================================
   Arabic notebook fonts — chosen to match the ENGLISH notebook's
   playful, casual character (not formal calligraphy):
     Caveat (casual handwriting)  → Marhey (playful)
     Patrick Hand (neat hand)     → Baloo Bhaijaan 2 (rounded, friendly)
     Karla (clean sans, body)     → Tajawal (clean sans)
     Bowlby One SC (chunky)       → Lalezar (chunky, friendly)
   =========================================================== */
const handwriting = Marhey({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--nb-hand',
  display: 'swap',
});

const handwritingNeat = Baloo_Bhaijaan_2({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--nb-hand-neat',
  display: 'swap',
});

const sticker = Lalezar({
  subsets: ['arabic'],
  weight: '400',
  variable: '--nb-sticker',
  display: 'swap',
});

const body = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--nb-body',
  display: 'swap',
});

const arabic = Marhey({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--nb-arabic',
  display: 'swap',
});

/* Latin notebook fonts kept available for English content (project
   cards) so the AR cards match the EN cards exactly. */
const latinHand = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--nb-hand-latin',
  display: 'swap',
});
const latinNeat = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--nb-hand-neat-latin',
  display: 'swap',
});
const latinSticker = Bowlby_One_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--nb-sticker-latin',
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
      className={`${handwriting.variable} ${handwritingNeat.variable} ${sticker.variable} ${body.variable} ${arabic.variable} ${latinHand.variable} ${latinNeat.variable} ${latinSticker.variable}`}
      style={{ fontFamily: 'var(--nb-body), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
