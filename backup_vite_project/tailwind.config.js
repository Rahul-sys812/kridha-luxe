/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lg': '991px',  // Tablet/Laptop breakpoint
        'xl': '1200px', // Desktop breakpoint
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '12px',  // Slightly sharper but still soft corners for premium feel
      },
      colors: {
        brand: {
          orange: '#F26522', // Updated Logo Flame Orange
          orangeHover: '#E05A1F',
          cream: '#FCFBF9', // Softer, cleaner cream
          gold: '#C5A059',
          charcoal: '#1A2530', // Logo Dark Navy/Charcoal
          gray: '#F5F5F7', // Apple-esque light gray for sections
        }
      }
    },
  },
  plugins: [],
}
