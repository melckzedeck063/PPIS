import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en.json';
import translationSW from './sw.json';

const resources = {
  en: {
    translation: translationEN,
  },
  sw: {
    translation: translationSW,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
  });

export default i18n;
