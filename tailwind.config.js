const styleMerge = require('tw-style-merge')
const figmaTokens = require('./figma/design-tokens.json')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      ...figmaTokens,
    },
  },
  plugins: [
    styleMerge(), // Or pass a custom prefix, e.g. styleMerge('custom')
  ],
}
