import React, { type JSX } from 'react';
import { Heart, Github, Linkedin, Mail, FileUser, ExternalLink } from 'lucide-react';
import type { SocialLink, QuickLink } from "../types/Footer";
import { useTranslation } from '../hooks/useTranslation';

const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const iconMap: Record<string, JSX.Element> = {
    github: <Github className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    cv: <FileUser className="h-4 w-4" />,
    email: <Mail className="h-4 w-4" />
};

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    const rawSocialLink = t<SocialLink[]>("footer.social", []);
    const rawQuickLink = t<QuickLink[]>("footer.quickLinks", []);

    // Coerción de seguridad (por si t devolvió algo raro)
    const socialLinks = ensureArray<SocialLink>(rawSocialLink);
    const quickLinks = ensureArray<QuickLink>(rawQuickLink);
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
                    {t<string>("footer.brand.initials", "")}
                </span>
                <div>
                    <h3 className="text-xl font-bold">{t<string>("footer.brand.name", "")}</h3>
                    <p className="text-gray-400 text-sm">{t<string>("footer.brand.role", "")}</p>
                </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {t<string>("footer.brand.description", "")}
                </p>
                <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                    <div className="flex space-x-4 relative group">
                        <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
                        >
                        <div className="text-gray-400 group-hover:text-white transition-colors duration-200">
                            
                            {iconMap[link.icon ?? 'Github']}
                            <span className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                {link.text_label}
                            </span>
                        </div>
                        </a>
                    </div>
                ))}
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className="text-lg font-semibold mb-6">
                    {t<string>("footer.titles.quickLinks", "")}
                </h4>
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
                <h4 className="text-lg font-semibold mb-6">{t<string>("footer.titles.contact", "")}</h4>
                <div className="space-y-4 text-gray-400 text-sm">
                <div>
                    <p className="font-medium text-white mb-1">{t<string>("footer.contact.emailLabel", "")}</p>
                    <a 
                    href="mailto:francoezequielmarchegiani2019@gmail.com"
                    className="hover:text-white transition-colors duration-200"
                    >
                    {t<string>("footer.contact.email", "")}
                    </a>
                </div>
                <div>
                    <p className="font-medium text-white mb-1">{t<string>("footer.contact.phoneLabel", "")}</p>
                    <a 
                    href="tel:+541159610005"
                    className="hover:text-white transition-colors duration-200"
                    >
                        {t<string>("footer.contact.phone", "")}
                    </a>
                </div>
                <div>
                    <p className="font-medium text-white mb-1">{t<string>("footer.contact.locationLabel", "")}</p>
                    <a 
                    href={t<string>("footer.contact.locationHref", "")}
                    className="hover:text-white transition-colors duration-200"
                    target="_blank"
                    >
                        {t<string>("footer.contact.location", "")}
                    </a>
                </div>
                <div className="pt-4">
                    <a
                    href={t<string>("footer.contact.whatsappHref", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 
                            text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                    <span>{t<string>("footer.contact.whatsapp", "")}</span>
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
                <span>{t<string>("footer.bottom.madeWith", "")}</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>{t<string>("footer.bottom.using", "")}</span>
                </div>
                <div className="text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} {'\n'} 
                    <a href="https://www.linkedin.com/in/franco-e-marchegiani/" target="_blank"className="hover:text-white transition-colors duration-200"> 
                    {t<string>("footer.bottom.authorLinkLabel", "")}
                    </a> 
                    {'\n'} {t<string>("footer.bottom.copyright", "")}
                </p>
                </div>
            </div>
            </div>
        </div>
        </footer>
    );
};