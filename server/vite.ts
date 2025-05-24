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
  // ✅ Import dynamique pour éviter de casser la build
  const { createServer: createViteDevServer } = await import("vite");

  const clientRoot = path.resolve(__dirname, "../client");

  const vite = await createViteDevServer({
    root: clientRoot,
    configFile: path.resolve(__dirname, "../vite.config.ts"),
    server: {
      middlewareMode: true,
      hmr: { server },
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

export async function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../client/dist");

  if (!fs.existsSync(distPath)) {
    throw new Error(`Build non trouvé : ${distPath}. Exécute "npm run build"`);
  }

  app.use((await import("express")).default.static(distPath));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
