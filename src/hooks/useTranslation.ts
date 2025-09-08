// src/hooks/useTranslation.ts
import { useContext } from "react";
import TranslationContext from "../context/TranslationContext";

export const useTranslation = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error(
      "useTranslation debe usarse dentro de un <TranslationProvider>"
    );
  }
  return context;
};

