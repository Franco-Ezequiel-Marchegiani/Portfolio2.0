// src/context/TranslationContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import es from "../data/es.json";
import en from "../data/en.json";
import type { Lang, TranslationObject } from "../types/Translation";

const translations: Record<Lang, TranslationObject> = { es, en };

interface TranslationContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T = string>(path: string, fallback?: T) => T;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLangState] = useState<Lang>(() => {
        const stored = localStorage.getItem("lang") as Lang | null;
        return stored ?? "es";
    });

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    const setLang = (newLang: Lang) => setLangState(newLang);

    const t = <T = string>(path: string, fallback?: T): T => {
        const result = path
        .split(".")
        .reduce<unknown>(
            (acc, key) =>
            acc && typeof acc === "object" && key in (acc as object)
                ? (acc as Record<string, unknown>)[key]
                : undefined,
            translations[lang]
        );

        return (result as T) ?? fallback!;
    };

    return (
        <TranslationContext.Provider value={{ lang, setLang, t }}>
        {children}
        </TranslationContext.Provider>
    );
};

export default TranslationContext;


