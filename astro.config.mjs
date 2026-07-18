import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const site = loadEnv(mode, process.cwd(), 'PUBLIC_').PUBLIC_SITE_URL?.trim();

  if (!site) {
    throw new Error('PUBLIC_SITE_URL must be set to the production site URL before building.');
  }

  return {
    site,
    output: 'static',
    vite: {
      envPrefix: ['PUBLIC_']
    }
  };
});
