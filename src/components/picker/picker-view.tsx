'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ParticleField } from '@/components/ui/particle-field';
import s from './picker.module.css';

gsap.registerPlugin(useGSAP);

/* ===========================================================
   Landing picker — one portfolio, two personas.
   Professional → /pro (+ /pro/ar).   Personal → /note (+ /note/ar).
   Both render the SAME data; only the skin changes. Plain links,
   no cookies — every visit lands here and the choice is one click.
   =========================================================== */

type Persona = 'professional' | 'personal';
type Lang = 'en' | 'ar';

const ROUTES: Record<Persona, Record<Lang, string>> = {
  professional: { en: '/pro', ar: '/pro/ar' },
  personal: { en: '/note', ar: '/note/ar' },
};

const STRINGS = {
  en: {
    dir: 'ltr' as const,
    kicker: 'One portfolio · two moods',
    title: 'How do you want to meet me?',
    lead: 'Same work, same data — a different room to see it in. Pick one; the corner pill brings you back here anytime.',
    langLabel: 'Lang',
    enter: 'Enter',
    footNote: 'You can switch anytime from the corner pill.',
    personas: {
      professional: {
        kind: 'The professional',
        name: 'Developer',
        desc: 'Terminal-grade, editorial, dark. The recruiter-ready cut — projects, stack, experience, writing.',
        features: ['Terminal & code windows', 'Case-study projects', 'Résumé & certificates'],
      },
      personal: {
        kind: 'The personal',
        name: 'Notebook',
        desc: 'A 90s composition book — ruled paper, tape, gold stars. The same résumé, told like a diary.',
        features: ['Hand-drawn & playful', 'Sticker-book projects', 'Diary-style blog'],
      },
    },
  },
  ar: {
    dir: 'rtl' as const,
    kicker: 'بورتفوليو واحد · مزاجان',
    title: 'كيف تحب تشوفني؟',
    lead: 'نفس الشغل، نفس البيانات — بس غرفة مختلفة تشوفه فيها. اختر وحدة، والزر في الزاوية يرجّعك هنا وقت ما تبي.',
    langLabel: 'اللغة',
    enter: 'دخول',
    footNote: 'تقدر تبدّل وقت ما تبي من الزر في الزاوية.',
    personas: {
      professional: {
        kind: 'المحترف',
        name: 'المطوّر',
        desc: 'واجهة طرفية، تحريرية، داكنة. النسخة الجاهزة للتوظيف — مشاريع، أدوات، خبرات، وكتابة.',
        features: ['طرفية ونوافذ كود', 'مشاريع بأسلوب دراسة حالة', 'سيرة وشهادات'],
      },
      personal: {
        kind: 'الشخصي',
        name: 'الدفتر',
        desc: 'دفتر مدرسي تسعيناتي — ورق مسطّر، شريط لاصق، ونجوم ذهبية. نفس السيرة، بأسلوب يوميات.',
        features: ['رسم يدوي ومرح', 'مشاريع بأسلوب ألبوم ملصقات', 'مدونة بأسلوب يوميات'],
      },
    },
  },
} as const;

const ORDER: Persona[] = ['professional', 'personal'];

export function PickerView() {
  const root = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<Lang>('en');
  const t = STRINGS[lang];

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Entrance
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(`.${s.head}`, { y: -16, autoAlpha: 0, duration: 0.5 })
          .from(`.${s.kicker}`, { y: 14, autoAlpha: 0, duration: 0.5 }, '-=0.2')
          .from(`.${s.title}`, { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.3')
          .from(`.${s.lead}`, { y: 16, autoAlpha: 0, duration: 0.5 }, '-=0.4')
          .from(
            `.${s.personaCard}`,
            { y: 34, autoAlpha: 0, duration: 0.65, stagger: 0.14 },
            '-=0.2',
          )
          .from(`.${s.footNote}`, { autoAlpha: 0, duration: 0.4 }, '-=0.2');

        // Magnetic 3D tilt — the card leans toward the cursor.
        const cards = gsap.utils.toArray<HTMLElement>(
          root.current?.querySelectorAll(`.${s.personaCard}`) ?? [],
        );
        const cleanups: Array<() => void> = [];
        cards.forEach((card) => {
          const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
          const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });
          const lift = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3' });
          const move = contextSafe!((e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            rotY(px * 9);
            rotX(-py * 9);
            lift(-10);
          });
          const leave = contextSafe!(() => {
            rotY(0);
            rotX(0);
            lift(0);
          });
          card.addEventListener('pointermove', move);
          card.addEventListener('pointerleave', leave);
          cleanups.push(() => {
            card.removeEventListener('pointermove', move);
            card.removeEventListener('pointerleave', leave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang] },
  );

  return (
    <div className={s.root} dir={t.dir} ref={root}>
      <div className={s.bg} aria-hidden />
      <div className={s.bgDots} aria-hidden />
      <ParticleField count={46} parallax={false} className={s.particles} />

      <header className={s.head}>
        <div className={s.brandRow}>
          <span className={s.brandMark}>◆</span>
          <span className={s.brandName}>Dhaifallah Alfarawi</span>
        </div>

        <div className={s.langToggle} role="group" aria-label={t.langLabel}>
          <span className={s.langToggleLabel}>{t.langLabel}</span>
          <button
            type="button"
            className={`${s.langChip} ${lang === 'en' ? s.langChipActive : ''}`}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
          <button
            type="button"
            className={`${s.langChip} ${lang === 'ar' ? s.langChipActive : ''}`}
            onClick={() => setLang('ar')}
            aria-pressed={lang === 'ar'}
          >
            ع
          </button>
        </div>
      </header>

      <main className={s.stage}>
        <span className={s.kicker}>{t.kicker}</span>
        <h1 className={s.title}>{t.title}</h1>
        <p className={s.lead}>{t.lead}</p>

        <div className={s.personaGrid}>
          {ORDER.map((persona) => {
            const p = t.personas[persona];
            return (
              <Link
                key={persona}
                href={ROUTES[persona][lang]}
                className={`${s.personaCard} ${s[persona]}`}
                aria-label={p.name}
              >
                <div className={s.personaFrame}>
                  {persona === 'professional' ? (
                    <ProPreview lang={lang} />
                  ) : (
                    <NotebookPreview lang={lang} />
                  )}
                </div>

                <div className={s.personaBody}>
                  <span className={s.personaKind}>{p.kind}</span>
                  <span className={s.personaName}>{p.name}</span>
                  <p className={s.personaDesc}>{p.desc}</p>
                  <ul className={s.personaFeatures}>
                    {p.features.map((f) => (
                      <li key={f}>
                        <span className={s.featureDot} aria-hidden>
                          {persona === 'professional' ? '▹' : '★'}
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className={s.personaEnter}>
                    {t.enter} {t.dir === 'rtl' ? '←' : '→'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className={s.footNote}>{t.footNote}</p>
      </main>
    </div>
  );
}

/* ===========================================================
   Mini previews — CSS-only replicas of each real theme.
   =========================================================== */
function ProPreview({ lang }: { lang: Lang }) {
  const isAr = lang === 'ar';
  return (
    <div className={s.previewPro}>
      <div className={s.proGrid} aria-hidden />
      <div className={s.proStatus}>
        <span className={s.proDotLive} /> available · riyadh
      </div>
      <div className={s.proHeadline}>
        Front-end
        <br />
        <span className={s.proHeadlineHi}>engineer</span>
      </div>
      <div className={s.proTerminal}>
        <span className={s.proDim}>$</span> whoami
        <br />
        <span className={s.proDim}>&gt;</span> {isAr ? 'مهندس واجهات' : 'react · next · ts'}
        <span className={s.proCursor}>▋</span>
      </div>
    </div>
  );
}

function NotebookPreview({ lang }: { lang: Lang }) {
  const isAr = lang === 'ar';
  return (
    <div className={s.previewNotebook}>
      <span className={s.notebookHole} style={{ top: '20%' }} />
      <span className={s.notebookHole} style={{ top: '50%' }} />
      <span className={s.notebookHole} style={{ top: '80%' }} />
      <span className={s.notebookMargin} />
      <span className={`${s.notebookTape} ${s.notebookTapeTL}`} />
      <span className={`${s.notebookTape} ${s.notebookTapeBR}`} />
      <div
        className={s.notebookText}
        style={{ fontFamily: isAr ? 'var(--pick-ar-hand)' : 'var(--pick-notebook)' }}
      >
        {isAr ? 'دفتر ضيف' : "dhaif's notebook"}
      </div>
      <div
        className={s.notebookSub}
        style={{ fontFamily: isAr ? 'var(--pick-ar-body)' : 'var(--pick-notebook)' }}
      >
        {isAr ? '★ مهندس برمجيات ★' : '★ software engineer ★'}
      </div>
    </div>
  );
}
