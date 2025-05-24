const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  external: [],       // Ne rien externaliser pour que le point d'entrée soit inclus
  sourcemap: true,
  minify: false
}).catch(() => process.exit(1));
