import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname, 'client'),

  plugins: [
    react(),
    tsconfigPaths(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
    },
  },

  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },

  css: {
    postcss: path.resolve(__dirname, 'postcss.config.cjs'),
  },
});
