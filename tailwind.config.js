/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
  extend: {
    colors: {
       navyLightStart: '#2c3e60',
     navyLightEnd: '#405472',
     royal : '#24243e',
    },
    backgroundImage: {
      'navy-light-gradient': 'linear-gradient(135deg, #2c3e60, #405472)',
      'royal' : 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
    }
  }
},
  plugins: [],
}