import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "../shared"),
    },
  },
  css: {
    preprocessorOptions: {
      // pour que les variables CSS définies globalement soient accessibles si besoin
      // (utile si tu utilises SCSS par exemple, sinon à ignorer)
    },
  },
});
