import { defineConfig } from "vitest/config";
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
      "wouter": path.resolve(__dirname, "node_modules/wouter/out/index.js"), // 🔧 Résolution forcée
    },
  },

  optimizeDeps: {
    include: ["wouter"], // ✅ Préchargement pour dev
  },

  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },

  css: {
    postcss: path.resolve(__dirname, "client/postcss.config.js"),
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "vitest.setup.ts"),
  },
});
