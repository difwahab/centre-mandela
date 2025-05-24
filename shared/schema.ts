// shared/schema.ts
import { z } from "zod";

/* -----------------------------------------
 * Appointment Schema
 * ----------------------------------------- */
export const insertAppointmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  date: z.string().min(1, "Date is required"),
  message: z.string().optional(),
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

/* -----------------------------------------
 * Contact Message Schema
 * ----------------------------------------- */
export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

/* -----------------------------------------
 * (Optionnel) Ajout futur : User, News, etc.
 * ----------------------------------------- */
// Tu peux ajouter d'autres schémas ici si besoin,
// mais sans dépendre du code serveur.
