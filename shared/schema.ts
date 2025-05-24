// shared/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Users schema
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("doctor"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Appointments schema
export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  examType: text("exam_type").notNull(),
  preferredDate: text("preferred_date").notNull(),
  hasPrescription: integer("has_prescription").notNull(), // boolean as 0 or 1
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Contact messages schema
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// News/blog posts schema
export const newsPosts = sqliteTable("news_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  publishDate: text("publish_date").default(sql`CURRENT_TIMESTAMP`),
  category: text("category").notNull().default("news"),
});
