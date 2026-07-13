import Link from 'next/link';
import Image from 'next/image';
import { loadExperimentData, getMonogram } from '@/lib/experiments-data';
import { SOCIAL_LINKS, AUTHOR } from '@/lib/constants';
import s from './notebook.module.css';
import { RiyadhClockNotebook } from './riyadh-clock';
import { NotebookMotion } from './notebook-motion';
import { NotebookDeck, type DeckPage } from './notebook-deck';

export const revalidate = 60;

const ENGLISH_MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

const STICKER_COLORS = ['#1d8f5c', '#ff7a2d', '#0e7c86', '#2fc163', '#ffd23a', '#36c5e8'];

const PAGES: DeckPage[] = [
  { id: 'home', label: 'the cover' },
  { id: 'about', label: 'about me' },
  { id: 'projects', label: 'my sticker book' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'certs', label: 'gold stars' },
  { id: 'diary', label: 'diary' },
  { id: 'contact', label: 'say hi' },
];

const DECK_COPY = {
  turn: 'keep going — turn the page ↴',
  last: 'the end · thanks for reading',
  prev: 'previous page',
  next: 'next page',
  page: 'page',
};

/* ===========================================================
   Page — the SAME data as the professional theme, told like a
   90s composition book.
   =========================================================== */
export default async function NotebookPage() {
  const { projects, certificates, posts, postsCount } = await loadExperimentData({
    projectsLimit: 12,
    postsLimit: 6,
  });

  return (
    <div className={s.root}>
      <div className={s.ruled} />
      <div className={s.paperGrain} />
      <div className={s.stain} />
      <div className={s.binderHoles} />
      <div className={s.marginLine} />
      <NotebookMotion />

      <div className={s.shell}>
        <Hopscotch className={s.hopscotch} />

        <NotebookDeck
          dir="ltr"
          pages={PAGES}
          copy={DECK_COPY}
          header={
            <header className={s.topBar}>
              <div className={s.brand}>
                <span className={s.doodleStar}>★</span>
                <span>dhaif&apos;s notebook</span>
                <span className={s.doodleStar}>★</span>
              </div>
              <nav className={s.nav}>
                <a className={s.navLink} href="#about">about</a>
                <a className={s.navLink} href="#projects">work</a>
                <a className={s.navLink} href="#skills">skills</a>
                <a className={s.navLink} href="#experience">experience</a>
                <a className={s.navLink} href="#certs">certs</a>
                <a className={s.navLink} href="#diary">diary</a>
                <a className={s.navLink} href="#contact">say hi</a>
              </nav>
              <div className={s.langToggle}>
                <Link href="/note" className={`${s.langBtn} ${s.langBtnActive}`}>EN</Link>
                <Link href="/note/ar" className={s.langBtn}>ع</Link>
              </div>
            </header>
          }
        >
        {/* ==================== HERO ==================== */}
        <section id="home" className={s.hero}>
          <div className={s.heroBlurb}>
            <div className={`${s.heroKicker} ${s.animFadeUp}`} style={{ animationDelay: '0.05s' }}>
              hi, i&apos;m —
            </div>
            <h1 className={s.heroName} data-nb-title>
              <span className={s.heroNameUnderline}>Dhaifallah</span>,
              <br />
              software <em style={{ color: 'var(--margin-red)' }}>engineer.</em>
            </h1>
            <p className={`${s.heroSub} ${s.animFadeUp}`} style={{ animationDelay: '0.3s' }}>
              front-end engineer · building interfaces that hold up
            </p>
            <p className={`${s.heroBody} ${s.animFadeUp}`} style={{ animationDelay: '0.45s' }}>
              5+ years in React, Next.js, TypeScript &amp; Laravel. I care about
              performance, accessibility, and first-class Arabic RTL — not as an
              afterthought. Based in Riyadh, and open to new work. This is the same
              résumé as my main site, just scribbled in the margins.
            </p>
            <div className={`${s.heroCta} ${s.animFadeUp}`} style={{ animationDelay: '0.6s' }}>
              <a className={`${s.btn} ${s.btnYellow}`} href="#projects">flip to work →</a>
              <a className={`${s.btn} ${s.btnBlue}`} href="#contact">pass a note</a>
            </div>
          </div>

          <div className={s.bookCover} data-nb-cover>
            <div className={s.coverDoodles} aria-hidden>
              <div className={`${s.tape} ${s.tapeTopLeft}`} />
              <div className={`${s.tape} ${s.tapeTopRight}`} />
            </div>
            <div className={s.coverSubject}>
              MY<br />PORTFOLIO
            </div>
            <div className={s.coverLabel}>
              <div className={s.coverLabelTop}>NAME</div>
              <div className={s.coverLabelName}>Dhaifallah</div>
              <div className={s.coverLabelMeta}>years · 5+ · riyadh</div>
              <div className={s.coverLabelArabic}>ضيف الله الفروي</div>
            </div>
            <div className={`${s.tape} ${s.tapeBottom}`} />
          </div>

          <span className={s.heroNote}>* TURN THE PAGE</span>
        </section>

        {/* ==================== ABOUT ==================== */}
        <section id="about" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>CHAPTER 01</span>
            <h2 className={s.sectionTitle}>about me, in lined paper</h2>
          </div>
          <p className={s.sectionLead}>
            short version: who i am, where i work, what i stand for, and what i can
            build for you.
          </p>

          {/* Stats row — mirrors the live bento */}
          <div className={s.statsRow}>
            <div className={s.statCell}><span className={s.statLabel}>years</span><span className={s.statValue}>5+</span></div>
            <div className={s.statCell}><span className={s.statLabel}>projects</span><span className={s.statValue}>12+</span></div>
            <div className={s.statCell}><span className={s.statLabel}>clients</span><span className={s.statValue}>10+</span></div>
            <div className={s.statCell}><span className={s.statLabel}>posts</span><span className={s.statValue}>{postsCount}</span></div>
          </div>

          <div className={s.aboutLayout}>
            <div className={s.aboutProse}>
              <p>
                i&apos;m <strong>Dhaifallah Ahmed Alfarawi</strong>, a software
                engineer based in <mark>Riyadh</mark>. day to day that&apos;s React,
                Next.js, TypeScript, and Tailwind. when a project needs a full
                backend, i reach for Laravel.
              </p>
              <p>
                i care about <strong>performance</strong>, <strong>usability</strong>,
                and <strong>Arabic RTL</strong> from the start — not bolted on at the
                end. that&apos;s what keeps an interface from cracking after its first
                year.
              </p>
            </div>

            <div className={s.aboutCards}>
              <div className={s.factCardNB}>
                <div className={s.factCardLabel}>where i am</div>
                <div className={s.factCardValue}>Riyadh, Saudi Arabia</div>
              </div>
              <div className={s.factCardNB}>
                <div className={s.factCardLabel}>local time</div>
                <RiyadhClockNotebook />
              </div>
            </div>
          </div>

          {/* Principles + Services */}
          <div className={s.aboutGrid}>
            <div className={s.principlesCard}>
              <div className={s.principlesHeader}>
                <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
                <span className={s.principlesFile}>~/principles.json</span>
              </div>
              <ul className={s.principlesList}>
                {PRINCIPLES.map((p) => (
                  <li key={p.kw}>
                    <span className={s.principleKey}>{p.kw}</span>
                    <span className={s.principleSep}>:</span>
                    <span className={s.principleVal}>{p.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.servicesCard}>
              <div className={s.servicesHeader}>{'// services'}</div>
              <ul className={s.servicesList}>
                {SERVICES.map((sv) => (
                  <li key={sv.title} className={s.serviceItem}>
                    <h4 className={s.serviceTitle}>{sv.title}</h4>
                    <p className={s.serviceDesc}>{sv.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ==================== PROJECTS ==================== */}
        <section id="projects" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>CHAPTER 02</span>
            <h2 className={s.sectionTitle}>my sticker book</h2>
          </div>
          <p className={s.sectionLead}>
            production work — front-end and full-stack apps. every project is a card
            in the album. tap one to open it.
          </p>

          {projects.length === 0 ? (
            <p className={s.emptyNote}>no published projects yet.</p>
          ) : (
            <div className={s.stickerGrid}>
              {projects.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  data-reveal
                  className={s.stickerCard}
                  style={{ ['--card-color' as string]: STICKER_COLORS[i % STICKER_COLORS.length] }}
                >
                  <div className={s.stickerArt}>
                    <span className={s.cardNumber}>№ {String(i + 1).padStart(3, '0')}</span>
                    {p.mainImage ? (
                      <Image
                        src={p.mainImage}
                        alt={p.name}
                        fill
                        sizes="(max-width: 800px) 50vw, 280px"
                        className={s.stickerImage}
                      />
                    ) : (
                      <span className={s.stickerMonogram}>{getMonogram(p.name)}</span>
                    )}
                  </div>
                  <div className={s.stickerInfo}>
                    <span className={s.stickerTitle}>{p.name}</span>
                    <div className={s.stickerStats}>
                      {(p.skills ?? []).slice(0, 4).map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <p className={s.stickerBlurb}>{p.description}</p>
                    <div className={s.stickerFoot}>
                      <span>{p.createdAt ? new Date(p.createdAt).getFullYear() : ''}</span>
                      <span>peek inside →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ==================== SKILLS ==================== */}
        <section id="skills" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>CHAPTER 03</span>
            <h2 className={s.sectionTitle}>things i can actually do</h2>
          </div>
          <p className={s.sectionLead}>
            what i use daily, plus the rest of the kit. checked = on the back of my
            hand. unchecked = i&apos;m getting there (and i&apos;ll tell you the truth
            either way).
          </p>

          <div className={s.checklist}>
            <div className={s.checkCols}>
              {SKILL_GROUPS.map((col) => (
                <div key={col.heading} className={s.checkCol}>
                  <h3>{col.heading}</h3>
                  <ul>
                    {col.items.map((it) => (
                      <li key={it.name} className={it.done ? s.done : ''}>
                        {it.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== EXPERIENCE ==================== */}
        <section id="experience" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>CHAPTER 04</span>
            <h2 className={s.sectionTitle}>where the hours went</h2>
          </div>
          <p className={s.sectionLead}>
            taped-in resume pages. each piece of paper is a stop along the way.
          </p>

          <div className={s.resumeStack}>
            {EXPERIENCE.map((j, i) => (
              <article key={j.role + j.period} data-reveal className={s.resumePaper}>
                <div className={s.resumeTape} aria-hidden />
                <div className={s.resumePeriod}>
                  {j.period}
                  {j.current && <span className={s.currentChip}>now</span>}
                </div>
                <h3 className={s.resumeRole}>{j.role}</h3>
                <div className={s.resumeCompany}>{j.company}</div>
                <p className={s.resumeBlurb}>{j.description}</p>
                <ul className={s.resumeAchievements}>
                  {j.achievements.map((a, k) => (
                    <li key={k}>
                      <span className={s.resumeBullet}>✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                <div className={s.resumeChips}>
                  {j.skills.map((sk) => <span key={sk} className={s.resumeChip}>{sk}</span>)}
                </div>
                <span className={s.resumeIndex}>№ {String(i + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ==================== CERTIFICATES ==================== */}
        <section id="certs" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>CHAPTER 05</span>
            <h2 className={s.sectionTitle}>gold star collection</h2>
          </div>
          <p className={s.sectionLead}>
            certificates from online courses — LinkedIn Learning, freeCodeCamp, PMI
            and more. all earned with caffeine and stubbornness.
          </p>

          {certificates.length === 0 ? (
            <p className={s.emptyNote}>no published certificates yet.</p>
          ) : (
            <div className={s.starGrid}>
              {certificates.map((c) => (
                <a
                  key={c.id}
                  href={c.urlLink || '#'}
                  target={c.urlLink ? '_blank' : undefined}
                  rel="noreferrer"
                  data-reveal
                  className={s.starCard}
                >
                  <div className={s.starShape} aria-hidden>
                    <svg viewBox="0 0 60 60">
                      <path d="M30 4 L37 22 L56 22 L41 33 L47 52 L30 41 L13 52 L19 33 L4 22 L23 22 Z"
                        fill="currentColor" stroke="var(--ink-black)" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className={s.starIssuer}>{c.source}</div>
                  <div className={s.starName}>{c.title}</div>
                  <div className={s.starYear}>
                    {c.issueDate ? new Date(c.issueDate).getFullYear() : ''}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* ==================== DIARY / BLOG ==================== */}
        <section id="diary" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>CHAPTER 06</span>
            <h2 className={s.sectionTitle}>diary entries</h2>
          </div>
          <p className={s.sectionLead}>
            posts and field notes from the blog. latest first.
          </p>

          {posts.length === 0 ? (
            <p className={s.emptyNote}>no published posts yet.</p>
          ) : (
            <div className={s.diaryList}>
              {posts.map((p) => {
                const d = new Date(p.created_at);
                const day = d.getDate().toString().padStart(2, '0');
                const month = `${ENGLISH_MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
                const title = p.title_en || p.title || p.title_ar || '';
                return (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    data-reveal
                    className={s.diaryEntry}
                    data-day={day}
                    data-month={month}
                  >
                    <span className={s.diaryTitle}>{title}</span>
                    <span className={s.diaryArrow}>→</span>
                  </Link>
                );
              })}
            </div>
          )}

          <div className={s.diaryFooter}>
            <Link href="/blog" className={`${s.btn} ${s.btnYellow}`}>read all posts →</Link>
          </div>
        </section>

        {/* ==================== CONTACT ==================== */}
        <section id="contact" className={s.section}>
          <div className={s.contactWrap}>
            <div className={s.pouch}>
              <div className={s.pouchPattern} />
              <h2 className={s.pouchTitle}>knock on the door.</h2>
              <p className={s.pouchLead}>
                available for work and collaboration — i reply within 24 hours. pick
                whichever way to reach me you like.
              </p>
              <div className={s.pouchItems}>
                <a className={s.candy} href={`mailto:${SOCIAL_LINKS.EMAIL}`} style={{ ['--candy-color' as string]: 'var(--st-yellow)' }}>
                  ✉ {SOCIAL_LINKS.EMAIL}
                </a>
                <a className={s.candy} href={`tel:${AUTHOR.phone}`} style={{ ['--candy-color' as string]: 'var(--st-orange)' }}>
                  ☎ {AUTHOR.phone}
                </a>
                <a className={s.candy} href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noreferrer" style={{ ['--candy-color' as string]: 'var(--st-cyan)' }}>
                  ◆ github
                </a>
                <a className={s.candy} href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" style={{ ['--candy-color' as string]: 'var(--st-teal)', color: 'white' }}>
                  ▲ linkedin
                </a>
              </div>
            </div>
          </div>

          <footer className={s.footer}>
            <span>© 2026 · scribbled in pencil · dhaifallah alfarawi</span>
            <span className={s.grade}>SEEN · A+</span>
          </footer>
        </section>
        </NotebookDeck>
      </div>
    </div>
  );
}

/* ===========================================================
   Static copy — the same facts as the professional theme.
   =========================================================== */

const PRINCIPLES = [
  { kw: 'ship', val: 'small · often · honest' },
  { kw: 'owns', val: 'ui · api · scope' },
  { kw: 'values', val: 'clarity · perf · a11y' },
  { kw: 'rejects', val: 'scope creep · magic · ceremony' },
  { kw: 'tests', val: 'real db · real users' },
  { kw: 'writes', val: 'diffs > docs' },
];

const SERVICES = [
  { title: 'front-end engineering', desc: 'React, Next.js, TypeScript, Tailwind.' },
  { title: 'full-stack work', desc: 'Laravel, PHP, MySQL, Supabase.' },
  { title: 'design implementation', desc: 'pixel-true designs in clean code.' },
  { title: 'system & UI architecture', desc: 'component systems, render strategy.' },
  { title: 'product ownership', desc: 'requirements, analysis, UML, scope.' },
  { title: 'SEO & performance', desc: 'schemas, Core Web Vitals, ranking.' },
];

const SKILL_GROUPS = [
  {
    heading: 'the stars',
    items: [
      { name: 'React (Next.js + RSC)', done: true },
      { name: 'TypeScript', done: true },
      { name: 'Tailwind CSS', done: true },
      { name: 'accessibility · WCAG', done: true },
      { name: 'RTL / LTR support', done: true },
    ],
  },
  {
    heading: 'front-end',
    items: [
      { name: 'HTML, CSS, JavaScript', done: true },
      { name: 'Vue.js', done: true },
      { name: 'React Query', done: true },
      { name: 'Zustand', done: true },
      { name: 'Framer Motion · GSAP', done: true },
      { name: 'dnd-kit, i18next', done: true },
    ],
  },
  {
    heading: 'back-end',
    items: [
      { name: 'PHP / Laravel', done: true },
      { name: 'MySQL', done: true },
      { name: 'Supabase', done: true },
      { name: 'Firebase', done: true },
      { name: 'Edge / Serverless', done: true },
    ],
  },
  {
    heading: 'the kit',
    items: [
      { name: 'Git, GitHub', done: true },
      { name: 'VS Code, Postman', done: true },
      { name: 'Vercel, Vite', done: true },
      { name: 'npm, pnpm', done: true },
      { name: 'NestJS (learning)', done: false },
    ],
  },
];

const EXPERIENCE: {
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  skills: string[];
  achievements: string[];
}[] = [
  {
    role: 'front-end engineer',
    company: 'ADX · Riyadh',
    period: '11/2024 — present',
    current: true,
    description:
      'building a digital signage platform end-to-end — campaign simulator, drag-and-drop playlist tool, and a multi-tenant management dashboard.',
    skills: ['React', 'Next.js', 'TypeScript', 'Zustand', 'React Query', 'Tailwind CSS', 'dnd-kit', 'i18next'],
    achievements: [
      "Architected the 'Try ADx' virtual campaign simulator with client-side aspect-ratio detection for instant media preview on custom illustrations.",
      'Built a drag-and-drop playlist and media-creation tool with in-browser image editing and a template maker using dnd-kit.',
      'Established Arabic RTL / English LTR support with i18next, following WCAG and semantic HTML across the platform.',
      'Integrated the web-based signage player with 6 microservices APIs (content, scheduling, analytics, devices, users, media) with sync + recovery.',
      'Constructed the core management dashboard with multi-tenant support and an 8+ role RBAC system with location-based permissions.',
    ],
  },
  {
    role: 'full-stack freelance developer',
    company: 'Independent',
    period: '01/2018 — present',
    current: true,
    description:
      'end-to-end web apps across diverse domains — frontend-led with full-stack reach, deployed on Vercel and Digital Ocean.',
    skills: ['React', 'Next.js', 'TypeScript', 'Laravel', 'MySQL', 'Supabase', 'Framer Motion', 'GSAP'],
    achievements: [
      'Delivered 5+ complete web applications from concept to deployment.',
      'Achieved 90+ Lighthouse scores (e.g. Miyar Capital) via dynamic imports, code splitting, image optimization, and DevTools profiling.',
      'Cut page load times 30–40% through Core Web Vitals work, lifting search rankings.',
      'Built RESTful APIs with Laravel and MySQL with 99.5% uptime.',
      'Shipped polished motion and micro-interactions with CSS animations, Framer Motion, and GSAP.',
    ],
  },
  {
    role: 'front-end developer',
    company: 'Meraki UI Lab',
    period: '05/2020 — 11/2024',
    current: false,
    description:
      'crafted reusable, accessible component systems with a consistent brand identity for cross-functional product teams.',
    skills: ['React.js', 'TailwindCSS', 'JavaScript', 'HTML5', 'CSS3', 'WCAG'],
    achievements: [
      'Increased website traffic by 20% within six months by optimizing page load speed and content clarity.',
      'Shipped 150+ reusable components with consistent brand identity, cutting development time by 35%.',
      'Applied RTL support for 100% of components with semantic HTML and ARIA, lifting Arabic-speaking engagement by 27%.',
      'Delivered interfaces with 95% client satisfaction inside a 4-person cross-functional team.',
    ],
  },
];

/* ===========================================================
   Hopscotch SVG (margin doodle)
   =========================================================== */
function Hopscotch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g stroke="#4f4537" strokeWidth="1.5" fill="none" strokeLinejoin="round">
        <rect x="20" y="208" width="22" height="26" />
        <text x="31" y="226" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">1</text>
        <rect x="20" y="178" width="22" height="26" />
        <text x="31" y="196" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">2</text>
        <rect x="20" y="148" width="22" height="26" />
        <text x="31" y="166" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">3</text>
        <rect x="6" y="118" width="22" height="26" />
        <rect x="34" y="118" width="22" height="26" />
        <text x="17" y="136" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">4</text>
        <text x="45" y="136" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">5</text>
        <rect x="20" y="88" width="22" height="26" />
        <text x="31" y="106" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">6</text>
        <rect x="6" y="58" width="22" height="26" />
        <rect x="34" y="58" width="22" height="26" />
        <text x="17" y="76" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">7</text>
        <text x="45" y="76" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">8</text>
        <path d="M14 28 Q31 14 48 28 L48 54 L14 54 Z" />
        <text x="31" y="46" fontFamily="cursive" fontSize="12" fill="#4f4537" textAnchor="middle">sky</text>
      </g>
    </svg>
  );
}
