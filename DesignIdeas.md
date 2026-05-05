# Portfolio Design Ideas — 90s Yemeni Childhood Theme

## The Idea

Build a portfolio that triggers genuine nostalgia for anyone who grew up in Yemen (or the wider Arab world) in the late 90s / early 2000s. The aesthetic should feel personal and specific — not generic "retro" or "vaporwave" — but rooted in:

- **Spacetoon-era Arabic-dubbed anime**: Moero! Top Striker, Belle and Sebastian, Honō no Tōkyūji Dodge Danpei, Tatsuya Oozora, Romeo's Blue Skies, and the broader Spacetoon "planets" universe.
- **Yemeni visual identity**: qamariya stained glass, Sana'a tower-house architecture, traditional palette, Arabic typography.
- **Local childhood games**: سبع حجار (seven stones), الغميضة (hide and seek), طيارة ورق (kite flying), قراقيعان (Ramadan tradition), spinning tops, marbles, hopscotch.
- **90s media textures**: CRT scanlines, halftone dots, cel-shading, VHS artifacts, cassette-tape grain.

## Why I Need This

1. **Differentiation**: Most developer portfolios converge on the same minimal/dark/Inter-font aesthetic. A specific cultural identity makes it unforgettable.
2. **Authentic self-expression**: My background is part of who I am as an engineer — the portfolio should reflect that, not hide it.
3. **Emotional connection**: A Yemeni or Arab visitor should feel a jolt of recognition. An international visitor should feel they've encountered something genuinely designed, not generic.
4. **Architectural muscle**: Building one cohesive aesthetic system (palette, type, motion, motifs) end-to-end is good practice for the senior-level frontend/architecture work I'm moving toward.

The risk to manage: don't let the costume undercut the work. Project content stays serious; the *chrome* is where the personality lives.

---

## Options

Each option below is meant to be tried as a standalone branch / route so I can experience it before committing.

### Option A — Spacetoon Channel Switcher  `Status: Built` (routes: `/experiments/spacetoon`, `/experiments/spacetoon/ar`)

**The pitch:** The portfolio is framed as a CRT TV set. Sections map to Spacetoon's planets:

- **كوكب الرياضة (Sport)** → Projects
- **كوكب المغامرات (Adventure)** → About
- **كوكب العلوم (Science)** → Skills / Stack
- **كوكب زمردة (Zomorroda)** → Writing / Blog
- **كوكب الأكشن (Action)** → Contact

**Visual language:**
- CRT bezel framing the viewport, scanlines, subtle chromatic aberration.
- Channel-flip transition between sections (white flash → static → new "channel").
- Anime-OP-style hero: cel-shaded self-portrait, Tarek-El-Arabi-coded title card, your name in a heroic Arabic display face.
- Spacetoon-inspired logo bug in a corner.
- Sound (optional, off by default): channel-change click, faint TV hum.

**Type:**
- Display: a heroic Arabic face (Rakkas, Lalezar, or custom-feeling slab) + a 90s sans for Latin (Antique Olive, ITC Avant Garde-ish).
- Body: clean Arabic (29LT Zarid, IBM Plex Sans Arabic) + matching Latin.

**Pros:** Maximum cultural recognition. Strong navigation metaphor. Memorable on first frame.
**Cons:** Reads as gimmick to non-Arab recruiters if not balanced. Sound/animation can fatigue on repeat visits.

---

### Option B — Qamariya + Cel-Shaded Anime  `Status: Built` (routes: `/experiments/qamariya`, `/experiments/qamariya/ar`)

**The pitch:** Yemeni architectural identity is the foundation. 90s anime textures are the accent layer.

**Visual language:**
- **Palette** drawn from qamariya stained glass: cobalt blue, ruby red, emerald green, amber yellow, ivory plaster.
- **Section dividers** as qamariya arch silhouettes — geometric, symmetrical, distinctly Yemeni.
- **Background**: parallax silhouette of Sana'a's tower-house skyline (the gingerbread-pattern facades) at the bottom of the viewport.
- **Texture overlay**: 90s anime halftone dots, Ben Day patterns, subtle cel-shading on illustrations and avatars.
- **Motion**: light-through-stained-glass shimmer on hover; arch-shaped wipe transitions.

**Type:**
- Display: 29LT Zarid Display, or a refined slab like Marcellus.
- Body: IBM Plex Sans Arabic / Plex Sans paired.

**Pros:** Distinctly *Yemeni*, not just generically Arab. Place-rooted. Recruiter-safe — reads as designed, not costumed.
**Cons:** A non-Yemeni Arab might miss the Spacetoon jolt. More restrained = less viral.

---

### Option C — School Notebook / Sticker Book  `Status: Approved (AR)` (routes: `/experiments/notebook`, `/experiments/notebook/ar` — AR version now reads real data from Supabase + constants)

**The pitch:** Portfolio as a 90s school notebook a kid would scribble in during class.

**Visual language:**
- Ruled-paper background, marbled composition-book cover for the hero.
- Margin doodles: hopscotch grid, سبع حجار stones, spinning top, kite, anime-character silhouettes.
- Project tiles styled as **anime sticker-collection cards** (Captain-Majed-era trading-card layout, foil-corner gradient, holographic shimmer on hover).
- Arabic handwriting accents (use a handwriting font, not the body face).
- Contact section as a faded قراقيعان pouch with the items inside.
- Tape, paperclips, and bent-corner shadows on cards.

**Type:**
- Display: a hand-drawn / brush face for English; an Arabic handwriting face (Reem Kufi Ink or similar).
- Body: a soft humanist sans.

**Pros:** Intimate, playful, highly personal. Strong shareability.
**Cons:** Cute-factor can undercut technical credibility unless typography stays disciplined.

---

### Option D — Hybrid: Qamariya Foundation + Spacetoon Hero  `Status: HaventTriedIt` (current recommendation)

**The pitch:** Option B is the whole site. Option A is *one* burst at the top.

**How it composes:**
- The hero section is the full Spacetoon CRT homage — channel-flip intro animation, anime-OP title card with my name, scanlines and chromatic aberration. It "burns out" (TV-power-off animation) into the refined site below.
- Everything below the fold uses Option B's qamariya palette, arch dividers, Sana'a skyline parallax, halftone accents.
- Project pages inherit B's chrome only — A doesn't return after the hero.

**Pros:** Visceral nostalgia hit *and* serious portfolio. Contrast itself is memorable. Best of both worlds.
**Cons:** Most work to build. Two aesthetic systems must coexist without clashing — typography pairing has to do real work.

---

## Open Questions to Lock Before Building

1. **Audience priority**: Yemeni/Arab viewers first, or international recruiters first?
2. **Language**: Arabic-first with English secondary, English-first with Arabic accents, or fully bilingual toggle?
3. **Anime references**: Stylistic *homages* only (cel-shading, halftone, OP-style composition) — no literal Captain-Majed/Sebastian/Romeo artwork (copyright). Confirm.
4. **Games to feature as motifs**: confirm the shortlist — سبع حجار، الغميضة، طيارة ورق، قراقيعان، spinning tops, marbles. Any to add or drop?

---

## Experimentation Plan

1. Build each option as a standalone route under `/experiments/` (e.g. `/experiments/spacetoon`, `/experiments/qamariya`, `/experiments/notebook`, `/experiments/hybrid`).
2. Keep them independent — no shared layout, no shared theme provider. Each one fully commits to its aesthetic.
3. Use placeholder content (real project titles, lorem-ipsum bodies) so I'm comparing aesthetics, not copy.
4. After all four are walkable, pick the winner and promote it to the main route. Delete the rest.

## Status Legend

- `HaventTriedIt` — not built yet
- `InProgress` — actively building
- `Built` — walkable, ready to evaluate
- `Approved` — chosen as the direction
- `Rejected` — tried and ruled out (note why)
- `Pending` — built but on hold for a decision
