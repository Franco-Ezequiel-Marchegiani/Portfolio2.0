import React, { type JSX } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { FormEmail } from './Contact_Form';
import type { ContactInfo } from "../types/ContactInfo";
import { useTranslation } from '../hooks/useTranslation';

const iconMap: Record<string, JSX.Element> = {
    phone: <Phone className="h-4 w-4" />,
    mail: <Mail className="h-4 w-4" />,
    mapPin: <MapPin className="h-4 w-4" />,
    messageCircle: <MessageCircle className="h-4 w-4" />
};

const ensureArray = <T,>(value: unknown): T[] =>
    Array.isArray(value) ? (value as T[]) : [];

export const Contact: React.FC = () => {
    const { t } = useTranslation();
    const rawContactInfo = t<ContactInfo[]>("contact.info", []);
    const contactInfo = ensureArray<ContactInfo>(rawContactInfo);

    const getColorClasses = (color: string) => {
        const colors = {
        blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
        orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

  return (
        <section id="contact" className="py-16 px-3 sm:px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto">
    <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        {t<string>("contact.title", "")}
        <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            {t<string>("contact.title2", "")}
        </span>
        {t<string>("contact.title3", "")}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {t<string>("contact.subtitle", "")}
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {t<string>("contact.subtitle2", "")}
        </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
        <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t<string>("contact.infoTitle", "")}
            </h3>
            <div className="space-y-4">
            {contactInfo.map((info, index) => (
                <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group cursor-pointer block"
                >
                <div
                    className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl 
                            shadow-lg transition-all duration-200 hover:shadow-xl 
                            transform md:hover:scale-105"
                >
                    <div className={`p-3 rounded-lg ${getColorClasses(info.color)}`}>
                    {iconMap[info.icon ?? 'MessageCircle']}
                    </div>
                    <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 
                                    dark:group-hover:text-blue-400 transition-colors">
                        {info.label}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {info.value}
                    </p>
                    </div>
                </div>
                </a>
            ))}
            </div>
        </div>
        </div>

        {/* Contact Form */}
        <FormEmail />
    </div>
    </div>
        </section>
    );
};
