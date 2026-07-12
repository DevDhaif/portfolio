# Portfolio Redesign — Calm Editorial Design System

**Date:** 2026-07-04
**Status:** Awaiting build approval
**Owner:** Dhaifallah

## Context

The current landing page wears a "developer-terminal" costume: near-black `#0A0A0B`
ground, electric-green `#00FF66` signal, typing terminals, fake `~/user.json` code
windows, scanline/dot-grid/parallax backgrounds, stroked giant numerals, corner-bracket
hover frames, a skills marquee, count-up numbers, a custom cursor ring, magnetic
buttons, and `shadow-signal`/`shadow-card-hover` glows. This is the archetypal
"AI dev-portfolio" look — it reads as templated and busy, not as a senior engineer's
considered work.

Goal: tear the landing-page design down to the studs and rebuild on a **calm editorial
design system** — simple, human, professional, works in light and dark — while
**preserving the blog's code-snippet rendering and TipTap editor untouched**.

## Locked decisions

| Decision | Choice |
|---|---|
| Direction | Calm editorial / typographic (whitespace, hairlines, quiet index system) |
| Base | **Light + dark**, real toggle via `next-themes`; **light is the default face** |
| Accent | **Ink blue** — `#2f4a7c` (light) / `#8fb0e0` (dark), used sparingly |
| Type | **Fraunces** (serif display) + **Inter** (body) + **JetBrains Mono** (labels/code) |
| Variant system | **Scrapped** — remove `/select`, experiments, `ThemeSwitcherPill`, middleware `/` redirect |
| Motion | Keep `framer-motion` for ONE thing only: a subtle fade/rise on scroll-in. No hover lifts, no scale, no parallax, no glow. |

## Design system

### Tokens — `src/styles/base.css`

Two clean semantic token sets. Values are starting points; contrast to be verified
(WCAG AA) during build.

**Light (`:root`)**
```
--bg:          #faf9f6   /* warm off-white paper */
--surface:     #ffffff   /* rare raised element */
--sunken:      #f3f1ec   /* wells, code chrome */
--ink:         #1a1a18   /* warm near-black */
--ink-muted:   #6b6a66
--ink-faint:   #a3a19b
--line:        #e5e2dc   /* hairline */
--line-strong: #d3cfc7
--accent:      #2f4a7c   /* ink blue */
--accent-hover:#263d68
--radius:      0.25rem
```

**Dark (`.dark`)**
```
--bg:          #1a1917   /* calm warm-neutral dark, NOT pure black */
--surface:     #222120
--sunken:      #141312
--ink:         #ededea
--ink-muted:   #a3a09a
--ink-faint:   #6a6862
--line:        #302e2b
--line-strong: #403d39
--accent:      #8fb0e0
--accent-hover:#a6c1ea
```

Keep shadcn-compat aliases (`--background`, `--foreground`, `--primary`, `--border`,
`--ring`, etc.) mapped onto the new tokens so the shadcn primitives keep working.
No glow shadows. One soft ambient shadow reserved for genuinely floating UI
(dropdown/menu) only.

### Typography

- Load **Fraunces** via `next/font/google` (variable, optical-size) → `--font-display`,
  replacing Bricolage Grotesque.
- Keep **Inter** → body (`--font-geist-sans`, name left as-is to avoid churn), and
  **JetBrains Mono** → `--font-jetbrains-mono` for small mono labels + code.
- Type scale: large confident display sizes with real line-height; body ~16–18px,
  generous measure (`max-w-[65ch]` for prose).

### Motion rules

- Single reusable "reveal on scroll" (opacity + small `y`), short duration, once.
- Links: simple underline (present or animated-in, no glow sweep).
- Nav active state: small static marker, no sliding-glow `layoutId`.
- Remove: `CursorRing`, `Magnetic`, terminal typewriter, parallax orbs, `CountUp`,
  marquee, `frame-brackets`, `pulse-signal`, `blink`, scanline.

### Primitives — `src/components/ui/`

- `Section` — consistent vertical rhythm + a small index label (`01 — Work`), hairline
  top rule. Restyle the existing `section-heading.tsx` into this.
- `Button` — restyle `button.tsx` AND fix its broken variants (leftover find/replace
  artifacts: `text-primarygray-500`, dangling `secondary`/`ghost` classes).
- `Card` — flat bordered container, no lift/glow. Rework `project-card.tsx`,
  `blog-card.tsx`, `certificate-card.tsx`, `skill-card.tsx` onto it.
- Reuse existing `cn()` (`src/lib/utils.ts`), `cva`, and shadcn Radix primitives.

## Removal list

**Slop / effects (delete or strip usage):**
`ui/cursor-ring.tsx`, `ui/magnetic.tsx`, `ui/terminal.tsx`, `ui/console-greeting.tsx`,
`ui/riyadh-clock.tsx`, `ui/noise.tsx`, `bits/CountUp.jsx`, `bits/SplitText.jsx` (already
dead), the marquee CSS in `globals.css`, and all `.stencil`/`.section-numeral`/
`.code-window`/`.frame-brackets`/`.bg-dot-grid`/`.bg-scanline`/`.bg-grid-dev-fade`/
`.chip`/`.btn-signal` component classes in `base.css`.

**Variant system (delete):**
- `src/app/select/` (whole dir), `src/app/select/actions.ts`
- `src/app/experiments/{notebook,qamariya,spacetoon}/` (whole dirs)
- `src/components/ThemeSwitcherPill.tsx` (+ its mount in `layout.tsx`)
- `middleware.ts`: remove the `/` block (lines 21–34) + `THEME_ROUTES`. **KEEP the
  `/admin` Supabase auth block.** Drop `/` from the matcher.
- Remove `/experiments` from the `ConditionalLayout` bare-layout list.
- Grep for stray `pf_theme` / `pf_lang` readers before deleting (expected: none beyond
  the above).

## Preservation list (do NOT touch the rendering/editor internals)

`src/components/blog/ContentReader.tsx`, `src/config/tiptap-extensions.ts`,
`src/config/editor.config.ts`, `src/styles/tiptap-styles.css`,
`src/extensions/{direction,list-item-heading}.ts`, `src/components/Editor/*`,
`src/components/BilingualPostForm.tsx`, the editor hooks/types/utils, highlight.js theme
imports, and copy-button logic. Blog *page chrome* may be restyled; the
`<ContentRenderer>` / `<Editor>` mounts stay intact. All Supabase data-fetching, the
`submitContactForm` action, `/api/posts/count`, and admin auth stay.

## Section-by-section redesign (same content, calm rebuild)

- **Header** (`layout/header.tsx`) — slim, static; name/monogram + minimal nav + theme
  toggle. Hairline underline appears on scroll. No blinking cursor, no glow underline.
- **Hero** (`sections/hero.tsx`) — large editorial statement (who + what) in Fraunces,
  generous space, one accent link. No terminal, no code card, no parallax.
- **About** (`sections/about.tsx`) — calm prose + compact facts column (location,
  availability, live post count kept). No bento, clock, or JSON window.
- **Work / Projects** (`sections/projects.tsx`, `ui/project-card.tsx`) — the centerpiece:
  editorial list/grid of flat cards (title, role, mono stack tags, one image). Keep the
  Supabase load + filter tabs, restyled. No brackets/zoom/lift.
- **Skills** (`sections/skills.tsx`) — quiet grouped lists with existing SVG icons.
  Marquee removed.
- **Blog** (`sections/blog.tsx`, `ui/blog-card.tsx`) — rebuild on the NEW system (it's
  currently on the old palette and breaks the numbering). Simple post list matching Work.
- **Experience** (`home/experience.tsx`) — restrained timeline, single hairline spine,
  no pulsing dots.
- **Certificates** (`Certificates.tsx`, `certificate-card.tsx`) — flat grid, same card
  language as Work.
- **Contact** (`sections/contact.tsx`) — plain confident form, no terminal chrome / `$`
  prompt. Same `submitContactForm` action.
- **Footer** (`layout/footer.tsx`) — keep the "let's build" line + sitemap; drop stencil
  watermark + scanline.

## Theme wiring

- Add `next-themes`. Wrap `body` children with `<ThemeProvider attribute="class"
  defaultTheme="light" enableSystem disableTransitionOnChange>` in `layout.tsx`.
- Remove the hard-coded `dark` class on `<html>`; keep `suppressHydrationWarning`.
- Add a `ThemeToggle` (light/dark) in the header. `tailwind.config.ts` keeps
  `darkMode: ["class"]`.

## Implementation sequence

1. **Foundation** — tokens (`base.css`), `tailwind.config.ts` palette/shadows/keyframes,
   fonts (`layout.tsx`), `next-themes` + toggle, fix `button.tsx`.
2. **Primitives** — `Section`, `Card`, restyled buttons/badges.
3. **Sections** — top to bottom (header → hero → … → footer), incl. Blog-on-new-system.
4. **Variant teardown** — delete `/select`, experiments, pill; trim `middleware.ts` +
   `ConditionalLayout`.
5. **Cleanup + verify** — remove dead deps if unused (gsap, three), run typecheck/lint/
   build.

## Verification

- `npm run build` (or `next build`) passes; `tsc --noEmit` and `eslint` clean.
- Manually drive the app: homepage in **both** light and dark, toggle works and persists,
  no flash-of-wrong-theme.
- `/` no longer redirects to `/select`; `/admin` still redirects to `/login` when
  logged out (auth preserved).
- Blog post page still renders code blocks with syntax highlighting + working copy
  buttons; admin editor still loads and saves.
- Contrast check (WCAG AA) on ink/muted/accent against bg in both themes.

## Out of scope

Content copy rewrites, new sections, CMS/schema changes, the blog editor internals,
and non-landing admin pages beyond restyling their chrome.
