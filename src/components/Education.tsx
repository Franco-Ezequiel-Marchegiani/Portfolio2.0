import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { Certification } from './Certifications';
import type { EducationItem } from "../types/Education";
import { useTranslation } from '../hooks/useTranslation';

const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export const Education: React.FC = () => {
    const { t } = useTranslation();
    // Pedimos fallback [] para evitar undefined / string
    const rawEducation = t<EducationItem[]>("education.items", []);
    
      // Coerción de seguridad (por si t devolvió algo raro)
    const education = ensureArray<EducationItem>(rawEducation);

    return (
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    {t<string>("education.title", "")} {'\n'}
                </span> 
                {t<string>("education.title2", "")} {'\n'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
                {t<string>("education.subtitle", "")}
            </p>
            </div>

            <div className="space-y-12">
            {/* Education Timeline */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <GraduationCap className="h-6 w-6 mr-3 text-blue-500" />
                    {t<string>("education.academicTitle", "")}
                </h3>
                
                <div className="space-y-6">
                {education.map((edu, index) => (
                    <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 
                            transform hover:scale-105 transition-all duration-200"
                    >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                <a href={edu.link} target="_blank" rel="noopener noreferrer">
                                    {edu.institution}
                                </a>
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            edu.status === t<string>("education.status_progress", "")
                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                                : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                            }`}>
                            {edu.status}
                            </span>
                        </div>
                        
                        <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            <a href={edu.link} target="_blank" rel="noopener noreferrer">
                                {edu.degree}
                            </a>
                        </h5>
                        
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{edu.period}</span>
                        </div>
                        
                        {edu.description && (
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {edu.description}
                            </p>
                        )}
                        
                        {edu.highlights && (
                            <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t<string>("education.highlightsLabel", "")}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {edu.highlights.map((highlight, highlightIndex) => (
                                <span
                                    key={highlightIndex}
                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 
                                            dark:text-blue-400 text-sm rounded-full"
                                >
                                    {highlight}
                                </span>
                                ))}
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <Certification/>
            </div>
        </div>
        </section>
    );
};