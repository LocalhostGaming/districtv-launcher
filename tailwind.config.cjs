/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        dark: {
          50: '#F0F1F4',
          100: '#D6D8E1',
          200: '#BCBECD',
          300: '#A1A5B9',
          400: '#878CA6',
          500: '#6D7392',
          600: '#575C75',
          700: '#414558',
          800: '#262833',
          900: '#16171D',
        },
        primary: {
          50: '#FEF0E6',
          100: '#FDD5BA',
          200: '#FBBB8D',
          300: '#FAA061',
          400: '#F88535',
          500: '#F76A08',
          600: '#C65506',
          700: '#944005',
          800: '#632B03',
          900: '#311502',
        },
        discord: '#7289DA',
        light: {
          100: '#EEEEEE',
        },
      },
    },
  },
  plugins: [],
};
