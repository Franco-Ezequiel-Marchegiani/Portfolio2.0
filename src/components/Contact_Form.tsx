import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, TriangleAlert } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const FormEmail: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const form = useRef<HTMLFormElement>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    //Guarda valor en localStorage para evitar multiple spam
    useEffect(() => {
        const lastSent = localStorage.getItem("lastEmailSent");

        if (lastSent) {
            const diff = Date.now() - parseInt(lastSent, 10);
            //Formato mm/ss/hh
            const msLeft = 24 * 60 * 60 * 1000 - diff;

            if (diff < 24 * 60 * 60 * 1000) {
                setIsSubmitted(true); // ya lo había mandado en las últimas 24h
            }
            //Asignamos cuanto tiempo falta
            if (msLeft > 0) {
            setTimeLeft(msLeft);
        }
        }
    }, []);
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (timeLeft !== null) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev && prev > 1000) {
                        return prev - 1000;
                    } else {
                        clearInterval(interval);
                        return null; // ya puede volver a enviar
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timeLeft]);
    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Verificar si ya pasó 1 día
        const lastSent = localStorage.getItem("lastEmailSent");
        console.log("lastSent: ", lastSent);
        
        if (lastSent) {
            const diff = Date.now() - parseInt(lastSent, 10);
            if (diff < 24 * 60 * 60 * 1000) {
                alert("Ya enviaste un mensaje. Podés volver a enviar uno en 24 horas.");
                return;
            }
        }

        const service_id = "service_kk9ldyd"
        const templateID = "template_m08bphp"
        const publicKey = "KfS4C3jsHoaYKEEhz"

        if(form.current){
            emailjs.sendForm(service_id, templateID, form.current, publicKey).then(
                ()=>{
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    localStorage.setItem("lastEmailSent", Date.now().toString());
                    console.log("Guardado lastEmailSent:", Date.now());
                },
                (error: string) =>{
                    alert(`Error al intentar enviar mail, intente nuevamente. ${error}`);
                }
            )
        }
    };

    return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t<string>("contactForm.title", "")}
                </h3>
                {/* Primero revisa si ya envió un mail, y dsp muestra el form o el msj de enviado */}
                {timeLeft !== null ?(
                    <div className="text-center py-12">
                        <TriangleAlert className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {t<string>("contactForm.alreadySent.title", "")}{formatTime(timeLeft)}.
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                        {t<string>("contactForm.alreadySent.text", "")}
                        </p>
                    </div>
                ) : isSubmitted ?(
                    <div className="text-center py-12">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {t<string>("contactForm.success.title", "")}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                        {t<string>("contactForm.success.text", "")}
                        </p>
                    </div>
                ) : (
                    <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t<string>("contactForm.fields.name", "")}
                            
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
                        placeholder={t<string>("contactForm.placeholders.name", "")}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t<string>("contactForm.fields.email", "")}
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
                        placeholder={t<string>("contactForm.placeholders.email", "")}
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t<string>("contactForm.fields.subject", "")}
                        
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
                        <option value="">{t<string>("contactForm.options.default", "")}</option>
                        <option value="Oportunidad laboral">{t<string>("contactForm.options.job", "")}</option>
                        <option value="Proyecto freelance">{t<string>("contactForm.options.freelance", "")}</option>
                        <option value="colaboracion">{t<string>("contactForm.options.collaboration", "")}</option>
                        <option value="Consulta general">{t<string>("contactForm.options.general", "")}</option>
                    </select>
                    </div>

                    <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t<string>("contactForm.fields.message", "")}
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
                        placeholder={t<string>("contactForm.placeholders.message", "")}
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
                            <span>{t<string>("contactForm.buttons.sending", "")}</span>
                        </>
                    ) : (
                        <>
                            <Send className="h-5 w-5" />
                            <span>{t<string>("contactForm.buttons.send", "")}</span>
                        </>
                    )}
                    </button>
                </form>
                )}
            </div>
            
    );
};