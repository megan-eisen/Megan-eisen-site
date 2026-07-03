# Handoff: meganeisen.com — Personal Brand Site + Óptimo

## Overview
Two linked pages for **Megan Eisen**, a product/design/operations executive:
1. **meganeisen.com** — the personal brand / executive site (`Megan Eisen.dc.html`)
2. **Óptimo** — her advisory practice for founder-led companies (`Óptimo.dc.html`)

The two pages cross-link (header nav + inline links) and share one visual system. The look is **editorial, hard-edged, and confident**: cool off‑white paper, near‑black ink, a Gloock serif display face, Newsreader italic accents in indigo, and Hanken Grotesk for everything else. Two electric accents — **indigo** and **cyan** — used with restraint. **No border‑radius anywhere.**

## About the Design Files
The files in this bundle are **design references authored in HTML** — working prototypes that show the intended look, motion, and behavior. They are **not production code to ship as‑is**.

They're built as "Design Components" (`.dc.html`) that run against a small bundled runtime (`support.js`) — a template/logic layer specific to the authoring tool. **Do not port `support.js` or the `.dc.html` format into production.** Instead, **recreate these designs in the target codebase's environment** (React/Next, Vue, Astro, plain HTML/CSS, etc.) using its established patterns. If there's no environment yet, a static‑site framework (Astro, Next, or even hand‑authored HTML/CSS + a dash of JS) is a good fit — this is a marketing site, not an app.

Everything visual is expressed with **inline styles and a small `<style>` block** in each file's `<helmet>`. The logic (animations, tab switching, live clocks, the case modal) lives in a `class Component extends DCLogic` block at the bottom of each file — read it as a behavior spec, then reimplement idiomatically.

## Fidelity
**High‑fidelity.** Final colors, type, spacing, copy, and interactions. Recreate pixel‑close using the exact tokens below. Where a value is `clamp(min, vw, max)`, that's a fluid responsive value — keep it.

---

## ⚠️ POST‑LAUNCH — kept in the code, intentionally not live yet

**Case‑study walkthrough modal ("Quality at Scale").**
On meganeisen.com → **Selected Work**, the third case ("Quality at Scale") has a **full detail modal already built** (problem → what I did → proof → a 4‑image visual‑proof gallery). It is **hidden for launch**: in the logic class, `CASES[2].hasModal` is set to **`false`**, so the "View the work →" button doesn't render. The modal markup and logic remain in the file.

To turn it on post‑launch:
1. Set that case's `hasModal: true` (re‑enables the "View the work →" button).
2. Fill the four image placeholders in the modal gallery — these are `<image-slot>` elements with ids `qas-ios`, `qas-android`, `qas-proto`, `qas-ds` (iOS screens, Android screens, clickable prototype, design system). In production these become normal `<img>`/gallery slots; supply real screenshots.
3. The other two cases ("Building Bridges", "Connecting Ecosystems") have `hasModal: false` **by design** — they use a "Request the full walkthrough →" mailto instead. Leave as‑is unless Megan wants modals for them too.

Everything else on both pages is **launch‑ready**.

---

## Other flags before you build

- **Production routes.** Map the two pages to real routes: `Megan Eisen.dc.html` = `/` (home, meganeisen.com), `Óptimo.dc.html` = `/optimo`. The cross‑page links currently point at the literal filenames — swap these for your routes.
- **Forms are mailto‑based.** The contact form (`<form action="mailto:…" method="post">`) and all "Book an intro call / Let's talk / Request résumé" CTAs are `mailto:` links. `mailto` form submission is unreliable across browsers — **wire the contact form to a real handler** (Formspree, a serverless function, your ESP) at build time. The CTA `mailto:` links are fine to keep.
- **Photography.** The `assets/megan-*.jpeg` images are placeholders standing in for Megan's real photography. Swap in final licensed photos; **keep the `filter: grayscale(1) contrast(1.05)` treatment** on all of them — it's core to the look.
- **Résumé link** is a `mailto:` request with no file attached; post‑launch, consider hosting a PDF and linking it directly.
- **Verify handles:** `linkedin.com/in/megan-eisen`, `instagram.com/meg_n_reed`, `megan@meganeisen.com`.
- **Copy note (Megan's call, left as‑is):** the phrase *"…where the business, the product, and the customer pull apart / hold them together when scale is pulling them apart"* recurs a few times across both pages. Intentional refrain, not a bug. Also **"JPMorganChase" is intentionally one word** everywhere.

---

## Screens / Views

### Page 1 — meganeisen.com (`Megan Eisen.dc.html`)
Centered container `max-width: 1180px`, fluid side padding `clamp(1.25rem, 5vw, 4rem)`. Sticky 66px header. Sections separated by full‑width `1px solid ink` top rules, fluid vertical padding `clamp(3.2rem, 5.5vw, 5.5rem)`. Section order:

1. **Sticky header** — logo (`logo-megan.png` 23px + "Megan Eisen" in Gloock) · nav (Work, About, "Óptimo →") · "Let's talk" solid‑ink button (right). Paper @ 90% + 12px backdrop blur, 1px ink bottom border. Nav hidden < 860px.
2. **Hero** — 2‑col grid `1.05fr / 0.95fr`, collapses to 1col < 860px. Left: eyebrow (all‑caps indigo) "Founder • Óptimo – Exec • Product, Design, Business Ops"; H1 (see copy); subhead; CTA row ("Let's talk →" solid indigo, on its own the only CTA now). Right: portrait (`megan-glasses.jpeg`) on an indigo base with a **cyan offset block** top‑right, over a bordered **live world‑clock panel** (home city + two others, ticking, with day/night dot logic).
3. **Executive snapshot** — light `--bd` section. A **framed "snapshot card"**: 1px ink border + soft shadow, a 4‑up stat grid (hairline‑ruled cells), footer strip "Built inside: JPMorganChase · The Infatuation · Zagat · Avero · Four Seasons · Intuit". Top meta line "As of 2026 · Working globally". Stats: `20 yrs`, `100+`, `~$25M`, `0 → ~1M`. Collapses to 2‑up < 860px.
4. **Selected Work** — **dark** (`--ink`) section. Horizontal scroll‑snap row of case cards (filled translucent panels `rgba(255,255,255,0.05)`, no borders). Each: label (cyan), discipline, tags, an italic pain quote, a "what I did" paragraph, cyan proof stats, and a "Request the full walkthrough →" cyan link (+ "View the work →" button only where `hasModal` — see POST‑LAUNCH).
5. **Experience** — light `--bd`. **2‑col** `0.92fr / 1.08fr` (collapses < 860px). Left: eyebrow, heading, geographic + career‑arc prose. Right: a **"Career timeline"** (2px ink header rule) — each role bold with right‑aligned dates and the org beneath, hairline‑separated; "Before 2019 … Request résumé →" note at the base.
6. **The person you'd work with** — tabbed: **At work** / **As a human** (segmented control, 1px ink border, active = solid ink). Left column text swaps per tab; right column portrait swaps (`megan-cafe.jpeg` ↔ `megan-studio.jpeg`) with a cyan offset block + a caption that swaps per tab.
7. **Work with me** — light `--bd`. Heading + intro, then a **dark Óptimo promo block** (`--ink`, cyan corner block, cyan "See Óptimo →" button, filled cyan‑tint spec chips). Then a fractional/board note + a standalone "Let's talk →" link on its own line.
8. **Contact** — **indigo** (`--ind`) section. Left: heading, blurb, cyan email button, locations, "See where I am →". Right: contact form with **filled translucent fields** (`rgba(255,255,255,0.1)`, no underlines), cyan "Send it →" button. Footer row: © + Óptimo / LinkedIn / Email.
9. **Case modal** (hidden for launch — see POST‑LAUNCH).

### Page 2 — Óptimo (`Óptimo.dc.html`)
Same system; container `max-width: 1120px`. Section order:

1. **Sticky header** — logo + "/" + "Óptimo" (Gloock) · nav ("How it works", "Megan Eisen →") · "Book an intro call" indigo button.
2. **Hero** — **dark** (`--ink`), single column: eyebrow (cyan), H1 (cyan italic accent), subhead, CTA row ("Book an intro call →" cyan + "See how it works" cyan‑underline link).
3. **Full‑bleed photo band** — edge‑to‑edge grayscale `megan-keynote.jpeg`, `height: clamp(320px, 38vw, 480px)`, `object-position: 50% 16%`, with an overlaid cyan caption chip bottom‑left ("Megan Eisen · in the room").
4. **Proof bar** — light `--bd`, a label + a **marquee** of employer names (auto‑scroll, pauses on hover, edge fade mask).
5. **The problem** — paper. Heading (indigo italic accent) + intro + a 6‑cell symptom grid + an italic closing pullquote.
6. **Who — and when** — light `--bd`. 2‑col: left = **"Who it's for" callout cards** (bordered paper cards, cyan offset block peeking behind the top‑right corner, lift on hover); right = "Where I'm sharpest" numbered inflection list. Below: an indigo "Who I work with directly" block.
7. **How it works** — **dark** (`--ink`). Heading + intro, then the **offer** as **filled glass panels** (no borders): a price panel ($18,000 / month — **static, not animated**), two side‑by‑side panels ("Month one – defined" / "After that – continuous") with cyan labels + arrow lists, and fine‑print chips. Then a **"Getting started is simple"** frictionless bar (filled cyan‑tint panel): *Send one email → A 30‑minute call → Start within the month* + reassurance + a cyan "Book an intro call →" button.
8. **What you get** — paper. Numbered 5‑item ruled list.
9. **Why Óptimo** — light `--bd`. 2‑col: left = intro heading ("For twenty years, I've led the business, the product, and the experience – *as one job.*") + prose; right = portrait (`megan-street.jpeg`) with cyan offset block + caption. Then a **full‑width italic pullquote** and "The full record … → More about Megan" (links to meganeisen.com).
10. **Start here** — **indigo** CTA section, centered: heading + blurb + cyan "Book an intro call →" (mailto with prefilled subject/body).
11. **Footer** — Óptimo wordmark, LinkedIn / Email, © 2026.

---

## Exact copy
Pull final strings directly from the two HTML files (they are the source of truth). Key headlines:
- **Megan hero H1:** "I hold the business, the product, and the customer experience together *– from founder‑led to Fortune 500.*" (italic indigo on "– from founder‑led to Fortune 500.")
- **Megan hero subhead:** "Twenty years leading business, product, and experience across hospitality and travel – where the experience is the product. Most recently Chief Experience Officer, carrying **The Infatuation** through its acquisition by **JPMorganChase**. Now, through **Óptimo**, I do it for founders and teams at their hardest moments of change."
- **Óptimo hero H1:** "You built something people love. *I help it hold up as it grows.*" (italic cyan on the second sentence)

---

## Interactions & Behavior
All motion is quick and purposeful — never bouncy. Reimplement with your framework's animation approach (CSS + a little JS, or Framer Motion, etc.). Respect `prefers-reduced-motion`.

- **Headline reveal ("recal"):** on load, hero words rise from `translateY(-0.4em)` + `blur(5px)` + `opacity:0` to settled, staggered ~50ms per word, `cubic-bezier(.22,.92,.26,1)`, ~820ms each. (Web Animations API in the prototype.)
- **Pointer‑lean headline:** hero words drift slightly toward the cursor (magnetic), spring back on leave. Desktop/fine‑pointer only.
- **Scroll reveal:** section elements fade up 18px, `ease-out (.2,.7,.2,1)`, ~0.7s, via IntersectionObserver (`[data-reveal]`).
- **Magnetic buttons:** CTAs drift toward the cursor within their bounds, spring back on leave (`[data-mag]`).
- **Cursor ring:** a hard‑edged (square, no radius) 30px indigo ring trails the cursor with lerp easing; grows to ~50px and turns cyan over interactive elements. Desktop/fine‑pointer only.
- **Index numeral drift:** oversized section numerals (where present) parallax‑drift on scroll. (Note: on meganeisen.com the numerals were removed; the drift code is harmless with none present.)
- **Offset‑block snap:** cyan offset blocks behind portraits/cards animate on hover (`translate` ~0.45s).
- **Marquee:** Óptimo proof bar auto‑scrolls (`translateX(-50%)`, ~26s linear, infinite), pauses on hover, with a left/right fade mask.
- **Live clocks:** Megan hero city panel shows live local times via `Intl.DateTimeFormat` (per‑timezone), ticking each second; a cyan/grey dot indicates awake (07:00–23:00) vs. asleep; the home city's dot pulses.
- **Tabbed "person you'd work with":** segmented control toggles text + portrait + caption (`At work` / `As a human`).
- **Scroll‑spy nav:** Megan nav underline follows the section in view.
- **Case modal (post‑launch):** click "View the work →" → dark scrim (`rgba(10,12,14,.55)` + 4px blur), panel animates up + fades in, body scroll locked, Esc / click‑outside / ✕ to close.
- **Hover states:** buttons lift 2px; ghost/tag chips invert to solid ink; work cards brighten; nav links darken + gain an indigo underline; "Who it's for" cards lift 4px.
- **Focus:** cyan outline offset 4px. No shrink‑on‑press.

## State Management
Minimal, per page:
- **Megan:** `tab` ('work' | 'human') for the About section; `modalOpen` (bool) for the case modal (post‑launch). Live‑clock interval (1s). Derived: home vs. other cities.
- **Óptimo:** essentially stateless (scroll/animation effects only).
No data fetching. All content is static/local.

## Design Tokens
```
Color
  --pp  paper (page bg)      #EFF2F6   (cool off-white)
  --bd  paper-2 (alt bg)     #E4E9F0
  --pp2 paper-3              #E1E7EF
  --ink ink (text/dark bg)   #14161A
  --ind indigo (primary)     #2422E8
  --cy  cyan (accent)        #0AFFFB
  --mut muted grey           #7B818B
  --line hairline            #D2D8E0
  body copy greys            #4C5560, #39414C, #565E68, #363C46
  dark-section light text    rgba(233,238,244, .55–.9)
  dark-section fill panels   rgba(255,255,255, .04–.06)
  cyan-tint panel            rgba(10,255,251, .08)

Type
  Display  Gloock (serif), weight 400, letter-spacing -0.008em (headlines tighter, to -0.016em)
  Accent   Newsreader italic, weight 500, in indigo (or cyan on dark) — ONE per heading
  UI/body  Hanken Grotesk, 400–700
  Labels   Hanken 600, 0.5–0.7rem, uppercase, letter-spacing 0.18em
  Line-height: display ~1.0–1.1; body 1.6–1.7
  (All three are Google Fonts — loaded via <link> in each file's <helmet>.)

Corners   0 everywhere (no border-radius). Cursor ring is square too.
Borders   structural = 1px solid ink; stat rules = 2px ink; hairline = #D2D8E0
          Links = 2px indigo bottom-border underline.
          On dark backgrounds, use FILLED translucent panels + gaps, NOT hairlines.
Shadow    soft under floated photos: 0 18px 44px rgba(0,0,0,.14);
          snapshot card: 0 16px 40px rgba(20,30,50,.10); modal: deep scrim shadow
Layout    container 1180px (Megan) / 1120px (Óptimo); side pad clamp(1.25rem,5vw,4rem)
          section pad clamp(3.2rem,5.5vw,5.5rem); breakpoint 860px
Motion    ease-out cubic-bezier(.2,.7,.2,1); reveal ~0.7s; magnetic springs cubic-bezier(.2,.9,.2,1)
Icons     none (Unicode glyphs only: → arrow, ✕ close, · middot, pulsing dot). No emoji.
```

## Assets (`assets/` in this bundle)
- `logo-megan.png` — wordmark logo mark (both headers)
- `megan-glasses.jpeg` — Megan hero portrait
- `megan-cafe.jpeg` — About "At work" portrait
- `megan-studio.jpeg` — About "As a human" portrait
- `megan-keynote.jpeg` — Óptimo full‑bleed hero band (on stage)
- `megan-street.jpeg` — Óptimo "Why" section portrait
All are **placeholders for final photography**; apply `grayscale(1) contrast(1.05)`. The case‑modal gallery (post‑launch) needs 4 more images (iOS, Android, prototype, design system).

## Files in this bundle
- `Megan Eisen.dc.html` — meganeisen.com design reference
- `Óptimo.dc.html` — Óptimo design reference
- `support.js` — authoring‑tool runtime (**reference only — do not ship**)
- `image-slot.js` — drag‑drop image placeholder web component used by the post‑launch case modal (reference only)
- `assets/` — the 6 images above

> Tip: open either `.dc.html` in a browser to see the design live and read the `<style>` + logic class as the spec. Recreate in your stack; don't copy the `.dc.html`/`support.js` machinery.
