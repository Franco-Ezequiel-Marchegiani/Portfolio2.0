import React, { type JSX } from 'react';
import { Code, Database, Wrench, Palette, GitBranch, Users } from 'lucide-react';
import type { SkillCategory } from "../types/Skills";
import { useTranslation } from '../hooks/useTranslation';

type IconKey = "palette" | "code" | "database" | "wrench" | "gitBranch" | "users";

const iconMap: Record<IconKey, JSX.Element> = {
    palette: <Palette className="h-4 w-4" />,
    code: <Code className="h-4 w-4" />,
    database: <Database className="h-4 w-4" />,
    wrench: <Wrench className="h-4 w-4" />,
    gitBranch: <GitBranch className="h-4 w-4" />,
    users: <Users className="h-4 w-4" />
};

const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);
export const Skills: React.FC = () => {
    const { t } = useTranslation();
    const rawSkillCategories = t<SkillCategory[]>("skills.categories", []);
    const skillCategories = ensureArray<SkillCategory>(rawSkillCategories);

    const getColorClasses = (color: string) => {
        const colors = {
        blue: {
            bg: 'bg-blue-100 dark:bg-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400',
            progress: 'bg-blue-500',
            progressBg: 'bg-blue-100 dark:bg-blue-900/20'
        },
        green: {
            bg: 'bg-green-100 dark:bg-green-900/20',
            text: 'text-green-600 dark:text-green-400',
            progress: 'bg-green-500',
            progressBg: 'bg-green-100 dark:bg-green-900/20'
        },
        orange: {
            bg: 'bg-orange-100 dark:bg-orange-900/20',
            text: 'text-orange-600 dark:text-orange-400',
            progress: 'bg-orange-500',
            progressBg: 'bg-orange-100 dark:bg-orange-900/20'
        },
        purple: {
            bg: 'bg-purple-100 dark:bg-purple-900/20',
            text: 'text-purple-600 dark:text-purple-400',
            progress: 'bg-purple-500',
            progressBg: 'bg-purple-100 dark:bg-purple-900/20'
        },
        indigo: {
            bg: 'bg-indigo-100 dark:bg-indigo-900/20',
            text: 'text-indigo-600 dark:text-indigo-400',
            progress: 'bg-indigo-500',
            progressBg: 'bg-indigo-100 dark:bg-indigo-900/20'
        },
        pink: {
            bg: 'bg-pink-100 dark:bg-pink-900/20',
            text: 'text-pink-600 dark:text-pink-400',
            progress: 'bg-pink-500',
            progressBg: 'bg-pink-100 dark:bg-pink-900/20'
        }
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    {t<string>("projects.title", "")} {'\n'}
                </span> 
                {t<string>("projects.title2", "")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t<string>("projects.subtitle", "")}
            </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
                const colors = getColorClasses(category.color);
                
                return (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 
                            transform hover:scale-105 transition-all duration-200"
                >
                    <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                        <div className={colors.text}>
                            {iconMap[(category.icon as IconKey) ?? "code"]}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                    </h3>
                    </div>

                    <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {skill.name}
                            </h4>
                            {skill.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                {skill.description}
                                </p>
                            )}
                            </div>
                            <div className="text-right ml-3">
                            <div className="flex items-center space-x-1">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    {skill.years}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {skill.years === 1 ? t<string>("skills.year", "Año") : t<string>("skills.years", "Años")}
                                </span>
                            </div>
                            </div>
                        </div>
                        
                        {/* Visual indicator based on years */}
                        <div className="flex items-center space-x-1">
                            {[...Array(6)].map((_, dotIndex) => (
                            <div
                                key={dotIndex}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                dotIndex < skill.years 
                                    ? colors.progress 
                                    : colors.progressBg
                                }`}
                            />
                            ))}
                            {skill.years > 6 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                +{skill.years - 6}
                            </span>
                            )}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </section>
    );
};