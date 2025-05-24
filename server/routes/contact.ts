import { Router } from "express";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";
import { storage } from "../storage";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const data = insertContactMessageSchema.parse(req.body);
    const result = await storage.createContactMessage(data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: error.errors });
    res.status(500).json({ message: "Error creating contact message" });
  }
});

export default router;
