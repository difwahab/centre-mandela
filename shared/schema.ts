// ✅ shared/schema.ts
import { z } from "zod";

// --- Appointment Schema ---
export const insertAppointmentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  date: z.string(),
  message: z.string().optional(),
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

// --- Contact Message Schema ---
export const insertContactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// ✅ server/routes.ts
import express from "express";
import * as appointments from "@server/queries/appointments";
import * as contact from "@server/queries/contact";
import * as news from "@server/queries/news";
import * as users from "@server/queries/users";
import passport from "passport";
import { z } from "zod";
import { insertAppointmentSchema, insertContactMessageSchema } from "@shared/schema";

const router = express.Router();

router.post("/appointments", async (req, res) => {
  try {
    const data = insertAppointmentSchema.parse(req.body);
    const result = await appointments.createAppointment(data);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err instanceof z.ZodError ? err.errors : err });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const data = insertContactMessageSchema.parse(req.body);
    const result = await contact.createContactMessage(data);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err instanceof z.ZodError ? err.errors : err });
  }
});

router.get("/news", async (_req, res) => {
  const result = await news.getAllNews();
  res.json(result);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

export default router;
