/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fffae0',
          200: '#fff4b8',
          300: '#ffe885',
          400: '#ffd64d',
          500: '#f5bd14',
          600: '#d99708',
          700: '#ad6e07',
          800: '#8c530e',
          900: '#734312'
        }
      }
    },
  },
  plugins: [],
}
