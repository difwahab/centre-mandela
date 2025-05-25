import express, { type Express } from "express";
import { createServer } from "http";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import path from "path";
import { setupVite, serveStatic, log } from "./vite";
import { registerRoutes } from "./routes";

const isDev = process.env.NODE_ENV !== "production";
const PORT = Number(process.env.PORT) || 3000;

const app: Express = express();
const httpServer = createServer(app);

// 🌐 Middlewares globaux
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// 📁 Fichiers statiques : /uploads/*.jpg, *.pdf, etc.
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// 📦 Routes API
registerRoutes(app);

// 🚀 Démarrage du serveur
async function startServer() {
  try {
    if (isDev) {
      log("Mode développement activé", "server");
      await setupVite(app, httpServer);
    } else {
      log("Mode production activé", "server");
      await serveStatic(app); // 👈 Ajout du `await` si `serveStatic` devient async
    }

    httpServer.listen(PORT, () => {
      log(`Serveur prêt sur http://localhost:${PORT}`, "server");
    });
  } catch (err) {
    console.error("❌ Erreur lors du démarrage du serveur :", err);
    process.exit(1);
  }
}

startServer();
