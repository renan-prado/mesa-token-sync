/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#09090b',
        'primary-accent': '#37373a',
        accent: '#f4f4f5',
      },
    },
  },
  plugins: [],
}
