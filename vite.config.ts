import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path from "path";

export default defineConfig(async () => {
  const plugins = [
    react(),
    tsconfigPaths(),
    runtimeErrorOverlay(),
  ];

  // Replit uniquement (facultatif)
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
  ) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return {
    root: path.resolve(__dirname, "client"),
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
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
  };
});
