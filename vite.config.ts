import { defineConfig } from "vitest/config"; // pour config Vitest
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  css: {
    postcss: path.resolve(__dirname, "client/postcss.config.js"),
  },
  optimizeDeps: {
    include: [
      "wouter",
      "react-hook-form",
      "@radix-ui/react-tooltip",
      "@hookform/resolvers/zod",
    ],
  },
  ssr: {
    noExternal: [
      "wouter",
      "react-hook-form",
      "@radix-ui/react-tooltip",
      "@hookform/resolvers/zod",
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "vitest.setup.ts"),
  },
});
