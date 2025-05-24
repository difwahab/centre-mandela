import { Router } from "express";
import { z } from "zod";
import { insertAppointmentSchema } from "@shared/schema";
import { storage } from "../storage";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const data = insertAppointmentSchema.parse(req.body);
    const result = await storage.createAppointment(data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: error.errors });
    res.status(500).json({ message: "Error creating appointment" });
  }
});

router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
  try {
    const appointments = await storage.getAppointments();
    res.json(appointments);
  } catch {
    res.status(500).json({ message: "Error retrieving appointments" });
  }
});

router.patch("/:id/status", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await storage.updateAppointmentStatus(Number(id), status);
    if (!updated) return res.status(404).json({ message: "Appointment not found" });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating appointment status" });
  }
});

export default router;
