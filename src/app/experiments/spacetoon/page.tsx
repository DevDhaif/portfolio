'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import s from './spacetoon.module.css';

/* ===========================================================
   Spacetoon planets — 7 channels mapped to portfolio sections.
   =========================================================== */
type ChannelId =
  | 'sport'
  | 'adventure'
  | 'science'
  | 'zomorroda'
  | 'history'
  | 'reward'
  | 'action';

type Channel = {
  id: ChannelId;
  number: string;
  name: string;
  arabic: string;
  english: string;
  primary: string;
  secondary: string;
};

const CHANNELS: Channel[] = [
  { id: 'sport',     number: '01', name: 'Projects',     arabic: 'كوكب الرياضة',  english: 'PLANET SPORT',     primary: '#00c773', secondary: '#ffe066' },
  { id: 'adventure', number: '02', name: 'About',        arabic: 'كوكب المغامرات', english: 'PLANET ADVENTURE', primary: '#ff8a1f', secondary: '#ffd24a' },
  { id: 'science',   number: '03', name: 'Skills',       arabic: 'كوكب العلوم',   english: 'PLANET SCIENCE',   primary: '#7a5cff', secondary: '#5cf0ff' },
  { id: 'zomorroda', number: '04', name: 'Writing',      arabic: 'كوكب زمردة',    english: 'PLANET ZOMORRODA', primary: '#ff5aa8', secondary: '#ffd6a8' },
  { id: 'history',   number: '05', name: 'Experience',   arabic: 'كوكب التاريخ',  english: 'PLANET HISTORY',   primary: '#3aa6ff', secondary: '#ffd86b' },
  { id: 'reward',    number: '06', name: 'Certificates', arabic: 'كوكب الجوائز',  english: 'PLANET REWARD',    primary: '#ffc62a', secondary: '#ff5fa2' },
  { id: 'action',    number: '07', name: 'Contact',      arabic: 'كوكب الأكشن',   english: 'PLANET ACTION',    primary: '#ff3434', secondary: '#ffd700' },
];

/* ===========================================================
   Page
   =========================================================== */
export default function SpacetoonPage() {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState<ChannelId>('sport');
  const [transitioning, setTransitioning] = useState(false);
  const [time, setTime] = useState('00:00');

  const channel = useMemo(
    () => CHANNELS.find((c) => c.id === active)!,
    [active]
  );

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      setTime(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (booted) return;
    const t = setTimeout(() => setBooted(true), 1600);
    return () => clearTimeout(t);
  }, [booted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = CHANNELS.findIndex((c) => c.id === active);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        switchTo(CHANNELS[(idx + 1) % CHANNELS.length].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        switchTo(CHANNELS[(idx - 1 + CHANNELS.length) % CHANNELS.length].id);
      } else if (/^[1-7]$/.test(e.key)) {
        switchTo(CHANNELS[parseInt(e.key, 10) - 1].id);
      } else if (e.key === 'Escape' && !booted) {
        setBooted(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, booted]);

  const switchTo = (next: ChannelId) => {
    if (next === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(next);
      setTimeout(() => setTransitioning(false), 280);
    }, 220);
  };

  return (
    <div
      className={s.root}
      style={
        {
          '--c-primary': channel.primary,
          '--c-secondary': channel.secondary,
        } as React.CSSProperties
      }
    >
      <div className={s.topNav}>
        <Link href="/" className={s.exitLink}>← Exit experiment</Link>
        <LangToggle current="en" enHref="/experiments/spacetoon" arHref="/experiments/spacetoon/ar" />
      </div>

      <div className={s.wallpaper} />
      <div className={s.grain} />

      <div className={s.tvStage}>
        <div className={s.tv}>
          <div className={s.screenWell}>
            <div className={s.screen} data-channel={channel.id}>
              {!booted && (
                <div
                  className={s.bootStage}
                  onClick={() => setBooted(true)}
                  role="button"
                  aria-label="Power on the TV"
                >
                  <div className={s.bootScanlineExpand} />
                  <div className={s.skipHint}>Click / Esc to skip</div>
                </div>
              )}

              {booted && transitioning && (
                <>
                  <div className={s.flashWhite} />
                  <div className={s.static} />
                  <div className={s.syncBar} />
                </>
              )}

              {booted && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className={s.channel}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <div className={s.channelBg} />
                    <div className={s.halftone} />
                    {active === 'sport' && <div className={s.speedLines} />}
                    <div className={s.channelInner}>
                      {active === 'sport' && <SportChannel />}
                      {active === 'adventure' && <AdventureChannel />}
                      {active === 'science' && <ScienceChannel />}
                      {active === 'zomorroda' && <ZomorrodaChannel />}
                      {active === 'history' && <HistoryChannel />}
                      {active === 'reward' && <RewardChannel />}
                      {active === 'action' && <ActionChannel />}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {booted && (
                <div className={s.hud}>
                  <div className={s.hudTopLeft}>
                    <div className={s.logoBug}>
                      <span className={s.logoBugDot} />
                      <span>SPACETOON</span>
                    </div>
                    <span style={{ opacity: 0.7 }}>
                      CH-{channel.number} · {channel.english}
                    </span>
                  </div>
                  <div className={s.hudTopRight}>
                    <div>
                      <span className={s.recDot} />
                      LIVE · {time}
                    </div>
                    <div style={{ opacity: 0.55, marginTop: 4 }}>
                      EST.1996 · YEMEN
                    </div>
                  </div>
                  <div className={s.hudBottomRight}>
                    ◀▶ change channel · 1–7 quick tune
                  </div>
                </div>
              )}

              <div className={s.scanlines} />
              <div className={s.crtCurve} />
              <div className={s.aberration} />
              <div className={s.flicker} />
            </div>
          </div>

          <div className={s.remote}>
            <div className={s.remoteBrand}>SONIC-VR · 96</div>
            {CHANNELS.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  className={`${s.btn} ${isActive ? s.btnActive : ''}`}
                  onClick={() => switchTo(c.id)}
                  style={{ ['--btn-color' as string]: c.primary }}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Switch to ${c.name}`}
                >
                  <span className={s.btnPlanet} />
                  <span className={s.btnNumber}>{c.number}</span>
                  <span className={s.btnLabel}>{c.name}</span>
                </button>
              );
            })}
          </div>

          <div className={s.powerLed} />
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   Lang toggle
   =========================================================== */
function LangToggle({
  current,
  enHref,
  arHref,
}: {
  current: 'en' | 'ar';
  enHref: string;
  arHref: string;
}) {
  return (
    <div className={s.langToggle}>
      <Link
        href={enHref}
        className={`${s.langBtn} ${current === 'en' ? s.langBtnActive : ''}`}
      >
        EN
      </Link>
      <Link
        href={arHref}
        className={`${s.langBtn} ${current === 'ar' ? s.langBtnActive : ''}`}
      >
        ع
      </Link>
    </div>
  );
}

/* ===========================================================
   Channel: Sport (Projects) — anime-OP hero
   =========================================================== */
function SportChannel() {
  return (
    <div className={s.hero}>
      <div className={s.heroBlurb}>
        <div className={`${s.heroKicker} ${s.animFlyIn}`} style={{ animationDelay: '0.1s' }}>
          <span style={{ width: 18, height: 2, background: 'currentColor' }} />
          EPISODE 01 · NOW PLAYING
        </div>
        <h1 className={`${s.heroName} ${s.animSlam}`} style={{ animationDelay: '0.2s' }}>
          <span className={s.heroNameBlock}>DHAIF</span>
          <br />
          ALFARAWI
        </h1>
        <p className={`${s.heroSub} ${s.animFadeUp}`} style={{ animationDelay: '0.55s' }}>
          Front-end engineer · Architect-in-training
        </p>
        <p className={`${s.heroLead} ${s.animFadeUp}`} style={{ animationDelay: '0.75s' }}>
          Born 1996, Yemen. Building production-grade React, Next.js, and
          TypeScript systems by day. Replaying the Spacetoon opening in my
          head every night. Tune in to the other channels for the rest of
          the broadcast.
        </p>
        <div className={s.animFadeUp} style={{ animationDelay: '0.95s' }}>
          <button className={s.linkBtn} type="button">▶ play projects reel</button>
        </div>
      </div>
      <div className={`${s.heroPortrait} ${s.animFadeUp}`} style={{ animationDelay: '0.4s' }}>
        <div className={s.heroPortraitMonogram}>د</div>
        <div className={s.heroPortraitInner} />
        <div className={s.heroPortraitTag}>
          <span>S01E01</span>
          <span>NTSC · 4:3</span>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   Channel: Adventure (About)
   =========================================================== */
function AdventureChannel() {
  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>The Origin Story</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        Cobbled together from a 1996 Sana&apos;a childhood, a too-loud Spacetoon
        OP, and an unreasonable belief that frontend code can be beautiful.
      </p>

      <div className={s.aboutLayout}>
        <div className={`${s.aboutText} ${s.animFadeUp}`} style={{ animationDelay: '0.25s' }}>
          <p>
            Grew up between qamariya windows and CRT static. Every weekday at
            4pm, the Spacetoon planets rotated and the world made sense for
            twenty-two minutes. Romeo climbed mountains, Sebastian found Belle,
            Captain Tsubasa scored from impossible angles, and Captain Rabeh
            ducked dodgeballs that defied physics.
          </p>
          <p>
            The portfolio you&apos;re browsing right now is a love letter to
            that era — a TV that still works, channels that still flip, and an
            engineer behind it all who actually ships React, Next.js, and
            TypeScript in production. Press a channel button on the right to
            see the rest of the broadcast.
          </p>
          <p>
            I write production code, sweat the CSS, and treat performance and
            accessibility like first-class features, not afterthoughts.
          </p>
        </div>

        <div className={s.aboutFacts}>
          {[
            { label: 'Born', value: '1996 · Yemen' },
            { label: 'Currently', value: 'Front-end Engineer' },
            { label: 'Stack', value: 'React · Next · TS' },
            { label: 'Side Quest', value: 'Architecture' },
            { label: 'Channel Of Choice', value: 'Spacetoon CH-01' },
          ].map((f, i) => (
            <div
              key={f.label}
              className={`${s.factCard} ${s.animFlyIn}`}
              style={{ animationDelay: `${0.35 + i * 0.08}s` }}
            >
              <div className={s.factLabel}>{f.label}</div>
              <div className={s.factValue}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ===========================================================
   Channel: Science (Skills)
   =========================================================== */
function ScienceChannel() {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 92 },
    { name: 'TypeScript', level: 90 },
    { name: 'Tailwind', level: 90 },
    { name: 'Framer Motion', level: 78 },
    { name: 'Three.js / R3F', level: 65 },
    { name: 'Node / Express', level: 75 },
    { name: 'Laravel / PHP', level: 72 },
    { name: 'Postgres', level: 70 },
    { name: 'Supabase', level: 78 },
    { name: 'Architecture', level: 60 },
    { name: 'CSS / Motion', level: 88 },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>The Lab</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        Tools I reach for without thinking, and the bars are honest, not
        marketing.
      </p>

      <div className={s.skillsList}>
        {skills.map((sk, i) => (
          <div
            key={sk.name}
            className={`${s.skillRow} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.04}s` }}
          >
            <span>{sk.name}</span>
            <div className={s.skillBar}>
              <div
                className={s.skillBarFill}
                style={{ width: `${sk.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===========================================================
   Channel: Zomorroda (Writing)
   =========================================================== */
function ZomorrodaChannel() {
  const posts = [
    { date: '2026.04.18', title: 'A Senior Engineer\'s Guide to Saying No' },
    { date: '2026.03.02', title: 'Why I Stopped Writing useEffect First' },
    { date: '2026.02.10', title: 'Tailwind, Tokens, and the Discipline Tax' },
    { date: '2026.01.07', title: 'Server Components Are Not the Goal' },
    { date: '2025.12.21', title: 'Next.js 15: What Actually Changed' },
    { date: '2025.11.30', title: 'Designing Around Network Latency' },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>The Library</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        Notes from the field — engineering posts, opinionated takes, and
        occasional rants about CSS that nobody asked for.
      </p>

      <div className={s.writingList}>
        {posts.map((p, i) => (
          <div
            key={p.title}
            className={`${s.writingRow} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.06}s` }}
          >
            <span className={s.writingDate}>{p.date}</span>
            <span className={s.writingTitle}>{p.title}</span>
            <span className={s.writingArrow}>→</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===========================================================
   Channel: History (Experience) — TIMELINE
   =========================================================== */
function HistoryChannel() {
  const jobs = [
    { period: '2024 — Now', role: 'Senior Front-End Engineer', company: 'Independent · Riyadh', blurb: 'Production React, Next.js, and TypeScript for SaaS clients across MENA. Architecture, performance, and the boring-but-load-bearing details.' },
    { period: '2022 — 2024', role: 'Front-End Engineer', company: 'Vyrlo Tech · Remote', blurb: 'Built the front-end for a multi-tenant analytics platform. Owned the design system, motion library, and the painful migration from CRA to Next.' },
    { period: '2020 — 2022', role: 'Full-Stack Developer', company: 'Local Agency · Sana\'a', blurb: 'Laravel + Vue/React for a stream of MENA clients. Picked up the discipline of shipping under constraints — slow networks, low specs, real users.' },
    { period: '2018 — 2020', role: 'Junior Web Developer', company: 'Freelance', blurb: 'Cut my teeth on WordPress, then jQuery, then React. The order was correct.' },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>The Reruns</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        Where I&apos;ve broadcast from — every previous episode, in order.
      </p>

      <div className={s.timelineList}>
        {jobs.map((j, i) => (
          <div
            key={j.role + j.period}
            className={`${s.timelineCard} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className={s.timelinePeriod}>{j.period}</div>
            <div className={s.timelineRole}>{j.role}</div>
            <div className={s.timelineCompany}>{j.company}</div>
            <div className={s.timelineBlurb}>{j.blurb}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===========================================================
   Channel: Reward (Certificates) — TROPHY GRID
   =========================================================== */
function RewardChannel() {
  const certs = [
    { issuer: 'Meta', name: 'Front-End Developer Professional', year: '2024' },
    { issuer: 'Vercel', name: 'Next.js App Router Mastery', year: '2024' },
    { issuer: 'Frontend Masters', name: 'Production-Grade Patterns', year: '2023' },
    { issuer: 'AWS', name: 'Cloud Practitioner', year: '2023' },
    { issuer: 'Google', name: 'UX Design Specialization', year: '2022' },
    { issuer: 'edX · MIT', name: 'Intro to Computational Thinking', year: '2022' },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>The Trophies</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        Earned along the way. Scrolls, ribbons, and the occasional shiny.
      </p>

      <div className={s.trophyGrid}>
        {certs.map((c, i) => (
          <div
            key={c.name}
            className={`${s.trophyCard} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className={s.trophyMedal}>
              <span>★</span>
            </div>
            <div className={s.trophyMeta}>
              <div className={s.trophyIssuer}>{c.issuer}</div>
              <div className={s.trophyName}>{c.name}</div>
              <div className={s.trophyYear}>{c.year}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===========================================================
   Channel: Action (Contact)
   =========================================================== */
function ActionChannel() {
  const contacts = [
    { label: 'Email', value: 'devdhaif@gmail.com' },
    { label: 'GitHub', value: '@DevDhaif' },
    { label: 'LinkedIn', value: '/in/devdhaif' },
    { label: 'X / Twitter', value: '@devdhaif' },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>Open A Channel</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        Recruiters, collaborators, or anyone who also remembers waiting for
        the Spacetoon intro to finish — get in touch.
      </p>

      <div className={s.contactGrid}>
        {contacts.map((c, i) => (
          <div
            key={c.label}
            className={`${s.contactCard} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className={s.contactLabel}>{c.label}</div>
            <div className={s.contactValue}>{c.value}</div>
          </div>
        ))}
      </div>

      <div
        className={s.animFadeUp}
        style={{ marginTop: 24, animationDelay: '0.6s' }}
      >
        <button className={s.linkBtn} type="button">▶ send transmission</button>
      </div>
    </>
  );
}
