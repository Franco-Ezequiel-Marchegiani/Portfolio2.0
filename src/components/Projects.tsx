import React, { useState } from 'react';
import { Github, ExternalLink, Code, Database, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    category: string;
    github?: string;
    demo?: string;
    features: string[];
    image: string;
}

export const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Proyectos de ejemplo - aquí podrás agregar tus proyectos reales
    const projects: Project[] = [
        {
        title: "Sistema de Automatización - Disbyte",
        description: "Automatización de procesos internos con scraping de datos desde APIs de MercadoLibre",
        longDescription: "Sistema completo que automatiza la extracción y procesamiento de datos desde múltiples APIs, especialmente MercadoLibre. Incluye dashboard de monitoreo, alertas automáticas y reportes en tiempo real.",
        technologies: ["Python", "Selenium", "Pandas", "PostgreSQL", "React", "Node.js"],
        category: "automation",
        features: [
            "Scraping automatizado de productos",
            "Procesamiento de datos en tiempo real",
            "Dashboard de monitoreo",
            "Sistema de alertas",
            "Exportación de reportes"
        ],
        image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
        title: "Plataforma Web - Plug-zone",
        description: "Desarrollo de sitio web adaptado a la lógica del negocio con gestión de archivos",
        longDescription: "Aplicación web completa con sistema de gestión de archivos, validaciones en tiempo real y feedback visual. Incluye coordinación con cliente y presentación de avances.",
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
        category: "web",
        features: [
            "Carga de archivos con validación",
            "Feedback visual en tiempo real",
            "Sistema de notificaciones",
            "Panel administrativo",
            "Integración con AWS"
        ],
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
        title: "Portal Educativo - Coderhouse",
        description: "Herramientas para corrección y seguimiento de más de 300 estudiantes",
        longDescription: "Sistema de gestión educativa que permite el seguimiento de estudiantes, corrección automatizada de proyectos y generación de reportes de progreso.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "HTML", "CSS"],
        category: "education",
        features: [
            "Sistema de corrección automática",
            "Seguimiento de estudiantes",
            "Chat en tiempo real",
            "Reportes de progreso",
            "Calificación automatizada"
        ],
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
    ];

    const categories = [
        { id: 'all', label: 'Todos', icon: <Code className="h-4 w-4" /> },
        { id: 'web', label: 'Web Apps', icon: <Smartphone className="h-4 w-4" /> },
        { id: 'automation', label: 'Automatización', icon: <Database className="h-4 w-4" /> },
        { id: 'education', label: 'Educación', icon: <Code className="h-4 w-4" /> },
    ];

    const filteredProjects = selectedCategory === 'all' 
        ? projects 
        : projects.filter(project => project.category === selectedCategory);

    const toggleProjectExpansion = (index: number) => {
        setExpandedProject(expandedProject === index ? null : index);
    };

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Proyectos
                </span> Destacados
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Una selección de proyectos que demuestran mis habilidades técnicas y capacidad de resolución de problemas
            </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
                <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 
                    ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                >
                {category.icon}
                <span>{category.label}</span>
                </button>
            ))}
            </div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
                <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg 
                        hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-500 overflow-hidden">
                    <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        {categories.find(cat => cat.id === project.category)?.label}
                    </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                        key={techIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 
                                dark:text-blue-400 text-xs rounded-full"
                        >
                        {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 
                                    dark:text-gray-400 text-xs rounded-full">
                        +{project.technologies.length - 3} más
                        </span>
                    )}
                    </div>

                    {/* Expanded Content */}
                    {expandedProject === index && (
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {project.longDescription && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {project.longDescription}
                        </p>
                        )}
                        
                        <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Características principales:
                        </h4>
                        <ul className="space-y-1">
                            {project.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                            </li>
                            ))}
                        </ul>
                        </div>

                        <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Tecnologías completas:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 
                                        dark:text-gray-300 text-xs rounded"
                            >
                                {tech}
                            </span>
                            ))}
                        </div>
                        </div>
                    </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-6">
                    <div className="flex space-x-3">
                        {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 
                                    dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            <Github className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </a>
                        )}
                        {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg hover:bg-blue-200 
                                    dark:hover:bg-blue-900/40 transition-colors duration-200"
                        >
                            <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </a>
                        )}
                    </div>

                    <button
                        onClick={() => toggleProjectExpansion(index)}
                        className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 
                                hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                        <span>{expandedProject === index ? 'Menos detalles' : 'Ver detalles'}</span>
                        {expandedProject === index ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                        }
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {filteredProjects.length === 0 && (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                No hay proyectos en esta categoría por el momento.
                </p>
            </div>
            )}

            {/* Call to Action */}
            <div className="text-center mt-16">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                ¿Te interesa algún proyecto o tienes alguna propuesta?
            </p>
            <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium 
                        rounded-lg hover:from-blue-700 hover:to-green-600 transform hover:scale-105 
                        transition-all duration-200 shadow-lg hover:shadow-xl"
            >
                Conversemos
            </button>
            </div>
        </div>
        </section>
    );
};