import React from 'react';
import { MapPin, Mail, Phone, Github, Linkedin, ExternalLink, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
    const contactInfo = {
        phone: '+54 9 11 5961-0005',
        email: 'francoezequielmarchegiani2019@gmail.com',
        location: 'CABA, Buenos Aires - Argentina',
        github: 'https://github.com/Franco-Ezequiel-Marchegiani',
        linkedin: 'https://www.linkedin.com/in/franco-e-marchegiani/',
        cv: 'https://www.canva.com/design/DAGOsU3CpG4/rYxB7omo1UDvwW4rFvQX3Q/view?utm_content=DAGOsU3CpG4&utm_campaign=designshare&utm_medium=link&utm_source=editor',
        references: 'https://docs.google.com/document/d/1Cz4A_U9j0aeN1c59jVKFEofqORmev4vlbMx-970AD6M/edit?usp=sharing'
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-8">
                <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-green-500 to-orange-500 bg-clip-text text-transparent">
                    Franco
                    </span>{' '}
                    <br />
                    Marchegiani
                </h1>
                <h2 className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                    Fullstack Web Developer & Tutor
                </h2>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-500 transition-colors">
                    {contactInfo.phone}
                    </a>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                    <Mail className="h-4 w-4 text-green-500" />
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-green-500 transition-colors truncate">
                    {contactInfo.email}
                    </a>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <a href="https://www.google.com.ar/maps/place/Villa+Urquiza,+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.5719608,-58.4990465,15z/data=!3m1!4b1!4m6!3m5!1s0x95bcb65c360890c1:0x8bd20bac2f970066!8m2!3d-34.5703983!4d-58.4913868!16zL20vMDV2Yms0?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="hover:text-orange-500 transition-colors">
                    {contactInfo.location}
                    </a>
                </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-4">
                <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                            transition-colors duration-200 group"
                >
                    <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </a>
                <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 
                            transition-colors duration-200 group"
                >
                    <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                </a>
                <a
                    href={contactInfo.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 
                            transition-colors duration-200 group"
                >
                    <ExternalLink className="h-5 w-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                </a>
                <a
                    href={contactInfo.references}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/40 
                            transition-colors duration-200 group"
                >
                    <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300" />
                </a>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium rounded-lg 
                            hover:from-blue-700 hover:to-green-600 transform hover:scale-105 transition-all duration-200 
                            shadow-lg hover:shadow-xl"
                >
                    Contactame
                </button>
                <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 
                            font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 
                            dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
                >
                    Ver Proyectos
                </button>
                </div>
            </div>

            {/* Visual Element */}
            <div className="flex justify-center lg:justify-end">
                <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-400 via-green-400 to-orange-400 rounded-full 
                            opacity-20 blur-3xl absolute -inset-4"></div>
                <div className="relative w-72 h-72 bg-gradient-to-br from-blue-600 via-green-500 to-orange-500 
                            rounded-2xl flex items-center justify-center text-white text-6xl font-bold 
                            shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    FM
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};