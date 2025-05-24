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
    // modules Node et natives que esbuild ne doit pas inclure
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
    "glob", // ✅ indispensable pour éviter l'erreur
  ],
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
