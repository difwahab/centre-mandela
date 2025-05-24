import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let testConfig = {};

if (process.env.NODE_ENV === "test" || process.env.VITEST === "true") {
  // Charger vitest uniquement en test
  // On importe ici uniquement si on est en test pour éviter l’erreur en prod
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { defineConfig } = require("vitest/config");
  testConfig = {
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: path.resolve(__dirname, "vitest.setup.ts"),
    },
  };
}

export default {
  root: path.resolve(__dirname, "client"),

  plugins: [
    react(),
    tsconfigPaths(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "wouter": path.resolve(__dirname, "node_modules/wouter/index.js"),
    },
  },

  optimizeDeps: {
    include: ["wouter"],
  },

  css: {
    postcss: path.resolve(__dirname, "postcss.config.cjs"),
  },

  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },

  ...testConfig,
};
