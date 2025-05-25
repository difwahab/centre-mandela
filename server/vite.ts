import type { Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${time} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: any) {
  const { createServer: createViteDevServer } = await import("vite");

  const clientRoot = path.resolve(__dirname, "../client");

  const vite = await createViteDevServer({
    root: clientRoot,
    configFile: path.resolve(clientRoot, "vite.config.ts"),
    server: {
      middlewareMode: true,
      hmr: process.env.NODE_ENV === "production" ? false : { server },
      allowedHosts: "all",
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const templatePath = path.resolve(clientRoot, "index.html");

      let template = await fs.promises.readFile(templatePath, "utf-8");

      // Ajout d'un paramètre cache-busting sur main.tsx
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
}

// ⛔️ En production, on n'utilise plus ce code
export async function serveStatic(_app: Express) {
  throw new Error(
    `serveStatic() est désactivé. Utilisez setupVite() en production pour un rendu sans build.`
  );
}
