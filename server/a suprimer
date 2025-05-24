// server/db.ts
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";

// ✅ Utilise le disque persistant monté à /data sur Render
const sqlite = new Database("/data/database.sqlite");

// Initialise Drizzle avec le schéma partagé
export const db = drizzle(sqlite, { schema });
