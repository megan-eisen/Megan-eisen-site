// ---------------------------------------------------------------------------
// Site content + config. All copy is pulled verbatim from the design references
// (Megan Eisen.dc.html / Óptimo.dc.html), which are the source of truth.
// ---------------------------------------------------------------------------

export const CONTACT_EMAIL = 'megan@meganeisen.com';
export const LINKEDIN_URL = 'https://linkedin.com/in/megan-eisen';
export const INSTAGRAM_URL = 'https://instagram.com/meg_n_reed';

// Contact form endpoint (Formspree). Submitted via fetch in ContactForm.astro
// with a plain POST `action` fallback for no-JS clients.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgyalyd';

// Prefilled mailto for the Óptimo "Book an intro call" CTA.
export const OPTIMO_INTRO_MAILTO =
  'mailto:megan@meganeisen.com?subject=%C3%93ptimo%20%E2%80%94%20intro%20call&body=Hi%20Megan%2C%0A%0AI%27d%20like%20to%20book%20an%20intro%20call.%0A%0ACompany%3A%20%0AWhere%20we%20are%3A%20%0AWhat%27s%20on%20my%20mind%3A%20%0A%0AThanks%2C';

// --- Megan page: live world clocks ---
export interface City {
  name: string;
  tz: string;
  tag: string;
  home: boolean;
}
export const CITIES: City[] = [
  { name: 'New York City', tz: 'America/New_York', tag: 'Here now', home: true },
  { name: 'Zürich', tz: 'Europe/Zurich', tag: '47.37°N', home: false },
  { name: 'Mexico', tz: 'America/Mexico_City', tag: '19.43°N', home: false },
];

// --- Megan page: executive snapshot stats ---
export interface Snapshot {
  stat: string;
  desc: string;
}
export const SNAPSHOT: Snapshot[] = [
  {
    stat: '20 yrs',
    desc: 'Across the business, the customer, and the product – where the experience is the product.',
  },
  {
    stat: '100+',
    desc: 'Org led across five continents, with VPs and senior directors reporting to me.',
  },
  { stat: '~$25M', desc: 'Budget owned – resources optimized, spend focused.' },
  {
    stat: '0 → ~1M',
    desc: 'Engaged users, built from zero on the platforms I directed, designed, delivered.',
  },
];

export const BUILT_INSIDE =
  'JPMorganChase · The Infatuation · Zagat · Avero · Four Seasons · Intuit';

// --- Megan page: selected work case cards ---
export interface Proof {
  val: string;
  label: string;
}
export interface Case {
  label: string;
  discipline: string;
  tags: string;
  pain: string;
  did: string;
  proof: Proof[];
  hasModal: boolean; // POST-LAUNCH: "Quality at Scale" flips this true to show the modal button
}
export const CASES: Case[] = [
  {
    label: 'Building Bridges',
    discipline: 'Business & operating',
    tags: 'Acquisition · Integration · Leadership transition',
    pain: 'You’re scaling or integrating, and no single leader can hold the business, the product, and the technical org at once – so decisions stall and someone referees instead of building.',
    did: 'I came in leading a team of two and grew it to eighteen across five countries – then was handed the product org itself: 100-plus people and five VPs and directors, spanning product, design, design engineering, and AI. Through the post-acquisition integration I stood in as technology leadership, set the company’s OKRs and operating cadence, and built the category strategy that made a new consumer vertical a lead driver of card-business growth.',
    proof: [
      { val: '2 → 100+', label: 'From leading a team of 2 to running the product org.' },
      { val: '~$25M', label: 'Budget owned.' },
      { val: '60M', label: 'Ecosystem my category strategy drove card growth across.' },
    ],
    hasModal: false,
  },
  {
    label: 'Connecting Ecosystems',
    discipline: 'Product & platform',
    tags: 'Strategy · Platform build · Integration',
    pain: 'You’ve got the audience and the ambition – but your content, bookings, benefits, and customer identity all live in separate places. Nothing compounds, and the spend you’re betting on never shows up.',
    did: 'A Fortune 500 was betting on dining to drive a step-change in card spend, but the pieces were disconnected. I owned the strategy and directed the build – a full replatform that pulled content, reservations, and a previously separate benefits system into one integrated hub, with authentication and account-linking built from zero underneath. On that foundation I shipped personalization and designed an AI concierge that became the product strategy going forward.',
    proof: [
      { val: '0 → ~1M', label: 'Authenticated accounts, built from zero.' },
      { val: '4 → 1', label: 'Content, reservations, and benefits unified into one hub.' },
      {
        val: 'AI-first',
        label: 'Personalization shipped; the AI concept became the go-forward strategy.',
      },
    ],
    hasModal: false,
  },
  {
    label: 'Quality at Scale',
    discipline: 'Design & experience',
    tags: 'Relaunch · New GTM · Scaling past PMF',
    pain: 'Scaling is quietly costing you the quality your customers loved. The roadmap optimizes the demo – and loses the person it was built for.',
    did: 'A full iOS and Android relaunch, with a new go-to-market – without letting the bar drop as it scaled. A design system, end-to-end flows, and a relentless customer standard built into the process, not bolted on after. Downloads and new users climbed, and 30-day retention broadly held as the base grew.',
    proof: [
      { val: '+150%', label: 'Monthly downloads.' },
      { val: '+30%', label: 'Sign-up rate.' },
      { val: '+15–20%', label: 'Monthly active users, each month.' },
    ],
    // POST-LAUNCH: intentionally hidden for launch. Flip to `true` to render the
    // "View the work →" button and enable the case-study modal.
    hasModal: false,
  },
];

// --- Megan page: "Quality at Scale" post-launch modal content ---
export const QAS_PAIN =
  '“Scaling is quietly costing you the quality your customers loved. The roadmap optimizes the demo – and loses the person it was built for.”';
export const QAS_STEPS: string[] = [
  'A full iOS and Android relaunch, paired with a new go-to-market – treated as one motion, not a design pass and a marketing pass.',
  'A design system and end-to-end flows built so the quality bar lived in the system, not in any one reviewer.',
  'A relentless customer standard built into the process – the person the product was for stayed in the room as it scaled.',
  'Delivery instrumented so downloads, sign-ups, and retention were watched together, never traded off against each other.',
];
export const QAS_OUTCOMES: Proof[] = [
  { val: '+150%', label: 'Monthly downloads.' },
  { val: '+30%', label: 'Sign-up rate.' },
  { val: '+15–20%', label: 'Monthly active users, each month.' },
  { val: 'Held', label: '30-day retention, broadly, as the base scaled.' },
];
export interface GallerySlot {
  slot: string;
  ph: string;
}
export const QAS_GALLERY: GallerySlot[] = [
  { slot: 'qas-ios', ph: 'iOS relaunch – key screens' },
  { slot: 'qas-android', ph: 'Android relaunch – key screens' },
  { slot: 'qas-proto', ph: 'Clickable prototype – core flow' },
  { slot: 'qas-ds', ph: 'Design system – components & tokens' },
];

// --- Megan page: career timeline ---
export interface Role {
  date: string;
  role: string;
  org: string;
}
export const TIMELINE: Role[] = [
  { date: '2026 – Present', role: 'Founder', org: 'Óptimo' },
  {
    date: '2024 – 2026',
    role: 'Executive Director, Head of Dining Product & Design',
    org: 'JPMorganChase',
  },
  {
    date: '2022 – 2024',
    role: 'Chief Experience Officer',
    org: 'The Infatuation & Zagat',
  },
  { date: '2021 – 2022', role: 'Vice President, Product & Design', org: 'The Infatuation' },
  { date: '2019 – 2021', role: 'Head of Product Design & Ops', org: 'Avero' },
];

// --- Óptimo page: "Who it's for" callout cards ---
export interface WhoCard {
  kicker: string;
  title: string;
  body: string;
}
export const WHO_CARDS: WhoCard[] = [
  {
    kicker: 'Scaling past PMF',
    title: 'Hospitality & travel-tech companies',
    body: "Where the roadmap has outgrown the founders' operating instinct and needs someone who's run the real thing.",
  },
  {
    kicker: 'Drifting apart',
    title: 'Guest-experience, PMS & booking platforms',
    body: 'Whose product and on-the-ground reality have quietly separated, and need one owner to pull them back together.',
  },
  {
    kicker: 'Moving into B2B',
    title: 'Consumer travel products selling to operators',
    body: "Who need operator credibility with hotels and hosts that they don't have in-house yet.",
  },
];

// --- Óptimo page: "Where I'm sharpest" inflection points ---
export interface Inflection {
  num: string;
  title: string;
  body: string; // may contain <strong> markup
}
export const INFLECTIONS: Inflection[] = [
  {
    num: '01',
    title: 'Scaling past product-market fit',
    body: 'Took a <strong>founder-led editorial company to a product-led business</strong> as Chief Experience Officer.',
  },
  {
    num: '02',
    title: 'Raising, being acquired, or integrating',
    body: 'Carried a founder-led company through its <strong>acquisition and integration into a Fortune 500</strong>.',
  },
  {
    num: '03',
    title: 'Launching a new product or capability',
    body: 'Directed a full iOS and Android relaunch to <strong>+150% monthly downloads</strong>, with a new go-to-market.',
  },
  {
    num: '04',
    title: 'Consolidating onto one platform',
    body: 'Unified <strong>content, reservations, and benefits into one hub</strong>, with identity built from zero underneath.',
  },
  {
    num: '05',
    title: 'Steering through a leadership transition',
    body: 'Held <strong>executive continuity</strong> through a leadership change, keeping delivery on track.',
  },
];

// --- Óptimo page: "The problem" symptom grid ---
export const SYMPTOMS: string[] = [
  'The roadmap starts optimizing the demo – and quietly loses the customer it was built for.',
  "Strategy gets set without the tech reality, so engineering inherits goals it can't ship.",
  "The org has scaled, but the operating model, cadences, and goals haven't – so decisions stall.",
  'Product, design, and customer teams each describe "the customer" a different way.',
  'You won early because people believed you understood their world – and that belief thins as you scale.',
  'No single leader can hold the customer, the product, and the business at once – so someone referees instead of building.',
];

// --- Óptimo page: offer panel arrow lists ---
export const OFFER_MONTH_ONE: string[] = [
  "A clear read on where the drift is – and what it's costing",
  'A first real fix, shipped inside the month',
  'The priorities that matter, in order',
];
export const OFFER_AFTER: string[] = [
  'Standing weekly presence, plus judgment on call between',
  'The business, the product, and the customer kept aligned',
  "Cancel with 15 days' notice, any time",
];

// --- Óptimo page: "What you get" numbered list ---
export interface Deliverable {
  num: string;
  title: string;
  body: string;
}
export const DELIVERABLES: Deliverable[] = [
  {
    num: '01',
    title: 'An operating model that scales with you',
    body: 'Vision, org design, working models, OKRs, and the cadences that make decisions move instead of stall – built through a founder-led company’s integration into a Fortune 500.',
  },
  {
    num: '02',
    title: "An executive who's owned the budget",
    body: "I've owned a ~$25M budget across headcount, tools, technology, and travel, and led a 100-plus-person org. Priorities from someone who knows what the numbers cost to hit, not just what they should be.",
  },
  {
    num: '03',
    title: 'Product that ships – and lands',
    body: 'A full iOS and Android relaunch that drove monthly downloads +150% and sign-ups +30% – without letting the bar drop as it scaled. Launches that move the business, not just the backlog.',
  },
  {
    num: '04',
    title: 'Scale that holds together',
    body: 'I unified content, reviews, reservations, and benefits into one platform – with authenticated identity built from zero to nearly a million accounts – inside a 60M-customer ecosystem.',
  },
  {
    num: '05',
    title: 'A relentless bar for the customer',
    body: 'Design judgment and customer priority woven through every call – from twenty years in businesses where the experience is the product.',
  },
];
