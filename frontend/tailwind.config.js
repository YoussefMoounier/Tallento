/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color)',
        'primary-hover': 'var(--primary-hover-color)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, #ffffff 60%, #a855f7 100%)',
      }
    },
  },
  plugins: [],
}

