/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Importante para que funcione
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'nav': '1050px', // breakpoint personalizado
      },
    },
  },
  plugins: [],
}

