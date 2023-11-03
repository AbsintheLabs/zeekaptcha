/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        'absinthe-green': '#00c780',
        'absinthe-green-light': '#00df80',
        'absinthe-green-dark': '#00b261',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};