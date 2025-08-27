import React from 'react';
import { Heart, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
    const socialLinks = [
        {
        icon: <Github className="h-5 w-5" />,
        href: 'https://github.com/Franco-Ezequiel-Marchegiani',
        label: 'GitHub'
        },
        {
        icon: <Linkedin className="h-5 w-5" />,
        href: 'https://www.linkedin.com/in/franco-e-marchegiani/',
        label: 'LinkedIn'
        },
        {
        icon: <ExternalLink className="h-5 w-5" />,
        href: 'https://franco-ezequiel-marchegiani.github.io/portfolio/',
        label: 'Portfolio'
        },
        {
        icon: <Mail className="h-5 w-5" />,
        href: 'mailto:francoezequielmarchegiani2019@gmail.com',
        label: 'Email'
        }
    ];

    const quickLinks = [
        { name: 'Inicio', href: '#home' },
        { name: 'Sobre Mí', href: '#about' },
        { name: 'Experiencia', href: '#experience' },
        { name: 'Habilidades', href: '#skills' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Contacto', href: '#contact' }
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId.substring(1));
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    FM
                </span>
                <div>
                    <h3 className="text-xl font-bold">Franco Marchegiani</h3>
                    <p className="text-gray-400 text-sm">Fullstack Developer</p>
                </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                Desarrollador Fullstack especializado en crear soluciones escalables 
                y eficientes. Siempre enfocado en generar valor real a través de la tecnología.
                </p>
                <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                    <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
                    >
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-200">
                        {link.icon}
                    </div>
                    </a>
                ))}
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
                <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                    <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 
                            hover:translate-x-1 transform text-left"
                    >
                    {link.name}
                    </button>
                ))}
                </nav>
            </div>

            {/* Contact Info */}
            <div>
                <h4 className="text-lg font-semibold mb-6">Contacto</h4>
                <div className="space-y-4 text-gray-400 text-sm">
                <div>
                    <p className="font-medium text-white mb-1">Email</p>
                    <a 
                    href="mailto:francoezequielmarchegiani2019@gmail.com"
                    className="hover:text-white transition-colors duration-200"
                    >
                    francoezequielmarchegiani2019@gmail.com
                    </a>
                </div>
                <div>
                    <p className="font-medium text-white mb-1">Teléfono</p>
                    <a 
                    href="tel:+541159610005"
                    className="hover:text-white transition-colors duration-200"
                    >
                    +54 9 11 5961-0005
                    </a>
                </div>
                <div>
                    <p className="font-medium text-white mb-1">Ubicación</p>
                    <p>CABA, Buenos Aires - Argentina</p>
                </div>
                <div className="pt-4">
                    <a
                    href="https://api.whatsapp.com/send/?phone=541159610005&text=¡Hola Franco! Me interesa contactarte sobre una oportunidad laboral."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 
                            text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                    <span>WhatsApp</span>
                    <ExternalLink className="h-4 w-4" />
                    </a>
                </div>
                </div>
            </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
                <span>Hecho con</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>usando React y Tailwind CSS</span>
                </div>
                <div className="text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Franco Marchegiani. Todos los derechos reservados.</p>
                </div>
            </div>
            </div>
        </div>
        </footer>
    );
};