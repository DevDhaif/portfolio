import Link from 'next/link';
import s from './notebook.module.css';

export default function NotebookPage() {
  return (
    <div className={s.root}>
      {/* Site-wide paper texture layers */}
      <div className={s.ruled} />
      <div className={s.paperGrain} />
      <div className={s.stain} />
      <div className={s.binderHoles} />
      <div className={s.marginLine} />

      <div className={s.shell}>
        <header className={s.topBar}>
          <div className={s.brand}>
            <span className={s.doodleStar}>★</span>
            <span>dhaif&apos;s portfolio</span>
            <span className={s.doodleStar}>★</span>
          </div>
          <nav className={s.nav}>
            <a className={s.navLink} href="#work">work</a>
            <a className={s.navLink} href="#about">about</a>
            <a className={s.navLink} href="#skills">skills</a>
            <a className={s.navLink} href="#diary">diary</a>
            <a className={s.navLink} href="#contact">say hi</a>
          </nav>
          <div className={s.langToggle}>
            <Link href="/experiments/notebook" className={`${s.langBtn} ${s.langBtnActive}`}>EN</Link>
            <Link href="/experiments/notebook/ar" className={s.langBtn}>ع</Link>
          </div>
          <Link href="/" className={s.exitLink}>← exit experiment</Link>
        </header>

        {/* Floating margin doodles */}
        <Hopscotch className={s.hopscotch} />
        <span className={s.marginDoodle} style={{ left: -54, top: 540, fontSize: 22, transform: 'rotate(-12deg)' }}>↓ start here</span>
        <span className={s.marginDoodle} style={{ left: -42, top: 920, fontSize: 28, color: 'var(--margin-red)' }}>★</span>
        <span className={s.marginDoodle} style={{ left: -52, top: 1480, fontSize: 18 }}>page 4 →</span>

        {/* ==================== HERO ==================== */}
        <section className={s.hero}>
          <div className={s.heroBlurb}>
            <div className={`${s.heroLabel} ${s.animFadeUp}`} style={{ animationDelay: '0.05s' }}>
              property of —
            </div>
            <h1 className={`${s.heroName} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
              <span className={s.heroNameUnderline}>Dhaifallah</span>,
              <br />
              kid from <em style={{ color: 'var(--margin-red)' }}>1996.</em>
            </h1>
            <p className={`${s.heroSub} ${s.animFadeUp}`} style={{ animationDelay: '0.3s' }}>
              front-end engineer · still scribbling in the margins
            </p>
            <p className={`${s.heroBody} ${s.animFadeUp}`} style={{ animationDelay: '0.45s' }}>
              this is the third experiment in my portfolio — the messy one.
              the other two were a TV and a courtyard. this one is the
              composition book i never quite stopped doodling in. work, life,
              the spacetoon afternoons, and the games we played in the dirt.
            </p>
            <div className={`${s.heroCta} ${s.animFadeUp}`} style={{ animationDelay: '0.6s' }}>
              <a className={`${s.btn} ${s.btnYellow}`} href="#work">flip to work →</a>
              <a className={`${s.btn} ${s.btnPink}`} href="#contact">pass a note</a>
            </div>
          </div>

          <div className={`${s.bookCover} ${s.animWobble}`}>
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
              <div className={s.coverLabelMeta}>grade · senior · class of life</div>
              <div className={s.coverLabelArabic}>ضيف الله الفروي</div>
            </div>
            <div className={`${s.tape} ${s.tapeBottom}`} />
          </div>

          <span className={s.heroNote}>* TURN THE PAGE</span>
        </section>

        {/* ==================== WORK ==================== */}
        <section id="work" className={s.section}>
          <div className={s.sectionHeader}>
            <span className={s.sectionNumber}>CHAPTER 01</span>
            <h2 className={s.sectionTitle}>my sticker book</h2>
          </div>
          <p className={s.sectionLead}>
            every project is a card. trade no friends. some are common, some
            are foil. tap one to flip it over.
          </p>

          <div className={s.stickerGrid}>
            {PROJECTS.map((p, i) => (
              <a
                key={p.title}
                href="#"
                className={s.stickerCard}
                style={{ ['--card-color' as string]: p.color }}
              >
                <div className={s.stickerArt}>
                  <span className={s.rarityBadge}>{p.rarity}</span>
                  <span className={s.cardNumber}>№ {String(i + 1).padStart(3, '0')}</span>
                  <span className={s.stickerMonogram}>{p.monogram}</span>
                </div>
                <div className={s.stickerInfo}>
                  <span className={s.stickerTitle}>{p.title}</span>
                  <div className={s.stickerStats}>
                    {p.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <p className={s.stickerBlurb}>{p.blurb}</p>
                  <div className={s.stickerFoot}>
                    <span>{p.year}</span>
                    <span>peek inside →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ==================== ABOUT ==================== */}
        <section id="about" className={s.section}>
          <div className={s.sectionHeader}>
            <span className={s.sectionNumber}>CHAPTER 02</span>
            <h2 className={s.sectionTitle}>about me, in lined paper</h2>
          </div>

          <div className={s.aboutLayout}>
            <div className={s.aboutProse}>
              <p>
                hi. i&apos;m <strong>dhaif</strong>, born in yemen in 1996, raised
                on <mark>spacetoon afternoons</mark> and dust-covered backyards.
                i still remember the exact thump of seven flat stones stacking
                up before someone&apos;s knee scattered them.
              </p>
              <p>
                most days now i write react, next.js, and typescript for a
                living. nights i argue with css and lose. weekends i try to
                <strong> sharpen the architecture muscle</strong> — server
                components, caching, the boring-on-paper stuff that decides
                whether a system survives its second year.
              </p>
              <p>
                my portfolio comes in three flavors. you&apos;re looking at the
                messy one — the composition book version. the other two are
                upstairs: <mark>a CRT</mark> and <mark>a courtyard</mark>.
              </p>
            </div>

            <div className={s.polaroidStack}>
              {POLAROIDS.map((p) => (
                <div
                  key={p.caption}
                  className={s.polaroid}
                  style={{ ['--polaroid-color' as string]: p.color }}
                >
                  <div className={s.polaroidImg}>
                    <span className={s.polaroidGlyph}>{p.glyph}</span>
                  </div>
                  <div className={s.polaroidCaption}>{p.caption}</div>
                  <div className={s.polaroidYear}>{p.year}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SKILLS ==================== */}
        <section id="skills" className={s.section}>
          <div className={s.sectionHeader}>
            <span className={s.sectionNumber}>CHAPTER 03</span>
            <h2 className={s.sectionTitle}>things i can actually do</h2>
          </div>
          <p className={s.sectionLead}>
            checked = on the back of my hand. unchecked = i&apos;m getting there
            (and i&apos;ll tell you the truth either way).
          </p>

          <div className={s.checklist}>
            <div className={s.checkCols}>
              {SKILLS.map((col) => (
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

        {/* ==================== EXPERIENCE — RESUME PAGE ==================== */}
        <section id="experience" className={s.section}>
          <div className={s.sectionHeader}>
            <span className={s.sectionNumber}>CHAPTER 04</span>
            <h2 className={s.sectionTitle}>where i&apos;ve worked</h2>
          </div>
          <p className={s.sectionLead}>
            taped-in resume page. each piece of paper is a stop along the way,
            scribbled in the morning of a slow workday.
          </p>

          <div className={s.resumeStack}>
            {EXPERIENCE.map((j, i) => (
              <article key={j.role + j.period} className={s.resumePaper}>
                <div className={s.resumeTape} aria-hidden />
                <div className={s.resumePeriod}>{j.period}</div>
                <h3 className={s.resumeRole}>{j.role}</h3>
                <div className={s.resumeCompany}>{j.company}</div>
                <p className={s.resumeBlurb}>{j.blurb}</p>
                <span className={s.resumeIndex}>№ {String(i + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ==================== CERTIFICATES — GOLD STARS ==================== */}
        <section id="certs" className={s.section}>
          <div className={s.sectionHeader}>
            <span className={s.sectionNumber}>CHAPTER 05</span>
            <h2 className={s.sectionTitle}>gold star collection</h2>
          </div>
          <p className={s.sectionLead}>
            stickers the teacher gave me. some shiny, some matte. all earned
            with caffeine and stubbornness.
          </p>

          <div className={s.starGrid}>
            {CERTIFICATES.map((c) => (
              <div key={c.name} className={s.starCard}>
                <div className={s.starShape} aria-hidden>
                  <svg viewBox="0 0 60 60">
                    <path d="M30 4 L37 22 L56 22 L41 33 L47 52 L30 41 L13 52 L19 33 L4 22 L23 22 Z"
                      fill="currentColor" stroke="var(--ink-black)" strokeWidth="2" />
                  </svg>
                </div>
                <div className={s.starIssuer}>{c.issuer}</div>
                <div className={s.starName}>{c.name}</div>
                <div className={s.starYear}>{c.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== DIARY / WRITING ==================== */}
        <section id="diary" className={s.section}>
          <div className={s.sectionHeader}>
            <span className={s.sectionNumber}>CHAPTER 06</span>
            <h2 className={s.sectionTitle}>diary entries</h2>
          </div>
          <p className={s.sectionLead}>
            posts and field notes. some are short. some are unreasonably long.
            none of them apologize for opinions.
          </p>

          <div className={s.diaryList}>
            {DIARY.map((d, i) => (
              <a
                key={i}
                href="#"
                className={s.diaryEntry}
                data-day={d.day}
                data-month={d.month}
              >
                <span className={s.diaryTitle}>{d.title}</span>
                <span className={s.diaryArrow}>→</span>
              </a>
            ))}
          </div>
        </section>

        {/* ==================== CONTACT — قراقيعان pouch ==================== */}
        <section id="contact" className={s.section}>
          <div className={s.contactWrap}>
            <div className={s.pouch}>
              <div className={s.pouchPattern} />
              <h2 className={s.pouchTitle}>knock on the door.</h2>
              <div className={s.pouchArabic}>قراقيعان</div>
              <p className={s.pouchLead}>
                this is the candy pouch. each piece below is a way to find me.
                pick whichever color you like.
              </p>
              <div className={s.pouchItems}>
                <a
                  className={s.candy}
                  href="mailto:devdhaif@gmail.com"
                  style={{ ['--candy-color' as string]: 'var(--st-yellow)' }}
                >
                  ✉ email
                </a>
                <a
                  className={s.candy}
                  href="https://github.com/DevDhaif"
                  style={{ ['--candy-color' as string]: 'var(--st-cyan)' }}
                >
                  ◆ github
                </a>
                <a
                  className={s.candy}
                  href="https://linkedin.com/in/devdhaif"
                  style={{ ['--candy-color' as string]: 'var(--st-pink)' }}
                >
                  ▲ linkedin
                </a>
                <a
                  className={s.candy}
                  href="https://twitter.com/devdhaif"
                  style={{ ['--candy-color' as string]: 'var(--st-green)' }}
                >
                  ✦ twitter
                </a>
                <a
                  className={s.candy}
                  href="#"
                  style={{ ['--candy-color' as string]: 'var(--st-purple)', color: 'white' }}
                >
                  ♪ cv (pdf)
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          <span>© 2026 · scribbled in pencil · dhaifallah alfarawi</span>
          <span className={s.grade}>SEEN · A+</span>
        </footer>
      </div>
    </div>
  );
}

/* ===========================================================
   DATA
   =========================================================== */

const PROJECTS = [
  {
    title: 'Mawqif — civic transit map',
    blurb: "Crowd-sourced bus stops for Sana'a. Low-bandwidth-friendly, offline-capable.",
    tags: ['NEXT.JS', 'SUPABASE', 'MAPS'],
    year: '2025',
    monogram: 'MQ',
    color: '#36c5e8',
    rarity: 'RARE ★★★',
  },
  {
    title: 'Halaqa — study circles, live',
    blurb: 'Real-time discussion rooms with presence, recall, and end-to-end session state.',
    tags: ['REACT', 'EDGE', 'WS'],
    year: '2025',
    monogram: 'HQ',
    color: '#ff5fa2',
    rarity: 'FOIL ★★★★',
  },
  {
    title: 'Qishr — coffee co-op ops',
    blurb: 'Inventory, lots, cupping notes, and exporter handoffs for a Yemeni coffee co-op.',
    tags: ['LARAVEL', 'TS', 'SHADCN'],
    year: '2024',
    monogram: 'QR',
    color: '#ff7a2d',
    rarity: 'COMMON ★',
  },
  {
    title: 'Saraya — geometric prayer clocks',
    blurb: 'Generative WebGL visualizer that draws prayer-time clocks for any latitude.',
    tags: ['R3F', 'THREE.JS'],
    year: '2024',
    monogram: 'SR',
    color: '#8b5cf6',
    rarity: 'HOLO ★★★★★',
  },
  {
    title: 'Manqal — markdown for arabic',
    blurb: 'Bidirectional, RTL-first markdown editor with proper kerning and Arabic-aware syntax.',
    tags: ['TIPTAP', 'TS'],
    year: '2023',
    monogram: 'MN',
    color: '#2fc163',
    rarity: 'RARE ★★★',
  },
  {
    title: 'Karaz — recipe pocketbook',
    blurb: 'A quiet recipe app for grandmothers. No ads. Offline. Voice notes.',
    tags: ['PWA', 'NEXT'],
    year: '2023',
    monogram: 'KZ',
    color: '#ffd23a',
    rarity: 'COMMON ★',
  },
];

const EXPERIENCE = [
  { period: '2024 — now',  role: 'senior front-end engineer', company: 'independent · riyadh',  blurb: 'production react, next, and typescript for SaaS clients across MENA. architecture, performance, and the boring-but-load-bearing details.' },
  { period: '2022 — 2024', role: 'front-end engineer',        company: 'vyrlo tech · remote',   blurb: 'built the front-end for a multi-tenant analytics platform. owned design system, motion library, CRA → next migration.' },
  { period: '2020 — 2022', role: 'full-stack developer',      company: "local agency · sana'a", blurb: 'laravel + vue/react for MENA clients. learned to ship under real constraints — slow networks, low specs, real users.' },
  { period: '2018 — 2020', role: 'junior web developer',      company: 'freelance',             blurb: 'cut my teeth on wordpress, then jquery, then react. the order was correct.' },
];

const CERTIFICATES = [
  { issuer: 'Meta',             name: 'Front-End Pro',             year: '2024', color: '#ffd23a' },
  { issuer: 'Vercel',           name: 'Next.js App Router',        year: '2024', color: '#36c5e8' },
  { issuer: 'Frontend Masters', name: 'Production Patterns',       year: '2023', color: '#ff5fa2' },
  { issuer: 'AWS',              name: 'Cloud Practitioner',        year: '2023', color: '#ff7a2d' },
  { issuer: 'Google',           name: 'UX Design',                 year: '2022', color: '#2fc163' },
  { issuer: 'edX · MIT',        name: 'Computational Thinking',    year: '2022', color: '#8b5cf6' },
];

const POLAROIDS = [
  { glyph: '⚽', caption: 'captain tsubasa fan since always.', year: '1998 · sana\'a', color: '#36c5e8' },
  { glyph: '✎', caption: 'wrote my first html at 12.', year: '2008 · forum themes', color: '#ff7a2d' },
  { glyph: '◆', caption: 'react clicked. couldn t go back.', year: '2018', color: '#ff5fa2' },
];

const SKILLS = [
  {
    heading: 'foundation',
    items: [
      { name: 'html, properly', done: true },
      { name: 'css incl. the hard parts', done: true },
      { name: 'typescript daily', done: true },
      { name: 'a11y by default', done: true },
    ],
  },
  {
    heading: 'frameworks',
    items: [
      { name: 'react 18 / 19', done: true },
      { name: 'next.js 15', done: true },
      { name: 'tailwind + tokens', done: true },
      { name: 'framer motion', done: true },
      { name: 'three.js / r3f', done: false },
    ],
  },
  {
    heading: 'backend',
    items: [
      { name: 'node, express', done: true },
      { name: 'laravel / php', done: true },
      { name: 'postgres, supabase', done: true },
      { name: 'rust (someday)', done: false },
    ],
  },
  {
    heading: 'operating',
    items: [
      { name: 'vercel, cloudflare', done: true },
      { name: 'edge & serverless', done: true },
      { name: 'cache strategy', done: true },
      { name: 'system design at scale', done: false },
    ],
  },
];

const DIARY = [
  { day: '18', month: 'APR 26', title: "a senior engineer's guide to saying no." },
  { day: '02', month: 'MAR 26', title: 'why i stopped writing useEffect first.' },
  { day: '10', month: 'FEB 26', title: 'tailwind, tokens, and the discipline tax.' },
  { day: '07', month: 'JAN 26', title: 'server components are not the goal.' },
  { day: '21', month: 'DEC 25', title: 'designing around network latency.' },
  { day: '30', month: 'NOV 25', title: 'what spacetoon taught me about UX.' },
];

/* ===========================================================
   SVG: Hopscotch grid for the margin
   =========================================================== */
function Hopscotch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g stroke="#4f4537" strokeWidth="1.5" fill="none" strokeLinejoin="round">
        {/* 1 */}
        <rect x="20" y="208" width="22" height="26" />
        <text x="31" y="226" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">1</text>
        {/* 2 */}
        <rect x="20" y="178" width="22" height="26" />
        <text x="31" y="196" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">2</text>
        {/* 3 */}
        <rect x="20" y="148" width="22" height="26" />
        <text x="31" y="166" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">3</text>
        {/* 4 + 5 (side by side) */}
        <rect x="6" y="118" width="22" height="26" />
        <rect x="34" y="118" width="22" height="26" />
        <text x="17" y="136" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">4</text>
        <text x="45" y="136" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">5</text>
        {/* 6 */}
        <rect x="20" y="88" width="22" height="26" />
        <text x="31" y="106" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">6</text>
        {/* 7 + 8 */}
        <rect x="6" y="58" width="22" height="26" />
        <rect x="34" y="58" width="22" height="26" />
        <text x="17" y="76" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">7</text>
        <text x="45" y="76" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">8</text>
        {/* 9 / sky */}
        <path d="M14 28 Q31 14 48 28 L48 54 L14 54 Z" />
        <text x="31" y="46" fontFamily="cursive" fontSize="12" fill="#4f4537" textAnchor="middle">سما</text>
      </g>
    </svg>
  );
}
