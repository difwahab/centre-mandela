const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  external: [
    'express',
    'express-session',
    'memorystore',
    'cors',
    'dotenv',
    'passport',
    'passport-local',
    'zod',
    'archiver',
    'drizzle-orm',
    'drizzle-orm/sqlite-core',
    'drizzle-orm/better-sqlite3',
    'better-sqlite3'
  ],
  sourcemap: true,
  minify: false,
}).catch(() => process.exit(1));
