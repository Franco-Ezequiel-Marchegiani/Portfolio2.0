import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTopButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
        setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg
            hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-500
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}`}
        aria-label="Scroll to top"
        >
        <ArrowUp className="h-6 w-6" />
        </button>
    );
};
