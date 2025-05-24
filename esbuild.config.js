const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  external: ['memorystore', 'express-session'], // EXCLURE ces packages
  sourcemap: true,
  minify: false
}).catch(() => process.exit(1));
