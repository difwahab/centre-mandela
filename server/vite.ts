import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import { createServer as createViteDevServer } from "vite"; // ✅ OK en local

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function setupVite(app: Express, server: Server) {
  const clientRoot = path.resolve(__dirname, "../client");

  const vite = await createViteDevServer({
    root: clientRoot,
    configFile: path.resolve(__dirname, "../vite.config.ts"),
    server: {
      middlewareMode: true,
      hmr: { server },
      watch: { usePolling: true }, // Pour compatibilité Render
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const templatePath = path.resolve(clientRoot, "index.html");
      let template = await fs.promises.readFile(templatePath, "utf-8");

      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const dist = path.resolve(__dirname, "../client/dist");

  if (!fs.existsSync(dist)) {
    throw new Error(`Build manquant : ${dist} introuvable.`);
  }

  app.use(express.static(dist));
  app.use("*", (_, res) => {
    res.sendFile(path.resolve(dist, "index.html"));
  });
}
