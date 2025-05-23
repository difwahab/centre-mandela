import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema"; // suppose que ce chemin alias fonctionne

// Crée ou ouvre la base SQLite locale dans le fichier db.sqlite
const sqlite = new Database("./db.sqlite"); // 🔁 ajout du ./ pour plus de clarté

// Initialise drizzle avec le schéma partagé
export const db = drizzle(sqlite, { schema });
