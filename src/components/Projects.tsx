import React, { useState } from 'react';
import { Github, ExternalLink, Code, Database, Smartphone, ChevronDown, ChevronUp, Gamepad2, Plus } from 'lucide-react';

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
    link: string;
}

export const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedProject, setExpandedProject] = useState<number | null>(null);
    const [showAllProjects, setShowAllProjects] = useState(false);

    // Proyectos de ejemplo - aquí podrás agregar tus proyectos reales
    const projects: Project[] = [
        {
        title: "Automatización y Procesos ETL",
        description: "Desarrollo de procesos de scraping y ETL para recolección, transformación y visualización de datos en tiempo real.",
        longDescription: "Proyecto orientado a la automatización de tareas repetitivas y la gestión de datos. Implementé procesos completos de scraping mediante Selenium para extraer información de fuentes externas, y pipelines ETL desarrollados en Python con Pandas para limpiar, transformar y adaptar los datos. Los resultados eran almacenados en bases de datos y visualizados en reportes dinámicos, optimizando el acceso a información clave. Todo el flujo fue versionado y controlado en GitHub, asegurando escalabilidad y mantenimiento del código.",
        technologies: ["Python", "Selenium", "Pandas", "GitHub"],
        category: "automation",
        github: "https://github.com/Franco-Ezequiel-Marchegiani",
        features: [
            "Scraping de datos desde múltiples fuentes externas",
            "Procesos ETL para limpieza, transformación y carga de información",
            "Automatización de tareas repetitivas",
            "Visualización de datos y generación de reportes dinámicos",
            "Control de versiones y colaboración con GitHub"
        ],
        image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: "https://github.com/Franco-Ezequiel-Marchegiani"

        },
        {
        title: "Red Social - Simulación Twitter / 'X' ",
        description: "Aplicación web interactiva que recrea la experiencia de una red social moderna, con publicaciones, likes, retweets y sistema de seguidores.",
        longDescription: "Proyecto desarrollado en Next.js que simula una red social al estilo Twitter/X. La plataforma ofrece una experiencia de usuario fluida y dinámica, permitiendo registrarse o iniciar sesión, publicar contenido, dar likes, realizar retweets y seguir a otros usuarios. Pensada como un entorno práctico para demostrar habilidades en desarrollo fullstack, combina autenticación segura con funcionalidades sociales atractivas.",
        // technologies: ["Python", "Selenium", "Pandas", "PostgreSQL", "React", "Node.js"],
        technologies: ["React", "Next.JS", "Strapi", "PostgreSQL", "Git & Github"],
        category: "web",
        github: "https://github.com/Franco-Ezequiel-Marchegiani/NEXT-JS_DH",
        features: [
            "Autenticación con registro e inicio de sesión",
            "Creación e interacción con publicaciones",
            "Likes y retweets para fomentar la participación",
            "Seguimiento de usuarios para crear comunidad",
            "Interfaz intuitiva y navegación fluida"
        ],
        image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: "https://github.com/Franco-Ezequiel-Marchegiani/NEXT-JS_DH"
        },
        {
        title: "Weather App",
        description: "Aplicación web para consultar el clima en cualquier parte del mundo, con diseño atractivo, responsive y modo oscuro.",
        longDescription: "Desarrollada con React, esta aplicación permite consultar las condiciones climáticas de la próxima semana en cualquier región registrada en la API pública utilizada. La información se actualiza en tiempo real, ofreciendo datos precisos de múltiples países y ciudades. El diseño es interactivo, moderno y totalmente responsive, incluyendo un modo oscuro para mejorar la experiencia del usuario.",
        technologies: ["React", "Javascript", "API REST", "TypeScript", "Git & Github"],
        category: "web",
        github: "https://github.com/Franco-Ezequiel-Marchegiani/challenge-weatherReport",
        features: [
            "Consulta de pronóstico semanal en cualquier parte del mundo",
            "Actualización en tiempo real de la información",
            "Diseño responsive optimizado para distintos dispositivos",
            "Modo oscuro para una experiencia más personalizada",
            "Interfaz intuitiva y atractiva"
        ],
        image: "https://cdn.dribbble.com/userupload/8911520/file/original-3b56224a185decf93892aabb386cb2c6.jpg",
        link: "https://github.com/Franco-Ezequiel-Marchegiani/challenge-weatherReport"
        },
        {
        title: "GitHub Jobs",
        description: "Portal web para visualizar ofertas laborales en tecnología, con diseño minimalista y navegación ágil.",
        longDescription: "Este sitio simula un portal de empleo donde los usuarios pueden explorar ofertas laborales en tecnología. La información de cada puesto (empresa, descripción, rango salarial, etc.) se obtiene dinámicamente desde APIs de terceros. La interfaz es 100% responsive, con un diseño minimalista que permite una navegación fluida y sin distracciones.",
        technologies: ["React", "Javascript", "API REST", "TypeScript", "Git & Github"],
        category: "web",
        demo: "https://github-jobs-proyect.firebaseapp.com/",
        github: "https://github.com/Franco-Ezequiel-Marchegiani/github_jobs_challenge",
        features: [
            "Visualización de ofertas laborales en tecnología",
            "Obtención dinámica de datos desde APIs externas",
            "Diseño minimalista y responsive",
            "Búsqueda y filtrado simple de vacantes",
            "Experiencia de usuario optimizada"
        ],
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/431733108909275.5fc7e8d90f04d.png",
        link: "https://github-jobs-proyect.firebaseapp.com/"
        },
        {
        title: "Juego Python - Dragon Ball TCG (Trading Card Game)", 
        description: "Implementación del clásico juego Snake desarrollado en Python con interfaz gráfica",
        longDescription: "Recreación completa del juego Snake utilizando Python y Pygame. Incluye sistema de puntuación, niveles de dificultad, efectos sonoros y guardado de records personales.",
        technologies: ["Python", "Pygame", "JSON", "Git & Github"],
        category: "games",
        demo: "https://www.youtube.com/watch?v=Vvgqh8Vshlg&ab_channel=PejeGZ",
        github: "https://github.com/Franco-Ezequiel-Marchegiani/TPFinal_Div315_Marchegiani_Franco?tab=readme-ov-file",
        features: [
            "Mecánicas clásicas del Snake",
            "Sistema de puntuación y records",
            "Múltiples niveles de dificultad",
            "Efectos sonoros y visuales",
            "Guardado de configuraciones"
        ],
        image: "https://i.ytimg.com/vi/Hdt4sbNc1NA/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=Vvgqh8Vshlg&ab_channel=PejeGZ"
        },
        {
        title: "Quiz App",
        description: "Juego interactivo de preguntas y respuestas en dos idiomas, con opciones de capitales y banderas.",
        longDescription: "Aplicación tipo trivia desarrollada con React, donde el usuario puede elegir idioma (español o inglés) y modalidad de juego. En 'Capitales', debe adivinar el país al que corresponde una capital aleatoria. En 'Banderas', se muestran banderas obtenidas de una API pública y el usuario debe adivinar su país de origen. El juego finaliza al primer error, fomentando el desafío y la rejugabilidad.",
        technologies: ["React", "API REST", "JavaScript", "CSS"],
        category: "games",
        demo: "https://quiz-app-game-c940b.web.app/",
        github: "https://github.com/Franco-Ezequiel-Marchegiani/country-quiz",
        features: [
            "Modo multilenguaje: español e inglés",
            "Dos modalidades de juego: capitales y banderas",
            "Banderas obtenidas dinámicamente desde una API",
            "Sistema de eliminación al primer error",
            "Interfaz atractiva y simple de usar"
        ],
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fe1f16110674751.5ff36e458be5f.png",
        link: "https://quiz-app-game-c940b.web.app/"
        },
        {
        title: "Netflix Clone",
        description: "Simulación de la plataforma Netflix con catálogo dinámico y trailers de películas y series.",
        longDescription: "Inspirado en la interfaz de Netflix, este proyecto replica una plataforma de streaming donde los usuarios pueden explorar un catálogo de películas y series actualizado en tiempo real mediante la API oficial de Netflix. Incluye la visualización de trailers directamente desde la aplicación. El código está optimizado para ser reutilizable y ligero, asegurando una excelente experiencia de usuario.",
        technologies: ["React", "API REST", "CSS", "JavaScript"],
        category: "web",
            
        github: "https://github.com/Franco-Ezequiel-Marchegiani/netflix-clone",
        features: [
            "Catálogo dinámico de películas y series",
            "Visualización de trailers integrados",
            "Actualización en tiempo real desde la API de Netflix",
            "Interfaz 100% responsive",
            "Código modular y reutilizable"
        ],
        image: "https://cxl.com/wp-content/uploads/2021/08/netflix-video-trailer-thumbnail.jpg",
        link: ""
        }
    ];

    const categories = [
        { id: 'all', label: 'Todos', icon: <Code className="h-4 w-4" /> },
        { id: 'web', label: 'Web Apps', icon: <Smartphone className="h-4 w-4" /> },
        { id: 'automation', label: 'Automatización', icon: <Database className="h-4 w-4" /> },
        /* { id: 'education', label: 'Educación', icon: <Code className="h-4 w-4" /> }, */
        { id: 'games', label: 'Juegos', icon: <Gamepad2 className="h-4 w-4" /> },
    ];

    const filteredProjects = selectedCategory === 'all' 
        ? projects 
        : projects.filter(project => project.category === selectedCategory);

    // Mostrar solo los primeros 3 proyectos inicialmente, o todos si showAllProjects es true
    const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

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
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {displayedProjects.map((project, index) => (
                <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg 
                        hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-500 overflow-hidden">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
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
                    </a>
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

            {/* Show More Projects Button */}
            {filteredProjects.length > 3 && (
            <div className="text-center mb-16">
                <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="flex items-center space-x-2 mx-auto px-8 py-3 bg-white dark:bg-gray-800 
                        border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 
                        font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 
                        dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-200 
                        shadow-lg hover:shadow-xl"
                >
                <Plus className={`h-5 w-5 transform transition-transform duration-200 ${showAllProjects ? 'rotate-45' : ''}`} />
                <span>{showAllProjects ? 'Ver menos proyectos' : `Ver todos los proyectos (${filteredProjects.length})`}</span>
                </button>
            </div>
            )}

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