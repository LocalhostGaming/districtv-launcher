/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        dark: {
          100: '#73777D',
          200: '#5F6369',
          300: '#484D56',
          400: '#393E46',
          500: '#2A3039',
          600: '#222831',
          700: '#1D222B',
        },
        primary: '#F66B0F',
        discord: '#7289DA',
        light: {
          100: '#EEEEEE',
        },
      },
    },
  },
  plugins: [],
};
