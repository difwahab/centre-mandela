import { db } from "./index";
import { users, newsPosts } from "../../shared/schema";
import { insertUserSchema } from "../../shared/zod";
import { eq } from "drizzle-orm";

await db.insert(users).values([
  {
    username: "admin",
    password: "hashedpassword",
    fullName: "Admin",
    email: "admin@example.com",
    role: "admin",
  },
  ...
]);

await db.insert(newsPosts).values([
  {
    title: "Nouveau scanner installé",
    content: "Découvrez notre nouveau scanner IRM...",
    category: "news",
  },
  ...
]);
