import React from 'react';
import { Code, Database, Wrench, Palette, GitBranch, Users } from 'lucide-react';

interface SkillCategory {
    title: string;
    icon: React.ReactNode;
    color: string;
    skills: Array<{
        name: string;
        level: number;
    }>;
}

export const Skills: React.FC = () => {
    const skillCategories: SkillCategory[] = [
        {
        title: "Frontend",
        icon: <Palette className="h-6 w-6" />,
        color: "blue",
        skills: [
            { name: "React.JS & Redux-Toolkit", level: 90 },
            { name: "JavaScript & TypeScript", level: 85 },
            { name: "HTML, CSS & Sass", level: 90 },
            { name: "Next.JS", level: 80 },
            { name: "Bootstrap & MaterialUI", level: 85 },
        ]
        },
        {
        title: "Backend",
        icon: <Code className="h-6 w-6" />,
        color: "green",
        skills: [
            { name: "Node.js", level: 85 },
            { name: "Python / Selenium / Pandas", level: 90 },
            { name: "API REST", level: 85 },
            { name: "Microservicios", level: 75 },
        ]
        },
        {
        title: "Base de Datos",
        icon: <Database className="h-6 w-6" />,
        color: "orange",
        skills: [
            { name: "SQL & Databases", level: 80 },
            { name: "PostgreSQL", level: 75 },
            { name: "MongoDB", level: 70 },
            { name: "Redis", level: 65 },
        ]
        },
        {
        title: "Herramientas",
        icon: <Wrench className="h-6 w-6" />,
        color: "purple",
        skills: [
            { name: "Git - Github", level: 90 },
            { name: "Trello, Azure & Notion", level: 85 },
            { name: "Docker", level: 70 },
            { name: "AWS", level: 65 },
        ]
        },
        {
        title: "Metodologías",
        icon: <GitBranch className="h-6 w-6" />,
        color: "indigo",
        skills: [
            { name: "SCRUM", level: 85 },
            { name: "Clean Code", level: 90 },
            { name: "Patrones de Diseño", level: 80 },
            { name: "TDD", level: 70 },
        ]
        },
        {
        title: "Soft Skills",
        icon: <Users className="h-6 w-6" />,
        color: "pink",
        skills: [
            { name: "Mentoría", level: 95 },
            { name: "Trabajo en Equipo", level: 90 },
            { name: "Comunicación", level: 88 },
            { name: "Inglés B2", level: 80 },
        ]
        }
    ];

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
                Habilidades
                </span> Técnicas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Mi arsenal tecnológico para crear soluciones completas y escalables
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
                        {category.icon}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                    </h3>
                    </div>

                    <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.level}%
                            </span>
                        </div>
                        <div className={`w-full h-2 ${colors.progressBg} rounded-full overflow-hidden`}>
                            <div
                            className={`h-full ${colors.progress} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                            />
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