// shared/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferModel } from "drizzle-orm";
import { z } from "zod";

/* ----------------------------- Drizzle Tables ----------------------------- */

export const users = sqliteTable("users", {
  id: integer("id").primaryKey().notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").default("user"),
  createdAt: text("created_at"),
});

export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  date: text("date").notNull(),
  time: text("time").notNull(),
  message: text("message"),
  status: text("status").default("pending"),
  createdAt: text("created_at"),
});

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at"),
});

export const newsPosts = sqliteTable("news_posts", {
  id: integer("id").primaryKey().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: text("category").default("news"),
  publishDate: text("publish_date"),
});

/* ----------------------------- Drizzle Types ----------------------------- */

export type User = InferModel<typeof users>;
export type InsertUser = InferModel<typeof users, "insert">;

export type Appointment = InferModel<typeof appointments>;
export type InsertAppointment = InferModel<typeof appointments, "insert">;

export type ContactMessage = InferModel<typeof contactMessages>;
export type InsertContactMessage = InferModel<typeof contactMessages, "insert">;

export type NewsPost = InferModel<typeof newsPosts>;
export type InsertNewsPost = InferModel<typeof newsPosts, "insert">;

/* ----------------------------- Zod Validation ----------------------------- */

export const insertAppointmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  date: z.string().min(1, "Date is required"),
  message: z.string().optional(),
});

export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});
