import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), mdx(), tailwind({ applyBaseStyles: false })],
  site: 'https://terra-world-index.example.com',
});
