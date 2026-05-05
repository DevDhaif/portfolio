'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type Theme = 'default' | 'notebook' | 'qamariya' | 'spacetoon';
export type Lang = 'en' | 'ar';

const THEME_ROUTES: Record<Theme, { en: string; ar: string }> = {
  default:   { en: '/',                              ar: '/' },
  notebook:  { en: '/experiments/notebook',          ar: '/experiments/notebook/ar' },
  qamariya:  { en: '/experiments/qamariya',          ar: '/experiments/qamariya/ar' },
  spacetoon: { en: '/experiments/spacetoon',         ar: '/experiments/spacetoon/ar' },
};

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function applyChoice(theme: Theme, lang: Lang) {
  const jar = await cookies();
  const opts = {
    path: '/',
    maxAge: ONE_YEAR,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };
  jar.set('pf_theme', theme, opts);
  jar.set('pf_lang', lang, opts);
  redirect(THEME_ROUTES[theme][lang]);
}

export async function clearChoice() {
  const jar = await cookies();
  jar.delete('pf_theme');
  jar.delete('pf_lang');
  redirect('/select');
}
