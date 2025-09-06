import { useState } from "react";
import es from "../data/projects.es.json";
import en from "../data/projects.en.json";

type Lang = "es" | "en";

// Definimos el shape genérico de las traducciones
type TranslationObject = {
  [key: string]: string | TranslationObject;
};

const translations = { es, en };

export function useTranslation() {
  const [lang, setLang] = useState<Lang>(
    (localStorage.getItem("lang") as Lang) || "es"
  );

  const switchLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // Función de traducción con tipado seguro
  const t = (path: string): string => {
    return (
      path.split(".").reduce<TranslationObject | string | undefined>(
        (acc, key) =>
          typeof acc === "object" && acc !== null ? acc[key] : undefined,
        translations[lang]
      ) as string
    ) || path;
  };

  return { lang, switchLang, t };
}