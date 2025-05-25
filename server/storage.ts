import {
  users,
  appointments,
  contactMessages,
  newsPosts,
} from "@shared/schema";
import type {
  User,
  InsertUser,
  Appointment,
  InsertAppointment,
  ContactMessage,
  InsertContactMessage,
  NewsPost,
  InsertNewsPost
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Types
export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

// Storage interface
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: number, status: AppointmentStatus): Promise<Appointment | undefined>;

  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  getNewsPosts(category?: string): Promise<NewsPost[]>;
  getNewsPost(id: number): Promise<NewsPost | undefined>;
  createNewsPost(post: InsertNewsPost): Promise<NewsPost>;
}

// Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const now = new Date().toISOString();
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        role: insertUser.role ?? "user",
        createdAt: now
      })
      .returning();
    return user;
  }

  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const now = new Date().toISOString();
    const [appointment] = await db
      .insert(appointments)
      .values({
        ...insertAppointment,
        status: "pending",
        createdAt: now,
        email: insertAppointment.email ?? null,
        message: insertAppointment.message ?? null
      })
      .returning();
    return appointment;
  }

  async updateAppointmentStatus(id: number, status: AppointmentStatus): Promise<Appointment | undefined> {
    const [updated] = await db
      .update(appointments)
      .set({ status })
      .where(eq(appointments.id, id))
      .returning();
    return updated;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const now = new Date().toISOString();
    const [message] = await db
      .insert(contactMessages)
      .values({
        ...insertMessage,
        createdAt: now
      })
      .returning();
    return message;
  }

  async getNewsPosts(category?: string): Promise<NewsPost[]> {
    if (category) {
      return await db.select().from(newsPosts).where(eq(newsPosts.category, category));
    }
    return await db.select().from(newsPosts);
  }

  async getNewsPost(id: number): Promise<NewsPost | undefined> {
    const [post] = await db.select().from(newsPosts).where(eq(newsPosts.id, id));
    return post;
  }

  async createNewsPost(insertPost: InsertNewsPost): Promise<NewsPost> {
    const now = new Date().toISOString();
    const [post] = await db
      .insert(newsPosts)
      .values({
        ...insertPost,
        category: insertPost.category ?? "news",
        imageUrl: insertPost.imageUrl ?? null,
        publishDate: now
      })
      .returning();
    return post;
  }
}

// Export instance unique
export const storage = new DatabaseStorage();
