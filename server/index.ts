import express, { type Express } from "express";
import { setupVite, serveStatic } from "./vite";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { setupVite, serveStatic, log } from "./vite";
import { registerRoutes } from "./routes";

const isDev = process.env.NODE_ENV !== "production";
const PORT = Number(process.env.PORT) || 3000;

const app: Express = express();
const httpServer = createServer(app);

// Middlewares de sécurité et compression
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Enregistrement des routes API
registerRoutes(app);

// Initialisation serveur avec support Vite
async function startServer() {
  if (isDev) {
    log("Mode développement activé", "server");
    await setupVite(app, httpServer);
  } else {
    log("Mode production activé", "server");
    serveStatic(app);
  }

  httpServer.listen(PORT, () => {
    log(`Serveur prêt sur http://localhost:${PORT}`, "server");
  });
}

startServer().catch((err) => {
  console.error("Erreur lors du démarrage du serveur :", err);
  process.exit(1);
});
