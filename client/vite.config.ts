import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: ".", // le dossier `client/` est déjà le root
  plugins: [
    react(),
    tsconfigPaths(), // pour supporter les `@client/*`, `@shared/*` via tsconfig
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "../shared"),
    },
  },
  css: {
    postcss: path.resolve(__dirname, "postcss.config.cjs"),
  },
  appType: "custom", // important pour l'intégration avec Express
  server: {
    middlewareMode: true, // pour que Vite agisse comme middleware Express
    hmr: {
      port: 3000, // ou null pour utiliser le même port que Express
    },
  },
});
