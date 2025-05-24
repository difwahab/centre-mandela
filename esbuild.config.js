// esbuild.config.js

const esbuild = require('esbuild');

// Liste complète des modules Node à exclure du bundle
const externalModules = [
  'dotenv',
  'express',
  'express-session',
  'memorystore',
  'cors',
  'passport',
  'passport-local'
];

esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  external: externalModules,
  sourcemap: true,
  minify: false,
  logLevel: 'info',
  target: 'node20', // important pour Render qui utilise Node 20+
}).then(() => {
  console.log('✅ Esbuild completed successfully.');
}).catch((error) => {
  console.error('❌ Esbuild failed:', error);
  process.exit(1);
});
