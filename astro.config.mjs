import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [react()],
  image: {
    // Disable default image optimization service to prevent Vercel build hangs.
    // This uses the 'noop' (no-operation) service, passing images through as-is.
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  vite: {
    ssr: {
      noExternal: ['three']
    }
  }
});
