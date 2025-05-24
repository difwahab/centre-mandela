import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users, appointments, contactMessages, newsPosts } from "./schema";

// Zod insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  role: true,
});

export const insertAppointmentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  examType: z.string(),
  preferredDate: z.string(),
  hasPrescription: z.union([z.literal(0), z.literal(1)]),
  message: z.string().optional(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertNewsPostSchema = createInsertSchema(newsPosts).pick({
  title: true,
  content: true,
  imageUrl: true,
  category: true,
});

// Optional: Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type InsertNewsPost = z.infer<typeof insertNewsPostSchema>;
