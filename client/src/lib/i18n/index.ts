import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import frTranslation from './translations/fr.json';
import arTranslation from './translations/ar.json';
import enTranslation from './translations/en.json';

const resources = {
  fr: {
    translation: frTranslation
  },
  ar: {
    translation: arTranslation
  },
  en: {
    translation: enTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
