// "use client";

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// import en from "./locales/en.json";
// import ar from "./locales/ar.json";

// if (!i18n.isInitialized) {
//   i18n
//     .use(initReactI18next)
//     .init({
//       resources: {
//         en: { translation: en },
//         ar: { translation: ar },
//       },
//       lng: "ar", // default language
//       fallbackLng: "en",
//       interpolation: { escapeValue: false },
//     });
// }

// export default i18n;
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ar: { translation: ar },
      },
      lng: "ar", // اللغة الافتراضية
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });

  if (typeof window !== 'undefined') {
    i18n.on('languageChanged', (lng) => {
      localStorage.setItem('lang', lng);
      document.cookie = `lang=${lng}; path=/; max-age=31536000`;
      document.documentElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", lng);
    });
  }
}

export default i18n;

