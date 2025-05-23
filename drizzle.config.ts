// drizzle.config.ts
import type { Config } from "drizzle-kit";
import "dotenv/config";

const config: Config = {
  schema: "./shared/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    // En local → ./db.sqlite
    // Sur Render → /data/database.sqlite (via .env)
    url: process.env.DATABASE_URL ?? "file:./db.sqlite",
  },
};

export default config;