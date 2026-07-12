import {
  Bricolage_Grotesque,
  Caveat,
  VT323,
  Tajawal,
  Aref_Ruqaa,
} from 'next/font/google';
import type { Metadata } from 'next';
import { PickerView } from '@/components/picker/picker-view';

/* Picker chrome */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--pick-display',
  display: 'swap',
});
const handwriting = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--pick-notebook',
  display: 'swap',
});
const terminalMono = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--pick-terminal',
  display: 'swap',
});
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

export const metadata: Metadata = {
  title: 'Dhaifallah Alfarawi | Choose your view',
  description:
    'One portfolio, two personas — a professional developer theme and a personal notebook theme. Same work, same data, a different room to see it in.',
  alternates: { canonical: 'https://devdhaif.vercel.app' },
};

export default function LandingPicker() {
  return (
    <div
      className={[
        display.variable,
        handwriting.variable,
        terminalMono.variable,
        arBody.variable,
        arHand.variable,
      ].join(' ')}
      style={{ fontFamily: 'var(--pick-display), system-ui, sans-serif' }}
    >
      <PickerView />
    </div>
  );
}
