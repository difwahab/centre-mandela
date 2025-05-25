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
import { hash } from "bcryptjs";

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

// Seed function
async function seedDatabase(storage: DatabaseStorage) {
  try {
    const admin = await storage.getUserByUsername("drbenameur");

    if (!admin) {
      const hashedPassword = await hash("securepassword", 10);

      const adminUser = await storage.createUser({
        username: "drbenameur",
        password: hashedPassword,
        fullName: "Dr. Benameur",
        email: "contact@cabinet-benameur.com",
        role: "admin"
      });

      console.log("👤 Utilisateur admin créé :", adminUser);

      await storage.createNewsPost({
        title: "Acquisition d'un nouvel équipement IRM 3 Tesla",
        content: "Le Cabinet de Radiologie du Dr. Benameur est fier d'annoncer l'acquisition d'un nouvel appareil IRM 3 Tesla...",
        imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        category: "news"
      });

      await storage.createNewsPost({
        title: "Participation au Congrès International de Radiologie",
        content: "Le Dr. Benameur a participé au dernier Congrès International de Radiologie à Paris...",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        category: "news"
      });

      await storage.createNewsPost({
        title: "L'importance du dépistage précoce par imagerie",
        content: "Découvrez pourquoi l'imagerie médicale joue un rôle crucial...",
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        category: "news"
      });

      await storage.createNewsPost({
        title: "Comment se préparer à un examen IRM ?",
        content: "L'IRM est un examen indolore qui nécessite néanmoins une préparation spécifique...",
        imageUrl: null,
        category: "health-tips"
      });

      await storage.createNewsPost({
        title: "Radiographie et grossesse : ce qu'il faut savoir",
        content: "Pendant la grossesse, certains examens radiologiques peuvent être réalisés avec précautions...",
        imageUrl: null,
        category: "health-tips"
      });

      console.log("✅ Base de données initialisée avec succès");
    } else {
      console.log("ℹ️ Données déjà présentes dans la base");
    }
  } catch (error) {
    console.error("❌ Erreur lors du seed de la base :", error);
  }
}

// Export instance + seed
export const storage = new DatabaseStorage();
seedDatabase(storage).catch(console.error);
