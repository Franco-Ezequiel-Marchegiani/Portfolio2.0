import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { NavItems } from "../types/Header";

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}
const ensureArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const rawNavItems = t<NavItems[]>("header.navItems", []);

    const navItems = ensureArray<NavItems>(rawNavItems);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
        }
    };
    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                {t<string>("header.initials", "")}
                </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                            px-3 py-2 text-sm font-medium transition-colors duration-200 
                            hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                >
                    {item.label}
                </button>
                ))}
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 
                            hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 
                            dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                >
                    {item.label}
                </button>
                ))}
            </div>
            </div>
        )}
        </header>
    );
};