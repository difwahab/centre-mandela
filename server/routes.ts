import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { z } from "zod";
import { 
  insertAppointmentSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';

const SessionStore = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup sessions
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "cabinet-benameur-radiologie",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production", maxAge: 86400000 }, // 1 day
      store: new SessionStore({
        checkPeriod: 86400000, // 1 day
      }),
    })
  );

  // Setup passport for authentication
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure passport
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Nom d'utilisateur incorrect" });
        }
        
        // In a real app, we would compare hashed passwords
        if (user.password !== password) {
          return done(null, false, { message: "Mot de passe incorrect" });
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // API Routes
  
  // Authentication routes
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({ 
          id: user.id, 
          username: user.username, 
          fullName: user.fullName,
          email: user.email,
          role: user.role
        });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = req.user as any;
    res.json({ 
      id: user.id, 
      username: user.username, 
      fullName: user.fullName,
      email: user.email,
      role: user.role
    });
  });

  // Appointment routes
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Error creating appointment" });
    }
  });

  app.get("/api/appointments", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving appointments" });
    }
  });

  app.patch("/api/appointments/:id/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const { id } = req.params;
    const { status } = req.body;
    
    try {
      const appointment = await storage.updateAppointmentStatus(Number(id), status);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Error updating appointment status" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Error creating contact message" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const posts = await storage.getNewsPosts(category);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving news posts" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
      const post = await storage.getNewsPost(Number(id));
      if (!post) {
        return res.status(404).json({ message: "News post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving news post" });
    }
  });

  // Route pour télécharger le projet complet en ZIP
  app.get("/download-project", (req, res) => {
    const archive = archiver('zip', {
      zlib: { level: 9 } // Niveau de compression maximum
    });
    
    res.attachment('cabinet-benameur-radiologie.zip');
    archive.pipe(res);
    
    // Ajouter les dossiers principaux du projet
    const projectRoot = path.resolve('.');
    
    // Ajouter les dossiers principaux
    ['client', 'server', 'shared', 'components.json', 'drizzle.config.ts', 'package.json', 'tsconfig.json', 'vite.config.ts']
      .forEach(item => {
        const itemPath = path.join(projectRoot, item);
        if (fs.existsSync(itemPath)) {
          const stat = fs.statSync(itemPath);
          if (stat.isDirectory()) {
            archive.directory(itemPath, item);
          } else {
            archive.file(itemPath, { name: item });
          }
        }
      });
    
    archive.finalize();
  });

  const httpServer = createServer(app);
  return httpServer;
}
