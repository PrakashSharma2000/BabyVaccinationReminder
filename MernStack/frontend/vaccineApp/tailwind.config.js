/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'DesktopBg':"url('./src/assets/LoginPageBg.jpg')",
        'MobileBg':"url('./src/assets/MobileBg.jpg')",
      },
      screens:{
        'mobile':'300px'
      }
    },
  },
  plugins: [],
}

