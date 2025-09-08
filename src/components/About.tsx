import React, { useState, type JSX } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Target, Heart } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { AboutHighlight } from "../types/About";

const iconMap: Record<string, JSX.Element> = {
  target: <Target className="h-6 w-6 text-blue-500" />,
  lightbulb: <Lightbulb className="h-6 w-6 text-green-500" />,
  heart: <Heart className="h-6 w-6 text-orange-500" />,
};

// helper para asegurarnos que siempre obtenemos un array
const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export const About: React.FC = () => {
    const { t } = useTranslation();
    const [showMore, setShowMore] = useState(false);
    
    const rawHighlights = t<AboutHighlight[]>("about.highlights", []);
    const rawSummary = t<string[]>("about.summary", []);
    const summary = ensureArray<string>(rawSummary);
    const highlights = ensureArray<AboutHighlight>(rawHighlights);

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    {t<string>("about.title", "")} {'\n'} 
                    <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                        {t<string>("about.title2", "")}
                    </span>
                    
                </h2>
            </div>
            <div className="space-y-8">
            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {summary[0]}
                </p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {summary[1]}
                </p>
                {/* Show More Content */}
                {showMore && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {summary[2]}
                    </p>
                </div>
                )}
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="mt-6 flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 
                            dark:hover:text-blue-300 transition-colors duration-200 font-medium"
                >
                    <span>{showMore ? t<string>("about.buttons.showLess", "") : t<string>("about.buttons.showMore", "")}</span>
                    {showMore ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
            </div>

            {/* Highlights */}
            <div className="grid md:grid-cols-3 gap-6">
                {highlights.map((highlight, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl 
                            transform hover:scale-105 transition-all duration-200"
                >
                    <div className="flex items-center space-x-3 mb-4">
                    {iconMap[highlight.icon ?? 'code']}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {highlight.title}
                        </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        {highlight.description}
                    </p>
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    );
};