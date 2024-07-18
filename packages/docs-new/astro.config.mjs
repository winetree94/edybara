import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4432,
  },
  integrations: [
    starlight({
      title: 'Edybara',
      customCss: [
        // Path to your Tailwind base styles:
        './src/tailwind.css',
      ],
      social: {
        github: 'https://github.com/winetree94/edybara',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Example Guide',
              slug: 'guides/example',
            },
          ],
        },
        {
          label: 'Reference',
          autogenerate: {
            directory: 'reference',
          },
        },
      ],
      defaultLocale: 'root',
      locales: {
        // English docs in `src/content/docs/en/`
        root: {
          label: 'English',
          lang: 'en', // lang is required for root locales
        },
        // Simplified Chinese docs in `src/content/docs/zh-cn/`
        ko: {
          label: '한국어',
          lang: 'ko-KR',
        },
      },
      components: {
        // force light theme
        ThemeProvider: './src/components/ThemeProvider.astro',
        // hide theme selector
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
