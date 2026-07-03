# meganeisen.com

Two-page marketing site for **Megan Eisen** and her advisory practice, **Óptimo**,
built with [Astro](https://astro.build) (static output, near-zero client JS).

| Route     | Page                                    |
| --------- | --------------------------------------- |
| `/`       | Megan Eisen — personal brand / exec site |
| `/optimo` | Óptimo — advisory practice               |

The original design references (working `.dc.html` prototypes, the authoring
runtime, and the handoff spec) live in [`design_handoff/`](design_handoff/) for
reference only — none of that machinery ships. `design_handoff/README.md` is the
source-of-truth spec this site was built to.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → dist/
npm run preview    # serve the built dist/
```

> **Note on Node:** this machine had no Node.js installed, so a local Node 20 was
> downloaded into the scratchpad to build/preview. On a normal setup, install
> Node 18+ (`brew install node`, `nvm install 20`, etc.) and the commands above
> just work. Astro 4 requires Node 18.20+, 20.3+, or 22+.

## Project structure

```
public/assets/          copied photography + logo (grayscale treatment via CSS)
src/
  styles/global.css     design tokens, base classes, keyframes, reduced-motion
  lib/site.ts           all copy + data (cities, stats, cases, offer, timeline…)
  layouts/Base.astro    <head>, fonts, container width, motion bootstrap
  scripts/motion.ts     all interactions (see below), one entry: initMotion()
  components/
    ContactForm.astro   Formspree-wired contact form (fetch + inline status)
    CaseModal.astro     POST-LAUNCH "Quality at Scale" modal (built, hidden)
  pages/
    index.astro         Megan Eisen (/)
    optimo.astro        Óptimo (/optimo)
```

## Interactions

All reimplemented idiomatically in `src/scripts/motion.ts`, gated behind
`prefers-reduced-motion` (decorative motion) and `(pointer:fine)` (mouse-only):

headline reveal · pointer-lean/kinetic headline · scroll reveal · magnetic
buttons · square cursor ring · live world clocks (day/night dots) · scroll-spy
nav · chapter rail · stat scramble · index-numeral drift · hero parallax. The
Óptimo proof-bar marquee and the cyan offset-block hovers are pure CSS.

Reduced-motion is handled two ways: the media query in `global.css` neutralizes
transitions/animations and forces revealed content visible, and `motion.ts`
skips the decorative behaviors entirely.

## ⚠️ Before launch — configure the contact form

The contact form posts to **Formspree**. Create a form at
[formspree.io](https://formspree.io) and replace the placeholder ID in
[`src/lib/site.ts`](src/lib/site.ts):

```ts
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xxxxxxxx'; // ← real ID
```

Until it's set, the form shows an inline notice instead of silently failing. All
other CTAs are intentional `mailto:` links (fine to keep, per the handoff).

## Post-launch (built, currently OFF)

The **"Quality at Scale" case-study modal** on the Megan page is fully built but
hidden for launch, exactly as the handoff specifies. In
[`src/lib/site.ts`](src/lib/site.ts), `CASES[2].hasModal` is `false`, so the
"View the work →" trigger doesn't render and the modal stays inert.

To turn it on later:

1. Set that case's `hasModal: true` (re-enables the trigger button).
2. Drop real screenshots into the four gallery slots in
   [`src/components/CaseModal.astro`](src/components/CaseModal.astro) — the empty
   placeholders have ids `qas-ios`, `qas-android`, `qas-proto`, `qas-ds`. Swap
   each placeholder `<div>` for an `<img>`.

The other two cases use a "Request the full walkthrough →" `mailto:` by design.

## Assets

The `public/assets/megan-*.jpeg` images are **placeholders for final
photography**. Swap in licensed photos but keep the
`filter: grayscale(1) contrast(1.05)` treatment (applied via the `.photo` /
`.heroimg` classes) — it's core to the look.

## Handles to verify

`linkedin.com/in/megan-eisen` · `instagram.com/meg_n_reed` ·
`megan@meganeisen.com`. ("JPMorganChase" is intentionally one word; the
"business / product / customer pull apart" refrain is intentional.)
