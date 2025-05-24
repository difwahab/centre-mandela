import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';

export default defineConfig({
  root: path.resolve(__dirname, 'client'),

  plugins: [
    react(),
    tsconfigPaths(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
      'wouter': path.resolve(__dirname, 'node_modules/wouter/index.js'),
    },
  },

  optimizeDeps: {
    include: ['wouter'],
  },

  css: {
    postcss: path.resolve(__dirname, 'postcss.config.cjs'), // `.cjs` requis car PostCSS utilise CommonJS
  },

  build: {
    outDir: path.resolve(__dirname, 'dist/public'), // le client sera servi depuis le dossier dist/public
    emptyOutDir: true,
  },

  test: isTest
    ? {
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(__dirname, 'client/vitest.setup.ts'),
      }
    : undefined,
});
