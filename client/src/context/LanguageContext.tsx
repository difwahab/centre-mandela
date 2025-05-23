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
  // Get stored language from localStorage or default to French
  const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'fr';
  };

  const [language, setLanguageState] = useState<string>(getInitialLanguage);

  // Update language in i18n and localStorage
  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update document dir attribute for RTL support (Arabic)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Add language class to body for additional styling if needed
    document.body.classList.remove('lang-fr', 'lang-ar');
    document.body.classList.add(`lang-${lang}`);
  };

  // Initialize language on component mount
  useEffect(() => {
    setLanguage(language);
  }, [language]);

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
