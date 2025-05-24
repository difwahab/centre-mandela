// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs', // CommonJS pour compatibilité avec require()
  target: 'node18',
  outdir: 'dist',
  sourcemap: true,
  minify: false,
  external: [
    // on exclut les modules natifs ou problématiques à packager
    'better-sqlite3'
  ]
}).catch(() => process.exit(1));
