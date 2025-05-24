const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['server/index.ts'],  // point d'entrée serveur
  bundle: true,                      // créer un bundle complet
  platform: 'node',                  // cible Node.js
  format: 'esm',                    // format ES modules
  outdir: 'dist',                   // dossier de sortie
  external: [],                     // ne rien externaliser (tout inclure)
  sourcemap: true,                  // source maps pour debug
  minify: false,                    // pas de minification (optionnel)
}).catch(() => process.exit(1));
