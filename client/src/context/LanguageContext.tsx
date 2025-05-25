import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from 'i18next';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const getInitialLanguage = () => {
    return localStorage.getItem('language') || 'fr';
  };

  const [language, setLanguageState] = useState<string>(getInitialLanguage);

  // Set language only once on mount
  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.remove('lang-fr', 'lang-ar');
    document.body.classList.add(`lang-${language}`);
  }, []); // only on mount

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.remove('lang-fr', 'lang-ar');
    document.body.classList.add(`lang-${lang}`);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
