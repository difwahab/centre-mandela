import express, { type Express } from "express";
import { createServer } from "http";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import path from "path";
import { setupVite, log } from "./vite";
import { registerRoutes } from "./routes";

const PORT = Number(process.env.PORT) || 3000;

const app: Express = express();
const httpServer = createServer(app);

// 🔐 Sécurité + compression + parsing JSON
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// 📁 Uploads (ex: /uploads/image.jpg)
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// 🔁 Routes API (auth, appointments, etc.)
registerRoutes(app);

// 🚀 Serveur toujours en mode Vite dynamique
async function startServer() {
  try {
    log("🌍 Mode unique : Vite + Express dynamique (dev + prod)", "server");
    await setupVite(app, httpServer);

    httpServer.listen(PORT, () => {
      log(`✅ Serveur prêt sur http://localhost:${PORT}`, "server");
    });
  } catch (err) {
    console.error("❌ Erreur serveur :", err);
    process.exit(1);
  }
}

startServer();
