import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import languageEN from './en/translate.json';
import languageUA from './ua/translate.json';

i18n.use(initReactI18next).init({
    resources: {
        en: languageEN,
        ua: languageUA,
    },
    lng: 'ua',
    fallbackLng: 'ua',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: '.',
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
    },
    react: {
        wait: true,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
    },
} as InitOptions);
export default i18n;
