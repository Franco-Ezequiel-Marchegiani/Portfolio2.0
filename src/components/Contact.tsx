import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulamos el envío del formulario
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const contactInfo = [
        {
        icon: <Phone className="h-5 w-5" />,
        label: "Teléfono",
        value: "+54 9 11 5961-0005",
        href: "tel:+541159610005",
        color: "blue"
        },
        {
        icon: <Mail className="h-5 w-5" />,
        label: "Email",
        value: "francoezequielmarchegiani2019@gmail.com",
        href: "mailto:francoezequielmarchegiani2019@gmail.com",
        color: "green"
        },
        {
        icon: <MapPin className="h-5 w-5" />,
        label: "Ubicación",
        value: "CABA, Buenos Aires - Argentina",
        href: "#",
        color: "orange"
        },
        {
        icon: <MessageCircle className="h-5 w-5" />,
        label: "WhatsApp",
        value: "Contacto directo",
        href: `https://api.whatsapp.com/send/?phone=541159610005&text=¡Hola Franco! Me interesa contactarte sobre una oportunidad laboral.`,
        color: "green"
        }
    ];

    const getColorClasses = (color: string) => {
        const colors = {
        blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
        orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                ¿Hablamos sobre tu <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Proyecto
                </span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Estoy disponible para nuevas oportunidades y colaboraciones. 
                ¡No dudes en contactarme!
            </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
                <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Información de Contacto
                </h3>
                <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                    <a
                        key={index}
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl 
                                shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 
                                group cursor-pointer"
                    >
                        <div className={`p-3 rounded-lg ${getColorClasses(info.color)}`}>
                        {info.icon}
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
                    </a>
                    ))}
                </div>
                </div>

                {/* Availability Status */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 
                            rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h4 className="font-semibold text-green-800 dark:text-green-400">
                    Disponible para nuevos proyectos
                    </h4>
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm">
                    Actualmente estoy disponible para oportunidades freelance y posiciones full-time. 
                    Tiempo de respuesta típico: 24-48 horas.
                </p>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Envíame un mensaje
                </h3>

                {isSubmitted ? (
                <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    ¡Mensaje enviado!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                    Gracias por contactarme. Te responderé pronto.
                    </p>
                </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre completo
                        </label>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                transition-all duration-200"
                        placeholder="Tu nombre"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                transition-all duration-200"
                        placeholder="tu@email.com"
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Asunto
                    </label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                transition-all duration-200"
                    >
                        <option value="">Selecciona un asunto</option>
                        <option value="trabajo">Oportunidad laboral</option>
                        <option value="freelance">Proyecto freelance</option>
                        <option value="colaboracion">Colaboración</option>
                        <option value="consulta">Consulta general</option>
                    </select>
                    </div>

                    <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                transition-all duration-200 resize-vertical"
                        placeholder="Cuéntame sobre tu proyecto o consulta..."
                    />
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 
                            bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium 
                            rounded-lg hover:from-blue-700 hover:to-green-600 
                            transform hover:scale-105 transition-all duration-200 
                            shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                            disabled:transform-none"
                    >
                    {isSubmitting ? (
                        <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                        <Send className="h-5 w-5" />
                        <span>Enviar mensaje</span>
                        </>
                    )}
                    </button>
                </form>
                )}
            </div>
            </div>
        </div>
        </section>
    );
};