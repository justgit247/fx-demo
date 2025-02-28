/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212', // Dark Background
        card: '#191B1F', // Card Background
        primaryText: '#EAECEF', // Primary Text
        accent: '#F0B90B', // Binance Yellow
        positiveTrend: '#27AE60', // Green
        negativeTrend: '#FF4D4F', // Red
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
