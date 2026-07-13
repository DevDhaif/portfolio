import { Bricolage_Grotesque, Tajawal } from 'next/font/google';
import type { Metadata } from 'next';
import { PickerView } from '@/components/picker/picker-view';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--pick-display',
  display: 'swap',
});

const arabic = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--pick-ar',
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
      className={`${display.variable} ${arabic.variable}`}
      style={{
        fontFamily: 'var(--pick-display), var(--pick-ar), system-ui, sans-serif',
      }}
    >
      <PickerView />
    </div>
  );
}
