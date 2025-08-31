import React from 'react';
import { Code, Database, Wrench, Palette, GitBranch, Users } from 'lucide-react';

interface SkillCategory {
    title: string;
    icon: React.ReactNode;
    color: string;
    skills: Array<{
        name: string;
        years: number;
        description?: string;
    }>;
}

export const Skills: React.FC = () => {
    const skillCategories: SkillCategory[] = [
        {
        title: "Frontend",
        icon: <Palette className="h-6 w-6" />,
        color: "blue",
        skills: [
            { name: "React.JS & Redux-Toolkit", years: 3, description: "Desarrollo avanzado" },
            { name: "JavaScript & TypeScript", years: 4, description: "Uso diario" },
            { name: "HTML, CSS & Sass", years: 6, description: "Dominio completo" },
            { name: "Next.JS", years: 1, description: "Proyectos comerciales" },
            { name: "Bootstrap & MaterialUI", years: 4, description: "UI frameworks" },
        ]
        },
        {
        title: "Backend",
        icon: <Code className="h-6 w-6" />,
        color: "green",
        skills: [
            { name: "Node.js", years: 3, description: "APIs y microservicios" },
            { name: "Python / Selenium / Pandas", years: 2, description: "Automatización y datos" },
            { name: "API REST", years: 4, description: "Diseño y desarrollo" },
            { name: "Microservicios", years: 2, description: "Arquitectura distribuida" },
        ]
        },
        {
        title: "Base de Datos",
        icon: <Database className="h-6 w-6" />,
        color: "orange",
        skills: [
            { name: "SQL & Databases", years: 4, description: "Diseño y optimización" },
            { name: "PostgreSQL", years: 3, description: "Base de datos principal" },
            { name: "MongoDB", years: 3, description: "NoSQL y agregaciones" },
            { name: "SQL Server", years: 1, description: "Cache y sesiones" },
        ]
        },
        {
        title: "Herramientas",
        icon: <Wrench className="h-6 w-6" />,
        color: "purple",
        skills: [
            { name: "Git - Github", years: 6, description: "Control de versiones" },
            { name: "Trello, Azure & Notion", years: 4, description: "Gestión de proyectos" },
            { name: "Docker", years: 1, description: "Containerización" },
            { name: "AWS", years: 1, description: "Cloud computing" },
        ]
        },
        {
        title: "Metodologías",
        icon: <GitBranch className="h-6 w-6" />,
        color: "indigo",
        skills: [
            { name: "SCRUM", years: 4, description: "Metodología ágil" },
            { name: "Clean Code", years: 5, description: "Buenas prácticas" },
            { name: "Patrones de Diseño", years: 3, description: "Arquitectura de software" },
            { name: "TDD", years: 2, description: "Testing automatizado" },
        ]
        },
        {
        title: "Soft Skills",
        icon: <Users className="h-6 w-6" />,
        color: "pink",
        skills: [
            { name: "Mentoría", years: 4, description: "300+ estudiantes por mes" },
            { name: "Trabajo en Equipo", years: 6, description: "Colaboración efectiva" },
            { name: "Comunicación", years: 6, description: "Cliente y equipo" },
            { name: "Inglés B2", years: 6, description: "Certificado oficial" },
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
                                {skill.years === 1 ? 'año' : 'años'}
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