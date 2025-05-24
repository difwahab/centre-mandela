// server/db/seed.ts
import { db } from "./index";
import { users, newsPosts } from "../../shared/schema";
import { eq } from "drizzle-orm";

await db.delete(users).where(eq(users.email, "test@admin.com"));
await db.insert(users).values({
  username: "admin",
  password: "admin123",
  fullName: "Admin User",
  email: "test@admin.com",
  role: "admin",
});

await db.insert(newsPosts).values([
  {
    title: "Conseils de santé 1",
    content: "Restez hydraté et faites de l'exercice.",
    imageUrl: null,
    category: "conseils",
  },
  {
    title: "Actualité du centre",
    content: "Nous avons un nouveau spécialiste!",
    imageUrl: null,
    category: "news",
  },
]);

console.log("✅ Base de données initialisée");
