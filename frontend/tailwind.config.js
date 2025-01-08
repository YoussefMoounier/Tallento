/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "primary-hover": "var(--primary-hover-color)",
        customPink: "#fde4e4",
        customPurple: "#d8a3e0",
        deepPurple: "#690263",
        secodColor: "#CFA93A",
        bg: "#F7EBE7",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, #ffffff 60%, #a855f7 100%)",
      },
    },
  },
  plugins: [],
};
