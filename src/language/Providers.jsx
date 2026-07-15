"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children, lang }) {
  // Synchronous sync during render (for SSR and CSR consistency)
  if (lang && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  // Backup sync for client-side local storage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      </Provider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
