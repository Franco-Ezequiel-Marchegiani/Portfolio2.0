import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import referencesData from "../../Python/Data/recommendations.json";
import { useTranslation } from "../hooks/useTranslation";
import imageDefault from '../../public/images.png';
import type { ReferencesData } from "../types/References";
export const References: React.FC = () => {
    const { t, lang } = useTranslation();
    const { extraction_date, recommendations } = referencesData as ReferencesData;

    const received = recommendations.received;
    const [index, setIndex] = useState(0);
    const [resetCounter, setResetCounter] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % received.length);
    }, 8000);

    return () => clearInterval(interval);
    }, [received.length, resetCounter]);

    const next = () => {
        setIndex((prev) => (prev + 1) % received.length);
        setResetCounter((c) => c + 1); // 🔄 reinicia el contador
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + received.length) % received.length);
        setResetCounter((c) => c + 1); // 🔄 reinicia el contador
    };

    const current = received[index];
    const formattedDate = extraction_date.split(" ")[0];
    return (
        <section id="recommendations" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-4xl mx-auto text-center relative"> 
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    {t<string>("references.title", "")}
                </h2>
                {/* Carrusel */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center space-y-4"
                    >
                    {/* Imagen circular */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white shadow-md">
                        <img src={current.image_url !== "" ? current.image_url : imageDefault} alt="Image_Profile" className="rounded-full" />
                    </div>

                    {/* Nombre y rol */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {current.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {current.role}
                        </p>
                    </div>

                    {/* Relación */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                        {lang == 'es' ? current.relation.replace(/^\d{1,2} de [a-z]+ de \d{4},\s*/i, '') : current.relation_eng.replace(/^.*?\d{4},\s*/, '')}
                    </p>

                    {/* Texto de la recomendación */}
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        “{lang == 'es' ? current.text : current.text_eng}”
                    </p>
                    </motion.div>
                </AnimatePresence>

                {/* Botones de navegación */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                    <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                    <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </button>
                </div>

                {/* Última actualización */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-right">
                    {t<string>("references.lastUpdate", "")}: {formattedDate}
                </p>
            </div>
        </section>
    );
};