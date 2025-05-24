// shared/queries.ts
import { db } from "../server/db";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

// Users
export const getAllUsers = () => db.select().from(schema.users);
export const getUserById = (id: number) => db.select().from(schema.users).where(eq(schema.users.id, id));
export const insertUser = (user: Omit<schema.InsertUser, "id">) => db.insert(schema.users).values(user);

// Appointments
export const getAllAppointments = () => db.select().from(schema.appointments);
export const getAppointmentById = (id: number) => db.select().from(schema.appointments).where(eq(schema.appointments.id, id));
export const insertAppointment = (appointment: schema.InsertAppointment) => db.insert(schema.appointments).values(appointment);
export const updateAppointmentStatus = (id: number, status: string) =>
  db.update(schema.appointments).set({ status }).where(eq(schema.appointments.id, id));

// Contact Messages
export const getAllContactMessages = () => db.select().from(schema.contactMessages);
export const insertContactMessage = (message: schema.InsertContactMessage) =>
  db.insert(schema.contactMessages).values(message);

// News Posts
export const getAllNewsPosts = () => db.select().from(schema.newsPosts);
export const getNewsPostById = (id: number) => db.select().from(schema.newsPosts).where(eq(schema.newsPosts.id, id));
export const insertNewsPost = (post: schema.InsertNewsPost) => db.insert(schema.newsPosts).values(post);
