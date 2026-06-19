"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const LangContext = createContext({ lang: "ar", dir: "rtl", t: (x) => x, toggle: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "ar" ? "en" : "ar")), []);

  // t() picks the right field from an object like { ar, en } or returns a plain string.
  const t = useCallback(
    (val) => {
      if (val == null) return "";
      if (typeof val === "string") return val;
      return val[lang] ?? val.ar ?? val.en ?? "";
    },
    [lang]
  );

  const dir = lang === "ar" ? "rtl" : "ltr";
  const value = { lang, dir, t, toggle };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
