// routes.ts
import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import express from "express";
import cors from "cors";
import * as fs from "fs";
import * as path from "path";
import archiver from "archiver";
import { z } from "zod";

import { insertAppointmentSchema, insertContactMessageSchema } from "@shared/schema";
import { storage } from "./storage";

const SessionStore = MemoryStore(session);

// Middleware pour routes protégées
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated?.()) {
    return res.status(401).json({ message: "Non authentifié" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware global
  app.use(cors({
    origin: "http://localhost:5173", // à adapter selon domaine
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Sessions
  app.use(session({
    secret: process.env.SESSION_SECRET || "cabinet-benameur-radiologie",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
    },
    store: new SessionStore({ checkPeriod: 86400000 }),
  }));

  // Authentification
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      if (!user) return done(null, false, { message: "Nom d'utilisateur incorrect" });
      if (user.password !== password) return done(null, false, { message: "Mot de passe incorrect" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // --- Auth routes ---
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la déconnexion" });
      res.json({ message: "Déconnexion réussie" });
    });
  });

  app.get("/api/auth/user", requireAuth, (req, res) => {
    const user = req.user as any;
    res.json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  });

  // --- Appointments ---
  app.post("/api/appointments", async (req, res) => {
    try {
      const data = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(data);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Erreur lors de la création du rendez-vous" });
      }
    }
  });

  app.get("/api/appointments", requireAuth, async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch {
      res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous" });
    }
  });

  app.patch("/api/appointments/:id/status", requireAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      const updated = await storage.updateAppointmentStatus(id, status);
      if (!updated) return res.status(404).json({ message: "Rendez-vous non trouvé" });
      res.json(updated);
    } catch {
      res.status(500).json({ message: "Erreur lors de la mise à jour du statut" });
    }
  });

  // --- Contact ---
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Erreur lors de l'envoi du message" });
      }
    }
  });

  // --- News ---
  app.get("/api/news", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const posts = await storage.getNewsPosts(category);
      res.json(posts);
    } catch {
      res.status(500).json({ message: "Erreur lors de la récupération des articles" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const post = await storage.getNewsPost(id);
      if (!post) return res.status(404).json({ message: "Article non trouvé" });
      res.json(post);
    } catch {
      res.status(500).json({ message: "Erreur lors de la récupération de l'article" });
    }
  });

  // --- Download ZIP du projet ---
  app.get("/download-project", (req, res) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    res.attachment("cabinet-benameur-radiologie.zip");
    archive.pipe(res);

    const projectRoot = path.resolve(".");
    const toInclude = [
      "client",
      "server",
      "shared",
      "components.json",
      "drizzle.config.ts",
      "package.json",
      "tsconfig.json",
      "vite.config.ts"
    ];

    toInclude.forEach((item) => {
      const fullPath = path.join(projectRoot, item);
      if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          archive.directory(fullPath, item);
        } else {
          archive.file(fullPath, { name: item });
        }
      }
    });

    archive.finalize();
  });

  // --- Static files ---
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

  // --- Retourne le serveur HTTP ---
  const httpServer = createServer(app);
  return httpServer;
}
