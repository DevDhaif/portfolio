import { loadExperimentData } from '@/lib/experiments-data';
import { SOCIAL_LINKS, AUTHOR } from '@/lib/constants';
import SpacetoonView, { type SpacetoonCopy } from './spacetoon-view';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function SpacetoonPage() {
  const data = await loadExperimentData();

  const copy: SpacetoonCopy = {
    langLabel: 'EN',
    exit: 'Switch theme',
    liveLabel: 'LIVE',
    est: 'EST.1996 · YEMEN',
    remoteBrand: 'SONIC-VR · 96',
    hudHint: '◀▶ change channel · 1–7 quick tune',
    bootHint: 'Click / Esc to skip',
    channels: {
      sport:     { name: 'Projects',     subtitle: 'PLANET SPORT' },
      adventure: { name: 'About',        subtitle: 'PLANET ADVENTURE' },
      science:   { name: 'Skills',       subtitle: 'PLANET SCIENCE' },
      zomorroda: { name: 'Writing',      subtitle: 'PLANET ZOMORRODA' },
      history:   { name: 'Experience',   subtitle: 'PLANET HISTORY' },
      reward:    { name: 'Certificates', subtitle: 'PLANET REWARD' },
      action:    { name: 'Contact',      subtitle: 'PLANET ACTION' },
    },

    hero: {
      kicker: 'EPISODE 01 · NOW PLAYING',
      name: 'DHAIF',
      nameSub: 'ALFARAWI',
      sub: 'Software engineer · Riyadh',
      lead:
        "I'm Dhaifallah — a software engineer from Al-Bayda', Yemen, based in Riyadh. 5+ years in React, Next.js, TypeScript, and Laravel. I care about performance, accessibility, and Arabic / RTL support from day one. Switch the channel for the rest.",
      cta: 'Play projects reel',
      portraitTagLeft: 'S01E01',
      portraitTagRight: 'NTSC · 4:3',
      monogram: 'D',
      projectsTitle: 'Featured projects',
      projectsLead: 'A handful of things I shipped. Tap any card to open it.',
      projectsEmpty: 'No projects published yet.',
      openProject: 'Open',
    },

    about: {
      title: 'About me',
      lead:
        "The short version: who I am, what I do, what I care about.",
      paragraphs: [
        "I'm Dhaifallah Ahmed Alfarawi, a software engineer from Al-Bayda', Yemen, based in Riyadh. My day-to-day is React, Next.js, TypeScript, and Tailwind. When I need to own the backend too, I reach for Laravel.",
        "I care about performance, accessibility, and Arabic / RTL support from day one — not as a retrofit. That's the difference between an interface that survives its first year and one that gets rewritten.",
        "I believe clear code and good documentation matter equally, and that small continuous updates beat the big rewrite that never ships.",
      ],
      facts: [
        { label: 'Based In',         value: AUTHOR.location },
        { label: 'From',             value: "Al-Bayda', Yemen" },
        { label: 'Stack',            value: 'React · Next · TS · Laravel' },
        { label: 'Years Shipping',   value: '5+' },
        { label: 'Posts Published',  value: '__POSTS_COUNT__' },
      ],
    },

    skills: {
      title: 'The toolbelt',
      lead: 'The tools I actually use, every day.',
      groups: [
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
      ],
    },

    experience: {
      title: 'Experience',
      lead: "Where I've worked, and what I shipped.",
      jobs: [
        {
          period: '11/2024 — Now',
          role: 'Front-End Developer',
          company: 'ADX · Riyadh',
          blurb:
            'Building a full digital-signage platform — campaign simulator, drag-and-drop playlist tool, in-browser image editor, and the admin console with RBAC across 8+ roles. RTL/LTR via i18next, semantic HTML, WCAG-compliant.',
          current: true,
        },
        {
          period: '01/2018 — Now',
          role: 'Full-Stack Developer (Freelance)',
          company: 'Independent',
          blurb:
            'Shipped 5+ web apps end-to-end. Lighthouse 90+ via dynamic imports, code-splitting, image optimization. RESTful APIs in Laravel + MySQL with 99.5% uptime. Still freelancing in parallel today.',
          current: true,
        },
        {
          period: '05/2020 — 11/2024',
          role: 'Front-End Developer',
          company: 'Meraki UI Lab',
          blurb:
            'Built reusable, accessible component systems with consistent visual identity for cross-functional product teams. Shipped 150+ reusable components (35% drop in dev time), 100% RTL coverage with semantic HTML and ARIA.',
        },
      ],
    },

    writing: {
      title: 'Writing',
      lead: 'Engineering posts and opinionated takes from the field.',
      empty: 'No posts published yet.',
      seeAll: 'See all writing',
    },

    certificates: {
      title: 'Certificates',
      lead: 'Online courses I finished — LinkedIn Learning, freeCodeCamp, PMI, and others.',
      empty: 'No certificates published yet.',
    },

    contact: {
      title: 'Contact',
      lead:
        'Open to roles and collaborations. Pick whichever channel suits you — I reply within 24 hours.',
      items: [
        { label: 'Email',      value: SOCIAL_LINKS.EMAIL,             href: `mailto:${SOCIAL_LINKS.EMAIL}` },
        { label: 'Phone',      value: AUTHOR.phone,                   href: `tel:${AUTHOR.phone}` },
        { label: 'GitHub',     value: '@DevDhaif',                    href: SOCIAL_LINKS.GITHUB },
        { label: 'LinkedIn',   value: '/in/devdhaif',                 href: SOCIAL_LINKS.LINKEDIN },
        { label: 'X / Twitter', value: '@devdhaif',                   href: SOCIAL_LINKS.TWITTER },
      ],
      cta: 'Get in touch',
    },
  };

  return (
    <SpacetoonView
      lang="en"
      copy={copy}
      enHref="/experiments/spacetoon"
      arHref="/experiments/spacetoon/ar"
      projects={data.projects}
      certificates={data.certificates}
      posts={data.posts}
      postsCount={data.postsCount}
    />
  );
}
