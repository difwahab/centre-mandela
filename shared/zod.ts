// shared/schema.zod.ts
import { z } from "zod";

export const insertAppointmentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email().optional(),
  examType: z.string().min(1),
  preferredDate: z.string().min(1),
  hasPrescription: z.union([z.literal(0), z.literal(1)]),
  message: z.string().optional(),
});

export const insertContactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  role: z.string().optional(),
});

export const insertNewsPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url().optional(),
  publishDate: z.string().optional(),
  category: z.string().optional(),
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertNewsPost = z.infer<typeof insertNewsPostSchema>;
