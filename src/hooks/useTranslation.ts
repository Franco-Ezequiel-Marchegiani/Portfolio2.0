import { useState } from "react";
import es from "../data/es.json";
import en from "../data/en.json";

type Lang = "es" | "en";

// translations root (es and en are whole objects)
const translations: Record<Lang, unknown> = { es, en };

export const useTranslation = () => {
  const [lang, setLang] = useState<Lang>("en");

  // t<T>(path, fallback?) -> devuelve T o fallback
  const t = <T = unknown>(path: string, fallback?: T): T => {
    const parts = path.split(".");
    const result = parts.reduce<unknown>((acc, key) => {
      if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, translations[lang]);

    if (result === undefined) {
      // devuelve fallback si se pasó, si no la misma key (útil para debugging)
      return (fallback !== undefined ? fallback : (path as unknown)) as T;
    }
    return result as T;
  };

  return { t, lang, setLang };
};