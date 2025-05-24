import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

// Résout __dirname pour ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viteLogger = createLogger();

// Logger personnalisé
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Mode développement : setup de Vite avec middlewares
export async function setupVite(app: Express, server: Server) {
  const clientRoot = path.resolve(__dirname, "../client");

  const vite = await createViteServer({
    root: clientRoot,
    configFile: path.resolve(__dirname, "../vite.config.ts"),
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: "all",
    },
    appType: "custom",
  });

  // Intègre les middlewares de Vite dans Express
  app.use(vite.middlewares);

  // Render HTML pour toutes les routes côté client
  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const clientTemplate = path.resolve(clientRoot, "index.html");

      let template = await fs.promises.readFile(clientTemplate, "utf-8");

      // Forcer le rechargement avec un identifiant unique
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

// Mode production : sert les fichiers statiques du client
export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../client/dist");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Le dossier de build est introuvable : ${distPath}. Assurez-vous d'avoir exécuté le build.`
    );
  }

  app.use(express.static(distPath));

  // Fallback pour le routage client (SPA)
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
