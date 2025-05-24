const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  external: [],  // NE PAS externaliser le serveur
  sourcemap: true,
}).catch(() => process.exit(1));
