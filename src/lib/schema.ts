// ---------------------------------------------------------------------------
// Structured data (JSON-LD), centralized so every page emits ONE consistent
// entity graph. The goal is brand-entity dominance for "Megan Eisen": a single
// Person node, referenced by a stable @id across the whole site, so Google
// consolidates it into one entity (and, ideally, a Knowledge Panel) rather than
// confusing it with the other people who share the name.
//
// The @id values are stable identifiers, NOT fetchable URLs — they're how nodes
// cross-reference each other within and across pages.
// ---------------------------------------------------------------------------

import { CONTACT_EMAIL, LINKEDIN_URL, INSTAGRAM_URL } from './site';

const SITE = 'https://meganeisen.com';

export const PERSON_ID = `${SITE}/#megan`;
export const WEBSITE_ID = `${SITE}/#website`;
export const OPTIMO_ID = `${SITE}/optimo#practice`;

// The one authoritative Person node. Everything else references it by @id.
//
// sameAs is the highest-leverage field for entity disambiguation: every URL
// here should be an authoritative profile that (ideally) links back to
// meganeisen.com. Keep this list accurate and reciprocal — a wrong URL hurts.
export const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Megan Eisen',
  url: `${SITE}/`,
  image: `${SITE}/og-megan.jpg`,
  jobTitle: 'Product, Design & Business Operations Executive',
  description:
    'Executive leading business, product, and customer experience — from founder-led companies to Fortune 500. Founder of the advisory practice Óptimo.',
  email: `mailto:${CONTACT_EMAIL}`,
  worksFor: { '@id': OPTIMO_ID },
  knowsAbout: [
    'Product management',
    'Design leadership',
    'Business operations',
    'Customer experience',
    'Operating models',
    'Hospitality and travel technology',
    'Post-acquisition integration',
  ],
  // TODO: expand with every authoritative profile Megan controls (see README).
  sameAs: [LINKEDIN_URL, INSTAGRAM_URL],
};

// Claims "Megan Eisen" as the site name in search results and ties the domain
// to the brand. publisher/author point at the Person entity by @id.
export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE}/`,
  name: 'Megan Eisen',
  description:
    'The personal site of Megan Eisen — product, design, and business operations executive, and founder of Óptimo.',
  inLanguage: 'en-US',
  publisher: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
};

// Óptimo, the advisory practice — founded and provided by the same Person.
export const optimo = {
  '@type': 'ProfessionalService',
  '@id': OPTIMO_ID,
  name: 'Óptimo',
  url: `${SITE}/optimo`,
  image: `${SITE}/og-optimo.jpg`,
  description:
    'Advisory practice for founder-led businesses where the experience is the product. One engagement, one senior partner in the room.',
  email: `mailto:${CONTACT_EMAIL}`,
  areaServed: 'Worldwide',
  serviceType: 'Executive advisory and operating-model consulting',
  founder: { '@id': PERSON_ID },
  provider: { '@id': PERSON_ID },
  offers: {
    '@type': 'Offer',
    price: '18000',
    priceCurrency: 'USD',
    description:
      'Typical monthly advisory engagement — advisory in the ear or hands-on in the org. Cancel with 15 days notice.',
    availability: 'https://schema.org/LimitedAvailability',
  },
};

/** Build the JSON-LD @graph for a page from the shared nodes. */
export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
