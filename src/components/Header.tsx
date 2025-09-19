import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { NavItem } from "../types/Header";

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}
const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
    const { t, lang, setLang } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const rawNavItems = t<NavItem[]>("header.navItems", []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);;

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
        setOpenDropdownId(null);
        }
    };
        const navItems = ensureArray<NavItem>(rawNavItems);

    return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
                <button onClick={() => scrollToSection("home")}>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    {t<string>("header.title", "")}
                </span>
                </button>
            </div>

            {/* Desktop Navigation - se muestra desde el breakpoint definido (ej: md o personalizado) */}
            <nav className="hidden md:flex space-x-8 items-center">
                {navItems.map((item) => {
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;

                if (hasChildren) {
                    return (
                        <div key={item.id} className="relative group">
                            <button
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                                px-3 py-2 text-sm font-medium transition-colors duration-200 
                                hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                            >
                                {item.label}
                            </button>

                            <div
                                className="absolute left-0 top-full w-44 rounded-lg shadow-lg bg-white dark:bg-gray-800 z-50
                                hidden group-hover:block"
                            >
                                {item.children?.map((child) => (
                                <button
                                    key={child.id}
                                    onClick={() => scrollToSection(child.id)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                                    hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    {child.label}
                                </button>
                                ))}
                            </div>
                        </div>
                    );
                }

              // Item normal sin children
                return (
                    <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                        px-3 py-2 text-sm font-medium transition-colors duration-200 
                        hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                    >
                    {item.label}
                    </button>
                );
                })}
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
                <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="flex p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
                            hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                <Globe className="h-5 w-5" />
                <span className="ml-2 text-sm font-medium">{lang.toUpperCase()}</span>
                </button>

                <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
                        hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
                        hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>
            </div>
        </div>

        {/* Mobile Navigation (accordion-like for children) */}
        {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                <div key={item.id}>
                    <button
                    onClick={() => {
                        if (item.children && item.children.length) {
                        // Si tiene children, alternamos su visibilidad local (simple comportamiento acordeón)
                        setOpenDropdownId((prev) => (prev === item.id ? null : item.id));
                        } else {
                        scrollToSection(item.id);
                        }
                    }}
                    className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 
                        hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                    >
                    {item.label}
                    </button>

                    {/* Mobile: mostrar children si openDropdownId === item.id */}
                    { item.children && item.children.length && openDropdownId === item.id && (
                    <div className="pl-4">
                        {item.children.map((child) => (
                        <button
                            key={child.id}
                            onClick={() => scrollToSection(child.id)}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 
                            hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                        >
                            {child.label}
                        </button>
                        ))}
                    </div>
                    )}
                </div>
                ))}
            </div>
            </div>
        )}
    </header>
);
};