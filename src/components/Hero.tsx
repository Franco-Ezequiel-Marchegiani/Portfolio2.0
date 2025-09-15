import React from 'react';
import { MapPin, Mail, Phone, Github, Linkedin, FileUser, BookOpen } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { motion } from "framer-motion";
import profile from '../../public/retrato_calido_de_un_joven.png'
import profileIA from '../../public/retrato_calido_de_un_joven_chibli.png'
import cv from '../../public/CV FrancoMarchegiani-FullstackSAP.pdf'
import cvEnglish from '../../public/CV FrancoMarchegiani-Fullstack & SAP-English.pdf'

export const Hero: React.FC = () => {
    const { t, lang } = useTranslation();
    
    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-8">
                <div className="space-y-4">
                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight typing text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-orange-500 bg-clip-text text-transparent">
                            {t<string>("hero.name.first", "")}
                        </span>
                        {"\n"}
                        <span>
                            {t<string>("hero.name.last", "")}
                        </span>
                    </h1>
                    <h2 className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                            <a href="https://git.io/typing-svg">
                                <img 
                                    className="hidden dark:block"
                                    src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&duration=2300&pause=1000&color=E5E7EB&width=435&lines=Full+Stack+%26+SAP+Developer;Data+Analyst;Docente+y+Tutor++;QA+Tester" alt="Typing SVG" />
                            </a>
                            <a href="https://git.io/typing-svg">
                                <img 
                                className="block dark:hidden"
                                src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&duration=2300&pause=1000&color=111827&width=435&lines=Full+Stack+%26+SAP+Developer;Data+Analyst;Docente+y+Tutor++;QA+Tester" alt="Typing SVG" />
                            </a>                    
                    </h2>
                </div>
                    
                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <Phone className="h-4 w-4 text-blue-500" />
                        <a href={`tel:${t<string>("hero.contactInfo.phone", "")}`} className="hover:text-blue-500 transition-colors">
                        {t<string>("hero.contactInfo.phone", "")}
                        </a>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <Mail className="h-4 w-4 text-green-500" />
                        <a href={`mailto:${t<string>("hero.contactInfo.email", "")}`} className="hover:text-green-500 transition-colors truncate">
                        {t<string>("hero.contactInfo.email", "")}
                        </a>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <MapPin className="h-4 w-4 text-orange-500" />
                        <a href="https://www.google.com.ar/maps/place/Villa+Urquiza,+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.5719608,-58.4990465,15z/data=!3m1!4b1!4m6!3m5!1s0x95bcb65c360890c1:0x8bd20bac2f970066!8m2!3d-34.5703983!4d-58.4913868!16zL20vMDV2Yms0?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="hover:text-orange-500 transition-colors">
                        {t<string>("hero.contactInfo.location", "")}
                        </a>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-4">
                    {/* GitHub */}
                    <div className="relative group">
                        <a
                        href={t<string>("hero.contactInfo.github", "")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                                    transition-colors duration-200 flex items-center justify-center"
                        >
                        <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </a>
                        <span className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {t<string>("hero.text_github", "")}
                        </span>
                    </div>
                    {/* LinkedIn */}
                    <div className="relative group">
                        <a
                        href={t<string>("hero.contactInfo.linkedin", "")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 
                                    transition-colors duration-200 flex items-center justify-center"
                        >
                        <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                        </a>
                        <span className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {t<string>("hero.text_linkedIn", "")}
                        </span>
                    </div>
                    {/* CV */}
                    <div className="relative group">
                        <a
                        href={lang === "en" ? cvEnglish : cv}
                        download={`CV_Franco_Marchegiani_${lang === "en" ? "EN" : "ES"}`}
                        rel="noopener noreferrer"
                        className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 
                                    transition-colors duration-200 flex items-center justify-center"
                        >
                        {/* Cambié el icono */}
                            <FileUser className="h-5 w-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                        </a>
                        <span className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {t<string>("hero.text_cv", "")}
                        </span>
                    </div>
                    {/* Referencias */}
                    <div className="relative group">
                        <a
                        href={t<string>("hero.contactInfo.references", "")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/40 
                                    transition-colors duration-200 flex items-center justify-center"
                        >
                        {/* Cambié el icono */}
                        <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300" />
                        </a>
                        <span className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {t<string>("hero.text_references", "")}
                        </span>
                    </div>
                </div>
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium rounded-lg 
                            hover:from-blue-700 hover:to-green-600 transform hover:scale-105 transition-all duration-200 
                            shadow-lg hover:shadow-xl"
                >
                    
                    {t<string>("hero.buttons.contact", "")}
                </button>
                <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 
                            font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 
                            dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
                >
                    {t<string>("hero.buttons.projects", "")}
                </button>
                </div>
            </div>

            {/* Visual Element */}
            <div className="flex justify-center lg:justify-end">
                <div className="relative">
                    {/* Glow de fondo */}
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-400 via-green-400 to-orange-400 
                                    rounded-full opacity-20 blur-3xl absolute -inset-4"></div>
                    {/* Imagen con animación */}
                    <motion.div
                    initial={{ opacity: 0, y: 50 }}   // Aparece desde abajo con fade
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl"
                    >
                    <div className="relative w-80 h-80 rounded-full overflow-hidden">
                        {/* Imagen base */}
                        <img
                            src={profileIA}
                            alt="profile"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 hover:opacity-0"
                        />
                        {/* Imagen al hover */}
                        <img
                            src={profile}
                            alt="profileIA"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 hover:opacity-100"
                        />
                    </div>
                    
                    </motion.div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};