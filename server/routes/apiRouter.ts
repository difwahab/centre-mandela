// server/routes/apiRouter.ts
import { Router } from "express";
import { z } from "zod";
import * as storage from "../storage";
import {
  insertUserSchema,
  insertAppointmentSchema,
  insertContactMessageSchema,
  insertNewsPostSchema,
} from "@shared/schema";

const router = Router();

// Users
router.get("/users", async (_: any, res: { json: (arg0: void) => void; }) => {
  const users = await storage.getUsers();
  res.json(users);
});

router.post("/users", async (req: { body: unknown; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors?: z.ZodIssue[]; message?: string; }): void; new(): any; }; }; }) => {
  try {
    const data = insertUserSchema.parse(req.body);
    const user = await storage.createUser(data);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// Appointments
router.get("/appointments/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: never) => void; }) => {
  const appointment = await storage.getAppointment(Number(req.params.id));
  if (!appointment) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(appointment);
});

router.delete("/appointments/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; send: { (): void; new(): any; }; }; }) => {
  const deleted = await storage.deleteAppointment(Number(req.params.id));
  if (!deleted) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(204).send();
});

// Contact Messages
router.get("/contacts", async (_: any, res: { json: (arg0: void) => void; }) => {
  const messages = await storage.getContactMessages();
  res.json(messages);
});

router.delete("/contacts/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; send: { (): void; new(): any; }; }; }) => {
  const deleted = await storage.deleteContactMessage(Number(req.params.id));
  if (!deleted) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(204).send();
});

// News
router.post("/news", async (req: { body: unknown; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors?: z.ZodIssue[]; message?: string; }): void; new(): any; }; }; }) => {
  try {
    const data = insertNewsPostSchema.parse(req.body);
    const post = await storage.createNewsPost(data);
    res.status(201).json(post);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/news/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; send: { (): void; new(): any; }; }; }) => {
  const deleted = await storage.deleteNewsPost(Number(req.params.id));
  if (!deleted) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(204).send();
});

export default router;