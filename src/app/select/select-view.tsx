'use client';

import { useState, useTransition } from 'react';
import { applyChoice, type Lang, type Theme } from './actions';
import s from './select.module.css';

/* ===========================================================
   Picker — Step 1: language. Step 2: theme tile.
   Each tile is a scaled-down replica of the actual theme so
   the user sees what they're choosing, not just a label.
   =========================================================== */

type Step = 'lang' | 'theme';

const STRINGS = {
  en: {
    dir: 'ltr' as const,
    step1Title: 'Choose your language',
    step1Lead: 'You can change this later.',
    step2Title: 'Pick a theme',
    step2Lead: "Each theme is a different take on the same content. Tap any tile to enter it.",
    enter: 'Enter',
    back: '← Back',
    themes: {
      default:   { name: 'Terminal',  desc: 'Default. Quiet, monospace, dark.' },
      notebook:  { name: 'Notebook',  desc: '90s school composition book — ruled paper, tape, stickers.' },
      qamariya:  { name: 'Qamariya',  desc: 'Yemeni stained-glass identity — restrained, editorial.' },
      spacetoon: { name: 'Spacetoon', desc: 'CRT homage — channels, scanlines, anime-OP energy.' },
    },
  },
  ar: {
    dir: 'rtl' as const,
    step1Title: 'اختر اللغة',
    step1Lead: 'تقدر تغيّرها لاحقًا.',
    step2Title: 'اختر الثيم',
    step2Lead: 'كل ثيم نسخة مختلفة لنفس المحتوى. اضغط أي مربع وادخل.',
    enter: 'دخول',
    back: 'رجوع →',
    themes: {
      default:   { name: 'الطرفية',     desc: 'الافتراضي. هادئ، مونوسبيس، داكن.' },
      notebook:  { name: 'الدفتر',     desc: 'دفتر مدرسي تسعيناتي — ورق مسطّر، شريط لاصق، ملصقات.' },
      qamariya:  { name: 'القمريّة',   desc: 'هويّة يمنيّة — زجاج ملوّن، تحريريّ، هادئ.' },
      spacetoon: { name: 'سبيس‌تون',   desc: 'تحيّة لتلفزيون CRT — قنوات، خطوط مسح، طاقة أنمي.' },
    },
  },
} as const;

const THEME_ORDER: Theme[] = ['default', 'notebook', 'qamariya', 'spacetoon'];

export default function SelectView() {
  const [step, setStep] = useState<Step>('lang');
  const [lang, setLang] = useState<Lang>('en');
  const [pending, startTransition] = useTransition();
  const [picking, setPicking] = useState<Theme | null>(null);
  const t = STRINGS[lang];

  const choose = (theme: Theme) => {
    setPicking(theme);
    startTransition(() => {
      applyChoice(theme, lang);
    });
  };

  return (
    <div className={s.root} dir={t.dir}>
      <div className={s.bg} aria-hidden />
      <div className={s.bgDots} aria-hidden />

      <header className={s.head}>
        <div className={s.brandRow}>
          <span className={s.brandMark}>◆</span>
          <span className={s.brandName}>Dhaifallah Alfarawi</span>
          <span className={s.brandMark}>◆</span>
        </div>
        <div className={s.stepIndicator}>
          <span className={`${s.stepDot} ${step === 'lang' ? s.stepDotActive : s.stepDotDone}`}>1</span>
          <span className={s.stepDash} />
          <span className={`${s.stepDot} ${step === 'theme' ? s.stepDotActive : ''}`}>2</span>
        </div>
      </header>

      {step === 'lang' && (
        <main className={s.stage}>
          <h1 className={s.title}>{t.step1Title}</h1>
          <p className={s.lead}>{t.step1Lead}</p>

          <div className={s.langRow}>
            <button
              type="button"
              className={`${s.langCard} ${lang === 'en' ? s.langCardActive : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              <span className={s.langGlyph}>EN</span>
              <span className={s.langName}>English</span>
              <span className={s.langSub}>Latin · LTR</span>
            </button>
            <button
              type="button"
              className={`${s.langCard} ${lang === 'ar' ? s.langCardActive : ''}`}
              onClick={() => setLang('ar')}
              aria-pressed={lang === 'ar'}
            >
              <span className={s.langGlyph}>ع</span>
              <span className={s.langName}>العربية</span>
              <span className={s.langSub}>عربي · RTL</span>
            </button>
          </div>

          <div className={s.actions}>
            <button
              type="button"
              className={s.primaryBtn}
              onClick={() => setStep('theme')}
            >
              {t.enter} →
            </button>
          </div>
        </main>
      )}

      {step === 'theme' && (
        <main className={s.stage}>
          <h1 className={s.title}>{t.step2Title}</h1>
          <p className={s.lead}>{t.step2Lead}</p>

          <div className={s.themeGrid}>
            {THEME_ORDER.map((theme) => (
              <button
                key={theme}
                type="button"
                className={`${s.themeCard} ${picking === theme ? s.themeCardLoading : ''}`}
                onClick={() => choose(theme)}
                disabled={pending}
                aria-label={t.themes[theme].name}
              >
                <div className={s.themeFrame}>
                  <ThemePreview theme={theme} lang={lang} />
                </div>
                <div className={s.themeMeta}>
                  <span className={s.themeName}>{t.themes[theme].name}</span>
                  <span className={s.themeDesc}>{t.themes[theme].desc}</span>
                </div>
                <span className={s.themeEnter}>
                  {pending && picking === theme ? '…' : t.enter} {t.dir === 'rtl' ? '←' : '→'}
                </span>
              </button>
            ))}
          </div>

          <div className={s.actions}>
            <button
              type="button"
              className={s.ghostBtn}
              onClick={() => setStep('lang')}
            >
              {t.back}
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

/* ===========================================================
   Mini theme replicas — CSS-only, scaled to the tile frame
   =========================================================== */
function ThemePreview({ theme, lang }: { theme: Theme; lang: Lang }) {
  const isAr = lang === 'ar';

  if (theme === 'default') {
    return (
      <div className={s.previewTerminal}>
        <div className={s.terminalLine}>
          <span className={s.terminalDim}>~</span>
          <span className={s.terminalDim}>$</span>
          <span>dhaif --portfolio</span>
        </div>
        <div className={s.terminalLine}>
          <span className={s.terminalDim}>{'>'}</span>
          <span>front-end · next.js · ts</span>
        </div>
        <div className={s.terminalLine}>
          <span className={s.terminalDim}>{'>'}</span>
          <span>{isAr ? 'مهندس برمجيات' : 'software engineer'}</span>
          <span className={s.terminalCursor}>▋</span>
        </div>
      </div>
    );
  }

  if (theme === 'notebook') {
    return (
      <div className={s.previewNotebook}>
        <span className={s.notebookHole} style={{ top: '18%' }} />
        <span className={s.notebookHole} style={{ top: '50%' }} />
        <span className={s.notebookHole} style={{ top: '82%' }} />
        <span className={s.notebookMargin} />
        <span className={`${s.notebookTape} ${s.notebookTapeTL}`} />
        <span className={`${s.notebookTape} ${s.notebookTapeBR}`} />
        <div className={s.notebookText} style={{ fontFamily: isAr ? 'var(--pick-ar-hand)' : 'var(--pick-notebook)' }}>
          {isAr ? 'دفتر ضيف' : "dhaif's portfolio"}
        </div>
        <div className={s.notebookSub} style={{ fontFamily: isAr ? 'var(--pick-ar-body)' : 'var(--pick-notebook)' }}>
          {isAr ? '★ مهندس برمجيات ★' : '★ software engineer ★'}
        </div>
      </div>
    );
  }

  if (theme === 'qamariya') {
    return (
      <div className={s.previewQamariya}>
        <svg className={s.qmSvg} viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="qmFrame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3ead9" />
              <stop offset="100%" stopColor="#c9b89a" />
            </linearGradient>
          </defs>
          {/* arches */}
          <path d="M10 58 L10 30 Q10 10 26 10 Q42 10 42 30 L42 58 Z" fill="#0e2a66" />
          <path d="M44 58 L44 30 Q44 10 60 10 Q76 10 76 30 L76 58 Z" fill="#7d1219" />
          <path d="M78 58 L78 30 Q78 10 90 10 Q102 10 102 30 L102 58 Z" fill="#0e5436" />
          {/* center diamonds */}
          <path d="M26 36 L30 32 L26 28 L22 32 Z" fill="#e9a82a" />
          <path d="M60 36 L64 32 L60 28 L56 32 Z" fill="#e9a82a" />
          <path d="M90 36 L94 32 L90 28 L86 32 Z" fill="#e9a82a" />
          {/* sill */}
          <rect x="0" y="56" width="100" height="4" fill="url(#qmFrame)" stroke="#2a1f10" strokeWidth="0.5" />
        </svg>
        <div
          className={s.qmTitle}
          style={{ fontFamily: isAr ? 'var(--pick-ar-serif)' : 'var(--pick-qamariya)' }}
        >
          {isAr ? 'ضيف الله' : 'Dhaifallah,'}
        </div>
        <div
          className={s.qmSub}
          style={{ fontFamily: isAr ? 'var(--pick-ar-serif)' : 'var(--pick-qamariya)' }}
        >
          {isAr ? <em>مهندس برمجيات</em> : <em>software engineer</em>}
        </div>
      </div>
    );
  }

  /* spacetoon */
  return (
    <div className={s.previewSpacetoon}>
      <div className={s.stScreen}>
        <div className={s.stChannelBg} />
        <div className={s.stScanlines} />
        <div className={s.stHud}>
          <span className={s.stLogoBug}>SPACETOON</span>
          <span className={s.stLive}>● {isAr ? 'مباشر' : 'LIVE'}</span>
        </div>
        <div
          className={s.stHero}
          style={{
            fontFamily: isAr ? 'var(--pick-ar-blocky)' : 'var(--pick-spacetoon)',
          }}
        >
          {isAr ? 'ضيف' : 'DHAIF'}
        </div>
        <div className={s.stKicker}>
          {isAr ? 'الحلقة ٠١ · يُبث الآن' : 'EP-01 · NOW PLAYING'}
        </div>
      </div>
      <div className={s.stRemote}>
        <span className={s.stKey} style={{ background: '#00c773' }} />
        <span className={s.stKey} style={{ background: '#ff8a1f' }} />
        <span className={s.stKey} style={{ background: '#7a5cff' }} />
        <span className={s.stKey} style={{ background: '#ff5aa8' }} />
      </div>
    </div>
  );
}
