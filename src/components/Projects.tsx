import React, { useState, type JSX } from 'react';
import {
  Github,
  ExternalLink,
  Code,
  Database,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Plus
} from 'lucide-react';
import type { Project, Category } from "../types/Project";
import { useTranslation } from '../hooks/useTranslation';

const iconMap: Record<string, JSX.Element> = {
  code: <Code className="h-4 w-4" />,
  smartphone: <Smartphone className="h-4 w-4" />,
  database: <Database className="h-4 w-4" />,
  gamepad2: <Gamepad2 className="h-4 w-4" />
};

// helper para asegurarnos que siempre obtenemos un array
const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Pedimos fallback [] para evitar undefined / string
  const rawProjects = t<Project[]>("projects.items", []);
  const rawCategories = t<Category[]>("projects.categories", []);

  // Coerción de seguridad (por si t devolvió algo raro)
  const projects = ensureArray<Project>(rawProjects);
  const categories = ensureArray<Category>(rawCategories);

  const filteredProjects =
    selectedCategory === 'all' ? projects : projects.filter(project => project.category === selectedCategory);

  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

  const toggleProjectExpansion = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  // Si no hay proyectos: mensaje
  if (!Array.isArray(displayedProjects)) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">{t<string>("projects.loadingMsg", "")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
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
              <span className="inline-flex">{iconMap[category.icon ?? 'code']}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {displayedProjects.length === 0 ? (
            <div className="text-center col-span-full py-12">
              <p className="text-gray-500 dark:text-gray-400">{t<string>("projects.msgNotFound", "")}</p>
            </div>
          ) : (
            displayedProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg 
                        hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-500 overflow-hidden">
                  <a href={project.link ?? project.github ?? '#'} target="_blank" rel="noopener noreferrer">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        {categories.find(cat => cat.id === project.category)?.label ?? project.category}
                      </span>
                    </div>
                  </a>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{project.technologies.length - 3} {t<string>("projects.more", "")}
                      </span>
                    )}
                  </div>

                  {/* Expanded Content */}
                  {expandedProject === index && (
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {project.longDescription && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{project.longDescription}</p>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t<string>("projects.mainFeatures", "")}</h4>
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
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t<string>("projects.completeTechnology", "")}</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* showCode
                  showDemo */}
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex space-x-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                          <Github className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          {/* <span className="h-4 w-4 text-gray-600 dark:text-gray-400">
                            {t<string>("projects.showCode", "")}
                          </span> */}
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-200">
                          <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          {/* <span className="h-4 w-4 text-blue-600 dark:text-blue-400">
                            {t<string>("projects.showDemo", "")}
                          </span> */}
                        </a>
                      )}
                    </div>

                    <button onClick={() => toggleProjectExpansion(index)} className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                      <span>{expandedProject === index ? t<string>("projects.cta.lessDetails", "") : t<string>("projects.cta.details", "")}</span>
                      {expandedProject === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Show More Projects Button */}
        {filteredProjects.length > 3 && (
          <div className="text-center mb-16">
            <button onClick={() => setShowAllProjects(!showAllProjects)} className="flex items-center space-x-2 mx-auto px-8 py-3 bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Plus className={`h-5 w-5 transform transition-transform duration-200 ${showAllProjects ? 'rotate-45' : ''}`} />
              <span>{showAllProjects ? t<string>("projects.cta.showLess", "") : `${t<string>("projects.cta.showMore", "")} (${filteredProjects.length})`}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
