// esbuild.config.js
const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["server/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outdir: "dist",
  sourcemap: true,
  minify: false,
  target: "node18",
  external: [
    // ❌ Empêche esbuild de bundler ces modules dynamiques
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
    "drizzle-zod"
  ]
}).catch(() => process.exit(1));
