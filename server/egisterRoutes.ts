import type { Express } from "express";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "./auth/passport";
import authRoutes from "./routes/auth";
import appointmentsRoutes from "./routes/appointments";
import contactMessagesRoutes from "./routes/contactMessages";
import newsPostsRoutes from "./routes/newsPosts";
import downloadRoutes from "./routes/download";

export async function registerRoutes(app: Express) {
  const SessionStore = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "cabinet-benameur-radiologie",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({ checkPeriod: 86400000 }),
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 1 day
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Mount all modular routes
  app.use("/api/auth", authRoutes);
  app.use("/api/appointments", appointmentsRoutes);
  app.use("/api/contact", contactMessagesRoutes);
  app.use("/api/news", newsPostsRoutes);
  app.use("/download-project", downloadRoutes);
}