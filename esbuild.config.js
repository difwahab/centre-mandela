const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["server/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outdir: "dist",
  sourcemap: true,
  minify: false,
  external: [
    "express",
    "express-session",
    "memorystore",
    "cors",
    "dotenv",
    "passport",
    "passport-local",
    "zod",
    "archiver",
    "drizzle-orm",
    "drizzle-orm/sqlite-core",
    "drizzle-orm/better-sqlite3",
    "better-sqlite3",
    "glob",
    "drizzle-zod" // ✅ Très important
  ],
}).catch((error) => {
  console.error("❌ esbuild failed:", error);
  process.exit(1);
});
