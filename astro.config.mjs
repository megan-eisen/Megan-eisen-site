import { defineConfig } from 'astro/config';

// Static marketing site — two routes: / (Megan Eisen) and /optimo (Óptimo).
// Output is fully static HTML; interactions are progressive-enhancement client scripts.
export default defineConfig({
  site: 'https://meganeisen.com',
  output: 'static',
  compressHTML: true,
});
