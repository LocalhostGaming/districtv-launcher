/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
