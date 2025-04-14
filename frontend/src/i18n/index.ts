import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enHome from './en/home.json';
import ruHome from './ru/home.json';

import enCommon from './en/common.json';
import ruCommon from './ru/common.json';

import ruRefferals from './ru/refferals.json';
import enRefferals from './en/refferals.json';

import ruProfile from './ru/profile.json';
import enProfile from './en/profile.json';

import ruTransfers from './ru/transfers.json';
import enTransfers from './en/transfers.json';

import ruDeposite from './ru/deposite.json';
import enDeposite from './en/deposite.json';

import ruConclusion from './ru/conclusion.json';
import enConclusion from './en/conclusion.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    ns: [
      'common',
      'home',
      'refferals',
      'profile',
      'transfers',
      'deposite',
      'conclusion',
    ],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        refferals: enRefferals,
        profile: enProfile,
        transfers: enTransfers,
        deposite: enDeposite,
        conclusion: enConclusion,
      },
      ru: {
        common: ruCommon,
        home: ruHome,
        refferals: ruRefferals,
        profile: ruProfile,
        transfers: ruTransfers,
        deposite: ruDeposite,
        conclusion: ruConclusion,
      },
      detection: {
        order: ['localStorage'],
        caches: ['localStorage'],
        lookupLocalStorage: 'language',
      },
    },
  });

export default i18n;
