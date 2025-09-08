import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, MapPin, Building } from 'lucide-react';
import type { ExperienceItem } from "../types/Experience";
import { useTranslation } from '../hooks/useTranslation';

const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export const Experience: React.FC = () => {
    const { t } = useTranslation();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    
    const rawExperiences = t<ExperienceItem[]>("experience.items", []);

    const experiences = ensureArray<ExperienceItem>(rawExperiences);

    const toggleExpansion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                {t<string>("experience.title", "")} {'\n'}
                </span> 
                {t<string>("experience.title2", "")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
                {t<string>("experience.subtitle", "")}
            </p>
            </div>

            <div className="space-y-6">
            {experiences.map((exp, index) => (
                <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
                        transition-all duration-200 overflow-hidden"
                >
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <Building className="h-5 w-5 text-blue-500" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:scale-105 transition-all duration-200">
                                    <a href={exp.link} target="_blank" rel="noopener noreferrer">
                                        {exp.company}
                                    </a>
                                </h3>
                                {exp.current && (
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 
                                        dark:text-green-400 text-sm font-medium rounded-full">
                                    {t<string>("experience.current", "")}
                                    </span>
                                )}
                            </div>
                            
                            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            {exp.position}
                            </h4>

                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4">
                                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">{exp.period}</span>
                                </div>
                            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">{exp.location}</span>
                            </div>
                            </div>
                        </div>

                        <button
                            onClick={() => toggleExpansion(index)}
                            className="ml-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                                    dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            {expandedIndex === index ? 
                            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" /> : 
                            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            }
                        </button>
                    </div>

                    {/* Preview - First description item */}
                    <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        {exp.description[0]}
                    </p>
                    {expandedIndex !== index && (
                        <button
                        onClick={() => toggleExpansion(index)}
                        className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 
                                dark:hover:text-blue-300 text-sm font-medium"
                        >
                        {t<string>("experience.details", "")}
                        </button>
                    )}
                    </div>

                    {/* Expanded Content */}
                    {expandedIndex === index && (
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {t<string>("experience.responsibilities", "")}
                        </h5>
                        <ul className="space-y-2">
                            {exp.description.slice(1).map((desc, descIndex) => (
                            <li key={descIndex} className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 dark:text-gray-400">{desc}</span>
                            </li>
                            ))}
                        </ul>
                        </div>

                        <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                            {t<string>("experience.technologies", "")}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 
                                        dark:text-blue-400 text-sm rounded-full font-medium"
                            >
                                {tech}
                            </span>
                            ))}
                        </div>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};