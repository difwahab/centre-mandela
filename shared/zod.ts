// shared/zod.ts
import { createInsertSchema } from "drizzle-zod";
import { users, appointments, contactMessages, newsPosts } from "./schema";

export const insertUserSchema = createInsertSchema(users);
export const insertAppointmentSchema = createInsertSchema(appointments);
export const insertContactMessageSchema = createInsertSchema(contactMessages);
export const insertNewsPostSchema = createInsertSchema(newsPosts);
