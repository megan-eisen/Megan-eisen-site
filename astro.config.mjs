import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static marketing site — two routes: / (Megan Eisen) and /optimo (Óptimo).
// Output is fully static HTML; interactions are progressive-enhancement client scripts.
export default defineConfig({
  site: 'https://meganeisen.com',
  output: 'static',
  compressHTML: true,
  // Trailing slashes: GitHub Pages serves /optimo/ — keep links and the
  // sitemap consistent with that so canonicals don't fight the 301.
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'monthly',
      priority: 0.8,
      serialize(item) {
        // Home page is the primary entry point.
        if (item.url === 'https://meganeisen.com/') item.priority = 1.0;
        return item;
      },
    }),
  ],
});
