/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#D9D9D9',
        backgroundLight: '#F4F6F8',
        lightBlue: '#4F6FCB',
        blue: '#1877F2',
        gray3: '#333333',
        gray5: '#555555',
        gray7: '#777777',
        gray9: '#999999',
      },
    },
  },
  plugins: [],
}

