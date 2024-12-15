/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'heading-primary': '#1a202c',
        'body-secondary': '#718096',
      },
      fontSize: {
        xl: '12px',
      },
      fontFamily: {
        heading: ['Arial', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      width: {
        big: '444px',
      },
      merge: {
        'heading-1': {
          fontFamily: '$heading',
          fontSize: '$xl',
          fontWeight: '700',
          lineHeight: '40px',
          letterSpacing: '0.1em',
          color: '$heading-primary',
          width: '$big',
        },

        'body-large': {
          fontFamily: 'body',
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '28px',
          letterSpacing: '0',
          color: 'body-secondary',
        },
      },
    },
  },
  plugins: [],
}
