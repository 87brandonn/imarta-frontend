/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['"Lato"', 'sans-serif'],
        lora: ['"Lora"', 'serif']
      }
    }
  },
  plugins: []
};
