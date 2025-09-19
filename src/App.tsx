import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TranslationProvider } from './context/TranslationContext';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { References } from './components/References';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  /* 
  className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-[var(--ultra-violet)] to-[var(--english-violet)]"
            : "bg-gradient-to-br from-[var(--mindaro)] to-[var(--vista-blue)]"
        }`
  */

  return (
    <TranslationProvider>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800' 
          : 'bg-gradient-to-br from-blue-50 via-white to-gray-50'
      }`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Hero />
          <About />
          <Experience />
          <References />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </TranslationProvider>
  );
}

export default App;
