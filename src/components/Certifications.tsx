import React, { type JSX } from 'react';
import { Award, BookOpen } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { Certifications } from "../types/Certifications";
const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export const Certification: React.FC = () => {
    const { t } = useTranslation();
    const iconMap: Record<string, JSX.Element> = {
        award: <Award className="h-4 w-4" />,
        bookOpen: <BookOpen className="h-4 w-4" />,
    };
    const rawCertifications = t<Certifications[]>("certifications.items", []);
    const certifications = ensureArray<Certifications>(rawCertifications);
    
    return (
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <a className='flex items-center hover:scale-105 transition-all duration-200' href="https://drive.google.com/drive/folders/1fulbnGmD6OEi4naRnUlknbzJ0m6CW0N_?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <Award className="h-6 w-6 mr-3 text-green-500" />
                        {t<string>("certifications.title", "")}
                    </a>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                    <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl 
                            transform hover:scale-105 transition-all duration-200"
                    >
                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                        
                        {iconMap[cert.icon ?? '']}
                        </div>
                        <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {cert.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {cert.issuer}
                        </p>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 
                                        dark:text-gray-400 text-sm rounded-full">
                            {cert.type}
                        </span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
    );
};