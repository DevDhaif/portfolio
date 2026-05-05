import Link from 'next/link';
import Image from 'next/image';
import { loadExperimentData, getMonogram } from '@/lib/experiments-data';
import { SOCIAL_LINKS, AUTHOR } from '@/lib/constants';
import s from './qamariya.module.css';
import {
  ArchDivider,
  ArchDividerLight,
  BrandMark,
  Qamariya,
  SanaaSkyline,
} from './svg';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const PROJECT_TINTS = ['projectCobalt', 'projectRuby', 'projectEmerald', 'projectAmber'] as const;

export default async function QamariyaPage() {
  const { projects, certificates, posts, postsCount } = await loadExperimentData();

  return (
    <div className={s.root}>
      <div className={s.plasterTexture} />
      <div className={s.grain} />

      <div className={s.shell}>
        <header className={s.topBar}>
          <div className={s.brand}>
            <BrandMark className={s.brandMark} />
            <span>
              Dhaifallah{' '}
              <em style={{ fontStyle: 'normal', color: 'var(--ruby)' }}>·</em>{' '}
              Alfarawi
            </span>
          </div>
          <nav className={s.nav}>
            <a href="#work" className={s.navLink}>Work</a>
            <a href="#about" className={s.navLink}>About</a>
            <a href="#craft" className={s.navLink}>Craft</a>
            <a href="#experience" className={s.navLink}>Experience</a>
            <a href="#certificates" className={s.navLink}>Certificates</a>
            <a href="#words" className={s.navLink}>Words</a>
            <a href="#contact" className={s.navLink}>Contact</a>
          </nav>
          <div className={s.topBarActions}>
            <div className={s.langToggle}>
              <Link
                href="/experiments/qamariya"
                className={`${s.langBtn} ${s.langBtnActive}`}
              >
                EN
              </Link>
              <Link href="/experiments/qamariya/ar" className={s.langBtn}>
                ع
              </Link>
            </div>
            <Link href="/select" className={s.exitLink}>← Switch theme</Link>
          </div>
        </header>

        {/* ==================== HERO ==================== */}
        <section className={s.hero}>
          <div>
            <div
              className={`${s.heroLabel} ${s.animFadeUp}`}
              style={{ animationDelay: '0.05s' }}
            >
              Al-Bayda&apos; · Yemen · 1996 —
            </div>
            <h1
              className={`${s.heroName} ${s.animFadeUp}`}
              style={{ animationDelay: '0.15s' }}
            >
              Dhaifallah,
              <br />
              <span className={s.heroNameItalic}>software </span>
              engineer
              <span className={s.heroNameArabic}>ضيف الله أحمد الفروي</span>
            </h1>
            <p
              className={`${s.heroLead} ${s.animFadeUp}`}
              style={{ animationDelay: '0.3s' }}
            >
              <em>Every line earns its keep,</em> every interface ships clean
              and stays clean.
            </p>
            <p
              className={`${s.heroBody} ${s.animFadeUp}`}
              style={{ animationDelay: '0.45s' }}
            >
              5+ years in React, Next.js, TypeScript, and Laravel. I care about
              Arabic / RTL support and performance from day one. Based in
              Riyadh, open to roles.
            </p>
            <div
              className={`${s.heroCta} ${s.animFadeUp}`}
              style={{ animationDelay: '0.6s' }}
            >
              <a className={s.btn} href="#work">See the work →</a>
              <a className={`${s.btn} ${s.btnGhost}`} href="#contact">
                Open a channel
              </a>
            </div>

            <div className={s.heroStats}>
              <div className={s.heroStat}>
                <span className={s.heroStatValue}>5+</span>
                <span className={s.heroStatLabel}>Years</span>
              </div>
              <div className={s.heroStat}>
                <span className={s.heroStatValue}>{Math.max(projects.length, 12)}+</span>
                <span className={s.heroStatLabel}>Projects</span>
              </div>
              <div className={s.heroStat}>
                <span className={s.heroStatValue}>{postsCount}</span>
                <span className={s.heroStatLabel}>Posts</span>
              </div>
              <div className={s.heroStat}>
                <span className={s.heroStatValue}>{certificates.length}</span>
                <span className={s.heroStatLabel}>Certs</span>
              </div>
            </div>
          </div>

          <div
            className={`${s.qamariyaFrame} ${s.animFadeIn}`}
            style={{ animationDelay: '0.4s' }}
          >
            <Qamariya className={`${s.qamariyaSvg} ${s.animGlow}`} />
            <div className={s.lightBeam} />
            <div className={s.halftoneOverlay} />
          </div>
        </section>

        {/* ==================== PROJECTS ==================== */}
        <ArchDivider />
        <div id="work" className={s.sectionLabel}>Selected Work</div>
        <h2 className={s.sectionTitle}>
          A handful of things, <em>built to last.</em>
        </h2>

        {projects.length === 0 ? (
          <p className={s.emptyNote}>No projects published yet.</p>
        ) : (
          <section className={s.projectsGrid}>
            {projects.map((p, i) => {
              const tint = PROJECT_TINTS[i % PROJECT_TINTS.length];
              const year = p.createdAt
                ? new Date(p.createdAt).getFullYear()
                : '';
              return (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className={`${s.project} ${s[tint]}`}
                >
                  {p.mainImage ? (
                    <div className={s.projectImage}>
                      <Image
                        src={p.mainImage}
                        alt={p.name}
                        fill
                        sizes="(max-width: 700px) 90vw, 360px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className={s.projectImage}>
                      <span className={s.projectMonogram}>{getMonogram(p.name)}</span>
                    </div>
                  )}
                  <span className={s.projectNumber}>
                    № {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={s.projectTitle}>{p.name}</h3>
                  <div className={s.projectMeta}>
                    {(p.skills ?? []).slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <p className={s.projectBlurb}>{p.description}</p>
                  <div className={s.projectArrow}>
                    <span style={{ fontFamily: 'var(--qm-mono)', fontSize: 11 }}>
                      {year}
                    </span>
                    <span>visit ↗</span>
                  </div>
                </Link>
              );
            })}
          </section>
        )}

        {/* ==================== ABOUT ==================== */}
        <ArchDivider />
        <div id="about" className={s.sectionLabel}>About</div>
        <h2 className={s.sectionTitle}>
          The short version: <em>who I am</em>, what I do, what I care about.
        </h2>

        <section className={s.aboutLayout}>
          <div className={s.aboutProse}>
            <p>
              I&apos;m <strong>Dhaifallah Ahmed Alfarawi</strong>, a software
              engineer from Yemen, based in Riyadh. My day-to-day is React,
              Next.js, TypeScript, and Tailwind. When a project needs me to
              own the backend too, I reach for <em>Laravel</em>.
            </p>
            <p>
              I care about performance, accessibility, and Arabic / RTL
              support from day one — not as a retrofit. That&apos;s the
              difference between an interface that survives its first year
              and one that gets rewritten.
            </p>
            <p>
              I believe clear code and good documentation matter equally, and
              that small continuous updates beat the big rewrite that never
              ships.
            </p>
          </div>

          <div className={s.timeline}>
            {TIMELINE_EN.map((t) => (
              <div
                key={t.year}
                className={`${s.timelineItem} ${t.active ? s.active : ''}`}
              >
                <div className={s.timelineYear}>{t.year}</div>
                <div className={s.timelineTitle}>{t.title}</div>
                <div className={s.timelineBlurb}>{t.blurb}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ==================== SKILLS (full-bleed dark) ==================== */}
      <section id="craft" className={s.skillsCanvas}>
        <div className={s.skillsHalftone} />
        <div className={s.shell} style={{ padding: 0 }}>
          <ArchDividerLight />
          <div className={s.sectionLabel}>The Toolbelt</div>
          <h2 className={s.sectionTitle}>
            The tools I <em>actually use</em>, every day.
          </h2>

          <div className={s.skillCols}>
            {SKILLS_EN.map((col) => (
              <div key={col.heading} className={s.skillCol}>
                <h3>{col.heading}</h3>
                <ul>
                  {col.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={s.shell}>
        {/* ==================== EXPERIENCE ==================== */}
        <ArchDivider />
        <div id="experience" className={s.sectionLabel}>Experience</div>
        <h2 className={s.sectionTitle}>
          Where I&apos;ve <em>worked</em>, and what I shipped.
        </h2>

        <section className={s.experienceList}>
          {EXPERIENCE_EN.map((j) => (
            <article key={j.role + j.period} className={s.expRow}>
              <div className={s.expPeriod}>
                {j.period}
                {j.current && <span className={s.currentChip}>Now</span>}
              </div>
              <div className={s.expBody}>
                <h3 className={s.expRole}>{j.role}</h3>
                <div className={s.expCompany}>{j.company}</div>
                <p className={s.expBlurb}>{j.blurb}</p>
                <ul className={s.expHighlights}>
                  {j.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className={s.expChips}>
                  {j.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ==================== CERTIFICATES ==================== */}
        <ArchDivider />
        <div id="certificates" className={s.sectionLabel}>Marks of Trust</div>
        <h2 className={s.sectionTitle}>
          Stamps and seals, <em>earned along the way.</em>
        </h2>

        {certificates.length === 0 ? (
          <p className={s.emptyNote}>No certificates published yet.</p>
        ) : (
          <section className={s.certGrid}>
            {certificates.map((c) => {
              const year = c.issueDate
                ? new Date(c.issueDate).getFullYear()
                : '';
              return (
                <a
                  key={c.id}
                  href={c.urlLink || '#'}
                  target={c.urlLink ? '_blank' : undefined}
                  rel={c.urlLink ? 'noreferrer' : undefined}
                  className={s.certCard}
                >
                  <div className={s.certSeal} aria-hidden>
                    <svg viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="0.8" />
                      <path
                        d="M30 14 L33 26 L46 26 L36 33 L40 46 L30 38 L20 46 L24 33 L14 26 L27 26 Z"
                        fill="currentColor"
                        opacity="0.85"
                      />
                    </svg>
                  </div>
                  <div className={s.certIssuer}>{c.source}</div>
                  <div className={s.certName}>{c.title}</div>
                  <div className={s.certYear}>{year}</div>
                </a>
              );
            })}
          </section>
        )}

        {/* ==================== WRITING ==================== */}
        <ArchDivider />
        <div id="words" className={s.sectionLabel}>Field Notes</div>
        <h2 className={s.sectionTitle}>
          Posts, sometimes <em>opinionated.</em>
        </h2>

        {posts.length === 0 ? (
          <p className={s.emptyNote}>No posts published yet.</p>
        ) : (
          <section className={s.writingList}>
            {posts.map((p) => {
              const d = new Date(p.created_at);
              const date = `${d.getFullYear()} · ${String(d.getMonth() + 1).padStart(2, '0')}`;
              const title = p.title_en || p.title || p.title_ar || '';
              return (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className={s.writingItem}
                >
                  <span className={s.writingDate}>{date}</span>
                  <span className={s.writingTitle}>{title}</span>
                  <span className={s.writingArrow}>→</span>
                </Link>
              );
            })}
          </section>
        )}

        <div className={s.writingFooter}>
          <Link href="/blog" className={s.btn}>
            See all writing →
          </Link>
        </div>

        {/* ==================== CONTACT ==================== */}
        <ArchDivider />
        <section id="contact" className={s.contact}>
          <div className={s.sectionLabel}>Contact</div>
          <p className={s.contactQuote}>
            Open to roles and collaborations. <em>Pick whichever channel
            suits you</em> — I reply within 24 hours.
          </p>
          <div className={s.contactRow}>
            <a className={s.btn} href={`mailto:${SOCIAL_LINKS.EMAIL}`}>
              {SOCIAL_LINKS.EMAIL}
            </a>
            <a className={`${s.btn} ${s.btnGhost}`} href={`tel:${AUTHOR.phone}`}>
              <bdi dir="ltr">{AUTHOR.phone}</bdi>
            </a>
            <a
              className={`${s.btn} ${s.btnGhost}`}
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className={`${s.btn} ${s.btnGhost}`}
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              className={`${s.btn} ${s.btnGhost}`}
              href={SOCIAL_LINKS.TWITTER}
              target="_blank"
              rel="noreferrer"
            >
              X / Twitter ↗
            </a>
          </div>
        </section>
      </div>

      {/* ==================== SKYLINE ==================== */}
      <div className={s.skyline}>
        <SanaaSkyline />
      </div>

      <div className={s.shell}>
        <footer className={s.footer}>
          <span>© 2026 · Dhaifallah Alfarawi</span>
          <span><em>Al-Bayda&apos; → the world.</em></span>
        </footer>
      </div>
    </div>
  );
}

/* ===========================================================
   Static EN data
   =========================================================== */

const TIMELINE_EN = [
  { year: '1996', title: 'The start.',                    blurb: 'Born in Yemen.',                                                          active: false },
  { year: '2008', title: 'First computer.',               blurb: 'Where my obsession with computers — and everything around them — began.', active: false },
  { year: '2018', title: 'Started freelancing.',          blurb: 'First real clients — full-stack web apps in Laravel and React. Still freelancing in parallel today.', active: false },
  { year: '2020', title: 'Meraki UI Lab.',                blurb: 'Worked on a reusable component system with a unified visual identity.',                                  active: false },
  { year: '2024', title: 'Moved to Riyadh — joined ADX.', blurb: 'Front-end engineer on a full digital-signage platform.',                  active: false },
  { year: '2026', title: 'Today.',                        blurb: 'Focused on performance, accessibility, and front-end architecture.',     active: true },
];

const SKILLS_EN = [
  {
    heading: 'Foundation',
    items: ['HTML', 'CSS', 'TypeScript', 'Accessibility · WCAG', 'RTL / LTR support'],
  },
  {
    heading: 'Frameworks',
    items: ['React 18 / 19', 'Next.js 15 + RSC', 'Tailwind + tokens', 'Vue.js', 'React Query · Zustand', 'Framer Motion · GSAP', 'dnd-kit · i18next'],
  },
  {
    heading: 'Backend & data',
    items: ['Laravel / PHP', 'MySQL', 'Supabase', 'Firebase', 'REST · RSC'],
  },
  {
    heading: 'Operating',
    items: ['Vercel · Cloudflare', 'Git · GitHub', 'Vite · npm · pnpm', 'Caching strategy', 'Core Web Vitals', 'NestJS (learning)'],
  },
];

const EXPERIENCE_EN = [
  {
    period: '11/2024 — Now',
    role: 'Front-End Developer',
    company: 'ADX · Riyadh',
    current: true,
    blurb:
      'Building a full digital-signage platform end-to-end — campaign simulator, drag-and-drop playlist tool, in-browser image editor, admin console with RBAC.',
    highlights: [
      "Built 'Try ADx' — a client-side campaign simulator that detects aspect-ratio and previews media instantly over custom graphics.",
      'Shipped a drag-and-drop playlist + media tool with in-browser image editing and template builder via dnd-kit.',
      'Wired the web signage player to 6 micro-service APIs (content, scheduling, analytics, devices, users, media) with sync + recovery.',
      'Owned the admin console with RBAC across 8+ roles tied to per-site permissions.',
      'AR (RTL) + EN (LTR) support via i18next, semantic HTML, WCAG-compliant throughout.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'React Query', 'Tailwind CSS', 'dnd-kit', 'i18next'],
  },
  {
    period: '01/2018 — Now',
    role: 'Full-Stack Developer (Freelance)',
    company: 'Independent',
    current: true,
    blurb:
      'End-to-end web apps across domains. Front-end-led, extends into backend. Deployed on Vercel and Digital Ocean.',
    highlights: [
      'Delivered 5+ full web apps from idea to deployment.',
      'Hit Lighthouse 90+ (e.g. Miyar Capital) via dynamic imports, code-splitting, image optimization, DevTools profiling.',
      'Cut page load 30–40% via Core Web Vitals work; search rankings improved.',
      'RESTful APIs in Laravel + MySQL with 99.5% uptime.',
      'Shipped motion + micro-interactions with CSS animations, Framer Motion, and GSAP.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Laravel', 'MySQL', 'Supabase', 'Framer Motion', 'GSAP'],
  },
  {
    period: '05/2020 — 11/2024',
    role: 'Front-End Developer',
    company: 'Meraki UI Lab',
    current: false,
    blurb:
      'Reusable, accessible component systems with consistent visual identity for cross-functional product teams.',
    highlights: [
      'Lifted site visits 20% in 6 months via load speed + content clarity.',
      'Shipped 150+ reusable components in a unified system; dev time fell 35%.',
      '100% RTL coverage with semantic HTML and ARIA; Arabic-user engagement +27%.',
      'Delivered interfaces with 95% client satisfaction in a 4-person cross-functional team.',
    ],
    stack: ['React.js', 'TailwindCSS', 'JavaScript', 'HTML5', 'CSS3', 'WCAG'],
  },
];
