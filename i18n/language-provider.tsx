"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { htmlLanguages, isLocale, messages, type Locale } from "./config";
const LanguageContext = createContext({ locale: "en" as Locale, t: messages.en, setLocale: (_value: Locale) => {} });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("en");
  useEffect(() => {
    const query = new URL(window.location.href).searchParams.get("lang");
    let saved: string | null = null;
    try { saved = localStorage.getItem("seikoudou-language"); } catch { /* Storage may be blocked. */ }
    if (isLocale(query)) updateLocale(query);
    else if (isLocale(saved)) updateLocale(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = htmlLanguages[locale]; document.title = messages[locale].pageTitle; }, [locale]);
  function setLocale(value: Locale) {
    updateLocale(value);
    try { localStorage.setItem("seikoudou-language", value); } catch { /* Still switch when storage is unavailable. */ }
    const url = new URL(window.location.href); url.searchParams.set("lang", value);
    window.history.replaceState(null, "", url);
  }
  return <LanguageContext.Provider value={{ locale, t: messages[locale], setLocale }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
