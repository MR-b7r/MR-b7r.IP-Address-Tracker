/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,js}",
  './index.html'],
  theme: {
    extend: {
      colors: {
        "Very-Dark-Gray": "var(--Very-Dark-Gray)",
        "Dark-Gray": "var(--Dark-Gray)",
        "color-app": "var(--color-app)",

      },
      screens: {
        'mlg': {'max': '1023px'},
      }
    },
  },
  plugins: [],
}