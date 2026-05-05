'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Project, Certificate, Post } from '@/types';
import s from './spacetoon.module.css';

/* ===========================================================
   Types
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

export type SpacetoonCopy = {
  /* shared */
  langLabel: string;
  exit: string;
  liveLabel: string;
  est: string;
  remoteBrand: string;
  hudHint: string;
  bootHint: string;
  channels: Record<ChannelId, { name: string; subtitle: string }>;

  /* hero (Sport) */
  hero: {
    kicker: string;
    name: string;
    nameSub: string;
    sub: string;
    lead: string;
    cta: string;
    portraitTagLeft: string;
    portraitTagRight: string;
    monogram: string;
    projectsTitle: string;
    projectsLead: string;
    projectsEmpty: string;
    openProject: string;
  };

  /* About */
  about: {
    title: string;
    lead: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };

  /* Skills — categorized chips, no progress bars */
  skills: {
    title: string;
    lead: string;
    groups: { heading: string; items: string[] }[];
  };

  /* Experience */
  experience: {
    title: string;
    lead: string;
    jobs: {
      period: string;
      role: string;
      company: string;
      blurb: string;
      current?: boolean;
    }[];
  };

  /* Posts */
  writing: {
    title: string;
    lead: string;
    empty: string;
    seeAll: string;
  };

  /* Certificates */
  certificates: {
    title: string;
    lead: string;
    empty: string;
  };

  /* Contact */
  contact: {
    title: string;
    lead: string;
    items: { label: string; value: string; href: string }[];
    cta: string;
  };
};

const CHANNELS_BASE: Channel[] = [
  { id: 'sport',     number: '01', name: 'Projects',     arabic: 'كوكب الرياضة',  english: 'PLANET SPORT',     primary: '#00c773', secondary: '#ffe066' },
  { id: 'adventure', number: '02', name: 'About',        arabic: 'كوكب المغامرات', english: 'PLANET ADVENTURE', primary: '#ff8a1f', secondary: '#ffd24a' },
  { id: 'science',   number: '03', name: 'Skills',       arabic: 'كوكب العلوم',   english: 'PLANET SCIENCE',   primary: '#7a5cff', secondary: '#5cf0ff' },
  { id: 'zomorroda', number: '04', name: 'Writing',      arabic: 'كوكب زمردة',    english: 'PLANET ZOMORRODA', primary: '#ff5aa8', secondary: '#ffd6a8' },
  { id: 'history',   number: '05', name: 'Experience',   arabic: 'كوكب التاريخ',  english: 'PLANET HISTORY',   primary: '#3aa6ff', secondary: '#ffd86b' },
  { id: 'reward',    number: '06', name: 'Certificates', arabic: 'كوكب الجوائز',  english: 'PLANET REWARD',    primary: '#ffc62a', secondary: '#ff5fa2' },
  { id: 'action',    number: '07', name: 'Contact',      arabic: 'كوكب الأكشن',   english: 'PLANET ACTION',    primary: '#ff3434', secondary: '#ffd700' },
];

/* ===========================================================
   View
   =========================================================== */
type Props = {
  lang: 'en' | 'ar';
  copy: SpacetoonCopy;
  enHref: string;
  arHref: string;
  projects: Project[];
  certificates: Certificate[];
  posts: Post[];
  postsCount: number;
};

export default function SpacetoonView({
  lang,
  copy,
  enHref,
  arHref,
  projects,
  certificates,
  posts,
  postsCount,
}: Props) {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState<ChannelId>('sport');
  const [transitioning, setTransitioning] = useState(false);
  const [time, setTime] = useState('00:00');

  const channels = useMemo<Channel[]>(
    () =>
      CHANNELS_BASE.map((c) => ({
        ...c,
        name: copy.channels[c.id].name,
      })),
    [copy],
  );

  const channel = useMemo(
    () => channels.find((c) => c.id === active)!,
    [channels, active],
  );

  /* clock */
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

  /* boot */
  useEffect(() => {
    if (booted) return;
    const t = setTimeout(() => setBooted(true), 1600);
    return () => clearTimeout(t);
  }, [booted]);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = channels.findIndex((c) => c.id === active);
      const goNext = lang === 'ar' ? -1 : 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        switchTo(channels[(idx + goNext + channels.length) % channels.length].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        switchTo(channels[(idx - goNext + channels.length) % channels.length].id);
      } else if (/^[1-7]$/.test(e.key)) {
        switchTo(channels[parseInt(e.key, 10) - 1].id);
      } else if (e.key === 'Escape' && !booted) {
        setBooted(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, booted, channels.length, lang]);

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
        <Link href="/select" className={s.exitLink}>← {copy.exit}</Link>
        <div className={s.langToggle}>
          <Link
            href={enHref}
            className={`${s.langBtn} ${lang === 'en' ? s.langBtnActive : ''}`}
          >
            EN
          </Link>
          <Link
            href={arHref}
            className={`${s.langBtn} ${lang === 'ar' ? s.langBtnActive : ''}`}
          >
            ع
          </Link>
        </div>
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
                  <div className={s.skipHint}>{copy.bootHint}</div>
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
                      {active === 'sport' && (
                        <SportChannel copy={copy} projects={projects} lang={lang} />
                      )}
                      {active === 'adventure' && (
                        <AdventureChannel copy={copy} postsCount={postsCount} />
                      )}
                      {active === 'science' && <ScienceChannel copy={copy} />}
                      {active === 'zomorroda' && (
                        <ZomorrodaChannel copy={copy} posts={posts} lang={lang} />
                      )}
                      {active === 'history' && <HistoryChannel copy={copy} />}
                      {active === 'reward' && (
                        <RewardChannel copy={copy} certificates={certificates} lang={lang} />
                      )}
                      {active === 'action' && <ActionChannel copy={copy} />}
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
                      {lang === 'ar' ? `قناة-${channel.number} · ` : `CH-${channel.number} · `}
                      {copy.channels[channel.id].subtitle}
                    </span>
                  </div>
                  <div className={s.hudTopRight}>
                    <div>
                      <span className={s.recDot} />
                      {copy.liveLabel} · <bdi dir="ltr">{time}</bdi>
                    </div>
                    <div style={{ opacity: 0.55, marginTop: 4 }}>
                      {copy.est}
                    </div>
                  </div>
                  <div className={s.hudBottomRight}>
                    {copy.hudHint}
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
            <div className={s.remoteBrand}>{copy.remoteBrand}</div>
            {channels.map((c) => {
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
   Channel: Sport — Hero + Projects reel
   =========================================================== */
function SportChannel({
  copy,
  projects,
  lang,
}: {
  copy: SpacetoonCopy;
  projects: Project[];
  lang: 'en' | 'ar';
}) {
  return (
    <div className={s.sportLayout}>
      <div className={s.hero}>
        <div className={s.heroBlurb}>
          <div className={`${s.heroKicker} ${s.animFlyIn}`} style={{ animationDelay: '0.1s' }}>
            <span style={{ width: 18, height: 2, background: 'currentColor' }} />
            {copy.hero.kicker}
          </div>
          <h1 className={`${s.heroName} ${s.animSlam}`} style={{ animationDelay: '0.2s' }}>
            <span className={s.heroNameBlock}>{copy.hero.name}</span>
            <br />
            {copy.hero.nameSub}
          </h1>
          <p className={`${s.heroSub} ${s.animFadeUp}`} style={{ animationDelay: '0.55s' }}>
            {copy.hero.sub}
          </p>
          <p className={`${s.heroLead} ${s.animFadeUp}`} style={{ animationDelay: '0.75s' }}>
            {copy.hero.lead}
          </p>
        </div>
        <div className={`${s.heroPortrait} ${s.animFadeUp}`} style={{ animationDelay: '0.4s' }}>
          <div className={s.heroPortraitMonogram}>{copy.hero.monogram}</div>
          <div className={s.heroPortraitInner} />
          <div className={s.heroPortraitTag}>
            <span>{copy.hero.portraitTagLeft}</span>
            <span>{copy.hero.portraitTagRight}</span>
          </div>
        </div>
      </div>

      <div className={s.sportReel}>
        <div className={s.sportReelHead}>
          <h3 className={s.sportReelTitle}>{copy.hero.projectsTitle}</h3>
          <p className={s.sportReelLead}>{copy.hero.projectsLead}</p>
        </div>
        {projects.length === 0 ? (
          <p className={s.emptyNote}>{copy.hero.projectsEmpty}</p>
        ) : (
          <div className={s.cardGrid}>
            {projects.map((p, i) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className={`${s.card} ${s.projectCard} ${s.animFlyIn}`}
                style={{ animationDelay: `${0.2 + i * 0.06}s` }}
              >
                {p.mainImage ? (
                  <div className={s.cardImage}>
                    <Image
                      src={p.mainImage}
                      alt={p.name}
                      fill
                      sizes="(max-width: 700px) 50vw, 220px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : null}
                <div className={s.cardLabel}>EP-{String(i + 1).padStart(2, '0')}</div>
                <div className={s.cardTitle}>{p.name}</div>
                <div className={s.cardBody}>{p.description}</div>
                <div className={s.cardChips}>
                  {(p.skills ?? []).slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className={s.cardFoot}>
                  <span>{new Date(p.createdAt).getFullYear()}</span>
                  <span>{copy.hero.openProject} {lang === 'ar' ? '←' : '→'}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===========================================================
   Channel: Adventure — About
   =========================================================== */
function AdventureChannel({
  copy,
  postsCount,
}: {
  copy: SpacetoonCopy;
  postsCount: number;
}) {
  const factsWithPosts = useMemo(() => {
    return copy.about.facts.map((f) =>
      f.value === '__POSTS_COUNT__' ? { ...f, value: String(postsCount) } : f,
    );
  }, [copy.about.facts, postsCount]);

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>{copy.about.title}</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        {copy.about.lead}
      </p>

      <div className={s.aboutLayout}>
        <div className={`${s.aboutText} ${s.animFadeUp}`} style={{ animationDelay: '0.25s' }}>
          {copy.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className={s.aboutFacts}>
          {factsWithPosts.map((f, i) => (
            <div
              key={f.label + i}
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
   Channel: Science — Skills
   =========================================================== */
function ScienceChannel({ copy }: { copy: SpacetoonCopy }) {
  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>{copy.skills.title}</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        {copy.skills.lead}
      </p>

      <div className={s.skillsGroups}>
        {copy.skills.groups.map((g, gi) => (
          <div
            key={g.heading}
            className={`${s.skillGroup} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + gi * 0.08}s` }}
          >
            <h3 className={s.skillGroupHeading}>{g.heading}</h3>
            <ul className={s.skillChipList}>
              {g.items.map((it) => (
                <li key={it} className={s.skillChip}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===========================================================
   Channel: Zomorroda — Writing (real posts)
   =========================================================== */
function ZomorrodaChannel({
  copy,
  posts,
  lang,
}: {
  copy: SpacetoonCopy;
  posts: Post[];
  lang: 'en' | 'ar';
}) {
  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>{copy.writing.title}</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        {copy.writing.lead}
      </p>

      {posts.length === 0 ? (
        <p className={s.emptyNote}>{copy.writing.empty}</p>
      ) : (
        <div className={s.writingList}>
          {posts.map((p, i) => {
            const title =
              lang === 'ar'
                ? p.title_ar || p.title_en || p.title
                : p.title_en || p.title || p.title_ar || '';
            const date = new Date(p.created_at);
            const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
            return (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className={`${s.writingRow} ${s.animFlyIn}`}
                style={{ animationDelay: `${0.2 + i * 0.06}s` }}
              >
                <span className={s.writingDate}>
                  <bdi dir="ltr">{dateStr}</bdi>
                </span>
                <span className={s.writingTitle}>{title}</span>
                <span className={s.writingArrow}>{lang === 'ar' ? '←' : '→'}</span>
              </Link>
            );
          })}
        </div>
      )}

      <div
        className={s.animFadeUp}
        style={{ marginTop: 18, animationDelay: '0.6s' }}
      >
        <Link href="/blog" className={s.linkBtn}>
          ▶ {copy.writing.seeAll}
        </Link>
      </div>
    </>
  );
}

/* ===========================================================
   Channel: History — Experience
   =========================================================== */
function HistoryChannel({ copy }: { copy: SpacetoonCopy }) {
  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>{copy.experience.title}</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        {copy.experience.lead}
      </p>

      <div className={s.timelineList}>
        {copy.experience.jobs.map((j, i) => (
          <div
            key={j.role + j.period}
            className={`${s.timelineCard} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className={s.timelinePeriod}>{j.period}{j.current ? ' ●' : ''}</div>
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
   Channel: Reward — Certificates (real)
   =========================================================== */
function RewardChannel({
  copy,
  certificates,
  lang,
}: {
  copy: SpacetoonCopy;
  certificates: Certificate[];
  lang: 'en' | 'ar';
}) {
  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>{copy.certificates.title}</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        {copy.certificates.lead}
      </p>

      {certificates.length === 0 ? (
        <p className={s.emptyNote}>{copy.certificates.empty}</p>
      ) : (
        <div className={s.trophyGrid}>
          {certificates.map((c, i) => {
            const year = c.issueDate ? new Date(c.issueDate).getFullYear() : '';
            return (
              <a
                key={c.id}
                href={c.urlLink || '#'}
                target={c.urlLink ? '_blank' : undefined}
                rel={c.urlLink ? 'noreferrer' : undefined}
                className={`${s.trophyCard} ${s.animFlyIn}`}
                style={{ animationDelay: `${0.2 + i * 0.08}s` }}
              >
                <div className={s.trophyMedal}>
                  <span>★</span>
                </div>
                <div className={s.trophyMeta}>
                  <div className={s.trophyIssuer}>{c.source}</div>
                  <div className={s.trophyName}>{c.title}</div>
                  <div className={s.trophyYear}>
                    <bdi dir="ltr">{year}</bdi>
                    {lang === 'ar' && year ? '' : ''}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ===========================================================
   Channel: Action — Contact
   =========================================================== */
function ActionChannel({ copy }: { copy: SpacetoonCopy }) {
  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>{copy.contact.title}</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        {copy.contact.lead}
      </p>

      <div className={s.contactGrid}>
        {copy.contact.items.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
            className={`${s.contactCard} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className={s.contactLabel}>{c.label}</div>
            <div className={s.contactValue}>
              <bdi dir="ltr">{c.value}</bdi>
            </div>
          </a>
        ))}
      </div>

      <div
        className={s.animFadeUp}
        style={{ marginTop: 24, animationDelay: '0.6s' }}
      >
        <a className={s.linkBtn} href={copy.contact.items[0]?.href ?? '#'}>
          ▶ {copy.contact.cta}
        </a>
      </div>
    </>
  );
}
