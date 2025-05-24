const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  external: [
    'dotenv',
    'express',
    'cors',
    'express-session',
    'memorystore',
    'passport',
    'passport-local'
  ],
  sourcemap: true,
  minify: false
}).catch(() => process.exit(1));
