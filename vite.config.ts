import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/default
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    outDir: './build',
  },
  publicDir: './public',
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  base:"/dynamic-pos/",
  server: {
    port: 3000,
  },
});
