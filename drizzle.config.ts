import type { Config } from "drizzle-kit";
import "dotenv/config";

const config: Config = {
  schema: "./shared/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:./db.sqlite",
  },
};

export default config;
