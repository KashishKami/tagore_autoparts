import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file' // Generates about.html instead of about/index.html
  }
});
