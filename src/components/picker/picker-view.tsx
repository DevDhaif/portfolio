'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './picker.module.css';

type Persona = 'professional' | 'personal';
type Lang = 'en' | 'ar';

const ROUTES: Record<Persona, Record<Lang, string>> = {
  professional: { en: '/pro', ar: '/pro/ar' },
  personal: { en: '/note', ar: '/note/ar' },
};

const ORDER: Persona[] = ['professional', 'personal'];

const STRINGS = {
  en: {
    dir: 'ltr' as const,
    arrow: '→',
    name: 'Dhaifallah Alfarawi',
    title: 'How do you want to meet me?',
    personas: {
      professional: {
        name: 'Developer',
        desc: 'The recruiter-ready cut: projects, stack, experience, writing.',
      },
      personal: {
        name: 'Notebook',
        desc: 'The same résumé, told like a diary on ruled paper.',
      },
    },
    footNote: 'Same work, same data. You can switch anytime.',
  },
  ar: {
    dir: 'rtl' as const,
    arrow: '←',
    name: 'ضيف الله الفروي',
    title: 'كيف ودك تستعرض؟',
    personas: {
      professional: {
        name: 'المطوّر',
        desc: 'النسخة الجاهزة للتوظيف: مشاريع، أدوات، خبرات، وكتابة.',
      },
      personal: {
        name: 'الدفتر',
        desc: 'نفس السيرة، بأسلوب يوميات على ورق.',
      },
    },
    footNote: 'نفس الشغل ونفس البيانات. تقدر تبدّل وقت ما تبي.',
  },
} as const;

export function PickerView() {
  const [lang, setLang] = useState<Lang>('en');
  const t = STRINGS[lang];

  return (
    <div className={s.root} dir={t.dir}>
      <header className={s.head}>
        <span className={s.name}>{t.name}</span>

        <div className={s.lang} role="group" aria-label="Language">
          <button
            type="button"
            className={`${s.langBtn} ${lang === 'en' ? s.langBtnActive : ''}`}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
          <span className={s.langSep} aria-hidden>
            /
          </span>
          <button
            type="button"
            className={`${s.langBtn} ${lang === 'ar' ? s.langBtnActive : ''}`}
            onClick={() => setLang('ar')}
            aria-pressed={lang === 'ar'}
          >
            ع
          </button>
        </div>
      </header>

      <main className={s.stage}>
        <h1 className={s.title}>{t.title}</h1>

        <ul className={s.list}>
          {ORDER.map((persona, i) => {
            const p = t.personas[persona];
            return (
              <li key={persona}>
                <Link href={ROUTES[persona][lang]} className={s.option}>
                  <span className={s.optionIndex} aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={s.optionText}>
                    <span className={s.optionName}>{p.name}</span>
                    <span className={s.optionDesc}>{p.desc}</span>
                  </span>
                  <span className={s.optionArrow} aria-hidden>
                    {t.arrow}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={s.foot}>{t.footNote}</footer>
    </div>
  );
}
