import {
  users, type User, type InsertUser,
  appointments, type Appointment, type InsertAppointment,
  contactMessages, type ContactMessage, type InsertContactMessage,
  newsPosts, type NewsPost, type InsertNewsPost
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Appointment methods
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined>;
  
  // Contact methods
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // News methods
  getNewsPosts(category?: string): Promise<NewsPost[]>;
  getNewsPost(id: number): Promise<NewsPost | undefined>;
  createNewsPost(post: InsertNewsPost): Promise<NewsPost>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        role: insertUser.role || 'user',
        createdAt: new Date().toISOString()
      })
      .returning();
    return user;
  }
  
  // Appointment methods
  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment || undefined;
  }
  
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db
      .insert(appointments)
      .values({
        ...insertAppointment,
        status: "pending",
        createdAt: new Date().toISOString(),
        email: insertAppointment.email || null,
        message: insertAppointment.message || null
      })
      .returning();
    return appointment;
  }
  
  async updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined> {
    const [updatedAppointment] = await db
      .update(appointments)
      .set({ status })
      .where(eq(appointments.id, id))
      .returning();
    return updatedAppointment || undefined;
  }
  
  // Contact methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }
  
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values({
        ...insertMessage,
        createdAt: new Date().toISOString()
      })
      .returning();
    return message;
  }
  
  // News methods
  async getNewsPosts(category?: string): Promise<NewsPost[]> {
    if (category) {
      return await db.select().from(newsPosts).where(eq(newsPosts.category, category));
    }
    return await db.select().from(newsPosts);
  }

  async getNewsPost(id: number): Promise<NewsPost | undefined> {
    const [post] = await db.select().from(newsPosts).where(eq(newsPosts.id, id));
    return post || undefined;
  }

  async createNewsPost(insertPost: InsertNewsPost): Promise<NewsPost> {
    const [post] = await db
      .insert(newsPosts)
      .values({
        ...insertPost,
        category: insertPost.category || 'news',
        imageUrl: insertPost.imageUrl || null,
        publishDate: new Date().toISOString()
      })
      .returning();
    return post;
  }
}

// Fonction pour alimenter la base de données avec des données initiales
async function seedDatabase(dbStorage: DatabaseStorage) {
  try {
    const adminUser = await dbStorage.getUserByUsername("drbenameur");
    
    if (!adminUser) {
      await dbStorage.createUser({
        username: "drbenameur",
        password: "securepassword",
        fullName: "Dr. Benameur",
        email: "contact@cabinet-benameur.com",
        role: "admin"
      });
      
      await dbStorage.createNewsPost({
        title: "Acquisition d'un nouvel équipement IRM 3 Tesla",
        content: "Le Cabinet de Radiologie du Dr. Benameur est fier d'annoncer l'acquisition d'un nouvel appareil IRM 3 Tesla offrant une qualité d'image exceptionnelle et un confort amélioré pour nos patients.",
        imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        category: "news"
      });

      await dbStorage.createNewsPost({
        title: "Participation au Congrès International de Radiologie",
        content: "Le Dr. Benameur a participé au dernier Congrès International de Radiologie à Paris, où il a présenté ses travaux sur les nouvelles techniques d'imagerie neurologique.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        category: "news"
      });

      await dbStorage.createNewsPost({
        title: "L'importance du dépistage précoce par imagerie",
        content: "Découvrez pourquoi l'imagerie médicale joue un rôle crucial dans le dépistage précoce de nombreuses pathologies et comment elle peut contribuer à améliorer les chances de guérison.",
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        category: "news"
      });

      await dbStorage.createNewsPost({
        title: "Comment se préparer à un examen IRM ?",
        content: "L'IRM est un examen indolore qui nécessite néanmoins une préparation spécifique. Évitez de porter des objets métalliques, informez-nous de vos antécédents médicaux et suivez les consignes de jeûne si nécessaire.",
        imageUrl: null,
        category: "health-tips"
      });

      await dbStorage.createNewsPost({
        title: "Radiographie et grossesse : ce qu'il faut savoir",
        content: "Pendant la grossesse, certains examens radiologiques peuvent être réalisés avec des précautions spécifiques. Il est essentiel d'informer votre radiologue de votre grossesse pour adapter le protocole.",
        imageUrl: null,
        category: "health-tips"
      });

      console.log("Base de données initialisée avec succès");
    } else {
      console.log("La base de données contient déjà les données initiales");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error);
  }
}

export const storage = new DatabaseStorage();

seedDatabase(storage).catch(console.error);
