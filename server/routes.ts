import type { Express } from "express";
import authRoutes from "./auth/routes";
import appointmentRoutes from "./appointments/routes";
import contactRoutes from "./contact/routes";
import newsRoutes from "./news/routes";
import downloadRoutes from "./download/routes";

export function registerRoutes(app: Express): void {
  app.use("/api/auth", authRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/news", newsRoutes);
  app.use("/download-project", downloadRoutes);
}
