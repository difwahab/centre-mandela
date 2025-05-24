import { db } from "./db";
import {
  users,
  appointments,
  contactMessages,
  newsPosts,
} from "../shared/schema";

async function seed() {
  await db.insert(users).values([
    {
      username: "admin",
      password: "hashed_password",
      fullName: "Administrateur",
      email: "admin@example.com",
      role: "admin",
    },
    {
      username: "medecin1",
      password: "hashed_password",
      fullName: "Dr. Jean Dupont",
      email: "dr.dupont@example.com",
      role: "doctor",
    },
  ]);

  await db.insert(appointments).values([
    {
      firstName: "Alice",
      lastName: "Martin",
      phone: "0601020304",
      email: "alice@example.com",
      examType: "IRM",
      preferredDate: "2025-06-15",
      hasPrescription: 1,
      message: "Examen de contrôle",
      status: "pending",
    },
  ]);

  await db.insert(contactMessages).values([
    {
      name: "Paul",
      email: "paul@example.com",
      subject: "Demande de rendez-vous",
      message: "Pouvez-vous me rappeler ?",
    },
  ]);

  await db.insert(newsPosts).values([
    {
      title: "Nouveau scanner disponible",
      content: "Nous avons installé un scanner de dernière génération.",
      imageUrl: "/images/scanner.jpg",
      category: "news",
    },
  ]);

  console.log("✅ Base de données initialisée avec succès.");
}

seed().catch((err) => {
  console.error("❌ Erreur lors de l'initialisation :", err);
});
