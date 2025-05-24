import * as dotenv from "dotenv";
import { existsSync } from "fs";

// 📦 Chargement du bon fichier .env selon l'environnement
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
if (existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config(); // fallback
}

import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// ✅ Middleware CORS
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? undefined // à adapter avec le vrai domaine Render
    : "http://localhost:5173",
  credentials: true,
}));

// ✅ Middlewares de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Logger des requêtes API
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJson: any;

  const originalJson = res.json;
  res.json = function (body: any) {
    capturedJson = body;
    return originalJson.call(this, body);
  };

  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const duration = Date.now() - start;
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJson) {
        logLine += ` :: ${JSON.stringify(capturedJson)}`;
      }
      if (logLine.length > 120) logLine = logLine.slice(0, 119) + "…";
      log(logLine);
    }
  });

  next();
});

(async () => {
  // ✅ Enregistre les routes API
  const server = await registerRoutes(app);

  // ✅ Gestion globale des erreurs
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // ✅ Dev : Vite middleware | Prod : fichiers statiques
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ✅ Démarrage du serveur
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  server.listen({ port, host: "0.0.0.0" }, () => {
    log(`✅ Server running on http://localhost:${port}`);
  });
})();
