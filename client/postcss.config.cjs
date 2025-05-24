// postcss.config.cjs

/**
 * Configuration PostCSS
 * Compatible avec Vite en mode ES Module (d'où l'extension .cjs)
 */
module.exports = {
  plugins: {
    // Intègre Tailwind CSS
    tailwindcss: {},

    // Ajoute automatiquement les préfixes CSS pour la compatibilité navigateur
    autoprefixer: {},
  },
};

