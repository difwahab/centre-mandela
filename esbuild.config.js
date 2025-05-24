// esbuild.config.js

const esbuild = require('esbuild');

// Liste des dépendances natives ou dynamiques à exclure du bundle
const externalModules = [
  'better-sqlite3', // natif (binding C++)
  'glob',           // utilisé de manière dynamique
  'node:fs',        // si utilisé avec import 'node:fs'
  'node:path'
];

esbuild.build({
  entryPoints: ['server/index.ts'], // point d’entrée principal
  bundle: true,                     // regrouper tous les fichiers dans un seul
  platform: 'node',                 // cible Node.js
  format: 'cjs',                    // CommonJS compatible avec `require(...)`
  target: 'node18',                 // pour Render & ta config
  outdir: 'dist',                   // sortie du build
  sourcemap: true,                  // utile pour debugging Render
  minify: false,                    // garde le code lisible
  external: externalModules         // évite les erreurs de modules natifs
}).then(() => {
  console.log('✅ Build succeeded.');
}).catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
