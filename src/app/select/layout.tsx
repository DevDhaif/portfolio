import {
  Bricolage_Grotesque,
  Caveat,
  Cormorant_Garamond,
  Bowlby_One,
  VT323,
  Tajawal,
  Aref_Ruqaa,
  Lalezar,
  Amiri,
} from 'next/font/google';
import type { Metadata } from 'next';

/* Picker chrome */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--pick-display',
  display: 'swap',
});

/* Theme tile previews — each tile reuses the actual theme font */
const handwriting = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--pick-notebook',
  display: 'swap',
});
const serifItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['italic', 'normal'],
  variable: '--pick-qamariya',
  display: 'swap',
});
const blocky = Bowlby_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--pick-spacetoon',
  display: 'swap',
});
const terminalMono = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--pick-terminal',
  display: 'swap',
});

/* Arabic equivalents for the AR-flavored previews */
const arBody = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--pick-ar-body',
  display: 'swap',
});
const arHand = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--pick-ar-hand',
  display: 'swap',
});
const arBlocky = Lalezar({
  subsets: ['arabic'],
  weight: '400',
  variable: '--pick-ar-blocky',
  display: 'swap',
});
const arSerif = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--pick-ar-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Choose your view · Dhaifallah Alfarawi',
  description:
    'Pick a language and a theme. The portfolio comes in four flavors — terminal, notebook, qamariya, and spacetoon.',
};

export default function SelectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        display.variable,
        handwriting.variable,
        serifItalic.variable,
        blocky.variable,
        terminalMono.variable,
        arBody.variable,
        arHand.variable,
        arBlocky.variable,
        arSerif.variable,
      ].join(' ')}
      style={{ fontFamily: 'var(--pick-display), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
