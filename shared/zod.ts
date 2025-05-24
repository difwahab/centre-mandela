import { z } from "zod";

// Appointments
export const insertAppointmentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email().optional(),
  examType: z.string().min(1),
  preferredDate: z.string().min(1),
  hasPrescription: z.union([z.literal(0), z.literal(1)]),
  message: z.string().optional(),
});

// Contact messages
export const insertContactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});
