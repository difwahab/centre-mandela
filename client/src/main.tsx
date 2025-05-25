import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import './lib/i18n';
import { useEffect } from 'react';

// Applique les attributs lang, dir et la classe dark sur <html>
function GlobalHtmlSetup() {
  const { language } = useLanguage();

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';

    // Facultatif : si tu gères un thème sombre
    // html.classList.add('dark');
    // html.classList.remove('dark');

  }, [language]);

  return null;
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <>
            <GlobalHtmlSetup />
            <App />
          </>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
} else {
  console.error("Impossible de trouver l'élément root dans le DOM.");
}
