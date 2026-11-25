import { defineConfig } from 'astro/config';

// The web address is set by the GitHub publishing job (.github/workflows/deploy.yml),
// so the site works at username.github.io/RepoName/, at JummanFootprints.github.io,
// or later at your own domain, without changing any code.
export default defineConfig({
  site: process.env.SITE_URL || 'https://jumman55.github.io',
  base: process.env.BASE_PATH || '/',
});
